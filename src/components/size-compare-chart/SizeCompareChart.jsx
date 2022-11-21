import React from "react";
import "./SizeCompareChart.scss";
import size_chart from "../../temporary-data/size_chart";
import SizeChartBar from "../sizechartBars/SizeChartBar";

const SizeCompareChart = () => {
  return (
    <div className="show-compare-chart">
      {size_chart.map((size, index) => {
        if (index === 0) {
          return (
            <SizeChartBar key={index} list={size} white={true} bold={true} />
          );
        } else if (index % 2 === 0) {
          return (
            <SizeChartBar key={index} list={size} white={true} bold={false} />
          );
        } else {
          return (
            <SizeChartBar key={index} list={size} white={false} bold={false} />
          );
        }
      })}
    </div>
  );
};

export default SizeCompareChart;
