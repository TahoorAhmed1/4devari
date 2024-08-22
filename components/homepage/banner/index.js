import React, { useState, useEffect, useRef } from "react";
import classes from "./banner.module.css";
import banner_image from "../../../public/assets/landing-page-assets/banner-image.png";
import time_icon from "../../../public/assets/landing-page-assets/time_icon.svg";
import grey_pattern from "../../../public/assets/landing-page-assets/grey-pattern.png";
import feature_cards_bg from "../../../public/assets/landing-page-assets/feature_cards_bg.png";
import profile_placeholder from "../../../public/assets/landing-page-assets/profile_placeholder.svg";
import blue_pattern from "../../../public/assets/landing-page-assets/blue-pattern.png";
import drop_down_icon from "../../../public/assets/icons/drop_down.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Next from "../../reactSlickButtons/next";
import Prev from "../../reactSlickButtons/prev";
// import Navbar from "../../navbar";

import search_white from "../../../public/assets/icons/search_white.svg";
import near_pin_blue from "../../../public/assets/icons/near_pin_blue.svg";
// import Tags from "../Tags/index"

import { Slider as PriceSlider, InputNumber } from "antd";
import {
  goTo,
  objectToQueryString,
  queryStringToObject,
  removeEmptyFields,
  useWindowSize,
} from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PURPOSE } from "../../../utils/constants";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleApi } from "../../../context/googleContext";
import { MAP_API_KEY } from "../../../config";
import { useAuth } from "../../../contextApi";
import { addUserSearch } from "../../../redux/users";

function Banner({ setIsDropdown, refInstance, isAdvertiseModal }) {
  const router = useRouter();
  const { user } = useAuth();
  const { isApiLoaded } = useGoogleApi();
  const { userData } = useSelector((state) => state.users);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { location, recallLocation } = useCurrentLocation();
  const [selectedDropDownOption, setSelectedDropDownOption] = useState();
  const [disabled, setdisabled] = useState(false);
  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [recentLimit, setRecentLimit] = useState(-5);
  const [dropDownOption, setDropDownOption] = useState("residential");
  const [selectedFields, setSelectedFields] = useState({
    purpose: "buy",
    type: "residential",
  });

  const [minArea, setMinArea] = useState(0.0);
  const [maxArea, setMaxArea] = useState(0.0);

  const isMobileScreen = useWindowSize().width < 769;
  const dispatch = useDispatch();

  const locationRef = useRef();

  const residential_checkboxes = [
    "House",
    "Flat",
    "Lower Portion",
    "Upper Portion",
    "Farmhouse",
    "Pent House",
    "Basement",
    "Hostle",
    "Guest House",
    "Hotel Suites",
    "Beach Huts",
  ];

  const commercial_checkboxes = [
    "Office",
    "Shop",
    "Warehouse",
    "Factory",
    "Building",
    "Others",
  ];

  const plots_checkboxes = [
    "Residential Plots",
    "Commercial Plots",
    "Agricultral Plots",
    "Factory",
    "Building",
    "Others",
  ];

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
      plot: [],
    },
    "coworking space": {
      residential: [],
      commercial: [],
      plot: [],
    },
  };

  // const cities = [
  //   "Islamabad",
  //   "Lahore",
  //   "Karachi",
  //   "Rawalpindi",
  //   "Faislabad",
  //   "Multan",
  // ];

  const cities = [
    {
      label: "Islamabad",
      link: "lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356",
    },
    {
      label: "Lahore",
      link: "lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462",
    },
    {
      label: "Karachi",
      link: "lng=67.0011364&lat=24.8607343&radius=70.80875090113182",
    },
    {
      label: "Rawalpindi",
      link: "lng=73.0169135&lat=33.5651107&radius=16.583152964339543",
    },
    {
      label: "Faislabad",
      link: "lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485",
    },
    {
      label: "Multan",
      link: "lng=71.5249154&lat=30.157458&radius=21.832574474123714",
    },
  ];

  const settings = {
    className: "banner-slider",
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };

  const tabs = [
    {
      id: 1,
      title: "Buy",
      slug: "buy",
    },
    {
      id: 2,
      title: "Rent",
      slug: "rent",
    },
    {
      id: 3,
      title: "PG / Shared Living",
      slug: "coliving space",
    },
    {
      id: 4,
      title: "Co-Working",
      slug: "coworking space",
    },
    {
      id: 5,
      title: "Invest",
      slug: "invest",
    },
  ];

  const [selectedTabId, setSelectedTabId] = useState(tabs[0]?.id);

  const [isDropDownEnabled, setIsDropDownEnabled] = useState(false);
  const inputRef = useRef(null);
  const div1Ref = useRef(null);

  const handleSelectTab = (tab) => {
    setSelectedTabId(tab?.id);
    setSelectedFields({ purpose: tab?.slug, type: "residential" });
    setDropDownOption("residential");
  };

  const cardOverlays = [
    "linear-gradient(41.96deg, #719462 0.92%, rgba(113, 148, 98, 0) 100%)",
    "linear-gradient(41.96deg, #AC68A5 0.92%, rgba(172, 104, 165, 0) 100%)",
    "linear-gradient(41.96deg, #4FA6A6 0.92%, rgba(79, 166, 166, 0) 100%)",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        div1Ref.current &&
        !div1Ref.current.contains(event.target)
      ) {
        setIsDropDownEnabled(false);
        setIsDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, div1Ref]);

  const handleFocus = () => {
    setIsInputFocused(true);
    setIsDropdownEnabled(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    setIsDropdownEnabled(false);
  };

  useEffect(() => {
    if (isDropDownEnabled) {
      const htmlElement = document.querySelector("html");
      const chatIcon = document.getElementById("chat_icon");
      if (chatIcon) {
        chatIcon.style.display = "none";
        // htmlElement.style.overflow = "hidden";
      }
    } else {
      const htmlElement = document.querySelector("html");
      const chatIcon = document.getElementById("chat_icon");
      if (htmlElement) {
        htmlElement.style.overflow = "auto";
      }
      if (chatIcon) {
        chatIcon.style.display = "block";
      }
    }
  }, [isDropDownEnabled]);

  function onChange(value) {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
    setSelectedFields({
      ...selectedFields,
      minPrice: value[0],
      maxPrice: value[1],
    });
    setdisabled(false);
  }

  function onAreaChange(value) {
    setMinArea(value[0]);
    setMaxArea(value[1]);
    setSelectedFields({
      ...selectedFields,
      minArea: value[0],
      maxArea: value[1],
    });
    setdisabled(false);
  }

  function lowerLimitArea(value) {
    setdisabled(false);
    setMinArea(value);
  }

  function upperLimitArea(value) {
    setdisabled(false);
    setMaxArea(value);
  }

  function lowerLimit(value) {
    setdisabled(false);
    setMinPrice(value);
  }

  function upperLimit(value) {
    setdisabled(false);
    setMaxPrice(value);
  }

  const [minFormattedPrice, setFormattedMinPrice] = useState();
  const [maxFormattedPrice, setFormattedMaxPrice] = useState();

  useEffect(() => {
    if (maxPrice >= 100000) {
      const formattedPrice = numDifferentiation(maxPrice);
      setFormattedMaxPrice(formattedPrice);
    } else {
      setFormattedMaxPrice();
    }

    function numDifferentiation(value) {
      var val = Math.abs(value);
      if (val >= 1000000000) {
        val = (val / 1000000000).toFixed(2) + " Arabs";
      } else if (val >= 10000000) {
        val = (val / 10000000).toFixed(2) + " Crores";
      } else if (val >= 100000) {
        val = (val / 100000).toFixed(2) + " Lacs";
      }
      return val;
    }
  }, [maxPrice]);

  useEffect(() => {
    if (minPrice >= 100000) {
      const formattedPrice = numDifferentiation(minPrice);
      setFormattedMinPrice(formattedPrice);
    } else {
      setFormattedMinPrice();
    }

    function numDifferentiation(value) {
      var val = Math.abs(value);
      if (val >= 1000000000) {
        val = (val / 1000000000).toFixed(2) + " Arabs";
      } else if (val >= 10000000) {
        val = (val / 10000000).toFixed(2) + " Crores";
      } else if (val >= 100000) {
        val = (val / 100000).toFixed(2) + " Lacs";
      }
      return val;
    }
  }, [minPrice]);

  const formatter = (value) => {
    if (value >= 100000) {
      const formattedPrice = numDifferentiation(value);
      return formattedPrice;
    } else {
      return;
    }

    function numDifferentiation(value) {
      var val = Math.abs(value);
      if (val >= 1000000000) {
        val = (val / 1000000000).toFixed(2) + " Arabs";
      } else if (val >= 10000000) {
        val = (val / 10000000).toFixed(2) + " Crores";
      } else if (val >= 100000) {
        val = (val / 100000).toFixed(2) + " Lacs";
      }
      return val;
    }
  };

  const formatterArea = (value) => {
    console.log(value);
    return `${value} sqft`;
  };

  const handleSearch = () => {
    let data = {
      minPrice,
      maxPrice,
      minAreaSize: minArea,
      maxAreaSize: maxArea,
      type: dropDownOption,
      purpose: tabs[selectedTabId - 1 > -1 ? selectedTabId - 1 : 0].slug,
      // address: inputRef.current.value,
      subtype: selectedFields?.subtype || "",
      city: selectedFields?.cities || "",
      lat: selectedFields?.lat,
      lng: selectedFields?.lng,
    };
    if (selectedFields?.lat && selectedFields?.lng) {
      data.radius = selectedFields?.radius || 600;
    }
    if (
      selectedFields?.recentSearch &&
      user?.id &&
      data?.lat &&
      data?.lng &&
      data?.radius &&
      data?.purpose
    ) {
      removeEmptyFields(data);
      dispatch(
        addUserSearch({
          userId: user?.id,
          accessToken: user?.accessToken,
          payload: {
            recentSearches: {
              ...data,
              address: selectedFields?.recentSearch,
              lat: data?.lat,
              lng: data?.lng,
              radius: data?.radius,
            },
          },
        })
      );
    }
    if (data?.purpose === "invest") {
      removeEmptyFields(data);
      let cityQuery = data?.city || "";
      delete data?.city;
      delete data?.purpose;
      router.push({
        pathname: "/project/invest",
        query: `${objectToQueryString(data)}${
          cityQuery ? `&${cityQuery}` : ""
        }`,
      });
    } else if (data?.purpose === "coworking space") {
      removeEmptyFields(data);
      let cityQuery = data?.city?.[0] || "";
      delete data?.city;
      console.log(queryStringToObject(cityQuery));
      goTo({ ...data, ...queryStringToObject(cityQuery) });
    } else {
      goTo(data);
    }
  };

  const handleRecentSearchTap = (s) => {
    let data = { ...s };
    delete data._id;
    delete data.address;
    goTo(data);
  };

  const handleSubtypes = (item) => {
    // Check if the item is already present in the subtype array
    const isItemPresent = selectedFields?.subtype
      ? selectedFields?.subtype.includes(item)
      : false;

    if (isItemPresent) {
      // If present, filter it out and update the state
      setSelectedFields({
        ...selectedFields,
        subtype: selectedFields?.subtype?.filter(
          (subtypeItem) => subtypeItem !== item
        ),
      });
    } else {
      // If not present, add the item to the subtype array
      setSelectedFields({
        ...selectedFields,
        subtype: selectedFields?.subtype
          ? [...selectedFields?.subtype, item]
          : [item],
      });
    }
  };
  const handleSubtypesCities = (item) => {
    // Check if the item is already present in the subtype array
    const isItemPresent = selectedFields?.cities
      ? selectedFields?.cities.includes(item)
      : false;

    if (isItemPresent) {
      // If present, filter it out and update the state
      setSelectedFields({
        ...selectedFields,
        cities: selectedFields?.cities?.filter(
          (subtypeItem) => subtypeItem !== item
        ),
      });
    } else {
      // If not present, add the item to the subtype array
      setSelectedFields({
        ...selectedFields,
        cities: [item],
      });
    }
  };

  useEffect(() => {
    console.log("selectedFields", selectedFields);
  }, [selectedFields]);

  const handleReset = () => {
    setSelectedFields({
      purpose: "buy",
      type: "residential",
      address: "",
    });
    setDropDownOption("residential");
    setSelectedTabId(tabs[0]?.id);
  };

  const handleChange = (e) => {
    setSelectedFields({ ...selectedFields, [e.target.name]: e.target.value });
  };

  const isPlots =
    selectedFields?.purpose === "buy" || selectedFields?.purpose === "rent";
  const isCoworking = selectedFields?.purpose === "coworking space";
  const isInvest = selectedFields?.purpose === "invest";

  const handleResPurpose = (data) => {
    if (data === "invest") {
      setSelectedTabId(5);
    }
    setSelectedFields({ purpose: data, type: "residential" });
    setDropDownOption("residential");
  };

  const handleNearMeFIlter = () => {
    if (location?.lat && location?.lng) {
      let data = {
        type: dropDownOption,
        purpose: tabs[selectedTabId - 1 > -1 ? selectedTabId - 1 : 0].slug,
        ...location,
      };
      goTo(data);
    } else {
      recallLocation;
    }
  };
  const handleNearMePropertise = (purposes) => {
    const purpose = purposes;
    if (location?.lat && location?.lng) {
      let data = {
        type: dropDownOption,
        purpose: purpose,
        ...location,
      };
      goTo(data);
    } else {
      let data = {
        type: dropDownOption,
        purpose: purpose,
      };
      goTo(data);
    }
  };

  // Google AutoCompletes

  const onLoadLocation = (autocomplete) => {
    locationRef.current = autocomplete;
  };

  // const onChangeLocation = async () => {
  //   const place = await locationRef.current.getPlace();
  //   if (place?.formatted_address) {
  //     const { lat, lng } = place.geometry.location.toJSON();
  //     const center = place.geometry.getCenter();
  //     const neCorner = place.geometry.getNorthEast();
  //     const radius = google.maps.geometry.spherical.computeDistanceBetween(center, neCorner);
  //     const radiusInKilometers = radius / 1000;
  //     setSelectedFields({
  //       ...selectedFields,
  //       address: place?.formatted_address,
  //       lat: lat,
  //       lng: lng,
  //       radius: radiusInKilometers,
  //       recentSearch: place?.formatted_address
  //     });
  //   }
  // };
  const onChangeLocation = async () => {
    const place = await locationRef.current.getPlace();
    if (place?.formatted_address) {
      const { lat, lng } = place.geometry.location.toJSON();
      const center = place.geometry.location;
      const neCorner = place.geometry.viewport.getNorthEast();
      const radius = google.maps.geometry.spherical.computeDistanceBetween(
        center,
        neCorner
      );
      const radiusInKilometers = radius / 1000;
      setSelectedFields({
        ...selectedFields,
        address: place?.formatted_address,
        lat: lat,
        lng: lng,
        radius: radiusInKilometers,
        recentSearch: place?.formatted_address,
      });
    }
  };

  return (
    <>
      <div ref={refInstance} className={classes.container}>
        <div className={classes.top_panel}>
          <img
            src={blue_pattern.src}
            className={classes.pattern_bg}
            alt="banner_img_blue"
          />
          <img
            src={grey_pattern.src}
            className={classes.pattern_bg}
            alt="banner_img_gray"
          />
          <img
            className={classes.banner_img}
            src={banner_image.src}
            alt="banner_img"
          />
          <div className={classes.banner_content_container}>
            <h2>Maps Par Ao, Baichtay Jao!</h2>
            <p>Pakistan's One-Stop Real Estate Marketplace</p>
            <div
              className={classes.discover_more_btn}
              onClick={() =>
                goTo({ purpose: PURPOSE.buy, type: "residential" })
              }
            >
              <p>Discover</p>
            </div>
            {isMobileScreen ? (
              <div className={classes.media_tabs_container}>
                <button
                  onClick={() => handleResPurpose("buy")}
                  className={
                    selectedFields?.purpose === "buy" && classes.selected_btn
                  }
                >
                  Buy
                </button>
                <button
                  onClick={() => handleResPurpose("rent")}
                  className={
                    selectedFields?.purpose === "rent" && classes.selected_btn
                  }
                >
                  Rent
                </button>
                <button
                  onClick={() => handleResPurpose("coliving space")}
                  className={
                    selectedFields?.purpose === "coliving space" &&
                    classes.selected_btn
                  }
                >
                  PG / Shared Living
                </button>
                <button
                  onClick={() => handleResPurpose("coworking space")}
                  className={
                    selectedFields?.purpose === "coworking space" &&
                    classes.selected_btn
                  }
                >
                  Co-Working
                </button>
                <button
                  onClick={() => handleResPurpose("invest")}
                  className={
                    selectedFields?.purpose === "invest" && classes.selected_btn
                  }
                >
                  Invest
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={classes.bottom_panel}>
          {/* ////////////////////////////////////////////////////////// */}
          <div className={classes.search_bar_wrapper}>
            <div className={classes.search_bar_container}>
              <div className={classes.btns_container}>
                <div className={classes.tabs_container}>
                  {tabs?.map((tab, index) => (
                    <p
                      onClick={() => {
                        handleSelectTab(tab);
                      }}
                      className={
                        selectedTabId === tab?.id
                          ? classes.single_tab_selected
                          : classes.single_tab
                      }
                      key={`d-${index}`}
                    >
                      {tab?.title}
                    </p>
                  ))}
                </div>
              </div>

              <div className={classes.lower_panel}>
                <div className={classes.drop_down_container}>
                  <div
                    onClick={() => {
                      setIsDropDownEnabled(true);
                      setIsDropdown(true);
                      // setSelectedDropDownOption(undefined);
                    }}
                    className={classes.select_input_container}
                  >
                    <div className={classes.hollow_input}>
                      <p> All Residential</p>
                    </div>
                    <img src={drop_down_icon.src} alt="dropdown1" />
                  </div>
                </div>
                <div className={classes.search_input_container}>
                  {isApiLoaded && (
                    <Autocomplete
                      onLoad={onLoadLocation}
                      key={MAP_API_KEY}
                      onPlaceChanged={onChangeLocation}
                      types={["address"]}
                      restrictions={{ country: "PK" }}
                      className="google_autocomplete"
                    >
                      <input
                        onFocus={() => {
                          setIsDropDownEnabled(true);
                          setIsDropdown(true);
                          setSelectedDropDownOption(undefined);
                        }}
                        type="text"
                        name="location"
                        id="location"
                        value={selectedFields?.address}
                        ref={inputRef}
                        onChange={(e) => {
                          setSelectedFields({
                            ...selectedFields,
                            address: e.target.value,
                          });
                        }}
                        className={`${classes.hollow_input} google_input`}
                        autoComplete="false"
                        placeholder={
                          isMobileScreen
                            ? "Where are you looking in ?"
                            : "Search properties in pakistan..."
                        }
                      />
                    </Autocomplete>
                  )}
                  {/* <input
                    onFocus={() => {
                      setIsDropDownEnabled(true);
                      setIsDropdown(true);
                      setSelectedDropDownOption(undefined);
                    }}
                    ref={inputRef}
                    className={classes.hollow_input}
                    onChange={(e) => {
                      setSelectedFields({
                        ...selectedFields,
                        address: e.target.value,
                      });
                    }}
                    value={selectedFields?.address}
                    type="text"
                    placeholder={
                      isMobileScreen
                        ? "Where are you looking in ?"
                        : "Search properties in pakistan..."
                    }
                  /> */}
                  <div className={classes.search_btns_container}>
                    <div
                      className={classes.near_me_btn}
                      onClick={handleNearMeFIlter}
                    >
                      <img src={near_pin_blue.src} alt="near_pin" />
                      <p>Near Me</p>
                    </div>
                    <div className={classes.search_btn} onClick={handleSearch}>
                      <img src={search_white.src} alt="search_white" />
                      <p>Search</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={div1Ref}
                className={
                  isDropDownEnabled
                    ? classes.search_panel_dropdown
                    : classes.search_panel_dropdown_hidden
                }
              >
                <div
                  className={classes.search_panel_dropdown_content_container}
                >
                  <div className={classes.drop_down_inner_content_container}>
                    {selectedDropDownOption !== undefined &&
                    selectedDropDownOption === "price" ? (
                      <div className={classes.options_content_container_div}>
                        <p className={classes.submenu_heading}>
                          Select Price Range
                        </p>
                        <p className={classes.price_range_label}>
                          0 - 100+ Crore
                        </p>

                        <div className={classes.slider_container}>
                          <div className={classes.input_field_container}>
                            <InputNumber
                              type="number"
                              className={classes.price_range}
                              min={0}
                              max={5000000000}
                              step={10000}
                              value={disabled ? null : minPrice}
                              onChange={lowerLimit}
                            />
                            <p className={classes.formatter_price}>
                              {minFormattedPrice
                                ? `PKR ${minFormattedPrice}`
                                : `PKR 0`}
                            </p>
                          </div>

                          <PriceSlider
                            className="slider-main-div"
                            min={0}
                            max={5000000000}
                            step={1000000}
                            onChange={onChange}
                            range={true}
                            defaultValue={[minPrice, maxPrice]}
                            value={[minPrice, maxPrice]}
                            tooltip={{
                              formatter,
                            }}
                          />

                          <div className={classes.input_field_container}>
                            <InputNumber
                              type="number"
                              className={classes.price_range}
                              min={0}
                              max={5000000000}
                              step={1000000}
                              value={disabled ? null : maxPrice}
                              onChange={upperLimit}
                            />
                            <p className={classes.formatter_price}>
                              {maxFormattedPrice
                                ? `PKR ${maxFormattedPrice}`
                                : `PKR 0`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : selectedDropDownOption === "area" ? (
                      <div className={classes.options_content_container_div}>
                        <p className={classes.submenu_heading}>
                          Select Property Area
                        </p>
                        <p className={classes.price_range_label}>
                          0 - 11250 sqft
                        </p>

                        <div className={classes.slider_container}>
                          <div className={classes.input_field_container}>
                            <InputNumber
                              type="number"
                              className={classes.price_range}
                              min={0}
                              max={11250}
                              step={1}
                              value={disabled ? null : minArea}
                              onChange={lowerLimitArea}
                            />
                            <p className={classes.formatter_price}>
                              {minArea ? `${minArea} sqft` : `0 sqft`}
                            </p>
                          </div>

                          <PriceSlider
                            className="slider-main-div"
                            min={0}
                            max={11250}
                            step={1}
                            onChange={onAreaChange}
                            range={true}
                            defaultValue={[minArea, maxArea]}
                            value={[minArea, maxArea]}
                            tooltip={{
                              formatter: formatterArea,
                            }}
                          />

                          <div className={classes.input_field_container}>
                            <InputNumber
                              type="number"
                              className={classes.price_range}
                              min={0}
                              max={11250}
                              step={1}
                              value={disabled ? null : maxArea}
                              onChange={upperLimitArea}
                            />
                            <p className={classes.formatter_price}>
                              {maxArea ? `${maxArea} sqft` : `0 sqft`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={classes.types_left_panel}>
                          <div className={classes.drop_down_left_panel}>
                            <div
                              className={classes.drop_down_left_panel_content}
                            >
                              <p
                                className={
                                  dropDownOption === "residential"
                                    ? classes.drop_down_option_selected
                                    : classes.drop_down_option
                                }
                                onClick={() => {
                                  setDropDownOption("residential");
                                  setSelectedFields({
                                    purpose: selectedFields.purpose,
                                    type: "residential",
                                  });
                                }}
                              >
                                Residential
                              </p>
                              <p
                                className={
                                  dropDownOption === "commercial"
                                    ? classes.drop_down_option_selected
                                    : classes.drop_down_option
                                }
                                onClick={() => {
                                  setDropDownOption("commercial");
                                  setSelectedFields({
                                    purpose: selectedFields.purpose,
                                    type: "commercial",
                                  });
                                }}
                              >
                                Commercial
                              </p>
                              {isPlots && (
                                <p
                                  className={
                                    dropDownOption === "plot"
                                      ? classes.drop_down_option_selected
                                      : classes.drop_down_option
                                  }
                                  onClick={() => {
                                    setDropDownOption("plot");
                                    setSelectedFields({
                                      purpose: selectedFields.purpose,
                                      type: "plot",
                                    });
                                  }}
                                >
                                  Plots
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={classes.checkboxes_right_panel}>
                          <div className={classes.checkbox_container}>
                            {dropDownOption === "residential"
                              ? propertyNamesByType?.[
                                  selectedFields.purpose
                                ]?.residential?.map(
                                  (single_checkbox, index) => (
                                    <div
                                      key={`e-${index}`}
                                      className={
                                        classes.single_checkbox_container
                                      }
                                      onClick={() =>
                                        handleSubtypes(single_checkbox)
                                      }
                                    >
                                      <input
                                        checked={selectedFields?.subtype?.includes(
                                          single_checkbox
                                        )}
                                        type="checkbox"
                                      />
                                      <p>{single_checkbox}</p>
                                    </div>
                                  )
                                )
                              : dropDownOption === "commercial"
                              ? propertyNamesByType?.[
                                  selectedFields.purpose
                                ]?.commercial?.map((single_checkbox, index) => (
                                  <div
                                    key={`f-${index}`}
                                    className={
                                      classes.single_checkbox_container
                                    }
                                    onClick={() =>
                                      handleSubtypes(single_checkbox)
                                    }
                                  >
                                    <input
                                      checked={selectedFields?.subtype?.includes(
                                        single_checkbox
                                      )}
                                      type="checkbox"
                                    />
                                    <p>{single_checkbox}</p>
                                  </div>
                                ))
                              : dropDownOption === "plot" &&
                                propertyNamesByType?.[
                                  selectedFields.purpose
                                ]?.plot?.map((single_checkbox, index) => (
                                  <div
                                    key={`g-${index}`}
                                    className={
                                      classes.single_checkbox_container
                                    }
                                    onClick={() =>
                                      handleSubtypes(single_checkbox)
                                    }
                                  >
                                    <input
                                      checked={selectedFields?.subtype?.includes(
                                        single_checkbox
                                      )}
                                      type="checkbox"
                                    />
                                    <p>{single_checkbox}</p>
                                  </div>
                                ))}
                            {(isInvest || isCoworking) &&
                              cities?.map((single_checkbox, index) => (
                                <div
                                  key={`h-${index}`}
                                  className={classes.single_checkbox_container}
                                  onClick={() =>
                                    handleSubtypesCities(single_checkbox.link)
                                  }
                                >
                                  <input
                                    checked={selectedFields?.cities?.includes(
                                      single_checkbox.link
                                    )}
                                    type="radio"
                                  />
                                  <p>{single_checkbox.label}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={classes.choices_panel}>
                    <div className={classes.drop_down_btns}>
                      <div
                        onClick={() => {
                          setSelectedDropDownOption("price");
                        }}
                        className={
                          selectedDropDownOption === "price"
                            ? classes.drop_down_btn_selected
                            : classes.drop_down_btn
                        }
                      >
                        <p>Price</p>
                      </div>
                      <div
                        onClick={() => {
                          setSelectedDropDownOption("area");
                        }}
                        className={
                          selectedDropDownOption === "area"
                            ? classes.drop_down_btn_selected
                            : classes.drop_down_btn
                        }
                      >
                        <p>Area</p>
                      </div>
                      <select
                        onClick={() => {
                          setSelectedDropDownOption("beds");
                        }}
                        onChange={handleChange}
                        name="noOfBedrooms"
                        className={
                          selectedDropDownOption === "beds"
                            ? classes.drop_down_btn_selected
                            : classes.drop_down_btn
                        }
                        value={selectedFields?.noOfBedrooms}
                      >
                        <option hidden>
                          Beds
                        </option>
                        <option value={1}>1 Bed</option>
                        <option value={2}>2 Beds</option>
                        <option value={3}>3 Beds</option>
                        <option value={4}>4 Beds</option>
                        <option value={5}>5 Beds</option>
                        <option value={6}>6 Beds</option>
                      </select>
                      <select
                        onClick={() => {
                          setSelectedDropDownOption("baths");
                        }}
                        value={selectedFields?.noOfBathrooms}
                        name="noOfBathrooms"
                        onChange={handleChange}
                        className={
                          selectedDropDownOption === "baths"
                            ? classes.drop_down_btn_selected
                            : classes.drop_down_btn
                        }
                      >
                        <option hidden>Baths</option>
                        <option value={1}>1 Bath</option>
                        <option value={2}>2 Baths</option>
                        <option value={3}>3 Baths</option>
                        <option value={4}>4 Baths</option>
                        <option value={5}>5 Baths</option>
                        <option value={6}>6 Baths</option>
                      </select>
                      {/* <div
                        onClick={() => {
                          setSelectedDropDownOption("more_options");
                        }}
                        className={
                          selectedDropDownOption === "more_options"
                            ? classes.drop_down_btn_selected
                            : classes.drop_down_btn
                        }
                      >
                        <p>More Options</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.filter_panel_container}>
                <div
                  style={{ opacity: isDropDownEnabled ? "0" : "1" }}
                  className={classes.angled_div}
                />
                <div className={classes.filter_panel}>
                  <div className={classes.filter_btn_container}>
                    {/* <div
                      style={{ width: "25%" }}
                      className="select_input_container"
                    >
                      <select className={classes.hollow_input}>
                        <option>More Options</option>
                      </select>
                      <img src={drop_down_icon.src} />
                    </div> */}

                    <div className={classes.right_panel}>
                      {/* <p>Change Currency</p>
                      <p style={{ color: "black" }}>|</p>
                      <p>Change Area Unit</p>
                      <p style={{ color: "black" }}>|</p> */}
                      <p onClick={handleReset}>Reset Search</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ////////////////////////////////////////////////////////// */}
          {userData?.recentSearches?.length > 0 && (
            <div className={classes.recent_searches_container}>
              <p>Recent Searches</p>
              <div className={classes.recent_tags_container}>
                {userData?.recentSearches
                  .slice(recentLimit)
                  .reverse()
                  .map((s) => (
                    <div
                      key={`recent-search-${s?._id}`}
                      className={classes.recent_search_tag}
                      onClick={() => handleRecentSearchTap(s)}
                    >
                      <img src={time_icon.src} alt="time_icon" />
                      <p>{`${s?.type ? `${s?.type},` : ""} ${
                        s?.purpose ? `${s?.purpose},` : ""
                      } ${s?.address ? `${s?.address}` : "not found!"}`}</p>
                    </div>
                  ))}
                {/* <div
                  className={classes.recent_search_tag}
                  onClick={isAdvertiseModal.onOpen}
                >
                  <img src={time_icon.src} />
                  <p>Property Type, Purpose, Area(sqft), Location, Price</p>
                </div>

                <div className={classes.recent_search_tag}>
                  <img src={time_icon.src} />
                  <p>House on Sale 500sqyrd gulshan-e-iqbal 2-3cr</p>
                </div> */}

                {userData?.recentSearches?.length > 5 && (
                  <>
                    {recentLimit === 0 ? (
                      <div
                        className={classes.recent_search_tag}
                        onClick={() => setRecentLimit(-5)}
                      >
                        <img src={time_icon.src} alt="time_icon2" />
                        <p>View less</p>
                      </div>
                    ) : (
                      <div
                        className={classes.recent_search_tag}
                        onClick={() => setRecentLimit(0)}
                      >
                        <img src={time_icon.src} alt="time_icon3" />
                        <p>View all searches</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={classes.features_container}>
          <div className={classes.cards_container}>
            <Slider arrows={true} {...settings}>
              <div className={classes.card_body}>
                <img src={feature_cards_bg.src} alt="feature_cards_bg" />
                <div
                  style={{ backgroundImage: cardOverlays[0] }}
                  className={classes.overlay}
                >
                  <p>Find Properties To Buy Near me!</p>
                  <div
                    onClick={() => handleNearMePropertise("buy")}
                    className={classes.card_btn}
                  >
                    <p>Explore More</p>
                  </div>
                </div>
              </div>
              <div className={classes.card_body}>
                <img src={feature_cards_bg.src} alt="feature_cards_bg2" />
                <div
                  style={{ backgroundImage: cardOverlays[0] }}
                  className={classes.overlay}
                >
                  <p>Find Properties To Rent Near me!</p>
                  <div
                    onClick={() => handleNearMePropertise("rent")}
                    className={classes.card_btn}
                  >
                    <p>Explore More</p>
                  </div>
                </div>
              </div>
              <div className={classes.card_body}>
                <img src={feature_cards_bg.src} alt="feature_cards_bg3" />
                <div
                  style={{ backgroundImage: cardOverlays[1] }}
                  className={classes.overlay}
                >
                  <p>Find Properties To Coliving Near me!</p>
                  <div
                    onClick={() => handleNearMePropertise("shared/coliving")}
                    href={`/shared/${PURPOSE.coliving}`}
                    className={classes.card_btn}
                  >
                    <p>Explore More</p>
                  </div>
                </div>
              </div>
              <div className={classes.card_body}>
                <img src={feature_cards_bg.src} alt="feature_cards_bg4" />
                <div
                  style={{ backgroundImage: cardOverlays[2] }}
                  className={classes.overlay}
                >
                  <p>Find Properties To Coworking Near me!</p>
                  <div
                    onClick={() => handleNearMePropertise("shared/coworking")}
                    className={classes.card_btn}
                  >
                    <p>Explore More</p>
                  </div>
                </div>
              </div>

              <div className={classes.card_body}>
                <img src={feature_cards_bg.src} alt="feature_cards_bg5" />
                <div
                  style={{ backgroundImage: cardOverlays[1] }}
                  className={classes.overlay}
                >
                  <p>Find Properties To Buy Near me!</p>
                  <div className={classes.card_btn}>
                    <p>Explore More</p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>

          <div className={classes.my_activity_container}>
            <div className={classes.activity_container_left}>
              <h2>My Activity</h2>
              <div className={classes.activity_tab}>
                <p>Recently Searched</p>
                <div className={classes.recent_number}>
                  <p>{userData?.recentSearches?.length || 0}</p>
                </div>
              </div>
              {/* <div className={classes.activity_tab}>
                <p>Shortlisted</p>
                <div className={classes.shortlisted_number}>
                  <p>8</p>
                </div>
              </div> */}
            </div>
            <div className={classes.activity_container_right}>
              <img src={profile_placeholder.src} alt="profile_placeholder" />
              {user?.id ? (
                <div
                  className={classes.login_btn}
                  onClick={() => router.push("/dashboard/user/report_summary")}
                >
                  <p>Check activities</p>
                </div>
              ) : (
                <div
                  className={classes.login_btn}
                  onClick={() => router.push("/login")}
                >
                  <p>Login/Register to save activity</p>
                </div>
              )}
              <p className={classes.activity_text}>
                & see your activities across browsers and devices
              </p>
            </div>
          </div>
        </div>
        {/* <div className={classes.ad_container}>
          <div className={classes.ad_placehodler}>
            <h3>728 x 90 AD HERE</h3>
          </div>
        </div> */}
      </div>
      {/* <Tags/> */}
    </>
  );
}

export default Banner;
