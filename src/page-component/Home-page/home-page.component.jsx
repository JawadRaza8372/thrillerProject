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
import banner1 from '../../assets/Home/banners/banner3.png';
import banner2NewYear from '../../assets/Home/banners/banner4NewYear.png';

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

      <div className="col-lg-9 col-md-10 col-sm-11 mx-auto">
        <div className="home">
        <div className="mt-4 p-0 m-0 mainSliderHome">
          <SlideShow />
        </div>


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
            tag={"Just Dropped"}
            toolTip={"The latest drops from retailers across the globe"}
            productData={allProducts}
          />
          <CustomRecentcs tag="Popular Brands" brands={allBrands} from={0} to={5} />

          <NewCustomRecentcs
            toolTip={"'Trending Sneakers' products are a curated collection of our best selling items"}
            name={"Most Popular"}
            tag={"Trending Sneakers"}
            productData={allProducts}
          />

          <div>
            <Link to={'/browse/65/'}>
              <img src={banner1} style={{width: '100%', marginTop: 40}} />
            </Link>
          </div>

          <CustomRecentcs tag="Seasonal Favourite" brands={allBrands} from={5} to={10} />

          {/* <NewCustomRecentcs
            toolTip={"'Seasonal Favourite' products are a curated collection of our best selling items"}
            name={"Most Popular"}
            tag={"Seasonal Favourite"}
            productData={allProducts}
          /> */}
          <NewCustomRecentcs
            name={"Yeezy"}
            tag={"Adidas Yeezy"}
            toolTip={null}
            productData={allProducts}
          />
          <NewCustomRecentcs
            toolTip={null}
            name={"Dunks"}
            tag={"Nike Dunk"}
            productData={allProducts}
          />

          <div>
              <img src={banner2NewYear} style={{width: '100%', marginTop: 40}} />
          </div>

          {/* <NewCustomRecentcs
            toolTip={"'Designer Collection' products are a curated collection of our best selling items"}
            name={"Favorites"}
            tag={"Designer Collection"}
            productData={allProducts}
          /> */}

          <CustomRecentcs tag="Designer Collection" brands={allBrands} from={10} to={15} />


          <NewCustomRecentcs
            toolTip={null}
            name={"Travis Scot"}
            tag={"Travis Scott"}
            productData={allProducts}
          />
          <NewCustomRecentcs
            name={"Jordon 1"}
            toolTip={"'Brought Back From Collection' products are a curated collection of our best selling items"}
            tag={"Brought Back From Time"}
            productData={allProducts}
          />
          <MultiBrandsRecentcs
            allProducts={allProducts}
            allBrands={allBrands}
            tagsArry={[
              "Jordan",
              "Dunks",
              "Travis Scot",
              "Yeezy",
              "Off White",
            ]}
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
