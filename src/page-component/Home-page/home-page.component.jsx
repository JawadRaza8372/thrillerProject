import React, { useEffect, useState } from "react";
import "./home-page.styles.scss";
import Links from "../../components/links/Links";
import RecentMV from "../../components/recent-mobile-view/RecentMV";
import Recentcs from "../../components/recent/Recentcs";
import Slideshow from "../../components/slideshow/Slideshow";
import { Link } from "react-router-dom";
import Carousel from "../../components/review-carousel/reviewCarousel";
import HomeBanner from "../../components/home-banner/Banner";
import axios from "axios";

export const HomePage = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    var url = `https://api.thrillerme.com/collections`;
    axios
      .get(url)
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // brands data
  // collection_id: 20;
  // description: "It could be said that Michael Jordan was the genesis of basketball as we know it today. Throughout a fiery and storied career, MJ overcame his hurdles, soaring challenge above challenge to realize the unexpected. Along the way, he redefined basketball's relationship to style, the sports connection to youth counter-culture and the games creative potential.";
  // imageURL: "https://dk0pm9zdlq16s.cloudfront.net/4de136a4-a575-4f52-b82b-625e0692d9fd.png";
  // title: "Air Jordan ";
  console.log("CHECKING BRANDS", brands);
  // useEffect(() => {
  //   localStorage.removeItem("selectedSection");

  //   try {
  //     var user = JSON.parse(localStorage.getItem("user"));

  //     var urlUser = `https://api.thrillerme.com/registrations/${user.user_id}`;
  //     var encodedURLU = encodeURI(urlUser);
  //     axios.get(encodedURLU).then((res) => {
  //       if (res.data !== null) {
  //         localStorage.setItem("user", JSON.stringify(res.data));
  //         var _user = JSON.parse(localStorage.getItem("user"));
  //         console.log(_user);
  //       }
  //       //console.log("User Default size: ", defaultSize);
  //     });
  //   } catch (error) {}
  // }, []);
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
        <Recentcs class="x" name={"Just Dropped"} tag={"Just Dropped"} />
        <Recentcs name={"Most Popular"} tag={"Most Popular"} />
        <Recentcs name={"Favorites"} tag={"Favourites"} />
        <Recentcs name={"Air Jordon"} tag={"Air Jordan"} />
        <Recentcs name={"Adidas Yeezy"} tag={"Adidas Yeezy"} />
        <Recentcs name={"Dunks"} tag={"Dunks"} />
        <Recentcs name={"Jordon 1"} tag={"Jordan 1"} />
        <Recentcs name={"Travis Scot"} tag={"Travis Scott"} />
        <Recentcs name={"Off White"} tag={"Off-White"} />
        <Links />
      </div>

      <div className="home-mob">
        {/* <Slideshow /> */}
        <div className="customHomeBanner">
          <div className="imageCont"></div>

          <div className="textCont">
            <h1>Air Jordan 11 Cherry</h1>
            <div className="customBtnCont">
              <button>Buy & Sell Now</button>
            </div>
          </div>
        </div>
        {/* <HomeBanner /> */}

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
      </div>
    </div>
  );
};
