import React from "react";
import "./SizeSelectorMobile.scss";
import React, { useState, useEffect } from "react";
import SizeBox from "../size-box-mobile/CustomSizeBox";
import axios from "axios";
function CustomMobileSizeSelctor({ id, fav, closeSizeChart, parentCallBack }) {
  const [shoeSizes, setShowSizes] = useState([]);

  useEffect(() => {
    getSizes(id);
  }, []);

  const getSizes = async (showID) => {
    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/shoeCost/${showID}`
    );
    setShowSizes(data.data);
  };

  return (
    <>
      <div className="size-selector-mob">
        <div className="d-flex flex-row justify-content-between">
          <span style={{ fontSize: "19px", margin: "7px", fontWeight: "600" }}>
            Select A US Men's Size
          </span>
          <i
            onClick={closeSizeChart}
            className="fas fa-times fa-2x"
            style={{ margin: "10px", marginBottom: "0px", marginTop: "5px" }}
          ></i>
        </div>
        <div className="sizeboxes-container">
          {fav
            ? shoeSizes.map((size, index) => {
                return (
                  <SizeBox
                    key={index}
                    size={size.size}
                    price={size.cost}
                    closeSizeChart={closeSizeChart}
                    parentCallBack={parentCallBack}
                  />
                );
              })
            : shoeSizes.map((size, index) => {
                return (
                  <SizeBox
                    key={index}
                    size={size.size}
                    price={size.cost}
                    closeSizeChart={closeSizeChart}
                    parentCallBack={parentCallBack}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default CustomMobileSizeSelctor;
