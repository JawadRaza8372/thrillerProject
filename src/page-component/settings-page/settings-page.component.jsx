import React, { useState, useEffect } from "react";
import "./settings-page.styles.scss";
import { mylocalStorage } from "../../Constants/Functions";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import { ProfileInfo } from "../../components/profile-info/profile-info.component";
import { BuyingInfo } from "../../components/buying-info/buying-info.component";
import { ShippingInfo } from "../../components/shipping-info/shipping-info.component";
import { SellerInfo } from "../../components/seller-info/seller-info.component";
import { PayoutInfo } from "../../components/payout-info/payout-info.component";
import { AccountSidebar2 } from "../../components/account-sidebar-2/account-sidebar-2.component";

import { NotificationInfo } from "../../components/notification-info/notification-info.component";

import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

export const SettingsPage = withRouter(({ history }) => {
  const [page, setPage] = useState("Settings");
  const [sideBarStatus, setSideBarStatus] = useState(true);
  const newhistory = useHistory();
  const fetchUser = async () => {
    const rawUserId = await mylocalStorage.getItem("user");
    //
    if (rawUserId) {
      console.log("user found");
    } else {
      newhistory.push("/login");
    }
  };
  useEffect(() => {
    fetchUser();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="settings-page-container">
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
      <div className="settings-content-container">
        <h2>Account Settings</h2>

        <ProfileInfo />
        {/* <BuyingInfo /> */}
        <SellerInfo />
        <ShippingInfo />
        <PayoutInfo />

        {/*<NotificationInfo />*/}
      </div>
    </div>
  );
});
