import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import {
  MAP_DEFAULT_CENTER, RESTRICT_BOUNDS,
} from "../../../../utils/constants";
import { formatGeoLocation } from "../../../../utils";
import { useGoogleApi } from "../../../../context/googleContext";
import ProjectMapInfoCard from "../../../cards/project-map-info-card";

const ProjectReachMap = ({setMap, map, currentLocation, points}) => {
  const {isApiLoaded} = useGoogleApi()

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(MAP_DEFAULT_CENTER);
  const [activeMarker, setActiveMarker] = useState("");


  useEffect(() => {
    if(points?.length > 0){
      let markerData = points?.map((p) => {
        const mapPin = p?.geoLocation && formatGeoLocation(p?.geoLocation);
        return {id: p?._id, position: mapPin, title: p.name, parentId: p._id}
      })
      setMarkers(markerData);
    }else {
      setMarkers([])
    }
  }, [points]);

  const onLoad = (map) => {
    setMap(map);
    if(points?.length > 0){
      let markerData = points?.map((p) => {
        const mapPin = p?.geoLocation && formatGeoLocation(p?.geoLocation);
        return {id: p?._id, position: mapPin, title: p.name, parentId: p._id}

      })
      setMarkers(markerData);
    }else{
      setMarkers([]);
    }
  };


  const handleShowActiveMarker = (id , position) => {
    if (map && position && id !== activeMarker) {
      const zoomLevel = map.getZoom(); // Get current zoom level
      const newZoomLevel = zoomLevel + 2; // Increase zoom level by 2
      // Pan to the marker with the new zoom level
      map.setZoom(newZoomLevel);
      map.panTo(position);
    }
    setActiveMarker(id);
  };

  const handleHideActiveMarker = () => {
    setActiveMarker("");
  };

  return (
    <div className="property-map-wrapper">
      {isApiLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={{
              minHeight: "450px",
              height: "100%",
              width: "100%",
            }}
            center={currentLocation?.lat? currentLocation : center}
            zoom={5}
            onLoad={onLoad}
            options={{
              mapTypeControl: false,
              restriction: {
                latLngBounds: RESTRICT_BOUNDS,
                strictBounds: true,
              },
            }}
          >
            {markers?.length > 0 &&
              markers?.map((marker, i) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                  icon="/assets/icons/pin_blue.svg"
                  onClick={() => handleShowActiveMarker(`${marker.id}`, marker?.position)}
                >
                  {activeMarker && activeMarker === marker.id && (
                    <InfoWindow onCloseClick={handleHideActiveMarker} options={{ alignBottom: true }}>
                      <div>
                        <ProjectMapInfoCard  p={points.find(p => p?._id === marker?.id)}/>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
            ))}

          </GoogleMap>
        </>
      ) : (<div>Loading Map...</div>)}
    </div>
  );
};

export default ProjectReachMap;