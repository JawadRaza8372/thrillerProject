import React, { useEffect, useState } from "react";
import "./payout-info.styles.scss";

import { AccountSettingHeader } from "../account-settings-header/account-settings-header.component";
import axios from "axios";
export const PayoutInfo = () => {
  const [user, setUser] = useState({});
  const [payoutData, setPayoutData] = useState({});
  const [info, setInfo] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    var userID = JSON.parse(localStorage.getItem("user")).user_id;
    var url = `https://api.thrillerme.com/payout/${userID}`;
    //console.log(url);
    axios
      .get(url)
      .then((res) => {
        setPayoutData(res.data);
        //console.log(payoutData);
        saveDetails("BankAccountName", res.data.name);
        saveDetails("BankAccountNick", res.data.nickName);
        saveDetails("BankAccountIBAN", res.data.IBAN);
        saveDetails("paypalEmail", res.data.paypalEmail);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [payoutData]);

  const saveDetails = (name, value) => {
    // Get the existing data
    var existing = localStorage.getItem("user");

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : {};

    // Add new data to localStorage Array
    existing[name] = value;

    // Save back to localStorage
    localStorage.setItem("user", JSON.stringify(existing));
  };

  var check = true;
  return (
    <div className="payout-info-section">
      <AccountSettingHeader
        headerTitle="Payout Information"
        pageRoute="payoutInfo"
      />
      <div className="payout-info-content">
        {
          payoutData.paypalEmail !== undefined &&
          payoutData.paypalEmail !== "" &&
          payoutData.payoutMode === "paypal" ? (
            <span>
              {(check = false)}
              {/* {console.log(payoutData)} */}
              PayPal: {payoutData.paypalEmail}
            </span>
          ) : null
          // setInfo(true)
        }
        {
          payoutData.name !== undefined &&
          payoutData.name !== "" &&
          payoutData.payoutMode === "bank" ? (
            <span>
              {(check = false)}
              {/* {//console.log(payoutData)} */}
              Name: {payoutData.name}
            </span>
          ) : null
          // setInfo(true)
        }{" "}
        {
          payoutData.nickName !== undefined &&
          payoutData.nickName !== "" &&
          payoutData.payoutMode === "bank" ? (
            <span>
              {(check = false)}
              {/* {//console.log(payoutData)} */}
              Nick: {payoutData.nickName}
            </span>
          ) : null
          // setInfo(true)
        }{" "}
        {
          payoutData.IBAN !== undefined &&
          payoutData.IBAN !== "" &&
          payoutData.payoutMode === "bank" ? (
            <span>
              {(check = false)}
              {/* {//console.log(payoutData)} */}
              IBAN: {payoutData.IBAN}
            </span>
          ) : null
          // setInfo(true)
        }
        {check ? (
          <p>
            {/* {//console.log(payoutData)} */}
            You do not have any payout information on file
          </p>
        ) : null}
      </div>
    </div>
  );
};
