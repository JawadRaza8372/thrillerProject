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
    window.open(`https://thrillerme.com/product/${id}`, "_self");
  };

  const Load = useCallback(() => {
    //////console.log("Similar products:", props.collection_id);
    var url = `https://api.thrillerme.com/shoes/${props.collection_id}`;
    var encodedURL = encodeURI(url);
    axios.get(encodedURL).then((res) => {
      var collectionID = res.data.collection_id;
      var urlC = `https://api.thrillerme.com/shoes/collections/${collectionID}/${props.collection_id}`;
      axios.get(urlC).then((ress) => {
        setSimilarProducts(ress.data);
      });
    });
  }, [props.collection_id]);

  useEffect(() => {
    Load();
  }, [Load]);

  return (
    <div style={{ marginBottom: "20px" }} className="suggestions">
      <div className="sug-txt customFont">You may also like</div>
      <div>
        <Carousel
          renderButtonGroupOutside={true}
          responsive={responsive}
          infinite={true}
          itemClass="card"
          customRightArrow={<CustomLeftArrow />}
          customLeftArrow={<CustomRightArrow />}
        >
          {similarProducts.map((elem, index) => {
            const newname = makingValidName(`${elem.name}`);
            const newskunumb = makingValidName(`${elem.sku_number}`);
            const newshoeid = makingValidName(`${elem.shoe_id}`);

            return (
              //  to={`/product/${newname}_id_${newshoeid}`}
              <Link to={`/product/${newname}_id_${newshoeid}`} key={index}>
                <Card>
                  <Card.Img
                    style={{ height: "300px", width: "300px" }}
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

          {/* <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg2} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg3} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg4} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg5} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg6} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg1} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img class="m-0 p-0" variant="top" src={cardImg6} />
            <Card.Body className="cBody" class="m-0">
              <Card.Title className="cTxt">Nike Shoe</Card.Title>
            </Card.Body>
          </Card> */}
        </Carousel>
      </div>
    </div>
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
