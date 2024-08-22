import React, { useEffect, useRef, useState } from "react";
import classes from "./edit-property.module.css";
import property_preview_pic from "../../../../public/assets/dashboard/property_preview_pic.png";
import check_symbol from "../../../../public/assets/dashboard/check_icon.svg";
import doc1 from "/public/assets/project_detail_assets/pdf.svg";
import doc2 from "/public/assets/project_detail_assets/word.svg";
import XIcon from "/public/assets/icons/XIcon.svg";
import Link from "next/link";
import { useFormik } from "formik";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import LocationPicker from "../../../common/location-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadDocuments,
  uploadImages,
  uploadVideos,
} from "../../../../redux/cloudinaryUpload";
import {
  fetchProjectById,
  updateProject,
} from "../../../../redux/property";
import useLoadingToast from "../../../../hooks/useLoadingToast";
import { useRouter } from "next/router";
import { MAP_API_KEY, MAP_LIBRARIES } from "../../../../config";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import { BUILDER_DATA, propertyType } from "../../../../data/builder";
import MultiTextChip from "../../../common/forms/MultiChip";
import { projectSchema } from "../../../../schemas/project";
import ProjectDemoCard from "../../../cards/project-demo-card";

const defaultCenter = { lat: 31.4515033, lng: 74.35564649999999 };

function EditProperty() {
  const {
    openLoadingToast,
    closeLoadingToast,
    openErrorToast,
  } = useLoadingToast();
  const unitFields = {
    type: "residential",
    subtype: "House",
    area: "",
    bed: null,
    bath: null,
    price: "",
    floor: "", 
  };
  const [activeSection, setActiveSection] = useState("section1");
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [unitsData, setUnistsData] = useState(unitFields);
  const [unitsArray, setUnistsArray] = useState([]);

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const router = useRouter();
  const { projectsByUserId, projectById } = useSelector(
    (state) => state.property
  );

  // useEffect(() => {
  //   console.log("projectsByUserId", projectsByUserId);
  // }, [projectsByUserId]);

  // Google Refs
  const addressRef = useRef(null);
  const locationRef = useRef(null);
  const cityRef = useRef(null);

  const initialValues = {
    // 1) Project Name & Location
    name: "",
    location: "",
    city: "",
    mapPin: "",
    bookingOrSiteOfficeAddress: "",
    projectLogo: "",

    // 2) Projects Specs & Prices
    status: "", // Needs to be discussed
    // ... Add other fields related to specs and prices here

    // 3) Project Description
    description: "",

    // 4) Images
    images: [],

    // 5) Videos
    videos: [],
    videoTitle: "",
    videoHost: "",
    videoLink: "",

    // 6) Documents
    documents: [],

    // 7) Floor Plans
    floorPlans: [],

    // 8) Payment Plans
    paymentPlans: [],

    // 9) Contact Details
    contactPerson: "",
    landlineNumber: "",
    mobileNumbers: [],
    email: "",
    whatsapp: "",

    // Feature Schema
    // Main Features
    lobbyInBuilding: "",
    doubleGlazedWindows: "",
    centralAirConditioning: "",
    centralHeating: "",
    flooring: "",
    electricityBackup: "",
    fireFightingSystem: "",
    elevators: "",
    serviceElevatorsInBuilding: "",
    gatedCommunity: "",
    parkingSpaces: "",

    // Plot Features
    sewerage: "",
    utilities: "",
    accessibleByRoad: "",

    // Business & Communication
    broadbandInternetAccess: "",
    satelliteOrCable: "",
    businessCenterOrMediaRoom: "",
    intercom: "",
    atmMachines: "",

    // Community Features
    communityLawnOrGarden: "",
    communitySwimmingPool: "",
    communityGym: "",
    firstAidOrMedicalCenter: "",
    dayCareCenter: "",
    kidsPlayArea: "",
    barbecueArea: "",
    mosque: "",
    communityCenter: "",

    // Nearby Locations
    nearbySchools: "",
    nearbyHospitals: "",
    nearbyShoppingMalls: "",
    nearbyRestaurants: "",
    distanceFromAirport: "",
    nearbyPublicTransport: "",

    // Other Facilities
    maintenanceStaff: "",
    securityStaff: "",
    facilitiesForDisabled: "",
    cctvSecurity: "",

    // Healthcare Recreational
    lawnOrGarden: "",
    swimmingPool: "",
  };

  const {
    values,
    handleSubmit,
    setValues,
    errors,
    // setErrors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: projectSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      let updatedData = {
        ...values,
        id: router?.query?.id,
        units: unitsArray,
        // user: user?.id,
        mapPin: JSON.stringify(selectedLocation),
        geoLocation: {
          type: "Point",
          coordinates: [selectedLocation?.lng, selectedLocation?.lat],
        },
      };
      try {
        setIsLoading(true);
        dispatch(updateProject(updatedData)).then((res) => {
          onClose();
          setIsLoading(false);
          message.success(`Project updated Successfully`);
          router.push("/dashboard/builder/my-listing");
          resetForm();
        });
      } catch (error) {
        setIsLoading(false);
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

  useEffect(() => {
    const projectData = projectById;
    if (projectData) {
      const data = {
        // 1) Project Name & Location
        name: projectData?.name,
        location: projectData?.location,
        city: projectData?.city,
        mapPin: projectData?.mapPin,
        bookingOrSiteOfficeAddress: projectData?.bookingOrSiteOfficeAddress,
        projectLogo: projectData?.projectLogo,

        // 2) Projects Specs & Prices
        status: projectData?.status, // Needs to be discussed
        price: projectData?.price, // Needs to be discussed
        // ... Add other fields related to specs and prices here

        // 3) Project Description
        description: projectData?.description,

        // 4) Images
        images: projectData?.images,

        // 5) Videos
        videos: projectData?.videos,
        videoTitle: projectData?.videoTitle,
        videoHost: projectData?.videoHost,
        videoLink: projectData?.videoLink,

        // 6) Documents
        documents: projectData?.documents,

        // 7) Floor Plans
        floorPlans: projectData?.floorPlans,

        // 8) Payment Plans
        paymentPlans: projectData?.paymentPlans,

        // 9) Contact Details
        contactPerson: projectData?.contactPerson,
        landlineNumber: projectData?.landlineNumber,
        mobileNumbers: projectData?.mobileNumbers,
        email: projectData?.email,
        whatsapp: projectData?.whatsapp,

        // Feature Schema
        // Main Features
        lobbyInBuilding: projectData?.features?.lobbyInBuilding,
        doubleGlazedWindows: projectData?.features?.doubleGlazedWindows,
        centralAirConditioning: projectData?.features?.centralAirConditioning,
        centralHeating: projectData?.features?.centralHeating,
        flooring: projectData?.features?.flooring,
        electricityBackup: projectData?.features?.electricityBackup,
        fireFightingSystem: projectData?.features?.fireFightingSystem,
        elevators: projectData?.features?.elevators,
        serviceElevatorsInBuilding:
          projectData?.features?.serviceElevatorsInBuilding,
        gatedCommunity: projectData?.features?.gatedCommunity,
        parkingSpaces: projectData?.features?.parkingSpaces,
        otherMainFeatures: projectData?.features?.otherMainFeatures,

        // Plot Features
        sewerage: projectData?.features?.sewerage,
        utilities: projectData?.features?.utilities,
        accessibleByRoad: projectData?.features?.accessibleByRoad,

        // Business & Communication
        broadbandInternetAccess: projectData?.features?.broadbandInternetAccess,
        satelliteOrCable: projectData?.features?.satelliteOrCable,
        businessCenterOrMediaRoom:
          projectData?.features?.businessCenterOrMediaRoom,
        intercom: projectData?.features?.intercom,
        atmMachines: projectData?.features?.atmMachines,
        otherBusinessAndCommunicationFeatures:
          projectData?.features?.otherBusinessAndCommunicationFeatures,

        // Community Features
        communityLawnOrGarden: projectData?.features?.communityLawnOrGarden,
        communitySwimmingPool: projectData?.features?.communitySwimmingPool,
        communityGym: projectData?.features?.communityGym,
        firstAidOrMedicalCenter: projectData?.features?.firstAidOrMedicalCenter,
        dayCareCenter: projectData?.features?.dayCareCenter,
        kidsPlayArea: projectData?.features?.kidsPlayArea,
        barbecueArea: projectData?.features?.barbecueArea,
        mosque: projectData?.features?.mosque,
        communityCenter: projectData?.features?.communityCenter,
        otherCommunityFeatures: projectData?.features?.otherCommunityFeatures,

        // Nearby Locations
        nearbySchools: projectData?.features?.nearbySchools,
        nearbyHospitals: projectData?.features?.nearbyHospitals,
        nearbyShoppingMalls: projectData?.features?.nearbyShoppingMalls,
        nearbyRestaurants: projectData?.features?.nearbyRestaurants,
        distanceFromAirport: projectData?.features?.distanceFromAirport,
        nearbyPublicTransport: projectData?.features?.nearbyPublicTransport,
        otherNearbyPlaces: projectData?.features?.otherNearbyPlaces,

        // Other Facilities
        maintenanceStaff: projectData?.features?.maintenanceStaff,
        securityStaff: projectData?.features?.securityStaff,
        facilitiesForDisabled: projectData?.features?.facilitiesForDisabled,
        cctvSecurity: projectData?.features?.cctvSecurity,
        otherFacilities: projectData?.features?.otherFacilities,

        // Healthcare Recreational
        lawnOrGarden: projectData?.features?.lawnOrGarden,
        swimmingPool: projectData?.features?.swimmingPool,
        otherHealthcareAndRecreationalFeatures:
          projectData?.features?.otherHealthcareAndRecreationalFeatures,
      };
      setValues(data);
      setSelectedLocation(JSON.parse(projectData?.mapPin));
      if (projectData?.units) {
        setUnistsArray([...projectData?.units])
      }
    }
  }, [projectById]);
  useEffect(() => {
    dispatch(fetchProjectById(router?.query?.id));
    // dispatch(fetchProjectsByUserId("65a1077235db04ad3159362d"));
  }, []);

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

  // useEffect(() => {
  //   console.log("valuesvalues", values);
  // }, [values]);
  
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
            if (res?.payload?.secure_url) {
              const img = res?.payload?.secure_url;
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
  const LogoProps = {
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
        openLoadingToast("uploading logo");
        const files = info?.file?.originFileObj
          ? URL.createObjectURL(info?.file?.originFileObj)
          : "";
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
        try {
          dispatch(uploadImages(formData)).then((res) => {
            if (res?.payload?.secure_url) {
              const img = res?.payload?.secure_url;
              setIsLoading(false);
              closeLoadingToast();
              setValues((prev) => ({
                ...prev,
                projectLogo: img,
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
            const vid = res?.payload?.secure_url;
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
    accept: ".doc,.docx,.pdf",
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
            const doc = res?.payload?.secure_url;
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
  const FloorProps = {
    name: "file",
    accept: ".doc,.docx,.pdf",
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload(file) {
      const isSizeValid = file.size / 1024 / 1024 <= 15; // Check if file size is less than or equal to 5 MB
      const isCountValid = values?.floorPlans?.length < 1; // Allow 1 more image to reach the total of 10

      if (!isSizeValid) {
        message.error("File size must be less than or equal to 15 MB");
      }
      if (!isCountValid) {
        message.error("Maximum of 1 floor plan allowed");
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
        openLoadingToast("uploading floor plan");
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
        try {
          dispatch(uploadDocuments(formData)).then((res) => {
            const doc = res?.payload?.secure_url;
            setIsLoading(false);
            closeLoadingToast();
            message.success(`${info.file.name} file uploaded successfully`);
            setValues((prev) => ({
              ...prev,
              floorPlans: prev.floorPlans ? [...prev.floorPlans, doc] : [doc],
            }));
          });
        } catch (error) {
          closeLoadingToast();
          setIsLoading(false);
        }
      } else if (info.file.status === "error") {
        closeLoadingToast();
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const PaymentProps = {
    name: "file",
    accept: ".doc,.docx,.pdf",
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload(file) {
      const isSizeValid = file.size / 1024 / 1024 <= 15; // Check if file size is less than or equal to 5 MB
      const isCountValid = values?.paymentPlans?.length < 1; // Allow 1 more image to reach the total of 10

      if (!isSizeValid) {
        message.error("File size must be less than or equal to 15 MB");
      }
      if (!isCountValid) {
        message.error("Maximum of 1 floor plan allowed");
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
        openLoadingToast("uploading payment plan");
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET);
        try {
          dispatch(uploadDocuments(formData)).then((res) => {
            const doc = res?.payload?.secure_url;
            setIsLoading(false);
            closeLoadingToast();
            message.success(`${info.file.name} file uploaded successfully`);
            setValues((prev) => ({
              ...prev,
              paymentPlans: prev.paymentPlans
                ? [...prev.paymentPlans, doc]
                : [doc],
            }));
          });
        } catch (error) {
          closeLoadingToast();
          setIsLoading(false);
        }
      } else if (info.file.status === "error") {
        closeLoadingToast();
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleNoChange = (no) => {
    setValues({ ...values, landlineNumber: no });
  };
  const handleMobileNoChange = (no) => {
    setValues({ ...values, mobileNumbers: [no] });
  };
  const handleWhatsappNoChange = (no) => {
    setValues({ ...values, whatsapp: no });
  };

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

  const onClose = (e) => {
    // console.log(e, "I was closed.");
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

  // Google AutoCompletes

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
        console.log("place", place);
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

  const onLoadAddrsess = (autocomplete) => {
    addressRef.current = autocomplete;
  };

  const onChangeAddress = async () => {
    if (addressRef?.current) {
      const place = await addressRef.current.getPlace();
      if (place?.formatted_address) {
        setValues({
          ...values,
          bookingOrSiteOfficeAddress: place.formatted_address,
        });
      }
      if (
        place?.formatted_address &&
        place.geometry &&
        place.geometry.location
      ) {
        setValues({
          ...values,
          bookingOrSiteOfficeAddress: place.formatted_address,
        });
      }
    }
  };

  const handleDeleteunit = (id) => {
    const filtered = unitsArray?.filter((item) => item?.id !== id);
    setUnistsArray(filtered);
  };

  const handleChangeUnitsType = (e) => {
    setUnistsData({
      [e.target.name]: e.target.value,
      subtype: Object.keys(propertyType?.[e.target.value])?.[0],
    });
  };

  const handleChangeUnits = (e) => {
    if (e.target.name === "subtype") {
      setUnistsData({ type: unitsData?.type, [e.target.name]: e.target.value });
    } else {
      setUnistsData({ ...unitsData, [e.target.name]: e.target.value });
    }
  };

  function generateRandomId() {
    return Math.floor(Math.random() * 9000000) + 1000000;
  }

  const handleAddUnits = () => {
    validateUnits(unitsData)
    // const randomId = generateRandomId();
    // setUnistsArray([{ ...unitsData, id: randomId }, ...unitsArray]);
    // setUnistsData(unitFields)
  };

  const validateUnits = (data) => {
    const types = propertyType?.[data?.type]?.[data?.subtype];
    console.log("types", types);
    let err = {};
    for (const key in types) {
      if (!data?.[types?.[key]?.slug]) {
        err[types?.[key]?.slug] = "required";
      }
    }
    if (Object.keys(err)?.length > 0) {
       openErrorToast("Please fill all the fields")
    } else {
    const randomId = generateRandomId();
    setUnistsArray([{ ...unitsData, id: randomId }, ...unitsArray]);
    setUnistsData(unitFields)
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.overlay} />

      <div className={classes.stepper_container}>{generateSteps(17)}</div>

      <div className={classes.content_container}>
        <div
          className={classes.forms_container}
          ref={formRef}
          id="scrollable_form"
        >
          {/* Step 1 */}
          <div
            className={classes.single_form_container}
            id="section1"
            ref={sectionRefs.section1}
          >
            <h2 className={classes.heading}>
              STEP 1 - <span> Project Name & Location</span>
            </h2>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Name</p>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.name && classes.error_field
                }`}
              />
            </div>

            <div className={classes.input_field_container}>
              <p className={classes.label}>Office Address</p>
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
                      name="bookingOrSiteOfficeAddress"
                      id="bookingOrSiteOfficeAddress"
                      value={values.bookingOrSiteOfficeAddress}
                      onChange={handleChange}
                      className={`${classes.input_field} google_input ${
                        errors?.bookingOrSiteOfficeAddress && "err_field"
                      }`}
                      autoComplete="false"
                    />
                  </Autocomplete>
                </LoadScriptNext>
              </div>
            </div>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Project City</p>
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
              <p className={classes.label}>Project Location</p>
              <div className={classes.ant_select_styles}>
                <LoadScriptNext
                  googleMapsApiKey={MAP_API_KEY}
                  libraries={MAP_LIBRARIES}
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

            <div className={classes.upload_field_container}>
              <p className={classes.label}>Project Logo</p>
              <div className={classes.upload_btn}>
                <Upload multiple {...LogoProps}>
                  <Button
                    className={errors.projectLogo && classes.error_field}
                    icon={<UploadOutlined />}
                  >
                    Upload Logo
                  </Button>
                </Upload>
                <label>
                  *Projects with images of good quality | Supported file
                  formats: png, jpeg
                </label>
              </div>
            </div>
            {values?.projectLogo && (
              <div className={classes.uploaded_images}>
                <div className={classes.property_images}>
                  <img className={classes.images1} src={values?.projectLogo} />
                  <div className={classes.image_overlay}></div>
                </div>
              </div>
            )}
            <div className={classes.location_picker}>
              <LocationPicker
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
          </div>
           {/* Step 2 */}
          <div
            className={classes.single_form_container}
            id="section2"
            ref={sectionRefs.section2}
          >
            <h2 className={classes.heading}>
              STEP 2 - <span>Units</span>
            </h2>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Type</p>
              <div className={classes.styles_select}>
                <select
                  name="type"
                  id="type"
                  value={unitsData.type}
                  onChange={handleChangeUnitsType}
                  // onBlur={handleBlur}
                  className={errors.type && classes.error_field}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plots</option>
                </select>
                {!errors.type && (
                  <p className={classes.required_field}>{errors.type}</p>
                )}
              </div>
            </div>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Subtype</p>
              <div className={classes.styles_select}>
                <select
                  name="subtype"
                  id="subtype"
                  value={unitsData.subtype}
                  onChange={handleChangeUnits}
                  className={errors.subtype && classes.error_field}
                >
                  {Object.keys(propertyType?.[unitsData?.type])?.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {propertyType?.[unitsData?.type]?.[unitsData?.subtype] &&
              Object.keys(
                propertyType?.[unitsData?.type]?.[unitsData?.subtype]
              )?.map((data, i) => {
                if (
                  propertyType?.[unitsData?.type]?.[unitsData?.subtype]?.[data]
                    ?.fieldType === "select"
                ) {
                  return (
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>{data}</p>
                      <div className={classes.styles_select}>
                        <select
                          name={
                            propertyType?.[unitsData?.type]?.[
                              unitsData?.subtype
                            ]?.[data]?.slug
                          }
                          id={
                            propertyType?.[unitsData?.type]?.[
                              unitsData?.subtype
                            ]?.[data]?.slug
                          }
                          value={
                            unitsData?.[propertyType?.[unitsData?.type]?.[
                            unitsData?.subtype
                          ]?.[data]?.slug]
                        || ""
                        }
                          onChange={handleChangeUnits}
                          className={`${classes.input_field} ${
                            errors?.[
                              propertyType?.[unitsData?.type]?.[
                                unitsData?.subtype
                              ]?.[data]?.slug
                            ] && classes.error_field
                          }`}
                        >
                          <option hidden>
                            {
                              propertyType?.[unitsData?.type]?.[
                                unitsData?.subtype
                              ]?.[data]?.placeholder
                            }
                          </option>
                          {propertyType?.[unitsData?.type]?.[
                            unitsData?.subtype
                          ]?.[data]?.options?.map((data2, i) => {
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
                } else if (
                  propertyType?.[unitsData?.type]?.[unitsData?.subtype]?.[data]
                    ?.fieldType === "price"
                ) {
                  return (
                    <div className={classes.dual_area_container}>
                      <div className={classes.input_field_container}>
                        <p className={classes.label}>Price</p>
                        <input
                          type="text"
                          placeholder="0"
                          name="price"
                          id="price"
                          value={unitsData.price}
                          onChange={handleChangeUnits}
                          className={`${classes.input_field} ${
                            errors.price && classes.error_field
                          }`}
                        />
                      </div>
                      <div className={classes.styles_select}>
                        <select
                        >
                          <option value="PKR">PKR.</option>
                        </select>
                      </div>
                    </div>
                  );
                } else if (
                  propertyType?.[unitsData?.type]?.[unitsData?.subtype]?.[data]
                    ?.fieldType === "area"
                ) {
                  return (
                    <div className={classes.dual_area_container}>
                      <div className={classes.input_field_container}>
                        <p className={classes.label}>Area</p>
                        <input
                          type="text"
                          placeholder="area"
                          name="area"
                          id="area"
                          value={unitsData.area || ""}
                          onChange={handleChangeUnits}
                          // onBlur={handleBlur}
                          className={`${classes.input_field} ${
                            errors.area && classes.error_field
                          }`}
                        />
                      </div>
                      <div className={classes.styles_select}>
                        <select>
                          <option value="Sq.Yd.">Sq. Yd.</option>
                        </select>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    // <div className={classes.dual_container}>
                    <div className={classes.input_field_container}>
                      <p className={classes.label}>{data}</p>
                      <input
                        type={
                          propertyType?.[unitsData?.type]?.[
                            unitsData?.subtype
                          ]?.[data]?.type
                        }
                        placeholder={
                          propertyType?.[unitsData?.type]?.[
                            unitsData?.subtype
                          ]?.[data]?.placeholder
                        }
                        name={
                          propertyType?.[unitsData?.type]?.[
                            unitsData?.subtype
                          ]?.[data]?.slug
                        }
                        id={
                          propertyType?.[unitsData?.type]?.[
                            unitsData?.subtype
                          ]?.[data]?.slug
                        }
                        value={
                          values?.[
                            propertyType?.[unitsData?.type]?.[
                              unitsData?.subtype
                            ]?.[data]?.slug
                          ]
                        }
                        onChange={handleChangeUnits}
                        className={`${classes.input_field} ${
                          errors?.[
                            propertyType?.[unitsData?.type]?.[
                              unitsData?.subtype
                            ]?.[data]?.slug
                          ] && classes.error_field
                        }`}
                      />
                    </div>
                  );
                }
              })}

            <button
              className={classes.save_btn}
              style={{ marginTop: "0px" }}
              // disabled={disbleBtn}
              onClick={handleAddUnits}
            >
              {" "}
              Add Unit
            </button>

            {unitsArray?.length > 0 && (
              <div className={classes.staff_container}>
                <h3 className={classes.staff_label}>Manage Units</h3>
                <div className={classes.staff_table}>
                  <table className={classes.staff_main_table}>
                    <tr>
                      <th>Type</th>
                      <th>Subtype</th>
                      <th>Price</th>
                      <th>Action</th>
                      {/* <div className={classes.delete_container}>Action</div> */}
                    </tr>
                    {unitsArray?.map((unit, i) => (
                      <tr key={`unit-${i}`}>
                        <td>{unit?.type}</td>
                        <td>{unit?.subtype}</td>
                        <td>{unit?.price}</td>
                        <div className={classes.delete}>
                          <DeleteOutlined
                          onClick={() => handleDeleteunit(unit?.id)}
                          />
                        </div>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            )}
          </div>
          {/* Step 3 */}
          <div
            className={classes.single_form_container}
            id="section3"
            ref={sectionRefs.section3}
          >
            <h2 className={classes.heading}>
              STEP 3 - <span>Projects Specs & Prices</span>
            </h2>
            <div className={classes.select_field_container}>
              <p className={classes.label}>Status</p>
              <div className={classes.styles_select}>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  className={errors.status && classes.error_field}
                >
                  <option hidden>Select Status</option>
                  <option value="Advance Stage">Advance Stage</option>
                  <option value="Early Stage">Early Stage</option>
                  <option value="Mid Stage">Mid Stage</option>
                  <option value="Near possession">Near possession</option>
                  <option value="New Launch">New Launch</option>
                  <option value="Ready to move">Ready to move</option>
                  <option value="Under construction">Under construction</option>
                  <option value="Well occupied">Well occupied</option>
                </select>
              </div>
            </div>
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
          </div>
          {/* Step 4 */}
          <div
            className={classes.single_form_container}
            id="section4"
            ref={sectionRefs.section4}
          >
            <h2 className={classes.heading}>
              STEP 4 - <span> Project Description</span>
            </h2>
            <div className={classes.textarea_field_container}>
              <p className={classes.label}>Project Description</p>
              <textarea
                type="text"
                placeholder="Describe your project in detail"
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.description && classes.error_field
                }`}
              />
            </div>
            {/* <div className={classes.input_field_container}>
              <p className={classes.label}>Property Title</p>
              <input
                type="text"
                placeholder="Name your property"
                name="title"
                id="title"
                value={values.title}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.title && classes.error_field
                }`}
              />
            </div> */}
          </div>
          {/* Step 5 */}
          <div
            className={classes.single_form_container}
            id="section5"
            ref={sectionRefs.section5}
          >
            <h2 className={classes.heading}>
              STEP 5 - <span> Images</span>
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

            {values?.images?.length > 0 && (
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
            )}
          </div>
          {/* Step 6 */}
          <div
            className={classes.single_form_container}
            id="section6"
            ref={sectionRefs.section6}
          >
            <h2 className={classes.heading}>
              STEP 6 - <span> Videos</span>
            </h2>
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
            {values?.videos?.length > 0 && (
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
            )}
            <div className={classes.input_field_container}>
              <p className={classes.label}>Video Title</p>
              <input
                type="text"
                placeholder="Video Title"
                name="videoTitle"
                id="videoTitle"
                value={values.videoTitle}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.videoTitle && classes.error_field
                }`}
              />
            </div>
            <div className={classes.input_field_container}>
              <p className={classes.label}>Video Host</p>
              <input
                type="text"
                placeholder="Enter Video Host"
                name="videoHost"
                id="videoHost"
                value={values.videoHost}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.videoHost && classes.error_field
                }`}
              />
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
                className={`${classes.input_field} ${
                  errors.videoLink && classes.error_field
                }`}
              />
            </div>
          </div>
          {/* Step 7 */}
          <div
            className={classes.single_form_container}
            id="section7"
            ref={sectionRefs.section7}
          >
            <h2 className={classes.heading}>
              STEP 7 - <span> Documents</span>
            </h2>

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
            {values?.documents?.length > 0 && (
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
                      <Image
                        width={18}
                        className={classes.delete_icon}
                        src={XIcon}
                        onClick={() => handleDocDelete(item)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Step 8 */}
          <div
            className={classes.single_form_container}
            id="section8"
            ref={sectionRefs.section8}
          >
            <h2 className={classes.heading}>
              STEP 8 - <span> Floor Plans</span>
            </h2>
            <div className={classes.upload_field_container}>
              <p className={classes.label}>Floor Plans</p>
              <div className={classes.upload_btn}>
                <Upload {...FloorProps}>
                  <Button
                    className={errors.documents && classes.error_field}
                    icon={<UploadOutlined />}
                  >
                    Upload Floor Plans
                  </Button>
                </Upload>
                <label>
                  *Max size 15MB | Supported file formats: Word & PDF
                </label>
              </div>
            </div>
            {values?.floorPlans?.length > 0 && (
              <div className={classes.uploaded_images}>
                {values?.floorPlans?.map((item, i) => {
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
                      <Image
                        width={18}
                        className={classes.delete_icon}
                        src={XIcon}
                        onClick={() => handleDocDelete(item)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Step 9 */}
          <div
            className={classes.single_form_container}
            id="section9"
            ref={sectionRefs.section9}
          >
            <h2 className={classes.heading}>
              STEP 9 - <span> Payment Plans</span>
            </h2>
            <div className={classes.upload_field_container}>
              <p className={classes.label}>Payment Plans</p>
              <div className={classes.upload_btn}>
                <Upload {...PaymentProps}>
                  <Button
                    className={errors.paymentPlans && classes.error_field}
                    icon={<UploadOutlined />}
                  >
                    Upload Payment Plans
                  </Button>
                </Upload>
                <label>
                  *Max size 15MB | Supported file formats: Word & PDF
                </label>
              </div>
            </div>
            {values?.paymentPlans?.length > 0 && (
              <div className={classes.uploaded_images}>
                {values?.paymentPlans?.map((item, i) => {
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
                      <Image
                        width={18}
                        className={classes.delete_icon}
                        src={XIcon}
                        onClick={() => handleDocDelete(item)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Step 10 */}
          <div
            className={classes.single_form_container}
            id="section10"
            ref={sectionRefs.section10}
          >
            <h2 className={classes.heading}>
              STEP 10 - <span> Contact Details</span>
            </h2>

            <div className={classes.input_field_container}>
              <p className={classes.label}>Contact Person</p>
              <input
                type="text"
                placeholder="What is your name?"
                name="contactPerson"
                id="contactPerson"
                value={values?.contactPerson}
                onChange={handleChange}
                className={`${classes.input_field} ${
                  errors.contactPerson && classes.error_field
                }`}
              />
            </div>

            <div className={classes.number_field_container}>
              <p className={classes.label}>Landline number</p>
              <PhoneInput
                className={errors.landlineNumber && classes.error_field_phone}
                value={values?.landlineNumber}
                onChange={handleNoChange}
                country={"pk"}
                onlyCountries={["pk"]}
                countryCodeEditable={false}
              />
            </div>

            <div className={classes.number_field_container}>
              <p className={classes.label}>Mobile numbers (Mandatory)</p>
              <PhoneInput
                className={errors.mobileNumbers && classes.error_field_phone}
                onChange={handleMobileNoChange}
                value={values?.mobileNumbers?.[0]}
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
                onlyCountries={["pk"]}
                countryCodeEditable={false}
                value={values?.whatsapp}
              />
            </div>
          </div>
          {BUILDER_DATA &&
            Object.keys(BUILDER_DATA).map((item, i) => {
              let refKey = `section${i + 11}`;
              return (
                <div
                  key={i}
                  id={`section${i + 11}`}
                  ref={sectionRefs?.[refKey]}
                  className={classes.single_form_container}
                >
                  <h2 className={classes.heading}>
                    STEP {i + 11} - <span>{BUILDER_DATA?.[item]?.Heading}</span>
                  </h2>
                  {Object.keys(BUILDER_DATA?.[item]?.Fields).map((data, j) => {
                    if (
                      BUILDER_DATA?.[item]?.Fields?.[data]?.fieldType ===
                      "input"
                    ) {
                      return (
                        <div key={j} className={classes.input_field_container}>
                          <p className={classes.label}>{data}</p>
                          <input
                            type={BUILDER_DATA?.[item]?.Fields?.[data]?.type}
                            placeholder={
                              BUILDER_DATA?.[item]?.Fields?.[data]?.placeholder
                            }
                            name={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                            id={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                            value={
                              values?.[
                                BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                              ]
                            }
                            onChange={handleChange}
                            className={`${classes.input_field} ${
                              errors?.[
                                BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                              ] && classes.error_field
                            }`}
                          />
                        </div>
                      );
                    } else if (
                      BUILDER_DATA?.[item]?.Fields?.[data]?.fieldType ===
                      "select"
                    ) {
                      return (
                        <div key={j} className={classes.select_field_container}>
                          <p className={classes.label}>{data}</p>
                          <div className={classes.styles_select}>
                            <select
                              name={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                              id={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                              value={
                                values?.[
                                  BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                                ]
                              }
                              onChange={handleChange}
                              className={`${classes.input_field} ${
                                errors?.[
                                  BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                                ] && classes.error_field
                              }`}
                            >
                              <option hidden>
                                {
                                  BUILDER_DATA?.[item]?.Fields?.[data]
                                    ?.placeholder
                                }
                              </option>
                              {BUILDER_DATA?.[item]?.Fields?.[
                                data
                              ]?.options?.map((val, k) => {
                                return (
                                  <option value={val?.value}>
                                    {val?.title}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        // <div
                        //   key={j}
                        //   className={classes.input_field_container}
                        // >
                        //   <p className={classes.label}>{data}</p>
                        //   <input
                        //     type={BUILDER_DATA?.[item]?.Fields?.[data]?.type}
                        //     placeholder={
                        //       BUILDER_DATA?.[item]?.Fields?.[data]
                        //         ?.placeholder
                        //     }
                        //     name={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                        //     id={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                        //     value={
                        //       values?.[
                        //         BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                        //       ]
                        //     }
                        //     onChange={handleChange}
                        //     className={`${classes.input_field} ${
                        //       errors?.[
                        //         BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                        //       ] && classes.error_field
                        //     }`}
                        //   />
                        // </div>
                      );
                    } else {
                      return (
                        // <div key={j} className={classes.input_field_container}>
                        //   <p className={classes.label}>{data}</p>
                        //   <input
                        //     type={BUILDER_DATA?.[item]?.Fields?.[data]?.type}
                        //     placeholder={
                        //       BUILDER_DATA?.[item]?.Fields?.[data]?.placeholder
                        //     }
                        //     name={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                        //     id={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                        //     value={
                        //       values?.[
                        //         BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                        //       ]
                        //     }
                        //     onChange={handleChange}
                        //     className={`${classes.input_field} ${
                        //       errors?.[
                        //         BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                        //       ] && classes.error_field
                        //     }`}
                        //   />
                        // </div>
                        <div key={j} className="input_field_container">
                          <>
                            <p className={classes.label}>{data}</p>
                            <MultiTextChip
                              placeholder={
                                BUILDER_DATA?.[item]?.Fields?.[data]
                                  ?.placeholder
                              }
                              name={BUILDER_DATA?.[item]?.Fields?.[data]?.slug}
                              value={
                                values?.[
                                  BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                                ] || []
                              }
                              onValueChange={handleChange}
                              // onBlur={handleBlur}
                              className={
                                errors?.[
                                  BUILDER_DATA?.[item]?.Fields?.[data]?.slug
                                ]
                                  ? classes.err_field
                                  : ""
                              }
                            />
                          </>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
        </div>
        <div className={`${classes.divider} ${classes.on_media}`} />
        <div className={classes.property_card_container}>
          <div className={classes.property_card_text_container}>
            <h2>Upload your project details</h2>
            <p>Get the best value for your project in a few steps.</p>
          </div>
          <img
            src={property_preview_pic.src}
            className={classes.img_container}
          />
          <div className={classes.pic_overlay} />
          <ProjectDemoCard
            selectedValues={values}
            images={images}
            width={"90%"}
          />
          <div className={classes.handle_btns}>
            {/* <button disabled={isLoading} onClick={resetForm}>
              Reset Form
            </button> */}
            <button disabled={isLoading} onClick={handleSubmit}>
              Submit For Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
