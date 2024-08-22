import React, { useEffect } from "react";
import classes from "./project-to-show.module.css";
import bg from "../../../public/assets/landing-page-assets/project-to-show-bg.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeatureProjects,
  fetchNewLaunchProjects,
  fetchReadyProjects,
} from "../../../redux/property";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";
import HotProjectCard from "../../cards/hot-project-card";
import Link from "next/link";
import { objectToQueryString } from "../../../utils";

function ProjectsToShow({
  otherDivRef,
  textColor,
  color,
  title,
  hideBtnContainer,
  hidetags,
  status,
  type,
  projectById
}) {
  const responsive = [
    {
      breakpoint: 1177,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ];

  const dispatch = useDispatch();
  const {
    featureProjects,
    loadingFeatureProjects,
    newLaunch,
    loadingNewLaunch,
    readyMove,
    loadingReadyMove,
  } = useSelector((state) => state.property);
  useEffect(() => {
    if (status) {
      dispatch(fetchNewLaunchProjects(objectToQueryString({ status: status })));
    } else if (type && projectById?._id) {
      dispatch(fetchReadyProjects(objectToQueryString({ type: type })));
    } else {
      dispatch(fetchFeatureProjects());
    }
  }, [projectById?._id]);
  return (
    <div
      ref={otherDivRef}
      className="listed_properties_container"
      style={{ marginBottom: "0px" }}
    >
      <div className="properties_and_filter_container">
        <div className="cities_container">
          <p
            style={{ color: textColor ? textColor : color }}
            className="listed_properties_heading"
          >
            {title}
          </p>
          {!hideBtnContainer && (
            <div className="cities_btns_container">
              <div className="city_btn">
                <p>Lahore</p>
              </div>
              <div className="city_btn">
                <p>Karachi</p>
              </div>
              <div className="city_btn">
                <p>Islamabad</p>
              </div>
              <div className="city_btn">
                <p>Rawalpindi</p>
              </div>
              <div style={{ marginLeft: "20px" }} className="btn">
                <Link
                  href={"/builders"}
                  style={{ color: "white" }}
                >
                  Discover More
                </Link>
              </div>
            </div>
          )}
        </div>
        {!hidetags && (
          <div className="Media_btns2_container">
            <div className="Media_btns2">
              <button>Karachi</button>
              <button>Lahore</button>
              <button>Islamabad</button>
              <button>Rawalpindi</button>
            </div>
          </div>
        )}
        <div className="properties_container">
          {status ? (
            <Loader loading={loadingNewLaunch} minHeight={200}>
              {newLaunch?.data?.length > 0 ? (
                <CardSlider
                  totalLength={newLaunch?.meta?.totalItems}
                  handleMoreCard={() => null}
                  // handleMoreCard={handleMoreSaleCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {newLaunch?.data?.map((e, i) => {
                    return <HotProjectCard key={`j-${i}`} data={e} />;
                  })}
                </CardSlider>
              ) : newLaunch?.data?.length === 0 && !loadingNewLaunch ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
          ) : type ? (
            <Loader loading={loadingReadyMove} minHeight={200}>
              {readyMove?.data?.length > 0 ? (
                <CardSlider
                  totalLength={readyMove?.meta?.totalItems}
                  handleMoreCard={() => null}
                  // handleMoreCard={handleMoreSaleCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {readyMove?.data?.map((e,i) => {
                    return <HotProjectCard key={`k-${i}`} data={e} />;
                  })}
                </CardSlider>
              ) : readyMove?.data?.length === 0 && !loadingReadyMove ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
          ) : (
            <Loader loading={loadingFeatureProjects} minHeight={200}>
              {featureProjects?.data?.length > 0 ? (
                <CardSlider
                  totalLength={featureProjects?.meta?.totalItems}
                  handleMoreCard={() => null}
                  // handleMoreCard={handleMoreSaleCard}
                  disableInfinite
                  responsive={responsive}
                >
                  {featureProjects?.data?.map((e,i) => {
                    return <HotProjectCard key={`l-${i}`} data={e} />;
                  })}
                </CardSlider>
              ) : featureProjects?.data?.length === 0 &&
                !loadingFeatureProjects ? (
                <div className="dataNotFound">
                  <div className="notFoundImg" />
                  Oops! Not found
                </div>
              ) : (
                ""
              )}
            </Loader>
          )}
        </div>
        {!hideBtnContainer && (
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
        )}
      </div>
      <div className="listed_properties_upper_banner">
        <div
          style={{ background: color }}
          className="listed_property_overlay"
        />
        <Image src={bg} fill className={classes.bg} alt="down" />
      </div>
    </div>
  );
}

export default ProjectsToShow;
