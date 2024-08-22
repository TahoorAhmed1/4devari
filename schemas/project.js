import * as Yup from "yup";

export const projectSchema = Yup.object({
  // 1) Project Name & Location
  name: Yup.string().min(3).required("Please Enter Name"),

  location: Yup.string().required("Please Enter Location"),
  city: Yup.string().required("City is required"),

  mapPin: Yup.string().required("Please Enter Location"),

  //   bookingOrSiteOfficeAddress: Yup.string().required(
  //     "Please Enter office Address"
  //   ),

  projectLogo: Yup.string().required("project logo is required"),

  // 2) Projects Specs & Prices

  // units  (Need to Discuss)   pending
  status: Yup.string().required("Please enter status"), // [ 'Advance Stage', 'Early Stage', 'Mid Stage', 'Near possession', 'New Launch', 'Ready to move', 'Under construction', 'Well occupied']
  price: Yup.number().required("Please enter price"),
  // Project features

  // Unit type: Residential, Commercial, Plots (N)
  // Contact for prices option (N)

  // 3) Project Description

  description: Yup.string().min(15).required("Description is required"),

  // 4) Images
  images: Yup.array().min(1).required("Please upload at least one image"),

  // 5) Videos
  //   videos: Yup.array().min(1).required("Please upload at least one video"),

  //   videoTitle: Yup.string().required("Video Title is required"),
  //   videoHost: Yup.string().required("Video Host is required"),

  //   videoLink: Yup.string()
  //     .url()
  //     .required("Please enter a valid URL for the video"),

  // 6) Documents
  //   documents: Yup.array().min(1).required("Please upload at least one document"),

  // 7) Floor Plans
  //   floorPlans: Yup.array()
  //     .min(1)
  //     .required("Please upload at least one floor plan"),

  // 8) Payment Plans
  //   paymentPlans: Yup.array()
  //     .min(1)
  //     .required("Please upload at least one payment plan"),

  // 9) Contact Details
  contactPerson: Yup.string().required("Contact Person is required"),

  landlineNumber: Yup.string().required("Landline Number is required"),

  mobileNumbers: Yup.array().min(1).required("Please enter mobile number"),

  email: Yup.string().email().required("Please enter official email address"),

  whatsapp: Yup.string(),

  // 1) Main Features
  lobbyInBuilding: Yup.string(),
  doubleGlazedWindows: Yup.string(),

  centralAirConditioning: Yup.string(),
  centralHeating: Yup.string(),

  flooring: Yup.string(), // ['Tiles', 'Marble', 'Wooden', 'Chip', 'Cement', 'Other'] (Select Field)
  electricityBackup: Yup.string(), // ['None', 'Generator', 'UPS', 'Solar', 'Other'] (Select Field)

  fireFightingSystem: Yup.string(),
  elevators: Yup.string(),

  serviceElevatorsInBuilding: Yup.string(),
  otherMainFeatures: Yup.array(), // (Multi Text Chip Field)   pending

  gatedCommunity: Yup.string(),
  parkingSpaces: Yup.string(),

  //2) Plot Features
  sewerage: Yup.string(),
  utilities: Yup.string(),

  accessibleByRoad: Yup.string(),

  // 3) Business & Communication
  broadbandInternetAccess: Yup.string(),
  satelliteOrCable: Yup.string(),

  businessCenterOrMediaRoom: Yup.string(),
  intercom: Yup.string(),

  atmMachines: Yup.string(),
  otherBusinessAndCommunicationFeatures: Yup.array(), // (Multi Text Chip Field)

  // 4) Community Features
  communityLawnOrGarden: Yup.string(),
  communitySwimmingPool: Yup.string(),

  communityGym: Yup.string(),
  firstAidOrMedicalCenter: Yup.string(),

  dayCareCenter: Yup.string(),
  kidsPlayArea: Yup.string(),

  barbecueArea: Yup.string(),
  mosque: Yup.string(),

  communityCenter: Yup.string(),
  otherCommunityFeatures: Yup.array(), // (Multi Text Chip Field)

  // 5) Nearby Locations
  nearbySchools: Yup.string(),
  nearbyHospitals: Yup.string(),

  nearbyShoppingMalls: Yup.string(),
  nearbyRestaurants: Yup.string(),

  // distanceFromAirport: Yup.number(),
  nearbyPublicTransport: Yup.string(),

  otherNearbyPlaces: Yup.array(), // (Multi Text Chip Field)

  // 6) Other Facilities
  maintenanceStaff: Yup.string(),
  securityStaff: Yup.string(),

  facilitiesForDisabled: Yup.string(),
  otherFacilities: Yup.array(), // (Multi Text Chip Field)

  cctvSecurity: Yup.string(),

  // 7) Healthcare Recreational
  lawnOrGarden: Yup.string(),
  swimmingPool: Yup.string(),

  otherHealthcareAndRecreationalFeatures: Yup.array(), // (Multi Text Chip Field)
});

// Feature Schema

export const projectFeaturesSchema = Yup.object({
  // 10) Main Features
  lobbyInBuilding: Yup.string(),
  doubleGlazedWindows: Yup.string(),

  centralAirConditioning: Yup.string(),
  centralHeating: Yup.string(),

  flooring: Yup.string(), // ['Tiles', 'Marble', 'Wooden', 'Chip', 'Cement', 'Other'] (Select Field)
  electricityBackup: Yup.string(), // ['None', 'Generator', 'UPS', 'Solar', 'Other'] (Select Field)

  fireFightingSystem: Yup.string(),
  elevators: Yup.string(),

  serviceElevatorsInBuilding: Yup.string(),
  otherMainFeatures: Yup.array(), // (Multi Text Chip Field)   pending

  gatedCommunity: Yup.string(),
  parkingSpaces: Yup.string(),

  //11) Plot Features
  sewerage: Yup.string(),
  utilities: Yup.string(),

  accessibleByRoad: Yup.string(),

  // 12) Business & Communication
  broadbandInternetAccess: Yup.string(),
  satelliteOrCable: Yup.string(),

  businessCenterOrMediaRoom: Yup.string(),
  intercom: Yup.string(),

  atmMachines: Yup.string(),
  otherBusinessAndCommunicationFeatures: Yup.array(), // (Multi Text Chip Field)

  // 13) Community Features
  communityLawnOrGarden: Yup.string(),
  communitySwimmingPool: Yup.string(),

  communityGym: Yup.string(),
  firstAidOrMedicalCenter: Yup.string(),

  dayCareCenter: Yup.string(),
  kidsPlayArea: Yup.string(),

  barbecueArea: Yup.string(),
  mosque: Yup.string(),

  communityCenter: Yup.string(),
  otherCommunityFeatures: Yup.array(), // (Multi Text Chip Field)

  // 14) Nearby Locations
  nearbySchools: Yup.string(),
  nearbyHospitals: Yup.string(),

  nearbyShoppingMalls: Yup.string(),
  nearbyRestaurants: Yup.string(),

  // distanceFromAirport: Yup.number(),
  nearbyPublicTransport: Yup.string(),

  otherNearbyPlaces: Yup.array(), // (Multi Text Chip Field)

  // 15) Other Facilities
  maintenanceStaff: Yup.string(),
  securityStaff: Yup.string(),

  facilitiesForDisabled: Yup.string(),
  otherFacilities: Yup.array(), // (Multi Text Chip Field)

  cctvSecurity: Yup.string(),

  // 16) Healthcare Recreational
  lawnOrGarden: Yup.string(),
  swimmingPool: Yup.string(),

  otherHealthcareAndRecreationalFeatures: Yup.array(), // (Multi Text Chip Field)
});
// images uploading
// other pending
