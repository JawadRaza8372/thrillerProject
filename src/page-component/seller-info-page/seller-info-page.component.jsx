import React, { useState, Fragment, useEffect } from "react";
import "./seller-info.styles.scss";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateNumber,
  validateAddress,
  validateCity,
  validateState,
  validateZip,
  validateCard,
  validateDate,
} from "../../Constants/Functions";

export const SellerInfoPage = withRouter(({ history, location, title }) => {
  var userObj = JSON.parse(window.localStorage.getItem("user"));
  var userID = JSON.parse(window.localStorage.getItem("user")).user_id;

  const [userCredentials, setUserCredentials] = useState({
    countryShipping: "",
    addressShipping: "",
    address2Shipping: "",
    cityShipping: "",
    stateShipping: "",
    phoneShipping: "",
    zipShipping: "",
    country: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contactNumber: "",
    contactInfo: "",
    creditCardNumber: "",
    expires: "",
    ccv: "",
  });

  useEffect(() => {
    axios
      .get(`https://api.thrillerme.com/sellers/${userID}`)
      .then((res) => {
        setUserCredentials((prevState) => ({
          ...prevState,
          contactInfo: res.data.email,
          ccv: res.data.ccv,
          expires: res.data.expires,
          creditCardNumber: res.data.card,
          contactNumber: res.data.phone,
          zip: res.data.zip,
          state: res.data.state,
          city: res.data.city,
          address2: res.data.address2,
          address: res.data.address,
          country: res.data.country,
        }));
        toggleShippingStatus(res.data.sameShipping);
      })
      .catch((res) => {
        console.error(res);
      });

    axios
      .get(`https://api.thrillerme.com/shippings/${userID}`)
      .then((res) => {
        // ////console.log("Shippings", res.data);
        setUserCredentials((prevState) => ({
          ...prevState,
          countryShipping: res.data.country,
          addressShipping: res.data.address,
          address2Shipping: res.data.address2,
          cityShipping: res.data.city,
          zipShipping: res.data.zip,
          stateShipping: res.data.state,
          phoneShipping: res.data.phone,
        }));
      })
      .catch((res) => {
        console.error(res);
      });
  }, []);

  const [fieldStatus, setFieldStatus] = useState({
    countryShipping: "",
    addressShipping: "",
    address2Shipping: "",
    cityShipping: "",
    stateShipping: "",
    phoneShipping: "",
    zipShipping: "",
    country: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contactNumber: "",
    contactInfo: "",
    creditCardNumber: "",
    expires: "",
    ccv: "",
  });

  const [shippingStatus, toggleShippingStatus] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const activateField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  const disableField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: false });
  };

  function SaveInfo() {
    var _sameShipping = 0;
    if (shippingStatus) {
      _sameShipping = 1;
    }

    var data = {
      user_id: JSON.parse(window.localStorage.getItem("user")).user_id,
      email: userCredentials.contactInfo,
      country: userCredentials.country,
      address: userCredentials.address,
      address2: userCredentials.address2,
      city: userCredentials.city,
      state: userCredentials.state,
      zip: userCredentials.zip,
      phone: userCredentials.contactNumber,
      card: userCredentials.creditCardNumber,
      ccv: userCredentials.ccv,
      expires: userCredentials.expires,
      sameShipping: _sameShipping,
    };

    var shippingData = {};
    if (data.sameShipping === 1) {
      shippingData = {
        user_id: userID,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        country: data.country,
        address: data.address,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
      };
    } else {
      shippingData = {
        user_id: userID,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        country: userCredentials.countryShipping,
        address: userCredentials.addressShipping,
        address2: userCredentials.address2Shipping,
        city: userCredentials.cityShipping,
        state: userCredentials.stateShipping,
        zip: userCredentials.zipShipping,
        phone: userCredentials.phoneShipping,
      };
    }

    if (
      data.country == null ||
      data.address == null ||
      data.address2 == null ||
      data.state == null ||
      data.city == null ||
      data.phone == null ||
      data.zip == null
    ) {
      swal({
        title: "Error!",
        text: "Please fill the form correctly",
        icon: "error",
      });
      return;
    }
    if (!validateEmail(data.email)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Email Address",
        icon: "error",
      });
      return;
    }
    if (!validateCity(data.country)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Country Name",
        icon: "error",
      });
      return;
    }
    if (!validateCity(data.city)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct City Name",
        icon: "error",
      });
      return;
    }
    if (!validateCity(data.state)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct State Name",
        icon: "error",
      });
      return;
    }
    if (!validateZip(data.zip)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Zip Code",
        icon: "error",
      });
      return;
    }

    if (!validateNumber(data.phone)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Contact Number",
        icon: "error",
      });
      return;
    } else {
      var url = `https://api.thrillerme.com/sellers/`;
      axios
        .post(url, data)
        .then((res) => {
          //console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });

      ////console.log("S", shippingData);
      var urlS = `https://api.thrillerme.com/shippings/`;
      axios
        .post(urlS, shippingData)
        .then((res) => {
          history.goBack();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  //console.log(title);
  return (
    <Fragment>
      <div className="seller-info-container">
        <div className="seller-box">
          <div className="header-text">
            <h1>{title}</h1>
            {title == "Billing" && (
              <div className="selection-box">
                <label>Same Shipping Address</label>
                <input
                  checked={shippingStatus}
                  onChange={() => toggleShippingStatus(!shippingStatus)}
                  type="checkbox"
                ></input>
              </div>
            )}
          </div>
          <div className="seller-forms">
            <span>Contact</span>
            <div className="form-container">
              <label
                className={
                  fieldStatus.contactInfo || userCredentials.contactInfo
                    ? "float-label"
                    : null
                }
                htmlFor={1}
              >
                Email
              </label>
              <input
                id={1}
                name="contactInfo"
                type="email"
                onChange={handleChange}
                onFocus={activateField}
                onBlur={disableField}
                value={userCredentials.contactInfo}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.country || userCredentials.country
                    ? "float-label"
                    : null
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
                onBlur={disableField}
                value={userCredentials.country}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.address || userCredentials.address
                    ? "float-label"
                    : null
                }
                htmlFor={2}
              >
                Address
              </label>
              <input
                id={2}
                name="address"
                type="text"
                onChange={handleChange}
                onFocus={activateField}
                onBlur={disableField}
                value={userCredentials.address}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.address2 || userCredentials.address2
                    ? "float-label"
                    : null
                }
                htmlFor={1}
              >
                Address 2
              </label>
              <input
                id={1}
                name="address2"
                type="text"
                onChange={handleChange}
                onFocus={activateField}
                onBlur={disableField}
                value={userCredentials.address2}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.city || userCredentials.city
                    ? "float-label"
                    : null
                }
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
                onBlur={disableField}
                value={userCredentials.city}
              />
            </div>
            <div className="dual-form">
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
                  onBlur={disableField}
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
                  onBlur={disableField}
                  value={userCredentials.zip}
                />
              </div>
            </div>

            <div className="form-container">
              <label
                className={
                  fieldStatus.contactNumber || userCredentials.contactNumber
                    ? "float-label"
                    : null
                }
                htmlFor={2}
              >
                Contact Number
              </label>
              <input
                className={
                  title == "Buying Info" ? "sellerInfoMobileSetting" : ""
                }
                id={2}
                name="contactNumber"
                type="number"
                onChange={handleChange}
                onFocus={activateField}
                onBlur={disableField}
                value={userCredentials.contactNumber}
              />
            </div>
            {title == "Billing" && (
              <div>
                <span>Payment Info</span>

                <div className="form-container">
                  <label
                    className={
                      fieldStatus.creditCardNumber ||
                      userCredentials.creditCardNumber
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    Card Number
                  </label>
                  <input
                    id={1}
                    name="creditCardNumber"
                    type="text"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={userCredentials.creditCardNumber}
                  />
                </div>
                <div className="dual-form">
                  <div className="form-container">
                    <label
                      className={
                        fieldStatus.expires || userCredentials.expires
                          ? "float-label"
                          : null
                      }
                      htmlFor={1}
                    >
                      Expires
                    </label>
                    <input
                      id={1}
                      name="expires"
                      type="text"
                      onChange={handleChange}
                      onFocus={activateField}
                      onBlur={disableField}
                      value={userCredentials.expires}
                    />
                  </div>
                  <div className="form-container">
                    <label
                      className={
                        fieldStatus.ccv || userCredentials.ccv
                          ? "float-label"
                          : null
                      }
                      htmlFor={1}
                    >
                      CCV
                    </label>
                    <input
                      id={1}
                      name="ccv"
                      type="number"
                      onChange={handleChange}
                      onFocus={activateField}
                      onBlur={disableField}
                      value={userCredentials.ccv}
                    />
                  </div>
                </div>
              </div>
            )}
            {shippingStatus == false ? (
              <div>
                <span>Shipping Address</span>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.countryShipping ||
                      userCredentials.countryShipping
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    Country
                  </label>
                  <input
                    id={1}
                    name="countryShipping"
                    type="text"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={userCredentials.countryShipping}
                  />
                </div>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.addressShipping ||
                      userCredentials.addressShipping
                        ? "float-label"
                        : null
                    }
                    htmlFor={2}
                  >
                    Address
                  </label>
                  <input
                    id={2}
                    name="addressShipping"
                    type="text"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={userCredentials.addressShipping}
                  />
                </div>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.address2Shipping ||
                      userCredentials.address2Shipping
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    Address 2
                  </label>
                  <input
                    id={1}
                    name="address2Shipping"
                    type="text"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={userCredentials.address2Shipping}
                  />
                </div>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.cityShipping || userCredentials.cityShipping
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    City
                  </label>
                  <input
                    id={1}
                    name="cityShipping"
                    type="text"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={userCredentials.cityShipping}
                  />
                </div>
                <div className="dual-form">
                  <div className="form-container">
                    <label
                      className={
                        fieldStatus.stateShipping ||
                        userCredentials.stateShipping
                          ? "float-label"
                          : null
                      }
                      htmlFor={1}
                    >
                      State
                    </label>
                    <input
                      id={1}
                      name="stateShipping"
                      type="text"
                      onChange={handleChange}
                      onFocus={activateField}
                      onBlur={disableField}
                      value={userCredentials.stateShipping}
                    />
                  </div>
                  <div className="form-container">
                    <label
                      className={
                        fieldStatus.zipShipping || userCredentials.zipShipping
                          ? "float-label"
                          : null
                      }
                      htmlFor={1}
                    >
                      Zip
                    </label>
                    <input
                      id={1}
                      name="zipShipping"
                      type="text"
                      onChange={handleChange}
                      onFocus={activateField}
                      onBlur={disableField}
                      value={userCredentials.zipShipping}
                    />
                  </div>
                  <div className="form-container">
                    <label
                      className={
                        fieldStatus.zipShipping || userCredentials.phoneShipping
                          ? "float-label"
                          : null
                      }
                      htmlFor={1}
                    >
                      Phone
                    </label>
                    <input
                      id={1}
                      name="phoneShipping"
                      type="text"
                      onChange={handleChange}
                      onFocus={activateField}
                      onBlur={disableField}
                      value={userCredentials.phoneShipping}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="seller-info-footer">
        <div className="button-container">
          <CustomButton
            onClick={() => {
              history.push("settings-section");
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton onClick={SaveInfo}>Submit</CustomButton>
        </div>
      </div>
    </Fragment>
  );
});
