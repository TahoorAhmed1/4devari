import React, { useEffect } from "react";
import blue_pattern from "../../public/assets/landing-page-assets/blue-pattern.png";
import grey_pattern from "../../public/assets/landing-page-assets/grey-pattern.png";
import {
  svg_contact_chats,
  svg_contact_location,
  svg_contact_phone,
  svg_contact_select,
  svg_contact_send,
  svg_facebook_icon,
  svg_insta_icon,
  svg_linkdin_icon,
  svg_tiktok_icon,
  svg_youtube_icon,
} from "../../public/Svgs";
import Next from "../../components/reactSlickButtons/next";
import Prev from "../../components/reactSlickButtons/prev";
import drop_down_icon from "/public/assets/icons/drop_down.svg";
import { useFormik } from "formik";
import { contactSchema } from "../../schemas";
import { Select, message } from "antd";
import { City } from "country-state-city";
import { sendContactDetail } from "../../redux/users";
import { useDispatch } from "react-redux";
const Contact = () => {
  const dispatch = useDispatch()
  const contactValues = {
    name: "",
    email: "",
    PhoneNumber: "",
    city: "",
    subject: "",
    message: "",
  };
  const {
    values,
    handleBlur,
    touched,
    handleChange,
    errors,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: contactValues,
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(sendContactDetail({ payload: {
        name: values.name,
        email: values.email,
        phone: values.PhoneNumber,
        city: values.city,
        subject: values.subject,
        message: values.message,
      }})).then(() => {
        resetForm();
      })
    },
  });

  const cities = City.getCitiesOfCountry("PK");
  return (
    <div className="zilaay__contactUs">
      <div className="top_panel">
        <img src={blue_pattern.src} className="pattern_bg" />
        <img src={grey_pattern.src} className="pattern_bg" />
      </div>
      <div className="contact_form containers">
        <div className="content_panel">
          <form className="form_panel">
            <div className="form_content">
              <h3>We would love to hear from you!</h3>
              <div className="input_fields">
                <label>
                  <h5>
                    Your Name<span>*</span>
                  </h5>
                  {errors.name && touched.name ? (
                    <p className="Invalid">{errors.name}</p>
                  ) : (
                    ""
                  )}
                  <input
                    type="text"
                    placeholder="e.g Noman Shahid"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    style={
                      errors.name &&
                      touched.name && {
                        border: "1px solid #a70000",
                        borderRadius: "10px",
                      }
                    }
                  />
                </label>
                <label>
                  <h5>
                    Phone Number<span>*</span>
                  </h5>
                  {errors.PhoneNumber && touched.PhoneNumber ? (
                    <p className="Invalid">{errors.PhoneNumber}</p>
                  ) : (
                    ""
                  )}
                  <input
                    type="number"
                    placeholder="e.g +92 331 2525251"
                    name="PhoneNumber"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.PhoneNumber}
                    style={
                      errors.PhoneNumber &&
                      touched.PhoneNumber && {
                        border: "1px solid #a70000",
                        borderRadius: "10px",
                      }
                    }
                  />
                </label>
              </div>
              <div className="input_fields">
                <label>
                  <h5>
                    City<span>*</span>
                    <br />
                  </h5>
                  {errors.city && touched.city ? (
                    <p className="Invalid">{errors.city}</p>
                  ) : (
                    ""
                  )}
                  <div className="select_drop_icon">{svg_contact_select}</div>
                  <Select
                    name="city"
                    value={values.city || undefined}
                    onChange={(e) => setFieldValue("city", e)}
                    className={`type-select custom-select ${
                      errors.city && touched.city && "err_border"
                    }`}
                    placeholder="City"
                    virtual={false}
                    // style={errors.city && touched.city && err_border}
                  >
                    {/* <option selected disabled>
                      Select City
                    </option> */}
                    {cities.map((e, i) => {
                      return (
                        <option key={`contact-city-${i}`} value={e.name}>
                          {e.name}
                        </option>
                      );
                    })}
                  </Select>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      bottom: "16%",
                      display: "flex",
                    }}
                  >
                    <img src={drop_down_icon.src} />
                  </span>
                  {/* <select
                    name="city"
                    id="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    style={
                      errors.city &&
                      touched.city && {
                        border: "1px solid #a70000",
                        borderRadius: "10px",
                      }
                    }
                  >
                    <option>Select City</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabd">Islamabd</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                  </select> */}
                </label>
                <label>
                  <h5>
                    Email Address<span>*</span>
                  </h5>
                  {errors.email && touched.email ? (
                    <p className="Invalid">{errors.email}</p>
                  ) : (
                    ""
                  )}
                  <input
                    type="text"
                    placeholder="e.g abc@gmail.com"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    style={
                      errors.email &&
                      touched.email && {
                        border: "1px solid #a70000",
                        borderRadius: "10px",
                      }
                    }
                  />
                </label>
              </div>
              <div className="subject_field">
                <label>
                  <h5>
                    Subject<span>*</span>
                  </h5>
                  {errors.subject && touched.subject ? (
                    <p className="Invalid">{errors.subject}</p>
                  ) : (
                    ""
                  )}
                  <input
                    type="text"
                    placeholder="e.g Related to the properties"
                    name="subject"
                    id="subject"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                    style={
                      errors.subject &&
                      touched.subject && {
                        border: "1px solid #a70000",
                        borderRadius: "10px",
                      }
                    }
                  />
                </label>
              </div>
              <div className="Message_field">
                <label>
                  <h5>
                    Your Message<span>*</span>
                  </h5>
                  {errors.message && touched.message ? (
                    <p className="Invalid">{errors.message}</p>
                  ) : (
                    ""
                  )}
                  <textarea
                    name="message"
                    id="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    cols="30"
                    rows="10"
                    placeholder="Write your message..."
                    style={
                      errors.message &&
                      touched.message && {
                        border: "1px solid #a70000",
                        borderRadius: "10px",
                      }
                    }
                  />
                </label>
              </div>
              <button
                className="head_btns"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                  if (Object.keys(errors)?.length > 0) {
                    message.warning(`${Object.values(errors)[0]}`, 3);
                  }
                }}
              >
                Send Us Your Question{svg_contact_send}
              </button>
            </div>
          </form>
          <div className="head_office">
            <div className="head_office_content">
              <h3>Head Office</h3>
              <div className="adress_container">
                <p>
                  {svg_contact_location} 86- National Chamber, M.A Jinnah Road,
                  Saddar, Karachi, Pakistan
                </p>
                <p> {svg_contact_phone}021-3639093-94</p>
              </div>
              <div className="social_icon_container">
                <a href="https://www.facebook.com" className="social_icon">
                  {svg_facebook_icon}
                </a>
                <a href="https://www.instagram.com" className="social_icon">
                  {svg_insta_icon}
                </a>
                <a href="https://www.youtube.com" className="social_icon">
                  {svg_youtube_icon}
                </a>
                <a href="https://www.linkedin.com" className="social_icon">
                  {svg_linkdin_icon}
                </a>
                <a href="https://www.tiktok.com" className="social_icon">
                  {svg_tiktok_icon}
                </a>
              </div>
              <div className="map_container"></div>
              <a href={"tel:021363909394"} className="head_btns">
                Chat with us! {svg_contact_chats}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="contact_ad"></div>
      {/* <div className="explore_more_container">
        <h1>Explore More With 4Devari.com!</h1>
        <div className="cards_container">
          <Slider arrows={true} {...settings}>
            {CONTACT_CARDS_DATA.map((e) => {
              return (
                <div className="card_body" key={e.id}>
                  <img src={e.img} />
                  <div
                    className="overlay"
                    style={{ background: `${e.grdient}` }}
                  >
                    <p>{e.para}</p>
                    <div className="card_btn">
                      <p>{e.btn}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;
