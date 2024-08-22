import React, { useEffect } from "react";
import HotProjectCard from "../../cards/hot-project-card";
import classes from "./hot-projects.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureProjects } from "../../../redux/property";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";
import Link from "next/link";

function HotProjects({ title, hideBtnContainer }) {
  const responsive = [
    {
      breakpoint: 1177,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  const dispatch = useDispatch();
  const { featureProjects, loadingFeatureProjects } = useSelector(
    (state) => state.property
  );
  useEffect(() => {
    dispatch(fetchFeatureProjects());
  }, []);

  const handleMoreProjectCard = (size) => {
    dispatch(
      fetchFeatureProjects({
        query: `nPerPage=${size}`,
      })
    );
  };

  return (
    <div className="landing_page_colored_container">
      <div
        style={{
          background:
            "linear-gradient(#0044399f -77.02%,rgba(2, 91, 255, 0) 94.6%)",
        }}
        className="colored_container_with_shimmer"
      >
        <div className={classes.shimmer} />
        <div className="cards_content_container">
          <div className="heading_container_filled">
            <p
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                color: "#004439",
              }}
              className="landing_page_heading"
            >
              {title || "Hot Projects To Invest"}
            </p>
            <div
              style={{
                marginRight: "10px",
              }}
              className="btn"
            >
              <Link style={{ color: "white" }} href={"/project/invest"}>
                DISCOVER MORE
              </Link>
            </div>
          </div>

          <div className={classes.cards_container}>
            <Loader loading={loadingFeatureProjects} minHeight={200}>
              {featureProjects?.data?.length > 0 ? (
                <CardSlider
                  totalLength={featureProjects?.meta?.totalItems}
                  handleMoreCard={handleMoreProjectCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {featureProjects?.data?.map((e,i) => {
                    return <HotProjectCard key={`b-${i}`} data={e} />;
                  })}
                </CardSlider>
              ) : !featureProjects?.data || featureProjects?.data?.length === 0 &&
                !loadingFeatureProjects ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
          </div>
          {!hideBtnContainer && (
            <div
              style={{
                marginRight: "10px",
              }}
              className="Media_btn"
            >
              <Link style={{ color: "white" }} href={"/builders"}>
                DISCOVER MORE
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotProjects;
