import React, { useEffect, useState } from "react";
import "./search-item.styles.scss";
import axios from "axios";

import { Link, useHistory, useLocation } from "react-router-dom";
import { Fragment } from "react";
import SizeSelectorMobile from "../size-selector-mobile/SizeSelectorMobile";

export const SearchItem = ({
  refreshComponent,
  setRefreshCompenent,
  shoe,
  setSearchbar,
  setInputValue,
  searchbar,
  selling,
  pending,
  buying,
  linkCheck,
  history,
}) => {
  const { sku_number, name, detail, colorway } = shoe;
  const History = useHistory();
  const location = useLocation();
  const [sizechart, setSizechartFav] = useState(false);
  const [sizeFav, setSizeFav] = useState(0);

  useEffect(() => {}, []);
  //var userID = JSON.parse(localStorage.getItem("user")).user_id;
  function saveFav(val, refreshComponent) {
    //console.log(location.pathname);
    if (location.pathname === "/favourites-section" && linkCheck === false) {
      var user = localStorage.getItem("user");
      if (user === null) {
        History.push("/login");
      } else {
        ////console.log(userID);
        setSizeFav(0);
        //console.log(sizeFav);
        setSizechartFav(true);
        // const data = {
        //   shoe_id: parseInt(val),
        //   user_id: JSON.parse(localStorage.getItem("user")).user_id,
        // };

        // //console.log("Fav:", data);
        // axios
        //   .post("https://api.thrillerme.com/fav", data)
        //   .then((res) => {
        //     //console.log("Success", res.data);
        //     // setRefreshCompenent(!refreshComponent)
        //     window.location.reload();
        //   })
        //   .catch((err) => {
        //     //console.log(err);
        //     alert("Something Went Wrong");
        //   });
      }
    } else if (
      location.pathname === "/favourites-section" &&
      linkCheck === true
    ) {
      History.push(`/product/${val}`);
    } else if (location.pathname === "/sell") {
      localStorage.setItem("sellShoe", JSON.stringify(shoe));
      History.push("/shoe");
    } else if (location.pathname === "/buying-section") {
      History.push(`/product/${val}`);
    } else if (location.pathname === "/selling-section") {
      History.push(`/product/${val}`);
    } else {
      setInputValue("");
      setSearchbar(!searchbar);
      History.push(`/product/${val}`);
    }
  }

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    //console.log(width);
    return width;
  }

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  var widthScreen = getWindowDimensions();

  return (
    <Link
      to={{
        pathname: "",
        state: { shoe: { shoe } },
      }}
      onClick={() => saveFav(shoe.shoe_id, refreshComponent)}
    >
      <div className="search-item">
        <img src={shoe.cover_image} className="item-image" alt="item-img" />
        <div className="search-text">
          <span className="search-name">{name}</span>
          <span className="search-detail">{sku_number}</span>
          <span className="search-detail">{colorway}</span>

          {widthScreen <= 481 && location.pathname === "/favourites-section" ? (
            <Fragment>
              {/* {//console.log(shoe.size)} */}
              {shoe.size !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "700", color: "black" }}
                >
                  Size: {shoe.size}
                </span>
              ) : null}
              {shoe.lowestAsk !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "700", color: "black" }}
                >
                  Lowest Ask: {parseFloat(shoe.lowestAsk).toFixed(2)}
                </span>
              ) : null}{" "}
              {shoe.marketValue !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "700", color: "black" }}
                >
                  Market Value: {parseFloat(shoe.marketValue).toFixed(2)}
                </span>
              ) : null}
            </Fragment>
          ) : widthScreen <= 481 && selling === false ? (
            <Fragment>
              {shoe.size !== null ? (
                <span className="search-detail">Size: {shoe.size}</span>
              ) : null}
              {shoe.offerAmount !== null ? (
                <span className="search-detail">
                  Market Value: AED {shoe.offerAmount}
                </span>
              ) : null}
              {shoe.lowestAsk !== null ? (
                <span className="search-detail">
                  Lowest Ask: AED {shoe.lowestAsk}
                </span>
              ) : null}
              {shoe.status !== null ? (
                <span className="search-detail">Status: {shoe.status}</span>
              ) : null}
            </Fragment>
          ) : widthScreen <= 481 && history === true ? (
            <Fragment>
              {shoe.order_id !== null ? (
                <span className="search-detail">Order ID: {shoe.order_id}</span>
              ) : null}
              {shoe.date !== null ? (
                <span className="search-detail">
                  Purchase Date: {shoe.date}
                </span>
              ) : null}
              {/* {shoe.lowestAsk !== null ? (
                <span className="search-detail">Price: AED {shoe.offer}</span>
              ) : null} */}
              {shoe.status !== null ? (
                <span className="search-detail">Status: {shoe.status}</span>
              ) : null}
            </Fragment>
          ) : widthScreen <= 481 && selling === true ? (
            <Fragment>
              {shoe.size !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Size: {shoe.size}
                </span>
              ) : null}
              {shoe.askingPrice !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Asking Price: AED {shoe.askingPrice}
                </span>
              ) : null}
              {shoe.expiry !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Expiry: {getNumberOfDays(Date(), shoe.validTill)} days
                  remaining
                </span>
              ) : null}
            </Fragment>
          ) : widthScreen <= 481 && pending === true ? (
            <Fragment>
              {shoe.order_id !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Order Number: {shoe.order_id}
                </span>
              ) : null}
              {shoe.date !== undefined ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Sale Date:{" "}
                  {shoe.date !== undefined && shoe.date.split("T")[0]}
                </span>
              ) : null}
              {shoe !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Price: AED {shoe.offer}
                </span>
              ) : null}
            </Fragment>
          ) : widthScreen <= 481 && buying === true ? (
            <Fragment>
              {shoe.size !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Size: {shoe.size}
                </span>
              ) : null}
              {shoe.offerAmount !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Order Price: AED {shoe.offerAmount}
                </span>
              ) : null}{" "}
              {shoe.lowestAsk !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Lowest Ask: AED {shoe.lowestAsk}
                </span>
              ) : null}
              {/* {shoe.size !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Size: {shoe.size}
                </span>
              ) : null}
              {shoe.offer !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Price: AED {shoe.offer}
                </span>
              ) : null} */}
            </Fragment>
          ) : widthScreen > 481 && selling === true ? (
            <Fragment>
              {shoe.expiry !== null ? (
                <span
                  className="search-detail"
                  style={{ fontWeight: "750", color: "black" }}
                >
                  Expiry: {getNumberOfDays(Date(), shoe.validTill)} days
                  remaining
                </span>
              ) : null}
            </Fragment>
          ) : null}
        </div>
        <div className="sizechart-search">
          {sizechart ? (
            <SizeSelectorMobile
              shoe={shoe}
              fav={true}
              setSizechartFav={setSizechartFav}
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
};
