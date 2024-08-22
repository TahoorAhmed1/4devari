// components/Map.js
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
// import { MAP_API_KEY, MAP_LIBRARIES, Map_ID } from "../../../../config";
import { useGoogleApi } from "../../../../context/googleContext";

const PropertyDetailMap = ({ markerPosition }) => {
  const {isApiLoaded} = useGoogleApi()
  return (
    <div>
      {/* <LoadScriptNext
        googleMapsApiKey={MAP_API_KEY}
        libraries={MAP_LIBRARIES}
        // mapIds={Map_ID}
      > */}
      {isApiLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            minHeight: "350px",
            height: "100%",
            width: "100%",
            borderRadius: "10px",
          }}
          center={markerPosition}
          zoom={14}
          options={{
            mapTypeControl: false,
          }}
        >
          <Marker
            position={markerPosition}
            // title={marker.title}
            icon="/assets/icons/pin_blue.svg"
          />
        </GoogleMap>
      ) :(
        <div>loading...</div>
      )}
      {/* </LoadScriptNext> */}
    </div>
  );
};

export default PropertyDetailMap;
