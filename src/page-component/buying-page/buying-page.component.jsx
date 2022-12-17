import React, { useState, useEffect } from "react";
import "./buying-page.styles.scss";

import { PendingBuying } from "../../components/pending-buying/pending-buying.component";
import { HistoryBuying } from "../../components/history-buying/history-buying.component";
import { CustomButton } from "../../components/custom-button/custome-button.component";

import { AccountSidebar2 } from "../../components/account-sidebar-2/account-sidebar-2.component";
import { useHistory } from "react-router-dom";

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

export const BuyingPage = () => {
  const [selectedSection, toggleSelectedSection] = useState("Pending");
  const [page, setPage] = useState("Buying");
  const [sideBarStatus, setSideBarStatus] = useState(true);
  const newhistory = useHistory();
  const fetchUser = async () => {
    const rawUserId = await window.localStorage.getItem("user");
    //
    if (rawUserId) {
      console.log("user found");
    } else {
      newhistory.push("/login");
    }
  };
  useEffect(() => {
    fetchUser();
    window.scrollTo(0, 0);

    var his = window.localStorage.getItem("history");
    if (his !== null && his !== undefined && his !== "0") {
      window.localStorage.setItem("history", "0");
      toggleSelectedSection("History");
    }
  }, []);
  return (
    <div className="buying-page-container">
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
      <div className="buying-content-container">
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
    </div>
  );
};
