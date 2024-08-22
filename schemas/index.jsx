import * as Yup from "yup";

export const modalSchema = Yup.object({
  name: Yup.string().min(3).required("Please Enter Name"),
  PhonerNumber: Yup.string()
    .min(9)
    .max(10)
    .required("Please Enter Phone number"),
  email: Yup.string().email().required("Please Enter Email"),
  radio: Yup.string().required(),
  radio2: Yup.string().required(),
  radio3: Yup.string().required(),
  termsOfService: Yup.bool()
    .oneOf([true], "Please accept all terms")
    .required("Please accept."),
  termsOfService1: Yup.bool()
    .oneOf([true], "Please accept.")
    .required("Please accept."),
  termsOfService2: Yup.bool()
    .oneOf([true], "Please accept.")
    .required("Please accept."),
});
export const advertiseSchema = Yup.object({
  name: Yup.string().required("Please Enter Name"),
  contact: Yup.string().required("Please Enter Phone number"),
  purpose: Yup.string().required("Please Enter purpose"),
  type: Yup.string().required("Please Enter type"),
  city: Yup.string().required("Please Enter city"),
  check: Yup.boolean()
    .oneOf([true], "Please Enter check")
    .required("Please check."),
  description: Yup.string().required("Please Enter description"),
  area: Yup.string().required("Please Enter area"),
});
export const contactSchema = Yup.object({
  name: Yup.string().min(3).required("Please Enter Name"),
  PhoneNumber: Yup.string().required("Please Enter Phone number"),
  email: Yup.string().email().required("Please Enter Email"),
  city: Yup.string().required("City is required"),
  subject: Yup.string().min(6).required("Subject is required"),
  message: Yup.string().required("Required"),
});
export const agencycontactSchema = Yup.object({
  username: Yup.string().min(3).required("Please Enter Name"),
  phone: Yup.string().max(12).required("Please Enter Phone number"),
  email: Yup.string().email().required("Please Enter Email"),
  message: Yup.string().required("Required"),
});

// User Setting Schema
export const userChangeSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .required("Confirm Password is required")
    .notOneOf(
      [Yup.ref("oldPassword"), null],
      "Password must not match with previous one"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password must match with new password"
    ),
});
export const userSocialSchema = Yup.object().shape({
  facebook: Yup.string()
    .url("Please enter a valid URL")
    .matches(
      /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/,
      "Invalid Facebook URL"
    ),
  instagram: Yup.string()
    .url("Please enter a valid URL")
    .matches(
      /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9(\.\?)?]/,
      "Invalid Instagram URL"
    ),
  tiktok: Yup.string()
    .url("Please enter a valid URL")
    .matches(
      /^(https?:\/\/)?(www\.)?tiktok.com\/@([a-zA-Z0-9._]+)/,
      "Invalid TikTok URL"
    ),
  youtube: Yup.string()
    .url("Please enter a valid URL")
    .matches(
      /^(https?:\/\/)?(www\.)?youtube.com\/(c\/)?([a-zA-Z0-9._-]+)/,
      "Invalid YouTube URL"
    ),
});

export const userSettingSchema = Yup.object({
  username: Yup.string().min(3).required("Please Enter Name"),
  email: Yup.string().email(),
  address: Yup.string().required("Please Enter Address"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  landlineNumber: Yup.string().required("Landline Number is required"),
  mobileNumbers: Yup.string().required("Mobile Number is required"),
  whatsapp: Yup.string(),
  picture: Yup.string().required("Picture is required"),
});

export const propertyDetailSchema = Yup.object({
  purpose: Yup.string().required("Purpose is required"),
  type: Yup.string().required("Property Type is required"),

  subtype: Yup.string().when("purpose", {
    is: "coworking space",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Subtype is required"),
  }),

  city: Yup.string().required("City is required"),
  location: Yup.string().required("Location is required"),

  room_sharing_type: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Room Sharing type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  room_sharing_subtype: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Room Sharing Subtype is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  private_room: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Private room is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  address: Yup.string().required("Address is required"),
  houseNumber: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("House Number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // officeNumber: Yup.string().when("purpose", {
  //   is: "coworking space",
  //   then: (schema) => schema.required("Office Number is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // floorNumber: Yup.string().when("purpose", {
  //   is: "coworking space",
  //   then: (schema) => schema.required("floorNumber is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  streetNumber: Yup.string().when("purpose", {
    is: "coworking space",
    then: (schema) => schema.required("street Number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // reference: Yup.string().required("Reference Full Name is required"),
  // referenceContact: Yup.string().required(
  //   "Reference Contact Number is required"
  // ),
  mapPin: Yup.string().required("Map Pin is required"),

  // Step 2
  areaSize: Yup.string().required("Size / Area is required"),
  // areaSizeUnit: Yup.string().required("Size / Area Unit is required"),
  foodAvailability: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Food Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  gender: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Gender is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  occupantsType: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Available For is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  noOfBedrooms: Yup.string().when("purpose", {
    is: (value) => value === "buy" || value === "rent",
    then: (schema) => schema.required("No Of Bedrooms is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  noOfBathrooms: Yup.string().when("purpose", {
    is: (value) => value === "buy" || value === "rent",
    then: (schema) => schema.required("No Of Bathrooms is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  occupancyStatus: Yup.string().when("purpose", {
    is: "coworking space",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Occupancy Status is required"),
  }),
  availableFrom: Yup.date().when("purpose", {
    is: "coworking space",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Available From is required"),
  }),
  price: Yup.string().when("purpose", {
    is: "buy",
    then: (schema) => schema.required("Price is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // priceUnit: Yup.string().when("purpose", {
  //   is: "buy",
  //   then: (schema) => schema.required("Price Unit is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  remainingInstallments: Yup.string().when("installmentAvailable", {
    is: true,
    then: (schema) => schema.required("Remaining Installments is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  monthlyInstallments: Yup.string().when("installmentAvailable", {
    is: true,
    then: (schema) => schema.required("Monthly Installments is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // possessionStatus: Yup.boolean().when("purpose", {
  //   is: "buy",
  //   then: (schema) => schema.required("Possession Status is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  furnishing: Yup.string().required("Furnishing is required"),
  listingExpiry: Yup.string().required("Listing Expiry is required"),

  // // Step 3
  // minimumContractPeriod: Yup.date().required(
  //   "Minimum Contract Period is required"
  // ),
  monthlyRent: Yup.string().when("purpose", {
    is: "rent",
    then: (schema) => schema.required("Monthly Rent is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  monthlyRentPerRoom: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Monthly Rent per Room is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  securityDeposit: Yup.boolean().notRequired(),
  securityDepositAmount: Yup.string().when("securityDeposit", {
    is: true,
    then: (schema) => schema.required("Security Deposit Amount is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  advance: Yup.boolean().notRequired(),
  advanceAmount: Yup.string().when("advance", {
    is: true,
    then: (schema) => schema.required("Advance Amount is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // // step 4

  noOfPrivateOfficesAvailable: Yup.number().when("privateOffice", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Private Offices Available is required")
        .min(
          1,
          "Number of Private Offices Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  privateOfficeAvailableOn: Yup.string().when("privateOffice", {
    is: true,
    then: (schema) =>
      schema.required("Private Office Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  privateOfficeRentPerHour: Yup.number().when(
    ["privateOffice", "privateOfficeAvailableOn"],
    {
      is: (privateOffice, privateOfficeAvailableOn) =>
        privateOffice && privateOfficeAvailableOn === "hourly",
      then: (schema) =>
        schema.required("Private Office Rental Price per Hour is required"),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  privateOfficeRentPerDay: Yup.number().when(
    ["privateOffice", "privateOfficeAvailableOn"],
    {
      is: (privateOffice, privateOfficeAvailableOn) =>
        privateOffice && privateOfficeAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Private Office Rental Price per Day is required")
          .min(
            0,
            "Private Office Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  privateOfficePriceMonth: Yup.number().when(
    ["privateOffice", "privateOfficeAvailableOn"],
    {
      is: (privateOffice, privateOfficeAvailableOn) =>
        privateOffice && privateOfficeAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Private Office Rental Price per Month is required")
          .min(
            0,
            "Private Office Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // conferenceRoomCapacity: Yup.number().when("conferenceRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Number of conference Offices Available is required")
  //       .min(
  //         1,
  //         "Number of conference Offices Available must be a positive number (greater than or equal to 1)"
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // conferenceRoomAvailableOn: Yup.string().when("conferenceRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema.required("conference Office Avalibility is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // conferenceRoomRentPerHour: Yup.number().when("conferenceRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("conference Office Rental Price per Hour is required")
  //       .min(
  //         0,
  //         "conference Office Rental Price per Hour must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // conferenceRoomPriceDay: Yup.number().when("conferenceRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("conference Office Rental Price per Day is required")
  //       .min(
  //         0,
  //         "conference Office Rental Price per Day must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // conferenceRoomRentPerMonth: Yup.number().when("conferenceRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("conference Office Rental Price per Month is required")
  //       .min(
  //         0,
  //         "conference Office Rental Price per Month must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  conferenceRoomCapacity: Yup.number().when("conferenceRoom", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Conference Rooms Available is required")
        .min(
          1,
          "Number of Conference Rooms Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  conferenceRoomAvailableOn: Yup.string().when("conferenceRoom", {
    is: true,
    then: (schema) =>
      schema.required("Conference Room Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  conferenceRoomRentPerHour: Yup.number().when(
    ["conferenceRoom", "conferenceRoomAvailableOn"],
    {
      is: (conferenceRoom, conferenceRoomAvailableOn) =>
        conferenceRoom && conferenceRoomAvailableOn === "hourly",
      then: (schema) =>
        schema
          .required("Conference Room Rental Price per Hour is required")
          .min(
            0,
            "Conference Room Rental Price per Hour must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  conferenceRoomPriceDay: Yup.number().when(
    ["conferenceRoom", "conferenceRoomAvailableOn"],
    {
      is: (conferenceRoom, conferenceRoomAvailableOn) =>
        conferenceRoom && conferenceRoomAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Conference Room Rental Price per Day is required")
          .min(
            0,
            "Conference Room Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  conferenceRoomRentPerMonth: Yup.number().when(
    ["conferenceRoom", "conferenceRoomAvailableOn"],
    {
      is: (conferenceRoom, conferenceRoomAvailableOn) =>
        conferenceRoom && conferenceRoomAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Conference Room Rental Price per Month is required")
          .min(
            0,
            "Conference Room Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // noOfSharedDesksAvailable: Yup.number().when("sharedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Number of Shared Desks Available is required")
  //       .min(
  //         1,
  //         "Number of Shared Desks Available must be a positive number (greater than or equal to 1)"
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // sharedDeskAvailableOn: Yup.string().when("sharedDesk", {
  //   is: true,
  //   then: (schema) => schema.required("Shared Desk Avalibility is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // sharedDeskRentPerHour: Yup.number().when("sharedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Shared Desk Rental Price per Hour is required")
  //       .min(
  //         0,
  //         "Shared Desk Rental Price per Hour must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // sharedDeskRentPerDay: Yup.number().when("sharedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Shared Desk Rental Price per Day is required")
  //       .min(
  //         0,
  //         "Shared Desk Rental Price per Day must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // sharedDeskRentPerMonth: Yup.number().when("sharedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Shared Desk Rental Price per Month is required")
  //       .min(
  //         0,
  //         "Shared Desk Rental Price per Month must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  noOfSharedDesksAvailable: Yup.number().when("sharedDesk", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Shared Desks Available is required")
        .min(
          1,
          "Number of Shared Desks Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  sharedDeskAvailableOn: Yup.string().when("sharedDesk", {
    is: true,
    then: (schema) => schema.required("Shared Desk Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  sharedDeskRentPerHour: Yup.number().when(
    ["sharedDesk", "sharedDeskAvailableOn"],
    {
      is: (sharedDesk, sharedDeskAvailableOn) =>
        sharedDesk && sharedDeskAvailableOn === "hourly",
      then: (schema) =>
        schema
          .required("Shared Desk Rental Price per Hour is required")
          .min(
            0,
            "Shared Desk Rental Price per Hour must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  sharedDeskRentPerDay: Yup.number().when(
    ["sharedDesk", "sharedDeskAvailableOn"],
    {
      is: (sharedDesk, sharedDeskAvailableOn) =>
        sharedDesk && sharedDeskAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Shared Desk Rental Price per Day is required")
          .min(
            0,
            "Shared Desk Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  sharedDeskRentPerMonth: Yup.number().when(
    ["sharedDesk", "sharedDeskAvailableOn"],
    {
      is: (sharedDesk, sharedDeskAvailableOn) =>
        sharedDesk && sharedDeskAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Shared Desk Rental Price per Month is required")
          .min(
            0,
            "Shared Desk Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // noOfDedicatedDesksAvailable: Yup.number().when("dedicatedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Number of Dedicated Desks Available is required")
  //       .min(
  //         1,
  //         "Number of Dedicated Desks Available must be a positive number (greater than or equal to 1)"
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // dedicatedDeskAvailableOn: Yup.string().when("dedicatedDesk", {
  //   is: true,
  //   then: (schema) => schema.required("Dedicated Desk Avalibility is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // dedicatedDeskRentPerHour: Yup.number().when("dedicatedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Dedicated Desk Rental Price per Hour is required")
  //       .min(
  //         0,
  //         "Dedicated Desk Rental Price per Hour must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // dedicatedDeskRentPerDay: Yup.number().when("dedicatedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Dedicated Desk Rental Price per Day is required")
  //       .min(
  //         0,
  //         "Dedicated Desk Rental Price per Day must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // dedicatedDeskRentPerMonth: Yup.number().when("dedicatedDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Dedicated Desk Rental Price per Month is required")
  //       .min(
  //         0,
  //         "Dedicated Desk Rental Price per Month must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  noOfDedicatedDesksAvailable: Yup.number().when("dedicatedDesk", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Dedicated Desks Available is required")
        .min(
          1,
          "Number of Dedicated Desks Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  dedicatedDeskAvailableOn: Yup.string().when("dedicatedDesk", {
    is: true,
    then: (schema) =>
      schema.required("Dedicated Desk Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  dedicatedDeskRentPerHour: Yup.number().when(
    ["dedicatedDesk", "dedicatedDeskAvailableOn"],
    {
      is: (dedicatedDesk, dedicatedDeskAvailableOn) =>
        dedicatedDesk && dedicatedDeskAvailableOn === "hourly",
      then: (schema) =>
        schema
          .required("Dedicated Desk Rental Price per Hour is required")
          .min(
            0,
            "Dedicated Desk Rental Price per Hour must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  dedicatedDeskRentPerDay: Yup.number().when(
    ["dedicatedDesk", "dedicatedDeskAvailableOn"],
    {
      is: (dedicatedDesk, dedicatedDeskAvailableOn) =>
        dedicatedDesk && dedicatedDeskAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Dedicated Desk Rental Price per Day is required")
          .min(
            0,
            "Dedicated Desk Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  dedicatedDeskRentPerMonth: Yup.number().when(
    ["dedicatedDesk", "dedicatedDeskAvailableOn"],
    {
      is: (dedicatedDesk, dedicatedDeskAvailableOn) =>
        dedicatedDesk && dedicatedDeskAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Dedicated Desk Rental Price per Month is required")
          .min(
            0,
            "Dedicated Desk Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // noOfManagerDesksAvailable: Yup.number().when("managerDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Number of Manager Desks Available is required")
  //       .min(
  //         1,
  //         "Number of Manager Desks Available must be a positive number (greater than or equal to 1)"
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // managerDeskAvailableOn: Yup.string().when("managerDesk", {
  //   is: true,
  //   then: (schema) => schema.required("Manager Desk Avalibility is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // managerDeskRentPerHour: Yup.number().when("managerDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Manager Desk Rental Price per Hour is required")
  //       .min(
  //         0,
  //         "Manager Desk Rental Price per Hour must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // managerDeskRentPerDay: Yup.number().when("managerDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Manager Desk Rental Price per Day is required")
  //       .min(
  //         0,
  //         "Manager Desk Rental Price per Day must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // managerDeskRentPerMonth: Yup.number().when("managerDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Manager Desk Rental Price per Month is required")
  //       .min(
  //         0,
  //         "Manager Desk Rental Price per Month must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  noOfManagerDesksAvailable: Yup.number().when("managerDesk", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Manager Desks Available is required")
        .min(
          1,
          "Number of Manager Desks Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  managerDeskAvailableOn: Yup.string().when("managerDesk", {
    is: true,
    then: (schema) => schema.required("Manager Desk Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  managerDeskRentPerHour: Yup.number().when(
    ["managerDesk", "managerDeskAvailableOn"],
    {
      is: (managerDesk, managerDeskAvailableOn) =>
        managerDesk && managerDeskAvailableOn === "hourly",
      then: (schema) =>
        schema
          .required("Manager Desk Rental Price per Hour is required")
          .min(
            0,
            "Manager Desk Rental Price per Hour must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  managerDeskRentPerDay: Yup.number().when(
    ["managerDesk", "managerDeskAvailableOn"],
    {
      is: (managerDesk, managerDeskAvailableOn) =>
        managerDesk && managerDeskAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Manager Desk Rental Price per Day is required")
          .min(
            0,
            "Manager Desk Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  managerDeskRentPerMonth: Yup.number().when(
    ["managerDesk", "managerDeskAvailableOn"],
    {
      is: (managerDesk, managerDeskAvailableOn) =>
        managerDesk && managerDeskAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Manager Desk Rental Price per Month is required")
          .min(
            0,
            "Manager Desk Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // noOfExecutiveDesksAvailable: Yup.number().when("executiveDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Number of Executive Desks Available is required")
  //       .min(
  //         1,
  //         "Number of Executive Desks Available must be a positive number (greater than or equal to 1)"
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // executiveDeskAvailableOn: Yup.string().when("executiveDesk", {
  //   is: true,
  //   then: (schema) => schema.required("Executive Desk Avalibility is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // executiveDeskRentPerHour: Yup.number().when("executiveDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Executive Desk Rental Price per Hour is required")
  //       .min(
  //         0,
  //         "Executive Desk Rental Price per Hour must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // executiveDeskRentPerDay: Yup.number().when("executiveDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Executive Desk Rental Price per Day is required")
  //       .min(
  //         0,
  //         "Executive Desk Rental Price per Day must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // executiveDeskRentPerMonth: Yup.number().when("executiveDesk", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Executive Desk Rental Price per Month is required")
  //       .min(
  //         0,
  //         "Executive Desk Rental Price per Month must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  noOfExecutiveDesksAvailable: Yup.number().when("executiveDesk", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Executive Desks Available is required")
        .min(
          1,
          "Number of Executive Desks Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  executiveDeskAvailableOn: Yup.string().when("executiveDesk", {
    is: true,
    then: (schema) =>
      schema.required("Executive Desk Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  executiveDeskRentPerHour: Yup.number().when(
    ["executiveDesk", "executiveDeskAvailableOn"],
    {
      is: (executiveDesk, executiveDeskAvailableOn) =>
        executiveDesk && executiveDeskAvailableOn === "hourly",
      then: (schema) =>
        schema
          .required("Executive Desk Rental Price per Hour is required")
          .min(
            0,
            "Executive Desk Rental Price per Hour must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  executiveDeskRentPerDay: Yup.number().when(
    ["executiveDesk", "executiveDeskAvailableOn"],
    {
      is: (executiveDesk, executiveDeskAvailableOn) =>
        executiveDesk && executiveDeskAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Executive Desk Rental Price per Day is required")
          .min(
            0,
            "Executive Desk Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  executiveDeskRentPerMonth: Yup.number().when(
    ["executiveDesk", "executiveDeskAvailableOn"],
    {
      is: (executiveDesk, executiveDeskAvailableOn) =>
        executiveDesk && executiveDeskAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Executive Desk Rental Price per Month is required")
          .min(
            0,
            "Executive Desk Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // noOfMeetingRoomsAvailable: Yup.number().when("meetingRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Meeting Room Capacity is required")
  //       .min(
  //         1,
  //         "Meeting Room Capacity must be a positive number (greater than or equal to 1)"
  //       ),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // meetingRoomAvailableOn: Yup.string().when("meetingRoom", {
  //   is: true,
  //   then: (schema) => schema.required("Meeting Room Avalibility is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // meetingRoomRentPerHour: Yup.number().when("meetingRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Meeting Room Rental Price per Hour is required")
  //       .min(
  //         0,
  //         "Meeting Room Rental Price per Hour must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // meetingRoomRentPerDay: Yup.number().when("meetingRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Meeting Room Rental Price per Day is required")
  //       .min(
  //         0,
  //         "Meeting Room Rental Price per Day must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // meetingRoomRentPerMonth: Yup.number().when("meetingRoom", {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required("Meeting Room Rental Price per Month is required")
  //       .min(
  //         0,
  //         "Meeting Room Rental Price per Month must be a non-negative number"
  //       ),
  //       schema.when("privateOfficeAvailableOn", {
  //         is: "monthly",
  //         then: (innerSchema) =>
  //           innerSchema.required("Private Office Rental Price per Hour is required"),
  //         otherwise: (innerSchema) => innerSchema.notRequired(),
  //       }),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  noOfMeetingRoomsAvailable: Yup.number().when("meetingRoom", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of Meeting Rooms Available is required")
        .min(
          1,
          "Number of Meeting Rooms Available must be a positive number (greater than or equal to 1)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  meetingRoomAvailableOn: Yup.string().when("meetingRoom", {
    is: true,
    then: (schema) => schema.required("Meeting Room Availability is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  meetingRoomRentPerHour: Yup.number().when(
    ["meetingRoom", "meetingRoomAvailableOn"],
    {
      is: (meetingRoom, meetingRoomAvailableOn) =>
        meetingRoom && meetingRoomAvailableOn === "hourly",
      then: (schema) =>
        schema
          .required("Meeting Room Rental Price per Hour is required")
          .min(
            0,
            "Meeting Room Rental Price per Hour must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  meetingRoomRentPerDay: Yup.number().when(
    ["meetingRoom", "meetingRoomAvailableOn"],
    {
      is: (meetingRoom, meetingRoomAvailableOn) =>
        meetingRoom && meetingRoomAvailableOn === "daily",
      then: (schema) =>
        schema
          .required("Meeting Room Rental Price per Day is required")
          .min(
            0,
            "Meeting Room Rental Price per Day must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  meetingRoomRentPerMonth: Yup.number().when(
    ["meetingRoom", "meetingRoomAvailableOn"],
    {
      is: (meetingRoom, meetingRoomAvailableOn) =>
        meetingRoom && meetingRoomAvailableOn === "monthly",
      then: (schema) =>
        schema
          .required("Meeting Room Rental Price per Month is required")
          .min(
            0,
            "Meeting Room Rental Price per Month must be a non-negative number"
          ),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // Step 5
  title: Yup.string().required("Property Title is required"),
  description: Yup.string().required("Property Description is required"),

  // Step 6
  images: Yup.array().min(1).required("Please upload at least one image"),
  // videos: Yup.array().min(1).required("Please upload at least one video"),
  // videoLink: Yup.string()
  //   // .url()
  //   .required("Please enter a valid URL for the video"),
  // videoTitle: Yup.string().required("Video Title is required"),
  // documents: Yup.array().min(1).required("Please upload at least one Document"),

  // Step 7
  smoking: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Smoking preference is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  petPolicy: Yup.string().when("purpose", {
    is: "coliving space",
    then: (schema) => schema.required("Pet policy is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // houseHelp: Yup.string().when("purpose", {
  //   is: "coliving space",
  //   then: (schema) => schema.required("House help preference is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // guest: Yup.string().when("purpose", {
  //   is: "coliving space",
  //   then: (schema) => schema.required("Guest policy is required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // Step 7
  // moreRoomsSameFeatures: Yup.string().when("purpose", {
  //   is: "coliving space",
  //   then: (schema) =>
  //     schema.required("Additional rooms with the same features are required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // moreRoomsDifferentFeatures: Yup.string().when("purpose", {
  //   is: "coliving space",
  //   then: (schema) =>
  //     schema.required("Additional rooms with different features are required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // Step 8
  contactPerson: Yup.string().required("Contact person name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumbers: Yup.string()
    // .matches(/^\d{10}$/, "Invalid Mobile Number")
    .required("Mobile Number is required"),
  landlineNumber: Yup.string()
    // .matches(/^\d{8}$/, "Invalid Landline Number")
    .required("Landline number is required"),
});
