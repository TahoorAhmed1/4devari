import Image from "next/image";
import React, { useEffect, useState } from "react";
import GFC from "../../public/assets/builder/GFS.png";
import {
  svg_builder_GFD_location,
  svg_builder_GFD_mail,
  svg_builder_GFD_mobile,
  svg_builder_GFD_phone,
  svg_builder_call,
  svg_builder_message,
  svg_builder_pics,
  svg_builder_report,
  svg_builder_video,
  svg_builder_viewmore,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
} from "../../public/Svgs";
import Top_builders from "../../components/cards/top_builder";
import TrendingLinks from "../../components/trending-links";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersById, fetchbuilders } from "../../redux/users";
import {
  calculateAverageDays,
  convertNumberToWords,
  objectToQueryString,
  useWindowSize,
} from "../../utils";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import Loader from "../../components/common/loader";
import { CardSlider } from "../../components/common";
import { addEvent } from "../../redux/analytic";
import {
  fetchNewLaunchProjects,
  fetchReadyProjects,
  fetchUnderConstructionProjects,
} from "../../redux/property";

const BuilderDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isReadmore, setIsReadmore] = useState(true);
  const { userData } = useSelector((state) => state.users);
  const { newLaunch, loadingNewLaunch, readyMove, loadingReadyMove, underConstructionProjects, loadingUnderConstruction } = useSelector(
    (state) => state.property
  );
  const userInfo = userData?.user;
  const width = useWindowSize().width;
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const { ref: topPanelRef, inView: topPanelInView } = useInView({
    threshold: 0,
  });
  const [activeButton, setActiveButton] = useState(1);

  const description = userData?.aboutUs || "Not available";
  // Logic to truncate or display content based on `showFullContent`
  const displayedContent =
    !isReadmore || description?.length <= 300
      ? description
      : `${description.slice(0, 300)}...`;

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const responsive2 = [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
      },
    },
    {
      breakpoint: 860,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
      },
    },
    {
      breakpoint: 565,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
      },
    },
  ];
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
  useEffect(() => {
    if (router?.query?.id) {
      dispatch(fetchUsersById(router?.query?.id));
      dispatch(
        fetchNewLaunchProjects(objectToQueryString({ status: "New Launch" }))
      );
      dispatch(
        fetchReadyProjects(objectToQueryString({ status: "Ready to move" }))
      );
      dispatch(
        fetchUnderConstructionProjects(
          objectToQueryString({ status: "Under construction" })
        )
      );
    }
  }, [router?.query?.id]);

  useEffect(() => {
    setIsTopPanelSticky(!topPanelInView);
  }, [topPanelInView]);
  const { builders, loadingBuilders } = useSelector((state) => state.users);
  const builderInfo = builders?.data;
  useEffect(() => {
    dispatch(fetchbuilders());
    if (router?.query?.id) {
      dispatch(
        addEvent({
          userId: router?.query?.id,
          payload: {
            category: "view",
            name: "profile-view",
          },
        })
      );
    }
  }, [router?.isReady]);

    // Analytics
  const handleWhatsAppEvent = () => {
    dispatch(
      addEvent({
        userId: userData?.user?._id,
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
        userId: userData?.user?._id,
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
        userId: userData?.user?._id,
        payload: {
          category: "click",
          name: "email-click",
        },
      })
    );
  };
  return (
    <div className="zilaay__builder">
      <div className="builder_banner ">
        <div className="banner_content containers">
          <div className="banner_text">
            <Image
              src={userData?.builderLogo || GFC}
              width={100}
              height={100}
              className="GFC_img"
            />
            <h1>{userData?.builderName || "Not Available"}</h1>
          </div>
          <div className="builder_boxes">
            <div className="box">
              <h2>{parseFloat(userData.experienceYears) || "0"}</h2>
              <p>Years of Experience</p>
            </div>
            <div className="box">
              <h2>{underConstructionProjects?.meta?.totalItems || "0"}</h2>
              <p>Ongoing Projects</p>
            </div>
            <div className="box">
              <h2>{calculateAverageDays(userData?.createdAt)}</h2>
              <p>Days on 4Devari</p>
            </div>
            <div className="box">
              <h2>{(userData?.totalProjects || 0)}</h2>
              <p>Projects</p>
            </div>
          </div>
        </div>
      </div>
      <div className="back_link containers"></div>
      <div ref={topPanelRef} style={{ scrollMarginTop: "20px" }} />
      {width > 768 && (
        <div
          style={{
            position: isTopPanelSticky && "fixed",
            top: isTopPanelSticky && "-1px",
            width: isTopPanelSticky && "calc(100vw - 26px)",
            borderRadius: isTopPanelSticky && "0",
            marginTop: isTopPanelSticky && "0",
            transition: isTopPanelSticky && "0.5s",
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
              href="#scroll-to-about"
              onClick={() => handleButtonClick(1)}
              className={activeButton === 1 ? "blue_tag" : "white_tag "}
            >
              <p>About Us</p>
            </Link>

            <Link
              href="#scroll-to-cities"
              scroll
              onClick={() => handleButtonClick(2)}
              className={activeButton === 2 ? "blue_tag" : "white_tag "}
            >
              <p style={{ color: "black" }}>Operating in Cities</p>
            </Link>

            <Link
              href="#scroll-to-launch"
              scroll
              onClick={() => handleButtonClick(3)}
              className={activeButton === 3 ? "blue_tag" : "white_tag "}
            >
              <p style={{ color: "black" }}>New Launch</p>
            </Link>

            <Link
              href="#scroll-to-ready-to-move"
              onClick={() => handleButtonClick(4)}
              className={activeButton === 4 ? "blue_tag" : "white_tag "}
            >
              <p style={{ color: "black" }}>Ready To Move</p>
            </Link>
            <Link
              href="#scroll-to-under-construction"
              onClick={() => handleButtonClick(5)}
              className={activeButton === 5 ? "blue_tag" : "white_tag "}
            >
              <p style={{ color: "black" }}>Under Construction</p>
            </Link>
          </div>
        </div>
      )}
      <div className="builder_content containers">
        <div
          className="content_panel"
          style={{ marginTop: width > 767 && !isTopPanelSticky && "-72px" }}
        >
          <div className="left_panel">
            <h3 id="scroll-to-about" style={{ scrollMarginTop: "100px" }}>
              About Us
            </h3>
            <h2 className="section_heading">Description</h2>
            <div className="description_container">
              <p>{displayedContent}</p>
              {description?.length > 300 && (
                <button
                  className="read_more"
                  onClick={() => setIsReadmore(!isReadmore)}
                >
                  {isReadmore ? "View More" : "View Less"}
                  {svg_builder_viewmore}
                </button>
              )}
            </div>
            <h2>{userData?.builderName} Head Office</h2>
            <div className="GFD_container">
              <div className="text">
                {userInfo?.address && (
                  <p>
                    <span>{svg_builder_GFD_location}</span>
                    {userInfo?.address ||
                      "Address is not available at this time"}
                  </p>
                )}
                {userInfo?.landlineNumber && (
                  <p>
                    <span>{svg_builder_GFD_phone}</span>
                    {userInfo?.landlineNumber || "Number is not available at this time"}
                  </p>
                )}
                {userInfo?.email && (
                  <p>
                    {/* Need to check additionalEmail or email */}
                    <span>{svg_builder_GFD_mail}</span>
                    {userInfo?.email || "Not available"}
                  </p>
                )}
                {userInfo?.mobileNumbers?.length > 0 && (
                  <p>
                    <span>{svg_builder_GFD_mobile}</span>
                    {userInfo?.mobileNumbers || "Not available"}
                  </p>
                )}
              </div>
              <div
                className="GFD_img"
                style={{ background: `url(${userData?.builderCoverPicture})` }}
              ></div>
            </div>
            <div className="line" />
            {userData?.operatingCities?.length > 0 && (
              <>
                {" "}
                <h3 id="scroll-to-cities" style={{ scrollMarginTop: "100px" }}>
                  Operating In Cities
                </h3>
                <div className="operating_tag">
                  {userData?.operatingCities?.map((city, index) => {
                    return (
                      <p key={index}>
                        Project by {userData?.builderName} in {city}
                      </p>
                    );
                  })}
                </div>
                <div className="line" />
              </>
            )}
            <h3 id="scroll-to-launch" style={{ scrollMarginTop: "100px" }}>
              New Launch Projects by {userData?.builderName} ({newLaunch?.meta?.totalItems || 0})
            </h3>
            <div className="bulider_projects_container">
              <Loader loading={loadingNewLaunch} minHeight={200}>
                {newLaunch?.data?.length > 0 ? (
                  <CardSlider
                    // show={7}
                    totalLength={newLaunch?.meta?.totalItems}
                    handleMoreCard={() => null}
                    // handleMoreCard={handleMoreSaleCard}
                    disableInfinite
                    responsive={responsive2}
                  >
                    {newLaunch?.data?.map((e) => {
                      return (
                        <Link
                          href={`/project/${e?._id}`}
                          className="card"
                          key={e?._id}
                        >
                          <img
                            src={e?.images[0]}
                            width={100}
                            height={100}
                            alt={e?._id}
                          />
                          <div className="total_pics">
                            <span>
                              {svg_builder_pics}
                              {e?.images?.length}
                            </span>
                            <span>
                              {svg_builder_video}
                              {e?.videos?.length}
                            </span>
                          </div>
                          <div className="card_text">
                            <h5>{e?.name}</h5>
                            <p className="text-one-line">{e?.location}</p>
                            <h4>PKR {convertNumberToWords(e?.price)}</h4>
                          </div>
                        </Link>
                      );
                    })}
                  </CardSlider>
                ) : newLaunch?.data?.length === 0 && !loadingNewLaunch ? (
                  <div className="dataNotFound">
                    <div className="notFoundImg" />
                    Oops! Not found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>
            <div className="line" />
            <h3
              id="scroll-to-ready-to-move"
              style={{ scrollMarginTop: "100px" }}
            >
              Ready to Move Projects by {userData?.builderName} ({readyMove?.meta?.totalItems || 0})
            </h3>
            <div className="bulider_projects_container">
              <Loader loading={loadingReadyMove} minHeight={200}>
                {readyMove?.data?.length > 0 ? (
                  <CardSlider
                    // show={7}
                    totalLength={readyMove?.meta?.totalItems}
                    handleMoreCard={() => null}
                    // handleMoreCard={handleMoreSaleCard}
                    disableInfinite
                    responsive={responsive2}
                  >
                    {readyMove?.data?.map((e) => {
                      return (
                        <Link
                          href={`/project/${e?._id}`}
                          className="card"
                          key={e?._id}
                        >
                          <img
                            src={e?.images[0]}
                            width={100}
                            height={100}
                            alt={e?._id}
                          />
                          <div className="total_pics">
                            <span>
                              {svg_builder_pics}
                              {e?.images?.length}
                            </span>
                            <span>
                              {svg_builder_video}
                              {e?.videos?.length}
                            </span>
                          </div>
                          <div className="card_text">
                            <h5>{e?.name}</h5>
                            <p className="text-one-line">{e?.location}</p>
                            <h4>PKR {convertNumberToWords(e?.price)}</h4>
                          </div>
                        </Link>
                      );
                    })}
                  </CardSlider>
                ) : readyMove?.data?.length === 0 && !loadingReadyMove ? (
                  <div className="dataNotFound">
                    <div className="notFoundImg" />
                    Oops! Not found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>
            <div className="line" />
            <h3
              id="scroll-to-under-construction"
              style={{ scrollMarginTop: "100px" }}
            >
              Under Construction Projects by {userData?.builderName} ({underConstructionProjects?.meta?.totalItems || 0})
            </h3>
            <div className="bulider_projects_container">
              <Loader loading={loadingUnderConstruction} minHeight={200}>
                {underConstructionProjects?.data?.length > 0 ? (
                  <CardSlider
                    // show={7}
                    totalLength={underConstructionProjects?.meta?.totalItems}
                    handleMoreCard={() => null}
                    // handleMoreCard={handleMoreSaleCard}
                    disableInfinite
                    responsive={responsive2}
                  >
                    {underConstructionProjects?.data?.map((e) => {
                      return (
                        <Link
                          href={`/project/${e?._id}`}
                          className="card"
                          key={e?._id}
                        >
                          <img
                            src={e?.images[0]}
                            width={100}
                            height={100}
                            alt={e?._id}
                          />
                          <div className="total_pics">
                            <span>
                              {svg_builder_pics}
                              {e?.images?.length}
                            </span>
                            <span>
                              {svg_builder_video}
                              {e?.videos?.length}
                            </span>
                          </div>
                          <div className="card_text">
                            <h5>{e?.name}</h5>
                            <p className="text-one-line">{e?.location}</p>
                            <h4>PKR {convertNumberToWords(e?.price)}</h4>
                          </div>
                        </Link>
                      );
                    })}
                  </CardSlider>
                ) : underConstructionProjects?.data?.length === 0 &&
                  !loadingUnderConstruction ? (
                  <div className="dataNotFound">
                    <div className="notFoundImg" />
                    Oops! Not found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>
            <div className="line" />
            <h3>Other Top Builders</h3>
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
                    {builderInfo?.map((e) => {
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
          <div className="right_panel">
            <div className="top_btn_container">
              <a
                href={`tel: ${userInfo?.landlineNumber}`}
              >
                {svg_builder_call}
                <p>Call</p>
              </a>
              <a
                href={`mailto: ${userInfo?.email}`}
                onClick={handleEmailClickEvent}
              >
                {svg_builder_message}
                <p>Email</p>
              </a>
              <Link
                href={"/dashboard/user/zilaay-chats"}
                onClick={handleChatClickEvent}
              >
                {svg_builder_zilaay_chat}
                <p>4Devari Chat</p>
              </Link>
              <a
                href={`https://api.whatsapp.com/send?phone=${userInfo?.whatsapp}`}
                target="_blank"
                onClick={handleWhatsAppEvent}
              >
                {svg_builder_whatsapp}
                <p>WhatsApp</p>
              </a>

            </div>
            <a href={`tel: ${userInfo?.landlineNumber}`} className="inquire">
              {svg_builder_call}Inquire/Request a Call Back
            </a>
            <a href={`mailto: ${userInfo?.email}`} className="report">
              {svg_builder_report}Report Listing
            </a>
          </div>
        </div>
      </div>
      <div className="containers">
        {" "}
        <TrendingLinks />
      </div>
    </div>
  );
};

export default BuilderDetail;
