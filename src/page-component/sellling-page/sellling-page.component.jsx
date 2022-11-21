import React, { useState, useEffect } from "react";
import "./sellling-page.styles.scss";

import { PendingSelling } from "../../components/pending-selling/pending-selling.component";
import { CurrentSelling } from "../../components/current-selling/current-selling.component";
import { HistorySelling } from "../../components/history-selling/history-selling.component";
import { AccountSidebar2 } from "../../components/account-sidebar-2/account-sidebar-2.component";
import { CustomButton } from "../../components/custom-button/custome-button.component";

import SHOE_DATA from "../../temporary-data/shoe-data";

const sideBarLinks = [
  {
    page: "account",
    name: "Security",
    description: "Two-Step Verification",
    image: "/images/accountLock.svg",
  },
  {
    page: "settings-section",
    name: "Settings",
    description: "Payments, Payouts, Addresses",
    image: "/images/settingsCog.svg",
  },
  {
    page: "buying-section",
    name: "Buying",
    description: "Active Bids, In-Progress, Completed Orders",
    image: "/images/BuyingSetting.svg",
  },
  {
    page: "selling-section",
    name: "Selling",
    description: "Active Asks, In-Progress, Completed Sales",
    image: "/images/SellingSetting.svg",
  },
  {
    page: "favourites-section",
    name: "Favourites",
    description: "Products you like",
    image: "/images/FavouriteIcon.svg",
  },
];

export const SellingPage = () => {
  const [selectedSection, toggleSelectedSection] = useState("Current");
  const [pendingShoeData, appendPendingData] = useState([]);
  const [currentShoeData, popShoeData] = useState(SHOE_DATA);

  const [page, setPage] = useState("Selling");
  const [sideBarStatus, setSideBarStatus] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const appendPendingShoeData = (shoeData) => {
    appendPendingData([...pendingShoeData, shoeData]);
    popShoeData(
      currentShoeData.filter((currentShoe) => {
        if (currentShoe && currentShoe.id == shoeData.id) {
        } else {
          return currentShoe;
        }
      })
    );
  };

  return (
    <div className="selling-page-container">
      <AccountSidebar2
        setPage={(name) => setPage(name)}
        sideBarLinks={sideBarLinks}
        selectedPage={page}
        sideBarStatus={sideBarStatus}
      />
      <div className="menu-button">
        <CustomButton
          onClick={() => setSideBarStatus(!sideBarStatus)}
          size="small"
          style={{ marginTop: "25vh" }}
        >
          {sideBarStatus ? "Open Menu" : "Close Menu"}
        </CustomButton>
      </div>
      <div className="selling-content-container">
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
              Current: (
                <CurrentSelling
                  currentShoeData={currentShoeData}
                  appendPendingShoeData={appendPendingShoeData}
                />
              ),
              Pending: <PendingSelling pendingShoeData={pendingShoeData} />,
              History: <HistorySelling />,
            }[selectedSection]
          }
        </div>
      </div>
    </div>
  );
};
