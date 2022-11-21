import React, { useState, useEffect } from "react";
import "./security-page.styles.scss";

import { withRouter } from "react-router-dom";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import { AccountSidebar2 } from "../../components/account-sidebar-2/account-sidebar-2.component";
import EditOffering from "../../components/edit-offering-modal/EditOffering";

const sideBarLinks = [
  {
    page: "account",
    name: "Security",
    description: "Two-Step Verification",
    image: "/images/accountLock.svg",
  },
  {
    page: "settings-section",
    name: "Settings",
    description: "Payments, Payouts, Addresses",
    image: "/images/settingsCog.svg",
  },
  {
    page: "buying-section",
    name: "Buying",
    description: "Active Bids, In-Progress, Completed Orders",
    image: "/images/BuyingSetting.svg",
  },
  {
    page: "selling-section",
    name: "Selling",
    description: "Active Asks, In-Progress, Completed Sales",
    image: "/images/SellingSetting.svg",
  },
  {
    page: "favourites-section",
    name: "Favourites",
    description: "Products you like",
    image: "/images/FavouriteIcon.svg",
  },
];

var user = JSON.parse(localStorage.getItem("user"));
var check = false;
//console.log(user);
if (user !== null || user !== undefined) {
  try {
    if (user.isAuthenticated === 1) {
      check = true;
    }
  } catch (error) {
    check = false;
  }
}

export const SecurityPage = withRouter(({ history }) => {
  const [page, setPage] = useState("Security");
  const [sideBarStatus, setSideBarStatus] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="security-page-container">
      <AccountSidebar2
        setPage={(name) => setPage(name)}
        sideBarLinks={sideBarLinks}
        selectedPage={page}
        sideBarStatus={sideBarStatus}
      />
      <div className="menu-button">
        <CustomButton
          onClick={() => setSideBarStatus(!sideBarStatus)}
          size="small"
          style={{ marginTop: "25vh" }}
        >
          {sideBarStatus ? "Open Menu" : "Close Menu"}
        </CustomButton>
      </div>
      <div className="security-content-container">
        <h2>Security</h2>
        <div className="security-page-text">
          <p>Two-Step Verification</p>
          <span>
            Two Factor Authentication is an extra layer of security for your
            Thriller account designed to make sure that you're the only person
            who can access your account, even if your password is compromised.
          </span>
          <br></br>
          <br></br>
          <span>Go on, set it up. It only takes 30 seconds</span>
        </div>
        {check ? (
          <span style={{ fontWeight: 700 }}>Your account is authenticated</span>
        ) : (
          <CustomButton
            onClick={() => history.push("twoFactorAuth")}
            size="small"
          >
            Turn On
          </CustomButton>
        )}
      </div>
    </div>
  );
});
