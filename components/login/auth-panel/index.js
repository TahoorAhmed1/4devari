import React, { useState, useEffect } from "react";
import classes from "./auth-panel.module.css";
import apple from "../../../public/assets/icons/apple.svg";
import facebook from "../../../public/assets/icons/facebook.svg";
import google from "../../../public/assets/icons/google.svg";
import eye from "../../../public/assets/icons/eye.svg";
import blind from "../../../public/assets/icons/blind1.png";
import * as Yup from "yup";
import {
  loginValidationSchema,
  changePasswordValidationSchema,
  forgotValidationSchema,
} from "./auth_schema";
import { Formik, Field, ErrorMessage } from "formik";
import {
  facebookSignIn,
  googleSignIn,
  signInByEmail,
  signUpAsAgency,
  signUpAsBuilder,
  signUpAsEndUser,
} from "../../../api/auth/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Spin } from "antd";
import { Button, message } from "antd";
import { useAuth } from "../../../contextApi";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "../../../redux/request";

function AuthPanel({ defaultActivePage = "login", resetCode }) {
  const { signUp } = useAuth();
  const router = useRouter();
  const [showPasswords, setShowPasswords] = useState({});

  const [activePage, setActivePage] = useState(defaultActivePage);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(0);

  // useEffect(() => {
  //   if (setChangeSign) {
  //     if (activePage === "login") {
  //       setChangeSign(true);
  //     } else {
  //       setChangeSign(false);
  //     }
  //   }
  // }, [activePage]);

  const togglePasswordVisibility = (inputId) => {
    setShowPasswords({
      ...showPasswords,
      [inputId]: !showPasswords[inputId] || false,
    });
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 18,
        color: "white",
      }}
      spin
    />
  );

  message.config({
    bottom: 50,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const loadingToast = (msg) => {
    messageApi.open({
      type: "loading",
      content: msg,
      duration: 0,
    });
    setTimeout(messageApi.destroy, 2500);
  };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const loginInitialValues = {
    email: "",
    password: "",
  };
  const forgotInitialValues = {
    f_email: "",
  };
  const changePasswordInitialValues = {
    c_password: "",
    c_confirmPassword: "",
  };

  const signupInitialValues = {
    s_username: "",
    s_email: "",
    s_password: "",
    s_mobileNumber: "",
    // ...(userRole === 1 && userRole !== 2
    //   ? {
    sa_agencyCity: "",
    sa_agencyName: "",
    sa_agencyEmail: "",
    sa_agencyMobileNumber: "",
    sa_agencyWhatsappNumber: "",
    // }
    // : userRole === 2 && userRole !== 1
    // ? {
    sb_builderName: "",
    sb_builderCity: "",
    sb_builderAddress: "",
    sb_builderEmail: "",
    sb_builderMobile: "",
    sb_builderWhatsappNumber: "",
    //   }
    // : userRole !== 1 && userRole !== 2 && { Individual: "true" }),
  };
  if (userRole === 1) {
    // signupInitialValues.sa_agencyCity = `Condition Met Value${userRole}`;
    signupInitialValues.sa_agencyCity = ``;
  } else {
    // signupInitialValues.sa_agencyCity = `Condition Not Met Value${userRole}`;
    signupInitialValues.sa_agencyCity = ``;
  }
  const signupValidationSchema = Yup.object().shape({
    s_username: Yup.string().required("Username is required"),
    s_email: Yup.string().email("Invalid email").required("Email is required"),
    s_password: Yup.string().required("Password is required"),
    s_mobileNumber: Yup.string()
      .required("Mobile number is required")
      .test("isRequired", "Mobile number is required", function (value) {
        if (userRole === 1 && userRole !== 2) {
          return Yup.string().required().isValidSync(value);
        }

        return true;
      }),

    sa_agencyCity: Yup.string().test(
      "isRequired",
      "Agency City is required",
      function (value) {
        if (userRole === 1 && userRole !== 2) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sa_agencyName: Yup.string().test(
      "isRequired",
      "Agency Name is required",
      function (value) {
        if (userRole === 1 && userRole !== 2) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sa_agencyEmail: Yup.string().test(
      "isRequired",
      "Agency Email is required",
      function (value) {
        if (userRole === 1 && userRole !== 2) {
          return Yup.string()
            .email()
            .required("Invalid email")
            .isValidSync(value);
        }
        return true;
      }
    ),
    sa_agencyMobileNumber: Yup.string().test(
      "isRequired",
      "Agency Mobile Numuber is required",
      function (value) {
        if (userRole === 1 && userRole !== 2) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sa_agencyWhatsappNumber: Yup.string().test(
      "isRequired",
      "Agency Whatsapp is required",
      function (value) {
        if (userRole === 1 && userRole !== 2) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),

    sb_builderName: Yup.string().test(
      "isRequired",
      "Builder Name is required",
      function (value) {
        if (userRole === 2 && userRole !== 1) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sb_builderCity: Yup.string().test(
      "isRequired",
      "Builder City is required",
      function (value) {
        if (userRole === 2 && userRole !== 1) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sb_builderAddress: Yup.string().test(
      "isRequired",
      "Builder Address is required",
      function (value) {
        if (userRole === 2 && userRole !== 1) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sb_builderEmail: Yup.string().test(
      "isRequired",
      "Builder Email is required",
      function (value) {
        if (userRole === 2 && userRole !== 1) {
          return Yup.string()
            .email("Invalid email")
            .required()
            .isValidSync(value);
        }
        return true;
      }
    ),
    sb_builderMobile: Yup.string().test(
      "isRequired",
      "Builder Mobile is required",
      function (value) {
        if (userRole === 2 && userRole !== 1) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    sb_builderWhatsappNumber: Yup.string().test(
      "isRequired",
      "Builder Whatsapp Number is required",
      function (value) {
        if (userRole === 2 && userRole !== 1) {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
  });
  // Google SignIn
  const handleGoogleSignIn = async () => {
    try {
      loadingToast("Signing In");
      setLoading(true);
      const resp = await googleSignIn();
      console.log(resp);
      // signUp(resp);
      // setLoading(false);
      // success("Signed In");
      // await delay(1500);
      // router.push("/")
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (e?.response?.data?.message) {
        error(e.response.data.message);
      } else {
        error("Error Signing In");
      }
    }
  };

  // Facebook SignIn
  const handleFacebookSignIn = async () => {
    try {
      loadingToast("Signing In");
      setLoading(true);
      const resp = await facebookSignIn();
      console.log(resp);
      // signUp(resp);
      // setLoading(false);
      // success("Signed In");
      // await delay(1500);
      // router.push("/")
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (e?.response?.data?.message) {
        error(e.response.data.message);
      } else {
        error("Error Signing In");
      }
    }
  };

  const handleLoginSubmit = async (values) => {
    try {
      loadingToast("Signing In");
      setLoading(true);
      const resp = await signInByEmail(values?.email, values?.password);
      console.log(resp);
      signUp(resp);
      setLoading(false);
      success("Signed In");
      await delay(1000);
      router.push("/");
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (e.response.data.message) {
        error(e.response.data.message);
      } else {
        error("Error Signing In");
      }
    }
  };

  const handleSignupSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      if (userRole === 1 && userRole !== 2) {
        const resp = await signUpAsAgency(
          values?.s_username,
          values?.s_email,
          values?.s_password,
          values?.s_mobileNumber,
          values?.sa_agencyName,
          values?.sa_agencyCity,
          values?.sa_agencyEmail,
          values?.sa_agencyMobileNumber,
          values?.sa_agencyWhatsappNumber
        );
        setLoading(false);
      } else if (userRole === 2 && userRole !== 1) {
        const resp = await signUpAsBuilder(
          values?.s_username,
          values?.s_email,
          values?.s_password,
          values?.s_mobileNumber,
          values?.sb_builderName,
          values?.sb_builderAddress,
          values?.sb_builderEmail,
          values?.sb_builderMobile,
          values?.sb_builderWhatsappNumber,
          values?.sb_builderCity
        );
        setLoading(false);
      } else {
        const resp = await signUpAsEndUser(
          values?.s_username,
          values?.s_email,
          values?.s_password
        );
        setLoading(false);
      }
      success("Signed Up");
      success("Confirmation sent to your email");
      router.push("/login")
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (e.response.data.message) {
        error(e.response.data.message);
      } else {
        error("Error Signing Up");
      }
    }
    console.log(values);
  };

  const handleChangePasswordSubmit = async (values, { resetForm }) => {
    if(resetCode){
      axios.patch(`${BASE_URL}/user/resetPassword/${resetCode}`, {
        newPassword: values.c_password
      }).then(() => {
        success("Password reset successfully");
        router.push('/login');
      }).catch(() => {
        error("Password reset failed");
      })
    }
    resetForm();
  };
  const handleForgotSubmit = async (values, { resetForm }) => {
    console.log("Forgot password", values);
    if(values.f_email){
      axios.get(`${BASE_URL}/user/sendForgotPasswordEmail/${values.f_email}`).then(() => {
        success("Reset instruction sent to your email");
      }).catch(() => {
        error("Invaild email");
      })
    }
    resetForm();
  };

  return (
    <div
      className={
        activePage === "changePassword" || activePage === "forgot"
          ? `${classes.panel_body_change_password}`
          : `${classes.panel_body}`
      }
    >
      {contextHolder}
      <div className={classes.content_container}>
        {activePage === "changePassword" ? (
          <>
            <h2 className={classes.heading}>Welcome To 4Devari.com</h2>
            <p className={classes.sub_heading}>Please change your password.</p>
            <Formik
              initialValues={changePasswordInitialValues}
              validationSchema={changePasswordValidationSchema}
              onSubmit={handleChangePasswordSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                touched,
                handleBlur,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={classes.form_container}>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>New Password</p>
                      <div className={classes.input_field_container}>
                        <img
                          src={
                            showPasswords.password3
                              ? `${blind.src}`
                              : `${eye.src}`
                          }
                          onClick={() => togglePasswordVisibility("password3")}
                          style={{ cursor: "pointer" }}
                        />
                        <Field
                          id="password3"
                          name="c_password"
                          type={showPasswords.password3 ? "text" : "password"}
                          value={values.c_password}
                          placeholder="Enter your password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={
                            errors.c_password && touched.c_password
                              ? classes.input_field_error
                              : classes.input_field
                          }
                          style={{ marginBottom: "10px" }}
                        />
                        {errors.c_password && touched.c_password && (
                          <p className={classes.error}>{errors.c_password}</p>
                        )}
                      </div>
                    </div>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Confirm Password</p>
                      <div className={classes.input_field_container}>
                        <img
                          src={
                            showPasswords.password4
                              ? `${blind.src}`
                              : `${eye.src}`
                          }
                          onClick={() => togglePasswordVisibility("password4")}
                          style={{ cursor: "pointer" }}
                        />
                        <Field
                          id="password4"
                          name="c_confirmPassword"
                          type={showPasswords.password4 ? "text" : "password"}
                          value={values.c_confirmPassword}
                          placeholder="Enter your password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={
                            errors.c_confirmPassword &&
                            touched.c_confirmPassword
                              ? classes.input_field_error
                              : classes.input_field
                          }
                          style={{ marginBottom: "10px" }}
                        />
                        {errors.c_confirmPassword &&
                          touched.c_confirmPassword && (
                            <p className={classes.error}>
                              {errors.c_confirmPassword}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                  <button className="primary_btn" type="submit">
                    <p>Confirm</p>
                    {loading && <Spin indicator={antIcon} />}
                  </button>
                </form>
              )}
            </Formik>
          </>
        ) : activePage === "forgot" ? (
          <>
            <h2 className={classes.heading}>Welcome To 4Devari.com</h2>
            <p className={classes.sub_heading}>
              Enter your email address so we'll send you the link to reset
              password.
            </p>
            <Formik
              initialValues={forgotInitialValues}
              validationSchema={forgotValidationSchema}
              onSubmit={handleForgotSubmit}
            >
              {({
                handleSubmit,
                errors,
                touched,
                handleChange,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={classes.form_container}>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Your Email</p>
                      <div className={classes.input_field_container}>
                        <Field
                          id="email"
                          name="f_email"
                          type={"email"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.f_email ||
                            (errors.f_email && touched.f_email)
                              ? classes.input_field_error
                              : classes.input_field
                          }
                          placeholder="nomanshahid@gmail.com"
                        />
                        {(errors.f_email ||
                          (errors.f_email && touched.f_email)) && (
                          <p className={classes.error}>{errors?.f_email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="primary_btn" type="submit">
                    <p>Submit</p>
                    {loading && <Spin indicator={antIcon} />}
                  </button>
                </form>
              )}
            </Formik>
            <div className={classes.fogot_back_btns}>
              <h2
                className={classes.fogot_back}
                onClick={() => setActivePage("login")}
              >
                <span>{"<"}</span>Login
              </h2>
              <h2 className={classes.fogot_back}>
                <Link href={"/signup"}>
                  {" "}
                  SignUp<span>{">"}</span>
                </Link>
              </h2>
            </div>
          </>
        ) : activePage === "login" ? (
          <>
            <h2 className={classes.heading}>Welcome To 4Devari.com</h2>
            <p className={classes.sub_heading}>Sign in to your account</p>
            <Formik
              initialValues={loginInitialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleLoginSubmit}
            >
              {({
                handleSubmit,
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={classes.form_container}>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Your Email</p>
                      <Field
                        id="login_email"
                        name="email"
                        placeholder="nomanshahid@gmail.com"
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email
                            ? classes.input_field_error
                            : classes.input_field
                        }
                      />
                      {errors.email && touched.email && (
                        <p className={classes.error}>{errors.email}</p>
                      )}
                    </div>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Password</p>

                      <div className={classes.input_field_container}>
                        <img
                          src={
                            showPasswords.password1
                              ? `${blind.src}`
                              : `${eye.src}`
                          }
                          onClick={() => togglePasswordVisibility("password1")}
                          style={{ cursor: "pointer" }}
                        />
                        <Field
                          id="password1"
                          name="password"
                          type={showPasswords.password1 ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your password"
                          className={
                            errors?.password && touched.password
                              ? classes.input_field_error
                              : classes.input_field
                          }
                          style={{ marginBottom: "10px" }}
                        />
                        {errors?.password && touched.password && (
                          <p className={classes.error}>{errors?.password}</p>
                        )}
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        flexWrap: "wrap",
                        whiteSpace: "nowrap",
                        gap: "15px",
                      }}
                    >
                      <div className="checkbox_with_label">
                        <input type={"checkbox"} className={classes.checkbox} />
                        <p className={classes.remember_me_text}>Remember Me</p>
                      </div>
                      <p
                        className={classes.forgot_password}
                        onClick={() => {
                          setActivePage("forgot");
                        }}
                      >
                        Forgot Password?
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        console.log(errors);
                      }}
                      disabled={loading}
                      onSubmit={handleLoginSubmit}
                      className="primary_btn"
                    >
                      <p>LOGIN</p>
                      {loading && <Spin indicator={antIcon} />}
                    </button>
                    <div className={classes.continue_container}>
                      <div className={classes.line_left} />
                      <p className={classes.continue_with}>or continue with </p>
                      <div className={classes.line_right} />
                    </div>
                    <div className={classes.social_media_btns}>
                      {/* <div className={classes.apple_btn}>
                        <img src={facebook.src} />
                        <p>Connect with Apple</p>
                      </div> */}
                      <button
                        disabled={loading}
                        className={classes.facebook_btn}
                        onClick={handleFacebookSignIn}
                      >
                        <img src={apple.src} />
                        <p>Connect with Facebook</p>
                        {loading && <Spin indicator={antIcon} />}
                      </button>
                      <button
                        disabled={loading}
                        className={classes.google_btn}
                        onClick={handleGoogleSignIn}
                      >
                        <img src={google.src} />
                        <p>Connect with Gmail</p>
                        {loading && <Spin indicator={antIcon} />}
                      </button>
                    </div>

                    <p className={classes.signup_link}>
                      Don't have an account?{" "}
                      <span>
                        <Link href={"/signup"}> Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </>
        ) : activePage === "signup" ? (
          <>
            <h2 className={classes.heading}>Welcome To 4Devari.com</h2>
            <p className={classes.sub_heading}>
              Sign up and create new account
            </p>
            <Formik
              initialValues={signupInitialValues}
              validationSchema={signupValidationSchema}
              onSubmit={handleSignupSubmit}
            >
              {({
                handleSubmit,
                errors,
                touched,
                handleChange,
                values,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={classes.form_container}>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Your Name</p>
                      <Field
                        id="username"
                        name="s_username"
                        value={values?.s_username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors?.s_username && touched.s_username
                            ? classes.input_field_error
                            : classes.input_field
                        }
                        placeholder="e.g Noman Shahid"
                      />
                      {/* Need to update in all signup field */}
                      {errors?.s_username && touched.s_username && (
                        <p className={classes.error}>{errors.s_username}</p>
                      )}
                    </div>
                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Your Email</p>
                      <div className={classes.input_field_container}>
                        <Field
                          id="signup_email"
                          name="s_email"
                          type={"email"}
                          value={values.s_email}
                          onChange={handleChange}
                          className={
                            errors?.s_email && touched.s_email
                              ? classes.input_field_error
                              : classes.input_field
                          }
                          placeholder="nomanshahid@gmail.com"
                        />
                        {errors?.s_email && touched.s_email && (
                          <p className={classes.error}>{errors?.s_email}</p>
                        )}
                      </div>
                    </div>

                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Password</p>

                      <div className={classes.input_field_container}>
                        <img
                          src={
                            showPasswords.password2
                              ? `${blind.src}`
                              : `${eye.src}`
                          }
                          onClick={() => togglePasswordVisibility("password2")}
                          style={{ cursor: "pointer" }}
                        />
                        <Field
                          id="password2"
                          name="s_password"
                          type={showPasswords.password2 ? "text" : "password"}
                          value={values.s_password}
                          onChange={handleChange}
                          className={
                            errors?.s_password && touched.s_password
                              ? classes.input_field_error
                              : classes.input_field
                          }
                          placeholder="Create Password"
                          style={{ marginBottom: "10px" }}
                        />
                        {errors?.s_password && touched.s_password && (
                          <p className={classes.error}>{errors?.s_password}</p>
                        )}
                        <p className={classes.password_rule}>
                          At least 8 characters
                        </p>
                        <p className={classes.password_rule}>
                          Mix of letters and numbers
                        </p>
                        <p className={classes.password_rule}>
                          At least 1 special characters
                        </p>
                        <p className={classes.password_rule}>
                          At least 1 uppercase and 1 lowercase letter
                        </p>
                      </div>
                    </div>

                    <div className={classes.single_input_container}>
                      <p className={classes.label}>Your Mobile Number</p>
                      <div className={classes.input_field_container}>
                        {/* <img
                          src={
                            showPasswords.password5
                              ? `${blind.src}`
                              : `${eye.src}`
                          }
                          onClick={() => togglePasswordVisibility("password5")}
                          style={{ cursor: "pointer" }}
                        /> */}
                        <Field
                          id="mobileNumber"
                          name="s_mobileNumber"
                          onChange={handleChange}
                          // type={showPasswords.password5 ? "text" : "password"}
                          type="text"
                          value={values.s_mobileNumber}
                          placeholder="e.g (+923310983462)"
                          className={
                            errors?.s_mobileNumber && touched.s_mobileNumber
                              ? classes.input_field_error
                              : classes.input_field
                          }
                        />
                        {errors?.s_mobileNumber && touched.s_mobileNumber && (
                          <p className={classes.error}>
                            {errors?.s_mobileNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      onClick={() => {
                        setUserRole(1);
                        console.log(userRole);
                      }}
                      className={
                        userRole === 1
                          ? classes.hollow_btn_active
                          : classes.hollow_btn_inactive
                      }
                    >
                      <p>As an Agency</p>
                    </div>

                    <div
                      onClick={() => {
                        setUserRole(2);
                      }}
                      className={
                        userRole === 2
                          ? classes.hollow_btn_active
                          : classes.hollow_btn_inactive
                      }
                    >
                      <p>As a Builder</p>
                    </div>
                  </div>

                  <div className={classes.individual_check}>
                    <Checkbox
                      checked={userRole === 0}
                      onChange={(e) => {
                        e.target.checked ? setUserRole(0) : setUserRole(1);
                      }}
                    >
                      Individual
                    </Checkbox>
                  </div>

                  <div className={classes.form_container}>
                    {userRole === 1 ? (
                      <>
                        <div className={classes.single_input_container}>
                          <p className={classes.label}>City</p>
                          <Field
                            id="agencyCity"
                            name="sa_agencyCity"
                            className={
                              errors?.sa_agencyCity && touched.sa_agencyCity
                                ? classes.input_field_error
                                : classes.input_field
                            }
                            placeholder="Select your city"
                          />
                          {errors?.sa_agencyCity && (
                            <p className={classes.error}>
                              {errors?.sa_agencyCity}
                            </p>
                          )}
                        </div>
                        <div className={classes.single_input_container}>
                          <p className={classes.label}>Agency Name</p>
                          <div className={classes.input_field_container}>
                            <Field
                              id="agencyName"
                              name="sa_agencyName"
                              className={
                                errors?.sa_agencyName ||
                                (errors?.sa_agencyName && touched.sa_agencyName)
                                  ? classes.input_field_error
                                  : classes.input_field
                              }
                              placeholder="Agency Name"
                            />
                            {(errors?.sa_agencyName ||
                              (errors?.sa_agencyName &&
                                touched.s_type[sa_agencyName])) && (
                              <p className={classes.error}>
                                {errors?.sa_agencyName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={classes.single_input_container}>
                          <p className={classes.label}>Your Email</p>
                          <Field
                            id="agencyEmail"
                            name="sa_agencyEmail"
                            type={"sa_agencyEmail"}
                            className={
                              errors?.sa_agencyEmail
                                ? classes.input_field_error
                                : classes.input_field
                            }
                            placeholder="nomanshahid@gmail.com"
                          />
                          {errors?.sa_agencyEmail && (
                            <p className={classes.error}>
                              {errors?.sa_agencyEmail}
                            </p>
                          )}
                        </div>
                        <div className={classes.single_input_container}>
                          <p className={classes.label}>Your Mobile Number</p>
                          <div className={classes.input_field_container}>
                            <Field
                              id="agencyMobileNumber"
                              name="sa_agencyMobileNumber"
                              className={
                                errors?.sa_agencyMobileNumber
                                  ? classes.input_field_error
                                  : classes.input_field
                              }
                              placeholder="e.g (+923310983462)"
                            />
                            {errors?.sa_agencyMobileNumber && (
                              <p className={classes.error}>
                                {errors?.sa_agencyMobileNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={classes.single_input_container}>
                          <p className={classes.label}>WhatsApp</p>
                          <div className={classes.input_field_container}>
                            <Field
                              id="agencyWhatsappNumber"
                              name="sa_agencyWhatsappNumber"
                              className={
                                errors?.sa_agencyWhatsappNumber
                                  ? classes.input_field_error
                                  : classes.input_field
                              }
                              placeholder="e.g (+923310983462)"
                            />
                            {errors?.sa_agencyWhatsappNumber && (
                              <p className={classes.error}>
                                {errors?.sa_agencyWhatsappNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      userRole === 2 && (
                        <>
                          <div className={classes.single_input_container}>
                            <p className={classes.label}>
                              Builder & Developer Name
                            </p>
                            <div className={classes.input_field_container}>
                              <Field
                                id="sb_builderName"
                                name="sb_builderName"
                                placeholder="Agency Name"
                                className={
                                  errors?.sb_builderCity
                                    ? classes.input_field_error
                                    : classes.input_field
                                }
                              />
                              {errors?.sb_builderName && (
                                <p className={classes.error}>
                                  {errors?.sb_builderName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className={classes.single_input_container}>
                            <p className={classes.label}>City</p>
                            <Field
                              id="sb_builderCity"
                              name="sb_builderCity"
                              placeholder="Select your city"
                              className={
                                errors?.sb_builderCity
                                  ? classes.input_field_error
                                  : classes.input_field
                              }
                            />
                            {errors?.sb_builderCity && (
                              <p className={classes.error}>
                                {errors?.sb_builderCity}
                              </p>
                            )}
                          </div>

                          <div className={classes.single_input_container}>
                            <p className={classes.label}>Address</p>
                            <div className={classes.input_field_container}>
                              <Field
                                id="sb_builderAddress"
                                name="sb_builderAddress"
                                placeholder="Address"
                                className={
                                  errors?.sb_builderAddress
                                    ? classes.input_field_error
                                    : classes.input_field
                                }
                              />
                              {errors?.sb_builderAddress && (
                                <p className={classes.error}>
                                  {errors?.sb_builderAddress}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className={classes.single_input_container}>
                            <p className={classes.label}>Email</p>
                            <Field
                              id="sb_builderEmail"
                              name="sb_builderEmail"
                              type={"email"}
                              placeholder="nomanshahid@gmail.com"
                              className={
                                errors?.sb_builderEmail
                                  ? classes.input_field_error
                                  : classes.input_field
                              }
                            />
                            {errors?.sb_builderEmail && (
                              <p className={classes.error}>
                                {errors?.sb_builderEmail}
                              </p>
                            )}
                          </div>

                          <div className={classes.single_input_container}>
                            <p className={classes.label}>Mobile Number</p>
                            <div className={classes.input_field_container}>
                              <Field
                                id="sb_builderMobile"
                                name="sb_builderMobile"
                                placeholder="e.g (+923310983462)"
                                className={
                                  errors?.sb_builderMobile
                                    ? classes.input_field_error
                                    : classes.input_field
                                }
                              />
                              {errors?.sb_builderMobile && (
                                <p className={classes.error}>
                                  {errors?.sb_builderMobile}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className={classes.single_input_container}>
                            <p className={classes.label}>WhatsApp Number</p>
                            <div className={classes.input_field_container}>
                              <Field
                                id="sb_builderWhatsappNumber"
                                name="sb_builderWhatsappNumber"
                                placeholder="e.g (+923310983462)"
                                className={
                                  errors?.sb_builderWhatsappNumber
                                    ? classes.input_field_error
                                    : classes.input_field
                                }
                              />
                              {errors?.sb_builderWhatsappNumber && (
                                <p className={classes.error}>
                                  {errors?.sb_builderWhatsappNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )
                    )}
                    <button
                      // type="submit"
                      className="primary_btn"
                      disabled={loading}
                      onSubmit={handleSignupSubmit}
                    >
                      <p>SUBMIT</p>
                      {loading && <Spin indicator={antIcon} />}
                    </button>
                    <p className={classes.terms_of_use}>
                      By submitting, I accept 4Devari.com's{" "}
                      <span>terms of use</span>
                    </p>
                    <div className={classes.continue_container}>
                      <div className={classes.line_left} />
                      <p className={classes.continue_with}>or continue with </p>
                      <div className={classes.line_right} />
                    </div>
                    <div className={classes.social_media_btns}>
                      {/* <div className={classes.apple_btn}>
                        <img src={facebook.src} />
                        <p>Connect with Apple</p>
                      </div> */}
                      <button
                        disabled={loading}
                        className={classes.facebook_btn}
                        onClick={handleFacebookSignIn}
                      >
                        <img src={apple.src} />
                        <p>Connect with Facebook</p>
                        {loading && <Spin indicator={antIcon} />}
                      </button>
                      <button
                        disabled={loading}
                        className={classes.google_btn}
                        onClick={handleGoogleSignIn}
                      >
                        <img src={google.src} />
                        <p>Connect with Gmail</p>
                        {loading && <Spin indicator={antIcon} />}
                      </button>
                    </div>

                    <p className={classes.signup_link}>
                      Already have an account?{" "}
                      <span>
                        <Link href={"/login"}> Sign In</Link>
                      </span>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AuthPanel;
