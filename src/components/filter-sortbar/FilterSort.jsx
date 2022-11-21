import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sdropdown from "../sort-dropdown/Sdropdown";
import "./FilterSort.scss";

const FilterSort = ({ count, setFilter, filter, setProducts }) => {
  var nav = localStorage.getItem("nav");

  return (
    <div class="p-container">
      <div class="f-container">
        <Link style={{ color: "black" }} onClick={() => setFilter(!filter)}>
          {filter ? (
            <div>
              <span>Hide Filters </span>
              <i class="fas fa-chevron-down fa-xs"></i>
            </div>
          ) : (
              <div>
                <span>Show Filters </span>
                <i class="fas fa-chevron-right fa-xs"></i>
              </div>
            )}
        </Link>
        <div className="breadcrum">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{nav}</span>
        </div>
      </div>
      {/* <div class="t-container">
        <span>Showing {count}+ Results </span>
      </div> */}
      <div class="s-container">
        <Sdropdown setProducts={setProducts} />
      </div>
    </div>
  );
};

export default FilterSort;
