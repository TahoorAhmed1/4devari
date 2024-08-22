import React, { useEffect, useRef, useState } from "react";
import classes from "./navbar.module.css";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import home_icon from "../../public/assets/navbar-assets/home.svg";
import search_icon from "../../public/assets/navbar-assets/search.svg";
import search_icon_white from "../../public/assets/navbar-assets/search_white.svg";
import account from "../../public/assets/navbar-assets/account.png";
import site_logo from "../../public/assets/navbar-assets/site_logo.svg";
import setting_white from "../../public/assets/navbar-assets/setting.svg";
import bell_white from "../../public/assets/navbar-assets/bell.svg";
import {
  goTo,
  queryStringToObject,
  removeEmptyFields,
  useWindowSize,
} from "../../utils";
import search_white from "../../public/assets/icons/search_white.svg";
import near_pin_blue from "../../public/assets/icons/near_pin_blue.svg";
import Mobile_nav from "./Mobile_nav";
import { useAuth } from "../../contextApi";
import { PURPOSE } from "../../utils/constants";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { useGoogleApi } from "../../context/googleContext";
import { Autocomplete } from "@react-google-maps/api";
import { MAP_API_KEY } from "../../config";

function Navbar({ showNavbar, isTransparent }) {
  const { width } = useWindowSize();
  const { isApiLoaded } = useGoogleApi();
  const locationRef = useRef();
  const router = useRouter();
  const { user, removeUser } = useAuth();
  const { location, recallLocation } = useCurrentLocation();

  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isNavbarVisisbleFromTop, setIsNavbarVisibleFromTop] = useState(false);
  const [buySelectedOption, setBuySelectionOption] = useState("residential");
  const [rentSelectedOption, setRentSelectionOption] = useState("residential");
  const [sharedSpacesOption, setSharedSpacesOption] = useState("co-living");
  const [moreOption, setMoreOption] = useState("invest");
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [purpose, setPurpose] = useState("Buy");
  const [residential, setResidential] = useState("All Residential");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [selectedDropDownOption, setSelectedDropDownOption] =
    useState("subtypes");
  const [selectedFields, setSelectedFields] = useState({
    purpose: "buy",
    type: "residential",
  });

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    if (router.pathname) {
      const page = router.pathname.split("/");
      setCurrentPage(page[1]);
    }
  }, [router.pathname]);

  let listener;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (document !== null) {
        let scrolled = document.scrollingElement.scrollTop;

        if (scrolled >= 80) {
          if (backgroundColor !== "opaque") {
            setBackgroundColor("opaque");
          }
        }
        if (scrolled < 80) {
          if (backgroundColor !== "transparent") {
            setBackgroundColor("transparent");
          }
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [backgroundColor]);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    // setIsInputFocused(false);
  };
  // const isDrop = document?.getElementById("#left_btn");
  // useEffect(() => {
  //   isDrop.style.opacity = 0;
  // }, [router]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Log the id of the clicked element
      const elementId = event.target.id;
      if (elementId === "dropNavMenu") {
        setIsInputFocused(true);
      } else {
        setIsInputFocused(false);
        setTimeout(() => {
          setSelectedDropDownOption("subtypes");
        }, 200);
      }
    };

    // Attach the click event listener to the document body
    document.body.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleSearch = () => {
    // console.log("selectedFIelds TOP NAV", selectedFields);
    let data = { ...selectedFields };
    if (data?.purpose === "coworking space" && data?.cities) {
      removeEmptyFields(data);
      let cityQuery = data?.cities?.[0] || "";
      delete data?.cities;
      goTo({ ...data, ...queryStringToObject(cityQuery) });
    } else {
      goTo(selectedFields);
    }
  };

  const handleNearMeFIlter = () => {
    if (location?.lat && location?.lng) {
      let data = {
        type: selectedFields?.type,
        purpose: selectedFields?.purpose,
        ...location,
      };
      goTo(data);
    } else {
      recallLocation;
    }
  };

  const handleDropMenuClicked = () => {
    setIsInputFocused(true);
  };
  const handlePurpose = (item) => {
    if (item?.category === "purpose") {
      setPurpose(item.name);
      setSelectedFields({ purpose: item.value, type: selectedFields?.type });
      setShowDropDown(false);
      setResidential("All Residential");
    } else {
      setResidential(item.name);
      setSelectedFields({ purpose: selectedFields?.purpose, type: item.value });
      setShowDropDown2(false);
    }
  };

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
        "Faisalabad",
        "Multan",
      ],
      commercial: [
        "Islamabad",
        "Lahore",
        "Karachi",
        "Rawalpindi",
        "Faisalabad",
        "Multan",
      ],
    },
  };

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
        cities: selectedFields?.cities ? [item] : [item],
      });
    }
  };

  const handleClear = () => {
    setSelectedFields({
      purpose: "buy",
      type: "residential",
      address: "",
    });
    setPurpose("Buy");
    setResidential("All Residential");
    setSelectedDropDownOption("subtypes");
  };

  const handleChange = (e) => {
    setSelectedFields({ ...selectedFields, [e.target.name]: e.target.value });
  };

  const isPlots =
    selectedFields?.purpose === "buy" || selectedFields?.purpose === "rent";

  const handleChangeInputs = (e) => {
    setSelectedFields({ ...selectedFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("fields", selectedFields);
  }, [selectedFields]);

  // Google AutoCompletes

  const onLoadLocation = (autocomplete) => {
    locationRef.current = autocomplete;
  };

  const onChangeLocation = async () => {
    const place = await locationRef.current.getPlace();
    if (place?.formatted_address) {
      setSelectedFields({
        ...selectedFields,
        address: place?.formatted_address,
      });
    }
  };

  const isCities = selectedFields?.purpose === "coworking space";
  return (
    <>
      <Mobile_nav
        isMobileMenu={isMobileMenu}
        setIsMobileMenu={setIsMobileMenu}
      />
      <div
        style={{
          opacity: showNavbar || backgroundColor === "transparent" ? "1" : "0",
          zIndex: showNavbar || backgroundColor === "transparent" ? "99" : "-1",
          backgroundColor:
            isTransparent && backgroundColor === "transparent" && "transparent",
          top:
            isTransparent && backgroundColor === "transparent" ? "auto" : "0",
        }}
        className={
          isNavbarVisisbleFromTop
            ? classes.navbar_body_opaque
            : backgroundColor === "opaque"
            ? classes.navbar_body_opaque
            : classes.navbar_body
        }
      >
        {width < 1024 && (
          <div className={classes.mobile_left_panel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="14px"
              viewBox="0 0 20 14"
              fill="none"
              cursor="pointer"
              onClick={() => {
                setIsMobileMenu(true);
              }}
            >
              <path
                d="M0 0.995C0 0.445 0.446 0 0.995 0H9.005C9.26889 7.86455e-09 9.52197 0.10483 9.70857 0.291429C9.89517 0.478027 10 0.731109 10 0.995C10 1.25889 9.89517 1.51197 9.70857 1.69857C9.52197 1.88517 9.26889 1.99 9.005 1.99H0.995C0.731109 1.99 0.478028 1.88517 0.291429 1.69857C0.10483 1.51197 0 1.25889 0 0.995ZM0 7C0 6.45 0.446 6.005 0.995 6.005H19.005C19.2689 6.005 19.522 6.10983 19.7086 6.29643C19.8952 6.48303 20 6.73611 20 7C20 7.26389 19.8952 7.51697 19.7086 7.70357C19.522 7.89017 19.2689 7.995 19.005 7.995H0.995C0.731109 7.995 0.478028 7.89017 0.291429 7.70357C0.10483 7.51697 0 7.26389 0 7ZM0.995 12.01C0.731109 12.01 0.478028 12.1148 0.291429 12.3014C0.10483 12.488 0 12.7411 0 13.005C0 13.2689 0.10483 13.522 0.291429 13.7086C0.478028 13.8952 0.731109 14 0.995 14H13.005C13.2689 14 13.522 13.8952 13.7086 13.7086C13.8952 13.522 14 13.2689 14 13.005C14 12.7411 13.8952 12.488 13.7086 12.3014C13.522 12.1148 13.2689 12.01 13.005 12.01H0.995Z"
                fill="white"
              />
            </svg>
            <img
              onClick={() => {
                router.push("/");
              }}
              style={{ marginLeft: "25px" }}
              src={site_logo.src}
              alt="site_logo"
            />
          </div>
        )}
        <div className={classes.left_panel}>
          {!showNavbar ? (
            <>
              <div className={classes.left_panel_btns} id="left_btns">
                <div className={classes.btns_drop_down_wrapper}>
                  <div className={classes.btns_drop_down}>
                    <div className={classes.drop_down_left_panel}>
                      <div className={classes.drop_down_left_panel_content}>
                        <p
                          onClick={() => {
                            setBuySelectionOption("residential");
                          }}
                          className={
                            buySelectedOption === "residential"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Residential
                        </p>
                        <p
                          onClick={() => {
                            setBuySelectionOption("commercial");
                          }}
                          className={
                            buySelectedOption === "commercial"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Commercial
                        </p>
                        <p
                          onClick={() => {
                            setBuySelectionOption("plot");
                          }}
                          className={
                            buySelectedOption === "plot"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Plots
                        </p>
                      </div>
                    </div>
                    <div className={classes.drop_down_right_panel}>
                      <div className={classes.drop_down_right_panel_content}>
                        {buySelectedOption === "residential" ? (
                          <>
                            <div className={classes.right_panel_col}>
                              <Link href={`/${PURPOSE.buy}/residential/house`}>
                                House
                              </Link>
                              <Link href={`/${PURPOSE.buy}/residential/flat`}>
                                Flat
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/lower-portion`}
                              >
                                Lower Portion
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/upper-portion`}
                              >
                                Upper Portion
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/pent-house`}
                              >
                                Pent House
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/basement-house`}
                              >
                                Basement
                              </Link>
                            </div>

                            <div className={classes.right_panel_col}>
                              <Link
                                href={`/${PURPOSE.buy}/residential/farmhouse`}
                              >
                                Farmhouse
                              </Link>
                              <Link href={`/${PURPOSE.buy}/residential/hostel`}>
                                Hostel
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/guest-house`}
                              >
                                Guest House
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/hotel-suit`}
                              >
                                Hotel Suit
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/residential/beach-hut`}
                              >
                                Beach Hut
                              </Link>
                            </div>
                          </>
                        ) : buySelectedOption === "commercial" ? (
                          <>
                            <div className={classes.right_panel_col}>
                              <Link href={`/${PURPOSE.buy}/commercial/office`}>
                                Office
                              </Link>
                              <Link href={`/${PURPOSE.buy}/commercial/shop`}>
                                Shop
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/commercial/warehouse`}
                              >
                                Warehouse
                              </Link>
                              <Link href={`/${PURPOSE.buy}/commercial/factory`}>
                                Factory
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/commercial/building`}
                              >
                                Building
                              </Link>
                              <Link href={`/${PURPOSE.buy}/commercial/others`}>
                                Others
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={classes.right_panel_col}>
                              <Link
                                href={`/${PURPOSE.buy}/plot/residential-plot`}
                              >
                                Residential Plots
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/plot/commercial-plot`}
                              >
                                Commercial Plots
                              </Link>
                              <Link
                                href={`/${PURPOSE.buy}/plot/agricultral-plot`}
                              >
                                Agricultral Plots
                              </Link>
                              <Link href={`/${PURPOSE.buy}/plot/factory`}>
                                Factory
                              </Link>
                              <Link href={`/${PURPOSE.buy}/plot/building`}>
                                Building
                              </Link>
                              <Link href={`/${PURPOSE.buy}/plot/others`}>
                                Others
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  onClick={() => {
                    router.push("/buy");
                  }}
                  className={classes.left_panel_btn}
                >
                  Buy
                </p>
              </div>

              <div className={classes.left_panel_btns}>
                <div className={classes.btns_drop_down_wrapper}>
                  <div className={classes.btns_drop_down}>
                    <div className={classes.drop_down_left_panel}>
                      <div className={classes.drop_down_left_panel_content}>
                        <p
                          onClick={() => {
                            setRentSelectionOption("residential");
                          }}
                          className={
                            rentSelectedOption === "residential"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Residential
                        </p>
                        <p
                          onClick={() => {
                            setRentSelectionOption("commercial");
                          }}
                          className={
                            rentSelectedOption === "commercial"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Commercial
                        </p>
                        {/* <p
                          onClick={() => {
                            setRentSelectionOption("plot");
                          }}
                          className={
                            rentSelectedOption === "plot"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Plots
                        </p> */}
                      </div>
                    </div>
                    <div className={classes.drop_down_right_panel}>
                      <div className={classes.drop_down_right_panel_content}>
                        {
                          rentSelectedOption === "residential" ? (
                            <>
                              <div className={classes.right_panel_col}>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/house`}
                                >
                                  House
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/flat`}
                                >
                                  Flat
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/lower-portion`}
                                >
                                  Lower Portion
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/upper-portion`}
                                >
                                  Upper Portion
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/pent-house`}
                                >
                                  Pent House
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/basement-house`}
                                >
                                  Basement
                                </Link>
                              </div>

                              <div className={classes.right_panel_col}>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/farmhouse`}
                                >
                                  Farmhouse
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/hostel`}
                                >
                                  Hostel
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/guest-house`}
                                >
                                  Guest House
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/hotel-suit`}
                                >
                                  Hotel Suit
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/residential/beach-hut`}
                                >
                                  Beach Hut
                                </Link>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={classes.right_panel_col}>
                                <Link
                                  href={`/${PURPOSE.rent}/commercial/office`}
                                >
                                  Office
                                </Link>
                                <Link href={`/${PURPOSE.rent}/commercial/shop`}>
                                  Shop
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/commercial/warehouse`}
                                >
                                  Warehouse
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/commercial/factory`}
                                >
                                  Factory
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/commercial/building`}
                                >
                                  Building
                                </Link>
                                <Link
                                  href={`/${PURPOSE.rent}/commercial/others`}
                                >
                                  Others
                                </Link>
                              </div>
                            </>
                          )
                          // : (
                          //   <>
                          //     <div className={classes.right_panel_col}>
                          //       <p>Residential Plotss</p>
                          //       <p>Commercial Plots</p>
                          //       <p>Agricultral Plots</p>
                          //       <p>Factory</p>
                          //       <p>Building</p>
                          //       <p>Others</p>
                          //     </div>
                          //   </>
                          // )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <p className={classes.left_panel_btn}>Rent</p>
              </div>

              <div className={classes.left_panel_btns}>
                <div className={classes.btns_drop_down_wrapper}>
                  <div className={classes.btns_drop_down}>
                    <div className={classes.drop_down_left_panel}>
                      <div className={classes.drop_down_left_panel_content}>
                        <p
                          onClick={() => {
                            setSharedSpacesOption("co-living");
                          }}
                          className={
                            sharedSpacesOption === "co-living"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Shared PG/Co-living
                        </p>
                        <p
                          onClick={() => {
                            setSharedSpacesOption("co-working");
                          }}
                          className={
                            sharedSpacesOption === "co-working"
                              ? classes.option_selected
                              : classes.option
                          }
                        >
                          Co-Working
                        </p>
                      </div>
                    </div>
                    <div className={classes.drop_down_right_panel}>
                      <div
                        style={{ gridTemplateColumns: "1fr" }}
                        className={classes.drop_down_right_panel_content}
                      >
                        {sharedSpacesOption === "co-working" ? (
                          <>
                            <div className={classes.right_panel_col}>
                              <div
                                className={classes.right_panel_col_link}
                                onClick={() =>
                                  goTo({
                                    purpose: PURPOSE.coworking,
                                    city: "karachi",
                                  })
                                }
                                // href={`/shared/${PURPOSE.coworking}/co-working-spaces-in-karachi`}
                              >
                                Co-Working Spaces in Karachi
                              </div>
                              <div
                                className={classes.right_panel_col_link}
                                onClick={() =>
                                  goTo({
                                    purpose: PURPOSE.coworking,
                                    city: "lahore",
                                  })
                                }
                                // href={`/shared/${PURPOSE.coworking}/co-working-spaces-in-karachi`}
                              >
                                Co-Working Spaces in Lahore
                              </div>
                              <div
                                className={classes.right_panel_col_link}
                                onClick={() =>
                                  goTo({
                                    purpose: PURPOSE.coworking,
                                    city: "islamabad",
                                  })
                                }
                                // href={`/shared/${PURPOSE.coworking}/co-working-spaces-in-karachi`}
                              >
                                Co-Working Spaces in Islamabad
                              </div>
                              <div
                                className={classes.right_panel_col_link}
                                onClick={() =>
                                  goTo({
                                    purpose: PURPOSE.coworking,
                                    city: "rawalpindi",
                                  })
                                }
                                // href={`/shared/${PURPOSE.coworking}/co-working-spaces-in-karachi`}
                              >
                                Co-Working Spaces in Rawalpindi
                              </div>
                              <div
                                className={classes.right_panel_col_link}
                                onClick={() =>
                                  goTo({
                                    purpose: PURPOSE.coworking,
                                    city: "peshawar",
                                  })
                                }
                                // href={`/shared/${PURPOSE.coworking}/co-working-spaces-in-karachi`}
                              >
                                Co-Working Spaces in Peshawar
                              </div>
                              <div
                                className={classes.right_panel_col_link}
                                onClick={() =>
                                  goTo({
                                    purpose: PURPOSE.coworking,
                                    city: "multan",
                                  })
                                }
                                // href={`/shared/${PURPOSE.coworking}/co-working-spaces-in-karachi`}
                              >
                                Co-Working Spaces in Multan
                              </div>
                            </div>
                          </>
                        ) : (
                          sharedSpacesOption === "co-living" && (
                            <>
                              <div className={classes.right_panel_col}>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() =>
                                    goTo({
                                      purpose: PURPOSE.coliving,
                                      type: "residential",
                                      subtype: "house",
                                    })
                                  }
                                >
                                  Share a House
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() =>
                                    goTo({
                                      purpose: PURPOSE.coliving,
                                      type: "residential",
                                      subtype: "flat",
                                    })
                                  }
                                >
                                  Share a Flat
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() =>
                                    goTo({
                                      purpose: PURPOSE.coliving,
                                      type: "residential",
                                      subtype: "hostel",
                                    })
                                  }
                                >
                                  Share a Hostel
                                </div>
                              </div>
                            </>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p>Shared Spaces</p>
              </div>

              {width > 1370 ? (
                <>
                  <div className={classes.left_panel_btns}>
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        paddingRight: "30px",
                        borderRadius: "10px",
                      }}
                      className={classes.btns_drop_down_wrapper}
                    >
                      <div className={classes.drop_down_left_panel_content}>
                        <Link
                          // href={`${PURPOSE.buy}/invest/islamabad`}
                          href={`/project/invest?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356&ftype=link`}
                          className={classes.option}
                        >
                          Islamabad
                        </Link>
                        <Link
                          href={`/project/invest?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462&ftype=link`}
                          className={classes.option}
                        >
                          Lahore
                        </Link>
                        <Link
                          href={`/project/invest?lng=67.0011364&lat=24.8607343&radius=70.80875090113182&ftype=link`}
                          className={classes.option}
                        >
                          Karachi
                        </Link>
                        <Link
                          href={`/project/invest?lng=73.0169135&lat=33.5651107&radius=16.583152964339543&ftype=link`}
                          className={classes.option}
                        >
                          Rawalpindi
                        </Link>
                        <Link
                          href={`/project/invest?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485&ftype=link`}
                          className={classes.option}
                        >
                          Faisalabad
                        </Link>
                        <Link
                          href={`/project/invest?lng=71.5249154&lat=30.157458&radius=21.832574474123714&ftype=link`}
                          className={classes.option}
                        >
                          Multan
                        </Link>
                      </div>
                    </div>
                    <p className={classes.left_panel_btn}>Invest</p>
                  </div>

                  <div className={classes.left_panel_btns}>
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        paddingRight: "30px",
                        borderRadius: "10px",
                      }}
                      className={classes.btns_drop_down_wrapper}
                    >
                      <div className={classes.drop_down_left_panel_content}>
                        <Link
                          href={`/buy/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356&ftype=link`}
                        >
                          Islamabad
                        </Link>
                        <Link
                          href={`/buy/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462&ftype=link`}
                        >
                          Lahore
                        </Link>
                        <Link
                          href={`/buy/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182&ftype=link`}
                        >
                          Karachi
                        </Link>
                        <Link
                          href={`/buy/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543&ftype=link`}
                        >
                          Rawalpindi
                        </Link>
                        <Link
                          href={`/buy/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485&ftype=link`}
                        >
                          Faisalabad
                        </Link>
                        <Link
                          href={`/buy/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714&ftype=link`}
                        >
                          Multan
                        </Link>
                      </div>
                    </div>
                    <p>Wanted</p>
                  </div>

                  <Link
                    href={"/dashboard/user/overview"}
                    className={classes.left_panel_btns}
                  >
                    <p>Dashboard</p>
                  </Link>
                </>
              ) : (
                <div className={classes.left_panel_btns}>
                  <div className={classes.btns_drop_down_wrapper}>
                    <div className={classes.btns_drop_down}>
                      <div className={classes.drop_down_left_panel}>
                        <div className={classes.drop_down_left_panel_content}>
                          <p
                            onClick={() => {
                              setMoreOption("invest");
                            }}
                            className={
                              moreOption === "invest"
                                ? classes.option_selected
                                : classes.option
                            }
                          >
                            Invest
                          </p>
                          <p
                            onClick={() => {
                              setMoreOption("wanted");
                            }}
                            className={
                              moreOption === "wanted"
                                ? classes.option_selected
                                : classes.option
                            }
                          >
                            Wanted
                          </p>
                          <p
                            onClick={() => {
                              setMoreOption("dashboard");
                              router.push("/dashboard/user/overview");
                            }}
                            className={
                              moreOption === "dashboard"
                                ? classes.option_selected
                                : classes.option
                            }
                          >
                            Dashboard
                          </p>
                        </div>
                      </div>
                      <div className={classes.drop_down_right_panel}>
                        <div className={classes.drop_down_right_panel_content}>
                          {moreOption === "invest" ? (
                            <>
                              <div className={classes.right_panel_col}>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      "/project/invest?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356&ftype=link"
                                    );
                                  }}
                                >
                                  Islamabad
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/project/invest?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Lahore
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/project/invest?lng=67.0011364&lat=24.8607343&radius=70.80875090113182&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Karachi
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/project/invest?lng=73.0169135&lat=33.5651107&radius=16.583152964339543&ftype=link`
                                    );
                                  }}
                                >
                                  Rawalpindi
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/project/invest?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Faisalabad
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/project/invest?lng=71.5249154&lat=30.157458&radius=21.832574474123714&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Multan
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={classes.right_panel_col}>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      "/buy/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356&ftype=link"
                                    );
                                  }}
                                >
                                  Islamabad
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/buy/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Lahore
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/buy/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Karachi
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/buy/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543&ftype=link`
                                    );
                                  }}
                                >
                                  Rawalpindi
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/buy/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Faisalabad
                                </div>
                                <div
                                  className={classes.right_panel_col_link}
                                  onClick={() => {
                                    router.push(
                                      `/buy/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714&ftype=link`
                                    );
                                  }}
                                >
                                  {" "}
                                  Multan
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className={classes.left_panel_btn}>More</p>
                </div>
              )}
            </>
          ) : (
            <>
              {width > 1023 && (
                <img
                  onClick={() => {
                    router.push("/");
                  }}
                  style={{ marginLeft: "40px" }}
                  src={site_logo.src}
                  alt="site_logo2"
                />
              )}
            </>
          )}
        </div>

        {!showNavbar ? (
          <img
            onClick={() => {
              router.push("/");
            }}
            src={site_logo.src}
            className={classes.navbar_logo}
            alt="site_logo3"
          />
        ) : (
          <div className={classes.navbaar_search_bar}>
            <div
              className={
                isInputFocused
                  ? classes.search_panel
                  : classes.search_panel_hidden
              }
              onClick={handleDropMenuClicked}
              id="dropNavMenu"
            >
              <div id="dropNavMenu" className={classes.search_panel_container}>
                {selectedDropDownOption === "subtypes" && (
                  <div className={classes.checkbox_container}>
                    {isCities
                      ? cities?.map((item, i) => {
                          return (
                            <div
                              key={i}
                              id="dropNavMenu"
                              className={classes.single_checkbox_container}
                              onClick={() => handleSubtypesCities(item.link)}
                            >
                              <input
                                checked={selectedFields?.cities?.includes(
                                  item.link
                                )}
                                onChange={() => {}}
                                id="dropNavMenu"
                                type={"radio"}
                              />
                              <p id="dropNavMenu">{item.label}</p>
                            </div>
                          );
                        })
                      : propertyNamesByType?.[selectedFields?.purpose]?.[
                          selectedFields?.type
                        ]?.map((item, i) => {
                          return (
                            <div
                              key={i}
                              id="dropNavMenu"
                              className={classes.single_checkbox_container}
                              onClick={() => handleSubtypes(item)}
                            >
                              <input
                                checked={
                                  selectedFields?.subtype?.includes(item)
                                    ? true
                                    : false
                                }
                                onChange={() => {}}
                                id="dropNavMenu"
                                type={"checkbox"}
                              />
                              <p id="dropNavMenu">{item}</p>
                            </div>
                          );
                        })}
                  </div>
                )}
                {selectedDropDownOption === "price" && (
                  <div id="dropNavMenu" className={classes.main_inputs}>
                    <div
                      id="dropNavMenu"
                      className={classes.inner_input_fields}
                    >
                      <label id="dropNavMenu">Enter Min Price</label>
                      <input
                        id="dropNavMenu"
                        onChange={handleChangeInputs}
                        name="minPrice"
                        value={selectedFields?.minPrice}
                      />
                    </div>
                    <div
                      id="dropNavMenu"
                      className={classes.inner_input_fields}
                    >
                      <label id="dropNavMenu">Enter Max Price</label>
                      <input
                        id="dropNavMenu"
                        onChange={handleChangeInputs}
                        name="maxPrice"
                        value={selectedFields?.maxPrice}
                      />
                    </div>
                  </div>
                )}
                {selectedDropDownOption === "area" && (
                  <div id="dropNavMenu" className={classes.main_inputs}>
                    <div
                      id="dropNavMenu"
                      className={classes.inner_input_fields}
                    >
                      <label id="dropNavMenu">Enter Min Area</label>
                      <input
                        id="dropNavMenu"
                        onChange={handleChangeInputs}
                        name="minAreaSize"
                        value={selectedFields?.minAreaSize}
                      />
                    </div>
                    <div
                      id="dropNavMenu"
                      className={classes.inner_input_fields}
                    >
                      <label id="dropNavMenu">Enter Max Area</label>
                      <input
                        id="dropNavMenu"
                        onChange={handleChangeInputs}
                        name="maxAreaSize"
                        value={selectedFields?.maxAreaSize}
                      />
                    </div>
                  </div>
                )}
                <p
                  id="dropNavMenu"
                  onClick={handleClear}
                  className={classes.filters_btn}
                >
                  Filters <span id="dropNavMenu"> Clear all filters</span>
                </p>

                <div className={classes.search_panel_divider}></div>

                <div id="dropNavMenu" className={classes.drop_down_btns}>
                  <div
                    id="dropNavMenu"
                    onClick={() => setSelectedDropDownOption("price")}
                    className={`${classes.drop_down_btn} ${
                      selectedDropDownOption === "price"
                        ? classes.selected_option
                        : ""
                    }`}
                  >
                    <p id="dropNavMenu">Price</p>
                  </div>

                  <div
                    id="dropNavMenu"
                    onClick={() => setSelectedDropDownOption("area")}
                    className={`${classes.drop_down_btn} ${
                      selectedDropDownOption === "area"
                        ? classes.selected_option
                        : ""
                    }`}
                  >
                    <p id="dropNavMenu">Area</p>
                  </div>

                  <select
                    name="noOfBedrooms"
                    onChange={handleChange}
                    value={selectedFields?.beds}
                    id="dropNavMenu"
                    className={classes.drop_down_btn}
                  >
                    <option hidden>Beds</option>
                    <option value={1}>1 Bed</option>
                    <option value={2}>2 Beds</option>
                    <option value={3}>3 Beds</option>
                    <option value={4}>4 Beds</option>
                    <option value={5}>5 Beds</option>
                    <option value={6}>6 Beds</option>
                  </select>
                  <select
                    name="noOfBathrooms"
                    onChange={handleChange}
                    value={selectedFields?.baths}
                    id="dropNavMenu"
                    className={classes.drop_down_btn}
                  >
                    <option hidden>Baths</option>
                    <option value={1}>1 Bath</option>
                    <option value={2}>2 Baths</option>
                    <option value={3}>3 Baths</option>
                    <option value={4}>4 Baths</option>
                    <option value={5}>5 Baths</option>
                    <option value={6}>6 Baths</option>
                  </select>
                  {/* <select id="dropNavMenu" className={classes.drop_down_btn}>
                    <option>More Options</option>
                  </select> */}
                </div>
              </div>
            </div>

            <div
              className={classes.search_btn_1}
              onMouseEnter={() => setShowDropDown(true)}
              onMouseLeave={() => setShowDropDown(false)}
            >
              <p>{purpose}</p>
              <div
                className={`${classes.search_menu_wrapper} ${
                  showDropDown ? classes.show_drop : classes.hide_drop
                } `}
              >
                <div className={classes.login_drop_down}>
                  <div
                    onClick={() =>
                      handlePurpose({
                        name: "Buy",
                        value: "buy",
                        category: "purpose",
                      })
                    }
                    className={classes.login_single_tab}
                  >
                    <p
                      className={
                        purpose === "Buy"
                          ? classes.login_label_menu
                          : classes.drop_down_sub_label
                      }
                    >
                      Buy
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      handlePurpose({
                        name: "Rent",
                        value: "rent",
                        category: "purpose",
                      })
                    }
                    className={classes.login_single_tab}
                  >
                    {" "}
                    <p
                      className={
                        purpose === "Rent"
                          ? classes.login_label_menu
                          : classes.drop_down_sub_label
                      }
                    >
                      Rent
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      handlePurpose({
                        name: "Co-Living",
                        value: "coliving space",
                        category: "purpose",
                      })
                    }
                    className={classes.login_single_tab}
                  >
                    {" "}
                    <p
                      className={
                        purpose === "Co-Living"
                          ? classes.login_label_menu
                          : classes.drop_down_sub_label
                      }
                    >
                      Co-Living
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      handlePurpose({
                        name: "Co-Working",
                        value: "coworking space",
                        category: "purpose",
                      })
                    }
                    className={classes.login_single_tab}
                  >
                    {" "}
                    <p
                      className={
                        purpose === "Co-Working"
                          ? classes.login_label_menu
                          : classes.drop_down_sub_label
                      }
                    >
                      Co-Working
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classes.search_btn_1}
              onMouseEnter={() => setShowDropDown2(true)}
              onMouseLeave={() => setShowDropDown2(false)}
            >
              <p>{residential}</p>
              <div
                className={`${classes.search_menu_wrapper} ${
                  showDropDown2 ? classes.show_drop : classes.hide_drop
                } `}
              >
                <div className={classes.login_drop_down}>
                  <div
                    onClick={() =>
                      handlePurpose({
                        name: "All Residential",
                        value: "residential",
                        category: "type",
                      })
                    }
                    className={classes.login_single_tab}
                  >
                    <p
                      className={
                        residential === "All Residential"
                          ? classes.login_label_menu
                          : classes.drop_down_sub_label
                      }
                    >
                      All Residential
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      handlePurpose({
                        name: "Commercial",
                        value: "commercial",
                        category: "type",
                      })
                    }
                    className={classes.login_single_tab}
                  >
                    <p
                      className={
                        residential === "Commercial"
                          ? classes.login_label_menu
                          : classes.drop_down_sub_label
                      }
                    >
                      Commercial
                    </p>
                  </div>
                  {isPlots && (
                    <div
                      onClick={() =>
                        handlePurpose({
                          name: "Plots",
                          value: "plot",
                          category: "type",
                        })
                      }
                      className={classes.login_single_tab}
                    >
                      <p
                        className={
                          residential === "Plots"
                            ? classes.login_label_menu
                            : classes.drop_down_sub_label
                        }
                      >
                        Plots
                      </p>
                    </div>
                  )}
                </div>
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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type="text"
                    name="location"
                    id="dropNavMenu"
                    value={selectedFields?.address}
                    onChange={(e) => {
                      setSelectedFields({
                        ...selectedFields,
                        address: e.target.value,
                      });
                    }}
                    className={`${classes.hollow_input} google_input`}
                    autoComplete="false"
                    placeholder={"Search properties in pakistan..."}
                  />
                </Autocomplete>
              )}
              {/* <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={classes.hollow_input}
                id="dropNavMenu"
                type="text"
                placeholder="Enter Locality / Project / Society / Landmark"
                onChange={(e) => {
                  setSelectedFields({
                    ...selectedFields,
                    address: e.target.value,
                  });
                }}
                value={selectedFields?.address}
              /> */}
              <div className={classes.search_btns_container}>
                <div
                  className={classes.near_me_btn}
                  onClick={handleNearMeFIlter}
                >
                  <img src={near_pin_blue.src} alt="near_pin_blue3" />
                  <p>Near Me</p>
                </div>
                <div onClick={handleSearch} className={classes.search_btn}>
                  <img src={search_white.src} alt="white_search3" />
                  <p>Search</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={classes.right_panel}>
          {/* {width > 1370 && !showNavbar && currentPage !== "login" && (
            <div className={classes.input_with_icon}>
              <input
                placeholder="Property ID"
                className={classes.property_id_search}
              />
              <img
                src={
                  backgroundColor === "opaque"
                    ? search_icon.src
                    : search_icon_white.src
                }
              />
            </div>
          )} */}

          {/* {currentPage !== "login" && ( */}
          {user?.type === "builder" ? (
            <Link
              href={"/dashboard/builder/add-project"}
              className={classes.add_property_btn}
            >
              <div className={classes.free_tag}>
                <p>Free</p>
              </div>
              <img src={home_icon.src} alt="home_icon3" />
              <p>Add Project</p>
            </Link>
          ) : (
            <Link
              href={"/dashboard/user/add-property"}
              className={classes.add_property_btn}
            >
              <div className={classes.free_tag}>
                <p>Free</p>
              </div>
              <img src={home_icon.src} alt="home_icon4" />
              <p>Add Property</p>
            </Link>
          )}
          {/* )} */}

          {!showNavbar && (
            <div className={classes.icons_container}>
              {currentPage !== "login" && (
                <Link href={"/dashboard/user/zilaay-chats"}>
                  {" "}
                  <img
                    className={classes.icon}
                    src={bell_white.src}
                    alt="chats"
                  />
                </Link>
              )}

              <Link href={"/dashboard/user/account-settings"}>
                {" "}
                <img
                  className={classes.icon}
                  src={setting_white.src}
                  alt="setting"
                />
              </Link>
            </div>
          )}

          {currentPage !== "login" && (
            <div
              style={{
                backgroundColor: "white",
                maxWidth: "100px",
                paddingLeft: "5px",
              }}
              className={classes.login_btn}
            >
              {user ? (
                <img
                  src={account.src}
                  width={24}
                  height={24}
                  alt="account_img1"
                />
              ) : (
                <img
                  src={account.src}
                  width={24}
                  height={24}
                  alt="account_img2"
                />
              )}
              <p
                className={classes.login_label}
                style={{
                  overflow: " hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user ? user?.username?.split(" ")[0] : "Login"}
              </p>

              <div className={classes.login_drop_down_wrapper}>
                <div className={classes.login_drop_down}>
                  {!user && (
                    <>
                      <div
                        onClick={() => {
                          router.push("/login");
                        }}
                        className={classes.login_single_tab}
                      >
                        <p className={classes.login_label_menu}>
                          Login/Register
                        </p>
                      </div>
                    </>
                  )}
                  {user && (
                    <>
                      <Link
                        href={"/dashboard/user/my-listing"}
                        className={classes.login_single_tab}
                      >
                        {" "}
                        <p className={classes.drop_down_label}>My Listing</p>
                      </Link>
                      <Link
                        href={"/dashboard/user/overview"}
                        className={classes.login_single_tab}
                      >
                        {" "}
                        <p className={classes.drop_down_label}>Dashboard</p>
                      </Link>
                      <Link
                        href={"//dashboard/user/report_reach"}
                        className={classes.login_single_tab}
                      >
                        {" "}
                        <p className={classes.drop_down_sub_label}>Reports</p>
                      </Link>
                      <Link
                        href={"/dashboard/user/zilaay-chats"}
                        className={classes.login_single_tab}
                      >
                        {" "}
                        <p className={classes.drop_down_sub_label}>Contacted</p>
                      </Link>
                      <Link
                        href={"/dashboard/user/account-settings"}
                        className={classes.login_single_tab}
                      >
                        {" "}
                        <p className={classes.drop_down_sub_label}>Settings</p>
                      </Link>

                      <div
                        onClick={() => {
                          removeUser();
                        }}
                        className={classes.login_single_tab}
                      >
                        <p className={classes.login_label_menu}>Logout</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* {width > 1100 && (
            <>
              {!showNavbar ? (
                <p style={{ fontSize: "24px", marginBottom: "12px" }}>اردو</p>
              ) : (
                <p>More</p>
              )}
            </>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
