import React from "react";
import FilterBar from "../filter-bar/FilterBar";
import SizeSelector from "../size-selector/SizeSelector";
import "./FilterMobile.scss";

const FilterMobile = () => {
  return (
    <div className="fs-mob-container">
      <FilterBar />
      <SizeSelector />
    </div>
  );
};

export default FilterMobile;
