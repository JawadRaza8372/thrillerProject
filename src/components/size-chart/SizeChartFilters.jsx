import React, { Fragment, useState, useEffect } from "react";
import { sizes } from "../../temporary-data/sizes";
import SizeButton from "../size-button/SizeButton";
import SizeCompareChart from "../size-compare-chart/SizeCompareChart";
import axios from "axios";
import "./SizeChart.scss";
import { useParams } from "react-router-dom";

const SizeChartFilters = ({
  page,
  setSizeNo,
  chart,
  showChart,
  parentCallBack,
  setFavSize,
  setProducts,
  setFilterComponent,
  filterComponent,
}) => {
  const params = useParams();
  // //console.log(params);
  const [showSizes, setSizes] = useState(false);
  const [productSize, setProductSize] = useState([]);

  useEffect(() => {
    getSizes(params.id);
  }, [params]);
  const getSizes = async (showID) => {
    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/shoeCost/${showID}`
    );
    // //console.log(data.data);
    setProductSize(data.data);

    // //console.log(productSize);
  };

  return {
    browse: (
      <Fragment>
        <div
          className="chart-container"
          style={{
            width: "247px",
            marginLeft: "8px",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          {sizes.map((size, index) => {
            return (
              <SizeButton
                fromFilter={true}
                key={index}
                size={size.size}
                type={page}
                parentCallBack={parentCallBack}
                setFavSize={setFavSize}
                setProducts={setProducts}
                setFilterComponent={setFilterComponent}
                filterComponent={filterComponent}
              />
            );
          })}
        </div>
      </Fragment>
    ),
    product: (
      <Fragment>
        <div
          className={!showSizes ? "chart-container" : "size-chart-container"}
          style={{
            width: "255px",
            marginLeft: "8px",
            marginRight: "10px",
            marginBottom: "10px",
            position: "absolute",
            zIndex: "1",
          }}
        >
          {!showSizes ? (
            <div
              className="align-self-start pl-1"
              onClick={() => setSizes(!showSizes)}
              style={{ cursor: "pointer" }}
            >
              <span>Size Chart</span>
              <i className="fas fa-chevron-right fa-xs"></i>
            </div>
          ) : (
            <div
              className="align-self-start pl-1"
              onClick={() => setSizes(!showSizes)}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-chevron-left fa-xs"></i>
              <span>Back</span>
            </div>
          )}

          {!showSizes ? (
            <div onClick={() => showChart(!chart)}>
              {productSize.map((size, index) => {
                return (
                  <SizeButton
                    key={size.size}
                    size={size.size}
                    cost={size.cost}
                    type={page}
                    setSizeNo={setSizeNo}
                    parentCallBack={parentCallBack}
                    setFilterComponent={setFilterComponent}
                  />
                );
              })}
            </div>
          ) : (
            <SizeCompareChart />
          )}
        </div>
      </Fragment>
    ),
  }[page];
};

export default SizeChartFilters;
