import React, { useEffect, useState } from "react";
import PillContainer from "../../components/product-page-pills/PillContainer";
import Recentcs from "../../components/suggestions/Suggestion";
import SizeSelector from "../../components/size-selector/SizeSelector";
import { Button } from "react-bootstrap";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useParams,
  Link,
} from "react-router-dom";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";

import shoe from "../../temporary-data/shoeee.jpg";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "./Product.scss";
// import "./ProductMobile.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import Suggestion from "../../components/suggestions/Suggestion";
import BuyOrderButton from "../../components/buy-order-button/BuyOrderButton";
import SizeSelectProd from "../../components/size-selector-product/SizeSelectProd";
import SizeBuyProd from "../../components/size-buy-offer-product/SizeBuyProd";
import { connect } from "react-redux";
import * as Actions from "../../Redux/Actions";
import sizeBox from "../../components/size-box-mobile/SizeBox";
import FilterMobile from "../../components/filter-mobile-view/FilterMobile";
import SizeBox from "../../components/size-box-mobile/SizeBox";
import SizeSelectorMobile from "../../components/size-selector-mobile/SizeSelectorMobile";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";
import ImagePopup from "./gallery-popup";
import { makingValidName } from "../../Constants/Functions";
import CustomImageSlider from "../../components/CustomImageSlider/CustomImageSlider";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Product = (props) => {
  var rawid = useParams().id;
  var findid = rawid.split("_");
  const index = findid.length - 1;
  var id = findid[index].replace("-", " ");
  console.log("==========================");
  console.log("checking id", id);
  console.log("==========================");

  var mainURL = "https://appick.io/u/thriller/imgs/";

  var usr = JSON.parse(localStorage.getItem("user"));
  var sz = "4";
  if (usr !== null && usr !== undefined) sz = usr.defaultSize;
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [pimagesTotal, setpimagesTotal] = useState([]);
  const [currentimg, setcurrentimg] = useState(pimagesTotal[0]);

  const [defaultSize, setDefaultSize] = useState(sz);
  const [lowestAsk, setLowestAsk] = useState(0);
  const [priceMobile, setPriceMobile] = useState(0);
  const [showSizeChart, setSizeChart] = useState(false);
  const [favSize, setFavSize] = useState(sz);
  const [coverImage, setCoverImage] = useState("https://picsum.photos/200/300");
  const [galleryImages, setGalleryImages] = useState([
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
  ]);

  if (product.length > 0) {
    console.log("product wali file ma first index", product[0]);
  }
  function Load() {
    console.log("Loading....");
    //props.setID(id);
    // if (product.sku_number === undefined) {
    //   var url = `https://api.thrillerme.com/shoes/${id}`;
    //   var encodedURL = encodeURI(url);
    //   axios.get(encodedURL).then((res) => {
    //     setProduct(res.data);
    //   });
    // }

    var user = localStorage.getItem("user");
    if (user !== null) {
      var userID = JSON.parse(user).user_id;
      var urlUser = `https://api.thrillerme.com/registrations/${userID}`;
      var encodedURLU = encodeURI(urlUser);
      axios.get(encodedURLU).then((res) => {
        if (res.data.defaultSize !== null) {
          setDefaultSize(res.data.defaultSize);
        }
        //console.log("User Default size: ", defaultSize);
      });
    }

    GetLowsetAsk(defaultSize);
    getPriceMobile();
  }

  function getPriceMobile() {
    var user = localStorage.getItem("user");
    if (user === null) {
      var url = `https://api.thrillerme.com/shoes/${id}`;
      var encodedURLU = encodeURI(url);
      axios.get(encodedURLU).then((res) => {
        setPriceMobile(res.data.price);
      });
    } else {
      var url = `https://api.thrillerme.com/listing/lowest/${id}/${defaultSize}`;
      var encodedURL = encodeURI(url);
      axios.get(encodedURL).then((res) => {
        let price = res.data.lowest;
        if (price !== null) {
          setPriceMobile(price);
        } else {
          setPriceMobile(0);
        }
      });
    }
  }

  function LoadDetails() {
    var url = `https://api.thrillerme.com/shoes/${id}`;
    var encodedURL = encodeURI(url);
    axios.get(encodedURL).then((res) => {
      var date = res.data.release_date;
      var data = res.data;
      if (date !== null && date !== undefined) {
        date = date.split("T")[0];
        data.release_date = date;
      }

      const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
      const options = {
        autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
        debug: true, // enable logs
      };

      ReactPixel.init("3098857153686189", advancedMatching, options);

      ReactPixel.pageView(); // For tracking page view
      ReactPixel.trackSingleCustom("3098857153686189", "AddToCart", {
        content_name: data.name,
        content_category: data.sku_number,
        content_ids: [data.sku_number],
        content_type: "product",
        value: data.price,
        currency: "AED",
      }); // For tracking custom events.

      ReactPixel.track("ViewContent", {
        content_ids: data.shoe_id,
        //product_catalog_id: eventId,
        content_type: "product",
        contents: [{ id: data.shoe_id, quantity: 1 }],
      });

      setProduct(data);
      GetLowsetAsk(defaultSize);
      localStorage.setItem("favSize", defaultSize);

      try {
        ReactGA.initialize("UA-198989119-1", {
          debug: true,
        });
        ReactGA.event({
          category: "Add to cart",
          action: "Add to cart",
          label: data.sku_number,
        });
      } catch (ex) {
        console.log("$$$$error", ex);
      }

      //gtag("event", "add_to_cart", data);
    });

    axios
      .get(`https://api.thrillerme.com/shoesImages/${id}`)
      .then((res) => {
        console.log("img", res.data);
        res.data.map((dat) =>
          setpimagesTotal((preval) => [...preval, dat.imgURL])
        );
        setImages(res.data);
      })
      .catch((err) => {
        console.error("imgs error", err);
      });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    ReactGA.initialize("UA-198989119-1");
    Load();
    axios
      .get(`https://api.thrillerme.com/styles/galleryselected/${id}`)
      .then((resp) => {
        console.log(resp.data);
        try {
          setCoverImage(resp.data[0].cover);

          // gallery images
          axios
            .get(
              `https://api.thrillerme.com/styles/galleryselected/${props.shoe_id}`
            )
            .then((resp) => {
              setGalleryImages(resp);
            });
        } catch (error) {}
      });
  }, []);

  useEffect(() => {
    LoadDetails();
  }, [id]);

  function updateSizeValue(val) {
    setDefaultSize(val);
    GetLowsetAsk(val);
    // setFavSize(val);
  }

  function GetLowsetAsk(sizz) {
    var urlL = `https://api.thrillerme.com/listing/lowest/${id}/${sizz}`;
    console.log(urlL);
    var encodedURLL = encodeURI(urlL);
    axios.get(encodedURLL).then((res) => {
      if (res.data.lowest !== null) {
        setLowestAsk(res.data.lowest);
      } else {
        setLowestAsk(0);
      }
    });
  }
  const newname = makingValidName(`${product.name}`);
  const newskunumb = makingValidName(`${product.sku_number}`);
  const newshoeid = makingValidName(`${product.shoe_id}`);
  window.scrollTo(0, 0);
  return (
    <div className="product-page-container">
      <div className="wrapper">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{product.name}</title>
          <meta property="og:description" content={product.summary} />
          <meta property="og:title" content={product.name} />
          <meta property="og:image" content={product.cover_image} />
          <meta
            property="og:url"
            content={`https://thrillerme.com/product/${newname}_sku_${newskunumb}_id_${newshoeid}`}
          />
          <meta
            property="product:retailer_item_id"
            content={product.collection_id}
          />
          <meta
            property="product:price:amount"
            content={product.average_price}
          />
          <meta property="product:price:currency" content="AED" />
          <meta property="product:availability" content="available for order" />
          <meta property="product:category" content={product.collection_id} />
          <meta property="product:brand" content={product.name} />
          <meta property="product:condition" content="new" />
          <meta
            property="product:item_group_id"
            content={product.collection_id}
          ></meta>
        </Helmet>
      </div>

      <div>
        <div itemscope itemtype="http://schema.org/Product">
          <meta itemprop="brand" content="facebook" />
          <meta itemprop="name" content="Facebook T-Shirt" />
          <meta
            itemprop="description"
            content="Unisex Facebook T-shirt, Small"
          />
          <meta itemprop="productID" content="facebook_tshirt_001" />
          <meta itemprop="url" content="https://example.org/facebook" />
          <meta itemprop="image" content="https://example.org/facebook.jpg" />
          <div
            itemprop="value"
            itemscope
            itemtype="http://schema.org/PropertyValue"
          />
          <span itemprop="propertyID" content="item_group_id"></span>
          <meta itemprop="value" content="fb_tshirts"></meta>
        </div>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
          <link itemprop="availability" href="http://schema.org/InStock" />
          <link
            itemprop="itemCondition"
            href="http://schema.org/NewCondition"
          />
          <meta itemprop="price" content="7.99" />
          <meta itemprop="priceCurrency" content="USD" />
        </div>
      </div>

      <div className="prod-top-contain">
        <div className="conText blink">
          <span>CONDITION:</span>
          <span style={{ color: "#ec1d25" }}> NEW</span>
        </div>
        <PillContainer shoe_id={id} favSize={favSize} />
      </div>
      <div className="prod-container">
        <div
          className="gallery-div"
          style={{
            position: "absolute",
            background: "red",
            border: "3px solid red",
          }}
        >
          {coverImage && galleryImages && (
            <ImagePopup
              image={coverImage}
              shoe_id={product.shoe_id}
              title={product.name}
              galleryImages={galleryImages}
              fulldata={product}
            />
          )}
        </div>

        <div className="prod-info-container">
          <span style={{ color: "gray" }}>
            <span style={{ fontWeight: "500", margin: "0px", color: "black" }}>
              SKU:
            </span>
            &nbsp;{product.sku_number}
          </span>
          <span style={{ color: "gray" }}>
            <span style={{ fontWeight: "500", margin: "0px", color: "black" }}>
              COLORWAY:
            </span>
            &nbsp;{product.colorway}
          </span>
          {product.release_date !== null && (
            <span style={{ color: "gray" }}>
              <span
                style={{ fontWeight: "500", margin: "0px", color: "black" }}
              >
                RELEASE DATE:
              </span>
              &nbsp;{product.release_date}
            </span>
          )}
        </div>
        <div className="prod-img-container">
          <div className="d-flex flex-column align-self-center prod-img-text-container">
            <span>{product.name}</span>
          </div>
          <CustomImageSlider
            currentimg={currentimg}
            allimgs={pimagesTotal}
            onClickFunction={(newimg) => setcurrentimg(newimg)}
          />
          <div
            className="shoeImg"
            style={{
              height: "100%",
              width: "100%",
              // backgroundImage: `url(${shoe})`,
            }}
          >
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              // mousewheel={true}
            >
              <SwiperSlide>
                <img src={product.cover_image} alt={product.sku_number}></img>
              </SwiperSlide>
              {images.map(function (name, index) {
                return (
                  <SwiperSlide key={index}>
                    <img src={name.imgURL} alt={name.imgURL}></img>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="prod-size-container">
          {/* <span>AED 1400 |</span>
          <SizeSelector /> */}
          <SizeBuyProd
            price={lowestAsk}
            size={defaultSize}
            id={id}
            setFavSize={setFavSize}
            parentCallBack={updateSizeValue}
            lowestAsk={lowestAsk}
          />
        </div>
      </div>
      <div className="mob-prod-container">
        <div className="mob-prod-top-contain">
          <div className="conText blink">
            <span>CONDITION:</span>
            <span style={{ color: "#ec1d25" }}> NEW</span>
          </div>

          <div>
            <Button
              style={{
                height: "35px",
                width: "85px",
                background: "#ec1d25",
                borderColor: "#ec1d25",
                padding: "0px",
                marginLeft: "5px",
                marginTop: "2px",
                marginBottom: "5px",
              }}
              onClick={() => setSizeChart(true)}
            >
              <span className="p-0 m-0 selltxt">Buy Now</span>
            </Button>
          </div>
        </div>
        {/* <div
          className="mob-prod-img-container"
          style={{
            backgroundImage: `url(${product.cover_image})`,
          }}
        ></div> */}
        <div className="gallery-div">
          {coverImage && galleryImages && (
            <ImagePopup
              image={coverImage}
              shoe_id={product.shoe_id}
              title={product.name}
              galleryImages={galleryImages}
              fulldata={product}
            />
          )}
        </div>
        <div className="prod-img-container">
          {/* <div className="d-flex flex-column align-self-center prod-img-text-container">
            <span>{product.name}</span>
          </div> */}
          <div
            className="shoeImg"
            style={{
              height: "100%",
              width: "100%",
              // backgroundImage: `url(${shoe})`,
            }}
          >
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              mousewheel={true}
            >
              <SwiperSlide>
                <img src={product.cover_image} alt={product.sku_number}></img>
              </SwiperSlide>
              {images.map(function (name, index) {
                return (
                  <SwiperSlide key={index}>
                    <img src={name.imgURL} alt={name.imgURL}></img>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <div>
            <span>{product.name}</span>
          </div>
          <div>
            <span>{product.colorway}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <PillContainer shoe_id={id} />
        </div>
        {showSizeChart ? (
          <div className="d-flex justify-content-center align-item-center">
            <SizeSelectorMobile
              showSizeChart={showSizeChart}
              setSizeChart={setSizeChart}
              lowestAsk={lowestAsk}
              id={id}
              shoe={product}
            />
          </div>
        ) : null}

        <div className="prod-info-container">
          <div className="prod-price-container">
            <span>AED {priceMobile}</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <span>
              {product.sku_number}&nbsp;|&nbsp;{product.colorway}
            </span>
          </div>

          {product.release_date !== null &&
            product.release_date !== undefined && (
              <span>RELEASE DATE: {product.release_date}</span>
            )}
        </div>
      </div>

      <div className="prod-text">{product.summary}</div>
      <div className="prod-page-suggest">
        <Suggestion
          collection_id={id}
          shoe_id={product.shoe_id}
          name="You May Also Like"
        />
      </div>
      <Links />
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setID: (data) => {
      dispatch({ type: Actions.SET_SHOE_ID, payload: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(Product);
