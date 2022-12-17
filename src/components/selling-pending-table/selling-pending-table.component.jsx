import "./selling-pending-table.styles.scss";
import React, { useState, useEffect } from "react";

import { SettingItem } from "../setting-item/setting-item.component";

import SHOE_DATA from "../../temporary-data/shoe-data";
import axios from "axios";
import { BASE_URL } from "../../Constants/Global";
import { Fragment } from "react";

export const SellingPendingTable = ({ searchValue, pendingShoeData }) => {
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    //console.log(width);
    return width;
  }

  var widthScreen = getWindowDimensions();

  let SHOE_DATA = pendingShoeData;
  // const [buy, setBuy] = useState([]);

  const [pendingData, setPendingData] = useState([]);
  const [oData, setOdata] = useState([]);

  var userID = JSON.parse(window.localStorage.getItem("user")).user_id;

  useEffect(() => {
    axios
      .get(BASE_URL + `orders/sellerPending/${userID}`)
      .then((res) => {
        setPendingData(res.data);
        setOdata(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log("Clear.....");
  //   setPendingData([]);
  //   setTimeout(() => {
  //     console.log("set.....", oData.length);
  //     setPendingData(oData);
  //   }, 5000);
  // }, [searchValue]);

  return (
    <div className="selling-pending-table-container">
      <div className="table-header">
        {widthScreen <= 481 ? (
          <Fragment>
            <p className="heading-title">Item</p>
            <p className="heading-title">Status</p>
          </Fragment>
        ) : (
          <Fragment>
            <p className="heading-title">Item</p>
            <p className="heading-title tier-two">Order Number</p>
            <p className="heading-title tier-two">Sale Date</p>
            <p className="heading-title">Price</p>
            <p className="heading-title tier-two">Status</p>
          </Fragment>
        )}
      </div>

      {searchValue === "" && pendingData
        ? pendingData.map((shoe, ind) => (
            <SettingItem
              history={false}
              datePicker={true}
              key={shoe.id}
              shoe={shoe}
              pending={true}
              setBuy={setPendingData}
            />
          ))
        : null}

      {searchValue !== "" &&
        pendingData !== null &&
        pendingData
          .filter((shoe) =>
            shoe.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
              ? shoe
              : null
          )
          .map((shoe) => (
            <SettingItem
              history={false}
              datePicker={true}
              key={shoe.id}
              shoe={shoe}
              pending={true}
              setBuy={setPendingData}
            />
          ))}

      {/* {SHOE_DATA.map((shoe) => (
        <SettingItem history={true} key={shoe.id} shoe={shoe} />
      ))} */}
      {/* {SHOE_DATA.filter((shoe) =>
        shoe.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          ? shoe
          : null
      ).map((shoe) => (
        <SettingItem
          history={true}
          datePicker={true}
          key={shoe.id}
          shoe={shoe}
        />
      ))} */}
    </div>
  );
};
