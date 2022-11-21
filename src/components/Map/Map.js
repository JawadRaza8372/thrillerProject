import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import "./Map.css";
// // import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// // const containerStyle = {
// //     width: '400px',
// //     height: '400px'
// // };

// // const center = {
// //     lat: -3.745,
// //     lng: -38.523
// // };

// // function MyComponent({ coOrdinates }) {
// //     const { isLoaded } = useJsApiLoader({
// //         id: 'google-map-script',
// //         googleMapsApiKey: "AIzaSyDA2dtP8MErVMcGW_qoWxCUsnT5x_-QS-8"
// //     })

// //     const [map, setMap] = React.useState(null)

// //     const onLoad = React.useCallback(function callback(map) {
// //         const bounds = new window.google.maps.LatLngBounds();
// //         map.fitBounds(bounds);
// //         setMap(map)
// //     }, [])

// //     const onUnmount = React.useCallback(function callback(map) {
// //         setMap(null)
// //     }, [])

// //     return isLoaded ? (
// //         <GoogleMap
// //             mapContainerStyle={containerStyle}
// //             center={{ lat: coOrdinates.lati, lng: coOrdinates.lngi }}
// //             zoom={10}
// //             onLoad={onLoad}
// //             onUnmount={onUnmount}
// //         >
// //             { /* Child components, such as markers, info windows, etc. */}

// //         </GoogleMap>
// //     ) : null
// // }

// // export default MyComponent

// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// const MapContainer = (props) => {

//     const onMarkerClick = (props, marker, e) =>
//         this.setState({
//             selectedPlace: props,
//             activeMarker: marker,
//             showingInfoWindow: true
//         });

//     return (
//         <div>
//             <Map google={props.google}
//                 initialCenter={{
//                     lat: props.lati,
//                     lng: props.lngi
//                 }}
//                 style={{ width: '30%', height: '50%', position: 'relative' }}
//                 className={'map'}
//                 zoom={14}>
//                 <Marker onClick={onMarkerClick}
//                     name={'Current location'} />

//                 <InfoWindow
//                     // marker={activeMarker}
//                     visible={false}>
//                     <div>
//                     </div>
//                 </InfoWindow>

//             </Map>
//         </div>
//     );

// }

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyDA2dtP8MErVMcGW_qoWxCUsnT5x_-QS-8")
// })(MapContainer)

import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

// const MyMapComponent = (props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//

// <MyMapComponent isMarkerShown />// Map with a Marker
// <MyMapComponent isMarkerShown={false} />// Just only Map

let latittude;
let longitude;

const Map = () => {
  //console.log(longitude, latittude);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: latittude, lng: longitude }}
    >
      <Marker position={{ lat: latittude, lng: longitude }} />
    </GoogleMap>
  );
};
const WrapedMap = withScriptjs(withGoogleMap(Map));
// //console.log(latittude);
export default function custumMap({ lati, lngi }) {
  latittude = lati;
  longitude = lngi;
  //console.log(longitude);

  return (
    <div className="custum_Map">
      <WrapedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB5fNADpw-uWy5kw8EYDtxY56DyOtw87zc`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
