import React, { useState, Fragment, useEffect } from "react";
import "./shipping-info-page.styles.scss";

import {
  validateEmail,
  validatePassword,
  validateName,
  validateCity,
  validateAddress,
  validateState,
  validateZip,
  validateNumber,
} from "../../Constants/Functions";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import axios from "axios";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Geocode from "react-geocode";
import SimpleMap from "../../components/Map/Maps_New";
import { useParams } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

Geocode.setApiKey("AIzaSyB5fNADpw-uWy5kw8EYDtxY56DyOtw87zc");
Geocode.setLanguage("en");

export const ShippingInfoPage = withRouter(({ history }) => {
  var id = useParams().id;

  var uData = useParams().uType;
  var uType = "";
  try {
    uType = uData.replace(/-/g, "/");
    //console.log("#### uType ###", uType);
  } catch (error) {}

  var userObj = window.localStorage.getItem("user");
  var userID = userObj ? JSON.parse(userObj).user_id : "";

  const [lati, setLatitude] = useState(25.1882891);
  const [lngi, setLongitude] = useState(55.2695004);

  const [formID, setFormID] = useState(id);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");

  function handleKeyPress(event) {
    // if (event.key === "Enter") {
    //   getCordinates(address, true);
    // }
  }

  function GetCity(data) {
    console.log("getting city data....");
    // console.log(data);
    var city = "";
    var country = "";
    var location = "";

    data.address_components.forEach((element) => {
      if (element.types[0] === "administrative_area_level_1") {
        city = element.long_name;
      }
      if (element.types[0] === "country") {
        country = element.long_name;
      }
    });

    setCity(city);
    setCountry(country);
    setFormattedAddress(data.formatted_address);

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${data.formatted_address}&key=AIzaSyB5fNADpw-uWy5kw8EYDtxY56DyOtw87zc`
      )
      .then((res) => {
        //console.log(res);
        location = res.data.results[0].geometry.location;

        //console.log("city:", city);
        //console.log("country:", country);
        console.log(location);
        setLatitude(location.lat);
        setLongitude(location.lng);
      });
  }

  //0 - shipping, 1 - seller, 2 - buyer

  // useEffect(() => {
  //   var items = JSON.parse(window.localStorage.getItem("cords"));
  //   //console.log("CORDS 1", items);

  //   if (
  //     address ===
  //     "Clover Bay Tower 2 - Business Bay - Dubai - United Arab Emirates"
  //   )
  //     setAddress("");
  // }, []);

  useEffect(() => {
    try {
      var items = JSON.parse(window.localStorage.getItem("cords"));
      var shipName = window.localStorage.getItem("shipName");
      var shipLastName = window.localStorage.getItem("shipLastName");
      var shipPhone = window.localStorage.getItem("shipPhone");
      if (items !== null && items !== undefined) {
        if (!isNaN(items.lat)) {
          if (lati !== items.lat) setLatitude(items.lat);
        }
        if (!isNaN(items.long)) {
          if (lngi !== items.long) setLongitude(items.long);
        }
        setAddress(items.address);
        setUserCredentials((prevState) => ({
          ...prevState,
          firstName: shipName,
          lastName: shipLastName,
          country: country,
          address: items.address,
          Address2: "",
          city: city,
          zip: "",
          state: country,
          phoneNumber: shipPhone,
        }));
        return;
      }
      if (formID == 0) {
        axios
          .get(`https://api.thrillerme.com/shippings/${userID}`)
          .then((res) => {
            if (items !== null && items !== undefined) {
              console.log(
                "########### refreshed ############",
                res.data.address
              );
              var add = items.address;
              setAddress(add);
              setUserCredentials((prevState) => ({
                ...prevState,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                country: res.data.country,
                address: add,
                Address2: res.data.address2,
                city: res.data.city,
                zip: res.data.zip,
                state: res.data.state,
                phoneNumber: res.data.phone,
              }));
            } else {
              console.log("########### from db ############", res.data.address);
              if (res.data.latitude !== null)
                if (!isNaN(res.data.latitude)) {
                  //possible crash
                  setLatitude(parseFloat(res.data.latitude));
                }
              if (!isNaN(res.data.longitude)) {
                if (res.data.longitude !== null)
                  setLongitude(parseFloat(res.data.longitude));
              }
              setAddress(res.data.address);
              setCity(res.data.city);
              setCountry(res.data.country);
              setFormattedAddress(res.data.formattedAddress);
              setUserCredentials((prevState) => ({
                ...prevState,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                country: res.data.country,
                address: res.data.address,
                Address2: res.data.address2,
                city: res.data.city,
                zip: res.data.zip,
                state: res.data.state,
                phoneNumber: res.data.phone,
              }));
              //getCordinatesLocal(res.data.address, true);
            }
          })
          .catch((res) => {
            try {
              console.error(res);
            } catch (error) {}
          });
      } else if (formID == 1) {
        console.log("########### form 1 ############", items);
        axios
          .get(`https://api.thrillerme.com/sellers/${userID}`)
          .then((res) => {
            if (items !== null && items !== undefined) {
              var add = items.address;
              setAddress(add);
              setUserCredentials((prevState) => ({
                ...prevState,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                country: res.data.country,
                address: add,
                Address2: res.data.address2,
                city: res.data.city,
                zip: res.data.zip,
                state: res.data.state,
                phoneNumber: res.data.phone,
              }));
            } else {
              setAddress(res.data.address);
              setCity(res.data.city);
              setCountry(res.data.country);
              setFormattedAddress(res.data.formattedAddress);
              setLongitude(parseFloat(res.data.longitude));
              setLatitude(parseFloat(res.data.latitude));
              setUserCredentials((prevState) => ({
                ...prevState,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                country: res.data.country,
                address: res.data.address,
                Address2: res.data.address2,
                city: res.data.city,
                zip: res.data.zip,
                state: res.data.state,
                phoneNumber: res.data.phone,
              }));
              // getCordinatesLocal(res.data.address, true);
            }
          })
          .catch((res) => {
            console.error(res);
          });
      } else if (formID == 2) {
        axios
          .get(`https://api.thrillerme.com/buyinginfo/${userID}`)
          .then((res) => {
            if (items !== null && items !== undefined) {
              var add = items.address;
              setAddress(add);
              setUserCredentials((prevState) => ({
                ...prevState,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                country: res.data.country,
                address: add,
                Address2: res.data.address2,
                city: res.data.city,
                zip: res.data.zip,
                state: res.data.state,
                phoneNumber: res.data.phone,
              }));
            } else {
              setAddress(res.data.address);
              setCity(res.data.city);
              setCountry(res.data.country);
              setUserCredentials((prevState) => ({
                ...prevState,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                country: res.data.country,
                address: res.data.address,
                Address2: res.data.address2,
                city: res.data.city,
                zip: res.data.zip,
                state: res.data.state,
                phoneNumber: res.data.phone,
              }));
            }
          })
          .catch((res) => {
            console.error(res);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCordinates = async (address, rel) => {
    await Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // setCoordinates({ lat: lat, long: lng })

        window.localStorage.setItem(
          "cords",
          JSON.stringify({
            lat: lat,
            long: lng,
            address: address,
          })
        );

        window.localStorage.setItem("shipName", userCredentials.firstName);
        window.localStorage.setItem("shipLastName", userCredentials.lastName);
        window.localStorage.setItem("shipPhone", userCredentials.phoneNumber);

        if (rel) {
          window.location.reload(false);
          if (!isNaN(lat)) {
            setLongitude(lng);
            setLatitude(lat);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const getCordinatesLocal = async (address) => {
    //alert(address);
    await Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // setCoordinates({ lat: lat, long: lng })

        // window.localStorage.setItem(
        //   "cords",
        //   JSON.stringify({
        //     lat: lat,
        //     long: lng,
        //     address: address,
        //   })
        // );

        if (!isNaN(lat)) {
          setLongitude(lng);
          setLatitude(lat);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    Address2: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  const [fieldStatus, setFieldStatus] = useState({
    firstName: true,
    lastName: true,
    country: true,
    address: true,
    Address2: true,
    city: true,
    state: true,
    zip: true,
    phoneNumber: true,
  });

  // useEffect(() => {}, []);

  async function SaveShipping() {
    var form = "shippings";
    if (formID == 1) form = "sellers";
    if (formID == 2) form = "buyinginfo";
    var shippingData = {
      user_id: userID,
      firstName: userCredentials.firstName,
      lastName: userCredentials.lastName,
      country: country,
      address: address,
      address2: "-",
      city: city,
      state: country,
      zip: "0",
      phone: userCredentials.phoneNumber,
      latitude: lati,
      longitude: lngi,
      formattedAddress: formattedAddress,
    };
    //console.log("shipping data", shippingData);

    if (
      shippingData.firstName === undefined &&
      shippingData.lastName === undefined &&
      shippingData.phoneNumber === undefined
    ) {
      shippingData.firstName = window.localStorage.getItem("shipName");
      shippingData.lastName = window.localStorage.getItem("shipLastName");
      shippingData.phone = window.localStorage.getItem("shipPhone");
    }

    if (
      shippingData.firstName == null ||
      shippingData.lastName == null ||
      shippingData.address == null ||
      shippingData.country == null ||
      shippingData.city == null ||
      shippingData.phone == null
    ) {
      console.log(shippingData);
      swal({
        title: "Error!",
        text: "Please fill the form.",
        icon: "error",
      });
      return;
    } else if (!validateName(shippingData.firstName)) {
      swal({
        title: "Error!",
        text: "Please enter the correct first name",
        icon: "error",
      });
      return;
    } else if (!validateName(shippingData.lastName)) {
      swal({
        title: "Error!",
        text: "Please enter the correct last name",
        icon: "error",
      });
      return;
    } else if (lati === 0) {
      swal({
        title: "Select your location!",
        text: "Please select your address on map.",
        icon: "error",
      });
      return;
    } else if (address === "") {
      swal({
        title: "Error!",
        text: "Please enter your address",
        icon: "error",
      });
      return;
    } else {
      var urlS = `https://api.thrillerme.com/${form}`;
      ////console.log(urlS);
      ////console.log(JSON.stringify(shippingData));
      ////console.log(shippingData);
      axios
        .post(urlS, shippingData)
        .then((res) => {
          //console.log(res);
          window.localStorage.setItem(
            "cords",
            JSON.stringify({
              lat: lati,
              long: lngi,
              address: address,
            })
          );
          window.localStorage.setItem("cords", null);
          if (
            history.location.state.historySetting !== undefined &&
            history.location.state.historySetting
          ) {
            if (uData === undefined) {
              history.goBack();
            } else {
              history.goBack();

              // history.push("/buy/" + uType);
            }
          } else if (
            (history.location.state.historyShoe !== null ||
              history.location.state.historyShoe !== undefined) &&
            history.location.state.historyShoe
          ) {
            //console.log(1);
            if (!history.location.state.hasPayout) {
              history.push({
                pathname: "/payoutInfo",
                state: {
                  historyShoe: history.location.state.historyShoe,
                },
              });
            } else if (history.location.state.hasPayout) {
              history.push("/sell");
            }
          } else if (
            (history.location.state.historyBuy !== null ||
              history.location.state.historyBuy !== undefined) &&
            history.location.state.historyBuy
          ) {
            history.push("/buy/" + uType);
          } else {
            //console.log(3);
            if (uData === undefined) {
              history.push("/setting-section"); //might be buggy (blank page on settings-sections)
            } else {
              history.push("/buy/" + uType);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleAddress = (event) => {
    const { name, value } = event.target;
    setAddress(value);
  };

  const activateField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  const disableField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: false });
  };
  return (
    <Fragment>
      <div className="shipping-info-container">
        <div className="shipping-box">
          {formID == 0 && (
            <div className="header-text">
              <h1>Shipping</h1>
              <span>Please provide your shipping info</span>
            </div>
          )}

          {formID == 1 && (
            <div className="header-text">
              <h1>Seller Info</h1>
              <span>Please provide seller information</span>
            </div>
          )}

          {formID == 2 && (
            <div className="header-text">
              <h1>Buying Info</h1>
              <span>Please provide buying information</span>
            </div>
          )}

          <div className="shipping-forms">
            {/* <span>Shipping Info</span> */}
            <div className="form-container">
              <label
                className={
                  fieldStatus.firstName || userCredentials.firstName
                    ? "float-label"
                    : null
                }
                htmlFor={1}
              >
                First Name
              </label>
              <input
                id={1}
                name="firstName"
                type="text"
                onChange={handleChange}
                onFocus={activateField}
                //onBlur={disableField}
                value={userCredentials.firstName}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.lastName || userCredentials.lastName
                    ? "float-label"
                    : null
                }
                htmlFor={2}
              >
                Last Name
              </label>
              <input
                id={2}
                name="lastName"
                type="text"
                onChange={handleChange}
                onFocus={activateField}
                //onBlur={disableField}
                value={userCredentials.lastName}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.phoneNumber || userCredentials.phoneNumber
                    ? "float-label"
                    : null
                }
                htmlFor={1}
              >
                Phone Number
              </label>
              <input
                id={1}
                placeholder="Phone number (9715****)"
                name="phoneNumber"
                type="number"
                onChange={handleChange}
                onFocus={activateField}
                //onBlur={disableField}
                value={userCredentials.phoneNumber}
              />
            </div>

            <div hidden className="dual-form">
              <div className="form-container">
                <label
                  className={fieldStatus.city || city ? "float-label" : null}
                  htmlFor={1}
                >
                  City
                </label>
                <input
                  id={1}
                  name="city"
                  type="text"
                  onChange={handleChange}
                  onFocus={activateField}
                  //onBlur={disableField}
                  value={city}
                  disabled
                />
              </div>
              <div className="form-container">
                <label
                  className={
                    fieldStatus.country || country ? "float-label" : null
                  }
                  htmlFor={1}
                >
                  Country
                </label>
                <input
                  id={1}
                  name="country"
                  type="text"
                  onChange={handleChange}
                  onFocus={activateField}
                  //onBlur={disableField}
                  value={country}
                  disabled
                />
              </div>
            </div>

            <div className="form-container bold-placeholder">
              <label
                className={
                  fieldStatus.address || address ? "float-label" : null
                }
                htmlFor={2}
              >
                Area / City / Country
              </label>

              <Autocomplete
                // options={{
                //   types: ["(regions)"],
                //   componentRestrictions: { country: "ae" },
                // }}
                defaultValue={formattedAddress}
                apiKey={"AIzaSyB5fNADpw-uWy5kw8EYDtxY56DyOtw87zc"}
                onPlaceSelected={(place) => GetCity(place)}
              />

              {/* <input
                id={2}
                name="address"
                type="text"
                placeholder="Enter your address, city and press enter"
                onChange={handleAddress}
                onFocus={activateField}
                //onBlur={disableField}
                value={address}
                onKeyPress={(e) => handleKeyPress(e)}
              /> */}
            </div>

            <div className="form-container bold-placeholder">
              <label
                className={
                  fieldStatus.address || address ? "float-label" : null
                }
                htmlFor={2}
              >
                Address
              </label>

              <input
                id={2}
                name="address"
                type="text"
                placeholder="Enter your address, city and press enter"
                onChange={handleAddress}
                onFocus={activateField}
                //onBlur={disableField}
                value={address}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </div>

            <div>
              <SimpleMap
                lati={lati}
                lngi={lngi}
                setLat={setLatitude}
                setLong={setLongitude}
                setCity={setCity}
                setCountry={setCountry}
                setAddress={setAddress}
              />
            </div>

            {/* <div className="dual-form">
              <div className="form-container">
                <label
                  className={
                    fieldStatus.state || userCredentials.state
                      ? "float-label"
                      : null
                  }
                  htmlFor={1}
                >
                  State
                </label>
                <input
                  id={1}
                  name="state"
                  type="text"
                  onChange={handleChange}
                  onFocus={activateField}
                 //onBlur={disableField}
                  value={userCredentials.state}
                />
              </div>
              <div className="form-container">
                <label
                  className={
                    fieldStatus.zip || userCredentials.zip
                      ? "float-label"
                      : null
                  }
                  htmlFor={1}
                >
                  Zip
                </label>
                <input
                  id={1}
                  name="zip"
                  type="text"
                  onChange={handleChange}
                  onFocus={activateField}
                 //onBlur={disableField}
                  value={userCredentials.zip}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="shipping-info-footer">
        <div className="button-container">
          <CustomButton
            size="inverted"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton onClick={SaveShipping}>Save</CustomButton>
        </div>
      </div>
    </Fragment>
  );
});
