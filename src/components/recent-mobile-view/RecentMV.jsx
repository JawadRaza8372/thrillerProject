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

const RecentMV = ({ name, tag }) => {
  const [slider, setSlider] = useState([]);
  const history = useHistory();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    Load();
  }, []);

  var mainURL = "https://appick.io/u/thriller/";

  function Load() {
    //////console.log("Laoding: ", name);
    var url = `https://api.thrillerme.com/shoes/getByTag/${name}`;
    var encodedURL = encodeURI(url);
    axios.get(encodedURL).then((res) => {
      setSlider(res.data);
      ////console.log("name", res.data);
    });
  }

  const setLocalStorage = (name) => {
    localStorage.setItem("selectedSection", JSON.stringify(name));
    history.push("/browse/0");
  };
  // if (slider.length > 0) {
  //   console.log("recentMv wala first index name slider hy arry ka", slider[0]);
  // }
  return (
    <div className="recent-mv-con" style={{ marginBottom: "20px" }}>
      <div className="d-flex flex-row justify-content-space-between">
        <div className="txt">{tag}</div>
        <div>
          <i
            onClick={() => setLocalStorage(name)}
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
        {slider.map((elem, index) => {
          const newname = makingValidName(elem.name);
          const newskunumb = makingValidName(`${elem.sku_number}`);
          const newshoeid = makingValidName(`${elem.shoe_id}`);

          return (
            <SwiperSlide key={index}>
              <Link
                to={`/product/${newname}_sku_${newskunumb}_id_${newshoeid}`}
              >
                <Card style={{ marginBottom: "35px" }}>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RecentMV;
