import React, { useEffect, useState } from "react";
import {
  objectToQueryString,
  removeEmptyFields,
  useWindowSize,
} from "../../utils";
import { useInView } from "react-intersection-observer";
import ResetIcon from "/public/assets/icons/reset.svg";
import drop_down_icon from "/public/assets/icons/drop_down.svg";
import rightImg1 from "../../public/assets/agency_search_output/right_img1.jpg";
import rightImg2 from "../../public/assets/agency_search_output/right_img2.png";
import rightImg3 from "../../public/assets/agency_search_output/right_img3.jpg";
import agent_Img from "/public/assets/agency_search_output/cardImg1.png";
import Image from "next/image";
import Paginate from "../common/pagination";
import { City } from "country-state-city";
import { svg_output_search } from "../../public/Svgs";
import { useFormik } from "formik";
import BuilderCard from "../builderCard";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { fetchbuilders } from "../../redux/users";

const Builder_output_content = ({ builders }) => {
  const width = useWindowSize().width;
  const dispatch = useDispatch();
  // Function to handle button click
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const { ref: topPanelRef, inView: topPanelInView } = useInView({
    threshold: 0,
  });
  const cities = City.getCitiesOfCountry("PK");

  useEffect(() => {
    setIsTopPanelSticky(!topPanelInView);
  }, [topPanelInView]);

  const formik = useFormik({
    initialValues: {
      builderName: "",
      city: "",
      verificationType: "",
    },
    onSubmit: (values) => {
      let data = { ...values };
      removeEmptyFields(data);
      dispatch(fetchbuilders(objectToQueryString(data)));
    },
  });

  const handlePageChange = (n) => {
    if (n !== builders?.meta?.currentPage) {
      let data = { ...formik.values, nPerPage: 10, pageNumber: n };
      removeEmptyFields(data);
      dispatch(fetchbuilders(objectToQueryString(data)));
    }
  };

  return (
    <div className="zilaay_agency_output_container">
      <div className="builder_banner" />
      <div className="container">
        <div className="content_container">
          <div className="back_link containers" id="scroll-to-agency-detail">
            {/* <p>4devari</p>
            {">"}
            <p>Agent</p>
            {">"}
            <p className="p_active">Karachi</p> */}
          </div>

          <div ref={topPanelRef} />

          {/* {width > 768 && ( */}
          <div
            style={{
              position: width > 768 && isTopPanelSticky && "fixed",
              top: width > 768 && isTopPanelSticky && "-1px",
              width: width > 768 && isTopPanelSticky && "100vw",
              borderRadius: width > 768 && isTopPanelSticky && "0",
              marginTop: width > 768 && isTopPanelSticky && "0",
            }}
            className="stats_panel"
          >
            <div
              style={{
                margin: width > 768 && isTopPanelSticky && "0px 14px",
              }}
              className="btns_container"
            >
              <div className="styles_input">
                <input
                  type="text"
                  placeholder="Enter Builder Name"
                  name="builderName"
                  value={formik.values.builderName}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="styles_select styles_input">
                <Select
                  name="city"
                  value={formik.values.city || undefined}
                  onChange={(e) => formik.setFieldValue("city", e)}
                  className="type-select custom-select"
                  placeholder="City"
                  virtual={false}
                >
                  <option hidden>Select City</option>
                  {cities.map((e, i) => {
                    return (
                      <option key={`builders-output-city-${i}`} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </Select>
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    display: "flex",
                  }}
                >
                  <img src={drop_down_icon.src} alt="Dropdown" />
                </span>
              </div>

              <div className="styles_input">
                <Select
                  name="verificationType"
                  value={formik.values.verificationType || undefined}
                  onChange={(e) => formik.setFieldValue("verificationType", e)}
                  className={`type-select custom-select`}
                  placeholder="Builder Type"
                >
                  <option value="all">All</option>
                  <option value="elite">Elite</option>
                  <option value="basic">Basic</option>
                </Select>
                {/* {isApiLoaded && (
                  <Autocomplete
                    onLoad={onLoadLocation}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                      types: ["address"],
                      restrictions: { country: "PK" },
                    }}
                    className="styles_input"
                  >
                    <input
                      type="text"
                      placeholder="Enter Location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                    />
                  </Autocomplete>
                )} */}
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    display: "flex",
                  }}
                >
                  <img src={drop_down_icon.src} alt="Dropdown tye" />
                </span>
              </div>
              <div
                className="styles_search"
                onClick={() => {
                  formik.resetForm();
                  formik.handleSubmit();
                }}
              >
                <Image src={ResetIcon} alt="Rest" />
              </div>
              <div className="styles_search" onClick={formik.handleSubmit}>
                {svg_output_search}
              </div>
            </div>
          </div>

          {/* )} */}
          <div className="details_container">
            <div className="left_panel_container">
              <div className="left_panel">
                {builders?.data?.map((e, i) => {
                  return (
                    <BuilderCard
                      key={`builder-output-card-${i}`}
                      name={e?.builderName}
                      bgImg={e?.builderCoverPicture || agent_Img.src}
                      number={
                        (e?.user?.mobileNumbers.length > 0 &&
                          e?.user?.mobileNumbers) ||
                        e?.user?.landlineNumber ||
                        e?.additionalMobileNumber ||
                        "0323423423423"
                      }
                      whatsapp={e?.user?.whatsapp}
                      email={e?.user?.email}
                      locate={e?.address}
                      totalProjects={e?.totalProjects}
                      logo={e?.builderLogo}
                      id={e?.user?._id}
                    />
                  );
                })}
              </div>
              {(!builders ||
                !builders?.data ||
                builders?.data?.length === 1) && (
                <div className={"dataNotFound"}>
                  <div className={"notFoundImg"} />
                  Oops! No Property found
                </div>
              )}
              <div className="blog_cards_num_container">
                <Paginate
                  handlePageChange={handlePageChange}
                  data={builders}
                  align="center"
                />
              </div>
            </div>
            <div className="right_panel">
              <div className="imgs_content">
                <Image
                  src={rightImg1}
                  alt="Builer Add 1"
                  className="right_img"
                />
                <Image
                  src={rightImg2}
                  alt="Builer Add 2"
                  className="right_img"
                />
                <Image
                  src={rightImg3}
                  alt="Builer Add 3"
                  className="right_img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder_output_content;
