import React, { useState, useEffect } from "react";
import "./favourite-table.styles.scss";

import { SettingItem } from "../setting-item/setting-item.component";
import SHOE_DATA from "../../temporary-data/shoe-data";
import axios from "axios";
import { Fragment } from "react";

export const FavouriteTable = () => {
  const [favData, setFavData] = useState([]);
  useEffect(() => {
    var url = `https://api.thrillerme.com/fav/${
      JSON.parse(localStorage.getItem("user")).user_id
    }`;
    axios.get(url).then((res) => {
      //console.log(url, res.data);
      setFavData(res.data);
    });
  }, []);

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    //console.log(width);
    return width;
  }

  var widthScreen = getWindowDimensions();

  return (
    <div className="favourite-table-container">
      <div className="table-header">
        {widthScreen <= 481 ? (
          <p className="heading-titlex">Item</p>
        ) : (
          <Fragment>
            <p className="heading-title">Item</p>
            <p className="heading-title tier-two">Size</p>
            <p className="heading-title">Market Value</p>
            <p className="heading-title tier-two">Lowest Ask</p>
            <p className="heading-title tier-two">Last Sale</p>
          </Fragment>
        )}
      </div>
      {favData.map((shoe) => (
        <SettingItem key={shoe.id} shoe={shoe} favourite={1} linkCheck={true} />
      ))}
    </div>
  );
};
