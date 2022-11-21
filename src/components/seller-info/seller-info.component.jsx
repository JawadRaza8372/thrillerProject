import React, { useState, useEffect } from "react";
import "./seller-info.styles.scss";
import axios from "axios";
import { AccountSettingHeader } from "../account-settings-header/account-settings-header.component";

export const SellerInfo = () => {
  const [sellersData, setSellersData] = useState({});
  var user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    var url = `https://api.thrillerme.com/sellers/${user.user_id}`;
    axios
      .get(url)
      .then((res) => {
        setSellersData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="selling-info-section">
      <AccountSettingHeader
        headerTitle="Seller Information"
        pageRoute="shippingInfo/1"
        toolTip={true}
      />
      <div className="selling-info-content">
        {sellersData === "" ? (
          <p>You do not have any sellers information saved.</p>
        ) : (
          <div>
            {sellersData.firstName} <br></br>
            {sellersData.lastName}
            {sellersData.email} <br></br>
            {sellersData.phone} <br></br>
            {sellersData.country} <br></br>
            {sellersData.city} <br></br>
            {/* {sellersData.state} <br></br>
            {sellersData.zip} <br></br> */}
            {sellersData.address} <br></br>
            {/* {sellersData.address2} <br></br>{" "} */}
          </div>
        )}
      </div>
    </div>
  );
};
