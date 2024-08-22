import React, { useEffect, useRef, useState } from "react";
import MapSectionCard from "../../cards/map-section-card";
import classes from "./map.module.css";
import drop_down_icon from "../../../public/assets/icons/drop_down.svg";

import near_me_pin from "../../../public/assets/icons/near_me_pin.svg";
import search_icon from "../../../public/assets/icons/search_icon.svg";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { Autocomplete } from "@react-google-maps/api";
import { PropertyMap } from "../../common/maps";
import { MAP_API_KEY } from "../../../config";
import scrollIntoView from 'scroll-into-view-if-needed';
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoints, fetchProperties } from "../../../redux/property";
import { objectToQueryString, removeEmptyFields } from "../../../utils";
import Loader from "../../common/loader";
import Paginate from "../../common/pagination";
import { Select, message } from "antd";
import { useAuth } from "../../../contextApi";
import { addUserSearch } from "../../../redux/users";

function Map({ refInstance }) {
  const dispatch = useDispatch()
  const { properties, loadingProperties, points } = useSelector((state) => state.property);
  const [map, setMap] = useState(null)
  const [polygons, setPolygons] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { location, recallLocation } = useCurrentLocation();
  const {user} = useAuth()
  const [selectedFields, setSelectedFields] = useState({
    purpose: "buy",
    type: "residential",
  });

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

  const autocompleteRef = useRef();

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  useEffect(() => {
    if(typeof window !== 'undefined'){
      const savedSearch = window.localStorage.getItem('savedSearch');
      if(savedSearch?.length > 0 ){
        const data = JSON.parse(savedSearch);
        setSelectedFields((prev) => ({...prev, ...data}))
        if(data?.searchText?.length  > 0){
          setSelectedAddress(data.searchText)
        }
      }
    }
  },[])

  useEffect(() => {
    const debounce =  setTimeout(() => {
      removeEmptyFields(selectedFields)
      dispatch(fetchProperties(`${objectToQueryString(selectedFields)}`))
      dispatch(fetchPoints(`${objectToQueryString(selectedFields)}`))
    }, 200)
    return () => clearTimeout(debounce);

  },[selectedFields])

  const onLikeTap = () => {
    return new Promise(async (resolve, reject) => {
      try {
        removeEmptyFields(selectedFields);
        await dispatch(fetchProperties(`${objectToQueryString(selectedFields)}`));
        await dispatch(fetchPoints(`${objectToQueryString(selectedFields)}`));
        resolve('Successfully completed the async operations');
      } catch (error) {
        reject(error);
      }
    });
  };

  // const fetchData = async (query) => {
  //   try {
  //     const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`);
  //     const data = await response.json();

  //     // Filter GeoJSON type
  //     const filterGeoJsonType = data.filter(item => item.geojson.type === 'Polygon');

  //     if(filterGeoJsonType){
  //       setPolygons(filterGeoJsonType?.[0]?.geojson?.coordinates[0] || [])
  //     }

  //     return filterGeoJsonType
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const onPlaceChanged = async () => {
    const place = autocompleteRef.current.getPlace();
    const { geometry } = place;
    setSelectedAddress(place.formatted_address)
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

    console.log("Map", map);

    const center = bounds.getCenter();
    const neCorner = bounds.getNorthEast();
    const radius = google.maps.geometry.spherical.computeDistanceBetween(center, neCorner);
    const radiusInKilometers = radius / 1000;

    let allQuery = {...selectedFields , lng: geometry.location.lng(), lat: geometry.location.lat(), radius: radiusInKilometers}
    setSelectedFields(allQuery)


    let featureLayer = map.getFeatureLayer(google.maps.FeatureType.COUNTRY);
    console.log("featureLayer",map.getMapCapabilities())
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
  };

  // const handleTapMapIcon = (id) => {
  //   const node = document.getElementById(id);
  //   if(node) {
  //     scrollIntoView(node,{
  //       behavior: 'smooth',
  //       block: 'start',
  //       inline: 'nearest',
  //       boundary: document.getElementById("map-side-container")
  //       })
  //   }
  // }

  const handleNearMe = () => {
    if(location?.lat){
      map.setCenter(location);
      map.setZoom(12)
      setSelectedFields({...selectedFields, lng: location.lng, lat: location.lat, radius: 600});
      setSelectedAddress("")
      setPolygons([])
    }else{
      recallLocation()
    }
  }

  const handlePageChange = (n) => {
    if(n !== properties?.meta?.currentPage){
      dispatch(fetchProperties(`pageNumber=${n}`));
      const node = document.getElementById('map-side-container-top');
      if(node) {
        scrollIntoView(node,{
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
          boundary: document.getElementById("map-side-container")
        })
      }
    }
  }

  const handlePurposeChange = (e) => {
    setSelectedFields({ purpose: e, type: "residential" });
  };

  const handleChange = (e, name) => {
    if(e?.target){
      setSelectedFields({ ...selectedFields, [e.target.name]: e.target.value || "" });
    }else {
      setSelectedFields({ ...selectedFields, [name]: e || "" });
    }
  };
  const handleSearchChange = (e) => {
    setSelectedAddress(e.target.value);
  };
  const OnSearchTap = (e) => {
    if(selectedAddress){
      onPlaceChanged()
    }
  };

  const handleSavedSearch = () => {
    if(Object.values(selectedFields).length > 0 || selectedAddress) {
      let data = {...selectedFields}
      if(selectedAddress?.length > 0){
        data.searchText = selectedAddress
      }
      window.localStorage.setItem('savedSearch', JSON.stringify(data));
      if(data?.searchText && user?.id && data?.lat && data?.lng && data?.radius && data?.purpose) {
        removeEmptyFields(data)
        dispatch(
          addUserSearch({
            userId: user?.id,
            accessToken: user?.accessToken,
            payload: {
              recentSearches: {
                ...data,
                address: data?.searchText,
                lat: data?.lat,
                lng: data?.lng,
                radius: data?.radius
              }
            },
          })
        )
      }
      message.success("Search saved successfully");
    }
  };
  const handleRemoveSavedSearch = () => {
    window.localStorage.removeItem('savedSearch');
    setSelectedAddress("");
    setSelectedFields({
      purpose: "buy",
      type: "residential",
    })
    setPolygons([])
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
        <div ref={refInstance} className={classes.map_container}>
          <div className={classes.filter_bar_container}>
            <div className={classes.filter_bar}>
            {map && (
              <Autocomplete
                onLoad={onLoadAutocomplete}
                onPlaceChanged={onPlaceChanged}
                key={MAP_API_KEY}
                // types={['(cities)','address',]}
                // key="AIzaSyA1uIgJLlFocMlwcu8b3wKPKkdT2mWV3AU"
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
                    alt="near search"
                  />
                  <img className="input_icon_2" alt="search" src={search_icon.src} onClick={OnSearchTap} />
                </div>
              </Autocomplete>
            )}

              <div
                style={{ minWidth: "75px" }}
                className="select_input_container"
              >
                {/* <select className={classes.input_field}>
                  <option>Buy</option>
                </select> */}
                <Select
                  name="purpose"
                  
                  // id="purpose"
                  value={selectedFields.purpose}
                  onChange={handlePurposeChange}
                  className={`${classes.input_field} custom-select`}
                  // onBlur={handleBlur}
                >
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="coliving space">Shared Living</option>
                  <option value="coworking space">Co-Working</option>
                </Select>
                <img src={drop_down_icon.src} alt="down" />
              </div>

              <div
                style={{ minWidth: "140px" }}
                className="select_input_container"
              >
                <Select
                  value={selectedFields.type || undefined}
                  className={`${classes.input_field} custom-select`}
                  name="type"
                  onChange={(e) => handleChange(e, "type")}
                  placeholder="Type"
                >
                  {Object.keys(
                    propertyNamesByType?.[selectedFields?.purpose]
                  ).map((item, i) => {
                    const capitalizedItem =
                      item.charAt(0).toUpperCase() + item.slice(1);
                    return <option key={`a-${i}`} value={item}>{capitalizedItem}</option>;
                  })}
                </Select>
                <img src={drop_down_icon.src} alt="down" />
              </div>
              {/* <div
                style={{ minWidth: "140px" }}
                className="select_input_container"
              >
                <select className={classes.input_field}>
                  <option hidden>Select Subtype</option>
                  {propertyNamesByType?.[selectedFields?.purpose]?.[
                    selectedFields?.type
                  ]?.map((item) => {
                    const capitalizedItem =
                      item.charAt(0).toUpperCase() + item.slice(1);
                    return <option value={item}>{capitalizedItem}</option>;
                  })}
                </select>
                <img src={drop_down_icon.src} />
              </div> */}

              <div
                style={{ minWidth: "60px" }}
                className="select_input_container"
              >
                {/* <select className={classes.input_field}>
                  <option>Area (Sqt)</option>
                </select> */}
                <input
                  onChange={handleChange}
                  name="minAreaSize"
                  value={selectedFields?.minAreaSize || ""}
                  className={classes.input_field}
                  placeholder="Min Area (Sqt)"
                />
                {/* <option>Area (Sqt)</option> */}
                {/* <img src={drop_down_icon.src} /> */}
              </div>

              <div
                style={{ minWidth: "60px" }}
                
                className="select_input_container"
              >
                {/* <select className={classes.input_field}>
                  <option>Area (Sqt)</option>
                </select> */}
                <input
                name="maxAreaSize"
                value={selectedFields?.maxAreaSize || ""}
                  onChange={handleChange}
                  className={classes.input_field}
                  placeholder="Max Area (Sqt)"
                />
                {/* <option>Area (Sqt)</option> */}
                {/* <img src={drop_down_icon.src} /> */}
              </div>

              <div
                style={{ minWidth: "45px" }}
                className="select_input_container"
              >
                {/* <select className={classes.input_field}>
                  <option>Price</option>
                </select>
                <img src={drop_down_icon.src} /> */}
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
                {/* <select className={classes.input_field}>
                  <option>Price</option>
                </select>
                <img src={drop_down_icon.src} /> */}
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
                <Select
                  name="noOfBedrooms"
                  value={selectedFields?.noOfBedrooms || undefined}
                  onChange={(e) => handleChange(e, "noOfBedrooms")}
                  className={`${classes.input_field} custom-select`}
                  placeholder="Beds"
                >
                  <option value="all">All</option>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value='3'>3 Beds</option>
                  <option value="4">4 Beds</option>
                  <option value="5">5 Beds</option>
                  <option value="6">6 Beds</option>
                </Select>
                <img src={drop_down_icon.src} alt="down" />
              </div>

              <div
                style={{ minWidth: "90px" }}
                className="select_input_container"
              >
                <Select
                  name="noOfBathrooms"
                  value={selectedFields?.noOfBathrooms || undefined}
                  onChange={(e) => handleChange(e, "noOfBathrooms")}
                  className={`${classes.input_field} custom-select`}
                  placeholder="Baths"
                >
                  <option value="all">All</option>
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3">3 Baths</option>
                  <option value="4">4 Baths</option>
                  <option value="5">5 Baths</option>
                  <option value="6">6 Baths</option>
                </Select>
                <img src={drop_down_icon.src} alt="down" />
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

            <div style={{ display: 'flex' , gap: "8px"}}>
              <div className="btn" onClick={handleRemoveSavedSearch}>
                <p>
                  RESET
                </p>
              </div>
              <div className="btn" onClick={handleSavedSearch}>
                <p>
                  SAVE
                </p>
              </div>
            </div>

          </div>

          <div className={classes.map_property_section}>
            <div className={classes.map_section}>
            <PropertyMap map={map} setMap={setMap} polygons={polygons} setPolygons={setPolygons} currentLocation={location} points={points || []} /> 
            </div>
            <div className={classes.properties_section_container}>
              <div className={classes.property_title_bar}>
                <h2>{selectedAddress || "Properties"}</h2>
                <div className="select_input_container">
                  <Select className={`${classes.sort_by_input} custom-select`}
                    name="sort"
                    value={selectedFields?.sort || ""}
                    onChange={(e) => handleChange(e, "sort")}
                  >
                    <option selected value="">All</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="priceLow">Lowest Price</option>
                    <option value="priceHigh">Highest Price</option>
                  </Select>
                  <img
                    style={{ width: "14px" }}
                    src={drop_down_icon.src}
                    alt="down"
                  />
                </div>
              </div>
              

                <div className={classes.properties_section} id="map-side-container">
                  <div id="map-side-container-top"  style={{position: "absolute"}}/>
                  <Loader loading={loadingProperties}>
                    <div className={classes.properties_section_grid} >
                      {properties?.data?.length > 0 && properties?.data?.map((p) => {
                        return(
                          <MapSectionCard key={p._id} p={p} onLikeTap={onLikeTap} />
                        )
                      })}
                      {((!loadingProperties && properties?.data?.length === 0) || (!properties?.data)) && (
                        <div>No Property found</div>
                        )}
                    </div>
                  </Loader>
                  <Paginate data={properties} handlePageChange={handlePageChange} align="center" />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={classes.recently_viewed_container}>
        <div className={classes.recently_viewed_content}>
          <div className="heading_container">
            <h2 className="landing_page_heading">Recently Viewed</h2>
            <div className="btn">
              <p>DISCOVER MORE</p>
            </div>
          </div>
          <div className={classes.recently_viewed_card_container}>
            <Slider arrows={true} {...settings}>
              <PropertyCard />
              <PropertyCard />
              <PropertyCard />
              <PropertyCard />
              <PropertyCard />
              <PropertyCard />
              <PropertyCard />
            </Slider>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Map;
