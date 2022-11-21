import React, { useEffect } from "react";
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
        <Slideshow />
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
        <Slideshow />
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
