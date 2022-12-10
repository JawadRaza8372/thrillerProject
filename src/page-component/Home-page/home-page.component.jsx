import React, { useEffect, useState } from "react";
import "./home-page.styles.scss";
import Links from "../../components/links/Links";
import RecentMV from "../../components/recent-mobile-view/RecentMV";
import Recentcs from "../../components/recent/Recentcs";
import CustomRecentcs from "../../components/recent/CustomRecentcs";

import Slideshow from "../../components/slideshow/Slideshow";
import { Link } from "react-router-dom";
import Carousel from "../../components/review-carousel/reviewCarousel";
import HomeBanner from "../../components/home-banner/Banner";
import axios from "axios";
import CustomRecentMv from "../../components/recent-mobile-view/CustomRecentMv";

export const HomePage = ({ allBrands, allProducts }) => {
  console.log("checking Lengths", allBrands[0], allProducts.length);
  return (
    <div>
      <div className="home">
        {/* <Slideshow /> */}
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
        <Recentcs
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
        />
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
