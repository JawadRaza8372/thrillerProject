import React, { useState, useEffect } from "react";
import "./shipping-info.styles.scss";
import axios from "axios";
import { AccountSettingHeader } from "../account-settings-header/account-settings-header.component";

export const ShippingInfo = () => {
  const [shippingData, setShippingData] = useState({});
  var user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    var url = `https://api.thrillerme.com/shippings/${user.user_id}`;
    axios
      .get(url)
      .then((res) => {
        setShippingData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="shipping-info-section">
      <AccountSettingHeader
        headerTitle="Shipping Information"
        pageRoute="shippingInfo/0"
      />
      <div className="shipping-info-content">
        {shippingData === "" ? (
          <p>You do not have any shipping information on file.</p>
        ) : (
          <div>
            {shippingData.firstName} <br></br>
            {shippingData.lastName} <br></br>
            {shippingData.phone} <br></br>
            {shippingData.country} <br></br>
            {shippingData.city} <br></br>
            {/* {shippingData.state} <br></br>
            {shippingData.zip} <br></br> */}
            {shippingData.address} <br></br>
            {/* {shippingData.address2} <br></br>{" "} */}
          </div>
        )}
      </div>
    </div>
  );
};
