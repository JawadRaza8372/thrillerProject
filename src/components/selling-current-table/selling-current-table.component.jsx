import React, { useState, useEffect } from "react";
import "./selling-current-table.styles.scss";
import axios from "axios";

import { SellingCurrentItem } from "../selling-current-item/selling-current-item.component";

import SHOE_DATA from "../../temporary-data/shoe-data";

export const SellingCurrentTable = ({
  searchValue,
  appendPendingShoeData,
  currentShoeData,
}) => {
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    console.log("load again........");
    var user = JSON.parse(window.localStorage.getItem("user"));
    var url = `https://api.thrillerme.com/listing/current/${user.user_id}`;
    console.log(url);
    axios
      .get(encodeURI(url))
      .then((res) => {
        setCurrentData(res.data);
      })
      .catch((err) => {});

    // console.log("time to clear....");
    // setCurrentData([]);
    // var timer = setTimeout(() => {}, 5000);
  }, []);

  // useEffect(() => {
  //   //setCurrentData([]);

  //   console.log("Search value", searchValue === "");

  //   setTimeout(() => {
  //     setCurrentData(oData);
  //   }, 5000);
  // }, [searchValue]);

  return (
    <div className="selling-current-table-container">
      <div className="table-header">
        <p className="heading-title">Item</p>
        <p className="heading-title tier-two">Size</p>
        <p className="heading-title tier-two">Asking Price</p>
        <p className="heading-title">Highest Offer</p>
      </div>
      {/* {SHOE_DATA.map((shoe) => (
        <SellingCurrentItem key={shoe.id} shoe={shoe} />
      ))} */}

      {searchValue === "" && currentData
        ? currentData.map((shoe, ind) => (
            <SellingCurrentItem
              appendPendingShoeData={appendPendingShoeData}
              key={shoe.shoe_id}
              shoe={shoe}
              setCurrentData={setCurrentData}
            />
          ))
        : null}

      {searchValue !== "" &&
        currentData !== null &&
        currentData
          .filter((shoe) =>
            shoe.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
              ? shoe
              : null
          )
          .map((shoe) => (
            <SellingCurrentItem
              appendPendingShoeData={appendPendingShoeData}
              key={shoe.shoe_id}
              shoe={shoe}
              setCurrentData={setCurrentData}
            />
          ))}
    </div>
  );
};
