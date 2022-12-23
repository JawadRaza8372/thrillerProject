import React, { useEffect, useState } from "react";
import "./home-page.styles.scss";
import Links from "../../components/links/Links";
import CustomRecentcs from "../../components/recent/CustomRecentcs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NewCustomRecentcs from "../../components/recent/NewCustomRecentcs";
import localStorage from "redux-persist/es/storage";
import SlideShow from "../../components/slideshow/Slideshow";
import MultiBrandsRecentcs from "../../components/recent/MultiBrandsRecentcs";
import HomeBanner from "../../components/home-banner/Banner";
import banner1 from '../../assets/Home/banners/BelowRetailAAFocus_Primary_Desktop.webp'
import banner2 from '../../assets/Home/banners/OuterwearGiftGuide_Primary_Desktop.webp'
import banner3 from '../../assets/Home/banners/Popular_Gaming_Controllers_BannersPrimary_Desktop.webp'

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
    window.localStorage.setItem("selectedSection", JSON.stringify(name));
    newhistory.push("/browse/0");
  };
  return (
    <>
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
      <div className="mt-4 p-0 m-0">
          <SlideShow />
      </div>

      <div className="col-lg-9 col-md-10 col-sm-11 mx-auto">
        <div className="home">

          {/* <div className="customHomeBanner">
          <div className="textCont">
            <h1>Air Jordan 11 Cherry</h1>
            <div className="customBtnCont">
              <button>Buy & Sell Now</button>
            </div>
          </div>
          <div className="imageCont"></div> </div> */}

          {/* <HomeBanner /> */}
        
          <NewCustomRecentcs
            name={"Just Dropped"}
            tag={"Recommended For You"}
            toolTip={"These products are inspired by your previous browsing history."}
            productData={allProducts}
          />
          <CustomRecentcs tag="Popular Brands" brands={allBrands} />
          <MultiBrandsRecentcs
            allProducts={allProducts}
            allBrands={allBrands}
            tagsArry={[
              "Air Jordan",
              "Dunks",
              "Travis Scott",
              "Yeezy",
              "Off White",
            ]}
          />

          <div>
            <img src={banner1} style={{width: '100%', marginTop: 40}} />
          </div>

          <NewCustomRecentcs
            toolTip={"'Seasonal Favourite' products are a curated collection of our best selling items"}
            name={"Most Popular"}
            tag={"Seasonal Favourite"}
            productData={allProducts}
          />
          <NewCustomRecentcs
            name={"Yeezy"}
            tag={"Adidas Yeezy"}
            toolTip={"'Adidas Yeezy' products are a curated collection of our best selling items"}
            productData={allProducts}
          />
          <NewCustomRecentcs
            toolTip={"'Nike Dunk' products are a curated collection of our best selling items"}
            name={"Dunks"}
            tag={"Nike Dunk"}
            productData={allProducts}
          />

          <div>
            <img src={banner2} style={{width: '100%', marginTop: 40}} />
          </div>

          <NewCustomRecentcs
            toolTip={"'Designer Collection' products are a curated collection of our best selling items"}
            name={"Favorites"}
            tag={"Designer Collection"}
            productData={allProducts}
          />
          <NewCustomRecentcs
            toolTip={"'Travis Scott' products are a curated collection of our best selling items"}
            name={"Travis Scot"}
            tag={"Travis Scott"}
            productData={allProducts}
          />
          <NewCustomRecentcs
            name={"Jordon 1"}
            toolTip={"'Brought Back From Collection' products are a curated collection of our best selling items"}
            tag={"Brought Back From Collection"}
            productData={allProducts}
          />
          <br />
          <br />
          {/* <Recentcs
          class="x"
          name={"Just Dropped"}
          tag={"Just Dropped"}
          productData={allProducts}
        /> */}
        {/* <Recentcs
          name={"Most Popular"}
          tag={"Most Popular"}
          productData={allProducts}
        /> */}
        {/* <Recentcs
          name={"Favorites"}
          tag={"Favourites"}
          productData={allProducts}
        /> */}
        {/* <Recentcs
          name={"Air Jordon"}
          tag={"Air Jordan"}
          productData={allProducts}
        /> */}
        {/* <Recentcs
          name={"Adidas Yeezy"}
          tag={"Adidas Yeezy"}
          productData={allProducts}
        /> */}
        {/* <Recentcs name={"Dunks"} tag={"Dunks"} productData={allProducts} />
        <Recentcs
          name={"Jordon 1"}
          tag={"Jordan 1"}
          productData={allProducts}
        /> */}
        {/* <Recentcs
          name={"Travis Scot"}
          tag={"Travis Scott"}
          productData={allProducts}
        /> */}
        {/* <Recentcs
          name={"Off White"}
          tag={"Off-White"}
          productData={allProducts}
        /> */}
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
      <Links />
    </>
  );
};
