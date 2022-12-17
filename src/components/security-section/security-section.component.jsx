import React from "react";
import "./security-section.styles.scss";
import { mylocalStorage } from "../../Constants/Functions";

import { withRouter } from "react-router-dom";

import { CustomButton } from "../custom-button/custome-button.component";

var user = JSON.parse(mylocalStorage.getItem("user"));
var check = false;
//console.log(user);
if (user !== null || user !== undefined) {
  try {
    console.log(user.isAuthenticated);
    if (user.isAuthenticated == 1) {
      check = true;
    }
  } catch (error) {
    check = false;
  }
}

export const SecuritySection = withRouter(({ history }) => {
  return (
    <div className="security-container">
      <h2>Security</h2>
      <div className="security-text">
        <p>Two-Step Verification</p>
        <span>
          Two Factor Authentication is an extra layer of security for your
          Thriller account designed to make sure that you're the only person who
          can access your account, even if your password is compromised.
        </span>
        <br></br>
        <br></br>
        <span>Go on, set it up. It only takes 30 Seconds to change</span>
      </div>

      {check ? (
        <CustomButton
          onClick={() => history.push("twoFactorAuth")}
          size="small"
        >
          Turn On
        </CustomButton>
      ) : (
        <span style={{ fontWeight: 700 }}>Your account is authenticated</span>
      )}
    </div>
  );
});
