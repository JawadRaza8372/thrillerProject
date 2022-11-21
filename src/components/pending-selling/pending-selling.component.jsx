import React, { useState } from "react";
import "./pending-selling.styles.scss";

import { SellingPendingTable } from "../selling-pending-table/selling-pending-table.component";

export const PendingSelling = ({pendingShoeData}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="pending-selling-container">
      <div className="search-container">
        <input placeholder="Search name, order no." onChange={handleChange} />
        <i className="fas fa-search"></i>
      </div>
      <SellingPendingTable pendingShoeData={pendingShoeData} searchValue={searchValue} />
    </div>
  );
};
