import React, { useEffect, useState } from "react";
import "./home-page.styles.scss";
import Links from "../../components/links/Links";
import CustomRecentcs from "../../components/recent/CustomRecentcs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NewCustomRecentcs from "../../components/recent/NewCustomRecentcs";
import localStorage from "redux-persist/es/storage";

export const HomePage = ({ allBrands, allProducts }) => {
  const newhistory = useHistory();
  const topGreyNavugation = [
    { to: "/", title: "Sneakers" },
    { to: "/", title: "Shoes" },
    { to: "/", title: "Apparel" },
    { to: "/", title: "Electronics" },
    { to: "/", title: "Trading Cards" },
    { to: "/", title: "Collectibles" },
    { to: "/", title: "Accessories" },
  ];
  const setLocalStorage = (name) => {
    localStorage.setItem("selectedSection", JSON.stringify(name));
    newhistory.push("/browse/0");
  };
  return (
    <div>
      <div className="home">
        <div className="greyNavigation">
          <div className="linkContainber">
            {topGreyNavugation.map((dat, index) => (
              <div
                className="custBtnsNav"
                key={index}
                onClick={() => setLocalStorage(`${dat.title}`)}
              >
                {dat.title}
              </div>
            ))}
          </div>
        </div>
        <div className="customHomeBanner">
          <div className="textCont">
            <h1>Air Jordan 11 Cherry</h1>
            <div className="customBtnCont">
              <button>Buy & Sell Now</button>
            </div>
          </div>
          <div className="imageCont"></div>
        </div>
        {/* <HomeBanner /> */}
        <CustomRecentcs tag="Popular Brands" brands={allBrands} />
        <NewCustomRecentcs
          name={"Just Dropped"}
          tag={"Just Dropped"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Most Popular"}
          tag={"Most Popular"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Favorites"}
          tag={"Favourites"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Air Jordon"}
          tag={"Air Jordan"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Adidas Yeezy"}
          tag={"Adidas Yeezy"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Jordon 1"}
          tag={"Jordan 1"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Travis Scot"}
          tag={"Travis Scott"}
          productData={allProducts}
        />
        <NewCustomRecentcs
          name={"Off White"}
          tag={"Off-White"}
          productData={allProducts}
        />
        {/* <Recentcs
          class="x"
          name={"Just Dropped"}
          tag={"Just Dropped"}
          productData={allProducts}
        />
        <Recentcs
          name={"Most Popular"}
          tag={"Most Popular"}
          productData={allProducts}
        />
        <Recentcs
          name={"Favorites"}
          tag={"Favourites"}
          productData={allProducts}
        />
        <Recentcs
          name={"Air Jordon"}
          tag={"Air Jordan"}
          productData={allProducts}
        />
        <Recentcs
          name={"Adidas Yeezy"}
          tag={"Adidas Yeezy"}
          productData={allProducts}
        />
        <Recentcs name={"Dunks"} tag={"Dunks"} productData={allProducts} />
        <Recentcs
          name={"Jordon 1"}
          tag={"Jordan 1"}
          productData={allProducts}
        />
        <Recentcs
          name={"Travis Scot"}
          tag={"Travis Scott"}
          productData={allProducts}
        />
        <Recentcs
          name={"Off White"}
          tag={"Off-White"}
          productData={allProducts}
        /> */}
        <Links />
      </div>
      {/* <Slideshow /> */}
      {/* <HomeBanner /> */}

      {/* <div className="home-mob">
        <div className="customHomeBanner">
          <div className="imageCont"></div>

          <div className="textCont">
            <h1>Air Jordan 11 Cherry</h1>
            <div className="customBtnCont">
              <button>Buy & Sell Now</button>
            </div>
          </div>
        </div>
        <CustomRecentMv tag={"Popular Brand"} brands={brands} />
        <RecentMV class="x" name={"Just Dropped"} tag={"Just Dropped"} />
        <RecentMV name={"Most Popular"} tag={"Most Popular"} />
        <RecentMV name={"Favorites"} tag={"Favourites"} />
        <RecentMV name={"Air Jordon"} tag={"Air Jordan"} />
        <RecentMV name={"Adidas Yeezy"} tag={"Adidas Yeezy"} />
        <RecentMV name={"Dunks"} tag={"Dunks"} />
        <RecentMV name={"Jordon 1"} tag={"Jordan 1"} />
        <RecentMV name={"Travis Scot"} tag={"Travis Scott"} />
        <RecentMV name={"Off White"} tag={"Off-White"} />
        <Links />
      </div> */}
    </div>
  );
};
