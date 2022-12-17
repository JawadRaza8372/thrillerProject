import React, { useState, useEffect } from "react";
import "./buying-history-table.styles.scss";
import axios from "axios";
import { SettingItem } from "../setting-item/setting-item.component";

import SHOE_DATA from "../../temporary-data/shoe-data";
import { BASE_URL } from "../../Constants/Global";
import { mylocalStorage } from "../../Constants/Functions";

export const BuyingHistoryTable = ({ searchValue }) => {
  const [buy, setBuy] = useState([]);

  useEffect(() => {
    var url =
      BASE_URL +
      `orders/buyer/${JSON.parse(mylocalStorage.getItem("user")).user_id}`;
    axios
      .get(encodeURI(url))
      .then((res) => {
        setBuy(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <div className="buying-history-table-container">
      <div className="table-header">
        <p className="heading-title">Item</p>
        <p className="heading-title tier-two">Order Number</p>
        <p className="heading-title tier-two">Purchase Date</p>
        <p className="heading-title">Price</p>
        <p className="heading-title tier-two">Status</p>
      </div>
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
          .map((shoe, ind) => (
            <SettingItem history={true} key={shoe.id} shoe={shoe} />
          ))}

      {/* {SHOE_DATA.map((shoe) => (
        <SettingItem history={true} key={shoe.id} shoe={shoe} />
      ))} */}
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
