import React, { useState, useEffect } from "react";
import "./Slideshow.css";
import shoe from "../../temporary-data/shoeee.jpg";
import banner from "./banner-shoe.jpeg";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../assets/1st.png";
import img2 from "../../assets/2nd.png";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
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
  const slideshowdata = [{ source: img1 }, { source: img2 }];
  return (
    <Carousel
      interval={7000}
      variant="dark"
      fade={true}
      // renderButtonGroupOutside={true}
      // responsive={responsive}
      // infinite={true}
      // customRightArrow={<CustomLeftArrow />}
      // customLeftArrow={<CustomRightArrow />}
    >
      {slideshowdata.map((dat, index) => (
        <Carousel.Item>
          <img
            className="img-fluid"
            src={dat.source}
            alt={`image number ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slideshow;
