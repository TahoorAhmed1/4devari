import React, { useEffect, useRef, useState } from "react";
import classes from "./edit-property.module.css";
import property_preview_pic from "../../../public/assets/dashboard/property_preview_pic.png";
import check_symbol from "../../../public/assets/dashboard/check_icon.svg";
import doc1 from "/public/assets/project_detail_assets/pdf.svg";
import doc2 from "/public/assets/project_detail_assets/word.svg";
import XIcon from "/public/assets/icons/XIcon.svg";
import PropertyDemoCard from "../../cards/property-demo-card";
import Link from "next/link";
import { useFormik } from "formik";
import { propertyDetailSchema } from "../../../schemas";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, DatePicker } from "antd";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import LocationPicker from "../../common/location-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadDocuments,
  uploadImages,
  uploadVideos,
} from "../../../redux/cloudinaryUpload";
import { fetchPropertyById, updateProperty } from "../../../redux/property";
import useLoadingToast from "../../../hooks/useLoadingToast";
import { useAuth } from "../../../contextApi";
import { useRouter } from "next/router";
import moment from "moment";
import { MAP_API_KEY, MAP_LIBRARIES, Map_ID } from "../../../config";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import { FEATURE_DATA } from "../../../data/feature";
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.extend(buddhistEra);

const defaultCenter = { lat: 31.4515033, lng: 74.35564649999999 };

function EditProperty() {
  const { user } = useAuth();
  // const { isApiLoaded } = useGoogleApi()
  const { openLoadingToast, closeLoadingToast, openErrorToast } =
    useLoadingToast();
  const [activeSection, setActiveSection] = useState("section1");
  const [activeItem, setActiveItem] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPurpose, setInitialPurpose] = useState("buy");
  const [images, setImages] = useState([]);
  const [featureNames, setFeatureNames] = useState({});

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const router = useRouter();
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const locationRef = useRef(null);

  const { propertyById } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchPropertyById(router?.query?.id));
  }, []);

  function initialValues() {
    switch (initialPurpose) {
      case "rent":
        return {
          purpose: "rent",
          type: "residential",
          subtype: "House",
          city: "",
          location: "",
          address: "",
          mapPin: "",
          areaSize: "",
          areaSizeUnit: "Sq.Yd.",
          noOfBathrooms: "",
          noOfBedrooms: "",
          occupancyStatus: "",
          availableFrom: "",
          furnishing: "",
          listingExpiry: "",
          minimumContractPeriod: "",
          monthlyRent: "",
          advance: false,
          securityDeposit: false,
          title: "",
          description: "",

          images: [],
          videos: [],
          videoLink: "",
          videoTitle: "",
          documents: [],
          priceUnit: "PKR",

          contactPerson: "",
          landlineNumber: "",
          mobileNumbers: "",
          email: "",
          whatsapp: "",
        };
      case "coliving space":
        return {
          purpose: "coliving space",
          type: "residential",
          subtype: "House",
          room_sharing_type: "",
          room_sharing_subtype: "",
          private_room: "",

          city: "",
          location: "",
          houseNumber: "",
          address: "",
          mapPin: "",
          areaSize: "",
          areaSizeUnit: "Sq.Yd.",
          foodAvailability: "",
          gender: "",
          occupantsType: "",
          occupancyStatus: "",
          availableFrom: "",
          furnishing: "",
          listingExpiry: "",

          minimumContractPeriod: "",
          monthlyRentPerRoom: "",
          advance: false,
          securityDeposit: false,
          title: "",
          description: "",

          images: [],
          videos: [],
          videoLink: "",
          videoTitle: "",
          documents: [],
          priceUnit: "PKR",

          smoking: "Allowed",
          petPolicy: "Allowed",

          contactPerson: "",
          landlineNumber: "",
          mobileNumbers: "",
          email: "",
          whatsapp: "",
        };
      case "coworking space":
        return {
          purpose: "coworking space",
          areaSizeUnit: "Sq.Yd.",
          type: "residential",
          city: "",
          location: "",
          address: "",
          officeNumber: "",
          floorNumber: "",
          streetNumber: "",
          mapPin: "",
          areaSize: "",
          furnishing: "",
          listingExpiry: "",

          minimumContractPeriod: "",
          privateOffice: false,
          conferenceRoom: false,
          sharedDesk: false,
          dedicatedDesk: false,
          managerDesk: false,
          executiveDesk: false,
          meetingRoom: false,

          title: "",
          description: "",

          images: [],
          videos: [],
          videoLink: "",
          videoTitle: "",
          documents: [],
          priceUnit: "PKR",

          contactPerson: "",
          landlineNumber: "",
          mobileNumbers: "",
          email: "",
          whatsapp: "",
        };
      default:
        return {
          purpose: "buy",
          areaSizeUnit: "Sq.Yd.",
          type: "residential",
          subtype: "House",
          city: "",
          location: "",
          address: "",
          mapPin: "",
          areaSize: "",
          noOfBathrooms: "",
          noOfBedrooms: "",
          occupancyStatus: "",
          availableFrom: "",
          advance: false,
          installmentAvailable: false,
          remainingInstallments: "",
          monthlyInstallments: "",
          price: "",
          priceUnit: "PKR",
          possessionStatus: false,
          furnishing: "",
          listingExpiry: "",
          title: "",
          description: "",
          images: [],
          videos: [],
          videoLink: "",
          videoTitle: "",
          documents: [],

          contactPerson: "",
          landlineNumber: "",
          mobileNumbers: "",
          email: "",
          whatsapp: "",
        };
    }
  }

  const filterStringValues = (object) => {
    const filteredObject = {};

    for (const key in object) {
      if (typeof object[key] === "string") {
        filteredObject[key] = object[key];
      }
    }

    return filteredObject;
  };

  useEffect(() => {
    const filteredData = filterStringValues(
      propertyById?.property?.features ? propertyById?.property?.features : []
    );
    // console.log("filteredDatafilteredData",filteredData)
    if (propertyById?.property?.purpose === "buy") {
      const data = {
        purpose: propertyById?.property?.purpose || "",
        areaSizeUnit: propertyById?.property?.areaSizeUnit || "Sq.Yd.",
        type: propertyById?.property?.type || "",
        subtype: propertyById?.subtype || "",
        city: propertyById?.property?.city || "",
        location: propertyById?.property?.location || "",
        address: propertyById?.address || "",
        mapPin: propertyById?.property?.mapPin || "",
        areaSize: propertyById?.property?.areaSize || "",
        noOfBathrooms: propertyById?.noOfBathrooms || "",
        noOfBedrooms: propertyById?.noOfBedrooms || "",
        occupancyStatus: propertyById?.occupancyStatus || "",
        availableFrom: propertyById?.availableFrom || "",
        advance: propertyById?.advanceAmount?.length > 0 || false,
        advanceAmount: propertyById?.advanceAmount || "",
        installmentAvailable:
          propertyById?.remainingInstallments ||
          propertyById?.monthlyInstallments
            ? true
            : false,
        remainingInstallments: propertyById?.remainingInstallments || "",
        monthlyInstallments: propertyById?.monthlyInstallments || "",
        price: propertyById?.price || "",
        priceUnit: propertyById?.priceUnit || "PKR",
        possessionStatus: propertyById?.possessionStatus || false,
        furnishing: propertyById?.furnishing || "",
        listingExpiry: propertyById?.property?.listingExpiry || "",
        title: propertyById?.property?.title || "",
        description: propertyById?.property?.description || "",
        images: propertyById?.property?.images || [],
        videos: propertyById?.property?.videos || [],
        videoLink: propertyById?.property?.videoLink || "",
        videoTitle: propertyById?.property?.videoTitle || "",
        documents: propertyById?.property?.documents || [],
        contactPerson: propertyById?.property?.contactPerson || "",
        landlineNumber: propertyById?.property?.landlineNumber || "",
        mobileNumbers: propertyById?.property?.mobileNumbers?.[0] | "",
        email: propertyById?.property?.email || "",
        whatsapp: propertyById?.property?.whatsapp || "",
      };

      setSelectedLocation(JSON.parse(propertyById?.property?.mapPin));
      setValues({ ...data, ...filteredData });
    } else if (propertyById?.property?.purpose === "rent") {
      const rentData = {
        purpose: propertyById?.property?.purpose || "rent",
        type: propertyById?.property?.type || "",
        subtype: propertyById?.subtype || "",
        city: propertyById?.property?.city || "",
        location: propertyById?.property?.location || "",
        address: propertyById?.address || "",
        mapPin: propertyById?.property?.mapPin || "",
        areaSize: propertyById?.property?.areaSize || "",
        areaSizeUnit: propertyById?.property?.areaSizeUnit || "Sq.Yd.",
        noOfBathrooms: propertyById?.noOfBathrooms || "",
        noOfBedrooms: propertyById?.noOfBedrooms || "",
        occupancyStatus: propertyById?.occupancyStatus || "",
        availableFrom: propertyById?.availableFrom || "",
        furnishing: propertyById?.furnishing || "",
        listingExpiry: propertyById?.property?.listingExpiry || "",
        minimumContractPeriod: propertyById?.minimumContractPeriod || "",
        monthlyRent: propertyById?.monthlyRent || "",
        advance: propertyById?.advanceAmount?.length > 0 || false,
        advanceAmount: propertyById?.advanceAmount || "",
        securityDeposit: false,
        title: propertyById?.property?.title || "",
        description: propertyById?.property?.description || "",
        images: propertyById?.property?.images || [],
        videos: propertyById?.property?.videos || [],
        videoLink: propertyById?.property?.videoLink || "",
        videoTitle: propertyById?.property?.videoTitle || "",
        documents: propertyById?.property?.documents || [],
        priceUnit: "PKR",
        contactPerson: propertyById?.property?.contactPerson || "",
        landlineNumber: propertyById?.property?.landlineNumber || "",
        mobileNumbers: propertyById?.property?.mobileNumbers?.[0] || "",
        email: propertyById?.property?.email || "",
        whatsapp: propertyById?.property?.whatsapp || "",
      };
      setSelectedLocation(JSON.parse(propertyById?.property?.mapPin));
      setValues({ ...rentData, ...filteredData });
    } else if (propertyById?.property?.purpose === "coliving space") {
      const colivingData = {
        purpose: propertyById?.property?.purpose || "coliving space",
        type: propertyById?.property?.type || "",
        subtype: propertyById?.subtype || "",
        room_sharing_type: propertyById?.room_sharing_type || "",
        room_sharing_subtype: propertyById?.room_sharing_subtype || "",
        private_room: propertyById?.private_room || "",
        city: propertyById?.property?.city || "",
        location: propertyById?.property?.location || "",
        houseNumber: propertyById?.houseNumber || "",
        address: propertyById?.address || "",
        mapPin: propertyById?.property?.mapPin || "",
        areaSize: propertyById?.property?.areaSize || "",
        areaSizeUnit: propertyById?.property?.areaSizeUnit || "Sq.Yd.",
        foodAvailability: propertyById?.foodAvailability || "",
        gender: propertyById?.gender || "",
        occupantsType: propertyById?.occupantsType || "",
        occupancyStatus: propertyById?.occupancyStatus || "",
        availableFrom: propertyById?.availableFrom || "",
        furnishing: propertyById?.furnishing || "",
        listingExpiry: propertyById?.property?.listingExpiry || "",
        minimumContractPeriod: propertyById?.minimumContractPeriod || "",
        monthlyRentPerRoom: propertyById?.monthlyRentPerRoom || "",
        advance: propertyById?.advanceAmount?.length > 0 || false,
        advanceAmount: propertyById?.advanceAmount || "",
        securityDeposit: false,
        title: propertyById?.property?.title || "",
        description: propertyById?.property?.description || "",
        images: propertyById?.property?.images || [],
        videos: propertyById?.property?.videos || [],
        videoLink: propertyById?.property?.videoLink || "",
        videoTitle: propertyById?.property?.videoTitle || "",
        documents: propertyById?.property?.documents || [],
        priceUnit: "PKR",
        smoking: "Allowed",
        petPolicy: propertyById?.property?.features?.petPolicy || "Allowed",
        contactPerson: propertyById?.property?.contactPerson || "",
        landlineNumber: propertyById?.property?.landlineNumber || "",
        mobileNumbers: propertyById?.property?.mobileNumbers?.[0] || "",
        email: propertyById?.property?.email || "",
        whatsapp: propertyById?.property?.whatsapp || "",

        houseHelp: propertyById?.houseHelp || "",
        guest: propertyById?.guest || "",
        morePrivateRoomsAvailable:
          propertyById?.morePrivateRoomsAvailable || "",
        moreSharedRoomsAvailable: propertyById?.moreSharedRoomsAvailable || "",
        moreRoomsSameFeatures: propertyById?.moreRoomsSameFeatures || "",
        moreRoomsDifferentFeatures:
          propertyById?.moreRoomsDifferentFeatures || "",
      };
      setSelectedLocation(JSON.parse(propertyById?.property?.mapPin));
      setValues({ ...colivingData, ...filteredData });
    } else if (propertyById?.property?.purpose === "coworking space") {
      const coworkingData = {
        purpose: propertyById?.property?.purpose || "coworking space",
        areaSizeUnit: propertyById?.property?.areaSizeUnit || "Sq.Yd.",
        type: propertyById?.property?.type || "",
        city: propertyById?.property?.city || "",
        location: propertyById?.property?.location || "",
        address: propertyById?.address || "",
        officeNumber: propertyById?.officeNumber || "",
        floorNumber: propertyById?.floorNumber || "",
        streetNumber: propertyById?.streetNumber || "",
        mapPin: propertyById?.property?.mapPin || "",
        areaSize: propertyById?.property?.areaSize || "",
        furnishing: propertyById?.furnishing || "",
        listingExpiry: propertyById?.property?.listingExpiry || "",
        minimumContractPeriod: propertyById?.minimumContractPeriod || "",
        // Private offices
        privateOffice:
          propertyById?.noOfPrivateOfficesAvailable > 0 ? true : false,
        noOfPrivateOfficesAvailable: propertyById?.noOfPrivateOfficesAvailable,
        privateOfficeAvailableOn: propertyById?.privateOfficeAvailableOn,
        privateOfficeRentPerHour: propertyById?.privateOfficeRentPerHour,
        privateOfficeRentPerDay: propertyById?.privateOfficeRentPerDay,
        privateOfficePriceMonth: propertyById?.privateOfficePriceMonth,
        // Conference room
        conferenceRoom: propertyById?.conferenceRoomCapacity > 0 ? true : false,
        conferenceRoomCapacity: propertyById?.conferenceRoomCapacity,
        conferenceRoomAvailableOn: propertyById?.conferenceRoomAvailableOn,
        conferenceRoomRentPerHour: propertyById?.conferenceRoomRentPerHour,
        conferenceRoomPriceDay: propertyById?.conferenceRoomPriceDay,
        conferenceRoomRentPerMonth: propertyById?.conferenceRoomRentPerMonth,
        // Shared Desk
        sharedDesk: propertyById?.noOfSharedDesksAvailable > 0 ? true : false,
        noOfSharedDesksAvailable: propertyById?.noOfSharedDesksAvailable,
        sharedDeskAvailableOn: propertyById?.sharedDeskAvailableOn,
        sharedDeskRentPerHour: propertyById?.sharedDeskRentPerHour,
        sharedDeskRentPerDay: propertyById?.sharedDeskRentPerDay,
        sharedDeskRentPerMonth: propertyById?.sharedDeskRentPerMonth,
        // Dedicated Desk
        dedicatedDesk:
          propertyById?.noOfDedicatedDesksAvailable > 0 ? true : false,
        noOfDedicatedDesksAvailable: propertyById?.noOfDedicatedDesksAvailable,
        dedicatedDeskAvailableOn: propertyById?.dedicatedDeskAvailableOn,
        dedicatedDeskRentPerHour: propertyById?.dedicatedDeskRentPerHour,
        dedicatedDeskRentPerDay: propertyById?.dedicatedDeskRentPerDay,
        dedicatedDeskRentPerMonth: propertyById?.dedicatedDeskRentPerMonth,
        // Manager Desk
        managerDesk: propertyById?.noOfManagerDesksAvailable > 0 ? true : false,
        noOfManagerDesksAvailable: propertyById?.noOfManagerDesksAvailable,
        managerDeskAvailableOn: propertyById?.managerDeskAvailableOn,
        managerDeskRentPerHour: propertyById?.managerDeskRentPerHour,
        managerDeskRentPerDay: propertyById?.managerDeskRentPerDay,
        managerDeskRentPerMonth: propertyById?.managerDeskRentPerMonth,
        // Exective Desk
        executiveDesk:
          propertyById?.noOfExecutiveDesksAvailable > 0 ? true : false,
        noOfExecutiveDesksAvailable: propertyById?.noOfExecutiveDesksAvailable,
        executiveDeskAvailableOn: propertyById?.executiveDeskAvailableOn,
        executiveDeskRentPerHour: propertyById?.executiveDeskRentPerHour,
        executiveDeskRentPerDay: propertyById?.executiveDeskRentPerDay,
        executiveDeskRentPerMonth: propertyById?.executiveDeskRentPerMonth,
        // Meeting Room
        meetingRoom: propertyById?.noOfMeetingRoomsAvailable > 0 ? true : false,
        noOfMeetingRoomsAvailable: propertyById?.noOfMeetingRoomsAvailable,
        meetingRoomAvailableOn: propertyById?.meetingRoomAvailableOn,
        meetingRoomRentPerHour: propertyById?.meetingRoomRentPerHour,
        meetingRoomRentPerDay: propertyById?.meetingRoomRentPerDay,
        meetingRoomRentPerMonth: propertyById?.meetingRoomRentPerMonth,

        title: propertyById?.property?.title || "",
        description: propertyById?.property?.description || "",
        images: propertyById?.property?.images || [],
        videos: propertyById?.property?.videos || [],
        videoLink: propertyById?.property?.videoLink || "",
        videoTitle: propertyById?.property?.videoTitle || "",
        documents: propertyById?.property?.documents || [],
        priceUnit: "PKR",
        contactPerson: propertyById?.property?.contactPerson || "",
        landlineNumber: propertyById?.property?.landlineNumber || "",
        mobileNumbers: propertyById?.property?.mobileNumbers?.[0] || [],
        email: propertyById?.property?.email || "",
        whatsapp: propertyById?.property?.whatsapp || "",
      };
      setSelectedLocation(JSON.parse(propertyById?.property?.mapPin));
      setValues({ ...coworkingData, ...filteredData });
    }
  }, [propertyById]);

  const {
    values,
    handleBlur,
    handleSubmit,
    setValues,
    errors,
    setErrors,
    resetForm,
  } = useFormik({
    initialValues: initialValues(), // Change this line
    validationSchema: propertyDetailSchema,
    validateOnChange: false,
    // validate: false,
    onSubmit: (values) => {
      delete values?._id;
      let updatedData = {
        ...values,
        // user: user?.id,
        features: propertyById?.property?.features?._id,
        id: router?.query?.id,
        price:
          values?.monthlyRent ||
          values?.monthlyRentPerRoom ||
          values?.price ||
          "",
        mapPin: JSON.stringify(selectedLocation),
        geoLocation: {
          type: "Point",
          coordinates: [selectedLocation?.lng, selectedLocation?.lat],
        },
      };
      if (!updatedData?.privateOffice) {
        updatedData.noOfPrivateOfficesAvailable = null;
        updatedData.privateOfficeAvailableOn = "";
        updatedData.privateOfficeRentPerHour = null;
        updatedData.privateOfficeRentPerDay = null;
        updatedData.privateOfficePriceMonth = null;
      }
      if (!updatedData?.conferenceRoom) {
        updatedData.conferenceRoomCapacity = null;
        updatedData.conferenceRoomAvailableOn = "";
        updatedData.conferenceRoomRentPerHour = null;
        updatedData.conferenceRoomPriceDay = null;
        updatedData.conferenceRoomRentPerMonth = null;
      }
      if (!updatedData?.sharedDesk) {
        updatedData.noOfSharedDesksAvailable = null;
        updatedData.sharedDeskAvailableOn = "";
        updatedData.sharedDeskRentPerHour = null;
        updatedData.sharedDeskRentPerDay = null;
        updatedData.sharedDeskRentPerMonth = null;
      }
      if (!updatedData?.dedicatedDesk) {
        updatedData.noOfDedicatedDesksAvailable = null;
        updatedData.dedicatedDeskAvailableOn = "";
        updatedData.dedicatedDeskRentPerHour = null;
        updatedData.dedicatedDeskRentPerDay = null;
        updatedData.dedicatedDeskRentPerMonth = null;
      }
      if (!updatedData?.managerDesk) {
        updatedData.noOfManagerDesksAvailable = null;
        updatedData.managerDeskAvailableOn = "";
        updatedData.managerDeskRentPerHour = null;
        updatedData.managerDeskRentPerDay = null;
        updatedData.managerDeskRentPerMonth = null;
      }
      if (!updatedData?.executiveDesk) {
        updatedData.noOfExecutiveDesksAvailable = null;
        updatedData.executiveDeskAvailableOn = "";
        updatedData.executiveDeskRentPerHour = null;
        updatedData.executiveDeskRentPerDay = null;
        updatedData.executiveDeskRentPerMonth = null;
      }
      if (!updatedData?.meetingRoom) {
        updatedData.noOfMeetingRoomsAvailable = null;
        updatedData.meetingRoomAvailableOn = "";
        updatedData.meetingRoomRentPerHour = null;
        updatedData.meetingRoomRentPerDay = null;
        updatedData.meetingRoomRentPerMonth = null;
      }
      if (!updatedData?.advance) {
        updatedData.advanceAmount = "";
      }
      if (!updatedData?.installmentAvailable) {
        updatedData.remainingInstallments = "";
        updatedData.monthlyInstallments = "";
      }
      // console.log("updatedData", updatedData?.mapPin)
      try {
        setIsLoading(true);
        dispatch(updateProperty(updatedData)).then((res) => {
          resetForm();
          setIsLoading(false);
          message.success(`Property updated Successfully`);
          router.push("/dashboard/user/my-listing");
        });
      } catch (error) {
        setIsLoading(false);
        message.error(error);
        console.error("An error occurred during form submission:", error);
      }
    },
  });

  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
    section4: useRef(null),
    section5: useRef(null),
    section6: useRef(null),
    section7: useRef(null),
    section8: useRef(null),
    section9: useRef(null),
    section10: useRef(null),
    section11: useRef(null),
    section12: useRef(null),
    section13: useRef(null),
    section14: useRef(null),
    section15: useRef(null),
    section16: useRef(null),
    section17: useRef(null),
    section18: useRef(null),
    section19: useRef(null),
    section20: useRef(null),
    section21: useRef(null),
    section22: useRef(null),
    section23: useRef(null),
    section24: useRef(null),
    section25: useRef(null),
    section26: useRef(null),
    section27: useRef(null),
    section28: useRef(null),
    section29: useRef(null),
    section30: useRef(null),
  };

  const faqData = [
    {
      question: "How much does a website cost?",
      answer:
        "While we would love to be able to give a definitive, fixed price for a website...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        "This will vary depending on the type of project. For logo & branding projects...",
    },
  ];

  const toggleItem = (index) => {
    setActiveItem((prevActiveItem) =>
      prevActiveItem === index ? null : index
    );
  };

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    if (values?.[name]) {
      setValues({ ...values, [name]: false });
    } else {
      setValues({ ...values, [name]: true });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = formRef.current.scrollTop + 120; // Use scrollTop for scroll position

      for (const sectionId in sectionRefs) {
        const section = sectionRefs[sectionId].current;

        if (section) {
          const { offsetTop, offsetHeight } = section;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break; // Exit loop when we find the active section
          }
        }
      }
    };

    formRef.current.addEventListener("scroll", handleScroll);

    return () => {
      formRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ImageProps = {
    name: "file",
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    accept: ".png,.jpeg,.jpg",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload(file) {
      const isSizeValid = file.size / 1024 / 1024 <= 5; // Check if file size is less than or equal to 5 MB
      const isCountValid = values?.images?.length < 10; // Allow 1 more image to reach the total of 10

      if (!isSizeValid) {
        message.error("File size must be less than or equal to 5 MB");
      }
      if (!isCountValid) {
        message.error("Maximum of 10 images allowed");
      }
      return isSizeValid && isCountValid;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setIsLoading(true);
        openLoadingToast("uploading image");
        const files = info?.file?.originFileObj
          ? URL.createObjectURL(info?.file?.originFileObj)
          : "";
        const newImages =
          values?.images?.length > 0 ? [...values?.images, files] : [files];
        setImages(newImages);
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
        try {
          dispatch(uploadImages(formData)).then((res) => {
            if (res?.payload?.url) {
              const img = res?.payload?.url;
              setIsLoading(false);
              closeLoadingToast();
              setValues((prev) => ({
                ...prev,
                images: prev.images ? [...prev.images, img] : [img],
              }));
              message.success(`${info.file.name} file uploaded successfully`);
            }
          });
        } catch (error) {
          setIsLoading(false);
          closeLoadingToast();
          openErrorToast("Error while uploading");
        }
      } else if (info.file.status === "error") {
        closeLoadingToast();
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const VideoProps = {
    name: "file",
    accept: ".mp4,.avi,.mkv,.mov,.wmv",
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload(file) {
      const isSizeValid = file.size / 1024 / 1024 <= 15; // Check if file size is less than or equal to 5 MB
      const isCountValid = values?.videos?.length < 1; // Allow 1 more image to reach the total of 10

      if (!isSizeValid) {
        message.error("File size must be less than or equal to 15 MB");
      }
      if (!isCountValid) {
        message.error("Maximum of 1 video allowed");
      }
      return isSizeValid && isCountValid;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setIsLoading(true);
        openLoadingToast("uploading video");
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
        try {
          dispatch(uploadVideos(formData)).then((res) => {
            const vid = res?.payload?.url;
            setValues((prev) => ({
              ...prev,
              videos: prev.videos ? [...prev.videos, vid] : [vid],
            }));
            setIsLoading(false);
            closeLoadingToast();
            message.success(`${info.file.name} file uploaded successfully`);
          });
        } catch (error) {
          setIsLoading(false);
          closeLoadingToast();
        }
        // setValues({ ...values, videos: newVideos });
      } else if (info.file.status === "error") {
        closeLoadingToast();
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const DocumentProps = {
    name: "file",
    accept: ".doc,.docx",
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload(file) {
      const isSizeValid = file.size / 1024 / 1024 <= 15; // Check if file size is less than or equal to 5 MB
      const isCountValid = values?.documents?.length < 1; // Allow 1 more image to reach the total of 10

      if (!isSizeValid) {
        message.error("File size must be less than or equal to 15 MB");
      }
      if (!isCountValid) {
        message.error("Maximum of 1 document allowed");
      }
      return isSizeValid && isCountValid;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        const files = info?.file?.originFileObj
          ? URL.createObjectURL(info?.file?.originFileObj)
          : "";
        setIsLoading(true);
        openLoadingToast("uploading document");
        const newDocuments =
          values?.documents?.length > 0
            ? [...values?.documents, files]
            : [files];
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
        try {
          dispatch(uploadDocuments(formData)).then((res) => {
            const doc = res?.payload?.url;
            setIsLoading(false);
            closeLoadingToast();
            message.success(`${info.file.name} file uploaded successfully`);
            setValues((prev) => ({
              ...prev,
              documents: prev.documents ? [...prev.documents, doc] : [doc],
            }));
          });
        } catch (error) {
          closeLoadingToast();
          setIsLoading(false);
        }
        // setValues({ ...values, documents: newDocuments });
      } else if (info.file.status === "error") {
        closeLoadingToast();
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function convertTimestampToJSDate(timestamp) {
    const date = new Date(timestamp);
    return date?.toISOString().split('T')[0];
  }

  function convertToYearMonthFormat(dateString) {
    const [month, year] = dateString.split('/');
    return `${year}-${month}`;
}


  // select with search antd

  const onAvalibiltyChange = (date, dateString) => {
    setValues({ ...values, availableFrom: dateString });
  };

  const onContractPeriodChangeChange = (date, dateString) => {
    setValues({ ...values, minimumContractPeriod: dateString });
  };

  const handleNoChange = (no) => {
    setValues({ ...values, landlineNumber: no });
  };
  const handleMobileNoChange = (no) => {
    setValues({ ...values, mobileNumbers: no });
  };
  const handleWhatsappNoChange = (no) => {
    setValues({ ...values, whatsapp: no });
  };

  const propertyNamesByType = {
    buy: {
      residential: [
        "House",
        "Flat",
        "Lower portion",
        "Upper portion",
        "Farmhouse",
        "Pent house",
        "Basement",
        "Hostel",
        "Guest house",
        "Hotel suites",
        "Beach huts",
      ],
      commercial: [
        "Office",
        "Shop",
        "Warehouse",
        "Factory",
        "Building",
        "Others",
      ],
      plot: [
        "Residential plot",
        "Commercial plot",
        "Agriculture plot",
        "Industrial plot",
        "Plot file",
        "Plot form",
      ],
    },
    rent: {
      residential: [
        "House",
        "Flat",
        "Lower portion",
        "Upper portion",
        "Pent house",
        "Basement",
        "Farmhouse",
        "Guest house",
        "Hotel suites",
        "Beach huts",
      ],
      commercial: [
        "Office",
        "Shop",
        "Warehouse",
        "Factory",
        "Building",
        "Others",
      ],
      plot: [
        "Residential plot",
        "Commercial plot",
        "Agricultral plot",
        "Industrial plot",
      ],
    },
    "coliving space": {
      residential: ["House", "Flat", "Hostel"],
      commercial: ["House", "Flat", "Hostel"],
      plot: [],
    },
    "coworking space": {
      residential: [],
      commercial: [],
      plot: [],
    },
  };
  const propertyNames = propertyNamesByType?.[values.purpose]?.[values.type];

  const handleChangePropertyType = (e) => {
    const subtypeData =
      propertyNamesByType?.[values.purpose]?.[e.target.value]?.[0];
    const data = { ...values, type: e.target.value, subtype: subtypeData };
    const featureNamesFields =
      FEATURE_DATA?.[values.purpose]?.[e.target.value]?.[subtypeData];
    setValues(data);
    // setFeatureNames(featureNamesFields);
  };

  useEffect(() => {
    const subtypeData =
      propertyNamesByType?.[values.purpose]?.[values?.type]?.[0];
    const featureNamesFields =
      values.purpose === "coworking space"
        ? FEATURE_DATA?.[values.purpose]?.[values?.type]
        : FEATURE_DATA?.[values.purpose]?.[values?.type]?.[subtypeData];
    setFeatureNames(featureNamesFields);
    // console.log("Valuesss",values)
  }, [values?.purpose, values?.type, values?.subtype]);

  const generateSteps = (stepCount) => {
    const steps = [];
    for (let i = 1; i <= stepCount; i++) {
      const section = `section${i}`;
      const isActive = activeSection === section;
      steps.push(
        <div key={i} className={classes.single_stepper_container}>
          <Link
            href={`#${section}`}
            className={
              isActive
                ? `${classes.single_step}`
                : `${classes.single_step_disabled}`
            }
          >
            {isActive && <img src={check_symbol.src} />}
            <p>Step {i}</p>
          </Link>
          {i !== stepCount && (
            <div
              className={
                isActive
                  ? `${classes.step_line}`
                  : `${classes.step_line_disabled}`
              }
            />
          )}
        </div>
      );
    }
    return steps;
  };
  const stepCount =
    values.purpose === "buy"
      ? 5
      : values.purpose === "rent"
      ? 6
      : values.purpose === "coliving space"
      ? 8
      : values.purpose === "coworking space" && 6;

  const handlePurposeChange = (e) => {
    setInitialPurpose(e.target.value);
    setImages([]);
    if (e.target.value === "buy") {
      setValues({
        purpose: "buy",
        type: "residential",
        subtype: "House",
        areaSizeUnit: "Sq.Yd.",
        city: "",
        location: "",
        address: "",
        mapPin: "",
        areaSize: "",
        noOfBathrooms: "",
        noOfBedrooms: "",
        occupancyStatus: "",
        availableFrom: "",
        advance: false,
        advanceAmount: "",
        installmentAvailable: false,
        remainingInstallments: "",
        monthlyInstallments: "",
        price: "",
        priceUnit: "PKR",
        possessionStatus: false,
        furnishing: "",
        listingExpiry: "",
        title: "",
        description: "",
        images: [],
        videos: [],
        videoLink: "",
        videoTitle: "",
        documents: [],

        contactPerson: "",
        landlineNumber: "",
        mobileNumbers: "",
        email: "",
        whatsapp: "",
      });
    } else if (e.target.value === "rent") {
      setValues({
        purpose: "rent",
        type: "residential",
        subtype: "House",
        city: "",
        location: "",
        address: "",
        mapPin: "",
        areaSize: "",
        areaSizeUnit: "Sq.Yd.",
        noOfBathrooms: "",
        noOfBedrooms: "",
        occupancyStatus: "",
        availableFrom: "",
        furnishing: "",
        listingExpiry: "",
        minimumContractPeriod: "",
        monthlyRent: "",
        advance: false,
        advanceAmount: "",
        securityDeposit: false,
        title: "",
        description: "",

        images: [],
        videos: [],
        videoLink: "",
        videoTitle: "",
        documents: [],
        priceUnit: "PKR",

        contactPerson: "",
        landlineNumber: "",
        mobileNumbers: "",
        email: "",
        whatsapp: "",
      });
    } else if (e.target.value === "coliving space") {
      setValues({
        purpose: "coliving space",
        type: "residential",
        subtype: "House",
        room_sharing_type: "",
        room_sharing_subtype: "",
        private_room: "",

        city: "",
        location: "",
        houseNumber: "",
        address: "",
        mapPin: "",
        areaSize: "",
        areaSizeUnit: "Sq.Yd.",
        foodAvailability: "",
        gender: "",
        occupantsType: "",
        occupancyStatus: "",
        availableFrom: "",
        furnishing: "",
        listingExpiry: "",

        minimumContractPeriod: "",
        monthlyRentPerRoom: "",
        advance: false,
        advanceAmount: "",
        securityDeposit: false,
        title: "",
        description: "",

        images: [],
        videos: [],
        videoLink: "",
        videoTitle: "",
        documents: [],
        priceUnit: "PKR",

        smoking: "Allowed",
        petPolicy: "Allowed",

        contactPerson: "",
        landlineNumber: "",
        mobileNumbers: "",
        email: "",
        whatsapp: "",
      });
    } else {
      setValues({
        purpose: "coworking space",
        type: "residential",
        areaSizeUnit: "Sq.Yd.",
        city: "",
        location: "",
        address: "",
        officeNumber: "",
        floorNumber: "",
        streetNumber: "",
        mapPin: "",
        areaSize: "",
        furnishing: "",
        listingExpiry: "",

        minimumContractPeriod: "",
        privateOffice: false,
        conferenceRoom: false,
        sharedDesk: false,
        dedicatedDesk: false,
        managerDesk: false,
        executiveDesk: false,
        meetingRoom: false,

        title: "",
        description: "",

        images: [],
        videos: [],
        videoLink: "",
        videoTitle: "",
        documents: [],
        priceUnit: "PKR",

        contactPerson: "",
        landlineNumber: "",
        mobileNumbers: "",
        email: "",
        whatsapp: "",
      });
    }
    setErrors({});
  };

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      message.warning(`${Object.values(errors)[0]}`, 3);
    }
  }, [errors]);

  const handleImgDelete = (item) => {
    const filtered = values?.images?.filter((data) => data !== item);
    setValues({ ...values, images: filtered });
  };
  const handleVidDelete = (item) => {
    const filtered = values?.videos?.filter((data) => data !== item);
    setValues({ ...values, videos: filtered });
  };
  const handleDocDelete = (item) => {
    const filtered = values?.documents?.filter((data) => data !== item);
    setValues({ ...values, documents: filtered });
  };

  const onLoadCity = (autocomplete) => {
    cityRef.current = autocomplete;
  };
  const onChangeCity = async () => {
    const place = await cityRef.current.getPlace();
    if (place?.formatted_address) {
      const city = place.address_components.find((component) =>
        component.types.includes("locality")
      );
      if (city) {
        // console.log("place",place)
        setValues({ ...values, city: city.long_name });
      }
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location.toJSON();
        setSelectedLocation({ lat: lat, lng: lng });
        setValues({
          ...values,
          city: city.long_name,
          mapPin: JSON.stringify({ lat: lat, lng: lng }),
        });
      }
    }
  };


  const onLoadLocation = (autocomplete) => {
    locationRef.current = autocomplete;
  };
  const onChangeLocation = async () => {
    const place = await locationRef.current.getPlace();
    if (place?.formatted_address) {
      setValues({ ...values, location: place?.formatted_address });
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location.toJSON();
        setSelectedLocation({ lat: lat, lng: lng });
        setValues({
          ...values,
          location: place?.formatted_address,
          mapPin: JSON.stringify({ lat: lat, lng: lng }),
        });
      }
    }
  };

  const onChangeAddress = async () => {
    if (addressRef?.current) {
      const place = await addressRef.current.getPlace();
      if (place?.formatted_address) {
        setValues({ ...values, address: place.formatted_address });
      }
      if (
        place?.formatted_address &&
        place.geometry &&
        place.geometry.location
      ) {
        const { lat, lng } = place.geometry.location.toJSON();
        setSelectedLocation({ lat: lat, lng: lng });
        setValues({
          ...values,
          address: place.formatted_address,
          mapPin: JSON.stringify({ lat: lat, lng: lng }),
        });
        // console.log("place",place?.formatted_address,lat,lng)
      }
    }
  };

  const onLoadAddrsess = (autocomplete) => {
    addressRef.current = autocomplete;
  };

  const featureLength =
    featureNames && Object.keys(featureNames)?.length
      ? Object.keys(featureNames)?.length
      : 0;
      
  return (
    <div className={classes.container}>
      <div className={classes.overlay} />

      <div className={classes.stepper_container}>
        {generateSteps(stepCount + featureLength)}
      </div>

      <div className={classes.content_container}>
        <div
          className={classes.forms_container}
          ref={formRef}
          id="scrollable_form"
        >
          {/* {Object.keys(errors)?.length > 0 && (
            <Alert
              message="Please fill all the required fields."
              className={classes.property_error_alert}
              type="error"
              closable
              onClose={onClose}
            />
          )} */}
          <div
            className={classes.single_form_container}
            id="section1"
            ref={sectionRefs.section1}
          >
            <h2 className={classes.heading}>
              STEP 1 - <span> Purpose Property Type & Location</span>
            </h2>

            <div className={classes.select_field_container}>
              <p className={classes.label}>Purpose</p>
              <div className={classes.styles_select}>
                <select
                  name="purpose"
                  // id="purpose"
                  value={values.purpose}
                  onChange={handlePurposeChange}
                  className={errors.purpose && classes.error_field}
                  // onBlur={handleBlur}
                >
                  <option value="buy">Sell</option>
                  <option value="rent">Rent</option>
                  <option value="coliving space">Shared Living</option>
                  <option value="coworking space">Co-Working</option>
                </select>
              </div>
            </div>
            {values.purpose !== "coworking space" && (
              <div className={classes.dual_container}>
                <div className={classes.input_field_container}>
                  <p className={classes.label}>Property Type</p>
                  <div className={classes.styles_select}>
                    <select
                      name="type"
                      id="type"
                      className={errors.type && classes.error_field}
                      value={values.type}
                      onChange={handleChangePropertyType}
                      // onBlur={handleBlur}
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      {(values.purpose === "buy" ||
                        values.purpose === "rent") && (
                        <option value="plot">Plots</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className={classes.styles_select}>
                  <select
                    name="subtype"
                    id="subtype"
                    value={values.subtype}
                    onChange={handleChange}
                    className={errors.subtype && classes.error_field}
                  >
                    {propertyNames?.map((name) => (
                      <option
                        key={name}
                        // value={name.toLowerCase().replace(/\s/g, "-")}
                        value={name}
                      >
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {values.purpose === "coworking space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Property Type</p>
                <div className={classes.styles_select}>
                  <select
                    name="type"
                    id="type"
                    value={values.type}
                    onChange={handleChangePropertyType}
                    // onBlur={handleBlur}
                    className={errors.type && classes.error_field}
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    {(values.purpose === "buy" ||
                      values.purpose === "rent") && (
                      <option value="plot">Plots</option>
                    )}
                  </select>
                  {!errors.type && (
                    <p className={classes.required_field}>{errors.type}</p>
                  )}
                </div>
              </div>
            )}
            {values?.purpose === "coliving space" && (
              <div className={classes.dual_container}>
                <div className={classes.input_field_container}>
                  <p className={classes.label}>Sharing Type & Room</p>
                  <div className={classes.styles_select}>
                    <select
                      name="room_sharing_type"
                      id="room_sharing_type"
                      value={values.room_sharing_type}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={
                        errors.room_sharing_type && classes.error_field
                      }
                    >
                      <option hidden>Select Room Sharing Type</option>
                      <option value="Private">Private</option>
                      <option value="Double">Double</option>
                      <option value="Triple">Triple</option>
                      <option value="+3">+3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.styles_select}>
                  <select
                    name="room_sharing_subtype"
                    id="room_sharing_subtype"
                    value={values.room_sharing_subtype}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={
                      errors.room_sharing_subtype && classes.error_field
                    }
                  >
                    <option hidden>Select Shared Room</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                    <option value="+3">+3</option>
                  </select>
                </div>
              </div>
            )}
            {values?.purpose === "coliving space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Private Room</p>
                <div className={classes.styles_select}>
                  <select
                    name="private_room"
                    id="private_room"
                    value={values.private_room}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.private_room && classes.error_field}
                  >
                    <option>Select Private Room</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            )}
            <div className={classes.input_field_container}>
              <p className={classes.label}>City</p>
              <div>
                <LoadScriptNext
                  googleMapsApiKey={MAP_API_KEY}
                  libraries={MAP_LIBRARIES}
                >
                  <Autocomplete
                    onLoad={onLoadCity}
                    key={MAP_API_KEY}
                    onPlaceChanged={onChangeCity}
                    types={["locality"]}
                    restrictions={{ country: "PK" }}
                    className="google_autocomplete"
                  >
                    <input
                      type="text"
                      placeholder="Enter your Current City"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={handleChange}
                      style={{ position: "relative" }}
                      className={`${classes.input_field} google_input ${
                        errors?.city && "err_field"
                      }`}
                      autoComplete="false"
                    />
                  </Autocomplete>
                </LoadScriptNext>
              </div>
            </div>

            <div className={classes.input_field_container}>
              <p className={classes.label}>Location</p>
              <div className={classes.ant_select_styles}>
                <LoadScriptNext
                  googleMapsApiKey={MAP_API_KEY}
                  libraries={MAP_LIBRARIES}
                  // No Need to load Ids for Autocomplete
                  // mapIds={Map_ID}
                >
                  <Autocomplete
                    onLoad={onLoadLocation}
                    key={MAP_API_KEY}
                    onPlaceChanged={onChangeLocation}
                    types={["establishment"]}
                    restrictions={{ country: "PK" }}
                    className="google_autocomplete"
                  >
                    <input
                      type="text"
                      placeholder="Enter your Current Location"
                      name="location"
                      id="location"
                      value={values.location}
                      onChange={handleChange}
                      className={`${classes.input_field} google_input ${
                        errors?.location && "err_field"
                      }`}
                      autoComplete="false"
                    />
                  </Autocomplete>
                </LoadScriptNext>
              </div>
            </div>

            {/* <div className={classes.dual_container}>
              <div className={classes.input_field_container}>
                <p className={classes.label}>Reference</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="reference"
                  id="reference"
                  value={values.reference}
                  onChange={handleChange}
                  className={`${classes.input_field} ${
                    errors.reference && classes.error_field
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Contact Number"
                name="referenceContact"
                id="referenceContact"
                value={values.referenceContact}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.referenceContact && classes.error_field
                }`}
              />
            </div> */}
            {/* <div className={classes.dual_container}>
              <div className={classes.input_field_container}>
                <p className={classes.label}>Street & House No.</p>
                <input
                  type="text"
                  placeholder="Street no."
                  name="street_no"
                  id="street_no"
                  value={values.street_no}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} `}
                />
              </div>
              <input
                type="text"
                placeholder="House no."
                name="house_no"
                id="house_no"
                value={values.house_no}
                onChange={handleChange}
                // onBlur={handleBlur}
                className={`${classes.input_field} `}
              />
            </div> */}

            {values?.purpose === "coliving space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>House Number</p>
                <input
                  type="text"
                  placeholder="Enter House number"
                  name="houseNumber"
                  id="houseNumber"
                  value={values.houseNumber}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.houseNumber && classes.error_field
                  }`}
                />
              </div>
            )}
            <div className={classes.input_field_container}>
              <p className={classes.label}>Address</p>
              <div>
                <LoadScriptNext
                  googleMapsApiKey={MAP_API_KEY}
                  libraries={MAP_LIBRARIES}
                >
                  <Autocomplete
                    onLoad={onLoadAddrsess}
                    key={MAP_API_KEY}
                    onPlaceChanged={onChangeAddress}
                    types={["address"]}
                    restrictions={{ country: "PK" }}
                    className="google_autocomplete"
                  >
                    <input
                      type="text"
                      placeholder="Enter your Address"
                      name="address"
                      id="address"
                      value={values.address}
                      onChange={handleChange}
                      className={`${classes.input_field} google_input ${
                        errors?.address && "err_field"
                      }`}
                      autoComplete="false"
                    />
                  </Autocomplete>
                </LoadScriptNext>
              </div>
            </div>
            {values?.purpose === "coworking space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Office Number</p>
                <input
                  type="text"
                  placeholder="Enter office number"
                  name="officeNumber"
                  id="officeNumber"
                  value={values.officeNumber}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.officeNumber && classes.error_field
                  }`}
                />
              </div>
            )}
            {values?.purpose === "coworking space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Floor Number</p>
                <input
                  type="text"
                  placeholder="Enter floor Number"
                  name="floorNumber"
                  id="floorNumber"
                  value={values.floorNumber}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.floorNumber && classes.error_field
                  }`}
                />
              </div>
            )}
            {values?.purpose === "coworking space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Street Number</p>
                <input
                  type="text"
                  placeholder="Enter street Number"
                  name="streetNumber"
                  id="streetNumber"
                  value={values.streetNumber}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.streetNumber && classes.error_field
                  }`}
                />
              </div>
            )}

            <div className={classes.location_picker}>
              <LocationPicker
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
          </div>
          <div
            className={classes.single_form_container}
            id="section2"
            ref={sectionRefs.section2}
          >
            <h2 className={classes.heading}>
              STEP 2 -{" "}
              <span>
                {" "}
                {values.purpose === "buy"
                  ? "Property Specs & Price"
                  : values.purpose === "coliving space"
                  ? "Room Specs"
                  : "Property Specs"}
              </span>
            </h2>
            <div className={classes.dual_area_container}>
              <div className={classes.input_field_container}>
                <p className={classes.label}>Size / Area</p>
                <input
                  type="text"
                  placeholder="size / area"
                  name="areaSize"
                  id="areaSize"
                  value={values.areaSize}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.areaSize && classes.error_field
                  }`}
                />
              </div>
              <div className={classes.styles_select}>
                <select
                  name="areaSizeUnit"
                  id="areaSizeUnit"
                  value={values.areaSizeUnit}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={errors.areaSizeUnit && classes.error_field}
                >
                  <option value="Sq.Yd.">Sq. Yd.</option>
                </select>
              </div>
            </div>
            {values.purpose === "coliving space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Food Avalibility</p>
                <div className={classes.styles_select}>
                  <select
                    name="foodAvailability"
                    id="foodAvailability"
                    value={values.foodAvailability}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.foodAvailability && classes.error_field}
                  >
                    <option hidden>Select Food Avalibility</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            )}
            {values.purpose === "coliving space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Gender</p>
                <div className={classes.styles_select}>
                  <select
                    name="gender"
                    id="gender"
                    value={values.gender}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.gender && classes.error_field}
                  >
                    <option hidden>Select Gender</option>
                    <option value="girls">Girls Only</option>
                    <option value="boys">Boys Only</option>
                    <option value="any">Any</option>
                  </select>
                </div>
              </div>
            )}
            {values.purpose === "coliving space" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Available For</p>
                <div className={classes.styles_select}>
                  <select
                    name="occupantsType"
                    id="occupantsType"
                    value={values.occupantsType}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.occupantsType && classes.error_field}
                  >
                    <option hidden>Select Available For</option>
                    <option value="Students">Students</option>
                    <option value="Working Professionals">
                      Working Professionals
                    </option>
                    <option value="any">Any</option>
                  </select>
                </div>
              </div>
            )}
            {(values.purpose === "buy" || values.purpose === "rent") && (
              <div className={classes.dual_container}>
                <div className={classes.input_field_container}>
                  <p className={classes.label}>Bed & Bath</p>
                  <div className={classes.styles_select}>
                    <select
                      name="noOfBedrooms"
                      id="noOfBedrooms"
                      value={values.noOfBedrooms}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={errors.noOfBedrooms && classes.error_field}
                    >
                      <option hidden>Select Bedrooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                <div className={classes.styles_select}>
                  <select
                    name="noOfBathrooms"
                    id="noOfBathrooms"
                    value={values.noOfBathrooms}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.noOfBathrooms && classes.error_field}
                  >
                    <option hidden>Select Bathrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
            )}

            {(values.purpose === "buy" ||
              values.purpose === "rent" ||
              values.purpose === "coliving space") && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Occupancy Status?</p>
                <div className={classes.styles_select}>
                  <select
                    name="occupancyStatus"
                    id="occupancyStatus"
                    value={values.occupancyStatus}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.occupancyStatus && classes.error_field}
                  >
                    <option hidden>Select Occupancy Status</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Vacant">Vacant</option>
                  </select>
                </div>
              </div>
            )}
            {(values.purpose === "buy" ||
              values.purpose === "rent" ||
              values.purpose === "coliving space") && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Available From?</p>
                <DatePicker
                  type="text"
                  name="availableFrom"
                  value={values.availableFrom ? dayjs(convertTimestampToJSDate(values.availableFrom)) : null}
                  id="availableFrom"
                  onChange={onAvalibiltyChange}
                  className={errors.availableFrom && classes.error_field}
                />
              </div>
            )}

            {values.purpose === "buy" && (
              <div className={classes.dual_area_container}>
                <div className={classes.input_field_container}>
                  <p className={classes.label}>Price</p>
                  <input
                    type="text"
                    placeholder="0"
                    name="price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={`${classes.input_field} ${
                      errors.price && classes.error_field
                    }`}
                  />
                </div>
                <div className={classes.styles_select}>
                  <select
                    name="priceUnit"
                    id="priceUnit"
                    value={values.priceUnit}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.priceUnit && classes.error_field}
                  >
                    <option value="PKR">PKR.</option>
                  </select>
                </div>
              </div>
            )}
            {values.purpose === "buy" && (
              <div className={classes.checkbox_option}>
                <div>
                  <p>Installment Available</p>
                  <span>Enable if listing is available on installments</span>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.installmentAvailable}
                      onChange={handleCheckboxChange}
                      name="installmentAvailable"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
            )}
            {values?.installmentAvailable && values?.purpose === "buy" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>
                  Number of remaining installments
                </p>
                <input
                  type="text"
                  placeholder="Enter Number of remaining installments"
                  name="remainingInstallments"
                  id="remainingInstallments"
                  value={values.remainingInstallments}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.remainingInstallments && classes.error_field
                  }`}
                />
              </div>
            )}
            {values?.installmentAvailable && values?.purpose === "buy" && (
              <div className={classes.input_field_container}>
                <p className={classes.label}>Monthly installments</p>
                <input
                  type="text"
                  placeholder="Enter Monthly installments"
                  name="monthlyInstallments"
                  id="monthlyInstallments"
                  value={values.monthlyInstallments}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.monthlyInstallments && classes.error_field
                  }`}
                />
              </div>
            )}
            {values.purpose === "buy" && (
              <div className={classes.checkbox_option}>
                <div>
                  <p>Advance</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.advance}
                      onChange={handleCheckboxChange}
                      name="advance"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
            )}
            {values.purpose === "buy" && values.advance && (
              <div className={classes.dual_area_container}>
                <div className={classes.input_field_container}>
                  <p className={classes.label}>Advance Amount</p>
                  <input
                    type="text"
                    placeholder="0"
                    name="advanceAmount"
                    id="advanceAmount"
                    value={values.advanceAmount}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={`${classes.input_field} ${
                      errors.advanceAmount && classes.error_field
                    }`}
                  />
                </div>
                <div className={classes.styles_select}>
                  <select
                    name="priceUnit"
                    id="priceUnit"
                    value={values.priceUnit}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  >
                    <option value="PKR">PKR</option>
                  </select>
                </div>
              </div>
            )}

            {values?.purpose === "buy" && (
              <div className={classes.checkbox_option}>
                <div>
                  <p>Possession Status</p>
                  <span>Enable if listing is ready for possession</span>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.possessionStatus}
                      onChange={handleCheckboxChange}
                      name="possessionStatus"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
            )}
            <div className={classes.input_field_container}>
              <p className={classes.label}>Furnishing</p>
              <div className={classes.styles_select}>
                <select
                  name="furnishing"
                  id="furnishing"
                  value={values.furnishing}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={errors.furnishing && classes.error_field}
                >
                  <option hidden>Select the Condition</option>
                  <option value="Unfurnished">Un Furnished</option>
                  <option value="Semi-furnished">Semi Furnished</option>
                  <option value="Fully furnished">Fully Furnished</option>
                </select>
              </div>
            </div>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Listing Expiry</p>
              <div className={classes.styles_select}>
                <select
                  name="listingExpiry"
                  id="listingExpiry"
                  value={values.listingExpiry}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={errors.listingExpiry && classes.error_field}
                  disabled
                >
                  <option hidden>Select the Listing Exipry Month</option>
                  <option value="One Month">One Month</option>
                  <option value="Two Months">Two Months</option>
                  <option value="Three Months">Three Months</option>
                </select>
              </div>
            </div>
          </div>
          {(values.purpose === "rent" ||
            values.purpose === "coliving space") && (
            <div
              className={classes.single_form_container}
              id="section3"
              ref={sectionRefs.section3}
            >
              <h2 className={classes.heading}>
                STEP 3 - <span> Rental Price & Details</span>
              </h2>

              <div className={classes.input_field_container}>
                <p className={classes.label}>Minimum Contract Period </p>
                <DatePicker.MonthPicker
                  name="minimumContractPeriod"
                  id="minimumContractPeriod"
                  value={values.minimumContractPeriod ? dayjs(convertToYearMonthFormat(values.minimumContractPeriod)) : null}
                  onChange={onContractPeriodChangeChange}
                  className={
                    errors.minimumContractPeriod && classes.error_field
                  }
                  type="text"
                  format="MM/YYYY"
                />
              </div>

              {values.purpose === "rent" && (
                <div className={classes.dual_area_container}>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Monthly Rent</p>
                    <input
                      type="text"
                      placeholder="Enter Monthly Rent"
                      name="monthlyRent"
                      id="monthlyRent"
                      value={values.monthlyRent}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.monthlyRent && classes.error_field
                      }`}
                    />
                  </div>
                  <div className={classes.styles_select}>
                    <select
                      name="priceUnit"
                      id="priceUnit"
                      value={values.priceUnit}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    >
                      <option value="PKR">PKR</option>
                    </select>
                  </div>
                </div>
              )}
              {values.purpose === "coliving space" && (
                <div className={classes.dual_area_container}>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Monthly Rent per Room</p>
                    <input
                      type="text"
                      placeholder="Enter Monthly Rent per Room"
                      name="monthlyRentPerRoom"
                      id="monthlyRentPerRoom"
                      value={values.monthlyRentPerRoom}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.monthlyRentPerRoom && classes.error_field
                      }`}
                    />
                  </div>
                  <div className={classes.styles_select}>
                    <select
                      name="priceUnit"
                      id="priceUnit"
                      value={values.priceUnit}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    >
                      <option value="PKR">PKR</option>
                    </select>
                  </div>
                </div>
              )}
              {/* <div className={classes.checkbox_option}>
                <div>
                  <p>Security deposit</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      type="checkbox"
                      checked={values.securityDeposit}
                      name="securityDeposit"
                      onChange={handleCheckboxChange}
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>

              {values.securityDeposit && (
                <div className={classes.dual_area_container}>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Security Deposit Amount</p>
                    <input
                      type="text"
                      placeholder="0"
                      name="securityDepositAmount"
                      id="securityDepositAmount"
                      value={values.securityDepositAmount}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.securityDepositAmount && classes.error_field
                      }`}
                    />
                  </div>
                  <div className={classes.styles_select}>
                    <select
                      name="priceUnit"
                      id="priceUnit"
                      value={values.priceUnit}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    >
                      <option value="PKR">PKR</option>
                    </select>
                  </div>
                </div>
              )} */}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Advance</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      type="checkbox"
                      checked={values.advance}
                      name="advance"
                      onChange={handleCheckboxChange}
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.advance && (
                <div className={classes.dual_area_container}>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Advance Amount</p>
                    <input
                      type="text"
                      placeholder="0"
                      name="advanceAmount"
                      id="advanceAmount"
                      value={values.advanceAmount}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.advanceAmount && classes.error_field
                      }`}
                    />
                  </div>
                  <div className={classes.styles_select}>
                    <select
                      name="priceUnit"
                      id="priceUnit"
                      value={values.priceUnit}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    >
                      <option value="PKR">PKR</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
          {values.purpose === "coworking space" && (
            <div
              className={classes.single_form_container}
              id="section3"
              ref={sectionRefs.section3}
            >
              <h2 className={classes.heading}>
                STEP 3 - <span>Workspace Types and Prices</span>
              </h2>
              <div className={classes.input_field_container}>
                <p className={classes.label}>
                  Minimum Contract Period (in months)
                </p>
                <input
                  type="number"
                  placeholder="Enter minimum contract period"
                  name="minimumContractPeriod"
                  id="minimumContractPeriod"
                  value={values.minimumContractPeriod}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.minimumContractPeriod && classes.error_field
                  }`}
                />
              </div>
              <div className={classes.checkbox_option}>
                <div>
                  <p>Private Office</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.privateOffice}
                      onChange={handleCheckboxChange}
                      name="privateOffice"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.privateOffice && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Number of Private Offices Available
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Number of Private Offices Available"
                      name="noOfPrivateOfficesAvailable"
                      id="noOfPrivateOfficesAvailable"
                      value={values.noOfPrivateOfficesAvailable}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.noOfPrivateOfficesAvailable &&
                        classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Private Office Available On</p>
                    <div className={classes.styles_select}>
                      <select
                        name="privateOfficeAvailableOn"
                        id="privateOfficeAvailableOn"
                        value={values.privateOfficeAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.privateOfficeAvailableOn && classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.privateOfficeAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Private Office Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="privateOfficeRentPerHour"
                        id="privateOfficeRentPerHour"
                        value={values.privateOfficeRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.privateOfficeRentPerHour && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.privateOfficeAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Private Office Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="privateOfficeRentPerDay"
                        id="privateOfficeRentPerDay"
                        value={values.privateOfficeRentPerDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.privateOfficeRentPerDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}
                  {values.privateOfficeAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Private Office Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="privateOfficePriceMonth"
                        id="privateOfficePriceMonth"
                        value={values.privateOfficePriceMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.privateOfficePriceMonth && classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Conference Room</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.conferenceRoom}
                      onChange={handleCheckboxChange}
                      name="conferenceRoom"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.conferenceRoom && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Conference Room Available (Capacity)
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Conference Room Capacity"
                      name="conferenceRoomCapacity"
                      id="conferenceRoomCapacity"
                      value={values.conferenceRoomCapacity}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.conferenceRoomCapacity && classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Conference Room Available On
                    </p>
                    <div className={classes.styles_select}>
                      <select
                        name="conferenceRoomAvailableOn"
                        id="conferenceRoomAvailableOn"
                        value={values.conferenceRoomAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.conferenceRoomAvailableOn &&
                          classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.conferenceRoomAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Conference Room Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="conferenceRoomRentPerHour"
                        id="conferenceRoomRentPerHour"
                        value={values.conferenceRoomRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.conferenceRoomRentPerHour &&
                          classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.conferenceRoomAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Conference Room Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="conferenceRoomPriceDay"
                        id="conferenceRoomPriceDay"
                        value={values.conferenceRoomPriceDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.conferenceRoomPriceDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.conferenceRoomAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Conference Room Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="conferenceRoomRentPerMonth"
                        id="conferenceRoomRentPerMonth"
                        value={values.conferenceRoomRentPerMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.conferenceRoomRentPerMonth &&
                          classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Shared Desk</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.sharedDesk}
                      onChange={handleCheckboxChange}
                      name="sharedDesk"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.sharedDesk && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Number of Shared Desks Available
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Number of Shared Desks Available"
                      name="noOfSharedDesksAvailable"
                      id="noOfSharedDesksAvailable"
                      value={values.noOfSharedDesksAvailable}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.noOfSharedDesksAvailable && classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Shared Desk Available On</p>
                    <div className={classes.styles_select}>
                      <select
                        name="sharedDeskAvailableOn"
                        id="sharedDeskAvailableOn"
                        value={values.sharedDeskAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.sharedDeskAvailableOn && classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.sharedDeskAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Shared Desk Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="sharedDeskRentPerHour"
                        id="sharedDeskRentPerHour"
                        value={values.sharedDeskRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.sharedDeskRentPerHour && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.sharedDeskAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Shared Desk Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="sharedDeskRentPerDay"
                        id="sharedDeskRentPerDay"
                        value={values.sharedDeskRentPerDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.sharedDeskRentPerDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.sharedDeskAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Shared Desk Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="sharedDeskRentPerMonth"
                        id="sharedDeskRentPerMonth"
                        value={values.sharedDeskRentPerMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.sharedDeskRentPerMonth && classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Dedicated Desk</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.dedicatedDesk}
                      onChange={handleCheckboxChange}
                      name="dedicatedDesk"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.dedicatedDesk && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Number of Dedicated Desks Available
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Number of Dedicated Desks Available"
                      name="noOfDedicatedDesksAvailable"
                      id="noOfDedicatedDesksAvailable"
                      value={values.noOfDedicatedDesksAvailable}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.noOfDedicatedDesksAvailable &&
                        classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Dedicated Desk Available On</p>
                    <div className={classes.styles_select}>
                      <select
                        name="dedicatedDeskAvailableOn"
                        id="dedicatedDeskAvailableOn"
                        value={values.dedicatedDeskAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.dedicatedDeskAvailableOn && classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.dedicatedDeskAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Dedicated Desk Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="dedicatedDeskRentPerHour"
                        id="dedicatedDeskRentPerHour"
                        value={values.dedicatedDeskRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.dedicatedDeskRentPerHour && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.dedicatedDeskAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Dedicated Desk Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="dedicatedDeskRentPerDay"
                        id="dedicatedDeskRentPerDay"
                        value={values.dedicatedDeskRentPerDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.dedicatedDeskRentPerDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.dedicatedDeskAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Dedicated Desk Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="dedicatedDeskRentPerMonth"
                        id="dedicatedDeskRentPerMonth"
                        value={values.dedicatedDeskRentPerMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.dedicatedDeskRentPerMonth &&
                          classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Manager Desk</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.managerDesk}
                      onChange={handleCheckboxChange}
                      name="managerDesk"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.managerDesk && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Number of Manager Desks Available
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Number of Manager Desks Available"
                      name="noOfManagerDesksAvailable"
                      id="noOfManagerDesksAvailable"
                      value={values.noOfManagerDesksAvailable}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.noOfManagerDesksAvailable && classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Manager Desk Available On</p>
                    <div className={classes.styles_select}>
                      <select
                        name="managerDeskAvailableOn"
                        id="managerDeskAvailableOn"
                        value={values.managerDeskAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.managerDeskAvailableOn && classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.managerDeskAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Manager Desk Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="managerDeskRentPerHour"
                        id="managerDeskRentPerHour"
                        value={values.managerDeskRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.managerDeskRentPerHour && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.managerDeskAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Manager Desk Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="managerDeskRentPerDay"
                        id="managerDeskRentPerDay"
                        value={values.managerDeskRentPerDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.managerDeskRentPerDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.managerDeskAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Manager Desk Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="managerDeskRentPerMonth"
                        id="managerDeskRentPerMonth"
                        value={values.managerDeskRentPerMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.managerDeskRentPerMonth && classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Executive Desk</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.executiveDesk}
                      onChange={handleCheckboxChange}
                      name="executiveDesk"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.executiveDesk && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Number of Executive Desks Available
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Number of Executive Desks Available"
                      name="noOfExecutiveDesksAvailable"
                      id="noOfExecutiveDesksAvailable"
                      value={values.noOfExecutiveDesksAvailable}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.noOfExecutiveDesksAvailable &&
                        classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Executive Desk Available On</p>
                    <div className={classes.styles_select}>
                      <select
                        name="executiveDeskAvailableOn"
                        id="executiveDeskAvailableOn"
                        value={values.executiveDeskAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.executiveDeskAvailableOn && classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.executiveDeskAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Executive Desk Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="executiveDeskRentPerHour"
                        id="executiveDeskRentPerHour"
                        value={values.executiveDeskRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.executiveDeskRentPerHour && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.executiveDeskAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Executive Desk Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="executiveDeskRentPerDay"
                        id="executiveDeskRentPerDay"
                        value={values.executiveDeskRentPerDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.executiveDeskRentPerDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.executiveDeskAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Executive Desk Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="executiveDeskRentPerMonth"
                        id="executiveDeskRentPerMonth"
                        value={values.executiveDeskRentPerMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.executiveDeskRentPerMonth &&
                          classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={classes.checkbox_option}>
                <div>
                  <p>Meeting Room</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      checked={values.meetingRoom}
                      onChange={handleCheckboxChange}
                      name="meetingRoom"
                      type="checkbox"
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>
              {values.meetingRoom && (
                <>
                  <div className={classes.input_field_container}>
                    <p className={classes.label}>
                      Meeting Room Available (Capacity)
                    </p>
                    <input
                      type="number"
                      placeholder="Enter Meeting Room Capacity"
                      name="noOfMeetingRoomsAvailable"
                      id="noOfMeetingRoomsAvailable"
                      value={values.noOfMeetingRoomsAvailable}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`${classes.input_field} ${
                        errors.noOfMeetingRoomsAvailable && classes.error_field
                      }`}
                    />
                  </div>

                  <div className={classes.input_field_container}>
                    <p className={classes.label}>Meeting Room Available On</p>
                    <div className={classes.styles_select}>
                      <select
                        name="meetingRoomAvailableOn"
                        id="meetingRoomAvailableOn"
                        value={values.meetingRoomAvailableOn}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={
                          errors.meetingRoomAvailableOn && classes.error_field
                        }
                      >
                        <option hidden>Select Avalibility</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  {values.meetingRoomAvailableOn === "hourly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Meeting Room Rental Price per Hour
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per hour"
                        name="meetingRoomRentPerHour"
                        id="meetingRoomRentPerHour"
                        value={values.meetingRoomRentPerHour}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.meetingRoomRentPerHour && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.meetingRoomAvailableOn === "daily" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Meeting Room Rental Price per Day
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per day"
                        name="meetingRoomRentPerDay"
                        id="meetingRoomRentPerDay"
                        value={values.meetingRoomRentPerDay}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.meetingRoomRentPerDay && classes.error_field
                        }`}
                      />
                    </div>
                  )}

                  {values.meetingRoomAvailableOn === "monthly" && (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        Meeting Room Rental Price per Month
                      </p>
                      <input
                        type="number"
                        placeholder="Enter price per month"
                        name="meetingRoomRentPerMonth"
                        id="meetingRoomRentPerMonth"
                        value={values.meetingRoomRentPerMonth}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        className={`${classes.input_field} ${
                          errors.meetingRoomRentPerMonth && classes.error_field
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <div
            className={classes.single_form_container}
            id={`${
              values.purpose === "buy"
                ? "section3"
                : values.purpose === "rent"
                ? "section4"
                : "section4"
            }`}
            ref={
              values.purpose === "buy"
                ? sectionRefs.section3
                : values.purpose === "rent"
                ? sectionRefs.section4
                : sectionRefs.section4
            }
          >
            <h2 className={classes.heading}>
              {values.purpose === "buy"
                ? "STEP 3"
                : values.purpose === "rent"
                ? "STEP 4"
                : values.purpose === "coliving space"
                ? "STEP 4"
                : "STEP 4"}
              - <span> Property Title & Description</span>
            </h2>

            <div className={classes.input_field_container}>
              <p className={classes.label}>Property Title</p>
              <input
                type="text"
                placeholder="Name your property"
                name="title"
                id="title"
                value={values.title}
                onChange={handleChange}
                // onBlur={handleBlur}
                className={`${classes.input_field} ${
                  errors.title && classes.error_field
                }`}
              />
            </div>

            <div className={classes.textarea_field_container}>
              <p className={classes.label}>Property Description</p>
              <textarea
                type="text"
                placeholder="Describe your property in detail"
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
                // onBlur={handleBlur}
                className={`${classes.input_field} ${
                  errors.description && classes.error_field
                }`}
              />
            </div>
            {/* {values.purpose === "coworking space" && (
              <div className={classes.property_detail_accordions}>
                <p>Features & Amenities</p>
                <span>
                  Add additional features e.g balcony, utilities, security
                  details etc. (Optional)
                </span>
                <div className={classes.accordian_section}>
                  <ul className={classes.accordion_list}>
                    {faqData.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => toggleItem(index)}
                        className={
                          index === activeItem
                            ? classes.active
                            : classes.inactive
                        }
                      >
                        <h3>{item.question}</h3>
                        <div className={classes.answer}>
                          <p>{item.answer}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )} */}
          </div>
          <div
            className={classes.single_form_container}
            id={`${
              values.purpose === "buy"
                ? "section4"
                : values.purpose === "rent"
                ? "section5"
                : "section5"
            }`}
            ref={
              values.purpose === "buy"
                ? sectionRefs.section4
                : values.purpose === "rent"
                ? sectionRefs.section5
                : sectionRefs.section5
            }
          >
            <h2 className={classes.heading}>
              {values.purpose === "buy"
                ? "STEP 4"
                : values.purpose === "rent"
                ? "STEP 5"
                : values.purpose === "coliving space"
                ? "STEP 5"
                : "STEP 5"}
              - <span> Images & Videos</span>
            </h2>

            <div className={classes.upload_field_container}>
              <p className={classes.label}>Images</p>
              <div className={classes.upload_btn}>
                <Upload multiple {...ImageProps} name="images">
                  <Button
                    className={errors.images && classes.error_field}
                    icon={<UploadOutlined />}
                  >
                    Upload Images
                  </Button>
                </Upload>
                <label>
                  *Properties with images of good quality | Supported file
                  formats: png, jpeg
                </label>
              </div>
            </div>
            <div className={classes.uploaded_images}>
              {values?.images?.map((item, i) => {
                return (
                  <div key={i} className={classes.property_images}>
                    <img className={classes.images1} src={item} />
                    <Image
                      width={20}
                      className={classes.delete_icon}
                      src={XIcon}
                      onClick={() => handleImgDelete(item)}
                    />
                    <div className={classes.image_overlay}></div>
                  </div>
                );
              })}
            </div>
            <div className={classes.upload_field_container}>
              <p className={classes.label}>Videos</p>
              <div className={classes.upload_btn}>
                <Upload {...VideoProps}>
                  <Button
                    className={errors.videos && classes.error_field}
                    icon={<UploadOutlined />}
                  >
                    Upload Videos
                  </Button>
                </Upload>
                <label>*Properties with videos of good quality</label>
              </div>
            </div>
            <div className={classes.uploaded_images}>
              {values?.videos?.map((item, i) => {
                return (
                  <div key={i} className={classes.property_images}>
                    <video className={classes.images1} src={item} />
                    <Image
                      width={20}
                      className={classes.delete_icon}
                      src={XIcon}
                      onClick={() => handleVidDelete(item)}
                    />
                    <div className={classes.image_overlay}></div>
                  </div>
                );
              })}
            </div>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Video URL</p>
              <input
                type="text"
                placeholder="e.g https://www.youtube.com/watch?v=k..."
                name="videoLink"
                id="videoLink"
                value={values.videoLink}
                onChange={handleChange}
                // onBlur={handleBlur}
                className={`${classes.input_field} ${
                  errors.videoLink && classes.error_field
                }`}
              />
            </div>

            <div className={classes.input_field_container}>
              <p className={classes.label}>Video Title</p>
              <input
                type="text"
                placeholder="Video Title"
                name="videoTitle"
                id="videoTitle"
                value={values.videoTitle}
                onChange={handleChange}
                // onBlur={handleBlur}
                className={`${classes.input_field} ${
                  errors.videoTitle && classes.error_field
                }`}
              />
            </div>

            <div className={classes.upload_field_container}>
              <p className={classes.label}>Documents</p>
              <div className={classes.upload_btn}>
                <Upload {...DocumentProps}>
                  <Button
                    className={errors.documents && classes.error_field}
                    icon={<UploadOutlined />}
                  >
                    Upload Document
                  </Button>
                </Upload>
                <label>
                  *Max size 15MB | Supported file formats: Word & PDF
                </label>
              </div>
            </div>
            <div className={classes.uploaded_images}>
              {values?.documents?.map((item, i) => {
                let isPdf = false;
                if (typeof item === "string" && item.endsWith(".pdf")) {
                  isPdf = true;
                }
                return (
                  <div
                    key={i}
                    className={`${classes.property_images} ${classes.property_docs}`}
                  >
                    <img
                      className={classes.images1}
                      src={isPdf ? doc1.src : doc2.src}
                    />
                    {/* <iframe
                      className={classes.images1}
                      width={300}
                      frameborder="0"
                      src={`https://docs.google.com/gview?url=${item}&embedded=true`}
                    ></iframe> */}

                    <Image
                      width={18}
                      className={classes.delete_icon}
                      src={XIcon}
                      onClick={() => handleDocDelete(item)}
                    />
                    {/* <div className={classes.image_overlay}></div> */}
                  </div>
                );
              })}
            </div>
          </div>
          {values.purpose === "coliving space" && (
            <div
              id="section6"
              ref={sectionRefs.section6}
              className={classes.single_form_container}
            >
              <h2 className={classes.heading}>
                STEP 6 - <span> House Rules</span>
              </h2>
              <div className={classes.input_field_container}>
                <p className={classes.label}>Smoking</p>
                <div className={classes.styles_select}>
                  <select
                    name="smoking"
                    id="smoking"
                    value={values.smoking}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.smoking && classes.error_field}
                  >
                    <option value="Allowed">Allowed</option>
                    <option value="Not allowed">Not Allowed</option>
                  </select>
                </div>
              </div>

              <div className={classes.checkbox_option}>
                <div>
                  <p>Fun-loving occupants</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      type="checkbox"
                      checked={values.funLovingOccupants}
                      name="funLovingOccupants"
                      onChange={handleCheckboxChange}
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>

              <div className={classes.checkbox_option}>
                <div>
                  <p>Chill Landlord</p>
                </div>
                <div className={classes.property_checkbox}>
                  <label className={classes.switch}>
                    <input
                      type="checkbox"
                      checked={values.chillLandlord}
                      name="chillLandlord"
                      onChange={handleCheckboxChange}
                    />
                    <span className={classes.slider}></span>
                  </label>
                </div>
              </div>

              <div className={classes.input_field_container}>
                <p className={classes.label}>Pet Policy</p>
                <div className={classes.styles_select}>
                  <select
                    name="petPolicy"
                    id="petPolicy"
                    value={values.petPolicy}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.petPolicy && classes.error_field}
                  >
                    <option value="Allowed">Allowed</option>
                    <option value="Not allowed">Not Allowed</option>
                  </select>
                </div>
              </div>

              <div className={classes.input_field_container}>
                <p className={classes.label}>House Help</p>
                <div className={classes.styles_select}>
                  <select
                    name="houseHelp"
                    id="houseHelp"
                    value={values.houseHelp}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.houseHelp && classes.error_field}
                  >
                    <option hidden>Select</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div className={classes.input_field_container}>
                <p className={classes.label}>Guest</p>
                <div className={classes.styles_select}>
                  <select
                    name="guest"
                    id="guest"
                    value={values.guest}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={errors.guest && classes.error_field}
                  >
                    <option hidden>Select</option>
                    <option value="Allowed">Allowed</option>
                    <option value="Not allowed">Not Allowed</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {values.purpose === "coliving space" && (
            <div
              id="section7"
              ref={sectionRefs.section7}
              className={classes.single_form_container}
            >
              <h2 className={classes.heading}>
                STEP 7 - <span> Add More Rooms</span>
              </h2>
              <div className={classes.input_field_container}>
                <p className={classes.label}>
                  Add More Rooms with Same Features
                </p>
                <input
                  type="text"
                  placeholder="Enter More Rooms with Same Features"
                  name="moreRoomsSameFeatures"
                  id="moreRoomsSameFeatures"
                  value={values.moreRoomsSameFeatures}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.moreRoomsSameFeatures && classes.error_field
                  }`}
                />
              </div>
              <div className={classes.input_field_container}>
                <p className={classes.label}>
                  Add More Rooms with Different Features
                </p>
                <input
                  type="text"
                  placeholder="Enter More Rooms with Different Features"
                  name="moreRoomsDifferentFeatures"
                  id="moreRoomsDifferentFeatures"
                  value={values.moreRoomsDifferentFeatures}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className={`${classes.input_field} ${
                    errors.moreRoomsDifferentFeatures && classes.error_field
                  }`}
                />
              </div>
            </div>
          )}
          <div
            className={classes.single_form_container}
            id={
              values.purpose === "buy"
                ? "section5"
                : values.purpose === "rent"
                ? "section6"
                : values.purpose === "coliving space"
                ? "section8"
                : "section6"
            }
            ref={
              values.purpose === "buy"
                ? sectionRefs.section5
                : values.purpose === "rent"
                ? sectionRefs.section6
                : values.purpose === "coliving space"
                ? sectionRefs.section8
                : sectionRefs.section6
            }
          >
            <h2 className={classes.heading}>
              {values.purpose === "buy"
                ? "STEP 5"
                : values.purpose === "rent"
                ? "STEP 6"
                : values.purpose === "coliving space"
                ? "STEP 8"
                : "STEP 6"}{" "}
              - <span> Contact Details</span>
            </h2>

            <div className={classes.input_field_container}>
              <p className={classes.label}>Contact Person</p>
              <input
                type="text"
                placeholder="What is your name?"
                name="contactPerson"
                id="contactPerson"
                onChange={handleChange}
                value={values?.contactPerson}
                // onBlur={handleBlur}
                className={`${classes.input_field} ${
                  errors.contactPerson && classes.error_field
                }`}
              />
            </div>

            <div className={classes.number_field_container}>
              <p className={classes.label}>Landline number</p>
              <PhoneInput
                className={errors.landlineNumber && classes.error_field_phone}
                onChange={handleNoChange}
                country={"pk"}
                value={values?.landlineNumber}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>

            <div className={classes.number_field_container}>
              <p className={classes.label}>Mobile numbers (Mandatory)</p>
              <PhoneInput
                className={errors.mobileNumbers && classes.error_field_phone}
                onChange={handleMobileNoChange}
                value={JSON.stringify(values?.mobileNumbers)}
                country={"pk"}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Email</p>
              <input
                type="text"
                placeholder="Enter your Email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.email && classes.error_field
                }`}
              />
            </div>

            <div className={classes.number_field_container}>
              <p className={classes.label}>WhatsApp (Optional)</p>
              <PhoneInput
                onChange={handleWhatsappNoChange}
                country={"pk"}
                value={values?.whatsapp}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>
          </div>
          {/* {featureNames && Object.keys(featureNames).map((item, i) => {
            if(featureNames?.[item]?.fields && Object.keys(featureNames?.[item]?.fields)?.length > 0){
              let refKey = `section${i + 1 + stepCount}`
              return (
                <div
                key={i}
                id={`section${i + 1 + stepCount}`}
                ref={sectionRefs?.[refKey]}
                className={classes.single_form_container}
              >
                {<h2 className={classes.heading}>
                  STEP {i + 1+ stepCount} - <span>{featureNames?.[item]?.heading}</span>
                </h2>}
                {Object.keys(featureNames?.[item]?.fields)?.map((data, i) => {
                  return (
                    // <div className={classes.dual_container}>
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>
                        {data}
                      </p>
                      <input
                        type={featureNames?.[item]?.fields?.[data]?.type}
                        placeholder={featureNames?.[item]?.fields?.[data]?.placeholder}
                        name={featureNames?.[item]?.fields?.[data]?.slug}
                        id={featureNames?.[item]?.fields?.[data]?.slug}
                        value={values?.[featureNames?.[item]?.fields?.[data]?.slug]}
                        onChange={handleChange}
                        className={`${classes.input_field} ${
                          errors?.[featureNames?.[item]?.fields?.[data]?.slug] &&
                          classes.error_field
                        }`}
                      />
                    </div>
                    // </div>
                  );
                })}
              </div>
              )
            }
            }
          )} */}
          {featureNames &&
            Object.keys(featureNames).map((item, i) => {
              if (
                featureNames?.[item]?.fields &&
                Object.keys(featureNames?.[item]?.fields)?.length > 0
              ) {
                let refKey = `section${i + 1 + stepCount}`;
                return (
                  <div
                    key={i}
                    id={`section${i + 1 + stepCount}`}
                    ref={sectionRefs?.[refKey]}
                    className={classes.single_form_container}
                  >
                    {
                      <h2 className={classes.heading}>
                        STEP {i + 1 + stepCount} -{" "}
                        <span>{featureNames?.[item]?.heading}</span>
                      </h2>
                    }
                    {Object.keys(featureNames?.[item]?.fields)?.map(
                      (data, i) => {
                        if (
                          featureNames?.[item]?.fields?.[data]?.fieldType ===
                          "select"
                        ) {
                          return (
                            // <div className={classes.dual_container}>
                            <div className={classes.input_field_container}>
                              <p className={classes.label}>{data}</p>
                              <div className={classes.styles_select}>
                                <select
                                  name={
                                    featureNames?.[item]?.fields?.[data]?.slug
                                  }
                                  id={
                                    featureNames?.[item]?.fields?.[data]?.slug
                                  }
                                  value={
                                    values?.[
                                      featureNames?.[item]?.fields?.[data]?.slug
                                    ]
                                  }
                                  onChange={handleChange}
                                  className={`${classes.input_field} ${
                                    errors?.[
                                      featureNames?.[item]?.fields?.[data]?.slug
                                    ] && classes.error_field
                                  }`}
                                >
                                  <option hidden>
                                    {
                                      featureNames?.[item]?.fields?.[data]
                                        ?.placeholder
                                    }
                                  </option>
                                  {featureNames?.[item]?.fields?.[
                                    data
                                  ]?.options?.map((data2, i) => {
                                    return (
                                      <option key={i} value={data2?.value}>
                                        {data2?.title}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className={classes.input_field_container}>
                              <p className={classes.label}>{data}</p>
                              <input
                                type={
                                  featureNames?.[item]?.fields?.[data]?.type
                                }
                                placeholder={
                                  featureNames?.[item]?.fields?.[data]
                                    ?.placeholder
                                }
                                name={
                                  featureNames?.[item]?.fields?.[data]?.slug
                                }
                                id={featureNames?.[item]?.fields?.[data]?.slug}
                                value={
                                  values?.[
                                    featureNames?.[item]?.fields?.[data]?.slug
                                  ]
                                }
                                onChange={handleChange}
                                className={`${classes.input_field} ${
                                  errors?.[
                                    featureNames?.[item]?.fields?.[data]?.slug
                                  ] && classes.error_field
                                }`}
                              />
                            </div>
                          );
                        }
                      }
                    )}
                  </div>
                );
              }
            })}
        </div>
        <div className={`${classes.divider} ${classes.on_media}`} />
        <div className={classes.property_card_container}>
          <div className={classes.property_card_text_container}>
            <h2>Upload your property details</h2>
            <p>Get the best value for your property in a few steps.</p>
          </div>
          <img
            src={property_preview_pic.src}
            className={classes.img_container}
          />
          <div className={classes.pic_overlay} />
          <PropertyDemoCard
            selectedValues={values}
            images={images}
            width={"90%"}
          />
          <div className={classes.handle_btns}>
            {/* <button disabled={isLoading} onClick={resetForm}>
              Reset Form
            </button> */}
            <button disabled={isLoading} onClick={handleSubmit}>
              Update For Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
