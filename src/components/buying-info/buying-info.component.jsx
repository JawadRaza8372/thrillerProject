import React, { useState, useEffect } from "react";
import "./buying-info.styles.scss";
import axios from "axios";

import { AccountSettingHeader } from "../account-settings-header/account-settings-header.component";

export const BuyingInfo = () => {
  const [buyingData, setBuyingData] = useState({});

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    var url = `https://api.thrillerme.com/buyinginfo/${user.user_id}`;
    axios
      .get(url)
      .then((res) => {
        setBuyingData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="buying-info-section">
      <AccountSettingHeader
        headerTitle="Buying Information"
        pageRoute="shippingInfo/2"
      />
      <div className="shipping-info-content">
        {buyingData === "" ? (
          <p>You do not have any buying information saved.</p>
        ) : (
          <div>
            {buyingData.firstName} <br></br>
            {buyingData.lastName} <br></br>
            {buyingData.phone} <br></br>
            {buyingData.country} <br></br>
            {buyingData.city} <br></br>
            {buyingData.address} <br></br>
          </div>
        )}
      </div>
    </div>
  );
};
