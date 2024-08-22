import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  // LoadScript,
  Marker,
  Polygon,
  // Polyline,
} from "@react-google-maps/api";
// import { MAP_API_KEY, MAP_LIBRARIES, Map_ID } from "../../../../config";
import {
  MAP_DEFAULT_CENTER, RESTRICT_BOUNDS,
  // MAP_POLYGONS,
  // MARKERS_DATA,
} from "../../../../utils/constants";
import { formatGeoLocation } from "../../../../utils";
import { useDispatch } from "react-redux";
import { fetchProperties } from "../../../../redux/property";
import { useGoogleApi } from "../../../../context/googleContext";
import { fetchProjects, updateProjectState } from "../../../../redux/project";
import ProjectMapInfoCard from "../../../cards/project-map-info-card";

const ProjectMap = ({map, setMap, polygons, setPolygons, currentLocation, points}) => {
  const dispatch = useDispatch()
  const {isApiLoaded} = useGoogleApi()
  const [isDraw, setIsDraw] = useState(false);

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(MAP_DEFAULT_CENTER);
  const [markersInsidePolygons, setMarkersInsidePolygons] = useState([]);
  const [activeMarker, setActiveMarker] = useState("");


  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: "#4895EF",
    strokeColor: "#4361EE",
    strokeWeight: 2,
    draggable: false,
    editable: false,
    clickable: false,
  };

  const drawFreeHand = () => {
    // Create a Polyline object
    if (!isDraw) return;
    const newPolygon = new window.google.maps.Polyline({
      map: map,
      clickable: false,
      strokeColor: polygonOptions.strokeColor,
      strokeWeight: polygonOptions.strokeWeight,
    });

    const moveListener = window.google.maps.event.addListener(
      map,
      "mousemove",
      (e) => {
        newPolygon.getPath().push(e.latLng);
      }
    );

    window.google.maps.event.addListenerOnce(map, "mouseup", (e) => {
      window.google.maps.event.removeListener(moveListener);
      const path = newPolygon.getPath();
      setPolygons((prev) => [...prev, path]);
      newPolygon.setMap(null);
    });
  };

  const disableMapInteraction = () => {
    if (map) {
      map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
      });
    }
  };

  const enableMapInteraction = () => {
    if (map) {
      map.setOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
      });
    }
  };

  useEffect(() => {
    if (map && isDraw) {
        handleHideActiveMarker()
      // Initialize event listener for drawing
      window.google.maps.event.addDomListener(map.getDiv(), "mousedown", () => {
        drawFreeHand();
      });
    }
    if (!isDraw && map) {
      window.google.maps.event.clearListeners(map.getDiv(), "mousedown");
    }
  }, [map, isDraw]);

  useEffect(() => {
    if (isDraw) {
      disableMapInteraction();
    } else {
      enableMapInteraction();
    }
  }, [isDraw]);

  useEffect(() => {
    if(points?.length > 0){
      let markerData = points?.map((p) => {
        const mapPin = p?.geoLocation && formatGeoLocation(p?.geoLocation);
        return {id: p?._id, position: mapPin, title: p?.name, parentId: p._id}
      })
      setMarkers(markerData);
    }else {
      setMarkers([])
    }
  }, [points]);

  useEffect(() => {
    if(!isDraw){
      findMarkersInsidePolygons(markers, polygons);
    }
  }, [polygons, markers, isDraw]);

  const findMarkersInsidePolygons = (markers, polygons) => {
    const markersInsidePolygons = [];

    if (
      typeof window !== "undefined" &&
      map &&
      markers?.length > 0 &&
      polygons?.length > 0
    ) {
      markers.forEach((marker) => {
        const isInsideAnyPolygon = polygons.some((polygon) => {
          return window.google?.maps?.geometry?.poly?.containsLocation(
            new window.google.maps.LatLng(
              marker.position?.lat,
              marker.position?.lng
            ),
            new window.google.maps.Polygon({ paths: polygon })
          );
        });

        if (isInsideAnyPolygon) {
          markersInsidePolygons.push(marker);
        }
      });
    }

    setMarkersInsidePolygons(markersInsidePolygons);
  };

  const onLoad = (map) => {
    setMap(map);
    if(points?.length > 0){
      let markerData = points?.map((p) => {
        const mapPin = p?.geoLocation && formatGeoLocation(p?.geoLocation);
        return {id: p?._id, position: mapPin, title: p?.name, parentId: p._id}

      })
      setMarkers(markerData);
    }else{
      setMarkers([]);
    }
    // setPolygons(MAP_POLYGONS);
  };

  const onDeleteDrawing = () => {
    if(polygons?.length > 0 && markers?.length > 0) {
      const idsArray = markers?.map(m => m.parentId).join(',');
      dispatch(fetchProjects(`ids=${idsArray}`))
    }
    setPolygons([]);
    handleHideActiveMarker()
  };

  const onCancelDrawing = () => {
    setPolygons([]);
    setIsDraw(false);
  };

  const handleShowActiveMarker = (id, position) => {
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

  useEffect(() => {
    if(polygons?.length > 0 && !isDraw) {
      if(markersInsidePolygons?.length > 0){
        const idsArray = markersInsidePolygons?.map(m => m.parentId).join(',');
        dispatch(fetchProjects(`ids=${idsArray}`))
      }else if(markersInsidePolygons?.length === 0) {
        dispatch(updateProjectState({key: "projects", value: []}))
      }
    }
  },[markersInsidePolygons, polygons, isDraw])

  return (
    <div className="project-map-wrapper">
      {/* <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={MAP_LIBRARIES} mapIds={Map_ID}> */}
      {isApiLoaded ? (
        <>
          <div className="map_btn_container">
            {isDraw ? (
              <div className="btn" onClick={onCancelDrawing}>
                <img src="/assets/icons/cancel.svg" />
                <p>Cancel</p>
              </div>
            ) : (
              <div className="btn" onClick={onDeleteDrawing}>
                <img src="/assets/icons/erase.svg" />
                <p>Erase</p>
              </div>
            )}

            <div className="btn" onClick={() => setIsDraw((prev) => !prev)}>
              <img src="/assets/icons/draw.svg" />
              <p>{!isDraw ? "Draw" : "Apply"}</p>
            </div>
          </div>
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
            {!isDraw && polygons?.length === 0 &&
              markers?.length > 0 &&
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

            {!isDraw && polygons?.length > 0 &&
              markersInsidePolygons?.length > 0 &&
              markersInsidePolygons?.map((marker, i) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                  icon="/assets/icons/pin_blue.svg"
                  onClick={() => handleShowActiveMarker(`${marker.id}`)}
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

            {polygons?.length > 0 &&
              polygons?.map((p, i) => (
                <Polygon key={i} path={p} options={polygonOptions} />
              ))}
          </GoogleMap>
        </>
      ) : (<div>Loading Map...</div>)}
      {/* </LoadScript> */}
    </div>
  );
};

export default ProjectMap;