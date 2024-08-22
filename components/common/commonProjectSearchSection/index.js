import React, { useEffect, useState } from "react";
import classes from "./CommonProjectSearch.module.css";

import drop_down_icon from "/public/assets/icons/drop_down.svg";
import near_me_pin from "/public/assets/icons/near_me_pin.svg";
import search_icon from "/public/assets/icons/search_icon.svg";

import erase from "/public/assets/icons/erase.svg";
import draw from "/public/assets/icons/draw.svg";

import {
  objectToQueryString,
  removeEmptyFields,
  useWindowSize,
} from "../../../utils";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ProjectMap } from "../maps";
import { Autocomplete } from "@react-google-maps/api";
import { MAP_API_KEY } from "../../../config";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { Select, message } from "antd";
import Loader from "../loader";
import Paginate from "../pagination";
import { fetchProjectPoints, fetchProjects } from "../../../redux/project";
import ProjectMapSectionCard from "../../cards/project-map-section-card";
import { useAuth } from "../../../contextApi";
import { fetchUsersById } from "../../../redux/users";

function CommonProjectSearchSection({ refInstance }) {
  const dispatch = useDispatch();
  const {user} = useAuth()
  const { projects, loadingProjects, projectPoints } = useSelector(
    (state) => state.project
  );
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { location, address, error, recallLocation } = useCurrentLocation();
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState({});

  const width = useWindowSize().width;
  const [initialRender, setInitialRender] = useState(true);
  const autocompleteRef = useRef();
  const autocompleteCityRef = useRef();

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  const onLoadAutocompleteCity = (autocomplete) => {
    autocompleteCityRef.current = autocomplete;
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUsersById(user?.id));
    }
  }, [user]);

  useEffect(() => {
    if (router.query && router.isReady && !router.query?.ftype) {
      const query = router.query;
      setSelectedFields(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (router.query?.ftype === 'link') {
      const query = router.query;
      delete query.ftype;
      setSelectedFields(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.ftype]);

  useEffect(() => {
    if (initialRender) {
      // Set initialRender to false to avoid running this code on refresh
      setInitialRender(false);
      return;
    }

    const updateIntoQuery = objectToQueryString(selectedFields);
    router.push({
      pathname: router.pathname,
      query: updateIntoQuery,
    });

    const debounce = setTimeout(() => {
      removeEmptyFields(selectedFields);
      dispatch(fetchProjects(`${objectToQueryString(selectedFields)}`));
      dispatch(fetchProjectPoints(`${objectToQueryString(selectedFields)}`));
    }, 200);

    return () => clearTimeout(debounce);
  }, [selectedFields]);

  const onPlaceChanged = async () => {
    const place = autocompleteRef.current.getPlace();
    const { geometry } = place;
    if(geometry?.viewport){
        setSelectedAddress(place.formatted_address);
        setSelectedCity("");
    
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
  const onCityChanged = async () => {
    const place = autocompleteCityRef.current.getPlace();
    const { geometry } = place;
    if(geometry?.viewport){
        setSelectedCity(place.formatted_address);
        setSelectedAddress("");
    
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
    if (n !== projects?.meta?.currentPage) {
      dispatch(fetchProjects(`pageNumber=${n}`));
    }
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
    if (selectedAddress) {
      onPlaceChanged();
    }
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleReset = () => {
    setSelectedAddress("");
    setSelectedCity("");
    setSelectedFields({});
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
                  // types={['(cities)','address']}
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

              {map && (
                <Autocomplete
                  onLoad={onLoadAutocompleteCity}
                  onPlaceChanged={onCityChanged}
                  key={MAP_API_KEY}
                  types={['(cities)']}
                  restrictions={{ country: "PK" }}
                >
                  <div
                    style={{ minWidth: "120px" }}
                    className="select_input_container_2_icons"
                  >
                    <input
                      placeholder="Search City"
                      className={classes.input_field}
                      value={selectedCity || ""}
                      onChange={handleCityChange}
                      autoComplete={false}
                    />
                  </div>
                </Autocomplete>
              )}

              <div
                style={{ minWidth: "120px" }}
                className="select_input_container"
              >
                <input
                  onChange={handleChange}
                  name="name"
                  value={selectedFields?.name || ""}
                  className={classes.input_field}
                  placeholder="Project Name"
                />
              </div>

              <div
                style={{ minWidth: "120px" }}
                className="select_input_container"
              >
                <Select
                  name="type"
                  value={selectedFields?.type || undefined}
                  onChange={(e) => handleChange(e, "type")}
                  className={`${classes.input_field} custom-select`}
                  placeholder="Property Type"
                >
                  <option value="all">All</option>
                  <option value="residentail">Residentail</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                </Select>
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
                style={{ minWidth: "120px" }}
                className="select_input_container"
              >
                <Select
                  name="status"
                  value={selectedFields?.status || undefined}
                  onChange={(e) => handleChange(e, "status")}
                  className={`${classes.input_field} custom-select`}
                  placeholder="Status"
                >
                  <option value="all">All</option>
                  <option value="Advance Stage">Advance Stage</option>
                  <option value="Early Stage">Early Stage</option>
                  <option value="Mid Stage">Mid Stage</option>
                  <option value="Near possession">Near possession</option>
                  <option value="New Launch">New Launch</option>
                  <option value="Ready to move">Ready to move</option>
                  <option value="Under construction">Under construction</option>
                  <option value="Well occupied">Well occupied</option>
                </Select>
                <img src={drop_down_icon.src} />
              </div>

            </div>

            <div className={classes.buy_map_btn} onClick={handleReset}>
              <p>RESET</p>
            </div>
          </div>

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
              <ProjectMap
                map={map}
                setMap={setMap}
                polygons={polygons}
                setPolygons={setPolygons}
                currentLocation={location}
                points={projectPoints || []}
              />
            </div>
            <div className={classes.properties_section_container}>
              <div className={classes.property_title_bar}>
                <h2>{selectedAddress || address || "Projects"}</h2>
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
                <Loader loading={loadingProjects}>
                  <div className={classes.properties_section_grid}>
                    {projects?.data?.length > 0 &&
                      projects?.data?.map((p) => {
                        return <ProjectMapSectionCard key={p._id} p={p} refetchQuery />;
                      })}
                    {((!loadingProjects && projects?.data?.length === 0) ||
                      !projects?.data) && <div>No Project found</div>}
                  </div>
                  <Paginate
                    data={projects}
                    handlePageChange={handlePageChange}
                    align="center"
                  />
                </Loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonProjectSearchSection;
