import React, { useState } from "react";
import MapSectionCard from "../../../components/cards/map-section-card";
import PropertyCard from "../../../components/cards/property-card";
import classes from "./buy_map.module.css";

import drop_down_icon from "../../../public/assets/icons/drop_down.svg";
import near_me_pin from "../../../public/assets/icons/near_me_pin.svg";
import search_icon from "../../../public/assets/icons/search_icon.svg";
import grey_drop_down from "../../../public/assets/icons/grey_drop_down.svg";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Next from "../../../components/reactSlickButtons/next";
import Prev from "../../../components/reactSlickButtons/prev";
import erase from "../../../public/assets/icons/erase.svg";
import draw from "../../../public/assets/icons/draw.svg";

import { useWindowSize } from "../../../utils";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  svg_mobile_filter_search,
  svg_mobile_filterbar_list,
  svg_near_me,
} from "../../../public/Svgs";
import { PropertyMap } from "../../../components/common/maps";
import { Autocomplete } from "@react-google-maps/api";
import { MAP_API_KEY } from "../../../config";
import { useRef } from "react";

function Buy_map({ refInstance }) {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const isMobileScreen = useWindowSize().width < 426;
  const width = useWindowSize().width;
  const [pointFocus, setPointFocus] = useState(false);
  const autocompleteRef = useRef();

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const settings = {
    className: "common-slider",
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
      {
        breakpoint: 1385,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 1145,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 945,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };

  const onPlaceChanged = async () => {
    const place = autocompleteRef.current.getPlace();
    const { geometry } = place;
    // console.log(place)

    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }

    // const polygons = createPolygonFromBounds(bounds);
    // console.log(polygons)
    // setPolygons(poly)

    map.fitBounds(bounds);

    let featureLayer = map.getFeatureLayer("LOCALITY");
    // console.log(featureLayer);
    featureLayer.isEnabled = true;

    // Define a style with purple fill and border.
    //@ts-ignore
    const featureStyleOptions = {
      strokeColor: "#810FCB",
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillColor: "#810FCB",
      fillOpacity: 0.5,
    };

    // Apply the style to a single boundary.
    //@ts-ignore
    featureLayer.style = (options) => {
      console.log(options);
      if (options.feature.placeId == place.place_id) {
        // Hana, HI
        return featureStyleOptions;
      }
    };
  };

  return (
    <div className={classes.wrapper}>
      <ReactTooltip
        style={{ zIndex: "1000" }}
        anchorId="near-me"
        place="top"
        content="search near me"
      />
      <div className={classes.main_container}>
        <div ref={refInstance} className={classes.map_container}>
          {width > 425 ? (
            <div className={classes.filter_bar_container}>
              <div className={classes.filter_bar}>
                {map && (
                  <Autocomplete
                    onLoad={onLoadAutocomplete}
                    onPlaceChanged={onPlaceChanged}
                    key={MAP_API_KEY}
                    // key="AIzaSyA1uIgJLlFocMlwcu8b3wKPKkdT2mWV3AU"
                  >
                    <div
                      style={{ minWidth: "260px" }}
                      className="select_input_container_2_icons"
                    >
                      <input
                        placeholder="Address, Neighborhood or ZIP"
                        className={classes.input_field}
                      />
                      <img
                        id="near-me"
                        className="input_icon_1"
                        src={near_me_pin.src}
                      />
                      <img className="input_icon_2" src={search_icon.src} />
                    </div>
                  </Autocomplete>
                )}

                <div
                  style={{ minWidth: "75px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>Buy</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>

                <div
                  style={{ minWidth: "140px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>Property Type</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>

                <div
                  style={{ minWidth: "120px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>Area (Sqt)</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>

                <div
                  style={{ minWidth: "90px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>Price</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>

                <div
                  style={{ minWidth: "80px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>Beds</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>

                <div
                  style={{ minWidth: "90px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>Baths</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>

                <div
                  style={{ minWidth: "145px" }}
                  className="select_input_container"
                >
                  <select className={classes.input_field}>
                    <option>More Options</option>
                  </select>
                  <img src={drop_down_icon.src} />
                </div>
              </div>

              <div className={classes.buy_map_btn}>
                <p>SAVE SEARCH</p>
              </div>
            </div>
          ) : (
            <>
              <div className={classes.mobile_filter_search_container}>
                <div className={classes.mobile_filter_search}>
                  <input
                    placeholder="Address, Neighborhood or Zip..."
                    type="text"
                  />
                  <span className={classes.near_me}>{svg_near_me}Near Me</span>
                  <span className={classes.filter_search}>
                    {svg_mobile_filter_search}
                  </span>
                </div>
              </div>
              <div className={classes.mobile_map_tags}>
                <span>City/Location</span>
                <span>Buy</span>
                <span>Area {"(Sqft)"}</span>
                <span>Property Type</span>
                <span>Price</span>
                <span>Beds</span>
              </div>
              <div className={classes.mobile_filter_bar}>
                <div className={classes.mobile_filter_head}>
                  <h2>Karachi, Defence DHA Houses for Sale</h2>
                  <p>12 Apartments available for sale</p>
                </div>
                <div className={classes.mobile_filter_list}>
                  <span>{svg_mobile_filterbar_list}List</span>
                </div>
              </div>
            </>
          )}
          <div className={classes.map_property_section}>
            <div className={classes.map_section}>
              <div className={classes.map_btn_container}>
                <div className={classes.btn}>
                  <img src={erase.src} />
                  <p>Erase</p>
                </div>

                <div className={classes.btn}>
                  <img src={draw.src} />
                  <p>Draw</p>
                </div>
              </div>
              <PropertyMap
                map={map}
                setMap={setMap}
                polygons={polygons}
                setPolygons={setPolygons}
              />
            </div>
            <div className={classes.properties_section_container}>
              <div className={classes.property_title_bar}>
                <h2>Karachi, Defence DHA Houses for Sale</h2>
                <div className="select_input_container">
                  <select className={classes.sort_by_input}>
                    <option>Popular</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Lowest Price</option>
                    <option>Highest Price</option>
                  </select>
                  <img
                    style={{ opacity: 0.5, width: "14px" }}
                    src={grey_drop_down.src}
                  />
                </div>
              </div>

              <div className={classes.properties_section}>
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isMobileScreen && width < 1024 && (
        <div className={classes.recently_viewed_container}>
          <div className={classes.recently_viewed_content}>
            <div className={classes.property_title_bar}>
              <h2>Karachi, Defence DHA Houses for Sale</h2>
              <div className="select_input_container">
                <select className={classes.sort_by_input}>
                  <option>Popular</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Lowest Price</option>
                  <option>Highest Price</option>
                </select>
                <img
                  style={{ opacity: 0.5, width: "14px" }}
                  src={grey_drop_down.src}
                />
              </div>
            </div>

            <div className={classes.recently_viewed_card_container}>
              <Slider arrows={true} {...settings}>
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
                <MapSectionCard />
              </Slider>
            </div>
          </div>
        </div>
      )}
      {isMobileScreen && pointFocus && (
        <div className={classes.mobile_recently_viewed_card_container}>
          {/* <Slider arrows={true} {...settings}> */}
          <PropertyCard />
          {/* </Slider> */}
        </div>
      )}
    </div>
  );
}

export default Buy_map;
