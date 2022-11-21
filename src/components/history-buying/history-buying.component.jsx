import React, { useState } from "react";
import "./history-buying.styles.scss";

import { BuyingHistoryTable } from "../buying-history-table/buying-history-table.component";

export const HistoryBuying = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="history-buying-container">
      <div className="search-container">
        <input placeholder="Search name, order no." onChange={handleChange} />
        <i className="fas fa-search"></i>
      </div>
      <BuyingHistoryTable searchValue={searchValue} />
    </div>
  );
};
