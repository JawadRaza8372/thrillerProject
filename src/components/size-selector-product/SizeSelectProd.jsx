import React, { useState } from "react";
import SizeChart from "../size-chart/SizeChart";
import "./SizeSelectProd.scss";

const SizeSelectProd = ({ size, minimal, parentCallBack, setFavSize }) => {
  const [chart, showChart] = useState(false);
  const [sizeNo, setSizeNo] = useState(size);
  return (
    <div>
      <div
        className={
          minimal ? "size-select-container small-size" : "size-select-container"
        }
      >
        {minimal ? null : <div className="size-part customFont">Size</div>}
        <div
          className={
            minimal == true
              ? "d-flex flex-row justify-content-center"
              : "d-flex flex-row justify-content-start align-self-end"
          }
          style={{ cursor: "pointer" }}
        >
          <div className={minimal ? "small-text customFont" : null}>
            {sizeNo}
          </div>
          <div onClick={() => showChart(!chart)}>
            <i className="fas fa-chevron-down fa-xs pl-1"></i>
          </div>
        </div>
      </div>
      {chart ? (
        minimal == true ? (
          <div className="size-chart-box">
            <SizeChart
              page="product"
              setSizeNo={setSizeNo}
              chart={chart}
              showChart={showChart}
              parentCallBack={parentCallBack}
              setFavSize={setFavSize}
            />
          </div>
        ) : (
          <SizeChart
            page="product"
            setSizeNo={setSizeNo}
            chart={chart}
            showChart={showChart}
            parentCallBack={parentCallBack}
          />
        )
      ) : null}
    </div>
  );
};

export default SizeSelectProd;
