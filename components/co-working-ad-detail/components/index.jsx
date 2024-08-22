import React, { useState, useEffect } from "react";
import PropertyImages from "./property-images";
import info_img from "/public/assets/project_detail_assets/img1.png";
import Image from "next/image";
import { useWindowSize } from "../../../utils";
import { PRICE_LIST } from "../../../data";
import {
  svg_builder_call,
  svg_builder_message,
  svg_builder_report,
  svg_builder_viewmore,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
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
                <p style={{ color: "black" }}>Price List</p>
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
            <p>Agent Finder</p>
            {">"}
            <p>Karachi</p>
            {">"}
            <p className="p_active">XYZ Agency</p>
          </div>
          <div className="details_container">
            <div className="left_panel">
              <div className="section ">
                <div className="initial_info_container" id="overview">
                  <Image src={info_img} width={88} height={88} />
                  <div className="info_text">
                    <h3>Co-Working Space</h3>
                    <p>3619 Kings Gate Dr, Memphis, TN 38116</p>
                    <p>Zamil Real Estate</p>
                  </div>
                </div>
              </div>

              <div className="section" id="payment_plan">
                <div
                  className="map_container"
                  style={{ width: "100%" }}
                  id="location"
                >
                  <iframe
                    width="100%"
                    height="350"
                    frameBorder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </div>
              </div>
              <h3 style={{ marginTop: "30px" }} id="features">
                Amenitise
              </h3>
              <div className="amenitise_container">
                <div className="amenitise_single_table">
                  <div className="tab">
                    <h5>Total Capacity</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>High Speed Internet</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>AC</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Backup Generator</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Office Hours Timing</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Parking Space</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Elevator</h5>
                    <span>Yes/No</span>
                  </div>
                </div>
                <div className="amenitise_single_table">
                  <div className="tab">
                    <h5>Furnished</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Inhouse Printing</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Inhouse Scanning</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Inhouse Copying</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Inhouse Projector</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Lockers</h5>
                    <span>Yes/No</span>
                  </div>
                  <div className="tab">
                    <h5>Prayer Area</h5>
                    <span>Yes/No</span>
                  </div>
                </div>
              </div>
              <div className="divider" />
              <h3 id="price_list">Pricing Options</h3>
              {width > 700 ? (
                <div className="pricing_container">
                  <div className="price_list">
                    <div className="heading">
                      <h4>Private Offices</h4>
                      <p>34 Offices Available</p>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        1,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        7,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        2,5000.
                        <span>00</span>
                      </h1>
                    </div>
                  </div>
                  <div className="price_list">
                    <div className="heading">
                      <h4>Conference Room</h4>
                      <p>34 Conference Room Available</p>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        1,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        7,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        2,5000.
                        <span>00</span>
                      </h1>
                    </div>
                  </div>
                  <div className="price_list">
                    <div className="heading">
                      <h4>Meeting Room</h4>
                      <p>34 Meeting Room Available</p>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        1,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        7,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        2,5000.
                        <span>00</span>
                      </h1>
                    </div>
                  </div>
                  <div className="price_list">
                    <div className="heading">
                      <h4>Shared Desk</h4>
                      <p>34 Shared Desk Available</p>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        1,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        7,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        2,5000.
                        <span>00</span>
                      </h1>
                    </div>
                  </div>
                  <div className="price_list">
                    <div className="heading">
                      <h4>Dedicated Desk</h4>
                      <p>34 Dedicated Desk Available</p>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        1,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        7,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        2,5000.
                        <span>00</span>
                      </h1>
                    </div>
                  </div>
                  <div className="price_list">
                    <div className="heading">
                      <h4>Executive Desk</h4>
                      <p>34 Executive Desk Available</p>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        1,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        7,500.
                        <span>00</span>
                      </h1>
                    </div>
                    <div className="price_column">
                      <p>Hourly Price</p>
                      <h1>
                        <span>PKR</span>
                        2,5000.
                        <span>00</span>
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pricing_container" id="overview">
                  <Collapse
                    className="price_list"
                    expandIcon={(val) => dropIcon(val)}
                    expandIconPosition="end"
                  >
                    <Collapse.Panel
                      header={
                        <div className="heading">
                          <h4>Private Offices</h4>
                          <p>34 Offices Available</p>
                        </div>
                      }
                    >
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          1,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          7,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          2,5000.
                          <span>00</span>
                        </h1>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                  <Collapse
                    className="price_list"
                    expandIcon={(val) => dropIcon(val)}
                    expandIconPosition="end"
                  >
                    <Collapse.Panel
                      header={
                        <div className="heading">
                          <h4>Conference Room</h4>
                          <p>34 Conference Room Available</p>
                        </div>
                      }
                    >
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          1,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          7,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          2,5000.
                          <span>00</span>
                        </h1>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                  <Collapse
                    className="price_list"
                    expandIcon={(val) => dropIcon(val)}
                    expandIconPosition="end"
                  >
                    <Collapse.Panel
                      header={
                        <div className="heading">
                          <h4>Meeting Room</h4>
                          <p>34 Meeting Room Available</p>
                        </div>
                      }
                    >
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          1,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          7,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          2,5000.
                          <span>00</span>
                        </h1>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                  <Collapse
                    className="price_list"
                    expandIcon={(val) => dropIcon(val)}
                    expandIconPosition="end"
                  >
                    <Collapse.Panel
                      header={
                        <div className="heading">
                          <h4>Shared Desk</h4>
                          <p>34 Shared Desk Available</p>
                        </div>
                      }
                    >
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          1,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          7,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          2,5000.
                          <span>00</span>
                        </h1>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                  <Collapse
                    className="price_list"
                    expandIcon={(val) => dropIcon(val)}
                    expandIconPosition="end"
                  >
                    <Collapse.Panel
                      header={
                        <div className="heading">
                          <h4>Dedicated Desk</h4>
                          <p>34 Dedicated Desk Available</p>
                        </div>
                      }
                    >
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          1,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          7,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          2,5000.
                          <span>00</span>
                        </h1>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                  <Collapse
                    className="price_list"
                    expandIcon={(val) => dropIcon(val)}
                    expandIconPosition="end"
                  >
                    <Collapse.Panel
                      header={
                        <div className="heading">
                          <h4>Executive Desk</h4>
                          <p>34 Executive Desk Available</p>
                        </div>
                      }
                    >
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          1,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          7,500.
                          <span>00</span>
                        </h1>
                      </div>
                      <div className="price_column">
                        <p>Hourly Price</p>
                        <h1>
                          <span>PKR</span>
                          2,5000.
                          <span>00</span>
                        </h1>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                </div>
              )}
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
              {width > 1023 && (
                <div className="right_panel_project_price">
                  <div className="right_panel_price">
                    <p>Project Price</p>
                    <h5>PKR 43.5 Lac to 4 Cr</h5>
                  </div>
                  {/* <div className="right_panel_status">
                    <p>Project Status</p>
                    <h5>Under Construction</h5>
                  </div> */}
                </div>
              )}
            </div>
            <div
              ref={stickyDivRef}
              className="right_panel"
              style={{ marginTop: "160px" }}
            >
              <div className="right_panel_project_price right_none">
                <div className="right_panel_price">
                  <p>Project Price</p>
                  <h5>PKR 43.5 Lac to 4 Cr</h5>
                </div>
                {/* <div className="right_panel_status">
                    <p>Project Status</p>
                    <h5>Under Construction</h5>
                  </div> */}
              </div>
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
