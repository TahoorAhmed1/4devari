import * as Yup from "yup";

export const builderSettingSchema = Yup.object({
  // 1) Builder Account Settings
  username: Yup.string().min(3).required("Please Enter Name"),
  email: Yup.string().email(),

  address: Yup.string().required("Please enter Address"),

  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),

  landlineNumber: Yup.string().required("Landline Number is required"),

  mobileNumbers: Yup.string().required("Mobile Number is required"),

  whatsapp: Yup.string(),

  builderLogo: Yup.string().required("logo is required"),
});

export const builderProfileSchema = Yup.object({
  // 2) Profile

  builderName: Yup.string().min(3).required("Please enter Name"),
  additionalEmail: Yup.string().email(),

  experienceYears: Yup.string().required("Please enter your experience"),
  operatingCities: Yup.array().min(1).required("Please enter at least one city"),

  aboutUs: Yup.string().required("Please enter something about you"), // Text Area

  owners: Yup.array().min(1).required("Please enter at least one owner"),
  partners: Yup.array().min(1).required("Please enter at least one partner"),

  verificationType: Yup.string().required("Verification is required"), // ['basic', 'elite']
  cnic: Yup.string().required("cnic"),

  builderCoverPicture: Yup.string().required("cover image is required"),
});

// 3)  Change Password
// 4) Add Socials