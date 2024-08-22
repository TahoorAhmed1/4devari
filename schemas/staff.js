import * as Yup from "yup";

export const staffSettingSchema = Yup.object({
    // 1) Staff Account Settings
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

export const staffProfileSchema = Yup.object({
  // 2) Profile

  name: Yup.string().min(3).required("Please enter Name"),
  experienceYears: Yup.string().required("Please enter your experience"),
  
  propertyType: Yup.array().min(1).required("Please enter at least one area"), // ['residential', 'commercial', 'plots']
  propertyFor: Yup.array().min(1).required("Please enter at least one area"), // ['sale', 'rent', 'shared spaces']

  staffPicture: Yup.string().required("image is required"),
});

// 3)  Change Password
// 4) Add Socials
