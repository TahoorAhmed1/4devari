import React, { useEffect, useState } from "react";
import MapSectionCard from "../../cards/map-section-card";
import PropertyCard from "../../cards/property-card";
import classes from "./commonSearch.module.css";

import drop_down_icon from "/public/assets/icons/drop_down.svg";
import near_me_pin from "/public/assets/icons/near_me_pin.svg";
import search_icon from "/public/assets/icons/search_icon.svg";

import erase from "/public/assets/icons/erase.svg";
import draw from "/public/assets/icons/draw.svg";

import {
  constructQueryString,
  objectToQueryString,
  removeEmptyFields,
  updateQueryFromUrl,
  useWindowSize,
} from "../../../utils";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { PropertyMap } from "../maps";
import { Autocomplete } from "@react-google-maps/api";
import { MAP_API_KEY } from "../../../config";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { fetchPoints, fetchProperties } from "../../../redux/property";
import { Select, message } from "antd";
import Loader from "../loader";
import Paginate from "../pagination";
import { useAuth } from "../../../contextApi";
import { fetchUsersById } from "../../../redux/users";

function CommonSearchSection({ refInstance }) {
  const dispatch = useDispatch();
  const {user} = useAuth()
  const { properties, loadingProperties, points } = useSelector(
    (state) => state.property
  );
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { location, address, recallLocation } = useCurrentLocation();
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState({
    purpose: "buy",
    type: "residential",
  });

  const isMobileScreen = useWindowSize().width < 426;
  const width = useWindowSize().width;
  const [pointFocus, setPointFocus] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const autocompleteRef = useRef();

  const propertyNamesByType = {
    buy: {
      residential: [
        "House",
        "Flat",
        "Lower portion",
        "Upper portion",
        "Farmhouse",
        "Pent house",
        "Basement",
        "Hostel",
        "Guest house",
        "Hotel suites",
        "Beach huts",
      ],
      commercial: [
        "Office",
        "Shop",
        "Warehouse",
        "Factory",
        "Building",
        "Others",
      ],
      plot: [
        "Residential plot",
        "Commercial plot",
        "Agriculture plot",
        "Industrial plot",
        "Plot file",
        "Plot form",
      ],
    },
    rent: {
      residential: [
        "House",
        "Flat",
        "Lower portion",
        "Upper portion",
        "Pent house",
        "Basement",
        "Farmhouse",
        "Guest house",
        "Hotel suites",
        "Beach huts",
      ],
      commercial: [
        "Office",
        "Shop",
        "Warehouse",
        "Factory",
        "Building",
        "Others",
      ],
      plot: [
        "Residential plot",
        "Commercial plot",
        "Agricultral plot",
        "Industrial plot",
      ],
    },
    "coliving space": {
      residential: ["House", "Flat", "Hostel"],
      commercial: ["House", "Flat", "Hostel"],
    },
    "coworking space": {
      residential: [
        "Islamabad",
        "Lahore",
        "Karachi",
        "Rawalpindi",
        "Faislabad",
        "Multan",
      ],
      commercial: [
        "Islamabad",
        "Lahore",
        "Karachi",
        "Rawalpindi",
        "Faislabad",
        "Multan",
      ],
    },
  };

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUsersById(user?.id));
    }
  }, [user]);

  useEffect(() => {
    if (router.query && router.isReady && !router.query?.ftype) {
      const query = router.query;
      const updateQuery = updateQueryFromUrl(query);
      console.log("Updated path: ", updateQuery);
      setSelectedFields(updateQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (router.query?.ftype === 'link') {
      const query = router.query;
      delete query.ftype;
      const updateQuery = updateQueryFromUrl(query);
      setSelectedFields(updateQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.ftype]);

  useEffect(() => {
    if (initialRender) {
      // Set initialRender to false to avoid running this code on refresh
      setInitialRender(false);
      return;
    }

    const updatePath = constructQueryString(selectedFields);
    router.push({
      pathname: updatePath.path,
      query: updatePath.allQueries,
    });

    const debounce = setTimeout(() => {
      removeEmptyFields(selectedFields);
      dispatch(fetchProperties(`${objectToQueryString(selectedFields)}`));
      dispatch(fetchPoints(`${objectToQueryString(selectedFields)}`));
    }, 200);

    return () => clearTimeout(debounce);
  }, [selectedFields, initialRender]);

  const onPlaceChanged = async () => {
    const place = autocompleteRef.current.getPlace();
    const { geometry } = place;
    if(geometry?.viewport){
        setSelectedAddress(place.formatted_address);
        // await fetchData(place.formatted_address)
        // note: temporary radius is 600 for all world no need to send in production
        // radius: 600
        // let allQuery = {...queries, address: place.formatted_address }
        // delete allQuery.lng
        // delete allQuery.lat
    
        const bounds = new window.google.maps.LatLngBounds();
        if (geometry.viewport) {
          bounds.union(geometry.viewport);
        } else {
          bounds.extend(geometry.location);
        }
    
        map.fitBounds(bounds);
    
        const center = bounds.getCenter();
        const neCorner = bounds.getNorthEast();
        const radius = google.maps.geometry.spherical.computeDistanceBetween(
          center,
          neCorner
        );
        const radiusInKilometers = radius / 1000;
    
        let allQuery = {
          ...selectedFields,
          lng: geometry.location.lng(),
          lat: geometry.location.lat(),
          radius: radiusInKilometers,
        };
        setSelectedFields(allQuery);
    
        let featureLayer = map.getFeatureLayer(google.maps.FeatureType.COUNTRY);
        console.log("featureLayer", map.getMapCapabilities());
        // featureLayer.isEnabled = true;
    
        // Define a style with purple fill and border.
        const featureStyleOptions = {
          strokeColor: "#810FCB",
          strokeOpacity: 1.0,
          strokeWeight: 3.0,
          fillColor: "#810FCB",
          fillOpacity: 0.5,
        };
    
        // Apply the style to a single boundary.
        featureLayer.style = (options) => {
          if (options.feature.placeId === place.place_id) {
            return featureStyleOptions;
          }
        };
    }
  };
 
  useEffect(() => {
    if (map && selectedFields) {
      if(selectedFields?.lat && selectedFields?.lng){
        const latLng = new window.google.maps.LatLng(
          parseFloat(selectedFields.lat),
          parseFloat(selectedFields.lng)
        );

        if(selectedFields?.radius){
          const zoomLevel = Math.round(16 - Math.log2((selectedFields?.radius * 1000) / 500));
          const zoom = Math.max(1, Math.min(zoomLevel, 18));
          map.setCenter(latLng);
          map.setZoom(zoom)
        }else{
          map.setCenter(latLng);
          map.setZoom(10);
        }
      }
    }
  }, [selectedFields, map]);

  const handleNearMe = () => {
    if (location?.lat) {
      map.setCenter(location);
      map.setZoom(12);
      setSelectedFields({
        ...selectedFields,
        lng: location.lng,
        lat: location.lat,
        radius: 600,
      });
      setSelectedAddress("");
      setPolygons([]);
    } else {
      recallLocation();
    }
  };

  const handlePageChange = (n) => {
    if (n !== properties?.meta?.currentPage) {
      dispatch(fetchProperties(`pageNumber=${n}`));
    }
  };

  const handlePurposeChange = (e) => {
    setSelectedFields({ purpose: e.target.value, type: "residential" });
  };

  const handleChange = (e, name) => {
    if(e?.target){
      setSelectedFields({ ...selectedFields, [e.target.name]: e.target.value || "" });
    }else {
      setSelectedFields({ ...selectedFields, [name]: e || "" });
    }
  }
  const handleSearchChange = (e) => {
    setSelectedAddress(e.target.value);
  };
  const OnSearchTap = (e) => {
    if (selectedAddress) {
      onPlaceChanged();
    }
  };

  const handleReset = () => {
    setSelectedAddress("");
    setSelectedFields({
      purpose: "buy",
      type: "residential",
    });
    setPolygons([]);
    message.success("Search reset successfully");
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
        {map && width < 426 && (
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
            key={MAP_API_KEY}
            className={classes.mobile_search}
            restrictions={{ country: "PK" }}
            // types={['(cities)','address']}
          >
            <div
              style={{ minWidth: "260px", paddingTop: "20px", width: "100%" }}
              className="select_input_container_2_icons"
            >
              <input
                placeholder="Address, Neighborhood or ZIP"
                className={classes.input_field}
                value={selectedAddress || ""}
                onChange={handleSearchChange}
              />
              <img
                id="near-me"
                className="input_icon_1"
                src={near_me_pin.src}
                onClick={handleNearMe}
              />
              <img
                className="input_icon_2"
                src={search_icon.src}
                onClick={OnSearchTap}
              />
            </div>
          </Autocomplete>
        )}
        <div ref={refInstance} className={classes.map_container}>
          {/* {width > 425 ? ( */}
          <div className={classes.filter_bar_container}>
            <div className={classes.filter_bar}>
              {map && width > 425 && (
                <Autocomplete
                  onLoad={onLoadAutocomplete}
                  onPlaceChanged={onPlaceChanged}
                  key={MAP_API_KEY}
                  restrictions={{ country: "PK" }}
                  // types={['address']}  
                >
                  <div
                    style={{ minWidth: "260px" }}
                    className="select_input_container_2_icons"
                  >
                    <input
                      placeholder="Address, Neighborhood or ZIP"
                      className={classes.input_field}
                      value={selectedAddress || ""}
                      onChange={handleSearchChange}
                    />
                    <img
                      id="near-me"
                      className="input_icon_1"
                      src={near_me_pin.src}
                      onClick={handleNearMe}
                    />
                    <img
                      className="input_icon_2"
                      src={search_icon.src}
                      onClick={OnSearchTap}
                    />
                  </div>
                </Autocomplete>
              )}

              <div
                style={{ minWidth: "75px" }}
                className="select_input_container"
              >
                <select
                  name="purpose"
                  value={selectedFields?.purpose || ""}
                  onChange={handlePurposeChange}
                  className={classes.input_field}
                >
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="coliving space">Shared Living</option>
                  <option value="coworking space">Co-Working</option>
                </select>
                <img src={drop_down_icon.src} />
              </div>

              <div
                style={{ minWidth: "140px" }}
                className="select_input_container"
              >
                <select
                  value={selectedFields.type}
                  className={classes.input_field}
                  name="type"
                  onChange={handleChange}
                >
                  <option hidden>Property Type</option>
                  {Object.keys(
                    propertyNamesByType?.[selectedFields?.purpose] || {}
                  ).map((item) => {
                    const capitalizedItem =
                      item.charAt(0).toUpperCase() + item.slice(1);
                    return <option value={item}>{capitalizedItem}</option>;
                  })}
                </select>
                <img src={drop_down_icon.src} />
              </div>

              <div
                style={{ minWidth: "120px" }}
                className="select_input_container"
              >
                <input
                  onChange={handleChange}
                  name="minAreaSize"
                  value={selectedFields?.minAreaSize || ""}
                  className={classes.input_field}
                  placeholder="Min Area (Sqt)"
                />
              </div>

              <div
                style={{ minWidth: "60px" }}
                className="select_input_container"
              >
                <input
                  name="maxAreaSize"
                  value={selectedFields?.maxAreaSize || ""}
                  onChange={handleChange}
                  className={classes.input_field}
                  placeholder="Max Area (Sqt)"
                />
              </div>

              <div
                style={{ minWidth: "90px" }}
                className="select_input_container"
              >
                <input
                  onChange={handleChange}
                  name="minPrice"
                  value={selectedFields?.minPrice || ""}
                  className={classes.input_field}
                  placeholder="Min Price"
                />
              </div>

              <div
                style={{ minWidth: "45px" }}
                className="select_input_container"
              >
                <input
                  onChange={handleChange}
                  name="maxPrice"
                  value={selectedFields?.maxPrice || ""}
                  className={classes.input_field}
                  placeholder="Max Price"
                />
              </div>

              <div
                style={{ minWidth: "80px" }}
                className="select_input_container"
              >
                <select
                  name="noOfBedrooms"
                  value={selectedFields?.noOfBedrooms || ""}
                  onChange={handleChange}
                  className={classes.input_field}
                >
                  <option hidden>Beds</option>
                  <option value="all">All</option>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3">3 Beds</option>
                  <option value="4">4 Beds</option>
                  <option value="5">5 Beds</option>
                  <option value="6">6 Beds</option>
                </select>
                <img src={drop_down_icon.src} />
              </div>

              <div
                style={{ minWidth: "90px" }}
                className="select_input_container"
              >
                <select
                  name="noOfBathrooms"
                  value={selectedFields?.noOfBathrooms || ""}
                  onChange={handleChange}
                  className={classes.input_field}
                >
                  <option hidden>Baths</option>
                  <option value="all">All</option>
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3">3 Baths</option>
                  <option value="4">4 Baths</option>
                  <option value="5">5 Baths</option>
                  <option value="6">6 Baths</option>
                </select>
                <img src={drop_down_icon.src} />
              </div>

              {/* <div
                style={{ minWidth: "145px" }}
                className="select_input_container"
              >
                <select className={classes.input_field}>
                  <option>More Options</option>
                </select>
                <img src={drop_down_icon.src} />
              </div> */}
            </div>

            <div className={classes.buy_map_btn} onClick={handleReset}>
              <p>RESET</p>
            </div>
          </div>
          {/* ) : (
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
          //       <span>City/Location</span>
          //       <span>Buy</span>
          //       <span>Area {"(Sqft)"}</span>
          //       <span>Property Type</span>
          //       <span>Price</span>
          //       <span>Beds</span>
              </div>
              <div className={classes.mobile_filter_bar}>
          //       <div className={classes.mobile_filter_head}>
          //         <h2>Karachi, Defence DHA Houses for Sale</h2>
          //         <p>12 Apartments available for sale</p>
          //       </div>
          //       <div className={classes.mobile_filter_list}>
          //         <span>{svg_mobile_filterbar_list}List</span>
          //       </div>
              </div>
            </>
          )} */}
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
                currentLocation={location}
                points={points || []}
              />
            </div>
            <div className={classes.properties_section_container}>
              <div className={classes.property_title_bar}>
                <h2>{selectedAddress || address || "For Sale"}</h2>
                <div className="select_input_container">
                  <Select
                    className={`${classes.sort_by_input} custom-select`}
                    name="sort"
                    value={selectedFields?.sort || ""}
                    onChange={(e) => handleChange(e, "sort")}
                  >
                    <option selected value="" >All</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="priceLow">Lowest Price</option>
                    <option value="priceHigh">Highest Price</option>
                  </Select>
                  <img
                    style={{ width: "14px" }}
                    src={drop_down_icon.src}
                  />
                </div>
              </div>

              <div
                className={classes.properties_section}
                id="filter-map-side-container"
              >
                <div
                  id="filter-map-side-container-top"
                  style={{ position: "absolute" }}
                />
                <Loader loading={loadingProperties}>
                  <div className={classes.properties_section_grid}>
                    {properties?.data?.length > 0 &&
                      properties?.data?.map((p) => {
                        return <MapSectionCard key={p._id} p={p} refetchQuery />;
                      })}
                    {((!loadingProperties && properties?.data?.length === 0) ||
                      !properties?.data) && <div>No Property found</div>}
                  </div>
                  <Paginate
                    data={properties}
                    handlePageChange={handlePageChange}
                    align="center"
                  />
                </Loader>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileScreen && pointFocus && (
        <div className={classes.mobile_recently_viewed_card_container}>
          <PropertyCard />
        </div>
      )}
    </div>
  );
}

export default CommonSearchSection;
