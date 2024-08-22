// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import { MAP_API_KEY, MAP_LIBRARIES } from "../../../config";
// import classes from "./location-picker.module.css";
// import google_marker from "../../../public/assets/property-detail-assets/google-marker.svg";

// const mapContainerStyle = {
//   width: "100%",
//   height: "250px",
//   borderRadius: "15px",
//   marginTop: "-20px",
//   backgroundColor: "#D5DFF0",
// };

// const CustomMarkerIcon = ({ url }) => {
//   return (
//     <img
//       src={url}
//       alt="Custom marker icon"
//       style={{ width: '30px', height: '30px' }}
//     />
//   );
// };


// const defaultCenter = {
//   lat: 37.7749, // Default to San Francisco latitude
//   lng: -122.4194, // Default to San Francisco longitude
// };

// const mapOptions = {
//   disableDefaultUI: true, // Hide default UI controls
//   mapId: "Satellite",
// };

// function LocationPicker({selectedLocation, setSelectedLocation}) {
//   const [markerName, setMarkerName] = useState('Default Marker');

//   const handleMapClick = (e) => {
//     const { latLng } = e;
//     const lat = latLng.lat();
//     const lng = latLng.lng();
//     setSelectedLocation({ lat, lng });
//     setMarkerName('Custom Marker');
//   };
  
//   return (
//     <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={MAP_LIBRARIES}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={selectedLocation}
//         zoom={15}
//         options={mapOptions}
//         onClick={handleMapClick}
//       >
//         <Marker
//           position={selectedLocation}
//           icon={{
//             url: "/assets/property-detail-assets/google-marker.svg",
//             // scaledSize: new window.google.maps.Size(85, 85),
//             // anchor: new window.google.maps.Point(42.5, 85),
//             // labelOrigin: new window.google.maps.Point(0, -85),
//           }
//           }
//         />
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default LocationPicker;

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, LoadScriptNext, Marker } from "@react-google-maps/api";
import { MAP_API_KEY, MAP_LIBRARIES } from "../../../config";
import classes from "./location-picker.module.css";
import google_marker from "../../../public/assets/property-detail-assets/google-marker.svg";
import { useGoogleApi } from "../../../context/googleContext";

const mapContainerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "15px",
  marginTop: "-20px",
  backgroundColor: "#D5DFF0",
};

const defaultCenter = {
  lat: 37.7749, // Default to San Francisco latitude
  lng: -122.4194, // Default to San Francisco longitude
};

const mapOptions = {
  disableDefaultUI: true, // Hide default UI controls
  mapId: "Satellite",
};

function LocationPicker({ selectedLocation, setSelectedLocation }) {
  const [markerName, setMarkerName] = useState('Default Marker');
  const {isApiLoaded} = useGoogleApi()

  // Update the map center when the selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      // You can add more logic here if needed
      // For now, just set the map center to the selected location
      setMapCenter(selectedLocation);
    }
  }, [selectedLocation]);

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setSelectedLocation({ lat, lng });
    setMarkerName('Custom Marker');
  };

  return (
    <>
      {isApiLoaded ? (
        <LoadScriptNext googleMapsApiKey={MAP_API_KEY} libraries={MAP_LIBRARIES}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
            options={mapOptions}
            onClick={handleMapClick}
          >
            <Marker
              position={selectedLocation}
              icon={{
                url: "/assets/property-detail-assets/google-marker.svg",
              }}
            />
          </GoogleMap>
        </LoadScriptNext>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default LocationPicker;
