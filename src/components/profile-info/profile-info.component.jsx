import React, { useState } from "react";
import "./profile-info.styles.scss";
import { mylocalStorage } from "../../Constants/Functions";
import { AccountSettingHeader } from "../account-settings-header/account-settings-header.component";
import { CustomButton } from "../custom-button/custome-button.component";
import { ToolTip } from "../tool-tip/tool-tip.component";
import ReactTooltip from "react-tooltip";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export const ProfileInfo = connect(mapStateToProps)(
  withRouter(({ history, userDetails }) => {
    userDetails = JSON.parse(mylocalStorage.getItem("user"));

    const [displayToolTip, toggleToolTip] = useState(false);
    return (
      <div>
        <div className="profile-info-section">
          <AccountSettingHeader headerTitle="Profile" pageRoute="profileEdit" />
          <div className="profile-info-content">
            <div className="user-profile-column">
              <div className="profile-content">
                <h6>Name</h6>
                <p>{userDetails.firstName + " " + userDetails.lastName}</p>
              </div>
              <div className="profile-content">
                <h6>Email Address</h6>
                <p>{userDetails.email}</p>
              </div>
              <div className="profile-content">
                <h6>Selected Currency</h6>
                <p>AED</p>
              </div>
            </div>
            <div className="user-profile-column">
              <div className="profile-content">
                <h6>Shoe Size</h6>
                <p>{userDetails.defaultSize}</p>
              </div>
              <div className="profile-content">
                <h6>
                  Username{"  "}
                  <i
                    className="fas fa-question-circle question"
                    data-tip="This is just for you, No <br> Buyer or Seller will ever see this information.<br> Whether you buy or sell you will remain anonymous. <br> Happy Trading!"
                  >
                    <ReactTooltip
                      multiline={true}
                      place="top"
                      type="light"
                      effect="solid"
                      backgroundColor="white"
                      textColor="black"
                      className="profile-tooltip"
                      border={true}
                      borderColor="black"
                    />
                  </i>
                </h6>
                <p>{userDetails.userInfo}</p>
              </div>
              <div className="profile-content">
                <h6
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => history.push("reset")}
                >
                  Reset Password
                </h6>
              </div>
            </div>
            <div className="user-profile-column"></div>
          </div>
        </div>
      </div>
    );
  })
);
