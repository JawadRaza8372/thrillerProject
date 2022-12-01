import React, { useState, useEffect } from "react";
import "./Recent.css";
import { Card, Button } from "react-bootstrap";
import cardImg1 from "../../temporary-data/1.png";
import cardImg2 from "../../temporary-data/2.png";
import cardImg3 from "../../temporary-data/3.png";
import cardImg4 from "../../temporary-data/4.png";
import cardImg5 from "../../temporary-data/5.png";
import cardImg6 from "../../temporary-data/6.png";
import arrowleft from "../../temporary-data/arrow-left.png";
import arrowright from "../../temporary-data/arrow-right.png";
import axios from "axios";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makingValidName } from "../../Constants/Functions";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button onClick={() => onClick()}>
      <img
        src={arrowleft}
        alt="logo"
        style={{
          position: "absolute",
          left: "0px",
          marginTop: "-25px",
          height: "40px",
          width: "40px",
        }}
      />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button onClick={() => onClick()}>
      <img
        src={arrowright}
        alt="logo"
        style={{
          position: "absolute",
          right: "0px",
          marginTop: "-25px",
          height: "40px",
          width: "40px",
        }}
      />
    </button>
  );
};

const Recentcs = ({ name, tag }) => {
  const [slider, setSlider] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    Load();
  }, []);

  var mainURL = "https://appick.io/u/thriller/imgs/";

  function Load() {
    //////console.log("Laoding: ", name);
    var url = `https://api.thrillerme.com/shoes/getByTag/${name}`;
    var encodedURL = encodeURI(url);
    axios.get(encodedURL).then((res) => {
      setSlider(res.data);
      ////console.log(name, slider);
    });
  }
  // if (slider.length > 0) {
  //   console.log("recentcs wala first index name slider hy arry ka", slider[0]);
  // }
  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="txt">{tag}</div>
      <div>
        <Carousel
          renderButtonGroupOutside={true}
          responsive={responsive}
          infinite={true}
          itemClass="card"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {slider.map((elem, index) => {
            const newname = makingValidName(`${elem.name}`);
            const newskunumb = makingValidName(`${elem.sku_number}`);
            const newshoeid = makingValidName(`${elem.shoe_id}`);
            return (
              <Link to={`/${newname}_id_${newshoeid}`} key={index}>
                <Card>
                  <Card.Img
                    class="m-0 p-0"
                    variant="top"
                    src={elem.cover_image}
                  />
                  <Card.Body className="cBody" class="m-0">
                    <Card.Title className="cTxt">{elem.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Recentcs;
