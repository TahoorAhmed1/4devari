// components/Map.js
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
import MapInfoCard from "../../../cards/map-info-card";
import { useDispatch } from "react-redux";
import { fetchProperties, updatePropertyState } from "../../../../redux/property";
import { useGoogleApi } from "../../../../context/googleContext";

const Map = ({map, setMap, polygons, setPolygons, currentLocation, points}) => {
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
        const mapPin = p?.property?.geoLocation && formatGeoLocation(p?.property?.geoLocation);
        return {id: p?.property?._id, position: mapPin, title: p.property.title, parentId: p._id}
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
        const mapPin = p?.property?.geoLocation && formatGeoLocation(p?.property?.geoLocation);
        // return {id: p._id, position: mapPin, title: p.property.title}
        return {id: p?.property?._id, position: mapPin, title: p.property.title, parentId: p._id}

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
      dispatch(fetchProperties(`ids=${idsArray}`))
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
        dispatch(fetchProperties(`ids=${idsArray}`))
      }else if(markersInsidePolygons?.length === 0) {
        dispatch(updatePropertyState({key: "properties", value: []}))
      }
    }
  },[markersInsidePolygons, polygons, isDraw])

  return (
    <div className="property-map-wrapper">
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
                        <MapInfoCard  p={points.find(p => p?.property?._id === marker?.id)}/>
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
                        <MapInfoCard  p={points.find(p => p?.property?._id === marker?.id)}/>
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

export default Map;

// import React, { memo, useCallback, useRef, useState } from "react";
// import {
//   DrawingManager,
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   Polygon,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { MAP_API_KEY, MAP_LIBRARIES } from "../../../../config";
// import { useEffect } from "react";
// import {
//   MAP_DEFAULT_CENTER,
//   MAP_POLYGONS,
//   MARKERS_DATA,
// } from "../../../../utils/constants";

// import deleteIcon from "../../../../public/assets/icons/waste.svg";

// const containerStyle = {
//   width: "100%",
//   height: "85vh",
//   marginTop: "80px",
// };

// function PropertyMap() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: MAP_API_KEY,
//     libraries: MAP_LIBRARIES,
//   });
//   const mapRef = useRef();
//   const drawingManagerRef = useRef();
//   const activePolygonIndex = useRef();

//   const [markers, setMarkers] = useState([]);
//   const [center, setCenter] = useState(MAP_DEFAULT_CENTER);
//   const [activeMarker, setActiveMarker] = useState("");
//   const [polygons, setPolygons] = useState([]);
//   const [markersInsidePolygons, setMarkersInsidePolygons] = useState([]);

//   const [isDrawing, setIsDrawing] = useState(false);
//   const [drawingPath, setDrawingPath] = useState([]);

//   const polygonOptions = {
//     fillOpacity: 0.3,
//     fillColor: "#4895EF",
//     strokeColor: "#4361EE",
//     strokeWeight: 2,
//     draggable: true,
//     editable: true,
//   };

//   const drawingManagerOptions = {
//     drawingMode: typeof window !== "undefined" && window?.google?.maps?.drawing?.OverlayType?.FREEHAND_POLYGON,
//     polygonOptions: polygonOptions,
//     drawingControl: true,
//     drawingControlOptions: {
//       position:
//         typeof window !== "undefined" &&
//         window?.google?.maps?.ControlPosition?.TOP_RIGHT,
//       drawingModes: [
//         typeof window !== "undefined" &&
//           window?.google?.maps?.drawing?.OverlayType?.POLYGON,
//       ],
//     },
//     map: mapRef.current,
//   };

//   const deleteIconStyle = {
//     cursor: "pointer",
//     backgroundImage: `url(/assets/icons/waste.svg)`,
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "contain",
//     height: "24px",
//     width: "24px",
//     marginTop: "5px",
//     backgroundColor: "#fff",
//     position: "absolute",
//     top: "2px",
//     right: "20%",
//     zIndex: 99999,
//   };

//   useEffect(() => {
//     if (isLoaded) {
//       setMarkers(MARKERS_DATA);
//       setPolygons(MAP_POLYGONS);
//     }
//   }, [isLoaded]);

//   useEffect(() => {
//       findMarkersInsidePolygons(markers, polygons);
//   }, [polygons, markers]);

//   const onLoad = useCallback(function callback(map) {
//     mapRef.current = map;
//   }, []);
//   const onLoadDrawingManager = (drawingManager) => {
//     drawingManagerRef.current = drawingManager;
//   };
//   const onClickPolygon = (index) => {
//     activePolygonIndex.current = index;
//   };

//   const handleShowActiveMarker = (id) => {
//     setActiveMarker(id);
//   };
//   const handleHideActiveMarker = () => {
//     setActiveMarker("");
//   };

//   const findMarkersInsidePolygons = (markers, polygons) => {
//     const markersInsidePolygons = [];

//     if (
//       typeof window !== "undefined" &&
//       isLoaded &&
//       markers?.length > 0 &&
//       polygons?.length > 0
//     ) {
//       markers.forEach((marker) => {
//         const isInsideAnyPolygon = polygons.some((polygon) => {
//           return window.google?.maps?.geometry?.poly?.containsLocation(
//             new window.google.maps.LatLng(
//               marker.position.lat,
//               marker.position.lng
//             ),
//             new window.google.maps.Polygon({ paths: polygon })
//           );
//         });

//         if (isInsideAnyPolygon) {
//           markersInsidePolygons.push(marker);
//         }
//       });
//     }

//     setMarkersInsidePolygons(markersInsidePolygons);
//   };

//   const onOverlayComplete = ($overlayEvent) => {
//     drawingManagerRef.current.setDrawingMode(null);
//     if ($overlayEvent?.type === window?.google?.maps?.drawing?.OverlayType?.POLYGON) {
//       const newPolygon = $overlayEvent.overlay
//         .getPath()
//         .getArray()
//         .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

//       const startPoint = newPolygon[0];
//       newPolygon.push(startPoint);
//       $overlayEvent.overlay?.setMap(null);
//       setPolygons([...polygons, newPolygon]);
//     }
//   };

//   const onDeleteDrawing = () => {
//     // const filtered = polygons.filter(
//     //   (polygon, index) => index !== activePolygonIndex.current
//     // );
//     setPolygons(MAP_POLYGONS);
//   };

//   if (markersInsidePolygons?.length > 0) {
//     console.log(markersInsidePolygons);
//   }

//   return (
//     <>
//       {isLoaded ? (
//         <div className="property-map-wrapper" style={{ position: "relative" }}>
//             <button className="draw-btn" onClick={() => setIsDrawing(!isDrawing)}>
//   {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
// </button>
//           {drawingManagerRef.current && (
//             <div
//               onClick={onDeleteDrawing}
//               title="Delete shape"
//               style={deleteIconStyle}
//             ></div>
//           )}
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={15}
//             onLoad={onLoad}
//             onTilesLoaded={() => {
//               setCenter(null);
//               findMarkersInsidePolygons(markers, polygons);
//             }}
//           >
//             {markers?.length > 0 &&
//               markers?.map((marker) => (
//                 <Marker
//                   key={marker.id}
//                   position={marker.position}
//                   title={marker.title}
//                   onMouseOver={() => handleShowActiveMarker(marker.id)}
//                   onMouseOut={handleHideActiveMarker}
//                 >
//                   {activeMarker && activeMarker === marker.id && (
//                     <InfoWindow>
//                       <h3>{marker.title}</h3>
//                     </InfoWindow>
//                   )}
//                 </Marker>
//               ))}
//             {isLoaded && (
//               <DrawingManager
//             //   onPolygonComplete={handleDrawingComplete}
//               options={{
//                 drawingMode: isDrawing ? 'polygon' : null,
//               }}
//             />
//             )}
//             {/* {isLoaded && (
//               <DrawingManager
//                 onLoad={onLoadDrawingManager}
//                 options={drawingManagerOptions}
//                 onOverlayComplete={onOverlayComplete}
//               />
//             )} */}

//             {polygons?.length > 0 &&
//               polygons?.map((iterator, index) => (
//                 <Polygon
//                   key={index}
//                   // onLoad={(event) => onLoadPolygon(event, index)}
//                   onMouseDown={() => onClickPolygon(index)}
//                   // onMouseUp={() => onEditPolygon(index)}
//                   // onDragEnd={() => onEditPolygon(index)}
//                   options={polygonOptions}
//                   paths={iterator}
//                   draggable
//                   editable
//                 />
//               ))}
//           </GoogleMap>
//         </div>
//       ) : (
//         <h1>Loading...</h1>
//       )}
//     </>
//   );
// }

// export default memo(PropertyMap);
