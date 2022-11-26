import React, { useEffect, useState } from "react";
import "./search-item.styles.scss";
import axios from "axios";

import { Link, useHistory, useLocation } from "react-router-dom";
import { makingValidName } from "../../Constants/Functions";

export const SearchItem = ({
  searchOpen,
  refreshComponent,
  setRefreshCompenent,
  shoe,
}) => {
  const { sku_number, name, detail, colorway } = shoe;
  const history = useHistory();
  const location = useLocation();
  const newname = makingValidName(shoe.name);
  const newskunumb = makingValidName(`${shoe.sku_number}`);
  const newshoeid = makingValidName(`${shoe.shoe_id}`);

  useEffect(() => {}, []);

  function saveFav(val, refreshComponent) {
    history.push(`/product/${val}`);

    // if (location.pathname == "/favourites-section") {
    //   var user = localStorage.getItem("user");
    // if (user === null) {
    //   history.push("/login");
    // } else {
    //   const data = {
    //     shoe_id: parseInt(val),
    //     user_id: JSON.parse(localStorage.getItem("user")).user_id,
    //   };

    //   //console.log("Fav:", data);
    //   axios
    //     .post("https://api.thrillerme.com/fav", data)
    //     .then((res) => {
    //       //console.log("Success", res.data);
    //       // setRefreshCompenent(!refreshComponent)
    //       window.location.reload()
    //     })
    //     .catch((err) => {
    //       //console.log(err);
    //       alert("Something Went Wrong");
    //     });
    // }

    // } else if (location.pathname == "/sell") {
    //   history.push('/shoe')
    // }
  }
  return (
    <Link
      to={{
        pathname: "",
        state: { shoe: { shoe } },
      }}
      onClick={() =>
        saveFav(
          `${newname}_sku_${newskunumb}_id_${newshoeid}`,
          refreshComponent
        )
      }
    >
      <div className="search-item">
        <img
          src={"https://appick.io/u/thriller/imgs/" + sku_number + ".png"}
          className="item-image"
          alt="item-img"
        />
        <div className="search-text">
          <span className="search-name"> {name} </span>{" "}
          <span className="search-detail"> {sku_number} </span>{" "}
          <span className="search-detail"> {colorway} </span>{" "}
        </div>{" "}
      </div>{" "}
    </Link>
  );
};
