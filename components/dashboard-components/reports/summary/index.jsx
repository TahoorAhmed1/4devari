import React, { useEffect, useRef, useState } from "react";
// import {
//   REACH_ANALYTICS,
// } from "../../../../data";
import {
  objectToQueryString,
  removeEmptyFields,
  useWindowSize,
} from "../../../../utils";
import Slider from "react-slick";
import {
  svg_summary_lead1,
  svg_summary_lead3,
  svg_summary_lead4,
  svg_summary_lead5,
  svg_summary_list_1,
  svg_summary_list_2,
  svg_summary_list_3,
  svg_summary_list_4,
  svg_summary_list_5,
  svg_summary_list_dropdown,
} from "../../../../public/Svgs";
import { DatePicker, Space } from "antd";
import { Chart } from "chart.js";
import {
  fetchPoints,
  fetchUserProperties,
  fetchUserPropertiesForCoWorking,
  fetchUserPropertiesForRent,
  fetchUserPropertiesForSale,
  fetchUserPropertiesForShareLiving,
} from "../../../../redux/property";
import { useAuth } from "../../../../contextApi";
import { useDispatch, useSelector } from "react-redux";
import ReachMap from "../../../common/maps/report-map";
import Loader from "../../../common/loader";
import { PURPOSE } from "../../../../utils/constants";
import {
  getAnalyticEventsOfUser,
  getEventsOfUser,
} from "../../../../redux/analytic";
import { fetchProjectPoints, fetchUserProjects } from "../../../../redux/project";
import ProjectReachMap from "../../../common/maps/report-map/project-reach-map";
const { RangePicker } = DatePicker;

// const LineGraph2 = ({ height, showLine }) => {
//   const chartRef = useRef(null);
//   let myChart2 = null;
//   // console.log(showLine);
//   const width = useWindowSize().width;
//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");
//     if (myChart2) {
//       myChart2.destroy();
//     }
//     myChart2 = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels:
//           width > 450
//             ? [
//                 "Jan1",
//                 "Jan2",
//                 "Jan3",
//                 "Jan4",
//                 "Jan5",
//                 "Jan6",
//                 "Jan7",
//                 "Jan8",
//                 "Jan9",
//                 "Jan10",
//               ]
//             : ["Jan2", "Jan4", "Jan6", "Jan8", "Jan10"],
//         datasets: [
//           {
//             label: [],
//             data: [0, 10],
//             fill: null,
//           },
//           {
//             label: [],
//             data: [0, 1, 2, 3, 10],
//             fill: null,
//           },
//           {
//             label: [],
//             data: [0, 1, 2, 3, 4, 5, 7, 8, 9, 30],
//             fill: null,
//           },
//           {
//             label: [],
//             data: [0, 1, 2, 3, 4, 5, 7, 8, 9, 30],
//             fill: null,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: false,
//           },
//         },
//         scales: {
//           x: {
//             grid: {
//               display: false,
//             },
//           },
//           y: {
//             grid: {
//               display: false,
//             },
//           },
//         },
//       },
//     });
//   }, []);

//   return (
//     <canvas
//       style={{
//         maxHeight: "350px",
//         height: height,
//         minHeight: "300px",
//         width: "100%",
//       }}
//       ref={chartRef}
//     />
//   );
// };

const LineGraph = ({ height, data, filter }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  let dateCounts = {};

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous data
    dateCounts = {};

    data?.length > 0 &&
      data?.forEach((entry) => {
        const dateKey = new Date(entry.createdAt);
        const formattedDate = dateKey.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });

        dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
      });

    // Extract and sort the dates
    const dates = Object.keys(dateCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Extract the corresponding eventCounts in the sorted order
    const eventCounts = dates.map((date) => dateCounts[date]);

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    let words = filter?.name?.split("-") || "events";
    let label = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: label,
            data: eventCounts,
            // borderColor: '#004439',
            borderWidth: 2,
            fill: null,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <canvas
      style={{ maxHeight: "350px", height, minHeight: "300px", width: "100%" }}
      ref={chartRef}
    />
  );
};

const Report_summary = () => {
  const dispatch = useDispatch();
  const { eventData, analyticsData, loadingEvents } = useSelector(
    (state) => state.event
  );
  const {
    loadingPoints,
    points,
    loading,
    userProperties,
    userPropertiesForSale,
    userPropertiesForRent,
    userPropertiesForShareLiving,
    userPropertiesForCoWorking,
  } = useSelector((state) => state.property);
  const { userProjects, loadingUserProjects, projectPoints, loadingProjectPoints } = useSelector(
    (state) => state.project
  );
  const [showLine, setShowLine] = useState("whatsapp-click");
  const [dateRange, setDateRange] = useState([]);

  const [filter, setFilter] = useState({
    category: "click",
    name: "whatsapp-click",
  });
  const [map, setMap] = useState(null);
  const [showLine2, setShowLine2] = useState(1);
  const [mapBtn, setMapBtn] = useState(1);
  const width = useWindowSize().width;
  const { user } = useAuth();
  const isBuilder = user?.type === "builder" ? true : false;
  const [selectedFields, setSelectedFields] = useState({
    userId: user?.id,
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(isBuilder){
        dispatch(fetchProjectPoints({userId: user?.id}));
      }else {
        dispatch(fetchPoints(`${objectToQueryString(selectedFields)}`));
      }
    }, 200);
    return () => clearTimeout(debounce);
  }, [selectedFields]);

  useEffect(() => {
    if (isBuilder) {
      dispatch(fetchUserProjects({ id: user?.id }));
    } else {
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
  }, []);

  useEffect(() => {
    if (filter) {
      let query = filter;
      removeEmptyFields(query);
      if(user?.type === "staff") {
        dispatch(
          getEventsOfUser({
            userId: user?.id,
            query: objectToQueryString({...query, staffId: user?.id}),
          })
        );
        dispatch(
          getAnalyticEventsOfUser({
            userId: user?.id,
            query: objectToQueryString({...query, staffId: user?.id}),
          })
        );
      }else {
        dispatch(
          getEventsOfUser({
            userId: user?.id,
            query: objectToQueryString(query),
          })
        );
        dispatch(
          getAnalyticEventsOfUser({
            userId: user?.id,
            query: objectToQueryString(query),
          })
        );
      }
    }
  }, [filter]);

  const Summary_List_Data = [
    {
      id: 1,
      icon: svg_summary_list_1,
      num: userProperties?.meta?.totalItems,
      line: "Total Listings",
      grdient: " linear-gradient(#004439, #0044b2)",
    },
    {
      id: 2,
      icon: svg_summary_list_2,
      num: userPropertiesForSale?.meta?.totalItems,
      line: "For Sale",
      grdient: " linear-gradient(#8758E7, #5E30BD)",
    },
    {
      id: 3,
      icon: svg_summary_list_3,
      num: userPropertiesForRent?.meta?.totalItems,
      line: "For Rent",
      grdient: " linear-gradient(#629D60, #276325)",
    },
    {
      id: 4,
      icon: svg_summary_list_4,
      num: userPropertiesForShareLiving?.meta?.totalItems,
      line: "PG / Shared Living",
      grdient: " linear-gradient(#FC8165, #D45948)",
    },
    {
      id: 5,
      icon: svg_summary_list_5,
      num: userPropertiesForCoWorking?.meta?.totalItems,
      line: "Co-Working",
      grdient: " linear-gradient(#48C0D8, #21869A)",
    },
    // {
    //   id: 6,
    //   icon: svg_summary_list_6,
    //   num: "536",
    //   line: "Hot",
    //   grdient: " linear-gradient(#E83A3A, #B41D1D)",
    // },
  ];
  const Project_Summary_List_Data = [
    {
      id: 1,
      icon: svg_summary_list_1,
      num: userProjects?.meta?.totalItems,
      line: "Total Projects",
      grdient: " linear-gradient(#004439, #0044b2)",
    },
  ];

  const SUMMARY_ANALYTICS = [
    {
      id: 1,
      icon: svg_summary_lead1,
      num: eventData?.leadsCount || 0,
      word: "Leads",
    },
    {
      id: 3,
      icon: svg_summary_lead3,
      num: eventData?.whatsappCount || 0,
      word: "Whatsapp",
    },
    {
      id: 4,
      icon: svg_summary_lead4,
      num: eventData?.chatsCount || 0,
      word: "4DevariChat",
    },
    {
      id: 5,
      icon: svg_summary_lead5,
      num: eventData?.emailCount || 0,
      word: "Emails",
    },
  ];

  const settings = {
    className: "summary-card-slider",
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };
  const customFormatter = (value) => {
    if (!value) {
      return "";
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = value.month();
    const year = value.year();
    const date = value.date();

    return `${monthNames[month]}, ${date} ${year}`;
  };

  const handleCategoryChange = (purpose) => {
    if (purpose) {
      setSelectedFields((prev) => ({ ...prev, purpose: purpose }));
    } else {
      setSelectedFields({ userId: user?.id });
    }
  };

  const handleFilterChange = (name, category) => {
    if (name) {
      setFilter((prev) => ({ ...prev, name: name }));
    }
    if (category) {
      setFilter((prev) => ({ ...prev, category: category }));
    }
  };
  const handleDateFilterChange = (date, dateString) => {
    console.log(date, dateString);
    setDateRange(date || null);
    // if(date?.length > 0){
    setFilter((prev) => ({
      ...prev,
      startDate: date?.[0] || "",
      endDate: date?.[1] || "",
    }));
    // }
  };
  return (
    <div className="report_summary_pg">
      <Loader loading={loadingPoints || loading || loadingUserProjects || loadingProjectPoints} global />
      <div className="overlay" />
      <h3 className="mob_heading d_none">Summary</h3>
      <div className="report_summary_container">
        <div className="summay_list">
          {isBuilder ? (
            <>
              {width > 768 ? (
                Project_Summary_List_Data.map((e) => {
                  return (
                    <div
                      className="list_item"
                      style={{ background: `${e.grdient}` }}
                    >
                      {e.icon}
                      <div className="list_text">
                        <h4>{e?.num || 0}</h4>
                        <p>{e.line}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Slider {...settings} className="summary-card-slider slider">
                  {Project_Summary_List_Data.map((e) => {
                    return (
                      <div>
                        <div
                          className="list_item"
                          key={e.id}
                          style={{ width: "100%", background: `${e.grdient}` }}
                        >
                          {e.icon}
                          <div className="list_text">
                            <h4>{e.num}</h4>
                            <p>{e.line}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </>
          ) : (
            <>
              {width > 768 ? (
                Summary_List_Data.map((e) => {
                  return (
                    <div
                      className="list_item"
                      style={{ background: `${e.grdient}` }}
                    >
                      {e.icon}
                      <div className="list_text">
                        <h4>{e?.num || 0}</h4>
                        <p>{e.line}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Slider {...settings} className="summary-card-slider slider">
                  {Summary_List_Data.map((e) => {
                    return (
                      <div>
                        <div
                          className="list_item"
                          key={e.id}
                          style={{ width: "100%", background: `${e.grdient}` }}
                        >
                          {e.icon}
                          <div className="list_text">
                            <h4>{e.num}</h4>
                            <p>{e.line}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </>
          )}
        </div>
        <div className="divider" />

        <div className="summary_map_container">
          <div className="breakDown">
            <h2>Breakdown By Area</h2>
            {!isBuilder && (
              <>
                {width > 768 ? (
              <div className="btn_container">
                <button
                  onClick={() => handleCategoryChange()}
                  className={!selectedFields?.purpose ? "active_mapBtn" : ""}
                >
                  All
                </button>
                <button
                  onClick={() => handleCategoryChange(PURPOSE.buy)}
                  className={
                    selectedFields?.purpose === PURPOSE.buy
                      ? "active_mapBtn"
                      : ""
                  }
                >
                  For Sale
                </button>
                <button
                  onClick={() => handleCategoryChange(PURPOSE.rent)}
                  className={
                    selectedFields?.purpose === PURPOSE.rent
                      ? "active_mapBtn"
                      : ""
                  }
                >
                  For Rent
                </button>
                <button
                  onClick={() => handleCategoryChange(PURPOSE.coliving)}
                  className={
                    selectedFields?.purpose === PURPOSE.coliving
                      ? "active_mapBtn"
                      : ""
                  }
                >
                  PG / Shared Living
                </button>
                <button
                  onClick={() => handleCategoryChange(PURPOSE.coworking)}
                  className={
                    selectedFields?.purpose === PURPOSE.coworking
                      ? "active_mapBtn"
                      : ""
                  }
                >
                  Co-Working
                </button>
                {/* <button
                  onClick={() => setMapBtn(6)}
                  className={mapBtn === 6 ? "active_mapBtn" : ""}
                >
                  Hot
                </button> */}
              </div>
            ) : (
              <div className="btn_container">
                <select
                  onChange={(e) => handleCategoryChange(e?.target?.value || "")}
                >
                  <option value="">All</option>
                  <option value={PURPOSE.buy}>For Sale</option>
                  <option value={PURPOSE.rent}>For Rent</option>
                  <option value={PURPOSE.coliving}>PG / Shared Living</option>
                  <option value={PURPOSE.coworking}>Co-Working</option>
                  {/* <option>Hot</option> */}
                </select>
                <p>{svg_summary_list_dropdown}</p>
              </div>
            )}
              </>
            )}
          </div>
          <div className="map_container">
            {isBuilder ? (
              <ProjectReachMap setMap={setMap} map={map} points={projectPoints || []} />
            ) : (
              <ReachMap setMap={setMap} map={map} points={points || []} />
            )}
          </div>
        </div>
        <div className="divider" />
        <h3>Leads Analytics</h3>
        <div className="summary_analytics">
          <RangePicker
            // format={customFormatter}
            // picker="month"
            mode={""}
            className="summary_date_picker"
            colorPrimary="white"
            value={dateRange}
            onChange={handleDateFilterChange}
          />
          <div className="analytics">
            {SUMMARY_ANALYTICS.map((e) => {
              return (
                <div className="analytic" id={e.id}>
                  <span>
                    {e.icon}
                    <h4>{e.word}</h4>
                  </span>
                  <div className="value">{e.num}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="line_chart_content_container">
          <div className="chart_content">
            <h3>Breakdown By Category</h3>
            {/* <div
              className="breakDown"
              style={{
                background: "none",
                padding: "0",
                border: "none",
                margin: "0",
              }}
            >
              {width > 768 ? (
                <div className="btn_container">
                  <button
                    onClick={() => setMapBtn(1)}
                    className={mapBtn === 1 ? "active_mapBtn" : ""}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setMapBtn(2)}
                    className={mapBtn === 2 ? "active_mapBtn" : ""}
                  >
                    For Sale
                  </button>
                  <button
                    onClick={() => setMapBtn(3)}
                    className={mapBtn === 3 ? "active_mapBtn" : ""}
                  >
                    For Rent
                  </button>
                  <button
                    onClick={() => setMapBtn(4)}
                    className={mapBtn === 4 ? "active_mapBtn" : ""}
                  >
                    PG / Shared Living
                  </button>
                  <button
                    onClick={() => setMapBtn(5)}
                    className={mapBtn === 5 ? "active_mapBtn" : ""}
                  >
                    Co-Working
                  </button>
                  <button
                    onClick={() => setMapBtn(6)}
                    className={mapBtn === 6 ? "active_mapBtn" : ""}
                  >
                    Hot
                  </button>
                </div>
              ) : (
                <div className="btn_container">
                  <select>
                    <option>All</option>
                    <option>For Sale</option>
                    <option>For Rent</option>
                    <option>PG / Shared Living</option>
                    <option>Co-Working</option>
                    <option>Hot</option>
                  </select>
                  <p>{svg_summary_list_dropdown}</p>
                </div>
              )}
            </div> */}
          </div>
          <div className="graph_btns">
            <span>
              <button onClick={() => handleFilterChange("whatsapp-click")}>
                Whatsapp
              </button>
              <hr
                className="graph_btns_line"
                style={
                  filter.name === "whatsapp-click"
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
              />
            </span>
            <span>
              <button onClick={() => handleFilterChange("chat-click")}>
                4DevariChat
              </button>
              <hr
                className="graph_btns_line"
                style={
                  filter.name === "chat-click" ? { opacity: 1 } : { opacity: 0 }
                }
              />
            </span>
            <span>
              <button onClick={() => handleFilterChange("email-click")}>
                Email
              </button>
              <hr
                className="graph_btns_line"
                style={
                  filter.name === "email-click"
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
              />
            </span>
          </div>
          {/* <LineGraph2 showLine={showLine} height="  322px" /> */}
          <Loader loading={loadingEvents}>
            {analyticsData?.length > 0 ? (
              <LineGraph filter={filter} height="322px" data={analyticsData} />
            ) : (
              <div
                style={{
                  minHeight: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Event Found
              </div>
            )}
          </Loader>
        </div>
        {/* <div className="divider" />
        <h3>Reach Analytics</h3>
        <div className="summary_analytics">
          <RangePicker
            format={customFormatter}
            // picker="month"
            mode={""}
            className="summary_date_picker"
            colorPrimary="white"
            allowClear={false}
          />
          <div className="analytics">
            {REACH_ANALYTICS.map((e) => {
              return (
                <div className="analytic" id={e.id}>
                  <div>
                    <div className="value">{e.num}</div>
                    <span>
                      {e.icon}
                      <h4>{e.word}</h4>
                    </span>
                  </div>
                  {e.IsStatus ? (
                    <div>
                      <p>
                        {e.status_icon}
                        {e.status}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div> */}
        {/* <div className="line_chart_content_container">
          <div className="chart_content">
            <h3>Breakdown By Date</h3>
          </div>
          <div className="graph_btns">
            <span>
              <button onClick={() => setShowLine2(1)}>Views</button>
              <hr
                className="graph_btns_line"
                style={showLine2 === 1 ? { opacity: 1 } : { opacity: 0 }}
              />
            </span>
            <span>
              <button onClick={() => setShowLine2(2)}>Clicks</button>
              <hr
                className="graph_btns_line"
                style={showLine2 === 2 ? { opacity: 1 } : { opacity: 0 }}
              />
            </span>
          </div>
          <LineGraph2 showLine={showLine} height="  322px" />
        </div> */}
        <div className="divider" />
      </div>
    </div>
  );
};

export default Report_summary;
