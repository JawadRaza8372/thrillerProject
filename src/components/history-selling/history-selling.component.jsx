import React, { useState } from "react";
import "./history-selling.styles.scss";

import { SellingHistoryTable } from "../selling-history-table/selling-history-table.component";

export const HistorySelling = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="history-selling-container">
      <div className="search-container">
        <input placeholder="Search name, order no." onChange={handleChange} />
        <i className="fas fa-search"></i>
      </div>
      <SellingHistoryTable searchValue={searchValue} />
    </div>
  );
};
