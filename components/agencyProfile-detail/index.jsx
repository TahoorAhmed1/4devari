import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Handle_sperate, objectToQueryString, useWindowSize } from "../../utils";
import {
  svg_builder_call,
  svg_builder_message,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
} from "/public/Svgs";
import account from "/public/assets/agency-detail/staff.jpeg";
import {
  svg_builder_call_sm,
  svg_builder_viewmore,
  svg_builder_whatsapp_sm,
} from "../../public/Svgs";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useFormik } from "formik";
import { message } from "antd";
import { CardSlider } from "../common";
import Loader from "../common/loader";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../redux/analytic";
import { useGoogleApi } from "../../context/googleContext";
import { fetchPoints } from "../../redux/property";
import ReachMap from "../common/maps/report-map";
import { useRouter } from "next/router";
// import { PropertyDetailMap } from "../common/maps";

const agency_contactInitialValues = {
  username: "",
  email: "",
  phone: "",
  message: "",
};
function AgencyDetailContent({
  stickyDivRef,
  userInfo,
  userData,
  loadingUser,
  allStaff,
  loadingAllStaff,
  userPropertiesLoader,
  propertiesForSale,
  propertiesForRent,
  propertiesForShare,
  handleMoreSaleCard,
  handleMoreRentCard,
  handleMoreShareLivingCard,
}) {
  const dispatch = useDispatch();
  const {isApiLoaded} = useGoogleApi()
  const { loadingPoints, points } = useSelector((state) => state.property);
  const [map, setMap] = useState(null);
  const router = useRouter()
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const { ref: topPanelRef, inView: topPanelInView } = useInView({
    threshold: 0,
  });
  const [activeButton, setActiveButton] = useState(1);

  // Function to handle button click
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
console.log("START====================")
  console.log(map?.getBounds()?.getNorthEast().lat())
  console.log(map?.getBounds()?.getSouthWest().lat())
  console.log(map?.getBounds()?.getNorthEast().lng())
  console.log(map?.getBounds()?.getSouthWest().lng())
console.log("END====================")



  useEffect(() => {
    const debounce = setTimeout(() => {
      if(router?.query?.id){
        dispatch(fetchPoints(`${objectToQueryString({userId: router?.query?.id})}`));
      }
    }, 200);
    return () => clearTimeout(debounce);
  }, [router?.query?.id]);

  useEffect(() => {
    setIsTopPanelSticky(!topPanelInView);
    console.log(topPanelInView);
  }, [topPanelInView]);

  const [isReadmore, setIsReadmore] = useState(true);
  const [isReadmore2, setIsReadmore2] = useState(true);
  const width = useWindowSize().width;
  const displayedContent =
    !isReadmore || userData?.description?.length <= 300
      ? userData?.description
      : `${userData?.description?.slice(0, 300)}...`;

  const responsive2 = [
    {
      breakpoint: 1388,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 742,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 565,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
  ];

  const agency_contact_formik = useFormik({
    initialValues: agency_contactInitialValues,
    // validationSchema: agencycontactSchema,
    onSubmit: ({ resetForm }) => {
      console.log(agency_contact_formik.values);
      message.success("Successfully sent");
      resetForm();
    },
  });
  const year = new Date().getFullYear();

  // Analytics
  const handleWhatsAppEvent = () => {
    dispatch(
      addEvent({
        userId: userInfo?._id,
        payload: {
          category: "click",
          name: "whatsapp-click",
        },
      })
    );
  };
  const handleChatClickEvent = () => {
    dispatch(
      addEvent({
        userId: userInfo?._id,
        payload: {
          category: "click",
          name: "chat-click",
        },
      })
    );
  };
  const handleEmailClickEvent = () => {
    dispatch(
      addEvent({
        userId: userInfo?._id,
        payload: {
          category: "click",
          name: "email-click",
        },
      })
    );
  };

  return (
    <div className="agency_profile_detail_container">
      <Loader loading={loadingPoints || loadingUser || loadingAllStaff} global />
      <div className="builder_banner">
        <div className="banner_content containers">
          <div className="banner_text">
            <Image
              src={userData?.agencyLogo}
              alt="No Image"
              width={100}
              height={100}
            />
            <div>
              <h1>{userData?.agencyName}</h1>
              <p>
                {" "}
                {userInfo?.city}, {userInfo?.country}
              </p>
              <p>Agency on 4Devari Since : {year || "2020"}</p>
            </div>
          </div>
          <div className="builder_boxes">
            <div className="box">
              <h2>{propertiesForSale?.meta?.totalItems || 0}</h2>
              <p>For Sale</p>
            </div>
            <div className="box">
              <h2>{propertiesForRent?.meta?.totalItems || 0}</h2>
              <p>For Rent</p>
            </div>
            <div className="box">
              <h2>{propertiesForShare?.meta?.totalItems || 0}</h2>
              <p>For PG</p>
            </div>
            <div className="box">
              <h2>
                {propertiesForSale?.meta?.totalItems +
                  propertiesForRent?.meta?.totalItems +
                  propertiesForShare?.meta?.totalItems || 0}
              </h2>
              <p>Projects</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="content_container">
          <div className="back_link containers" id="scroll-to-agency-detail">
            {/* <p>4Devari</p>
            {">"}
            <p>Agent Finder</p>
            {">"}
            <p>Karachi</p>
            {">"}
            <p className="p_active">Sky Limit Marketing</p> */}
          </div>

          <div ref={topPanelRef} />

          {width > 768 && (
            <div
              style={{
                position: isTopPanelSticky && "fixed",
                top: isTopPanelSticky && "-1px",
                width: isTopPanelSticky && "calc(100vw - 26px)",
                borderRadius: isTopPanelSticky && "0",
                marginTop: isTopPanelSticky && "0",
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
                  href="#scroll-to-agency-detail"
                  onClick={() => handleButtonClick(1)}
                  className={activeButton === 1 ? "blue_tag" : "white_tag "}
                >
                  <p>Agency Details</p>
                </Link>

                <Link
                  href="#scroll-to-all-agents"
                  scroll
                  onClick={() => handleButtonClick(2)}
                  className={activeButton === 2 ? "blue_tag" : "white_tag "}
                >
                  <p style={{ color: "black" }}>All Agents</p>
                </Link>

                <Link
                  href="#scroll-to-listing"
                  scroll
                  onClick={() => handleButtonClick(3)}
                  className={activeButton === 3 ? "blue_tag" : "white_tag "}
                >
                  <p style={{ color: "black" }}>Our Listings</p>
                </Link>

                <Link
                  href="#scroll-to-properties-for-sale"
                  onClick={() => handleButtonClick(4)}
                  className={activeButton === 4 ? "blue_tag" : "white_tag "}
                >
                  <p style={{ color: "black" }}>Properties For Sale</p>
                </Link>
              </div>
            </div>
          )}
          <div className="details_container">
            <div className="left_panel">
              <div className="section ">
                <div className="initial_info_container">
                  <div className="info_img">
                    <Image
                      src={userInfo?.picture}
                      alt="No Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="info_text">
                    <h3>{userInfo?.username}</h3>
                    <p>
                      {userInfo?.city}, {userInfo?.country}
                    </p>
                    <div className="btns">
                      <a href={`tel: ${userInfo?.landlineNumber}`}>
                        {svg_builder_call}
                        Call
                      </a>
                      <a
                        href={`mailto: ${userInfo?.email}`}
                        onClick={handleEmailClickEvent}
                      >
                        {svg_builder_message}
                        Message
                      </a>
                      <Link
                        href={"/dashboard/user/zilaay-chats"}
                        onClick={handleChatClickEvent}
                      >
                        {svg_builder_zilaay_chat}
                        4Devari Chat
                      </Link>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${userInfo?.whatsapp}`}
                        target="_blank"
                        onClick={handleWhatsAppEvent}
                      >
                        {svg_builder_whatsapp}
                        Whatsapp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="section section_detail_description mt10">
                <h3>Agency Details</h3>
                <div className="table_half">
                  {/* <div className="single_tab">
                    <div className="tab_text">
                      <div className="overview_table_head">
                        Total number of Active Listings
                      </div>
                      <p>100</p>
                    </div>
                  </div> */}
                  <div className="single_tab">
                    <div className="tab_text">
                      <div className="overview_table_head">Service Area</div>
                      <p>
                        <Handle_sperate data={userData?.serviceAreas} />
                      </p>
                    </div>
                  </div>
                  <div className="single_tab">
                    <div className="tab_text">
                      <div className="overview_table_head">
                        Experience Years
                      </div>
                      <p>{userData?.experienceYears}</p>
                    </div>
                  </div>
                  <div className="single_tab">
                    <div className="tab_text">
                      <div className="overview_table_head">Property Types</div>
                      <p>{<Handle_sperate data={userData?.propertyType} />}</p>
                    </div>
                  </div>
                  <div className="single_tab">
                    <div className="tab_text">
                      <div className="overview_table_head">Agency Address</div>
                      <p>{userData?.physicalAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description_container">
                <h2 className="section_heading">Description</h2>
                <p className={"para"}>{displayedContent}</p>
                {userData?.description?.length > 300 && (
                  <button
                    className="read_more"
                    onClick={() => setIsReadmore(!isReadmore)}
                  >
                    {isReadmore ? "View More" : "View Less"}
                    {svg_builder_viewmore}
                  </button>
                )}
              </div>
              <div className="divider" />
              <div className="section" id="scroll-to-all-agents" style={{ scrollMarginTop: '50px'}}>
                <h3>All Agents</h3>
                <div
                  className={"agents_cards_container"}
                >
                  {allStaff?.data?.slice(0, isReadmore2 ? allStaff?.data?.length : 3).map((e) => {
                    return (
                      <div className="agent_card">
                        <Image
                          src={e?.user?.picture || account}
                          width={180}
                          height={180}
                          alt="picture"
                        />
                        <div className="agent_card_text">
                          <h4>{e?.user?.name}</h4>
                          <p>
                            Total Active Listings : {e?.total_active_listing}
                          </p>
                          <div className="btns">
                            <a href={`tel: ${e?.user?.landlineNumber}`}>
                              {svg_builder_call_sm}
                              Call
                            </a>
                            {allStaff?.user?.whatsapp && (
                              <a
                                href={`https://api.whatsapp.com/send?phone=${allStaff?.user?.whatsapp}`}
                                target="_blank"
                              >
                                {svg_builder_whatsapp_sm}
                                Whatsapp
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {allStaff?.data?.length > 3 && (
                  <button
                    className="read_more"
                    id="scroll-to-listing"
                    onClick={() => setIsReadmore2(!isReadmore2)}
                  >
                    {isReadmore2 ? "Less More" : "Read More"}
                    {svg_builder_viewmore}
                  </button>
                )}
              </div>
              <div className="divider" />
              <div className="section" id="scroll-to-listing" style={{ scrollMarginTop: '30px'}}>
                <div className="map_container" style={{ width: "100%" }}>
                  <div className="map_headings">
                    <h3>Our Listings</h3>
                    {/* <div className="map_btns">
                      <button>
                        <span /> Buy
                      </button>
                      <button>
                        <span /> Rent
                      </button>
                      <button>
                        <span /> PG
                      </button>
                    </div> */}
                  </div>
                  <ReachMap setMap={setMap} map={map} points={points || []} />
                  {/* <iframe
                    width="100%"
                    height="350"
                    frameBorder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe> */}
                </div>
              </div>
              <div className="divider" />
              <div
                className="bulider_property_container scroll-margin"
                id="scroll-to-properties-for-sale"
              >
                <h3>Total Properties For Sale</h3>
                {/* <div className="tabs_container">
                  {tabs?.map((tab, index) => (
                    <p
                      onClick={() => {
                        handleSelectTab(tab?.id);
                      }}
                      className={
                        selectedTabId === tab?.id
                          ? "single_tab_selected"
                          : "single_tab"
                      }
                      key={index}
                    >
                      {tab?.title}
                    </p>
                  ))}
                </div> */}
                <Loader loading={userPropertiesLoader} minHeight={200}>
                  {propertiesForSale?.data?.length > 0 ? (
                    <CardSlider
                      // show={7}
                      totalLength={propertiesForSale?.meta?.totalItems}
                      // handleMoreCard={() => null}
                      handleMoreCard={handleMoreSaleCard}
                      disableInfinite
                      responsive={responsive2}
                    >
                      {propertiesForSale?.data?.map((e) => {
                        return (
                          <Link
                            href={`/property-detail/${e?.property?._id}`}
                            className="card"
                            key={e?._id}
                          >
                            <Image
                              src={e?.property?.images[0]}
                              width={100}
                              height={100}
                              alt={e?._id}
                            />
                            {/* <img src={hot_tag.src} className="tag" /> */}
                            <div className="card_text">
                              <div className="card_title">
                                <h4>{e?.price || "0"}</h4>
                                <img
                                  src={userData?.agencyLogo}
                                  className="developer_logo"
                                />
                              </div>
                              <h5 className="text-one-line">
                                {e?.property?.title}
                              </h5>
                              <span>{e?.property?.city}</span>
                              <p className="text-two-line">
                                Property ID: &nbsp;
                                {e?.property?._id}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </CardSlider>
                  ) : propertiesForSale?.data?.length === 0 &&
                    !userPropertiesLoader ? (
                    <div className="dataNotFound">
                      <div className="notFoundImg" />
                      Oops! Not found
                    </div>
                  ) : (
                    ""
                  )}
                </Loader>
              </div>
              <div className="divider" />
              <div className="bulider_property_container">
                <h3>Total Properties For Rent</h3>
                {/* <div className="tabs_container">
                  {tabs?.map((tab, index) => (
                    <p
                      onClick={() => {
                        handleSelectTab(tab?.id);
                      }}
                      className={
                        selectedTabId === tab?.id
                          ? "single_tab_selected"
                          : "single_tab"
                      }
                      key={index}
                    >
                      {tab?.title}
                    </p>
                  ))}
                </div> */}
                <Loader loading={userPropertiesLoader} minHeight={150}>
                  {propertiesForRent?.data?.length > 0 ? (
                    <CardSlider
                      // show={7}
                      totalLength={propertiesForRent?.meta?.totalItems}
                      // handleMoreCard={() => null}
                      handleMoreCard={handleMoreRentCard}
                      disableInfinite
                      responsive={responsive2}
                    >
                      {propertiesForRent?.data?.map((e) => {
                        return (
                          <Link
                            href={`/property-detail/${e?.property?._id}`}
                            className="card"
                            key={e?._id}
                          >
                            <Image
                              src={e?.property?.images[0]}
                              width={100}
                              height={100}
                              alt={e?._id}
                            />
                            {/* <img src={hot_tag.src} className="tag" /> */}
                            <div className="card_text">
                              <div className="card_title">
                                <h4>{e?.price || "0"}</h4>
                                <img
                                  src={userData?.agencyLogo}
                                  className="developer_logo"
                                />
                              </div>
                              <h5 className="text-one-line">
                                {e?.property?.title}
                              </h5>
                              <span>{e?.property?.city}</span>
                              <p className="text-two-line">
                                Property ID: &nbsp;
                                {e?.property?._id}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </CardSlider>
                  ) : propertiesForRent?.data?.length === 0 &&
                    !userPropertiesLoader ? (
                    <div
                      className="dataNotFound"
                      style={{ marginTop: "30px", marginBottom: "-20px" }}
                    >
                      <div className="notFoundImg" />
                      Oops! Not found
                    </div>
                  ) : (
                    ""
                  )}
                </Loader>
                {/* <Slider arrows={true} {...settings2}>
                  {PROPERTISE_CARDS_DATA.map((e) => {
                    return (
                      <div className="card" key={e.id}>
                        <Image
                          src={e.img}
                          width={100}
                          height={100}
                          alt={e.id}
                        />
                        <img src={hot_tag.src} className="tag" />
                        <div className="card_text">
                          <h4>
                            {e.price}{" "}
                            <img src={logo.src} className="developer_logo" />
                          </h4>
                          <h5>{e.head}</h5>
                          <span>{e.city}</span>
                          <p>
                            Property ID: &nbsp;
                            {e.property_id}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Slider> */}
              </div>
              <div className="divider" />
              <div className="bulider_property_container">
                <h3>Total Properties For Sharing</h3>
                {/* <div className="tabs_container">
                  {tabs?.map((tab, index) => (
                    <p
                      onClick={() => {
                        handleSelectTab(tab?.id);
                      }}
                      className={
                        selectedTabId === tab?.id
                          ? "single_tab_selected"
                          : "single_tab"
                      }
                      key={index}
                    >
                      {tab?.title}
                    </p>
                  ))}
                </div> */}
                <Loader loading={userPropertiesLoader} minHeight={150}>
                  {propertiesForShare?.data?.length > 0 ? (
                    <CardSlider
                      // show={7}
                      totalLength={propertiesForShare?.meta?.totalItems}
                      // handleMoreCard={() => null}
                      handleMoreCard={handleMoreShareLivingCard}
                      disableInfinite
                      responsive={responsive2}
                    >
                      {propertiesForShare?.data?.map((e) => {
                        return (
                          <Link
                            href={`/property-detail/${e?.property?._id}`}
                            className="card"
                            key={e?._id}
                          >
                            <Image
                              src={e?.property?.images[0]}
                              width={100}
                              height={100}
                              alt={e?._id}
                            />
                            {/* <img src={hot_tag.src} className="tag" /> */}
                            <div className="card_text">
                              <div className="card_title">
                                <h4>{e?.price || "0"}</h4>
                                <img
                                  src={userData?.agencyLogo}
                                  className="developer_logo"
                                />
                              </div>
                              <h5 className="text-one-line">
                                {e?.property?.title}
                              </h5>
                              <span>{e?.property?.city}</span>
                              <p className="text-two-line">
                                Property ID: &nbsp;
                                {e?.property?._id}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </CardSlider>
                  ) : propertiesForShare?.data?.length === 0 &&
                    !userPropertiesLoader ? (
                    <div
                      className="dataNotFound"
                      style={{ marginTop: "30px", marginBottom: "-20px" }}
                    >
                      <div className="notFoundImg" />
                      Oops! Not found
                    </div>
                  ) : (
                    ""
                  )}
                </Loader>
                {/* <Slider arrows={true} {...settings2}>
                  {PROPERTISE_CARDS_DATA.map((e) => {
                    return (
                      <div className="card" key={e.id}>
                        <Image
                          src={e.img}
                          width={100}
                          height={100}
                          alt={e.id}
                        />
                        <img src={hot_tag.src} className="tag" />
                        <div className="card_text">
                          <h4>
                            {e.price}{" "}
                            <img src={logo.src} className="developer_logo" />
                          </h4>
                          <h5>{e.head}</h5>
                          <span>{e.city}</span>
                          <p>
                            Property ID: &nbsp;
                            {e.property_id}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Slider> */}
              </div>
              {/* <div className="divider" />
              <div className="bulider_projects_container">
                <h3>Hot Properties By Agencies</h3>
                <Slider arrows={true} {...settings}>
                  {BUILDER_CARDS_DATA.map((e) => {
                    return (
                      <div className="card" key={e.id}>
                        <Image
                          src={e.img}
                          width={100}
                          height={100}
                          alt={e.id}
                        />
                        <div className="total_pics">
                          <span>{svg_builder_pics}17</span>
                          <span>{svg_builder_video}3</span>
                        </div>
                        <div className="card_text">
                          <h5>{e.head}</h5>
                          <p>{e.para}</p>
                          <h4>{e.price}</h4>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <div className="divider" />
              <div className="bulider_projects_container">
                <h3>Recent Properties by Agency (new to old)</h3>
                <Slider arrows={true} {...settings}>
                  {BUILDER_CARDS_DATA.map((e) => {
                    return (
                      <div className="card" key={e.id}>
                        <Image
                          src={e.img}
                          width={100}
                          height={100}
                          alt={e.id}
                        />
                        <div className="total_pics">
                          <span>{svg_builder_pics}17</span>
                          <span>{svg_builder_video}3</span>
                        </div>
                        <div className="card_text">
                          <h5>{e.head}</h5>
                          <p>{e.para}</p>
                          <h4>{e.price}</h4>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <div
                className="divider"
                style={{ scrollMarginTop: "70px" }}
                id="scroll-to-project-marketed"
              />
              <div className="bulider_projects_container">
                <h3>Projects Marketed</h3>
                <Slider arrows={true} {...settings}>
                  {BUILDER_CARDS_DATA.map((e) => {
                    return (
                      <div className="card" key={e.id}>
                        <Image
                          src={e.img}
                          width={100}
                          height={100}
                          alt={e.id}
                        />
                        <div className="total_pics">
                          <span>{svg_builder_pics}17</span>
                          <span>{svg_builder_video}3</span>
                        </div>
                        <div className="card_text">
                          <h5>{e.head}</h5>
                          <p>{e.para}</p>
                          <h4>{e.price}</h4>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div> */}
            </div>
            <div className="right_panel">
              <div className="top_btn_container">
                <a
                  href={`tel: ${userInfo?.landlineNumber}`}
                  // style={{ width: "90%" }}
                  // className="prop_btn_secondary btn"
                  // onClick={isPropertyContactModal.onOpen}
                >
                  {svg_builder_call}
                  <p>Call</p>
                </a>
                <a
                  href={`mailto: ${userInfo?.email}`}
                  onClick={handleEmailClickEvent}
                  // style={{ width: "90%" }}
                  // className="btn"
                >
                  {svg_builder_message}
                  <p>Email</p>
                </a>
                <Link
                  href={"/dashboard/user/zilaay-chats"}
                  onClick={handleChatClickEvent}
                  // style={{ width: "90%" }}
                  // className="btn"
                >
                  {svg_builder_zilaay_chat}
                  <p>4Devari Chat</p>
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?phone=${userInfo?.whatsapp}`}
                  target="_blank"
                  onClick={handleWhatsAppEvent}
                  // style={{ width: "90%", backgroundColor: "#25D366" }}
                  // className="prop_whatsapp_btn btn"
                >
                  {svg_builder_whatsapp}
                  <p>WhatsApp</p>
                </a>
              </div>
              <a className="inquire" href={`tel: ${userInfo?.landlineNumber}`}>
                {svg_builder_call}Inquire/Request a Call Back
              </a>
              <div ref={stickyDivRef} className="p_static">
                {/* <form className="right_panel_form">
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    id="name"
                    value={agency_contact_formik.values.username}
                    onChange={agency_contact_formik.handleChange}
                  />
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    id="email"
                    value={agency_contact_formik.values.email}
                    onChange={agency_contact_formik.handleChange}
                  />
                  <input
                    type="number"
                    placeholder="phone"
                    name="phone"
                    id="phone"
                    value={agency_contact_formik.values.phone}
                    onChange={agency_contact_formik.handleChange}
                  />
                  <textarea
                    placeholder="Message"
                    name="message"
                    id="mesage"
                    value={agency_contact_formik.values.message}
                    onChange={agency_contact_formik.handleChange}
                  />
                  <button
                    onClick={agency_contact_formik.handleSubmit}
                    type="submit"
                  >
                    Send
                  </button>
                </form>
                <a className="report" href={`mailto: ${userInfo?.email}`}>
                  {svg_builder_report}Report Listing
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyDetailContent;
