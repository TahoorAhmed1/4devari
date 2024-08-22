import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import profileImg from "/public/assets/account-setting/profile.svg";
import real_estate_pic from "/public/assets/account-setting/real_estate_pic.jpg";
import gfs from "/public/assets/account-setting/gfs.png";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import PhoneInput from "react-phone-input-2";
import Link from "next/link";
import { useAuth } from "../../../contextApi";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserById,
  updatePassword,
} from "../../../redux/users";
import {
  userChangeSchema,
  userSettingSchema,
  userSocialSchema,
} from "../../../schemas";
import { useFormik } from "formik";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import { MAP_API_KEY, MAP_LIBRARIES, Map_ID } from "../../../config";
import Loader from "../../common/loader";
import useLoadingToast from "../../../hooks/useLoadingToast";
import { uploadImages } from "../../../redux/cloudinaryUpload";
import { isFieldError } from "../../../utils";

const userInitialValues = {
  username: "",
  email: "",
  address: "",
  country: "",
  city: "",
  landlineNumber: "",
  mobileNumbers: "",
  whatsapp: "",
  picture: "",
};
const userChangeValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const userSocialValues = {
  facebook: "",
  instagram: "",
  tiktok: "",
  youtube: "",
};

const AccountSetting = () => {
  const dispatch = useDispatch();

  const [settingbtn, setSettingbtn] = useState(1);
  const [disbleBtn, setDisableBtn] = useState(false);
  const { user } = useAuth();
  // console.log(user);
  const userId = user?.id;
  const { userData, loadingUser } = useSelector((state) => state.users);
  const addressRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const toasts = useLoadingToast();

  const userFormik = useFormik({
    initialValues: userInitialValues,
    validationSchema: userSettingSchema,
    onSubmit: () => {
      if (userId) {
        const data = { ...userFormik.values };
        delete data._id;
        setDisableBtn(true);
        dispatch(
          updateUserById({
            userId: userId,
            accessToken: user?.accessToken,
            payload: data,
          })
        ).then(() => {
          setDisableBtn(false);
        });
      }
    },
  });
  const userChangeFormik = useFormik({
    initialValues: userChangeValues,
    validationSchema: userChangeSchema,
    onSubmit: () => {
      if (userId) {
        const password_data = { ...userChangeFormik.values };
        delete password_data.confirmPassword;
        // alert(JSON.stringify(values, null, 2));
        setDisableBtn(true);
        dispatch(
          updatePassword({
            userId: userId,
            accessToken: user?.accessToken,
            payload: password_data,
          })
        ).then(() => {
          setDisableBtn(false);
          userChangeFormik.setValues(userChangeValues);
        });
      }
    },
  });

  const userSocialFormik = useFormik({
    initialValues: userSocialValues,
    validationSchema: userSocialSchema,
    onSubmit: () => {
      if (userId) {
        const data = { ...userSocialFormik.values };
        delete data._id;
        setDisableBtn(true);
        dispatch(
          updateUserById({
            userId: userId,
            accessToken: user?.accessToken,
            payload: data,
          })
        ).then(() => {
          setDisableBtn(false);
        });
      }
    },
  });

  useEffect(() => {
    if (userData) {
      userFormik.setValues({
        ...userData,
        mobileNumbers: userData?.mobileNumbers?.[0] || "",
      });

      userSocialFormik.setValues({
        ...userData,
      });
    }
  }, [userData]);
  // console.log("Errors", userFormik.errors);

  // Autocomplete fields
  const onLoadAddress = (autocomplete) => {
    addressRef.current = autocomplete;
  };
  const onChangeAddress = async () => {
    const place = await addressRef.current.getPlace();
    if (place?.formatted_address) {
      userFormik.setValues({
        ...userFormik.values,
        address: place.formatted_address,
      });
    }
  };

  const onLoadCountry = (autocomplete) => {
    countryRef.current = autocomplete;
  };
  const onChangeCountry = async () => {
    const place = await countryRef.current.getPlace();
    if (place?.formatted_address) {
      userFormik.setValues({
        ...userFormik.values,
        country: place.formatted_address,
      });
    }
  };

  const onLoadCity = (autocomplete) => {
    cityRef.current = autocomplete;
  };
  const onChangeCity = async () => {
    const place = await cityRef.current.getPlace();
    if (place && place.address_components) {
      const city = place.address_components.find((component) =>
        component.types.includes("locality")
      );

      if (city) {
        userFormik.setValues({ ...userFormik.values, city: city.long_name });
      }
    }
  };

  const account_setting_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 14V16C10.4087 16 8.88258 16.6321 7.75736 17.7574C6.63214 18.8826 6 20.4087 6 22H4C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM14.595 18.812C14.4682 18.2784 14.4682 17.7226 14.595 17.189L13.603 16.616L14.603 14.884L15.595 15.457C15.9932 15.0799 16.4745 14.8017 17 14.645V13.5H19V14.645C19.532 14.803 20.012 15.085 20.405 15.457L21.397 14.884L22.397 16.616L21.405 17.189C21.5316 17.7222 21.5316 18.2778 21.405 18.811L22.397 19.384L21.397 21.116L20.405 20.543C20.0068 20.9201 19.5255 21.1983 19 21.355V22.5H17V21.355C16.4745 21.1983 15.9932 20.9201 15.595 20.543L14.603 21.116L13.603 19.384L14.595 18.812ZM18 19.5C18.3978 19.5 18.7794 19.342 19.0607 19.0607C19.342 18.7794 19.5 18.3978 19.5 18C19.5 17.6022 19.342 17.2206 19.0607 16.9393C18.7794 16.658 18.3978 16.5 18 16.5C17.6022 16.5 17.2206 16.658 16.9393 16.9393C16.658 17.2206 16.5 17.6022 16.5 18C16.5 18.3978 16.658 18.7794 16.9393 19.0607C17.2206 19.342 17.6022 19.5 18 19.5Z"
        fill={settingbtn === 1 ? "white" : "#151515"}
        fill-opacity={settingbtn === 1 ? "1" : "0.5"}
      />
    </svg>
  );
  const account_ceo_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_4597_1227)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.5022 21.3998H19.1274C19.2295 21.281 19.3323 21.1598 19.4363 21.0368C19.8013 20.6004 20.0005 20.0544 20 19.4913C20 18.2763 19.0905 17.2293 17.8431 17.0613C13.5255 16.4787 10.5077 16.4229 6.16615 17.0415C4.90585 17.2209 4 18.2841 4 19.5075C4 20.0504 4.18154 20.5874 4.52554 21.0224C4.62708 21.1508 4.72738 21.2768 4.82708 21.4004H6.41292C12.6154 24.9998 17.5022 21.3998 17.5022 21.3998ZM12 13.5999C13.3057 13.5999 14.5579 13.0942 15.4811 12.194C16.4044 11.2939 16.9231 10.073 16.9231 8.79995C16.9231 7.52693 16.4044 6.30604 15.4811 5.40587C14.5579 4.50571 13.3057 4 12 4C10.6943 4 9.44211 4.50571 8.51886 5.40587C7.5956 6.30604 7.07692 7.52693 7.07692 8.79995C7.07692 10.073 7.5956 11.2939 8.51886 12.194C9.44211 13.0942 10.6943 13.5999 12 13.5999Z"
          fill={settingbtn === 2 ? "white" : "#151515"}
          fill-opacity={settingbtn === 2 ? "1" : "0.5"}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 22.8C17.9646 22.8 22.8 17.9646 22.8 12C22.8 6.0354 17.9646 1.2 12 1.2C6.0354 1.2 1.2 6.0354 1.2 12C1.2 17.9646 6.0354 22.8 12 22.8ZM12 24C18.6276 24 24 18.6276 24 12C24 5.3724 18.6276 0 12 0C5.3724 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24Z"
          fill={settingbtn === 2 ? "white" : "#151515"}
          fill-opacity={settingbtn === 2 ? "1" : "0.5"}
        />
      </g>
      <defs>
        <clipPath id="clip0_4597_1227">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const account_preferences_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.9998 0.845001L21.6598 6.423V17.577L11.9998 23.155L2.33984 17.577V6.423L11.9998 0.845001ZM11.9998 3.155L4.33984 7.577V16.423L11.9998 20.845L19.6598 16.423V7.577L11.9998 3.155ZM11.9998 9C11.2042 9 10.4411 9.31607 9.87852 9.87868C9.31591 10.4413 8.99984 11.2044 8.99984 12C8.99984 12.7957 9.31591 13.5587 9.87852 14.1213C10.4411 14.6839 11.2042 15 11.9998 15C12.7955 15 13.5586 14.6839 14.1212 14.1213C14.6838 13.5587 14.9998 12.7957 14.9998 12C14.9998 11.2044 14.6838 10.4413 14.1212 9.87868C13.5586 9.31607 12.7955 9 11.9998 9ZM6.99984 12C6.99984 10.6739 7.52663 9.40215 8.46431 8.46447C9.40199 7.52678 10.6738 7 11.9998 7C13.3259 7 14.5977 7.52678 15.5354 8.46447C16.4731 9.40215 16.9998 10.6739 16.9998 12C16.9998 13.3261 16.4731 14.5979 15.5354 15.5355C14.5977 16.4732 13.3259 17 11.9998 17C10.6738 17 9.40199 16.4732 8.46431 15.5355C7.52663 14.5979 6.99984 13.3261 6.99984 12Z"
        fill={settingbtn === 3 ? "white" : "#151515"}
        fill-opacity={settingbtn === 3 ? "1" : "0.5"}
      />
    </svg>
  );
  const change_password_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.78 10.22C11.6378 10.0875 11.4498 10.0154 11.2555 10.0188C11.0612 10.0223 10.8758 10.101 10.7384 10.2384C10.601 10.3758 10.5223 10.5612 10.5188 10.7555C10.5154 10.9498 10.5875 11.1378 10.72 11.28L11.44 12L10.72 12.72C10.6463 12.7887 10.5872 12.8715 10.5462 12.9635C10.5052 13.0555 10.4832 13.1548 10.4814 13.2555C10.4796 13.3562 10.4982 13.4562 10.5359 13.5496C10.5736 13.643 10.6297 13.7278 10.701 13.799C10.7722 13.8703 10.857 13.9264 10.9504 13.9641C11.0438 14.0018 11.1438 14.0204 11.2445 14.0186C11.3452 14.0168 11.4445 13.9948 11.5365 13.9538C11.6285 13.9128 11.7113 13.8537 11.78 13.78L12.5 13.06L13.22 13.78C13.3608 13.9206 13.5517 13.9994 13.7507 13.9992C13.9497 13.9991 14.1404 13.9198 14.281 13.779C14.4216 13.6382 14.5004 13.4473 14.5002 13.2483C14.5001 13.0493 14.4208 12.8586 14.28 12.718L13.561 12L14.281 11.28C14.3526 11.2108 14.4097 11.128 14.449 11.0365C14.4882 10.945 14.5089 10.8465 14.5097 10.7469C14.5105 10.6474 14.4915 10.5486 14.4537 10.4565C14.416 10.3643 14.3602 10.2806 14.2898 10.2102C14.2193 10.1398 14.1356 10.0842 14.0434 10.0465C13.9512 10.0088 13.8524 9.9899 13.7528 9.99081C13.6533 9.99173 13.5549 10.0125 13.4634 10.0518C13.3719 10.0912 13.2892 10.1483 13.22 10.22L12.5 10.94L11.78 10.22ZM5.22 10.22C5.36063 10.0795 5.55125 10.0007 5.75 10.0007C5.94875 10.0007 6.13937 10.0795 6.28 10.22L7 10.94L7.72 10.22C7.78866 10.1463 7.87146 10.0872 7.96346 10.0462C8.05546 10.0052 8.15478 9.98318 8.25548 9.98141C8.35618 9.97963 8.45621 9.99816 8.5496 10.0359C8.64299 10.0736 8.72782 10.1297 8.79904 10.201C8.87026 10.2722 8.9264 10.357 8.96412 10.4504C9.00184 10.5438 9.02037 10.6438 9.01859 10.7445C9.01682 10.8452 8.99477 10.9445 8.95378 11.0365C8.91279 11.1285 8.85369 11.2113 8.78 11.28L8.061 12L8.781 12.718C8.85073 12.7877 8.90606 12.8704 8.94382 12.9614C8.98159 13.0525 9.00105 13.1501 9.00109 13.2486C9.00114 13.3472 8.98177 13.4448 8.94409 13.5359C8.90642 13.627 8.85117 13.7098 8.7815 13.7795C8.71183 13.8492 8.62912 13.9046 8.53807 13.9423C8.44702 13.9801 8.34942 13.9995 8.25085 13.9996C8.15228 13.9996 8.05467 13.9803 7.96359 13.9426C7.8725 13.9049 7.78973 13.8497 7.72 13.78L7 13.06L6.28 13.78C6.13783 13.9125 5.94978 13.9846 5.75548 13.9812C5.56118 13.9777 5.37579 13.899 5.23838 13.7616C5.10097 13.6242 5.02225 13.4388 5.01883 13.2445C5.0154 13.0502 5.08752 12.8622 5.22 12.72L5.94 12L5.22 11.28C5.07955 11.1394 5.00066 10.9488 5.00066 10.75C5.00066 10.5512 5.07955 10.3606 5.22 10.22ZM16.5 13.5C16.3011 13.5 16.1103 13.579 15.9697 13.7197C15.829 13.8603 15.75 14.0511 15.75 14.25C15.75 14.4489 15.829 14.6397 15.9697 14.7803C16.1103 14.921 16.3011 15 16.5 15H18.25C18.4489 15 18.6397 14.921 18.7803 14.7803C18.921 14.6397 19 14.4489 19 14.25C19 14.0511 18.921 13.8603 18.7803 13.7197C18.6397 13.579 18.4489 13.5 18.25 13.5H16.5ZM5.25 5C4.38805 5 3.5614 5.34241 2.9519 5.9519C2.34241 6.5614 2 7.38805 2 8.25V15.75C2 16.612 2.34241 17.4386 2.9519 18.0481C3.5614 18.6576 4.38805 19 5.25 19H18.75C19.1768 19 19.5994 18.9159 19.9937 18.7526C20.388 18.5893 20.7463 18.3499 21.0481 18.0481C21.3499 17.7463 21.5893 17.388 21.7526 16.9937C21.9159 16.5994 22 16.1768 22 15.75V8.25C22 7.8232 21.9159 7.40059 21.7526 7.00628C21.5893 6.61197 21.3499 6.25369 21.0481 5.9519C20.7463 5.65011 20.388 5.41072 19.9937 5.24739C19.5994 5.08406 19.1768 5 18.75 5H5.25ZM3.5 8.25C3.5 7.283 4.283 6.5 5.25 6.5H18.75C19.717 6.5 20.5 7.283 20.5 8.25V15.75C20.5 16.2141 20.3156 16.6592 19.9874 16.9874C19.6592 17.3156 19.2141 17.5 18.75 17.5H5.25C4.78587 17.5 4.34075 17.3156 4.01256 16.9874C3.68437 16.6592 3.5 16.2141 3.5 15.75V8.25Z"
        fill={settingbtn === 4 ? "white" : "#151515"}
        fill-opacity={settingbtn === 4 ? "1" : "0.5"}
      />
    </svg>
  );
  const add_social_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 6H11V8H4V16H11V18H2V6H4ZM20 6H13V8H20V16H13V18H22V6H20ZM17 11H7V13H17V11Z"
        fill={settingbtn === 5 ? "white" : "#151515"}
        fill-opacity={settingbtn === 5 ? "1" : "0.5"}
      />
    </svg>
  );

  const ImageProps = {
    name: "file",
    accept: ".png,.jpeg,.jpg,.svg",

    beforeUpload(file) {
      const isSizeValid = file.size / 1024 / 1024 <= 5; // Check if file size is less than or equal to 5 MB

      if (!isSizeValid) {
        message.error("File size must be less than or equal to 5 MB");
      }
      return isSizeValid;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        setDisableBtn(true);
        toasts.openLoadingToast("uploading image");
      }
      if (info.file.status === "done") {
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);

        dispatch(uploadImages(formData)).then((res) => {
          if (res?.payload?.secure_url) {
            const img = res?.payload?.secure_url;
            userFormik.setValues({ ...userFormik.values, picture: img });
            setDisableBtn(false);
            toasts.closeLoadingToast();
            toasts.openSuccessToast(
              `${info.file.name} file uploaded successfully`
            );
          } else {
            setDisableBtn(false);
            toasts.closeLoadingToast();
            toasts.openErrorToast(`${info.file.name} file upload failed.`);
          }
        });
      } else if (info.file.status === "error") {
        setDisableBtn(false);
        toasts.closeLoadingToast();
        toasts.openErrorToast(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="main_setting_container">
      <Loader loading={loadingUser} global />
      <div className="overlay" />
      <h3 className="mob_heading d_none">My Account Settings</h3>
      <div className="content_container">
        <div className="left_container">
          <div className="btn_container d_none">
            <Link
              href="#my_account_settings"
              onClick={() => setSettingbtn(1)}
              className={settingbtn === 1 ? "btnActive" : ""}
            >
              {account_setting_icon}My Account Settings
            </Link>

            {!userData?.type === "enduser" && (
              <Link
                href="#ceo/owner"
                onClick={() => setSettingbtn(2)}
                className={settingbtn === 2 ? "btnActive" : ""}
              >
                {account_ceo_icon}CEO/Owner Profile
              </Link>
            )}
            {/* <Link
              href="#my_preferences"
              onClick={() => setSettingbtn(3)}
              className={settingbtn === 3 ? "btnActive" : ""}
            >
              {account_preferences_icon}My Preferences
            </Link> */}
            <Link
              href="#change_password"
              onClick={() => setSettingbtn(4)}
              className={settingbtn === 4 ? "btnActive" : ""}
            >
              {change_password_icon}Change Password
            </Link>
            <Link
              href="#add_social"
              onClick={() => setSettingbtn(5)}
              className={settingbtn === 5 ? "btnActive" : ""}
            >
              {add_social_icon}Add Socials
            </Link>
          </div>
          <div className="info_container">
            <Image
              src={userFormik?.values?.picture || profileImg}
              width={70}
              height={70}
            />
            <div className="info_text">
              <div className="profile_text">
                <h3>{user?.username}</h3>
                <p>{user?.email}</p>
              </div>
              <div className="id">ID: {userData?._id || "Z-46816814164"}</div>
            </div>
          </div>
          <h3 className="account_heading" id="my_account_settings">
            My Account Settings
          </h3>
          <div className="form_container">
            <div className="dual_container">
              <div className="input_field_container">
                <p className="label">Name</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="username"
                  value={userFormik.values.username}
                  onChange={userFormik.handleChange}
                  onBlur={userFormik.handleBlur}
                  className={
                    isFieldError("username", userFormik)
                      ? "err_field input_field"
                      : "input_field"
                  }
                />
              </div>
              <div className="input_field_container">
                <p className="label">Email</p>
                <input
                  type="text"
                  placeholder="designbynoms@gmail.com"
                  name="email"
                  value={userFormik.values.email}
                  onChange={userFormik.handleChange}
                  onBlur={userFormik.handleBlur}
                  disabled
                  className={
                    isFieldError("email", userFormik)
                      ? "err_field input_field"
                      : "input_field"
                  }
                />
              </div>
            </div>

            <div className="input_field_container">
              <LoadScriptNext
                googleMapsApiKey={MAP_API_KEY}
                libraries={MAP_LIBRARIES}
              >
                <>
                  <p className="label">Address</p>
                  <Autocomplete
                    onLoad={onLoadAddress}
                    onPlaceChanged={onChangeAddress}
                    key={MAP_API_KEY}
                    types={["address"]}
                    restrictions={{ country: "PK" }}
                  >
                    <input
                      type="text"
                      placeholder="Enter your Current Address"
                      name="address"
                      id="address"
                      value={userFormik.values.address}
                      onChange={userFormik.handleChange}
                      onBlur={userFormik.handleBlur}
                      className={`input_field google_input_field ${
                        isFieldError("address", userFormik) && "err_field"
                      }`}
                      autoComplete="false"
                    />
                  </Autocomplete>
                </>
              </LoadScriptNext>
            </div>

            <div className="dual_container">
              <div className="input_field_container">
                <LoadScriptNext
                  googleMapsApiKey={MAP_API_KEY}
                  libraries={MAP_LIBRARIES}
                >
                  <>
                    <p className="label">Country</p>
                    <Autocomplete
                      onLoad={onLoadCountry}
                      onPlaceChanged={onChangeCountry}
                      key={MAP_API_KEY}
                      types={["country"]}
                      restrictions={{ country: "PK" }}
                    >
                      <input
                        type="text"
                        placeholder="Enter your current country"
                        name="country"
                        id="country"
                        value={userFormik.values.country}
                        onChange={userFormik.handleChange}
                        onBlur={userFormik.handleBlur}
                        className={`input_field google_input_field ${
                          isFieldError("country", userFormik) && "err_field"
                        }`}
                        autoComplete="false"
                      />
                    </Autocomplete>
                  </>
                </LoadScriptNext>
              </div>
              <div className="input_field_container">
                <LoadScriptNext
                  googleMapsApiKey={MAP_API_KEY}
                  libraries={MAP_LIBRARIES}
                >
                  <>
                    <p className="label">City</p>
                    <Autocomplete
                      onLoad={onLoadCity}
                      onPlaceChanged={onChangeCity}
                      key={MAP_API_KEY}
                      types={["locality"]}
                      restrictions={{ country: "PK" }}
                    >
                      <input
                        type="text"
                        placeholder="Enter your current city"
                        name="city"
                        id="city"
                        value={userFormik.values.city}
                        onChange={userFormik.handleChange}
                        onBlur={userFormik.handleBlur}
                        className={`input_field google_input_field ${
                          isFieldError("city", userFormik) && "err_field"
                        }`}
                        autoComplete="false"
                      />
                    </Autocomplete>
                  </>
                </LoadScriptNext>
              </div>
            </div>
            <div className="number_field_container">
              <p className="label">Landline number</p>
              <PhoneInput
                name="landlineNumber"
                value={userFormik.values.landlineNumber}
                onChange={(val) =>
                  userFormik.handleChange({
                    target: { name: "landlineNumber", value: val },
                  })
                }
                onBlur={userFormik.handleBlur}
                className={
                  isFieldError("landlineNumber", userFormik) ? "err_field_phone" : ""
                }
                country={"pk"}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>
            <div className="number_field_container">
              <p className="label">Mobile Number (Mandatory)</p>
              <PhoneInput
                name="mobileNumbers"
                value={userFormik.values.mobileNumbers}
                onChange={(val) =>
                  userFormik.handleChange({
                    target: { name: "mobileNumbers", value: val },
                  })
                }
                onBlur={userFormik.handleBlur}
                className={
                  isFieldError("mobileNumbers", userFormik) ? "err_field_phone" : ""
                }
                country={"pk"}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>
            <div className="number_field_container">
              <p className="label">WhatsApp (Optional)</p>
              <PhoneInput
                name="whatsapp"
                value={userFormik.values.whatsapp}
                onChange={(val) =>
                  userFormik.handleChange({
                    target: { name: "whatsapp", value: val },
                  })
                }
                onBlur={userFormik.handleBlur}
                className={isFieldError("whatsapp", userFormik) ? "err_field_phone" : ""}
                country={"pk"}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>

            <div className="upload_field_container">
              <p className="label">Upload a Picture</p>
              <div
                className={`upload_btn ${
                  isFieldError("picture", userFormik) ? "err_field" : ""
                }`}
              >
                <Upload {...ImageProps} disabled={disbleBtn}>
                  <Button disabled={disbleBtn} icon={<UploadOutlined />}>
                    Browse and Upload
                  </Button>
                </Upload>
              </div>
              {/* <span className="tick_container">
                <Checkbox />{" "}
                <div className="tick_box">
                  Update details in all property listings
                </div>
              </span> */}
              <button
                className="save_btn"
                disabled={disbleBtn}
                onClick={userFormik.handleSubmit}
              >
                Save Changes
              </button>
            </div>

            <div className="divider" />
            {!userData?.type === "enduser" && (
              <>
                <div className="staff_container">
                  <h3 className="form_heading">MyStaff</h3>
                  <h3 className="staff_label">Manage Users</h3>
                  <div className="staff_table">
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                      </tr>
                      <tr>
                        <td>Zubair Akram</td>
                        <td>+923332525241</td>
                      </tr>
                      <tr>
                        <td>Amair Khan</td>
                        <td>+923332525241</td>
                      </tr>
                      <tr>
                        <td>Imad Babar</td>
                        <td>+923332525241</td>
                      </tr>
                      <tr>
                        <td>Muhammad Ali</td>
                        <td>+923332525241</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="divider" />{" "}
              </>
            )}
            {!userData?.type === "enduser" && (
              <>
                <h3 className="form_heading" id="ceo/owner">
                  CEO/Owner Profile
                </h3>
                <div className="input_field_container">
                  <p className="label">Name</p>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="address"
                    id="address"
                    // value={values.address}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    className="input_field"
                  />
                </div>
                <div className="input_field_container">
                  <p className="label">Designation</p>
                  <input
                    type="text"
                    placeholder="Assistant Manager"
                    name="address"
                    id="address"
                    // value={values.address}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    className="input_field"
                  />
                </div>
                <div className="input_field_container">
                  <p className="label">Message</p>
                  <input
                    type="text"
                    placeholder="Enter your Message"
                    name="address"
                    id="address"
                    // value={values.address}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    className="input_field"
                  />
                </div>
                <div className="upload_field_container">
                  <p className="label">Profile Picture</p>
                  <div className="upload_btn">
                    <Upload
                      multiple
                      // {...ImageProps}
                    >
                      <Button icon={<UploadOutlined />}>
                        Browse and Upload
                      </Button>
                    </Upload>
                  </div>
                  <button
                    className="save_btn"
                    disabled={disbleBtn}
                    style={{ marginTop: "0px" }}
                  >
                    {" "}
                    Save Changes
                  </button>
                </div>
                <div className="divider" />
              </>
            )}

            {/* <h3 className="form_heading" id="my_preferences">
              My Preferences
            </h3>
            <div className="preferences_container">
              <div className="preference">
                <div className="label">Email Notification</div>
                <p className="preferences_para">
                  Allow to to receive email notifications
                </p>
                <div className="property_checkbox">
                  <label className="switch">
                    <input
                      // checked={values.installment_available}
                      // onChange={handleChange}
                      name="installment_available"
                      type="checkbox"
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="preference_divider" />
              <div className="preference">
                <div className="label">Newsletters</div>
                <p className="preferences_para">
                  Allow to stay updated and receive newsletter
                </p>
                <div className="property_checkbox">
                  <label className="switch">
                    <input
                      // checked={values.installment_available}
                      // onChange={handleChange}
                      name="installment_available"
                      type="checkbox"
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="preference_divider" />
              <div className="preference">
                <div className="label">Automated Reports</div>
                <p className="preferences_para">
                  Allow to send us reports automatically incase of any issue
                </p>
                <div className="property_checkbox">
                  <label className="switch">
                    <input
                      // checked={values.installment_available}
                      // onChange={handleChange}
                      name="installment_available"
                      type="checkbox"
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="preference_divider" />
              <div className="preference_units">
                <div className="input_field_container">
                  <p className="label">Currency</p>
                  <div className="styles_select">
                    <select
                      name="purpose"
                      id="purpose"
                      // value={values.purpose}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                    >
                      <option value="PKR">PKR</option>
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>
                <div className="input_field_container">
                  <p className="label">Area Unit</p>
                  <div className="styles_select">
                    <select
                      name="purpose"
                      id="purpose"
                      // value={values.purpose}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                    >
                      <option value="Sq.Ft">Sq.Ft</option>
                      <option value="Marla">Marla</option>
                      <option value="Yard">Yard</option>
                    </select>
                  </div>
                </div>
                <button className="save_btn"> Save Changes</button>
              </div>
            </div>
            <div className="divider" /> */}
            <h3 className="form_heading" id="change_password">
              Change Password
            </h3>
            <div className="input_field_container">
              <p className="label">Enter Password</p>
              <input
                type="password"
                placeholder="Enter Password"
                name="oldPassword"
                value={userChangeFormik.values.oldPassword}
                onChange={userChangeFormik.handleChange}
                onBlur={userChangeFormik.handleBlur}
                className={
                  userChangeFormik.errors?.oldPassword
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <div className="input_field_container">
              <p className="label">Enter New Password</p>
              <input
                type="password"
                placeholder="Enter New Password"
                name="newPassword"
                value={userChangeFormik.values.newPassword}
                onChange={userChangeFormik.handleChange}
                onBlur={userChangeFormik.handleBlur}
                className={
                  userChangeFormik.errors?.newPassword
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <div className="input_field_container">
              <p className="label">Confirm Password</p>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userChangeFormik.values.confirmPassword}
                onChange={userChangeFormik.handleChange}
                onBlur={userChangeFormik.handleBlur}
                className={
                  userChangeFormik.errors?.confirmPassword
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <button
              className="save_btn"
              style={{ marginTop: "0px" }}
              disabled={disbleBtn}
              onClick={userChangeFormik.handleSubmit}
            >
              {" "}
              Confirm
            </button>
            <div className="divider" />
            <h3 className="form_heading" id="add_social">
              Add Socials
            </h3>
            <div className="input_field_container">
              <p className="label">Facebook</p>
              <input
                type="text"
                placeholder="https://www.facebook.com/nomansha..."
                name="facebook"
                value={userSocialFormik.values.facebook}
                onChange={userSocialFormik.handleChange}
                onBlur={userSocialFormik.handleBlur}
                className={
                  isFieldError("facebook", userSocialFormik)
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <div className="input_field_container">
              <p className="label">Instagram</p>
              <input
                type="text"
                placeholder="https://www.instagram.com/designbynoms"
                name="instagram"
                id="instagram"
                value={userSocialFormik.values.instagram}
                onChange={userSocialFormik.handleChange}
                onBlur={userSocialFormik.handleBlur}
                className={
                  isFieldError("instagram", userSocialFormik)
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <div className="input_field_container">
              <p className="label">TikTok</p>
              <input
                type="text"
                placeholder="https://www.tiktok.com/nomanshahid"
                name="tiktok"
                id="tiktok"
                value={userSocialFormik.values.tiktok}
                onChange={userSocialFormik.handleChange}
                onBlur={userSocialFormik.handleBlur}
                className={
                  isFieldError("tiktok", userSocialFormik)
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <div className="input_field_container">
              <p className="label">Youtube</p>
              <input
                type="text"
                placeholder="https://www.youtube.com/designbynoman"
                name="youtube"
                id="youtube"
                value={userSocialFormik.values.youtube}
                onChange={userSocialFormik.handleChange}
                onBlur={userSocialFormik.handleBlur}
                className={
                  isFieldError("youtube", userSocialFormik)
                    ? "err_field input_field"
                    : "input_field"
                }
              />
            </div>
            <button
              className="save_btn"
              style={{ marginTop: "0px" }}
              onClick={userSocialFormik.handleSubmit}
              disabled={disbleBtn}
            >
              {" "}
              Save Changes
            </button>
            <div className="divider" />
          </div>
        </div>
        <div className="right_container">
          <div className="btn_container d_none_mob">
            <Link
              href="#my_account_settings"
              onClick={() => setSettingbtn(1)}
              className={settingbtn === 1 ? "btnActive" : ""}
            >
              {account_setting_icon}My Account Settings
            </Link>
            {!userData?.type === "enduser" && (
              <Link
                href="#ceo/owner"
                onClick={() => setSettingbtn(2)}
                className={settingbtn === 2 ? "btnActive" : ""}
              >
                {account_ceo_icon}CEO/Owner Profile
              </Link>
            )}
            {/* <Link
              href="#my_preferences"
              onClick={() => setSettingbtn(3)}
              className={settingbtn === 3 ? "btnActive" : ""}
            >
              {account_preferences_icon}My Preferences
            </Link> */}
            <Link
              href="#change_password"
              onClick={() => setSettingbtn(4)}
              className={settingbtn === 4 ? "btnActive" : ""}
            >
              {change_password_icon}Change Password
            </Link>
            <Link
              href="#add_social"
              onClick={() => setSettingbtn(5)}
              className={settingbtn === 5 ? "btnActive" : ""}
            >
              {add_social_icon}Add Socials
            </Link>
          </div>
          {!userData?.type === "enduser" && (
            <div className="seller_card">
              <h2>Seller Card</h2>
              <div className="real_estate_container">
                <div className="real_estate_content">
                  <div className="real_estate_img">
                    <Image src={real_estate_pic} width={100} height={"auto"} />
                  </div>
                  <div className="estate_text_content">
                    <div>
                      <h3>Cantt Vista Real Estate</h3>
                      <p>Karachi Agency</p>
                    </div>
                    <div>
                      <h3>Raheel Ahmed Mir</h3>
                      <p>Member since February 2023</p>
                    </div>
                  </div>
                </div>
                <div className="real_estate_btns">
                  <button>Agency Profile</button>
                  <button>Call</button>
                  <button>Email</button>
                  <button>Whatsapp</button>
                </div>
              </div>
              <div className="real_estate_container">
                <div className="real_estate_content">
                  <div className="real_estate_img">
                    <Image src={gfs} width={100} height={"auto"} />
                  </div>
                  <div className="gfs_text_content">
                    <h3>GFS Group</h3>

                    <div className="gfs_text">
                      <div>
                        <span>1988</span>
                        <p>Year estd.</p>
                      </div>
                      <div>
                        <span>15</span>
                        <p>Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="real_estate_btns">
                  <button>Agency Profile</button>
                  <button>Call</button>
                  <button>Email</button>
                  <button>Whatsapp</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
