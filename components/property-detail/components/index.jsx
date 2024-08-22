import React, { useState, useEffect } from "react";
import classes from "./property-detail.module.css";
import PropertyImages from "./property-images";
import chat from "../../../public/assets/property-detail-assets/chat.svg";
import whatsapp_icon from "../../../public/assets/icons/whatsapp_color.svg";
import phone_blue from "../../../public/assets/icons/phone_blue.svg";
import email_white from "../../../public/assets/icons/email_white.svg";
import doc1 from "../../../public/assets/project_detail_assets/pdf.svg";
import doc2 from "../../../public/assets/project_detail_assets/word.svg";
import ad from "../../../public/assets/property-detail-assets/ad.png";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  createDashboardUrlByUserRole,
  getDateWithMonthName,
  goTo,
  isJSONString,
  useWindowSize,
} from "../../../utils";
import {
  property_calllog,
  property_email,
  property_whatsapp,
  svg_detail_viewmore,
  svg_read_more,
} from "../../../public/Svgs";
import Link from "next/link";
import { MAP_DEFAULT_CENTER, PURPOSE } from "../../../utils/constants";
import { PropertyDetailMap } from "../../common/maps";
import { useAuth } from "../../../contextApi";
import { DETAIL_FEATURE_DISPLAY } from "../../../data/detailFeature";
import { addEvent } from "../../../redux/analytic";
import { useDispatch } from "react-redux";

function PropertyDetailContent({
  stickyDivRef,
  isPropertyImgModal,
  property,
  setImageOpen,
}) {
  const dispatch = useDispatch();
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const [featuresSize, setFeaturesSize] = useState({
    mainFeatures: 6,
    communicationFeatures: 6,
    roomFeatures: 6,
    communityFeatures: 6,
    nearbyFeatures: 6,
    otherFeatures: 6,
  });
  const [mainFeatures, setMainFeatures] = useState([]);
  const [communicationFeatures, setCommunicationFeatures] = useState([]);
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [communityFeatures, setCommunityFeatures] = useState([]);
  const [nearbyFeatures, setNearbyFeatures] = useState([]);
  const [otherFeatures, setOtherFeatures] = useState([]);

  const [isReadmore, setIsReadmore] = useState(false);
  const width = useWindowSize().width;
  const { user } = useAuth();
  const mapPin =
    property?.property?.mapPin && isJSONString(property?.property?.mapPin)
      ? JSON.parse(property?.property?.mapPin)
      : null;
  const lat = mapPin?.lat || MAP_DEFAULT_CENTER.lat;
  const lng = mapPin?.lng || MAP_DEFAULT_CENTER.lng;
  const [activeButton, setActiveButton] = useState(1);
  const handleLinkClick = (buttonId) => {
    setActiveButton(buttonId);
    // You can perform other actions here based on the link click
  };

  const handleDisplayFeatures = () => {
    if (property?.property?.features) {
      const features = property.property.features;
      let mainF = [];
      let communicationF = [];
      let roomF = [];
      let communityF = [];
      let nearbyF = [];
      let otherF = [];

      DETAIL_FEATURE_DISPLAY?.map((f) => {
        if (features?.[f?.slug] && features?.[f?.slug]?.length > 0) {
          if (f.type === "Main Features")
            mainF.push({ ...f, value: features[f.slug] });
          if (f.type === "Business and Communication")
            communicationF.push({ ...f, value: features[f.slug] });
          if (f.type === "Rooms") roomF.push({ ...f, value: features[f.slug] });
          if (f.type === "Community Features")
            communityF.push({ ...f, value: features[f.slug] });
          if (f.type === "Nearby Locations")
            nearbyF.push({ ...f, value: features[f.slug] });
          if (f.type === "Other Facilities")
            otherF.push({ ...f, value: features[f.slug] });
        }
      });

      setMainFeatures(mainF);
      setCommunicationFeatures(communicationF);
      setRoomFeatures(roomF);
      setCommunityFeatures(communityF);
      setNearbyFeatures(nearbyF);
      setOtherFeatures(otherF);
    }
  };
  useEffect(() => {
    if (property?.property?.features) {
      handleDisplayFeatures();
    }
  }, [property?.property?.features]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const matchingButton = buttons.find(
      (button) => button.path === currentPath
    );

    if (matchingButton) {
      setActiveButton(matchingButton.id);
    }
  }, []);

  const imgLenght = property?.property?.images.length;
  const videoLenght = property?.property?.videos.length;
  const buttons = [
    { id: 1, path: "#overview" },
    { id: 2, path: "#description" },
    { id: 3, path: "#features" },
    { id: 4, path: "#documents" },
    { id: 5, path: "#location" },
    // Add more buttons with their respective paths
  ];

  const UseLinks = () => {
    if (property?.property?.purpose === PURPOSE.buy) {
      return `Propertise for sale`;
    } else if (property?.property?.purpose === PURPOSE.rent) {
      return `Propertise for rent`;
    } else if (property?.property?.purpose === PURPOSE.coliving) {
      return `Co-living spaces`;
    } else {
      return `Co-working spaces`;
    }
  };

  const handlefeatureView = (f) => {
    featuresSize[f] = DETAIL_FEATURE_DISPLAY.length;
    setFeaturesSize(featuresSize);
    handleDisplayFeatures();
  };
  const handleWhatsAppEvent = () => {
    dispatch(
      addEvent({
        userId: property?.property?.user,
        payload: {
          category: "click",
          name: "whatsapp-click",
          property: property?.property?._id,
          staffId: property?.property?.staff ? property?.property?.staff : null,
        },
      })
    );
  };

  const handleChatClickEvent = () => {
    dispatch(
      addEvent({
        userId: property?.property?.user,
        payload: {
          category: "click",
          name: "chat-click",
          property: property?.property?._id,
          staffId: property?.property?.staff ? property?.property?.staff : null,
        },
      })
    );
  };
  const handleEmailClickEvent = () => {
    dispatch(
      addEvent({
        userId: property?.property?.user,
        payload: {
          category: "click",
          name: "email-click",
          property: property?.property?._id,
          staffId: property?.property?.staff ? property?.property?.staff : null,
        },
      })
    );
  };

  const city = property?.property?.city.split(",").slice(0, 1);
  const description =
    property?.property?.description || "Description not available at this time";

  return (
    <>
      <div className={classes.container}>
        <PropertyImages
          setIsTopPanelSticky={setIsTopPanelSticky}
          isPropertyImgModal={isPropertyImgModal}
          property_images={property?.property?.images}
          setImageOpen={setImageOpen}
        />
        <div className={classes.content_container}>
          <div
            style={{
              position: isTopPanelSticky && "fixed",
              top: isTopPanelSticky && "35px",
              width: isTopPanelSticky && "100vw",
              borderRadius: isTopPanelSticky && "0",
            }}
            className={classes.stats_panel}
          >
            <div
              style={{
                marginLeft: isTopPanelSticky && "14px",
              }}
              className={classes.btns_container}
            >
              <Link
                href={buttons[0].path}
                onClick={() => handleLinkClick(buttons[0].id)}
                scroll
                className={activeButton === 1 ? "blue_tag" : "white_tag "}
              >
                <p>Overview</p>
              </Link>

              <Link
                href={buttons[1].path}
                onClick={() => handleLinkClick(buttons[1].id)}
                scroll
                className={activeButton === 2 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Description</p>
              </Link>

              <Link
                href={buttons[2].path}
                onClick={() => handleLinkClick(buttons[2].id)}
                scroll
                className={activeButton === 3 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Property Features</p>
              </Link>
              <Link
                href={buttons[3].path}
                onClick={() => handleLinkClick(buttons[3].id)}
                scroll
                className={activeButton === 4 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Property Documents</p>
              </Link>
              <Link
                href={buttons[4].path}
                onClick={() => handleLinkClick(buttons[4].id)}
                scroll
                className={activeButton === 5 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Location & Nearby</p>
              </Link>
            </div>

            <div className={classes.btns_container_right}>
              <p className={classes.stat}>
                {imgLenght || "0"} <span>Photos</span>
              </p>

              <p className={classes.stat}>
                {videoLenght || "0"} <span>Videos</span>
              </p>
            </div>
          </div>
          <div className={classes.details_container}>
            <div className={classes.left_panel}>
              <div className={classes.section}>
                {width < 1024 && (
                  <div className={classes.property_price}>
                    {property?.priceUnit || "PKR"}
                    {property?.price || "0 PKR"}
                  </div>
                )}
                <div className={classes.initial_info_container}>
                  <h3>{property?.property?.title || "New Horizons"}</h3>
                  <p>{property?.property?.location || "Not Provided"}</p>
                  <p>{property?.property?.city || "Not Provided"}</p>
                </div>
                {width < 1024 && (
                  <>
                    <div className={classes.contact_buttons_container}>
                      <div
                        className={classes.divider}
                        style={{ marginTop: "20px" }}
                      />
                      <div className={classes.contact_btns_content}>
                        <a
                          href={`mailto: ${property?.property?.email}`}
                          className={classes.contact_btn1}
                          onClick={handleEmailClickEvent}
                        >
                          {property_email}Email
                        </a>
                        <a
                          href={`tel: ${property?.property?.mobileNumbers[0]}`}
                          className={classes.contact_btn2}
                        >
                          {property_calllog}Call
                        </a>

                        <a
                          href={`https://api.whatsapp.com/send?phone=${property?.property?.whatsapp}`}
                          target="_blank"
                          className={classes.contact_btn4}
                          onClick={handleWhatsAppEvent}
                        >
                          {property_whatsapp}
                        </a>
                      </div>
                      <div className={classes.divider} />{" "}
                    </div>
                  </>
                )}
                <div className={classes.overview_details_container}>
                  {width > 1023 ? (
                    <div
                      className={classes.heading_container}
                      style={{ marginTop: "20px" }}
                    >
                      <h3 id="overview" style={{ scrollMarginTop: "100px" }}>
                        Overview
                      </h3>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div
                className={`${classes.section} ${classes.section_detail_description}`}
              >
                <div>
                  <div className={classes.tale_heading}>Details</div>
                  <div className={classes.overview_details_table}>
                    <div className={classes.table_half}>
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>Type</div>
                        <div className={classes.overview_table_text}>
                          {property?.property?.type || "Flat"}
                        </div>
                      </div>
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>Price</div>
                        <div className={classes.overview_table_text}>
                          {property?.price || "4.05 Crore"}
                        </div>
                      </div>{" "}
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>
                          Location
                        </div>
                        <div className={classes.overview_table_text}>
                          {property?.property?.location ||
                            "DHA Phase 7 Extension"}
                        </div>
                      </div>
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>
                          Bath{"(s)"}
                        </div>
                        <div className={classes.overview_table_text}>
                          {property?.noOfBathrooms || "3  "}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${classes.table_half} ${classes.table_half2}`}
                    >
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>Area</div>
                        <div className={classes.overview_table_text}>
                          {property?.property?.areaSize || "500 "}&nbsp;
                          {property?.property?.areaSizeUnit || "Sq Yrds"}
                        </div>
                      </div>{" "}
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>
                          Purpose
                        </div>
                        <div className={classes.overview_table_text}>
                          {property?.property?.purpose || "For Sale"}
                        </div>
                      </div>
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>
                          Bedroom{"(s)"}
                        </div>
                        <div className={classes.overview_table_text}>
                          {property?.noOfBedrooms || "3"}
                        </div>
                      </div>
                      <div className={classes.single_tab}>
                        <div className={classes.overview_table_head}>Added</div>
                        <div className={classes.overview_table_text}>
                          {getDateWithMonthName(
                            property?.property?.createdAt
                          ) || "recently"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {width > 1023 && (
                  <div
                    className={classes.divider}
                    style={{ marginBottom: "40px" }}
                  />
                )}
                <div className={classes.description_container}>
                  <h2
                    className={classes.section_heading}
                    id="description"
                    style={{ scrollMarginTop: "100px" }}
                  >
                    Description
                  </h2>
                  <div
                    style={{
                      lineHeight: "1.2",
                      maxHeight: isReadmore ? "none" : "31.5px",
                      overflow: "hidden",
                    }}
                  >
                    <p className={classes.para}>{description}</p>
                  </div>
                  {description.split("").length > 50 && (
                    <buttons
                      className={classes.read_more}
                      onClick={() => setIsReadmore(!isReadmore)}
                    >
                      {isReadmore ? "Read Less" : "Read More"}
                      {svg_read_more}
                    </buttons>
                  )}
                </div>
              </div>
              <div className={classes.divider} />
              {width > 768 &&
              (mainFeatures?.length > 0 ||
                roomFeatures?.length > 0 ||
                communicationFeatures?.length > 0 ||
                communityFeatures?.length > 0 ||
                nearbyFeatures?.length > 0 ||
                otherFeatures?.length > 0) ? (
                <div className={classes.section}>
                  <h2
                    className={classes.section_heading}
                    id="features"
                    style={{ scrollMarginTop: "100px" }}
                  >
                    Property Features
                  </h2>
                  {mainFeatures?.length > 0 && featuresSize?.mainFeatures && (
                    <div className={classes.features_container}>
                      <h2>Main Features</h2>

                      <div className={classes.vertical_divider} />
                      <div className={classes.features}>
                        {mainFeatures
                          .slice(0, featuresSize.mainFeatures)
                          .map((f) => {
                            return (
                              <div
                                key={f?.slug}
                                className={classes.feature_row}
                              >
                                {/* Will enable icon when get all */}
                                {f?.icon ? (
                                  <img src={f?.icon} />
                                ) : (
                                  <CheckCircleOutlined />
                                )}
                                <p>
                                  {f?.name} : {f?.value}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                      {featuresSize.mainFeatures < mainFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("mainFeatures")}
                          className={classes.viewmore}
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {roomFeatures?.length > 0 && (
                    <div
                      style={{ backgroundColor: "white" }}
                      className={classes.features_container}
                    >
                      <h2>Rooms</h2>

                      <div className={classes.vertical_divider} />

                      <div className={classes.features}>
                        {roomFeatures
                          .slice(0, featuresSize.roomFeatures)
                          .map((f) => {
                            return (
                              <div
                                key={f?.slug}
                                className={classes.feature_row}
                              >
                                {/* Will enable icon when get all */}
                                {f?.icon ? (
                                  <img src={f?.icon} />
                                ) : (
                                  <CheckCircleOutlined />
                                )}
                                <p>
                                  {f?.name}: {f?.value}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                      {featuresSize.roomFeatures < roomFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("roomFeatures")}
                          className={classes.viewmore}
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {communicationFeatures?.length > 0 && (
                    <div
                      style={{ backgroundColor: "white" }}
                      className={classes.features_container}
                    >
                      <h2>Business</h2>

                      <div className={classes.vertical_divider} />

                      <div className={classes.features}>
                        {communicationFeatures
                          .slice(0, featuresSize.communicationFeatures)
                          .map((f) => {
                            return (
                              <div
                                key={f?.slug}
                                className={classes.feature_row}
                              >
                                {/* Will enable icon when get all */}
                                {f?.icon ? (
                                  <img src={f?.icon} />
                                ) : (
                                  <CheckCircleOutlined />
                                )}
                                <p>
                                  {f?.name}: {f?.value}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                      {featuresSize.communicationFeatures <
                        communicationFeatures?.length && (
                        <button
                          onClick={() =>
                            handlefeatureView("communicationFeatures")
                          }
                          className={classes.viewmore}
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {communityFeatures?.length > 0 && (
                    <div
                      style={{ backgroundColor: "white" }}
                      className={classes.features_container}
                    >
                      <h2>Community</h2>

                      <div className={classes.vertical_divider} />

                      <div className={classes.features}>
                        {communityFeatures
                          .slice(0, featuresSize.communityFeatures)
                          .map((f) => {
                            return (
                              <div
                                key={f?.slug}
                                className={classes.feature_row}
                              >
                                {/* Will enable icon when get all */}
                                {f?.icon ? (
                                  <img src={f?.icon} />
                                ) : (
                                  <CheckCircleOutlined />
                                )}
                                <p>
                                  {f?.name}: {f?.value}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                      {featuresSize.communityFeatures <
                        communityFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("communityFeatures")}
                          className={classes.viewmore}
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {nearbyFeatures?.length > 0 && (
                    <div
                      style={{ backgroundColor: "white" }}
                      className={classes.features_container}
                    >
                      <h2>Nearby</h2>

                      <div className={classes.vertical_divider} />

                      <div className={classes.features}>
                        {nearbyFeatures
                          .slice(0, featuresSize.nearbyFeatures)
                          .map((f) => {
                            return (
                              <div
                                key={f?.slug}
                                className={classes.feature_row}
                              >
                                {/* Will enable icon when get all */}
                                {f?.icon ? (
                                  <img src={f?.icon} />
                                ) : (
                                  <CheckCircleOutlined />
                                )}
                                <p>
                                  {f?.name}: {f?.value}
                                </p>
                              </div>
                            );
                          })}
                      </div>

                      {featuresSize.nearbyFeatures < nearbyFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("nearbyFeatures")}
                          className={classes.viewmore}
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {otherFeatures?.length > 0 && (
                    <div
                      style={{ backgroundColor: "white" }}
                      className={classes.features_container}
                    >
                      <h2>Other</h2>

                      <div className={classes.vertical_divider} />

                      <div className={classes.features}>
                        {otherFeatures
                          .slice(0, featuresSize.otherFeatures)
                          .map((f) => {
                            return (
                              <div
                                key={f?.slug}
                                className={classes.feature_row}
                              >
                                {/* Will enable icon when get all */}
                                {f?.icon ? (
                                  <img src={f?.icon} />
                                ) : (
                                  <CheckCircleOutlined />
                                )}
                                <p>
                                  {f?.name}: {f?.value}
                                </p>
                              </div>
                            );
                          })}
                      </div>

                      {featuresSize.otherFeatures < otherFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("otherFeatures")}
                          className={classes.viewmore}
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}
                  <div className={classes.divider} />
                </div>
              ) : (
                ""
              )}
              <div className={classes.section}>
                {width > 1023 && property?.property?.documents.length > 0 && (
                  <>
                    <h2
                      className={classes.section_heading}
                      id="documents"
                      style={{ scrollMarginTop: "100px" }}
                    >
                      Property Documents
                    </h2>

                    <div className={classes.docs_container}>
                      {property?.property?.documents.map((e) => {
                        const isPdf =
                          typeof path === "string" && path.endsWith(".pdf");
                        return (
                          <a href={e} target_blank>
                            <img src={isPdf ? doc1.src : doc2.src} />
                          </a>
                        );
                      })}
                    </div>
                  </>
                )}

                {width > 1023 ? (
                  <div style={{ width: "100%" }} className="cities_container">
                    <p
                      style={{ color: "#004439", scrollMarginTop: "100px" }}
                      className="listed_properties_heading"
                      id="location"
                    >
                      Location & Nearby
                    </p>
                    <div
                      className="cities_btns_container"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        style={{ marginLeft: "20px", color: "white" }}
                        className="btn"
                        onClick={() =>
                          goTo({
                            purpose: property?.property?.purpose,
                            type: property?.property?.type,
                            city: city,
                          })
                        }
                      >
                        More {city} Maps
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className={classes.mobile_cities_head}>
                      Location & Nearby
                    </div>
                  </>
                )}

                <div
                  className={classes.map_container}
                  style={{ width: "100%", marginBottom: "30px" }}
                >
                  <PropertyDetailMap markerPosition={{ lat, lng }} />
                </div>
                {width < 1024 && (
                  <>
                    <button
                      className={classes.btn_karachi_map}
                      onClick={() =>
                        goTo({
                          purpose: property?.property?.purpose,
                          type: property?.property?.type,
                          city: city,
                        })
                      }
                    >
                      More {city} Maps
                    </button>

                    {/* <div className={classes.useful_links_section}>
                      <div className={classes.links_content_container}>
                        <h2 className={classes.links_heading}>Useful Links</h2>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Karachi",
                            })
                          }
                        >
                          <UseLinks /> in Karachi
                        </span>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Lahore",
                            })
                          }
                        >
                          <UseLinks /> in Lahore
                        </span>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Islamabad",
                            })
                          }
                        >
                          <UseLinks /> in Islamabad
                        </span>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Multan",
                            })
                          }
                        >
                          <UseLinks /> in Multan
                        </span>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Peshawar",
                            })
                          }
                        >
                          <UseLinks /> in Peshawar
                        </span>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Fasialabad",
                            })
                          }
                        >
                          <UseLinks /> in Fasialabad
                        </span>
                        <span
                          onClick={() =>
                            goTo({
                              purpose: property?.property?.purpose,
                              city: "Quetta",
                            })
                          }
                        >
                          <UseLinks /> in Quetta
                        </span>
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </div>
            <div ref={stickyDivRef} className={classes.right_panel}>
              <div className={classes.contact_panel}>
                <div className={classes.panel_content_container}>
                  <h2 className={classes.place_name}>
                    {property?.property?.title || "New Horizons"}
                  </h2>
                  <p className={classes.address}>
                    {property?.property?.location || "N/A"}
                  </p>
                  <p className={classes.city}>
                    {property?.property?.city || "N/A"}
                  </p>
                  <div className={classes.panel_btns_container}>
                    <h2 className={classes.price}>
                      {" "}
                      {property?.priceUnit || "PKR"}
                      {property?.price || "0"}
                    </h2>

                    <a
                      href={`tel: ${property?.property?.mobileNumbers[0]}`}
                      style={{ width: "90%" }}
                      className="prop_btn_secondary btn"
                    >
                      <img src={phone_blue.src} />
                      <p>Call</p>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${property?.property?.whatsapp}`}
                      target="_blank"
                      style={{ width: "90%", backgroundColor: "#25D366" }}
                      className="prop_whatsapp_btn btn"
                      onClick={handleWhatsAppEvent}
                    >
                      <img src={whatsapp_icon.src} />
                      <p>WhatsApp</p>
                    </a>
                    <Link
                      href={createDashboardUrlByUserRole(user?.type, {
                        id: "zilaay-chats",
                        user_id: property?.property?.user,
                        property_ref_id: property?.property?._id,
                      })}
                      shallow={false}
                      style={{ width: "90%" }}
                      className="btn"
                      onClick={handleChatClickEvent}
                    >
                      <img src={chat.src} />
                      <p>4Devari Chat</p>
                    </Link>
                    <a
                      href={`mailto: ${property?.property?.email}`}
                      style={{ width: "90%" }}
                      className="btn"
                      onClick={handleEmailClickEvent}
                    >
                      <img src={email_white.src} style={{ width: "20px" }} />
                      <p>Email</p>
                    </a>
                  </div>
                </div>
              </div>

              {/* <div className={classes.useful_links_section}>
                <div className={classes.links_content_container}>
                  <h2 className={classes.links_heading}>Useful Links</h2>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Karachi",
                      })
                    }
                  >
                    <UseLinks /> in Karachi
                  </span>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Lahore",
                      })
                    }
                  >
                    <UseLinks /> in Lahore
                  </span>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Islamabad",
                      })
                    }
                  >
                    <UseLinks /> in Islamabad
                  </span>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Multan",
                      })
                    }
                  >
                    <UseLinks /> in Multan
                  </span>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Peshawar",
                      })
                    }
                  >
                    <UseLinks /> in Peshawar
                  </span>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Fasialabad",
                      })
                    }
                  >
                    <UseLinks /> in Fasialabad
                  </span>
                  <span
                    onClick={() =>
                      goTo({
                        purpose: property?.property?.purpose,
                        city: "Quetta",
                      })
                    }
                  >
                    <UseLinks /> in Quetta
                  </span>
                </div>
              </div> */}
              <img src={ad.src} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetailContent;
