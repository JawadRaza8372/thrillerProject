import React, { useState } from "react";
import "./SizeSelector.scss";
import { Link } from "react-router-dom";
import SizeChartFilters from "../size-chart/SizeChartFilters";
import FilterBar from "../filter-bar/FilterBar";

const SizeSelector = ({ setProducts, setFilterComponent, filterComponent }) => {
  //console.log("########### B ############", setFilterComponent);

  const [chart, setChart] = useState(false);

  return (
    <div class="d-flex flex-column justify-content-start">
      <div>
        <div class="f-container">
          <Link
            onClick={() => setChart(!chart)}
            style={{ color: "black", fontSize: "17px", opacity: "0.8" }}
          >
            <span>US Sizes </span>
            {chart ? (
              <i class="fas fa-chevron-down fa-xs"></i>
            ) : (
              <i class="fas fa-chevron-right fa-xs"></i>
            )}
          </Link>
        </div>
      </div>
      {chart ? (
        <SizeChartFilters
          setProducts={setProducts}
          setFilterComponent={setFilterComponent}
          filterComponent={filterComponent}
          page="browse"
        />
      ) : null}
    </div>
  );
};

export default SizeSelector;
