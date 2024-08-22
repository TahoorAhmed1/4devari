import React, { useEffect, useRef, useState } from "react";
// import { REACH_ANALYTICS } from "../../../../data";
import { DatePicker } from "antd";
import { Chart } from "chart.js";
import {
  objectToQueryString,
  removeEmptyFields,
  useWindowSize,
} from "../../../../utils";
import { svg_summary_clicks, svg_summary_lead2 } from "../../../../public/Svgs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnalyticEventsOfUser,
  getEventsOfUser,
  getReachOfUserByDate,
} from "../../../../redux/analytic";
import { useAuth } from "../../../../contextApi";
import Loader from "../../../common/loader";
import Paginate from "../../../common/pagination";
const { RangePicker } = DatePicker;

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

    let words = filter?.category?.split("-") || "events";
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

const Reach_reports = () => {
  const dispatch = useDispatch();
  const {
    eventData,
    analyticsData,
    reachDataByDate,
    loadingReachEvents,
    loadingEvents,
  } = useSelector((state) => state.event);
  const { user } = useAuth();
  const width = useWindowSize().width;
  const [mapBtn, setMapBtn] = useState(1);
  const [filter, setFilter] = useState({ category: "view" });
  const [filterByDate, setFilterByDate] = useState({ nPerPage: 10 });
  const [dateRange, setDateRange] = useState([]);
  const [dateByDay, setDateByDay] = useState(null);

  useEffect(() => {
    if (user?.id) {
      if(user?.type === "staff") {
        dispatch(getEventsOfUser({ userId: user?.id, query: objectToQueryString({staffId: user?.id})}));
      }else {
        dispatch(getEventsOfUser({ userId: user?.id }));
      }
    }
  }, []);

  useEffect(() => {
    if (filter) {
      let query = filter;
      removeEmptyFields(query);
      if(user?.type === "staff") {
        dispatch(
          getAnalyticEventsOfUser({
            userId: user?.id,
            query: objectToQueryString({...query, staffId: user?.id}),
          })
        );
      }else {
        dispatch(
          getAnalyticEventsOfUser({
            userId: user?.id,
            query: objectToQueryString(query),
          })
        );
      }
    }
  }, [filter]);

  useEffect(() => {
    if (filterByDate) {
      let query = filterByDate;
      removeEmptyFields(query);
      if(user?.type === "staff") {
        dispatch(
          getReachOfUserByDate({
            userId: user?.id,
            query: objectToQueryString({...query, staffId: user?.id}),
          })
        );
      }else {
        dispatch(
          getReachOfUserByDate({
            userId: user?.id,
            query: objectToQueryString(query),
          })
        );
      }
    }
  }, [filterByDate]);

  const handleFilterChange = (category) => {
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

  const handleDateByDay = (date) => {
    setDateByDay(date || null);
    setFilterByDate((prev) => ({
      ...prev,
      startDate: date || "",
      endDate: date || "",
    }));
  };

  const handlePageChange = (n) => {
    if (n !== reachDataByDate?.meta?.currentPage) {
      setFilterByDate((prev) => ({ ...prev, pageNumber: n }));
    }
  };

  const REACH_ANALYTICS = [
    {
      id: 1,
      icon: svg_summary_lead2,
      num:
        (eventData?.projectViewCount || eventData?.propertyViewCount || 0) +
        (eventData?.profileViewCount || 0),
      word: "Reach",
      status: "0.00",
      // status_icon: svg_summary_status_below,
      IsStatus: false,
    },
    {
      id: 2,
      icon: svg_summary_lead2,
      num: eventData?.projectViewCount || eventData?.propertyViewCount || 0,
      word: "Views",
      status: "0.00",
      // status_icon: svg_summary_status_below,
      IsStatus: false,
    },
    {
      id: 3,
      icon: svg_summary_clicks,
      num: eventData?.leadsCount || 0,
      word: "Clicks",
      status: "0.00",
      // status_icon: svg_summary_status_below,
      IsStatus: false,
    },
    {
      id: 4,
      icon: svg_summary_lead2,
      num: eventData?.profileViewCount || 0,
      word: "Profile Views",
      status: "0.00",
      // status_icon: svg_summary_status_below,
      IsStatus: false,
    },
  ];

  return (
    <div className="reach_report_section">
      <div className="overlay" />
      <h3 className="mob_heading d_none">Reach Reports</h3>
      <div className="reach_report_container">
        <div className="reach_head">
          <h3>Reach Reports</h3>
          <RangePicker
            // format={customFormatter}
            // picker="month"
            mode={""}
            className="summary_date_picker"
            colorPrimary="white"
            value={dateRange}
            onChange={handleDateFilterChange}
          />
        </div>
        <div className="reach_report_content">
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
          <div className="line_chart_content_container">
            <div className="chart_content">
              <h3>Breakdown By Date</h3>
              {/* <div
                className="breakDown"
                style={{
                  background: "none",
                  padding: "0",
                  border: "none",
                  margin: "0",
                }}
              >
                {width > 1330 ? (
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
                <button onClick={() => handleFilterChange("view")}>
                  Views
                </button>
                <hr
                  className="graph_btns_line"
                  style={
                    filter.category === "view" ? { opacity: 1 } : { opacity: 0 }
                  }
                />
              </span>
              <span>
                <button onClick={() => handleFilterChange("click")}>
                  Clicks
                </button>
                <hr
                  className="graph_btns_line"
                  style={
                    filter.category === "click"
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                />
              </span>
            </div>
            <Loader loading={loadingEvents}>
              {analyticsData?.length > 0 ? (
                <LineGraph
                  filter={filter}
                  height="322px"
                  data={analyticsData}
                />
              ) : (
                <div
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No {filter?.category || "event"} found
                </div>
              )}
            </Loader>
          </div>
        </div>
        <div className="divider" />
        <div className="reach_posted_container">
          <h3>Reach posted (updated by the day)</h3>
          <div className="input_fields">
            <div className="input">
              <h4>Listing Date</h4>
              <DatePicker
                type="text"
                name="reach_poted_date"
                id="availableFrom"
                className="date_picker"
                value={dateByDay}
                onChange={handleDateByDay}
              />
            </div>
            {/* <div className="input">
              <h4>Purpose</h4>
              <select name="Purpose" id="purpose" placeholder="Select Purpose">
                <option disabled selected value>
                  Select Purpose
                </option>
                <option value="house">House</option>
                <option value="plot">Plot</option>
              </select>
              <p>{svg_phone_dropdown}</p>
            </div> */}
          </div>
          <div className="posted_table">
            {/* <div className="tabItem">
              <div className="head_tab list">Date</div>
              <div className="list">July 31, 2023</div>
              <div className="list">July 31, 2023</div>
              </div>
            <div className="tabItem">
              <div className="head_tab list">Property Views</div>
              <div className="list">-</div>
              <div className="list">-</div>
            </div>
            <div className="tabItem">
              <div className="head_tab list">Property Visits</div>
              <div className="list">-</div>
              <div className="list">-</div>
              </div>
              <div className="tabItem">
              <div className="head_tab list">CTR</div>
              <div className="list">-%</div>
              <div className="list">-%</div>
            </div> */}
            <Loader loading={loadingReachEvents}>
              <div className="tabItem">
                <div
                  className="head_tab list"
                  style={{ borderRadius: "5px 0px 0px 5px" }}
                >
                  Date
                </div>
                <div className="head_tab list">Views</div>
                <div
                  className="head_tab list"
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  Clicks
                </div>
              </div>
              {reachDataByDate?.data?.length > 0 ?
                reachDataByDate?.data?.map((ev) => {
                  return (
                    <div key={`reach-by-date-${ev?._id}`} className="tabItem">
                      <div className="list">
                        {" "}
                        {new Date(ev?.date)?.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          // year: "2-digit",
                        })}
                      </div>
                      <div className="list"> {ev?.perDayViewsCount}</div>
                      <div className="list">{ev?.perDayClicksCount}</div>
                    </div>
                  );
                }) : (
                  <div
                    style={{
                      minHeight: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No {"event"} found
                  </div>
                )}
            </Loader>
          </div>
          <div className="blog_cards_num_container">
            <Paginate
              handlePageChange={handlePageChange}
              data={reachDataByDate}
              align="flex-end"
            />
          </div>
        </div>
        <div className="divider" />
      </div>
    </div>
  );
};

export default Reach_reports;
