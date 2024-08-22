import React, { useState, useEffect } from "react";
import PropertyImages from "./property-images";
import info_img from "/public/assets/project_detail_assets/img1.png";
import Image from "next/image";
import room_offered_img1 from "/public/assets/co-living-ad//img1.png";
import room_offered_img2 from "/public/assets/co-living-ad//img2.png";
import { useWindowSize } from "../../../utils";
import { PRICE_LIST } from "../../../data";
import {
  svg_builder_call,
  svg_builder_message,
  svg_builder_report,
  svg_builder_viewmore,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
  svg_co_living_tick,
} from "../../../public/Svgs";
import Next from "../../../components/reactSlickButtons/next";
import Prev from "../../../components/reactSlickButtons/prev";
import Link from "next/link";
import { Collapse } from "antd";
function ProjectDetailContent({ stickyDivRef, isPropertyContactModal }) {
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const width = useWindowSize().width;
  const [currentId, setCurrentId] = useState(1);

  const handleButtonClick = (id) => {
    if (PRICE_LIST.some((item) => item.id === id)) {
      setCurrentId(id);
    }
  };
  const [isReadmore, setIsReadmore] = useState(true);
  const [activeButton, setActiveButton] = useState(1);

  const handleLinkClick = (buttonId) => {
    setActiveButton(buttonId);
    // You can perform other actions here based on the link click
  };
  const dropIcon = (val) => {
    if (val?.isActive) {
      return (
        <div
          style={{
            background: "#004439",
            width: "20px",
            height: "19px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="5"
            viewBox="0 0 11 7"
            fill="white"
          >
            <path
              d="M4.35859 0.999707L0.458587 4.89971C-0.0164127 5.37471 -0.122413 5.91821 0.140587 6.53021C0.402587 7.14321 0.871088 7.44971 1.54609 7.44971L9.27109 7.44971C9.94609 7.44971 10.4146 7.14321 10.6766 6.53021C10.9396 5.91821 10.8336 5.37471 10.3586 4.89971L6.45859 0.999707C6.30859 0.849707 6.14609 0.737207 5.97109 0.662208C5.79609 0.587208 5.60859 0.549706 5.40859 0.549706C5.20859 0.549706 5.02109 0.587208 4.84609 0.662208C4.67109 0.737207 4.50859 0.849707 4.35859 0.999707Z"
              fill="white"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div
          style={{
            background: "#004439",
            width: "20px",
            height: "19px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="5"
            viewBox="0 0 11 7"
            fill="none"
          >
            <path
              d="M4.35859 6.45L0.458587 2.55C-0.0164127 2.075 -0.122413 1.5315 0.140587 0.9195C0.402587 0.3065 0.871088 0 1.54609 0L9.27109 0C9.94609 0 10.4146 0.3065 10.6766 0.9195C10.9396 1.5315 10.8336 2.075 10.3586 2.55L6.45859 6.45C6.30859 6.6 6.14609 6.7125 5.97109 6.7875C5.79609 6.8625 5.60859 6.9 5.40859 6.9C5.20859 6.9 5.02109 6.8625 4.84609 6.7875C4.67109 6.7125 4.50859 6.6 4.35859 6.45Z"
              fill="white"
            />
          </svg>
        </div>
      );
    }
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
    { id: 2, path: "#price_list" },
    { id: 3, path: "#features" },
    // Add more buttons with their respective paths
  ];
  const currentData = PRICE_LIST.find((item) => item.id === currentId);
  const e = currentData;
  const [cate, setCate] = useState("girls");
  const [activeSpan, setActiveSpan] = useState(1);
  return (
    <div className="co_working_detail_container">
      <div className="container">
        <PropertyImages setIsTopPanelSticky={setIsTopPanelSticky} />
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
                <p style={{ color: "black" }}>Property Description</p>
              </Link>

              <Link
                href={buttons[2].path}
                onClick={() => handleLinkClick(buttons[2].id)}
                scroll
                className={activeButton === 3 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Features</p>
              </Link>
            </div>

            <div className="btns_container_right">
              <p className="stat">
                24 <span>Photos</span>
              </p>
              <p className="stat">
                2 <span>Virtual Tours</span>
              </p>{" "}
              <p className="stat">
                4 <span>Videos</span>
              </p>
            </div>
          </div>
          <div className="back_link containers">
            <p>4Devari</p>
            {">"}
            <p>Shared Living</p>
            {">"}
            <p className="p_active">Karachi</p>
          </div>
          <div className="details_container">
            <div className="left_panel">
              <div className="section info_content">
                <div className="initial_info_container" id="overview">
                  <Image src={info_img} width={88} height={88} />
                  <div className="info_text">
                    <h3>Property Title Here</h3>
                    <p>Double Sharing or Private Room</p>
                    <p>Property Address</p>
                  </div>
                </div>
                <div className="category">
                  <span>For</span>
                  <div className="cate_btns">
                    <button onClick={() => setCate("boys")}>Boys</button>
                    <button onClick={() => setCate("girls")}>Girls</button>
                  </div>
                </div>
              </div>

              <div
                className="property_detail_container"
                id="features"
                style={
                  cate === "boys"
                    ? { background: "#91cbe428" }
                    : { background: "#fef5ff" }
                }
              >
                <div className="tab">
                  <span>Rent</span>
                  <h5>PKR {cate === "boys" ? "15,000" : "200,000"}</h5>
                </div>
                <div className="tab">
                  <span>Address</span>
                  <h5>Property Address</h5>
                </div>
                <div className="tab">
                  <span>Gender</span>
                  <h5>{cate === "boys" ? "Boys" : "Girls"}</h5>
                </div>
                <div className="tab">
                  <span>Property Type</span>
                  <h5>House</h5>
                </div>
                <div className="tab">
                  <span>Area(sqft)</span>
                  <h5>1100</h5>
                </div>
                <div className="tab">
                  <span>Furnishing</span>
                  <h5>Yes</h5>
                </div>
                <div className="tab">
                  <span>Room Type(s)</span>
                  <h5>Shared/Private</h5>
                </div>
                <div className="tab">
                  <span>Occupancy Status</span>
                  <h5>Available</h5>
                </div>
                <div className="tab">
                  <span>Food Availability</span>
                  <h5>Yes</h5>
                </div>
              </div>

              <div className="divider" />
              <h3>Room Offered</h3>
              <div className="room_offered_container">
                <div className="room_offered_card">
                  <div
                    className="img_container"
                    style={{
                      background: `url(${room_offered_img1.src})`,
                    }}
                  />
                  <div className="card_text_content">
                    <h5>Double Sharing</h5>
                    <h2>
                      PKR <span>15,000</span>/Bed
                    </h2>
                    <div className="card_facilities">
                      <p>{svg_co_living_tick} Shared Cupboard</p>
                      <p>{svg_co_living_tick} Shared TV</p>
                      <p>{svg_co_living_tick} Attached bathroom</p>
                      <p>{svg_co_living_tick} Attached balcony</p>
                    </div>
                  </div>
                </div>
                <div className="room_offered_card">
                  <div
                    className="img_container"
                    style={{
                      background: `url(${room_offered_img2.src})`,
                    }}
                  />
                  <div className="card_text_content">
                    <h5>Private Room</h5>
                    <h2>
                      PKR <span>25,000</span>/Room
                    </h2>
                    <div className="card_facilities">
                      <p>{svg_co_living_tick} Independent Cupboard</p>
                      <p>{svg_co_living_tick} TV</p>
                      <p>{svg_co_living_tick} Table Chair</p>
                      <p>{svg_co_living_tick} Attached bath</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider" />
              <h3>Description</h3>
              <div className="description_container">
                <p className={isReadmore ? "para" : "para_open"}>
                  We are a projected organization offering a full range of
                  construction services and investment management while
                  maintaining a solid foundation of trust and mutual respect
                  generated through a positive relationship with clients,
                  architects, engineers, subcontractors, and suppliers. A
                  company-wide policy encouraging shared performance
                  responsibility ensures the highest degree of professional
                  service and results on all projects.GFS has been in the
                  building & construction/land development field for 15 years.
                  We have built a wide range of projects from residential to
                  commercial in various classifications/sizes and have managed
                  client investment in diversified areas...
                </p>
                <button
                  className="read_more"
                  id="scroll-to-all-agents"
                  onClick={() => setIsReadmore(!isReadmore)}
                >
                  View More
                  {svg_builder_viewmore}
                </button>
              </div>
              <div className="divider" />
              <h3>NearBy Property</h3>
              <div className="Nearby_container">
                <div className="tab">
                  <h5>Nearby Schools</h5>
                  <span>Yes</span>
                </div>
                <div className="tab">
                  <h5>Nearby Hospitals</h5>
                  <span>Yes</span>
                </div>
                <div className="tab">
                  <h5>Nearby Shopping Malls</h5>
                  <span>No</span>
                </div>
                <div className="tab">
                  <h5>Nearby Restaurants</h5>
                  <span>Yes</span>
                </div>
                <div className="tab">
                  <h5>Distance From Airport (Kms)</h5>
                  <span>200 Kms</span>
                </div>
                <div className="tab">
                  <h5>Nearby Public Transport</h5>
                  <span>No</span>
                </div>
                <div className="tab">
                  <h5>Other Nearby Places</h5>
                  <span>Parks, Sweets & Bakers</span>
                </div>
              </div>
              <div className="divider" />
              <h3>Other Facilities</h3>
              <div className="Nearby_container">
                <div className="tab">
                  <h5>Maintenance Staff</h5>
                  <span>Yes</span>
                </div>
                <div className="tab">
                  <h5>Security Staff</h5>
                  <span>Yes</span>
                </div>
                <div className="tab">
                  <h5>Facilities for Disabled</h5>
                  <span>No</span>
                </div>
                <div className="tab">
                  <h5>CCTV Security</h5>
                  <span>Yes</span>
                </div>
                <div className="tab">
                  <h5>Other Facilities</h5>
                  <span className="Input_tab">Yes/No</span>
                </div>
              </div>
              <div className="divider" />
              <h3 style={{ marginTop: "30px" }} id="features">
                Property Features
              </h3>
              <div className="amenitise_btns">
                <span
                  className={activeSpan === 1 ? "active_span" : ""}
                  onClick={() => setActiveSpan(1)}
                >
                  Main Features
                </span>
                <span
                  className={activeSpan === 2 ? "active_span" : ""}
                  onClick={() => setActiveSpan(2)}
                >
                  Business and Communication
                </span>
                <span
                  className={activeSpan === 3 ? "active_span" : ""}
                  onClick={() => setActiveSpan(3)}
                >
                  Common Rooms
                </span>
                <span
                  className={activeSpan === 4 ? "active_span" : ""}
                  onClick={() => setActiveSpan(4)}
                >
                  House Rules
                </span>
                <span
                  className={activeSpan === 5 ? "active_span" : ""}
                  onClick={() => setActiveSpan(5)}
                >
                  Healthcare and Recreational
                </span>
              </div>
              <div className="amenitise_container">
                <div className="amenitise_single_table">
                  <div className="tab">
                    <h5>Bed</h5>
                  </div>
                  <div className="tab">
                    <h5>AC</h5>
                  </div>
                  <div className="tab">
                    <h5>Heater</h5>
                  </div>
                  <div className="tab">
                    <h5>Parking Spaces</h5>
                  </div>
                  <div className="tab">
                    <h5>Attached Bathroom</h5>
                  </div>
                  <div className="tab">
                    <h5>Attached Balcony</h5>
                  </div>
                  <div className="tab">
                    <h5>Flooring (Options)</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Electricity Backup (Options)</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Waste Disposal</h5>
                  </div>
                  <div className="tab">
                    <h5>Floors</h5>
                  </div>
                  <div className="tab">
                    <h5>Other Main Features</h5>
                    <span>Yes/No</span>
                  </div>
                </div>
                <div className="amenitise_single_table">
                  <div className="tab">
                    <h5>Wifi</h5>
                  </div>
                  <div className="tab">
                    <h5>Satelite or Cable TV Ready</h5>
                  </div>
                  <div className="tab">
                    <h5>Washing Machine</h5>
                  </div>
                  <div className="tab">
                    <h5>Fridge</h5>
                  </div>
                  <div className="tab">
                    <h5>Cupboard (shared/Private)</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Microwave</h5>
                  </div>
                  <div className="tab">
                    <h5>Table & Chair</h5>
                  </div>
                  <div className="tab">
                    <h5>Daily Cleaning</h5>
                  </div>
                  <div className="tab">
                    <h5>Gated Community</h5>
                  </div>
                  <div className="tab">
                    <h5>Utilities</h5>
                  </div>
                  {width > 767 && (
                    <div className="tab">
                      <h5></h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div ref={stickyDivRef} className="right_panel">
              <div className="top_btn_container ">
                <button>{svg_builder_call}Call</button>
                <button>{svg_builder_message}Message</button>
                <button>{svg_builder_zilaay_chat}4Devari Chat</button>
                <button>{svg_builder_whatsapp}Whatsapp</button>
              </div>
              <button className="inquire">
                {svg_builder_call}Inquire/Request a Call Back
              </button>
              <button className="report">
                {svg_builder_report}Report Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailContent;
