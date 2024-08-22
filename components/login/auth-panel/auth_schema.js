import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export const forgotValidationSchema = Yup.object().shape({
  f_email: Yup.string().email("Invalid email").required("Email is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  c_password: Yup.string().required("Password is required"),
  c_confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("c_password"), null], "Password must match"),
});
