import React, { useState } from "react";
import "./pending-buying.styles.scss";

import  BuyingPendingTable from "../buying-pending-table/buying-pending-table.component";

export const PendingBuying = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="pending-buying-container">
      <div className="search-container">
        <input placeholder="Search name, order no." onChange={handleChange} />
        <i className="fas fa-search"></i>
      </div>
      <BuyingPendingTable searchValue={searchValue} />
    </div>
  );
};
