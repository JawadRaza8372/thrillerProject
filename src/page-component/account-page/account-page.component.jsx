import React, { useState } from "react";
import "./account.styles.scss";

import { SecuritySection } from "../../components/security-section/security-section.component";
import { SettingSection } from "../../components/setting-section/setting-section.component";
import { BuyingSection } from "../../components/buying-section/buying-section.component";
import { SellingSection } from "../../components/selling-section/selling-section.component";
import { FavouriteSection } from "../../components/favourites-section/favourites-section.component";
import  AccountSidebar from "../../components/account-sidebar/account-sidebar.component";

const sideBarLinks = [
  {
    name: "Security",
    description: "Two-Step Verification",
    image: "/images/accountLock.svg",
  },
  {
    name: "Settings",
    description: "Payments, Payouts, Addresses",
    image: "/images/settingsCog.svg",
  },
  {
    name: "Buying",
    description: "Active Bids, In-Progress, Completed Orders",
    image: "/images/BuyingSetting.svg",
  },
  {
    name: "Selling",
    description: "Active Asks, In-Progress, Completed Sales",
    image: "/images/SellingSetting.svg",
  },
  {
    name: "Favourites",
    description: "Products you like",
    image: "/images/FavouriteIcon.svg",
  },
];
export const AccountPage = () => {
  const [page, setPage] = useState("Security");
  const [sideBarStatus, setSideBarStatus] = useState(false);
  return (
    <div className="account-page-container">
      <AccountSidebar
        setPage={(name) => setPage(name)}
        sideBarLinks={sideBarLinks}
        selectedPage={page}
        sideBarStatus={sideBarStatus}
      />
      <div className="account-page-content">
        {/* <button
          onClick={() => setSideBarStatus(!sideBarStatus)}
          className="side-bar-open"
        >
          O
        </button> */}

        {
          {
            Security: <SecuritySection />,
            Settings: <SettingSection />,
            Buying: <BuyingSection />,
            Selling: <SellingSection />,
            Favourites: <FavouriteSection />,
          }[page]
        }
      </div>
    </div>
  );
};
