import React, { useState } from "react";
import "./selling-section.styles.scss";

import { PendingSelling } from "../pending-selling/pending-selling.component";
import { CurrentSelling } from "../current-selling/current-selling.component";
import { HistorySelling } from "../history-selling/history-selling.component";

import SHOE_DATA from "../../temporary-data/shoe-data";


export const SellingSection = () => {
  const [selectedSection, toggleSelectedSection] = useState("Current");
  const [pendingShoeData, appendPendingData] = useState([]);
  const [currentShoeData, popShoeData]=useState(SHOE_DATA);

  const appendPendingShoeData=(shoeData)=>{
    appendPendingData([...pendingShoeData,shoeData])
    popShoeData(currentShoeData.filter(currentShoe=>{
      if(currentShoe && currentShoe.id==shoeData.id){
        
      }
      else{
        return currentShoe;
      }
    }));
  }

  return (
    <div className="selling-container">
      <div className="selling-section-header">
        <h2>
          <i class="fas fa-chart-bar"></i>
          {"  "} SALES
        </h2>
      </div>
      <div className="selling-section-content">
        <hr className="header-line"></hr>
        <div className="button-container">
          <button
            onClick={() => toggleSelectedSection("Current")}
            className={
              {
                Current: "active",
                Pending: "in-active",
                History: "in-active",
              }[selectedSection]
            }
          >
            <b>Current</b>
          </button>
          <button
            onClick={() => toggleSelectedSection("Pending")}
            className={
              {
                Current: "in-active",
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
                Current: "in-active",
                Pending: "in-active",
                History: "active",
              }[selectedSection]
            }
          >
            <b>History</b>
          </button>
        </div>
      </div>
      <div className="selling-table-container">
        {
          {
            Current: <CurrentSelling currentShoeData={currentShoeData} appendPendingShoeData={appendPendingShoeData} />,
            Pending: <PendingSelling pendingShoeData={pendingShoeData} />,
            History: <HistorySelling />,
          }[selectedSection]
        }
      </div>
    </div>
  );
};
