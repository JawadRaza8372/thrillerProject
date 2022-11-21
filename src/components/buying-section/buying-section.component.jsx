import React, { useState } from "react";
import "./buying-section.styles.scss";

import { PendingBuying } from "../pending-buying/pending-buying.component";
import { HistoryBuying } from "../history-buying/history-buying.component";

export const BuyingSection = () => {
  const [selectedSection, toggleSelectedSection] = useState("Pending");

  return (
    <div className="buying-container">
      <div className="buying-section-header">
        <h2>
          <i className="fas fa-chart-bar"></i>
          {"   "} BUYING
        </h2>
      </div>
      <div className="buying-section-content">
        <hr className="header-line"></hr>
        <div className="button-container">
          <button
            onClick={() => toggleSelectedSection("Pending")}
            className={
              {
                Pending: "active",
                History: "in-active",
              }[selectedSection]
            }
          >
            <b>Pending</b>
          </button>
          <button
            onClick={() => toggleSelectedSection("History")}
            className={
              {
                Pending: "in-active",
                History: "active",
              }[selectedSection]
            }
          >
            <b>History</b>
          </button>
        </div>
      </div>
      <div className="buying-table-container">
        {
          {
            Pending: <PendingBuying />,
            History: <HistoryBuying />,
          }[selectedSection]
        }
      </div>
    </div>
  );
};
