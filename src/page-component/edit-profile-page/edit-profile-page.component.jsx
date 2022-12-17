import React, { useState, Fragment } from "react";
import "./edit-profile.styles.scss";
import swal from "sweetalert";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import { withRouter } from "react-router-dom";
import SizeSelectProd from "../../components/size-selector-product/SizeSelectProd";
import Sdropdown from "../../components/size-dropdown/SizeDropdown";
import { validateUserInfo, validateNumber } from "../../Constants/Functions";
import { mylocalStorage } from "../../Constants/Functions";

import { DropDown } from "../../components/drop-down/drop-down.component";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_URL, SIGNUP } from "../../Constants/Global";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export const EditProfilePage = connect(mapStateToProps)(
  withRouter(({ history, userDetails }) => {
    var profileData = JSON.parse(mylocalStorage.getItem("user"));

    const sortOptions = [
      { value: profileData.defaultSize, label: profileData.defaultSize },
      { value: "4", label: "4" },
      { value: "4.5", label: "4.5" },
      { value: "5", label: "5" },
      { value: "5.5", label: "5.5" },
      { value: "6", label: "6" },
      { value: "6.5", label: "6.5" },
      { value: "7", label: "7" },
      { value: "7.5", label: "7.5" },
      { value: "8", label: "8" },
      { value: "8.5", label: "8.5" },
      { value: "9", label: "9" },
      { value: "9.5", label: "9.5" },
      { value: "10", label: "10" },
      { value: "10.5", label: "10.5" },
      { value: "11", label: "11" },
      { value: "11.5", label: "11.5" },
      { value: "12", label: "12" },
      { value: "12.5", label: "12.5" },
      { value: "13", label: "13" },
      { value: "13.5", label: "13.5" },
      { value: "14", label: "14" },
      { value: "15", label: "15" },
      { value: "16", label: "16" },
      { value: "17", label: "17" },
      { value: "18", label: "18" },
    ];

    const [userCredentials, setUserCredentials] = useState({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      userInfo: profileData.userInfo,
      defaultSize: profileData.defaultSize,
      contactInfo: profileData.contact,
    });

    const [size, setSize] = useState(profileData.defaultSize);

    const [fieldStatus, setFieldStatus] = useState({
      firstName: "",
      lastName: "",
      userInfo: "",
      defaultSize: "",
      contactInfo: "",
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setUserCredentials({ ...userCredentials, [name]: value });
      //console.log(name === "defaultSize", value);
      if (name === "defaultSize") {
        setSize(value);
      }
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
        <div className="profile-edit-container">
          <div className="profile-box">
            <div className="header-text">
              <h1>Profile</h1>
              <span>Change your profile settings</span>
            </div>
            <div className="profile-forms" style={{ marginBottom: "20vh" }}>
              <span>Name</span>
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
                  onBlur={disableField}
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
                  onBlur={disableField}
                  value={userCredentials.lastName}
                />
              </div>
              <span>User Info</span>
              <div className="form-container">
                <label
                  className={
                    fieldStatus.userInfo || userCredentials.userInfo
                      ? "float-label"
                      : null
                  }
                  htmlFor={1}
                >
                  User Info
                </label>
                <input
                  id={1}
                  name="userInfo"
                  type="text"
                  onChange={handleChange}
                  onFocus={activateField}
                  onBlur={disableField}
                  value={userCredentials.userInfo}
                />
              </div>

              <span>Contact Info</span>
              <div className="form-container">
                <label
                  className={
                    fieldStatus.contactInfo || userCredentials.contactInfo
                      ? "float-label"
                      : "float-label"
                  }
                  htmlFor={1}
                >
                  Contact
                </label>
                <input
                  id={1}
                  name="contactInfo"
                  type="email"
                  onChange={handleChange}
                  onFocus={activateField}
                  onBlur={disableField}
                  value={userCredentials.contactInfo}
                  placeholder="Phone Number (9715****)"
                />
              </div>
              <span>Default Size </span>
              <div className="size-container editPageMobileSetting">
                {/* <DropDown sortOptions={sortOptions} /> */}

                <select
                  name="defaultSize"
                  className="mb-5"
                  onChange={handleChange}
                >
                  {sortOptions.map((val, ind) => (
                    <option value={val.value} label={val.label}>
                      {val.label}
                    </option>
                  ))}
                </select>
                {/* <SizeSelectProd minimal={true} size="Not Set" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="edit-profile-footer">
          <div className="button-container">
            <CustomButton
              onClick={() => {
                history.push("settings-section");
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={() => {
                ////console.log("USerDAta", userCredentials);
                const {
                  firstName,
                  lastName,
                  userInfo,
                  contactInfo,
                  defaultSize,
                } = userCredentials;
                if (
                  firstName === "" ||
                  lastName === "" ||
                  userInfo === "" ||
                  contactInfo === ""
                ) {
                  swal({
                    title: "Error!",
                    text: "Please enter all the fields properly",
                    icon: "error",
                  });
                  return;
                }
                if (!validateUserInfo(userInfo)) {
                  swal({
                    title: "Error!",
                    text: "Please Enter The Valid User Info",
                    icon: "error",
                  });
                  return;
                }

                if (!validateNumber(contactInfo)) {
                  swal({
                    title: "Error!",
                    text: "Please enter valid contact info",
                    icon: "error",
                  });
                  return;
                }

                //
                const data = {
                  user_id: profileData.user_id,
                  firstName: firstName,
                  lastName: lastName,
                  contact: contactInfo,
                  password: profileData.password,
                  isAuthenticated: profileData.isAuthenticated,
                  isApproved: profileData.isApproved,
                  isSuspended: profileData.isSuspended,
                  suspendedTill: profileData.suspendedTill,
                  defaultSize: size,
                  userInfo: userInfo,
                  user_role: profileData.user_role,
                  business_name: profileData.business_name,
                  email: profileData.email,
                  paypal: profileData.paypal,
                  address: profileData.address,
                };
                axios
                  .put(SIGNUP + profileData.user_id, data)
                  .then((res) => {
                    ////console.log("Success", res.data);
                    if (res.data.status === "success") {
                      mylocalStorage.setItem("user", JSON.stringify(data));
                      history.push("settings-section");
                    } else {
                      swal({
                        title: "Error!",
                        text: "Username is already taken.",
                        icon: "error",
                      });
                    }
                  })
                  .catch((err) => {
                    ////console.log("Error", err);
                    alert("Something went Wrong");
                  });
              }}
            >
              Submit
            </CustomButton>
          </div>
        </div>
      </Fragment>
    );
  })
);
