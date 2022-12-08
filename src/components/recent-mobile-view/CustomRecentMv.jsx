import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecentMV.scss";
import { Card, Button } from "react-bootstrap";
import cardImg1 from "../../temporary-data/1.png";
import cardImg2 from "../../temporary-data/2.png";
import cardImg3 from "../../temporary-data/3.png";
import cardImg4 from "../../temporary-data/4.png";
import cardImg5 from "../../temporary-data/5.png";
import cardImg6 from "../../temporary-data/6.png";
// import { Link } from 'react-router-dom'

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Link, useHistory } from "react-router-dom";
import { makingValidName } from "../../Constants/Functions";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);

function CustomRecentMv({ tag, brands }) {
  const history = useHistory();
  return (
    <div className="recent-mv-con" style={{ marginBottom: "20px" }}>
      <div className="d-flex flex-row justify-content-space-between">
        <div className="txt">{tag}</div>
        <div>
          <i
            onClick={() => console.log("name")}
            className="fas fa-arrow-right mr-4"
          ></i>
        </div>
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        mousewheel={true}
      >
        {brands.map((elem, index) => {
          return (
            <SwiperSlide key={index}>
              <Link to={`/browse/${elem.collection_id}/`}>
                <Card style={{ marginBottom: "35px" }}>
                  <Card.Img
                    class="m-0 p-0"
                    variant="top"
                    src={`${elem.imageURL ? elem.imageURL : cardImg6}`}
                    style={{ height: "200px" }}
                  />
                  <Card.Body className="cBody" class="m-0">
                    <Card.Title className="cTxt">{elem.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CustomRecentMv;
