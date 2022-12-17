import React, { useState, useEffect } from "react";
import "./selling-history-table.styles.scss";

import { SettingItem } from "../setting-item/setting-item.component";

import SHOE_DATA from "../../temporary-data/shoe-data";
import axios from "axios";
import { BASE_URL } from "../../Constants/Global";

export const SellingHistoryTable = ({ searchValue }) => {
  const [buy, setBuy] = useState([]);
  const [oData, setOdata] = useState([]);
  var userID = JSON.parse(window.localStorage.getItem("user")).user_id;

  useEffect(() => {
    axios
      .get(BASE_URL + `orders/sellerHistory/${userID}`)
      .then((res) => {
        setBuy(res.data);
        setOdata(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <div className="selling-history-table-container">
      <div className="table-header">
        <p className="heading-title">Item</p>
        <p className="heading-title tier-two">Order Number</p>
        <p className="heading-title tier-two">Sale Date</p>
        <p className="heading-title">Price</p>
        <p className="heading-title tier-two">Status</p>
      </div>
      {/* {SHOE_DATA.map((shoe) => (
        <SettingItem history={true} key={shoe.id} shoe={shoe} />
      ))} */}

      {searchValue === "" && buy
        ? buy.map((shoe, ind) => (
            <SettingItem history={true} key={shoe.id} shoe={shoe} />
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
          .map((shoe) => (
            <SettingItem history={true} key={shoe.id} shoe={shoe} />
          ))}

      {/* {SHOE_DATA.filter((shoe) =>
        shoe.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          ? shoe
          : null
      ).map((shoe) => (
        <SettingItem history={true} key={shoe.id} shoe={shoe} />
      ))} */}
    </div>
  );
};
