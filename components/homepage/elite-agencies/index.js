import React, { useEffect } from "react";
import classes from "./elite-agencies.module.css";
import EliteAgencyCard from "../../cards/elite-agencies";
import { fetchEliteagencies } from "../../../redux/users";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";
import Link from "next/link";

function EliteAgencies() {
  const responsive = [
    {
      breakpoint: 1325,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1105,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 922,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 745,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 555,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 372,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ];
  const dispatch = useDispatch();
  const { EliteAgencies, loadingEliteAgengies } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchEliteagencies());
  }, []);

  const handleMoreEliteAgenciesCard = (size) => {
    dispatch(
      fetchEliteagencies({
        query: `nPerPage=${size}`,
      })
    );
  };
  

  return (
    <div className="landing_page_colored_container">
      <div
        style={{
          background:
            "linear-gradient(#bba249b8 -77.02%, rgba(187, 162, 73, 0) 94.6%)",
        }}
        className="colored_container"
      >
        <div className="cards_content_container">
          <div className="heading_container">
            <p className="landing_page_heading">Elite Agencies</p>
            <div className="btn">
              <Link href={"/agency"} style={{ color: "white" }}>
                DISCOVER MORE
              </Link>
            </div>
          </div>

          <div className={classes.cards_container}>
            <Loader loading={loadingEliteAgengies} minHeight={200}>
              {EliteAgencies?.data?.length > 0 ? (
                <CardSlider
                  show={7}
                  totalLength={EliteAgencies?.meta?.totalItems}
                  handleMoreCard={handleMoreEliteAgenciesCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {EliteAgencies?.data?.map((prop) => (
                    <EliteAgencyCard
                      key={`elite-egensies-home${prop?._id}`}
                      data={prop}
                    />
                  ))}
                </CardSlider>
              ) : !EliteAgencies?.data || EliteAgencies?.data?.length === 0 && !loadingEliteAgengies ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
            {/* <Slider arrows={true} {...settings}>
              {data?.map(() => {
                return <EliteAgencyCard />;
              })} */}
            {/* <EliteAgencyCard />
              <EliteAgencyCard />
              <EliteAgencyCard />
              <EliteAgencyCard />
              <EliteAgencyCard />
              <EliteAgencyCard />
              <EliteAgencyCard />
              <EliteAgencyCard /> */}
            {/* </Slider> */}
          </div>
          <div
            style={{
              marginRight: "10px",
            }}
            className="Media_btn"
          >
            <Link href={"/agency"} style={{ color: "white" }}>
              DISCOVER MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EliteAgencies;
