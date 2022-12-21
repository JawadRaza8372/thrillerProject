import React, { useState, useEffect, useCallback } from "react";
import "./Suggestion.scss";
import { Card, Button } from "react-bootstrap";
import cardImg1 from "../../temporary-data/1.png";
import cardImg2 from "../../temporary-data/2.png";
import cardImg3 from "../../temporary-data/3.png";
import cardImg4 from "../../temporary-data/4.png";
import cardImg5 from "../../temporary-data/5.png";
import cardImg6 from "../../temporary-data/6.png";
import { Link } from "react-router-dom";
import arrowleft from "../../temporary-data/arrow-left.png";
import arrowright from "../../temporary-data/arrow-right.png";
import Slider from "react-slick";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { makingValidName } from "../../Constants/Functions";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },

    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const CustomLeftArrow = ({ onClick }) => {
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

const CustomRightArrow = ({ onClick }) => {
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

const Suggestion = (props) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  var mainURL = "https://appick.io/u/thriller/imgs/";

  const redirect = (id) => {
    window.open(`https://thrillerme.com/${id}`, "_self");
  };
  const allProducts = props?.allProducts?.length > 0 ? props?.allProducts : [];
  const Load = () => {
    //////console.log("Similar products:", props.collection_id);

    setSimilarProducts(
      allProducts?.filter((dat) => dat.collection_id === props.collection_id)
    );
    // var url = `https://api.thrillerme.com/shoes/${props.collection_id}`;
    // var encodedURL = encodeURI(url);
    // axios.get(encodedURL).then((res) => {
    //   var collectionID = res.data.collection_id;
    //   var urlC = `https://api.thrillerme.com/shoes/collections/${collectionID}/${props.collection_id}`;
    //   axios.get(urlC).then((ress) => {
    //     setSimilarProducts(ress.data);
    //   });
    // });
  };

  useEffect(() => {
    Load();
  }, [props.collection_id, props.allProducts]);

  return (
    <>
      {similarProducts.length > 0 && (
        <>
          <div style={{ marginBottom: "20px" }} className="suggestions">
            <h1>{props.name}</h1>
            <div>
              {/* <Carousel
                renderButtonGroupOutside={true}
                responsive={responsive}
                infinite={true}
                itemClass="cardownItem"
              > */}
              <Slider {...settings}>
                {similarProducts?.map((elem, index) => {
                  const newname = makingValidName(`${elem.name}`);
                  const newshoeid = makingValidName(`${elem.shoe_id}`);

                  return (
                    <Link to={`/${newname}_id_${newshoeid}`} key={index}>
                      <div className="CustomcardDiv">
                        <img
                          className="cardImg"
                          src={elem.cover_image ? elem.cover_image : cardImg6}
                        />
                        <div className="textCont">
                          <div className="headingDiv">
                            <h6>
                              {elem.name.length > 32
                                ? elem.name.substring(0, 29) + " .."
                                : elem.name}
                            </h6>
                          </div>
                          <div className="priceDiv">
                            <span>Lowest Price</span>
                            <h6>--</h6>
                          </div>

                          <div className="lastSoldDiv">
                            <span>Last Sold: --</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
              {/* </Carousel> */}
            </div>
          </div>
          <hr className="my-4" />
        </>
      )}
    </>
  );
};

export default Suggestion;

// const CustomRightArrow = ({ onClick }) => {
//   return (
//     <button onClick={() => onClick()}>
//       <img
//         src="/images/next.png"
//         alt="logo"
//         style={{
//           position: "absolute",
//           right: "0px",
//           marginTop: "-25px",
//           width: "40px",
//           height: "40px",
//           marginRight: "10px",
//         }}
//       />
//     </button>
//   );
// };

// const CustomLeftArrow = ({ onClick }) => {
//   return (
//     <button onClick={() => onClick()}>
//       <img
//         src="/images/prev.png"
//         alt="logo"
//         style={{
//           position: "absolute",
//           left: "0px",
//           marginTop: "-25px",
//           width: "40px",
//           height: "40px",
//         }}
//       />
//     </button>
//   );
// };
