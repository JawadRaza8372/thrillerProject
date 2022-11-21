import React from "react";
import "./SizeChartBar.scss";

const SizeChartBar = ({ list, white, bold }) => {
  const { us, uk, eu, cm, w } = list;
  return (
    <div className={white ? "whiteBar" : "grayBar"}>
      <div
        className={bold ? "boldSize" : null}
        style={{ height: "24px", width: "30px" }}
      >
        {us}
      </div>
      <div
        className={bold ? "boldSize" : null}
        style={{ height: "24px", width: "30px" }}
      >
        {uk}
      </div>
      <div
        className={bold ? "boldSize" : null}
        style={{ height: "24px", width: "30px" }}
      >
        {eu}
      </div>
      <div
        className={bold ? "boldSize" : null}
        style={{ height: "24px", width: "30px" }}
      >
        {cm}
      </div>
      <div
        className={bold ? "boldSize" : null}
        style={{ height: "24px", width: "30px" }}
      >
        {w}
      </div>
    </div>
  );
};

export default SizeChartBar;
