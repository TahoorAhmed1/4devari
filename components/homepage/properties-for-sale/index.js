import React from "react";
import classes from "./properties-for-sale.module.css";
import bg from "../../../public/assets/landing-page-assets/listed-property-bg.png";
import Image from "next/image";
import PropertyCard from "../../cards/property-card";
import { goTo } from "../../../utils";
import { PURPOSE } from "../../../utils/constants";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";

function PropertiesForSale({
  otherDivRef,
  textColor,
  color,
  title,
  hideBtnContainer,
  property,
  prop_purpose,
  handleMoreCard,
  isLoading,
}) {
  const responsive = [
    {
      breakpoint: 1270,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1035,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 690,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ];

  const cities = [
    {
      label: "Islamabad",
      link: "/buy/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356",
    },
    {
      label: "Lahore",
      link: "/buy/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462",
    },
    {
      label: "Karachi",
      link: "/buy/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182",
    },
    {
      label: "Rawalpindi",
      link: "/buy/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543",
    },
    {
      label: "Faislabad",
      link: "/buy/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485",
    },
    {
      label: "Multan",
      link: "/buy/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714",
    },
  ];

  return (
    <div ref={otherDivRef} className="listed_properties_container">
      <div className="properties_and_filter_container">
        <div className="cities_container">
          <p
            style={{ color: textColor ? textColor : color, padding: "12px" }}
            className="listed_properties_heading"
          >
            {title}
          </p>
          {!hideBtnContainer && (
            <div className="cities_btns_container">
              <div className="city_btn">
                <p
                  onClick={() =>
                    goTo({
                      purpose: prop_purpose || PURPOSE.buy,
                      lng: 74.35874729999999,
                      lat: 31.5203696,
                      radius: 31.72357060620462,
                    })
                  }
                >
                  Lahore
                </p>
              </div>
              <div className="city_btn">
                <p
                  onClick={() =>
                    goTo({
                      purpose: prop_purpose || PURPOSE.buy,
                      lng: 67.0011364,
                      lat: 24.8607343,
                      radius: 70.80875090113182,
                    })
                  }
                >
                  Karachi
                </p>
              </div>
              <div className="city_btn">
                <p
                  onClick={() =>
                    goTo({
                      purpose: prop_purpose || PURPOSE.buy,
                      lng: 73.04788479999999,
                      lat: 33.6844202,
                      radius: 33.500792551547356,
                    })
                  }
                >
                  Islamabad
                </p>
              </div>
              <div className="city_btn">
                <p
                  onClick={() =>
                    goTo({
                      purpose: prop_purpose || PURPOSE.buy,
                      lng: 73.0169135,
                      lat: 33.5651107,
                      radius: 16.583152964339543,
                    })
                  }
                >
                  Rawalpindi
                </p>
              </div>
              <div
                style={{ marginLeft: "20px" }}
                className="btn"
                onClick={() =>
                  goTo({
                    purpose: prop_purpose || PURPOSE.buy,
                  })
                }
              >
                <p>Discover More</p>
              </div>
            </div>
          )}
        </div>
        {!hideBtnContainer && (
          <div className="Media_btns2_container">
            <div className="Media_btns2">
              <button
                onClick={() =>
                  goTo({
                    purpose: prop_purpose || PURPOSE.buy,
                    lng: 67.0011364,
                    lat: 24.8607343,
                    radius: 70.80875090113182,
                  })
                }
              >
                Karachi
              </button>
              <button
                onClick={() =>
                  goTo({
                    purpose: prop_purpose || PURPOSE.buy,
                    lng: 74.35874729999999,
                    lat: 31.5203696,
                    radius: 31.72357060620462,
                  })
                }
              >
                Lahore
              </button>
              <button
                onClick={() =>
                  goTo({
                    purpose: prop_purpose || PURPOSE.buy,
                    lng: 73.04788479999999,
                    lat: 33.6844202,
                    radius: 33.500792551547356,
                  })
                }
              >
                Islamabad
              </button>
              <button
                onClick={() =>
                  goTo({
                    purpose: prop_purpose || PURPOSE.buy,
                    lng: 73.0169135,
                    lat: 33.5651107,
                    radius: 16.583152964339543,
                  })
                }
              >
                Rawalpindi
              </button>
            </div>
          </div>
        )}
        <div className="properties_container">
          <Loader loading={isLoading} minHeight={200}>
            {property?.data?.length > 0 ? (
              <CardSlider
                show={4}
                totalLength={property?.meta?.totalItems}
                handleMoreCard={handleMoreCard}
                disableInfinite
                responsive={responsive}
              >
                {property?.data?.map((prop) => (
                  <PropertyCard key={`home-p-${prop?._id}`} data={prop} />
                ))}
              </CardSlider>
            ) : !property?.data ||
              (property?.data?.length === 0 && !isLoading) ? (
              <div className={"dataNotFound"}>
                <div className={"notFoundImg"} />
                Oops! No Property found
              </div>
            ) : (
              ""
            )}
          </Loader>
          {/* <PropertyCard isAd={true} /> */}
          {/* <Slider arrows={true} {...settings}>
            {property?.data?.length > 0 &&
              property?.data?.map((item, i) => {
                return <PropertyCard data={item} />;
              })}
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </Slider> */}
        </div>
        <div
          style={{
            marginRight: "10px",
          }}
          className="Media_btn"
          onClick={() =>
            goTo({
              purpose: prop_purpose || PURPOSE.buy,
            })
          }
        >
          <p>DISCOVER MORE</p>
        </div>
      </div>
      <div className="listed_properties_upper_banner">
        <div
          style={{ backgroundColor: color }}
          className="listed_property_overlay"
        />
        <Image src={bg} fill className={classes.bg} alt="down" />
      </div>
    </div>
  );
}

export default PropertiesForSale;
