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

function CustomRecentcs({ tag, brands }) {
  const [slider, setSlider] = useState(brands);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="txt">{tag}</div>
      <div>
        <Carousel
          renderButtonGroupOutside={true}
          responsive={responsive}
          // infinite={true}
          centerMode={false}
          slidesToSlide={1}
          itemClass="cardItemDiv"
          // customLeftArrow={<CustomLeftArrow />}
          // customRightArrow={<CustomRightArrow />}
        >
          {slider.map((elem, index) => {
            const newname = makingValidName(`${elem.name}`);
            const newskunumb = makingValidName(`${elem.sku_number}`);
            const newshoeid = makingValidName(`${elem.shoe_id}`);
            return (
              <>
                <Link to={`/${newname}_id_${newshoeid}`} key={index}>
                  {/* <Card>
                  <Card.Img
                    class="m-0 p-0"
                    variant="top"
                    src={elem.cover_image}
                  />
                  <Card.Body className="cBody" class="m-0">
                    <Card.Title className="cTxt">{elem.name}</Card.Title>
                  </Card.Body>
                </Card> */}
                  <div className="cardDiv">
                    <img className="cardImg" src={elem.cover_image} />
                    <div className="textCont">
                      <h5>{elem.name}</h5>
                      <span>Lowest Price</span>
                      <h5>null AED</h5>
                      <div className="lastSoldDiv">Last Sold: null</div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default CustomRecentcs;
