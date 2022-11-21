import React, { Fragment } from "react";
import "./setting-section.styles.scss";

import { CustomButton } from "../custom-button/custome-button.component";
import { ProfileInfo } from "../profile-info/profile-info.component";
import { BuyingInfo } from "../buying-info/buying-info.component";
import { ShippingInfo } from "../shipping-info/shipping-info.component";
import { SellerInfo } from "../seller-info/seller-info.component";
import { PayoutInfo } from "../payout-info/payout-info.component";
import { NotificationInfo } from "../notification-info/notification-info.component";

import { withRouter } from "react-router-dom";

export const SettingSection = withRouter(({ history }) => {
  return (
    <div className="setting-container">
      <h2>Account Settings</h2>
      <ProfileInfo />
      <BuyingInfo />
      <SellerInfo />
      <ShippingInfo />
      <PayoutInfo />
    </div>
  );
});
