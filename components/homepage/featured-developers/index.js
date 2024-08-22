import React, { useEffect } from "react";
import FeaturedDeveloper from "../../cards/featured-developer-card";
import classes from "./featured-developers.module.css";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { fetchfeaturebuilders } from "../../../redux/users";
import Link from "next/link";

function FeaturedDevelopers() {
  const responsive = [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1113,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 923,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 743,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 559,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 378,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ];
  const dispatch = useDispatch();
  const { feature_builders, feature_loadingBuilders } = useSelector(
    (state) => state.users
  );
  const userInfo = feature_builders?.data;

  useEffect(() => {
    dispatch(fetchfeaturebuilders());
  }, []);

  const handleMoreFeatureBuildersCard = (size) => {
    dispatch(
      fetchfeaturebuilders({
        query: `nPerPage=${size}`,
      })
    );
  };

  return (
    <div className="landing_page_colored_container">
      <div
        style={{
          background:
            "linear-gradient(#fc816590 -77.02%,rgba(252, 129, 101, 0) 94.6%)",
        }}
        className="colored_container"
      >
        <div className="cards_content_container">
          <div className="heading_container">
            <p className="landing_page_heading">
              Featured Builders & Developers
            </p>
            <div className="btn">
              <Link href={"/builders"} style={{ color: "white" }}>
                DISCOVER MORE
              </Link>
            </div>
          </div>

          <div className={classes.cards_container}>
            <Loader loading={feature_loadingBuilders} minHeight={200}>
              {feature_builders?.data?.length > 0 ? (
                <CardSlider
                  totalLength={feature_builders?.meta?.totalItems}
                  handleMoreCard={handleMoreFeatureBuildersCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {userInfo?.map((e,i) => {
                    return <FeaturedDeveloper key={`c-${i}`} data={e} link={`/builder/${e?.user?._id}`} />;
                  })}
                </CardSlider>
              ) : !feature_builders?.data || feature_builders?.data?.length === 0 &&
                !feature_loadingBuilders ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
            {/* <Slider arrows={true} {...settings}>
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
              <FeaturedDeveloper />
            </Slider> */}
          </div>
          <div
            style={{
              marginRight: "10px",
            }}
            className="Media_btn"
          >
            <Link href={"/builders"} style={{ color: "white" }}>
              DISCOVER MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedDevelopers;
