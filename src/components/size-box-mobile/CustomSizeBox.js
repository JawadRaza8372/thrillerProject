import React from "react";
import "./SizeBox.scss";

function CustomSizeBox({ size, price, closeSizeChart, parentCallBack }) {
  const onSelectFuntion = async () => {
    await parentCallBack(size);
    closeSizeChart();
  };
  return (
    <>
      <div className="size-box-container" onClick={onSelectFuntion}>
        <span>{size}</span>
        {price > 0 ? (
          <span style={{ fontSize: "10px", color: "red" }}>
            AED {Math.floor(price)}
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CustomSizeBox;
