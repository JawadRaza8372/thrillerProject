import React, { useState } from "react";
import "./current-selling.styles.scss";

import { SellingCurrentTable } from "../selling-current-table/selling-current-table.component";

export const CurrentSelling = ({ appendPendingShoeData, currentShoeData }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="current-selling-container">
      <div className="search-container">
        <input placeholder="Search name, order no." onChange={handleChange} />
        <i className="fas fa-search"></i>
      </div>
      <SellingCurrentTable
        currentShoeData={currentShoeData}
        appendPendingShoeData={appendPendingShoeData}
        searchValue={searchValue}
      />
    </div>
  );
};
