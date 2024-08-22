import { Button, Modal } from "antd";
// import { svg_phone_dropdown } from "../../../../public/Svgs";
import { useFormik } from "formik";
import { advertiseSchema } from "../../../../schemas/index";
import { bool, boolean } from "yup";
import { useEffect } from "react";
const PropertyAdvertiseModal = ({ isOpen, onOpen, onClose, ...props }) => {
  const blockInvalidChar = (e) => ["e", "E", "+", "-"].includes(e.key);
  const initialValues = {
    purpose: "",
    name: "",
    type: "",
    contact: "",
    city: "",
    area: "",
    check: false,
    description: "",
  };

  // const advertiseModalValidationSchema = Yup.object().shape({
  //   s_username: Yup.string().required("Username is required"),
  //   s_email: Yup.string().email("Invalid email").required("Email is required"),
  //   s_password: Yup.string().required("Password is required"),
  // });
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
    validationSchema: advertiseSchema,
    onSubmit: (values) => {
      console.log("advertise", values);
      onClose();
      resetForm();
    },
  });
  return (
    <>
      <Modal
        open={isOpen}
        wrapClassName="zilaay__property-advertise-modal"
        onCancel={() => {
          onClose();
          resetForm();
        }}
        centered
        width={1206}
        footer={false}
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z"
              fill="white"
            />
          </svg>
        }
        {...props}
      >
        <div className="property_modal_container">
          <div className="modal_form">
            <h1>Wanted Property Forms</h1>
            <div className="dual_container">
              <div className="select_field_container">
                <p className="label">Purpose</p>
                <div className="styles_select">
                  <select
                    name="purpose"
                    // id="purpose"
                    value={values.purpose}
                    onChange={handleChange}
                    style={
                      errors.purpose && {
                        border: "1px solid red",
                        borderRadius: "10px",
                      }
                    }
                    onBlur={handleBlur}
                  >
                    <option hidden>Select Purpose</option>
                    <option value="buy">Sell</option>
                    <option value="rent">Rent</option>
                    <option value="coliving space">Shared Living</option>
                    <option value="coworking space">Co-Working</option>
                  </select>
                </div>
              </div>
              <div className="input_field_container">
                <p className="label">Name</p>
                <input
                  type="text"
                  placeholder="e.g Noman Shahid"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={"input_field"}
                  style={
                    errors.name && {
                      border: "1px solid red",
                      borderRadius: "10px",
                    }
                  }
                />
              </div>
            </div>
            <div className="dual_container">
              <div className="select_field_container">
                <p className="label">Property Type:</p>
                <div className="styles_select">
                  <select
                    name="type"
                    // id="purpose"
                    value={values.type}
                    onChange={handleChange}
                    // className={errors.purpose && "error_field"}
                    onBlur={handleBlur}
                    style={
                      errors.type && {
                        border: "1px solid red",
                        borderRadius: "10px",
                      }
                    }
                  >
                    <option hidden>Select Property Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    {/* {(values.purpose === "buy" ||
                        values.purpose === "rent") && (
                        <option value="plot">Plots</option>
                      )} */}
                  </select>
                </div>
              </div>
              <div className="input_field_container">
                <p className="label">Contact</p>
                <input
                  type="text"
                  placeholder="e.g 0333 2255441"
                  name="contact"
                  id="contact"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input_field"
                  style={
                    errors.contact && {
                      border: "1px solid red",
                      borderRadius: "10px",
                    }
                  }
                />
              </div>
            </div>
            <div className="dual_container">
              <div className="dual_fields">
                <div className="select_field_container">
                  <p className="label">City</p>
                  <div className="styles_select">
                    <select
                      name="city"
                      id="city"
                      onChange={handleChange}
                      // className={errors.purpose && "error_field"}
                      onBlur={handleBlur}
                      style={
                        errors.city && {
                          border: "1px solid red",
                          borderRadius: "10px",
                        }
                      }
                    >
                      <option hidden>Select City</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      {/* {(values.purpose === "buy" ||
                        values.purpose === "rent") && (
                        <option value="plot">Plots</option>
                      )} */}
                    </select>
                  </div>
                </div>
                <div className="input_field_container">
                  <p className="label">Area, ref</p>
                  <input
                    type="text"
                    placeholder="e.g numaish near nishtar park"
                    name="area"
                    id="area"
                    value={values.area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="input_field"
                    style={
                      errors.area && {
                        border: "1px solid red",
                        borderRadius: "10px",
                      }
                    }
                  />
                </div>
              </div>
              <div className="textarea_field_container">
                <p className="label">Any Specific Requirement</p>
                <textarea
                  type="text"
                  placeholder="Write some specific requirement"
                  name="description"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input_field"
                  style={
                    errors.description && {
                      border: "1px solid red",
                      borderRadius: "10px",
                    }
                  }
                />
              </div>
            </div>
            <div className="checkbox_container">
              <input
                type="checkbox"
                name="check"
                value={false || values.check}
                onChange={handleChange}
                onBlur={handleBlur}
                style={
                  errors.check && {
                    outline: "1px solid red",
                    borderRadius: "10px",
                  }
                }
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus et pellentesque odio, sed dignissim arcu.
              </p>
            </div>
            <button onClick={handleSubmit} className="submit" type="submit">
              Submit
            </button>
          </div>
          <div className="modal_img"></div>
        </div>
      </Modal>
    </>
  );
};

export default PropertyAdvertiseModal;
