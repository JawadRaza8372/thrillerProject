import thrillerVerified from "../../assets/thrillverf.png";
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
import CustomToast from "../../components/CustomToast/CustomToast.js";
import shoe from "../../temporary-data/shoeee.jpg";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import authentic from "../../assets/Authentic.png";

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
import CustomMobileSizeSelctor from "../../components/size-selector-mobile/CustomMobileSizeSelctor";
import { useHistory } from "react-router-dom";
import {
  AddBoxRounded,
  AddCircleOutline,
  ArrowDownward,
  FavoriteBorder,
  KeyboardArrowDown,
  ShareOutlined,
} from "@material-ui/icons";
import Bolt from "../../assets/bolt.png";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Product = (props) => {
  var rawid = useParams().id;
  var findid = rawid.split("_");
  const index = findid.length - 1;
  var id = findid[index].replace("-", " ");
  const history = useHistory();
  var mainURL = "https://appick.io/u/thriller/imgs/";

  var usr = JSON.parse(localStorage.getItem("user"));
  var sz = "4";
  if (usr !== null && usr !== undefined) sz = usr.defaultSize;
  const [product, setProduct] = useState({});
  const [showToast, setshowToast] = useState("");
  const [images, setImages] = useState([]);
  const [pimagesTotal, setpimagesTotal] = useState([]);
  const [currentimg, setcurrentimg] = useState(pimagesTotal[0]);

  const [defaultSize, setDefaultSize] = useState(sz);
  const [lowestAsk, setLowestAsk] = useState(0);
  const [priceMobile, setPriceMobile] = useState(0);
  const [showSizeChart, setSizeChart] = useState(false);
  const [favSize, setFavSize] = useState(sz);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState(null);
  const [toasterData, settoasterData] = useState([]);
  let allProducts = useParams()?.allProducts;
  const closeMobileChart = () => {
    setSizeChart(false);
  };
  function Load() {
    console.log("Loading....");
    var user = localStorage.getItem("user");
    if (user !== null) {
      var userID = JSON.parse(user).user_id;
      var urlUser = `https://api.thrillerme.com/registrations/${userID}`;
      var encodedURLU = encodeURI(urlUser);
      axios.get(encodedURLU).then((res) => {
        if (res.data.defaultSize !== null) {
          setDefaultSize(res.data.defaultSize);
        }
      });
    }
    GetLowsetAsk(defaultSize);
    getPriceMobile();
  }

  const [customernumber, setcustomernumber] = useState(0);
  useEffect(() => {
    setcustomernumber(Math.floor(Math.random() * 500) + 1);
    setTimeout(() => {
      setshowToast("open");
    }, 5000);
  }, []);
  const closetoast = () => {
    setshowToast("close");
  };
  useEffect(() => {
    if (showToast !== "" && showToast !== "close") {
      setTimeout(() => {
        closetoast();
        setTimeout(() => {
          setshowToast("");
        }, 2000);
      }, 9000);
    }
  }, [showToast]);

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

  const LoadDetails = async () => {
    let awaitedresult = await allProducts?.filter((dat) => dat?.shoe_id === id);
    let result = awaitedresult.length > 0 ? awaitedresult[0] : [];
    if (result?.release_date !== null && result?.release_date !== undefined) {
      var date = result?.release_date.split("T")[0];
      setProduct({ ...result, release_date: date });
    } else {
      setProduct(result);
    }

    // var url = `https://api.thrillerme.com/shoes/${id}`;
    // var encodedURL = encodeURI(url);
    // await axios.get(encodedURL).then((res) => {
    //   var date = res.data.release_date;
    //   var data = res.data;
    //   setProduct(data);
    //   if (date !== null && date !== undefined) {
    //     date = date.split("T")[0];
    //     data.release_date = date;
    //   }

    //   const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
    //   const options = {
    //     autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    //     debug: true, // enable logs
    //   };

    //   ReactPixel.init("3098857153686189", advancedMatching, options);

    //   ReactPixel.pageView(); // For tracking page view
    //   ReactPixel.trackSingleCustom("3098857153686189", "AddToCart", {
    //     content_name: data.name,
    //     content_category: data.sku_number,
    //     content_ids: [data.sku_number],
    //     content_type: "product",
    //     value: data.price,
    //     currency: "AED",
    //   }); // For tracking custom events.

    //   ReactPixel.track("ViewContent", {
    //     content_ids: data.shoe_id,
    //     //product_catalog_id: eventId,
    //     content_type: "product",
    //     contents: [{ id: data.shoe_id, quantity: 1 }],
    //   });

    //   GetLowsetAsk(defaultSize);
    //   localStorage.setItem("favSize", defaultSize);

    //   try {
    //     ReactGA.initialize("UA-198989119-1", {
    //       debug: true,
    //     });
    //     ReactGA.event({
    //       category: "Add to cart",
    //       action: "Add to cart",
    //       label: data.sku_number,
    //     });
    //   } catch (ex) {
    //     console.log("$$$$error", ex);
    //   }

    //   //gtag("event", "add_to_cart", data);
    // });

    await axios
      .get(`https://api.thrillerme.com/shoesImages/${id}`)
      .then((res) => {
        setcurrentimg(res.data[0].imgURL);
        res.data.map((dat) => {
          setpimagesTotal((preval) => [...preval, dat.imgURL]);
        });
      })
      .catch((err) => {
        console.error("imgs error", err);
      });
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    ReactGA.initialize("UA-198989119-1");
    Load();
    // axios
    //   .get(`https://api.thrillerme.com/styles/galleryselected/${id}`)
    //   .then((resp) => {
    //     try {
    //       setCoverImage(resp.data[0].cover);

    // gallery images
    //   axios
    //     .get(
    //       `https://api.thrillerme.com/styles/galleryselected/${props.shoe_id}`
    //     )
    //     .then((resp) => {
    //       setGalleryImages(resp);
    //     });
    // } catch (error) {}
    //});
  }, []);

  useEffect(() => {
    LoadDetails();
  }, [id, allProducts?.length]);

  function updateSizeValue(val) {
    setDefaultSize(val);
    GetLowsetAsk(val);
    // setFavSize(val);
  }
  console.log(product);
  function GoToBuy() {
    history.push(`/buy/${id}/${defaultSize}/0`);
    localStorage.setItem("price", lowestAsk);
  }
  function GetLowsetAsk(sizz) {
    var urlL = `https://api.thrillerme.com/listing/lowest/${id}/${sizz}`;
    var encodedURLL = encodeURI(urlL);
    axios.get(encodedURLL).then((res) => {
      if (res.data.lowest !== null) {
        setLowestAsk(res.data.lowest);
      } else {
        setLowestAsk(0);
      }
    });
  }
  const newname = makingValidName(`${product?.name}`);
  const newshoeid = makingValidName(`${product?.shoe_id}`);
  return (
    <div className="product-page-container">
      {/* <CustomToast
        imgurl={`${
          toasterData.length > 0
            ? toasterData[customernumber].cover_image
            : product?.cover_image
        }`}
        text={`${
          toasterData.length > 0
            ? toasterData[customernumber].name
            : product?.name
        }`}
        time="a second ago."
        show={showToast}
        hide={() => closetoast()}
      /> */}
      <div className="wrapper">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{product?.name}</title>
          <meta property="og:description" content={product?.summary} />
          <meta property="og:title" content={product?.name} />
          <meta property="og:image" content={product?.cover_image} />
          <meta
            property="og:url"
            content={`https://thrillerme.com/${newname}_id_${newshoeid}`}
          />
          <meta
            property="product:retailer_item_id"
            content={product?.collection_id}
          />
          <meta
            property="product:price:amount"
            content={product?.average_price}
          />
          <meta property="product:price:currency" content="AED" />
          <meta property="product:availability" content="available for order" />
          <meta property="product:category" content={product?.collection_id} />
          <meta property="product:brand" content={product?.name} />
          <meta property="product:condition" content="new" />
          <meta
            property="product:item_group_id"
            content={product?.collection_id}
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
      <div className="col-md-9 col-sm-10 mx-auto">
        <div className="row d-flex flex-row mt-2">
          <div className="col-md-8 col-sm-12">
            <span>
              Home / Sneakers / Nike / Dunk / Low / Nike Dunk Low Retro White
              Black Panda (2021) (GS)
            </span>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="row d-flex flex-row align-items-center justify-content-center">
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn smallBtns">
                  <AddCircleOutline />
                </button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn smallBtns">
                  <FavoriteBorder />
                </button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn smallBtns">
                  <ShareOutlined />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h1>{product?.name ? product?.name : "---"}</h1>
          <span>{product?.colorway ? product?.colorway : "---"}</span>
        </div>
        {showSizeChart ? (
          <div className="d-flex justify-content-center align-item-center">
            <CustomMobileSizeSelctor
              id={id}
              closeSizeChart={closeMobileChart}
              parentCallBack={updateSizeValue}
            />
          </div>
        ) : null}
        <div className="row d-flex flex-row">
          <div className="col-lg-6 col-md-12">
            <CustomImageSlider
              currentimg={currentimg ? currentimg : product?.cover_image}
              allimgs={pimagesTotal[0] ? pimagesTotal : [product?.cover_image]}
              onClickFunction={(newimg) => {
                setcurrentimg(newimg);
              }}
            />
          </div>
          <div className="col-lg-6 col-md-12 d-flex h-100 flex-column align-items-center justify-content-evenly">
            <div className="row d-flex w-100 flex-row mx-0 my-3 customerBuyClass">
              <div className="col-2 h-100 d-flex align-items-center justify-content-center">
                <img className="w-100 align-self-center img-fluid" src={Bolt} />
              </div>
              <div className="col-10 d-flex justify-content-start align-items-center">
                1574 Sold in Last 3 Days!
              </div>
            </div>
            <div className="borderedDiv px-2 py-1 row m-0 w-100 d-flex flex-row">
              <button
                className="btn btn-outline-dark w-100 my-2"
                onClick={() => setSizeChart(true)}
              >
                <div className="fill_size">
                  Size:
                  <span>
                    US M {defaultSize}
                    <KeyboardArrowDown style={{ fontSize: "22px" }} />
                  </span>
                </div>
              </button>
              <button
                className="btn btn-outline-dark w-100 mb-2"
                onClick={GoToBuy}
              >
                Place Bid
              </button>
              <hr />

              <button
                className="btn btn-outline-light w-100 removeBorder my-2"
                style={{ color: "green" }}
                onClick={() => console.log("sell for")}
              >
                Sell for -- or Ask for More
              </button>
            </div>
            <div className="row w-100 d-flex flex-row mx-0 my-3">
              <div className="col-lg-4 col-md-12 py-2 h-100 d-flex align-items-center justify-content-start">
                <span>
                  Last Sale:
                  <b>---</b>
                </span>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="row d-flex flex-row">
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-dark smallBtns">
                      View Asks
                    </button>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-dark smallBtns">
                      View Bids
                    </button>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-dark smallBtns">
                      View Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <Suggestion
          allProducts={allProducts}
          collection_id={product?.collection_id ? product?.collection_id : id}
          shoe_id={product?.shoe_id ? product?.shoe_id : id}
          name="Related Products"
        />
        <hr className="my-4" />

        <div className="row">
          <h2>Product Details</h2>
        </div>
        <div className="row d-flex flex-row">
          <div className="col-lg-6 col-md-12">
            <div className="row d-flex flex-row">
              <div className="col-6">Style</div>
              <div className="col-6">
                <span>
                  <b>{product?.sku_number ? product?.sku_number : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row">
              <div className="col-6">Colorway</div>
              <div className="col-6">
                <span>
                  <b>{product?.colorway ? product?.colorway : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row">
              <div className="col-6">Retail Price</div>
              <div className="col-6">
                <span>
                  <b>{product?.price ? product?.price : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row">
              <div className="col-6">Release Date</div>
              <div className="col-6">
                <span>
                  <b>{product?.release_date ? product?.release_date : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row">
              <img src={authentic} alt="authentic" className="authenticImg" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column">
            <span>
              <b>Product Description</b>
            </span>
            <span>{product?.summary ? product?.summary : "---"}</span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <h3 className="text-center">Thriller Verified Sneakers</h3>
          <p className="text-center">We Verify Every Item. Every Time.</p>
          <img
            src={thrillerVerified}
            className="img-fluid mx-auto mb-4"
            style={{ maxWidth: "500px" }}
            alt="thrillerVerified"
          />
        </div>
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
