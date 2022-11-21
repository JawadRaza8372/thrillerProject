import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import logo from "./marker.png";
import Geocode from "react-geocode";
import axios from "axios";

const AnyReactComponent = ({ text }) => (
  <div>
    <img src={logo}></img>
  </div>
);

const SimpleMap = ({ lati, lngi }) => {
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    console.log("######## load map", lati + " - " + lngi);
    // try {
    //   try {
    //     if (isNaN(lati)) lati = 25.1407228;
    //     if (isNaN(lngi)) lngi = 55.1885032;
    //   } catch (error) {
    //     lati = 25.1407228;
    //     lngi = 55.1885032;
    //   }
    //   //console.log(`Maps [${lati},${lngi}]`);
    //   axios
    //     .get(
    //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lati},${lngi}&sensor=true&key=AIzaSyB5fNADpw-uWy5kw8EYDtxY56DyOtw87zc`
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       console.log(lati, lngi);
    //       console.log("Latest response", response.data.results[1]);
    //       const address = response.data.results[1].formatted_address;
    //       let city, state, country;
    //       for (
    //         let i = 0;
    //         i < response.data.results[1].address_components.length;
    //         i++
    //       ) {
    //         for (
    //           let j = 0;
    //           j < response.data.results[1].address_components[i].types.length;
    //           j++
    //         ) {
    //           switch (response.data.results[1].address_components[i].types[j]) {
    //             case "locality":
    //               city =
    //                 response.data.results[1].address_components[i].long_name;
    //               break;
    //             case "administrative_area_level_1":
    //               city =
    //                 response.data.results[1].address_components[i].long_name;
    //               break;
    //             case "country":
    //               country =
    //                 response.data.results[1].address_components[i].long_name;
    //               break;
    //           }
    //         }
    //       }
    //       console.log(city);
    //       setCountry(country);
    //       setCity(city);
    //       setAddress(address);
    //     });
    // } catch (error) {
    //   window.location.reload();
    // }
  }, [lngi]);

  function createMapOptions(maps) {
    return {
      panControl: true,
      mapTypeControl: true,
      scrollwheel: true,
      styles: [
        {
          stylers: [{ gamma: 0.8 }, { lightness: 4 }, { visibility: "on" }],
        },
      ],
    };
  }

  function _onClick(obj) {}

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyB5fNADpw-uWy5kw8EYDtxY56DyOtw87zc",
          libraries: ["visualization"],
        }}
        defaultCenter={{ lat: 23.4241, lng: 53.8478 }}
        defaultZoom={zoom}
        // options={createMapOptions}
        // onClick={_onClick}
      >
        <AnyReactComponent lat={lati} lng={lngi} />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
