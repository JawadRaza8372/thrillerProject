import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sdropdown from "../sort-dropdown/Sdropdown";
import "./FilterSort.scss";

const FilterSort = ({ count, setFilter, filter, setProducts }) => {
  var nav = localStorage.getItem("nav");

  return (
    <div className="p-container">
      <div className="f-container">
        <Link style={{ color: "black" }} onClick={() => setFilter(!filter)}>
          {filter ? (
            <div>
              <span>Hide Filters </span>
              <i className="fas fa-chevron-down fa-xs"></i>
            </div>
          ) : (
            <div>
              <span>Show Filters </span>
              <i className="fas fa-chevron-right fa-xs"></i>
            </div>
          )}
        </Link>
        <div className="breadcrum">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{nav}</span>
        </div>
      </div>
      {/* <div className="t-container">
        <span>Showing {count}+ Results </span>
      </div> */}
      <div className="s-container">
        <Sdropdown setProducts={setProducts} />
      </div>
    </div>
  );
};

export default FilterSort;
