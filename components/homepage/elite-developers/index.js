import React, { useEffect } from "react";
import classes from "./elite-developers.module.css";
import Top_builders from "../../cards/top_builder";
import { useDispatch, useSelector } from "react-redux";
import { fetchbuilders } from "../../../redux/users";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";
import Link from "next/link";

function EliteDevelopers({ passedRef }) {
  const responsive = [
    {
      breakpoint: 1431,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 667,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ];

  const dispatch = useDispatch();
  const { builders, loadingBuilders } = useSelector((state) => state.users);
  const userInfo = builders?.data;
  useEffect(() => {
    dispatch(fetchbuilders());
  }, []);

  const handleMoreBuildersCard = (size) => {
    dispatch(
      fetchbuilders({
        query: `nPerPage=${size}`,
      })
    );
  };

  return (
    <div ref={passedRef} className="landing_page_colored_container">
      <div
        style={{
          background:
            "linear-gradient(#bba249b8 -77.02%, rgba(187, 162, 73, 0) 94.6%)",
        }}
        className="colored_container"
      >
        <div className="cards_content_container">
          <div className="heading_container">
            <p className="landing_page_heading">Elite Builders & Developers</p>
            <div className="btn">
              <Link href={"/builders"} style={{ color: "white" }}>
                DISCOVER MORE
              </Link>
            </div>
          </div>

          <div className={classes.cards_container}>
            <Loader loading={loadingBuilders} minHeight={200}>
              {builders?.data?.length > 0 ? (
                <CardSlider
                  totalLength={builders?.meta?.totalItems}
                  handleMoreCard={handleMoreBuildersCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {userInfo?.map((e,i) => {
                    return <Top_builders key={`i-${i}`} data={e} />;
                  })}
                </CardSlider>
              ) : !builders?.data || builders?.data?.length === 0 && !loadingBuilders ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
            {/* <Slider arrows={true} {...settings}>
              {userInfo?.map((e) => {
                return <Top_builders data={e} />;
              })}
              <Top_builders />
              <Top_builders />
              <Top_builders />
              <Top_builders />
              <Top_builders />
              <Top_builders />
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

export default EliteDevelopers;
