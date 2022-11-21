import React, { useState, useEffect } from "react";
import "./buying-pending-table.styles.scss";

import { SettingItem } from "../setting-item/setting-item.component";

import SHOE_DATA from "../../temporary-data/shoe-data";
import axios from "axios";
import { BASE_URL } from "../../Constants/Global";
import { connect } from "react-redux";

const BuyingPendingTable = ({ searchValue, userDetails }) => {
  const [buy, setBuy] = useState([]);
  var userID = JSON.parse(localStorage.getItem("user")).user_id;
  useEffect(() => {
    axios
      .get(BASE_URL + `offers/current/${userID}`)
      .then((res) => {
        setBuy(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <div className="buying-pending-table-container">
      <div className="table-header">
        <p className="heading-title">Item</p>
        <p className="heading-title tier-two">Size</p>
        <p className="heading-title tier-two">Order Price</p>
        <p className="heading-title tier-two">Lowest Asking Price</p>
        <p className="heading-title">Status</p>
      </div>
      {/* {SHOE_DATA.map((shoe) => (
        <SettingItem key={shoe.id} shoe={shoe} />
      ))} */}
      {searchValue === "" && buy
        ? buy.map((val, ind) => (
            <SettingItem key={ind + " "} shoe={val} buying={true} />
          ))
        : null}

      {searchValue !== "" &&
        buy !== null &&
        buy
          .filter((shoe) =>
            shoe.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
              ? shoe
              : null
          )
          .map((val, ind) => (
            <SettingItem key={ind + " "} shoe={val} buying={true} />
          ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export default connect(mapStateToProps)(BuyingPendingTable);
