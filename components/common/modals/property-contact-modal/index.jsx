import { Button, Modal } from "antd";
import { svg_phone_dropdown } from "../../../../public/Svgs";
import { useFormik } from "formik";
import { modalSchema } from "../../../../schemas";
const PropertyContactModal = ({ isOpen, onOpen, onClose, ...props }) => {
  const blockInvalidChar = (e) => ["e", "E", "+", "-"].includes(e.key);
  const initialValues = {
    name: "",
    email: "",
    PhonerNumber: "",
    radio: "",
    radio2: "",
    radio3: "",
    termsOfService: false,
    termsOfService1: false,
    termsOfService2: false,
  };
  const {
    values,
    handleBlur,
    touched,
    handleChange,
    errors,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: modalSchema,
    onSubmit: (values) => {
      console.log("registration", values);
      onClose();
      resetForm();
    },
  });
  return (
    <>
      <Modal
        open={isOpen}
        wrapClassName="zilaay__property-modal"
        onCancel={() => {
          onClose();
          resetForm();
        }}
        centered
        width={1206}
        footer={false}
        closeIcon={<Button className="close">X</Button>}
        {...props}
      >
        <div className="property_modal_container">
          <div className="property_modal_content">
            <div className="request_head">
              <h3> You are requesting to view advertiser details.</h3>
            </div>
            <div className="requesting_content">
              <div className="by_dealer">
                <h4>Posted by Dealer:</h4>
                <p className="p-normal">+92 98***543**| *****@*****.com</p>
                <p className="p-small">Muhammad Haris</p>
              </div>
              <div className="posted_on">
                <h4>Posted on 24th Mar, 2023:</h4>
                <p className="p-normal">PKR4.05 Crore | New Horizon</p>
                <p className="p-small">
                  1050 sq.ft. | 2 BHK Residential Apartment
                </p>
              </div>
            </div>

            <div className="request_head">
              <h3>
                Please fill in your details to be shared with this advertiser
                only.
              </h3>
            </div>
            <div className="fill_detail">
              <div className="basic_info">
                <h4>Basic Information</h4>
                <div className="basic_content">
                  <div className="content_forum_option">
                    <p className="p-normal">Your reason to buy is</p>
                    <label className="check">
                      <p>Investment</p>
                      <input
                        type="radio"
                        name="radio"
                        onChange={handleChange}
                        value="Investment"
                        checked={values.radio === "Investment"}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="check">
                      <p> Self Use</p>
                      <input
                        type="radio"
                        name="radio"
                        onChange={handleChange}
                        value="Self Use"
                        checked={values.radio === "Self Use"}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  {errors.radio && touched.radio ? (
                    <p className="radio_error">Please select option</p>
                  ) : (
                    ""
                  )}
                  <div className="content_forum_option">
                    <p className="p-normal">Are you a property dealer</p>
                    <label className="check">
                      <p>Yes</p>
                      <input
                        type="radio"
                        name="radio2"
                        onChange={handleChange}
                        value="Yes"
                        checked={values.radio2 === "Yes"}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="check">
                      <p> No</p>
                      <input
                        type="radio"
                        name="radio2"
                        onChange={handleChange}
                        value="No"
                        checked={values.radio2 === "No"}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  {errors.radio2 && touched.radio2 ? (
                    <p className="radio_error">Please select option</p>
                  ) : (
                    ""
                  )}
                  <form className="search_input">
                    {errors.name && touched.name ? (
                      <p className="Invalid">{errors.name}</p>
                    ) : (
                      <p
                        className="Valid"
                        style={{
                          color: "transparent",
                          background: "transparent",
                        }}
                      >
                        Valid
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      value={values.name}
                      name="name"
                      id="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.PhonerNumber && touched.PhonerNumber ? (
                      <p className="Invalid">{errors.PhonerNumber}</p>
                    ) : (
                      <p
                        className="Valid"
                        style={{
                          color: "transparent",
                          background: "transparent",
                        }}
                      >
                        Valid
                      </p>
                    )}
                    <span className="phone_no_container">
                      <div className="country_code">
                        <span className="svgimg">{svg_phone_dropdown}</span>
                        <select>
                          <option value="+92">+92</option>
                          <option value="+91">+91</option>
                          <option value="+93">+93</option>
                          <option value="+94">+94</option>
                          <option value="+95">+95</option>
                          <option value="+96">+96</option>
                          <option value="+97">+97</option>
                        </select>
                      </div>
                      <input
                        type="number"
                        placeholder="Phone Number"
                        name="PhonerNumber"
                        id="PhonerNumber"
                        className="phone_input"
                        onKeyDown={blockInvalidChar}
                        value={values.PhonerNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </span>
                    {errors.email && touched.email ? (
                      <p className="Invalid">{errors.email}</p>
                    ) : (
                      <p
                        className="Valid"
                        style={{
                          color: "transparent",
                          background: "transparent",
                        }}
                      >
                        Valid
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Enter your Email"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </form>
                </div>
              </div>
              <div className="optional_info">
                <h4>Optional Information</h4>
                {errors.radio3 && touched.radio3 ? (
                  <p className="termsOfService_error">Please select option</p>
                ) : (
                  ""
                )}
                <p className="p-normal" style={{ marginTop: "10px" }}>
                  By when you are planning to buy the property?
                </p>

                <div className="content_forum_option">
                  <label className="check">
                    <p>3 months</p>
                    <input
                      type="radio"
                      name="radio3"
                      onChange={handleChange}
                      value="3 months"
                      checked={values.radio3 === "3 months"}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="check">
                    <p> 6 months</p>
                    <input
                      type="radio"
                      name="radio3"
                      onChange={handleChange}
                      value="6 months"
                      checked={values.radio3 === "6 months"}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="check">
                    <p> More than 6 months</p>
                    <input
                      type="radio"
                      name="radio3"
                      onChange={handleChange}
                      value="More than 6 months"
                      checked={values.radio3 === "More than 6 months"}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="checkbox_options">
                  {(errors.termsOfService && touched.termsOfService) ||
                  (errors.termsOfService1 && touched.termsOfService1) ||
                  (errors.termsOfService2 && touched.termsOfService2) ? (
                    <p className="termsOfService_error">
                      Please agreed all the terms
                    </p>
                  ) : (
                    ""
                  )}

                  <label className="check_label">
                    <input
                      type="checkbox"
                      name="termsOfService"
                      value="true"
                      onChange={handleChange}
                      checked={values.termsOfService}
                      className={errors.termsOfService ? "termsOfService" : ""}
                    />
                    I am interested in home loan
                  </label>
                  <label className="check_label">
                    <input
                      type="checkbox"
                      name="termsOfService1"
                      value="true"
                      onChange={handleChange}
                      checked={values.termsOfService1}
                      className={errors.termsOfService1 ? "termsOfService" : ""}
                    />
                    I am interested in site visits.
                  </label>
                  <label className="check_label">
                    <input
                      type="checkbox"
                      name="termsOfService2"
                      value="true"
                      onChange={handleChange}
                      checked={values.termsOfService2}
                      className={errors.termsOfService2 ? "termsOfService" : ""}
                    />
                    I agree to be contacted by 4Devari.com for similar
                    properties or related services via WhatsApp, phone, sms,
                    e-mail etc.
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="adviser_detail"
                >
                  View Advertiser Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PropertyContactModal;
