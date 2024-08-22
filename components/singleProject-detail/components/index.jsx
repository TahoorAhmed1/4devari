import React, { useState, useEffect } from "react";
import PropertyImages from "./property-images";
import info_img from "/public/assets/project_detail_assets/img1.png";
import { CheckCircleOutlined } from "@ant-design/icons";
import doc1 from "/public/assets/project_detail_assets/pdf.svg";
import doc2 from "/public/assets/project_detail_assets/word.svg";
import {
  convertNumberToWords,
  createDashboardUrlByUserRole,
  getDateWithMonthName,
  isJSONString,
  useWindowSize,
} from "../../../utils";
import {
  svg_builder_call,
  svg_builder_message,
  svg_builder_report,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
  svg_detail_viewmore,
} from "../../../public/Svgs";
import Top_builders from "../../cards/top_builder";
import Link from "next/link";
import { PropertyDetailMap } from "../../common/maps";
import { MAP_DEFAULT_CENTER } from "../../../utils/constants";
import { useAuth } from "../../../contextApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchbuilders } from "../../../redux/users";
import Loader from "../../common/loader";
import { CardSlider } from "../../common";
import { PROJECT_FEATURE_DISPLAY } from "../../../data/detailFeature";
import { addEvent } from "../../../redux/analytic";

function ProjectDetailContent({
  stickyDivRef,
  data,
  isPropertyImgModal,
  setImageOpen,
}) {
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const width = useWindowSize().width;
  const responsive = [
    {
      breakpoint: 1431,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        // nextArrow: <Next />,
        centerMode: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        // nextArrow: <Next />,
        centerMode: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
        // nextArrow: <Next />,
      },
    },
    {
      breakpoint: 588,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
        // nextArrow: <Next />,
      },
    },
  ];
  const dispatch = useDispatch();
  const { builders, loadingBuilders } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchbuilders(`nPerPage=6`));
  }, []);
  const { user } = useAuth();
  const mapPin =
    data?.mapPin && isJSONString(data?.mapPin)
      ? JSON.parse(data?.mapPin)
      : null;
  const lat = mapPin?.lat || MAP_DEFAULT_CENTER.lat;
  const lng = mapPin?.lng || MAP_DEFAULT_CENTER.lng;

  const [activeButton, setActiveButton] = useState(1);

  const handleLinkClick = (buttonId) => {
    setActiveButton(buttonId);
    // You can perform other actions here based on the link click
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const matchingButton = buttons.find(
      (button) => button.path === currentPath
    );

    if (matchingButton) {
      setActiveButton(matchingButton.id);
    }
  }, []);

  const buttons = [
    { id: 1, path: "#overview" },
    { id: 2, path: "#project_detail" },
    { id: 3, path: "#features" },
    { id: 4, path: "#location" },
    { id: 5, path: "#floor_plan" },
    { id: 6, path: "#payment_plan" },
    // Add more buttons with their respective paths
  ];
  const [featuresSize, setFeaturesSize] = useState({
    mainFeatures: 6,
    communicationFeatures: 6,
    plotFeatures: 6,
    communityFeatures: 6,
    nearbyFeatures: 6,
    otherFeatures: 6,
    healthFeatures: 6,
  });
  const [mainFeatures, setMainFeatures] = useState([]);
  const [communicationFeatures, setCommunicationFeatures] = useState([]);
  const [plotFeatures, setPlotFeatures] = useState([]);
  const [healthFeatures, setHealthFeatures] = useState([]);
  const [communityFeatures, setCommunityFeatures] = useState([]);
  const [nearbyFeatures, setNearbyFeatures] = useState([]);
  const [otherFeatures, setOtherFeatures] = useState([]);

  const handleDisplayFeatures = () => {
    if (data?.features) {
      const features = data.features;
      let mainF = [];
      let communicationF = [];
      let plotF = [];
      let communityF = [];
      let nearbyF = [];
      let otherF = [];
      let healthcareF = [];

      PROJECT_FEATURE_DISPLAY?.map((f) => {
        if (features?.[f?.slug] && features?.[f?.slug]?.length > 0) {
          if (f.type === "Main Features")
            mainF.push({ ...f, value: features[f.slug] });
          if (f.type === "Business and Communication")
            communicationF.push({ ...f, value: features[f.slug] });
          if (f.type === "Plot Features")
            plotF.push({ ...f, value: features[f.slug] });
          if (f.type === "Community Features")
            communityF.push({ ...f, value: features[f.slug] });
          if (f.type === "Nearby Locations")
            nearbyF.push({ ...f, value: features[f.slug] });
          if (f.type === "Other Facilities")
            otherF.push({ ...f, value: features[f.slug] });
          if (f.type === "Healthcare Recreational")
            healthcareF.push({ ...f, value: features[f.slug] });
        }
      });

      setMainFeatures(mainF);
      setCommunicationFeatures(communicationF);
      setPlotFeatures(plotF);
      setCommunityFeatures(communityF);
      setNearbyFeatures(nearbyF);
      setOtherFeatures(otherF);
      setHealthFeatures(healthcareF);
    }
  };
  useEffect(() => {
    if (data?.features) {
      handleDisplayFeatures();
    }
  }, [data?.features]);
  const handlefeatureView = (f) => {
    featuresSize[f] = PROJECT_FEATURE_DISPLAY.length;
    setFeaturesSize(featuresSize);
    handleDisplayFeatures();
  };

  // Analytics
  const handleWhatsAppEvent = () => {
    dispatch(
      addEvent({
        userId: data?.user?._id,
        payload: {
          category: "click",
          name: "whatsapp-click",
          project: data?._id,
        },
      })
    );
  };
  const handleChatClickEvent = () => {
    dispatch(
      addEvent({
        userId: data?.user?._id,
        payload: {
          category: "click",
          name: "chat-click",
          project: data?._id,
        },
      })
    );
  };
  const handleEmailClickEvent = () => {
    dispatch(
      addEvent({
        userId: data?.user?._id,
        payload: {
          category: "click",
          name: "email-click",
          project: data?._id,
        },
      })
    );
  };

  return (
    <div className="single_project_detail_container">
      <div className="container">
        <PropertyImages
          setIsTopPanelSticky={setIsTopPanelSticky}
          isPropertyImgModal={isPropertyImgModal}
          property_images={data?.images}
          setImageOpen={setImageOpen}
        />
        <div className="content_container">
          <div
            style={{
              position: isTopPanelSticky && "fixed",
              top: isTopPanelSticky && "35px",
              width: isTopPanelSticky && "100vw",
              borderRadius: isTopPanelSticky && "0",
            }}
            className="stats_panel"
          >
            <div
              style={{
                marginLeft: isTopPanelSticky && "14px",
              }}
              className="btns_container"
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
                <p style={{ color: "black" }}>Project Details</p>
              </Link>

              <Link
                href={buttons[2].path}
                onClick={() => handleLinkClick(buttons[2].id)}
                scroll
                className={activeButton === 3 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Features</p>
              </Link>

              <Link
                href={buttons[3].path}
                onClick={() => handleLinkClick(buttons[3].id)}
                scroll
                className={activeButton === 4 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Location</p>
              </Link>

              {data?.paymentPlans.length > 0 && (
                <Link
                  href={buttons[5].path}
                  onClick={() => handleLinkClick(buttons[5].id)}
                  scroll
                  className={activeButton === 6 ? "blue_tag" : "white_tag "}
                >
                  <p style={{ color: "black" }}>Payment Plan</p>
                </Link>
              )}
            </div>

            <div className="btns_container_right">
              <p className="stat">
                {data?.images?.length || 0} <span>Photos</span>
              </p>
              <p className="stat">
                {data?.videos?.lenght || 0} <span>Videos</span>
              </p>
            </div>
          </div>
          <div className="back_link containers"></div>
          <div className="details_container">
            <div className="left_panel">
              <div className="section ">
                <div className="initial_info_container" id="overview">
                  <div className="info_img">
                    <img src={data?.projectLogo || info_img} />
                  </div>
                  <div className="info_text">
                    <h3>{data?.name || "N/A"}</h3>
                    <p>{data?.location || "N/A"}</p>
                    <p>{data?.city || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div
                className="section section_detail_description mt10"
                id="project_detail"
                style={{ scrollMarginTop: "50px" }}
              >
                <h3>Project Details</h3>
                <div className="overview_details_table">
                  <div className="table_half">
                    <div className="single_tab">
                      <div className="overview_table_head">Project ID</div>
                      <div className="overview_table_text">{data?._id}</div>
                    </div>
                    <div className="single_tab">
                      <div className="overview_table_head">Price</div>
                      <div className="overview_table_text">
                        {convertNumberToWords(data?.price) || "0 RS"}
                      </div>
                    </div>{" "}
                    <div className="single_tab">
                      <div className="overview_table_head">Location</div>
                      <div className="overview_table_text">
                        {data?.location}
                      </div>
                    </div>
                    <div className="single_tab">
                      <div className="overview_table_head">Project Status</div>
                      <div className="overview_table_text">{data?.status}</div>
                    </div>
                  </div>
                  <div className={`$"table_half} $"table_half2}`}>
                    <div className="single_tab">
                      <div className="overview_table_head">
                        {" "}
                        Total Selling Units
                      </div>
                      <div className="overview_table_text">
                        {data?.units?.length}
                      </div>
                    </div>{" "}
                    <div className="single_tab">
                      <div className="overview_table_head">Project Name</div>
                      <div className="overview_table_text">{data?.name}</div>
                    </div>
                    <div className="single_tab">
                      <div className="overview_table_head">Contact Number</div>
                      <div className="overview_table_text">
                        {data?.landlineNumber || data?.mobileNumbers?.[0]}
                      </div>
                    </div>
                    <div className="single_tab">
                      <div className="overview_table_head">Added</div>
                      <div className="overview_table_text">
                        {getDateWithMonthName(data?.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider" />
                {data?.units?.length > 0 && (
                  <>
                    <div className="staff_container">
                      <h3>Units</h3>
                      <div className="staff_table">
                        <table className="staff_main_table">
                          <tr>
                            <th>Type</th>
                            <th>Subtype</th>
                            <th>Price</th>
                            <th>Area</th>
                            <th>Bed</th>
                            <th>Bath</th>
                            <th>Floor</th>
                            {/* <div className="delete_container}>Action</div> */}
                          </tr>
                          {data?.units?.map((unit, i) => (
                            <tr key={`unit-details-${i}`}>
                              <td>{unit?.type || "N/A"}</td>
                              <td>{unit?.subtype || "N/A"}</td>
                              <td>{unit?.price || "N/A"}</td>
                              <td>{unit?.area || "N/A"}</td>
                              <td>{unit?.bed || "N/A"}</td>
                              <td>{unit?.bath || "N/A"}</td>
                              <td>{unit?.floor || "N/A"}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                    <div className="divider" />
                  </>
                )}
                {/* <div className="units_table">
                  <div className="unit_head">
                    <span>residential</span>
                    <span>subtype</span>
                    <span>area</span>
                    <span>price</span>
                    <span>bath</span>
                    <span>bed</span>
                    <span>floor</span>
                  </div>
                </div> */}
              </div>

              {width > 768 &&
              (mainFeatures?.length > 0 ||
                communicationFeatures?.length > 0 ||
                plotFeatures?.length > 0 ||
                communityFeatures?.length > 0 ||
                nearbyFeatures?.length > 0 ||
                healthFeatures?.length > 0 ||
                otherFeatures?.length > 0) ? (
                <div className="section">
                  <h2
                    className="section_heading"
                    id="features"
                    style={{ scrollMarginTop: "100px" }}
                  >
                    Project Features
                  </h2>
                  {mainFeatures?.length > 0 && featuresSize?.mainFeatures && (
                    <div className="features_container main-features">
                      <h2>Main Features</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {mainFeatures
                          .slice(0, featuresSize.mainFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name} : {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.mainFeatures < mainFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("mainFeatures")}
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {plotFeatures?.length > 0 && (
                    <div className="features_container communication-features">
                      <h2>Plot</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {plotFeatures
                          .slice(0, featuresSize.plotFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name}: {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.plotFeatures < plotFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("plotFeatures")}
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}
                  {communicationFeatures?.length > 0 && (
                    <div className="features_container communication-features">
                      <h2>Business</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {communicationFeatures
                          .slice(0, featuresSize.communicationFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name}: {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.communicationFeatures <
                        communicationFeatures?.length && (
                        <button
                          onClick={() =>
                            handlefeatureView("communicationFeatures")
                          }
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {communityFeatures?.length > 0 && (
                    <div className="features_container community-features">
                      <h2>Community</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {communityFeatures
                          .slice(0, featuresSize.communityFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name}: {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.communityFeatures <
                        communityFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("communityFeatures")}
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {nearbyFeatures?.length > 0 && (
                    <div className="features_container nearby-features">
                      <h2>Nearby</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {nearbyFeatures
                          .slice(0, featuresSize.nearbyFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name}: {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.nearbyFeatures < nearbyFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("nearbyFeatures")}
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}

                  {otherFeatures?.length > 0 && (
                    <div className="features_container other-features">
                      <h2>Other</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {otherFeatures
                          .slice(0, featuresSize.otherFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name}: {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.otherFeatures < otherFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("otherFeatures")}
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}
                  {healthFeatures?.length > 0 && (
                    <div className="features_container communication-features">
                      <h2>Plot</h2>
                      <div className="vertical_divider" />
                      <div className="features">
                        {healthFeatures
                          .slice(0, featuresSize.healthFeatures)
                          .map((f) => (
                            <div key={f?.slug} className="feature_row">
                              {f?.icon ? (
                                <img src={f?.icon} alt={f?.name} />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                              <p>
                                {f?.name}: {f?.value}
                              </p>
                            </div>
                          ))}
                      </div>
                      {featuresSize.healthFeatures < healthFeatures?.length && (
                        <button
                          onClick={() => handlefeatureView("healthFeatures")}
                          className="viewmore"
                        >
                          View More
                          {svg_detail_viewmore}
                        </button>
                      )}
                    </div>
                  )}
                  <div className="divider" />
                </div>
              ) : (
                ""
              )}

              <div className="section" id="payment_plan">
                {data?.paymentPlans.length > 0 && (
                  <>
                    <h3>Payment Plans</h3>

                    <div className="docs_container">
                      {data?.paymentPlans.map((e) => {
                        const isPdf =
                          typeof e === "string" && e.endsWith(".pdf");
                        return (
                          <a href={e} target_blank>
                            <img src={isPdf ? doc1.src : doc2.src} />
                          </a>
                        );
                      })}
                    </div>
                    <div className="divider" />
                  </>
                )}
                {data?.documents.length > 0 && (
                  <>
                    <h3 style={{ marginTop: "30px" }}>Documents</h3>

                    <div className="docs_container">
                      {data?.documents.map((e) => {
                        const isPdf =
                          typeof e === "string" && e.endsWith(".pdf");
                        return (
                          <a href={e} target_blank>
                            <img src={isPdf ? doc1.src : doc2.src} />
                          </a>
                        );
                      })}
                    </div>
                    <div className="divider" />
                  </>
                )}
                {data?.floorPlans.length > 0 && (
                  <>
                    <h3 style={{ marginTop: "30px" }}>Floor Plans</h3>

                    <div className="docs_container">
                      {data?.floorPlans.map((e) => {
                        const isPdf =
                          typeof e === "string" && e.endsWith(".pdf");
                        return (
                          <a href={e} target_blank>
                            <img src={isPdf ? doc1.src : doc2.src} />
                          </a>
                        );
                      })}
                    </div>
                    <div className="divider" />
                  </>
                )}
                <div
                  className="map_container"
                  style={{ width: "100%" }}
                  id="location"
                >
                  <h3>Project Location</h3>
                  <PropertyDetailMap markerPosition={{ lat, lng }} />
                </div>
                <div className="divider" />
              </div>

              <div className="builder_content_container">
                <div className="builder_container">
                  <h3>Builder & Developer </h3>
                  <div className="top_builders">
                    <Loader loading={loadingBuilders} minHeight={200}>
                      {builders?.data?.length > 0 ? (
                        <CardSlider
                          totalLength={builders?.meta?.totalItems}
                          handleMoreCard={() => null}
                          // handleMoreCard={handleMoreSaleCard}
                          disableInfinite
                          responsive={responsive}
                        >
                          {builders?.data?.map((e) => {
                            return <Top_builders data={e} />;
                          })}
                        </CardSlider>
                      ) : builders?.data?.length === 0 && !loadingBuilders ? (
                        <div className="dataNotFound">
                          <div className="notFoundImg" />
                          Oops! Not found
                        </div>
                      ) : (
                        ""
                      )}
                    </Loader>
                  </div>
                </div>
              </div>
              {width > 1023 && (
                <div className="right_panel_project_price">
                  <div className="right_panel_price">
                    <p>Project Price</p>
                    <h5>PKR {convertNumberToWords(data?.price) || "N/A"}</h5>
                  </div>
                  <div className="right_panel_status">
                    <p>Project Status</p>
                    <h5>{data?.status}</h5>
                  </div>
                </div>
              )}
            </div>
            <div ref={stickyDivRef} className="right_panel right_none">
              <div className="top_btn_container">
                <a href={`tel: ${data?.mobileNumbers[0]}`}>
                  {svg_builder_call}Call
                </a>
                <a
                  href={`mailto: ${data?.email}`}
                  onClick={handleEmailClickEvent}
                >
                  {svg_builder_message}Email
                </a>
                <a
                  href={createDashboardUrlByUserRole(user?.type, {
                    id: "zilaay-chats",
                    user_id: data?.user?._id,
                    project_ref_id: data?._id,
                  })}
                  onClick={handleChatClickEvent}
                >
                  {svg_builder_zilaay_chat}4Devari Chat
                </a>

                {data?.whatsapp && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=${data?.whatsapp}`}
                    onClick={handleWhatsAppEvent}
                  >
                    {svg_builder_whatsapp}Whatsapp
                  </a>
                )}
              </div>
              <a
                className="inquire"
                href={`tel: ${data?.landlineNumber || data?.mobileNumbers[0]}`}
              >
                {svg_builder_call}Inquire/Request a Call Back
              </a>
              <a className="report" href={`mailto: ${data?.email}`}>
                {svg_builder_report}Report Listing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailContent;
