import React, { useEffect, useState } from "react";
import { PURPOSE } from "./constants";
import Router from "next/router";
import { MAP_API_KEY, MAP_LIBRARIES } from "../config";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const validatePageByUserRole = (cUser, role, queryId, allQueries) => {
  let user = cUser && JSON.parse(cUser);
  let queryString = "";

  // Check if allQueries is an object and has keys
  if (allQueries && Object.keys(allQueries).length > 0) {
    queryString = `?${new URLSearchParams(allQueries).toString()}`;
  }

  if (user?.type === role) {
    return {
      props: {},
    };
  } else if (user?.type) {
    return {
      redirect: {
        destination: `/dashboard/${
          user?.type === "enduser" ? "user" : user?.type
        }/${queryId}${queryString}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
};

function createDashboardUrlByUserRole(userRole, query) {
  if(!userRole) return '/login';
  let dashboardBaseUrl = "/dashboard";
  let queryString = "";
  let allQueries = { ...query };
  console.log("all Q", allQueries);

  // Check if query is an object and has keys
  delete allQueries.id
  if (allQueries && Object.keys(allQueries).length > 0) {
    delete allQueries.id;
    queryString = `?${new URLSearchParams(allQueries).toString()}`;
  }

  // Customize the URL based on user role and query parameters
  if (query && query.id) {
    if (userRole === "enduser") {
      dashboardBaseUrl += `/user/${query.id}${queryString}`;
    } else if (userRole && userRole !== "enduser") {
      dashboardBaseUrl += `/${userRole}/${query.id}${queryString}`;
    } else {
      dashboardBaseUrl += `/${userRole}/overview`;
    }
  }

  return dashboardBaseUrl;
}

// const validatePageByUserRole = (cUser, role, queryId, allQueries) => {
//   let user = cUser && JSON.parse(cUser);
//   // let allQueries = query
//   // delete allQueries?.id
//   let queryString = "";
//   // if(allQueries && Object?.keys(allQueries)?.length > 0) {
//   //   queryString = objectToQueryString(JSON.parse(allQueries))
//   // }
//   if (user?.type === role) {
//     return {
//       props: {},
//     };
//   } else if (user?.type) {
//     return {
//       redirect: {
//         destination: `/dashboard/${
//           user?.type === "enduser" ? "user" : user?.type
//         }/${queryId}${queryString ? `?${queryString}` : '' }`,
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       redirect: {
//         destination: `/login`,
//         permanent: false,
//       },
//     };
//   }
// };

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDateWithMonthName = (date) => {
  let d = new Date();
  if (date) {
    d = new Date(date);
  }
  let month = months[d.getMonth()];
  let day = d.getDate().toString().padStart(2, "0");
  let year = d.getFullYear().toString().padStart(4, "0");
  return `${day} ${month} ${year}`;
};

const isJSONString = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const formatPrice = (price) => {
  if (isNaN(price) || price < 0) {
    return "Invalid input";
  }

  // Convert price to numeric value
  price = parseFloat(price);

  // Define the conversion units
  const units = ["", "Thousand", "Lac", "Crore"];

  // Initialize variables
  const formattedParts = [];
  let unitIndex = 0;

  // Loop through the units
  while (price >= 1) {
    const remainder = price % 100;
    if (remainder !== 0) {
      formattedParts.unshift(`${remainder}${units[unitIndex]}`);
    }
    price = Math.floor(price / 100);
    unitIndex++;
  }

  // Join the formatted parts
  const formattedPrice = formattedParts.join(" ");

  return formattedPrice !== "" ? formattedPrice : "0";
};

const formatCounts = (price) => {
  if (isNaN(price) || price < 0) {
    return 0;
  }

  if(price > 1000000000){
    return "1B+"
  }

  // Convert price to numeric value
  price = parseFloat(price);

  // Define the conversion units
  const units = ["", "K", "M", "B"];

  // Initialize variables
  let unitIndex = 0;

  // Loop through the units
  while (price >= 1000 && unitIndex < units.length - 1) {
    price /= 1000;
    unitIndex++;
  }

  // Check if the value is greater than or equal to 1000 for displaying '+'
  const displayPlus = price >= 1000 && unitIndex < units.length - 1;

  // Format the price with the appropriate unit
  const formattedPrice = (price % 1 === 0
    ? price.toFixed(0)
    : price.toFixed(2)
  ) + units[unitIndex] + (displayPlus ? '+' : '');

  return formattedPrice ;
};

function objectToQueryString(obj) {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return queryString;
}

function queryStringToObject(queryString) {
  const obj = {};

  if (!queryString || typeof queryString !== 'string') {
    return obj;
  }

  const pairs = queryString.split('&');

  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return obj;
}


const formatGeoLocation = (geolocation) => {
  const { coordinates } = geolocation;
  const [lng, lat] = coordinates;

  return {
    lat,
    lng,
  };
};

// const removeEmptyFields = (obj) => {
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
//         delete obj[key]
//       }
//     }
//   }
// }

const removeEmptyFields = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (!value) {
        delete obj[key];
      } else if (Array.isArray(value) && value.length === 0) {
        // Remove if the value is an empty array
        delete obj[key];
      }
    }
  }
};

function constructQueryString(queryObject) {
  const { purpose, type, subtype, city } = queryObject;
  let allQueries = { ...queryObject };
  let queryString = "/";

  if (purpose) {
    if (purpose === PURPOSE.coliving || purpose === PURPOSE.coworking) {
      queryString += `shared/${purpose}`;
    } else {
      queryString += `${purpose}`;
    }
    if (type) {
      queryString += `/${type}`;
      if (
        (subtype && !Array.isArray(subtype)) ||
        (subtype && Array.isArray(subtype) && subtype.length === 1)
      ) {
        queryString += `/${subtype}`;
        delete allQueries.subtype;
      }
    }
  }
  if (subtype && Array.isArray(subtype) && subtype.length > 1) {
    allQueries.subtype = subtype.join(",");
    if (purpose === PURPOSE.coliving || purpose === PURPOSE.coworking) {
      allQueries.subtype1 = subtype.join(",");
      delete allQueries.subtype;
    }
  }
  if (city && Array.isArray(city)) {
    allQueries.city = city.join(",");
  }
  console.log(queryObject);

  delete allQueries.purpose;
  delete allQueries.type;

  return { path: queryString, allQueries };
}

function updateQueryFromUrl(queryObject) {
  let allQueries = { ...queryObject };

  if (allQueries?.purpose === "shared") {
    allQueries.purpose = allQueries.type;
    delete allQueries.type;
    if (allQueries?.subtype) {
      allQueries.type = allQueries.subtype;
      delete allQueries.subtype;
    }
    if (!allQueries?.subtype1 && allQueries?.subtype) {
      allQueries.subtype = queryObject.subtype;
    }
    if (allQueries?.subtype1) {
      allQueries.subtype = allQueries.subtype1;
      delete allQueries.subtype1;
    }
  }

  let subtypeArray = allQueries?.subtype?.split(/,(?![^()]*\))/);
  let cityArray = allQueries?.city?.split(/,(?![^()]*\))/);

  if (subtypeArray?.length > 1) {
    allQueries.subtype = subtypeArray;
  }
  if (cityArray?.length > 1) {
    allQueries.city = cityArray;
  }

  return allQueries;
}

const goTo = (queryObject) => {
  removeEmptyFields(queryObject);
  const updatedQ = constructQueryString(queryObject);
  Router.push({
    pathname: updatedQ.path,
    query: updatedQ.allQueries,
  });
};

const convertNumberToWords = (value) => {
  if (!value) {
    return "0";
  }
  if (value < 1000) {
    // If less than 1000, display as is
    return value.toString();
  } else if (value < 100000) {
    // If less than 100000 and greater than 100, format as Thousands
    const thousands = (value / 1000).toFixed(2);
    return `${thousands % 1 === 0 ? parseInt(thousands) : thousands} Thousand`;
  } else if (value < 10000000) {
    // If less than 1 Crore and greater than 99999, format as Lakhs
    const lakhs = (value / 100000).toFixed(2);
    return `${lakhs % 1 === 0 ? parseInt(lakhs) : lakhs} Lakh`;
  } else if (value < 1000000000) {
    // If less than 1 Arab and greater than 9999999, format as Crores
    const crores = (value / 10000000).toFixed(2);
    return `${crores % 1 === 0 ? parseInt(crores) : crores} Crore`;
  } else if (value < 100000000000) {
    // If less than 1 Kharab and greater than 999999999, format as Arabs
    const arabs = (value / 1000000000).toFixed(2);
    return `${arabs % 1 === 0 ? parseInt(arabs) : arabs} Arab`;
  } else if (value < 10000000000000) {
    // If less than 1 Neel and greater than 999999999999, format as Kharabs
    const kharabs = (value / 100000000000).toFixed(2);
    return `${kharabs % 1 === 0 ? parseInt(kharabs) : kharabs} Kharab`;
  } else {
    // If greater than or equal to 1 Neel, format as Neel
    const neels = (value / 10000000000000).toFixed(2);
    return `${neels % 1 === 0 ? parseInt(neels) : neels} Neel`;
  }
  //  else {
  //   // If greater than or equal to 1 Arab, format as Arab
  //   const arabs = (value / 1000000000).toFixed(2);
  //   return `${arabs % 1 === 0 ? parseInt(arabs) : arabs} Arab`;
  // }
};

const isFieldError = (fieldName, formik) => {
  if (formik?.errors?.[fieldName]) {
    if (formik?.submitCount || formik?.touched?.[fieldName]) {
      return true;
    }
  }
  return false;
};

const calculateAverageDays = (createdAt) => {
  const start = new Date(createdAt);
  const end = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = end - start;

  // Convert milliseconds to days
  const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  const years = parseInt(daysDifference.toFixed(2));

  return isNaN(years) ? 0 : years;
};
const Handle_sperate = ({ data }) => {
  if (data && data.length > 0) {
    return data.join(", ");
  } else "";
};
const HandleNotFound = ({ text }) => {
  return (
    <>
      <div className="notFoundImg" />
      <div className="dataNotFound">{text || "Oops! Not found"}</div>
    </>
  );
};

const showUsersType = (type) => {
  switch (type) {
    case "endUser":
      return "User";
    case "agency":
      return "Agency";
    case "builder":
      return "Builder";
    case "staff":
      return "Agent";
    case "admin":
      return "Admin";
    default:
      return "User";
  }
};
export {
  useWindowSize,
  validatePageByUserRole,
  getDateWithMonthName,
  isJSONString,
  formatPrice,
  formatCounts,
  objectToQueryString,
  formatGeoLocation,
  removeEmptyFields,
  constructQueryString,
  updateQueryFromUrl,
  goTo,
  convertNumberToWords,
  HandleNotFound,
  isFieldError,
  calculateAverageDays,
  Handle_sperate,
  createDashboardUrlByUserRole,
  showUsersType,
  queryStringToObject,
};
