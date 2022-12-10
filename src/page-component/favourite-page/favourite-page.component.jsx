import React, { useState, useEffect } from "react";
import "./favourite-page.styles.scss";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import { FavouriteTable } from "../../components/favourite-table/favourite-table.component";
import { FavouriteModal } from "../../components/favourites-modal/favourites-modal.component";
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

export const FavouritePage = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [page, setPage] = useState("Favourites");
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
  }, []);

  return (
    <div className="favourites-page-container">
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
      <div className="favourites-content-container">
        <div className="favourites-header">
          <h2>FAVOURITES</h2>
          <CustomButton
            onClick={() => setModalStatus(!modalStatus)}
            size="small"
          >
            Add Item
          </CustomButton>
          <FavouriteModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
        </div>
        <FavouriteTable />
      </div>
    </div>
  );
};
