import React, { useState, useEffect } from "react";
import Bolt from "../../assets/bolt.png";
import { Fireplace } from "@material-ui/icons";
const ThreeBannerResponsive = () => {
  const [showChartNum, setshowChartNum] = useState(0);
  useEffect(() => {
    setshowChartNum(Math.floor(Math.random() * 3) + 1);
  }, []);
  console.log(showChartNum);
  return (
    <>
      <div className="row d-flex w-100 flex-row mx-0 my-3 customerBuyClass">
        <div className="col-2 h-100 d-flex align-items-center justify-content-center">
          {showChartNum === 1 && (
            <i
              className="fas fa-bolt mx-auto"
              style={{ fontSize: "30px", color: "#ffc107" }}
            ></i>
          )}
          {showChartNum === 2 && (
            <i
              className="fas fa-chart-bar mx-auto"
              style={{ fontSize: "30px", color: "#28a745" }}
            ></i>
          )}
          {showChartNum === 3 && (
            <i
              className="fas fa-fire mx-auto"
              style={{ fontSize: "30px", color: "red" }}
            ></i>
          )}
        </div>
        <div className="col-10 d-flex justify-content-center align-items-start flex-column">
          <p className="m-0" style={{ fontSize: "1rem" }}>
            <b>
              {showChartNum === 1 && "Hurry! Only -- left in this size"}
              {showChartNum === 2 && "Price rising"}
              {showChartNum === 3 && "Hot right now"}
            </b>
          </p>
          <span style={{ fontSize: "0.8rem" }}>
            {showChartNum === 1 && "Get it before its gone"}
            {showChartNum === 2 && "The price increased by 33% this month"}
            {showChartNum === 3 && "There is high demand for this item"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ThreeBannerResponsive;
