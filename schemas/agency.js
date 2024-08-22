import * as Yup from "yup";

export const agencySettingSchema = Yup.object({
  // 1) Agency Account Settings
  username: Yup.string().min(3).required("Please Enter Name"),
  email: Yup.string().email(),

  address: Yup.string().required("Please enter Address"),

  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),

  landlineNumber: Yup.string().required("Landline Number is required"),

  mobileNumbers: Yup.string().required("Mobile Number is required"),

  whatsapp: Yup.string(),

  picture: Yup.string().required("logo is required"),
});

export const agencyProfileSchema = Yup.object({
  // 2) Profile
  agencyName: Yup.string().min(3).required("Please enter Name"),
  additionalEmail: Yup.string().email(),

  physicalAddress: Yup.string().required("Please enter address"),

  experienceYears: Yup.string().required("Please enter your experience"),
  serviceAreas: Yup.array().min(1).required("Please enter at least one area"), // Multi Select City from google

  description: Yup.string().required("Please enter description"), // Text Area

  propertyType: Yup.array().min(1).required("Please enter at least one area"), // ['residential', 'commercial', 'plots']
  propertyFor: Yup.array().min(1).required("Please enter at least one area"), // ['sale', 'rent', 'shared spaces']

  verificationType: Yup.string().required("Verification is required"), // ['basic', 'elite']

  additionalMobileNumber: Yup.string(),
  additionalwhatsapp: Yup.string(),

  agencyLogo: Yup.string().required("agency logo is required"),

  agencyCoverPicture: Yup.string().required("cover image is required"),
});

export const agencyCeoSchema = Yup.object({
  // 3) CEO Profile
  ceoName: Yup.string().min(3).required("Please Enter Ceo Name"),
  ceoDesignation: Yup.string().min(3).required("Please Enter Ceo Designation"),

  ceoMessage: Yup.string(), // Text Area

  ceoPicture: Yup.string().required("Ceo Picture is required"),
});

export const agencyStaffSchema = Yup.object({
  // 4) Agents
  username: Yup.string().min(3).required("Please Enter Name"),
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string().required("Password is required"),

  mobileNumber: Yup.string(),

  // Showing list of staff below containing edit and delete icon
  // when click on edit above form show staff values and btn change to update
});

// 5)  Change Password
// 6) Add Socials
