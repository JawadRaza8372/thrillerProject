import React, { useState, useEffect } from "react";
import "./Slideshow.css";
import shoe from "../../temporary-data/shoeee.jpg";
import banner from "./banner-shoe.jpeg";
import axios from "axios";
import { Link } from "react-router-dom";

const Slideshow = () => {
  var bann = {};
  const [banner, setBanner] = useState(bann);
  const [defaultBanner, setDefaultBanner] = useState(
    "https://appick.io/u/lessons/62c078ad-06e9-45f6-8577-811a1e259bde.jpg"
  );

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    Load();
  }, []);

  function Load() {
    axios.get(`https://api.thrillerme.com/banners`).then((res) => {
      //setDefaultBanner(banners.imageURL);
      setBanner(res.data[0]);
      //console.log(banner);
    });
  }

  return (
    <div
      className="main-container"
      style={{
        backgroundImage: `url(${banner.imageURL})`,
        backgroundPosition: "right",
      }}
      // style={{ backgroundImage: { banner } }}
    >
      <div class="h1 shoetxt"> {banner.title}</div>
      <Link to={`/browse/0`}>
        <button type="button" class="btn btn-light btn-lg shopbtn">
          {banner.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default Slideshow;
