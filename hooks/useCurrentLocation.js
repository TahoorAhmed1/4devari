import { useState, useEffect } from "react";
import { MAP_API_KEY } from "../config";

const useCurrentLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`
      );
      const data = await response.json();
      console.log("JSON response", data)
      const address = data.results[0]?.formatted_address || "Address not found";
      setAddress(address);
    } catch (error) {
      setError("Error fetching address data");
    }
  }

  const getLocation = (recall) => {
    if (window !== undefined) {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "denied" && recall) {
              alert("Please allow location access.");
              window.location.href = "app-settings:location";
            } else {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  console.log("CPosition",position)
                  setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                  
                },
                (error) => {
                  setError(error.message);
                }
              );
            }
          });
      }
    }
  };

  const recallLocation = () => {
    setError(null);
    getLocation("recall");
  };

  useEffect(() => {
    // Check if Geolocation API is available
    if ("geolocation" in navigator) {
      getLocation();
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    // Check if Geolocation API is available
    if (location.lat && location.lng) {
      getAddress(location.lat, location.lng);
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, [location.lat, location.lng]);

  return { location, address, error, recallLocation };
};

export default useCurrentLocation;
