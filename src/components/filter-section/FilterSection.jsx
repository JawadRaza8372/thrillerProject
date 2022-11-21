import React from "react";
import FilterBar from "../filter-bar/FilterBar";
import SizeSelector from "../size-selector/SizeSelector";
import "./FilterSection.scss";

const FilterSection = ({
  setProducts,
  setFilterComponent,
  filterComponent,
}) => {
  return (
    <div className="fs-container">
      {/* men women reset */}
      <FilterBar setProducts={setProducts} />

      {/* sizes section */}
      <SizeSelector
        setProducts={setProducts}
        setFilterComponent={setFilterComponent}
        filterComponent={filterComponent}
      />
    </div>
  );
};

export default FilterSection;
