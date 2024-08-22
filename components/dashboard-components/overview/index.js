import React, { useEffect, useRef } from "react";
import classes from "./overview.module.css";
import Chart from "chart.js/auto";
import Leads from "../../../public/assets/icons/leads";
import PropertyViewIcon from "../../../public/assets/icons/propertyViewIcon";
import ProfileViews from "../../../public/assets/icons/ProfileViews";
import ZilaayChat from "../../../public/assets/icons/ZilaayChat";
import WhatsappIcon from "../../../public/assets/icons/WhatsappIcon";
import EmailIcon from "../../../public/assets/icons/EmailIcon";
import MapSectionCard from "../../../components/cards/map-section-card/index";
import buy_section_bg from "../../../public/assets/overview/buy_section_bg.png";
import SmallTickIcon from "../../../public/assets/icons/SmallTickIcon";
import upgrade_section_bg from "../../../public/assets/overview/upgrade_section_bg.png";
import three_dot from "../../../public/assets/dashboard/three_dot.svg";
import ThreeDotIcon from "../../../public/assets/icons/ThreeDotIcon";
import FacebookIcon from "../../../public/assets/icons/FacebookIcon";
import TwitterIcon from "../../../public/assets/icons/TwitterIcon";
import InstagramIcon from "../../../public/assets/icons/InstagramIcon";
import { CardSlider } from "../../common";
import { formatCounts, objectToQueryString, useWindowSize } from "../../../utils";
import Slider from "react-slick";
import { svg_three_dots } from "../../../public/Svgs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProperties,
  fetchUserPropertiesForCoWorking,
  fetchUserPropertiesForRent,
  fetchUserPropertiesForSale,
  fetchUserPropertiesForShareLiving,
} from "../../../redux/property";
import { useAuth } from "../../../contextApi";
import { PURPOSE } from "../../../utils/constants";
import Loader from "../../common/loader";
import { getAnalyticEventsOfUser, getEventsOfUser } from "../../../redux/analytic";
import { getUsersLikedProjects, getUsersLikedProperties } from "../../../redux/users";
import { fetchUserProjects } from "../../../redux/project";
import ProjectMapSectionCard from "../../cards/project-map-section-card";
// import Image from "next/image";

// const LineGraph = ({ height, data }) => {
//   const chartRef = useRef(null);
//   let myChart = null;
//   const dateCounts = {};

//   data?.length > 0 && data?.forEach(entry => {
//     const dateKey = new Date(entry.createdAt);
//     const formattedDate = dateKey.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // Using date-fns format function

//     dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
//   });

//   // Extract and sort the dates
//   const dates = Object.keys(dateCounts).sort((a, b) => new Date(a) - new Date(b));

//   // Extract the corresponding eventCounts in the sorted order
//   const eventCounts = dates.map(date => dateCounts[date]);

//   console.log("dates", dates);
//   console.log("eventCounts", eventCounts);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");
//     if (myChart) {
//       myChart.destroy();
//     }
//     myChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         // labels: ["jan", "feb", "mar", "apr", "may"],
//         labels: dates,
//         datasets: [{
//           label: 'Event Counts Over Time',
//           data: eventCounts, 
//           // data: [0, 10, 100], 
//           borderColor: 'blue',
//           borderWidth: 1,
//           fill: false,
//         }],
//       },
//       // options: {
//       //   scales: {
//       //     x: {
//       //       type: 'time',
//       //       time: {
//       //         unit: 'day',
//       //       },
//       //     },
//       //     y: {
//       //       title: {
//       //         display: true,
//       //         text: 'Event Count',
//       //       },
//       //     },
//       //   },
//       // },
//     });
//     // myChart = new Chart(ctx, {
//     //   type: "line",
//     //   data: {
//     //     labels: ["January", "February", "March", "April", "May", "June"],
//     //     datasets: [
//     //       {
//     //         label: "Sample Data",
//     //         data: [10, 50, 15, 25, 18, 30],
//     //         borderColor: "blue",
//     //         fill: false,
//     //       },
//     //     ],
//     //   },
//     //   options: {
//     //     responsive: true,
//     //   },
//     // });
//   }, [data]);

//   return (
//     <canvas
//       style={{ maxHeight: "350px", height: height, width: "100%" }}
//       ref={chartRef}
//     />
//   );
// };

const LineGraph = ({ height, data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  let dateCounts = {};

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous data
    dateCounts = {};

    data?.length > 0 &&
      data.forEach(entry => {
        const dateKey = new Date(entry.createdAt);
        const formattedDate = dateKey.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        });

        dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
      });

    // Extract and sort the dates
    const dates = Object.keys(dateCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Extract the corresponding eventCounts in the sorted order
    const eventCounts = dates.map(date => dateCounts[date]);

    console.log("dates", dates);
    console.log("eventCounts", eventCounts);

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: "Clicks",
            data: eventCounts,
            borderColor: '#004439',
            borderWidth: 2,
            // fill: false,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }, [data]);

  return (
    <canvas
      style={{ maxHeight: '350px', height, width: '100%' }}
      ref={chartRef}
    />
  );
};

const PieChart = ({
  width,
  height,
  totalSale = 0,
  totalRent = 0,
  totalShared = 0,
  totalCoWorking = 0,
}) => {
  const chartRef = useRef(null);
  let myChart = null;
  // Calculate the sum of the data values
  const totalData = totalSale + totalRent + totalShared + totalCoWorking;

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }

    if (totalData != 0) {
      const ctx = chartRef.current.getContext("2d");
      myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Sale", "Rent", "Share Living", "Co Working"],
          datasets: [
            {
              data: [totalSale, totalRent, totalShared, totalCoWorking],
              backgroundColor: ["#413D58", "#F3B61F", "#FE5D26", "#3C88AF"],
            },
          ],
        },
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [totalSale, totalRent, totalShared, totalCoWorking]);

  if (totalData === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        No data found
      </div>
    );
  } else {
    return (
      <canvas
        sty
        style={{ maxHeight: height, maxWidth: width }}
        ref={chartRef}
      />
    );
  }
};

const BuilderPieChart = ({
  width,
  height,
  totalProjects = 0,
}) => {
  const chartRef = useRef(null);
  let myChart = null;
  // Calculate the sum of the data values
  const totalData = totalProjects;

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }

    if (totalData != 0) {
      const ctx = chartRef.current.getContext("2d");
      myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Projects"],
          datasets: [
            {
              data: [totalProjects],
              backgroundColor: ["#F3B61F"],
            },
          ],
        },
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [totalProjects]);

  if (totalData === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        No data found
      </div>
    );
  } else {
    return (
      <canvas
        sty
        style={{ maxHeight: height, maxWidth: width }}
        ref={chartRef}
      />
    );
  }
};

function Overview() {
  const width = useWindowSize().width;
  const dispatch = useDispatch();
  const {
    eventData,
    analyticsData,
    loadingEvents,
  } = useSelector((state) => state.event);
  const {
    usersLikedProperties,
    loadingLikedProperties,
    usersLikedProjects,
    loadingLikedProjects,
  } = useSelector((state) => state.users);
  const {
    userProperties,
    loadingUserProperties,
    userPropertiesForSale,
    loadingUserPropertiesForSale,
    userPropertiesForRent,
    loadingUserPropertiesForRent,
    userPropertiesForShareLiving,
    loadingUserPropertiesForShareLiving,
    userPropertiesForCoWorking,
    loadingUserPropertiesForCoWorking,
  } = useSelector((state) => state.property);
  const {
    userProjects,
    loadingUserProjects
  } = useSelector((state) => state.project);
  const { user } = useAuth();
  const isBuilder = user?.type === 'builder' ? true : false;

  useEffect(() => {
    if(user?.type === "builder"){
      dispatch(fetchUserProjects({ id: user?.id }));
    }else{
      dispatch(fetchUserProperties({ id: user?.id, query: `nPerPage=1` }));
      dispatch(
        fetchUserPropertiesForSale({
          id: user?.id,
          query: `purpose=${PURPOSE.buy}`,
        })
      );
      dispatch(
        fetchUserPropertiesForRent({
          id: user?.id,
          query: `purpose=${PURPOSE.rent}`,
        })
      );
      dispatch(
        fetchUserPropertiesForShareLiving({
          id: user?.id,
          query: `purpose=${PURPOSE.coliving}`,
        })
      );
      dispatch(
        fetchUserPropertiesForCoWorking({
          id: user?.id,
          query: `purpose=${PURPOSE.coworking}&nPerPage=1`,
        })
      );
    }
    dispatch(getUsersLikedProperties({ userId: user?.id}))
    dispatch(getUsersLikedProjects({ userId: user?.id}))
    if(user?.type === "staff") {
      dispatch(getEventsOfUser({ userId: user?.id, query: objectToQueryString({staffId: user?.id})}));
      dispatch(getAnalyticEventsOfUser({ userId: user?.id, query: objectToQueryString({staffId: user?.id, category: "click"})}));
    }else {
      dispatch(getEventsOfUser({userId: user?.id}))
      dispatch(getAnalyticEventsOfUser({userId: user?.id, query: "category=click"}))
    }
  }, []);

  const handleMoreLikedPropCard = (size) => {
    dispatch(
      getUsersLikedProperties({
        userId: user?.id,
        query: `nPerPage=${size}`,
      })
    );
  };

  const handleMoreLikedProjCard = (size) => {
    dispatch(
      getUsersLikedProjects({
        userId: user?.id,
        query: `nPerPage=${size}`,
      })
    );
  };

  const handleMoreSaleCard = (size) => {
    dispatch(
      fetchUserPropertiesForSale({
        id: user?.id,
        query: `purpose=${PURPOSE.buy}&nPerPage=${size}`,
      })
    );
  };
  const handleMoreRentCard = (size) => {
    dispatch(
      fetchUserPropertiesForRent({
        id: user?.id,
        query: `purpose=${PURPOSE.rent}&nPerPage=${size}`,
      })
    );
  };
  const handleMoreShareLivingCard = (size) => {
    dispatch(
      fetchUserPropertiesForShareLiving({
        id: user?.id,
        query: `purpose=${PURPOSE.coliving}&nPerPage=${size}`,
      })
    );
  };

  const handleMoreProjectCard = (size) => {
    dispatch(
      fetchUserProjects({
        id: user?.id,
        query: `nPerPage=${size}`,
      })
    );
  };
  // const handleMoreCoWorkingCard = (size) => {
  //   dispatch(fetchUserPropertiesForRent({id: user?.id, query: `purpose=${PURPOSE.coworking}&nPerPage=${size}`}));
  // }

  const settings = {
    className: "overview-card-slider",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 548,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };
  const settings2 = {
    className: "staff-card-slider",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 548,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <div className={classes.container}>
      <Loader
        loading={
          loadingUserProperties ||
          loadingUserProjects ||
          loadingLikedProperties ||
          loadingLikedProjects ||
          (!userPropertiesForSale?.data && loadingUserPropertiesForSale) ||
          (!userPropertiesForRent?.data && loadingUserPropertiesForRent) ||
          (!userPropertiesForShareLiving?.data &&
            loadingUserPropertiesForShareLiving) ||
          (!userPropertiesForCoWorking?.data &&
            loadingUserPropertiesForCoWorking)
        }
        global
      />
      <h3 className={classes.overview_heading}>Overview</h3>
      <div className={classes.overlay} />
      <div className={classes.content_container}>
        <div className={classes.top_analytics_container}>
          <div className={classes.total_listings_container}>
            <div className={classes.total_listings_left}>
              <p>Total Number of Listing {isBuilder ? userProjects?.meta?.totalItems : userProperties?.meta?.totalItems}</p>
            </div>

            {isBuilder ? (
              <BuilderPieChart
                width="260px"
                height="210px"
                totalProjects={userProjects?.meta?.totalItems}
              />
            ) : (
              <PieChart
                width="260px"
                height="210px"
                totalSale={userPropertiesForSale?.meta?.totalItems}
                totalRent={userPropertiesForRent?.meta?.totalItems}
                totalShared={userPropertiesForShareLiving?.meta?.totalItems}
                totalCoWorking={userPropertiesForCoWorking?.meta?.totalItems}
              />
            )}

          </div>
          {width > 548 ? (
            <div className={classes.analytic_tab_container}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #F1AA3E 0%, #B27D2A 100%)",
                }}
                className={classes.analytic_tab}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.leadsCount)}</h3>
                    <p>Leads</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <Leads />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #7662C9, #4C3A9A)",
                }}
                className={classes.analytic_tab}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{isBuilder ? formatCounts(eventData?.projectViewCount) : formatCounts(eventData?.propertyViewCount)}</h3>
                    <p> {isBuilder ? "Project Views" : "Property Views"}</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <PropertyViewIcon />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #D96C54, #843928)",
                }}
                className={classes.analytic_tab}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.profileViewCount)}</h3>
                    <p>Profile Views</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <ProfileViews />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #004439, #0040B6)",
                }}
                className={classes.analytic_tab}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.chatsCount)}</h3>
                    <p>4DevariChat</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <ZilaayChat />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #25D366, #0A8638)",
                }}
                className={classes.analytic_tab}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.whatsappCount)}</h3>
                    <p>WhatsApp</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <WhatsappIcon />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #F4B400, #BE941C)",
                }}
                className={classes.analytic_tab}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.emailCount)}</h3>
                    <p>Emails</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <EmailIcon />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Slider
              {...settings}
              className={`${classes.analytic_tab_container} overview-card-slider`}
            >
              <div
                className={`${classes.analytic_tab} ${classes.analytic_tab1}`}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.leadsCount)}</h3>
                    <p>Leads</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <Leads width={100} height={50} />
                  </div>
                </div>
              </div>
              <div
                className={`${classes.analytic_tab} ${classes.analytic_tab2}`}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{isBuilder ? formatCounts(eventData?.projectViewCount) : formatCounts(eventData?.propertyViewCount)}</h3>
                    <p> {isBuilder ? "Project Views" : "Property Views"}</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <PropertyViewIcon width={100} height={50} />
                  </div>
                </div>
              </div>
              <div
                className={`${classes.analytic_tab} ${classes.analytic_tab3}`}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.profileViewCount)}</h3>
                    <p>Profile Views</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <ProfileViews width={100} height={50} />
                  </div>
                </div>
              </div>
              <div
                className={`${classes.analytic_tab} ${classes.analytic_tab4}`}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.chatsCount)}</h3>
                    <p>4DevariChat</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <ZilaayChat width={100} height={50} />
                  </div>
                </div>
              </div>
              <div
                className={`${classes.analytic_tab} ${classes.analytic_tab5}`}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.whatsappCount)}</h3>
                    <p>WhatsApp</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <WhatsappIcon width={100} height={50} />
                  </div>
                </div>
              </div>
              <div
                className={`${classes.analytic_tab} ${classes.analytic_tab6}`}
              >
                <div className={classes.tab_content}>
                  <div className={classes.tab_content_left}>
                    <h3>{formatCounts(eventData?.emailCount)}</h3>
                    <p>Emails</p>
                  </div>
                  <div className={classes.tab_content_right}>
                    <EmailIcon width={100} height={50} />
                  </div>
                </div>
              </div>
            </Slider>
          )}
        </div>

        <div className={classes.divider} />

        <div className={classes.second_row_container}>
          <div className={classes.section_container}>
            <p>Analytics</p>
            <div className={classes.line_chart_content_container}>
              {analyticsData?.length > 0 ? (
                <LineGraph height={"300px"} data={analyticsData} />
              ) : (
                <div className={classes.property_not_found}>
                  <div className={classes.notFoundImg} />
                  Oops! No analytic found
                </div>
              )}
            </div>
          </div>
          {/* <div className={classes.hot_ad_container}>
            <h3>Hot Properties</h3>
            <CardSlider
              show={1}
              responsive={[
                {
                  breakpoint: 1177,
                  settings: {
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 614,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              <MapSectionCard />
              <MapSectionCard />
              <MapSectionCard />
              <MapSectionCard />
            </CardSlider>
          </div> */}
        </div>

        {/* <div className={classes.divider} />

        <div className={classes.third_row_container}>
          <div className={classes.section_container}>
            <p>Quota and Credits</p>
            <div className={classes.quota_and_credits_container}>
              <div className={classes.quota_and_credits_content_container}>
                <div className={classes.quota_and_credits_tab_container}>
                  <p className={classes.active}>Listing Quota (0)</p>
                  <p className={classes.disabled}>Refresh Property (0)</p>
                  <p className={classes.disabled}>Hot Listing (0)</p>
                  <p className={classes.disabled}>Story Ad (0)</p>
                  <p className={classes.disabled}>. . .</p>
                </div>
                <div className={classes.tab_underline} />
              </div>
            </div>
          </div>
          <div className={classes.section_container}>
            <h3 style={{ opacity: 0 }}>no heading</h3>
            <div className={classes.buy_now_container}>
              <img src={buy_section_bg.src} />
              <div className={classes.buy_now_content_container}>
                <h2>Looking to Sell or Rent Your Property?</h2>
                <h3>Post now on 4Devari.com to reach millions of users!</h3>

                <div className={classes.buy_now_single_row}>
                  <SmallTickIcon />
                  <p>Get Better Price</p>
                </div>

                <div className={classes.buy_now_single_row}>
                  <SmallTickIcon />
                  <p>Connect With Real Buyers</p>
                </div>

                <div>
                  <div className={classes.buy_now_single_row}>
                    <SmallTickIcon />
                    <p>Realtime Stats</p>
                  </div>

                  <div className={classes.black_btn}>
                    <h4>BUY NOW</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className={classes.divider} />

        {isBuilder ? (
          <>
            <div className={classes.property_banner}>
              <div className={classes.property_banner_left}>
                <p>Projects</p>
              </div>
              {/* <div className={classes.property_banner_right}>{svg_three_dots}</div> */}
            </div>
            <div className={classes.property_row_container}>
              <Loader loading={loadingUserProjects} minHeight={200}>
                {userProjects?.data?.length > 0 ? (
                  <CardSlider
                    show={4}
                    totalLength={userProjects?.meta?.totalItems}
                    handleMoreCard={handleMoreProjectCard}
                    disableInfinite
                    responsive={[
                      {
                        breakpoint: 1300,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                      {
                        breakpoint: 1177,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 650,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ]}
                  >
                    {userProjects?.data?.map((prop) => (
                      <ProjectMapSectionCard key={`user-project${prop?._id}`} p={prop} />
                    ))}
                  </CardSlider>
                ) : userProjects?.data?.length === 0 &&
                  !loadingUserProjects ? (
                  <div className={classes.property_not_found}>
                    <div className={classes.notFoundImg} />
                    Oops! No Project found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>
          </>
        ) : (
          <>
            <div className={classes.property_banner}>
              <div className={classes.property_banner_left}>
                <p>Properties for Sale</p>
              </div>
              {/* <div className={classes.property_banner_right}>{svg_three_dots}</div> */}
            </div>
            <div className={classes.property_row_container}>
              <Loader loading={loadingUserPropertiesForSale} minHeight={200}>
                {userPropertiesForSale?.data?.length > 0 ? (
                  <CardSlider
                    show={4}
                    totalLength={userPropertiesForSale?.meta?.totalItems}
                    handleMoreCard={handleMoreSaleCard}
                    disableInfinite
                    responsive={[
                      {
                        breakpoint: 1300,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                      {
                        breakpoint: 1177,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 650,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ]}
                  >
                    {userPropertiesForSale?.data?.map((prop) => (
                      <MapSectionCard key={`user-p-sale${prop?._id}`} p={prop} />
                    ))}
                  </CardSlider>
                ) : userPropertiesForSale?.data?.length === 0 &&
                  !loadingUserPropertiesForSale ? (
                  <div className={classes.property_not_found}>
                    <div className={classes.notFoundImg} />
                    Oops! No Property found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>

            <div className={classes.divider} />

            <div className={classes.property_banner}>
              <div className={classes.property_banner_left}>
                <p>Properties for Rent</p>
              </div>
              {/* <div className={classes.property_banner_right}>{svg_three_dots}</div> */}
            </div>
            <div className={classes.property_row_container}>
              <Loader loading={loadingUserPropertiesForRent} minHeight={200}>
                {userPropertiesForRent?.data?.length > 0 ? (
                  <CardSlider
                    show={4}
                    totalLength={userPropertiesForRent?.meta?.totalItems}
                    handleMoreCard={handleMoreRentCard}
                    disableInfinite
                    responsive={[
                      {
                        breakpoint: 1300,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                      {
                        breakpoint: 1177,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 650,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ]}
                  >
                    {userPropertiesForRent?.data?.map((prop) => (
                      <MapSectionCard key={`user-p-rent${prop?._id}`} p={prop} />
                    ))}
                  </CardSlider>
                ) : userPropertiesForRent?.data?.length === 0 &&
                  !loadingUserPropertiesForRent ? (
                  <div className={classes.property_not_found}>
                    <div className={classes.notFoundImg} />
                    Oops! No Property found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>

            <div className={classes.divider} />

            <div className={classes.property_banner}>
              <div className={classes.property_banner_left}>
                <p>Shared Living</p>
              </div>
              {/* <div className={classes.property_banner_right}>{svg_three_dots}</div> */}
            </div>
            <div className={classes.property_row_container}>
              <Loader loading={loadingUserPropertiesForShareLiving} minHeight={200}>
                {userPropertiesForShareLiving?.data?.length > 0 ? (
                  <CardSlider
                    show={4}
                    totalLength={userPropertiesForShareLiving?.meta?.totalItems}
                    handleMoreCard={handleMoreShareLivingCard}
                    disableInfinite
                    responsive={[
                      {
                        breakpoint: 1300,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                      {
                        breakpoint: 1177,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 650,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ]}
                  >
                    {userPropertiesForShareLiving?.data?.map((prop) => (
                      <MapSectionCard
                        key={`user-p-share-living${prop?._id}`}
                        p={prop}
                      />
                    ))}
                  </CardSlider>
                ) : userPropertiesForShareLiving?.data?.length === 0 &&
                  !loadingUserPropertiesForShareLiving ? (
                  <div className={classes.property_not_found}>
                    <div className={classes.notFoundImg} />
                    Oops! No Property found
                  </div>
                ) : (
                  ""
                )}
              </Loader>
            </div>
          </>
        )}

        <div className={classes.divider} />

        {/* <div className={classes.fourth_row_container}>
          <div className={classes.section_container}>
            <p>Upgrade/Downgrade</p>
            <div className={classes.upgrade_container}>
              <img src={upgrade_section_bg.src} />
              <div className={classes.upgrade_content_container}>
                <div className={classes.headings_content}>
                  <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h2>
                  <h3>
                    Donec tortor sapien, aliquam eget egestas at, molestie ut
                    libero.
                  </h3>
                </div>

                <div>
                  <div className={classes.black_btn}>
                    <h4>Upgrade My Account</h4>
                  </div>
                  <div className={classes.white_btn}>
                    <h4>Upgrade My Listings</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.section_container}>
            <p>Inbox</p>
            <div className={classes.inbox_container}>
              <div className={classes.inbox_content_container}>
                <div className={classes.single_inbox_selected}>
                  <div className={classes.inbox_content}>
                    <img src={three_dot.src} className={classes.three_dot} />
                    <div className={classes.single_inbox_profile_picture}></div>
                    <div className={classes.single_inbox_profile_name_section}>
                      <div>
                        <h3 className={classes.single_inbox_name}>Mike</h3>
                        <p className={classes.single_inbox_name_title}>Agent</p>
                      </div>
                      <p className={classes.single_inbox_message}>
                        Type message here..
                      </p>
                    </div>
                  </div>
                </div>

                <div className={classes.single_inbox}>
                  <div className={classes.inbox_content}>
                    <img src={three_dot.src} className={classes.three_dot} />
                    <div className={classes.single_inbox_profile_picture}></div>
                    <div className={classes.single_inbox_profile_name_section}>
                      <div>
                        <h3 className={classes.single_inbox_name}>Mike</h3>
                        <p className={classes.single_inbox_name_title}>Agent</p>
                      </div>
                      <p className={classes.single_inbox_message}>
                        Type message here..
                      </p>
                    </div>
                  </div>
                </div>

                <div className={classes.single_inbox}>
                  <div className={classes.inbox_content}>
                    <img src={three_dot.src} className={classes.three_dot} />
                    <div className={classes.single_inbox_profile_picture}></div>
                    <div className={classes.single_inbox_profile_name_section}>
                      <div>
                        <h3 className={classes.single_inbox_name}>Mike</h3>
                        <p className={classes.single_inbox_name_title}>Agent</p>
                      </div>
                      <p className={classes.single_inbox_message}>
                        Type message here..
                      </p>
                    </div>
                  </div>
                </div>

                <div className={classes.single_inbox}>
                  <div className={classes.inbox_content}>
                    <img src={three_dot.src} className={classes.three_dot} />
                    <div className={classes.single_inbox_profile_picture}></div>
                    <div className={classes.single_inbox_profile_name_section}>
                      <div>
                        <h3 className={classes.single_inbox_name}>Mike</h3>
                        <p className={classes.single_inbox_name_title}>Agent</p>
                      </div>
                      <p className={classes.single_inbox_message}>
                        Type message here..
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className={classes.divider} /> */}

        {/* <div className={classes.third_row_container}>
          <div className={classes.section_container}>
            <p>Staff Statistics</p>
            <div className={classes.line_chart_content_container}>
              <LineGraph height="322px" />
            </div>
          </div>
          <div className={classes.staff_listings_section}>
            <h3>Staff Listings</h3>
            {width > 548 ? (
              <div className={classes.staff_listing_cards_section}>
                <div className={classes.single_staff_card}>
                  <div className={classes.staff_card_top_bar}>
                    <div className={classes.active_tag}>
                      <p className={classes.tag_label}>Active</p>
                    </div>

                    <div className={classes.pic_container}>
                      <div className={classes.profile_picture}></div>
                    </div>
                    <div className={classes.menu_btn_container}>
                      <ThreeDotIcon />
                    </div>
                  </div>

                  <div className={classes.name_section}>
                    <h2>Ibrahim Khan</h2>
                    <p>ID Z1681684</p>
                  </div>

                  <div className={classes.btns_container}>
                    <div className={classes.single_stat_btn_container}>
                      <h2>Member Since</h2>
                      <p>2023</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.blue_btn}
                      >
                        <h4>View Profile</h4>
                      </div>
                    </div>

                    <div className={classes.single_stat_btn_container}>
                      <h2>Active Listings</h2>
                      <p>(20)</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.black_btn}
                      >
                        <h4>Message</h4>
                      </div>
                    </div>
                  </div>

                  <div className={classes.divider} />

                  <div className={classes.social_media_container}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                  </div>
                </div>
                <div className={classes.single_staff_card}>
                  <div className={classes.staff_card_top_bar}>
                    <div className={classes.active_tag}>
                      <p className={classes.tag_label}>Active</p>
                    </div>

                    <div className={classes.pic_container}>
                      <div className={classes.profile_picture}></div>
                    </div>
                    <div className={classes.menu_btn_container}>
                      <ThreeDotIcon />
                    </div>
                  </div>

                  <div className={classes.name_section}>
                    <h2>Ibrahim Khan</h2>
                    <p>ID Z1681684</p>
                  </div>

                  <div className={classes.btns_container}>
                    <div className={classes.single_stat_btn_container}>
                      <h2>Member Since</h2>
                      <p>2023</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.blue_btn}
                      >
                        <h4>View Profile</h4>
                      </div>
                    </div>

                    <div className={classes.single_stat_btn_container}>
                      <h2>Active Listings</h2>
                      <p>(20)</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.black_btn}
                      >
                        <h4>Message</h4>
                      </div>
                    </div>
                  </div>

                  <div className={classes.divider} />

                  <div className={classes.social_media_container}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                  </div>
                </div>
              </div>
            ) : (
              <Slider
                {...settings2}
                className={`${classes.staff_listing_cards_section} staff-card-slider`}
              >
                <div className={classes.single_staff_card}>
                  <div className={classes.staff_card_top_bar}>
                    <div className={classes.active_tag}>
                      <p className={classes.tag_label}>Active</p>
                    </div>

                    <div className={classes.pic_container}>
                      <div className={classes.profile_picture}></div>
                    </div>
                    <div className={classes.menu_btn_container}>
                      <ThreeDotIcon />
                    </div>
                  </div>

                  <div className={classes.name_section}>
                    <h2>Ibrahim Khan</h2>
                    <p>ID Z1681684</p>
                  </div>

                  <div className={classes.btns_container}>
                    <div className={classes.single_stat_btn_container}>
                      <h2>Member Since</h2>
                      <p>2023</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.blue_btn}
                      >
                        <h4>View Profile</h4>
                      </div>
                    </div>

                    <div className={classes.single_stat_btn_container}>
                      <h2>Active Listings</h2>
                      <p>(20)</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.black_btn}
                      >
                        <h4>Message</h4>
                      </div>
                    </div>
                  </div>

                  <div className={classes.divider} />

                  <div className={classes.social_media_container}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                  </div>
                </div>
                <div className={classes.single_staff_card}>
                  <div className={classes.staff_card_top_bar}>
                    <div className={classes.active_tag}>
                      <p className={classes.tag_label}>Active</p>
                    </div>

                    <div className={classes.pic_container}>
                      <div className={classes.profile_picture}></div>
                    </div>
                    <div className={classes.menu_btn_container}>
                      <ThreeDotIcon />
                    </div>
                  </div>

                  <div className={classes.name_section}>
                    <h2>Ibrahim Khan</h2>
                    <p>ID Z1681684</p>
                  </div>

                  <div className={classes.btns_container}>
                    <div className={classes.single_stat_btn_container}>
                      <h2>Member Since</h2>
                      <p>2023</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.blue_btn}
                      >
                        <h4>View Profile</h4>
                      </div>
                    </div>

                    <div className={classes.single_stat_btn_container}>
                      <h2>Active Listings</h2>
                      <p>(20)</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.black_btn}
                      >
                        <h4>Message</h4>
                      </div>
                    </div>
                  </div>

                  <div className={classes.divider} />

                  <div className={classes.social_media_container}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                  </div>
                </div>
                <div className={classes.single_staff_card}>
                  <div className={classes.staff_card_top_bar}>
                    <div className={classes.active_tag}>
                      <p className={classes.tag_label}>Active</p>
                    </div>

                    <div className={classes.pic_container}>
                      <div className={classes.profile_picture}></div>
                    </div>
                    <div className={classes.menu_btn_container}>
                      <ThreeDotIcon />
                    </div>
                  </div>

                  <div className={classes.name_section}>
                    <h2>Ibrahim Khan</h2>
                    <p>ID Z1681684</p>
                  </div>

                  <div className={classes.btns_container}>
                    <div className={classes.single_stat_btn_container}>
                      <h2>Member Since</h2>
                      <p>2023</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.blue_btn}
                      >
                        <h4>View Profile</h4>
                      </div>
                    </div>

                    <div className={classes.single_stat_btn_container}>
                      <h2>Active Listings</h2>
                      <p>(20)</p>
                      <div
                        style={{ width: "100%" }}
                        className={classes.black_btn}
                      >
                        <h4>Message</h4>
                      </div>
                    </div>
                  </div>

                  <div className={classes.divider} />

                  <div className={classes.social_media_container}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                  </div>
                </div>
              </Slider>
            )}
          </div>
        </div> */}

        {/* <div className={classes.divider} /> */}

        <div className={classes.property_row_container}>
          <div className={classes.property_banner}>
            <div className={classes.property_banner_left}>
              <p>Wishlist / Saved Properties</p>
            </div>
            <div className={classes.property_banner_right}></div>
          </div>

          <Loader loading={loadingLikedProperties} minHeight={200}>
              {usersLikedProperties?.data?.length > 0 ? (
                <CardSlider
                  show={4}
                  totalLength={usersLikedProperties?.meta?.totalItems}
                  handleMoreCard={handleMoreLikedPropCard}
                  disableInfinite
                  responsive={[
                    {
                      breakpoint: 1300,
                      settings: {
                        slidesToShow: 3,
                      },
                    },
                    {
                      breakpoint: 1177,
                      settings: {
                        slidesToShow: 2,
                      },
                    },
                    {
                      breakpoint: 650,
                      settings: {
                        slidesToShow: 1,
                      },
                    },
                  ]}
                >
                  {usersLikedProperties?.data?.map((prop) => (
                    <MapSectionCard key={`user-liked-p${prop?._id}`} p={prop} refetchQuery />
                  ))}
                </CardSlider>
              ) : ((usersLikedProperties?.data?.length === 0 &&
                !loadingLikedProperties) || !usersLikedProperties?.data) ? (
                <div className={classes.property_not_found}>
                  <div className={classes.notFoundImg} />
                  Oops! No liked Property found
                </div>
              ) : (
                ""
              )}
            </Loader>
        </div>

        <div className={classes.divider} />

        <div className={classes.property_row_container}>
          <div className={classes.property_banner}>
            <div className={classes.property_banner_left}>
              <p>Wishlist Projects</p>
            </div>
            <div className={classes.property_banner_right}></div>
          </div>

          <Loader loading={loadingLikedProjects} minHeight={200}>
            {usersLikedProjects?.data?.length > 0 ? (
              <CardSlider
                show={4}
                totalLength={usersLikedProjects?.meta?.totalItems}
                handleMoreCard={handleMoreLikedProjCard}
                disableInfinite
                responsive={[
                  {
                    breakpoint: 1300,
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 1177,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 650,
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ]}
              >
                {usersLikedProjects?.data?.map((prop) => (
                  <ProjectMapSectionCard key={`user-liked-proj${prop?._id}`} p={prop} refetchQuery />
                ))}
              </CardSlider>
            ) : (usersLikedProjects?.data?.length === 0 &&
              !loadingLikedProjects) || (!usersLikedProjects?.data) ? (
              <div className={classes.property_not_found}>
                <div className={classes.notFoundImg} />
                Oops! No liked Project found
              </div>
            ) : (
              ""
            )}
          </Loader>

        </div>
      </div>
    </div>
  );
}

export default Overview;
