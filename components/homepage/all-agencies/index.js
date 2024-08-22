import React, { useEffect } from "react";
import classes from "./all-agencies.module.css";
import FeaturedDeveloper from "../../cards/featured-developer-card";
import { useWindowSize } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { CardSlider } from "../../common";
import { fetchAllagencies } from "../../../redux/users";
import Loader from "../../common/loader";
import Link from "next/link";

function AllAgencies() {
  const isMobileScreen = useWindowSize().width < 769;
  const responsive = [
    {
      breakpoint: 1300,
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
  const { agencies, loadingAgencies } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchAllagencies(`verificationType=basic`));
  }, []);

  const handleMoreAgenciesCard = (size) => {
    dispatch(
      fetchAllagencies({
        query: `verificationType=basic&nPerPage=${size}`,
      })
    );
  };

  return (
    <>
      {!isMobileScreen ? (
        <div className="landing_page_colored_container">
          <div
            style={{
              background:
                "linear-gradient(#0044399f -77.02%,rgba(2, 91, 255, 0) 94.6%)",
            }}
            className="colored_container"
          >
            <div className="cards_content_container">
              <div className="heading_container">
                <p className="landing_page_heading">Other Agencies</p>
                <div
                  style={{
                    marginRight: "10px",
                  }}
                  className="btn"
                >
                  <Link
                    href={"/agency"}
                    style={{ color: "white" }}
                  >
                    DISCOVER MORE
                  </Link>
                </div>
              </div>

              <div className={classes.cards_container}>
                <Loader loading={loadingAgencies} minHeight={200}>
                  {agencies?.data?.length > 0 ? (
                    <CardSlider
                      show={7}
                      totalLength={agencies?.meta?.totalItems}
                      handleMoreCard={handleMoreAgenciesCard}
                      disableInfinite
                      responsive={responsive}
                    >
                      {agencies?.data?.map((prop) => (
                        <FeaturedDeveloper
                          key={`elite-egensies-home${prop?._id}`}
                          data={prop}
                          link={`/agency/profile/${prop?.user?._id}`}
                        />
                      ))}
                    </CardSlider>
                  ) : !agencies?.data || agencies?.data?.length === 0 && !loadingAgencies ? (
                    <div className="dataNotFound">
                      <div className="notFoundImg" />
                      Oops! Not found
                    </div>
                  ) : (
                    ""
                  )}
                </Loader>
                {/* <div className={classes.cards_col}>

                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div> */}
                {/* <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div>
                  <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div>
                  <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div>
                  <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div>
                  <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div>
                  <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div>
                  <div className={classes.cards_col}>
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                    <FeaturedDeveloper />
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AllAgencies;
