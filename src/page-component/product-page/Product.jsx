import thrillerVerified from "../../assets/thrillverf.jpg";
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
  Favorite,
  ShareOutlined,
  ArrowUpward,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import Bolt from "../../assets/bolt.png";
import ShareModal from "../../components/product-page-pills/ShareModal";
import ThreeBannerResponsive from "../../components/ThreeBannerResponsive/ThreeBannerResponsive";
import thrillerVerifiedIcon from '../../assets/product/thrillerVerifiedIcon.svg';
import startSellingAsab from '../../assets/product/startSellingAsab.svg';
import globalAccessIcon from '../../assets/product/globalAccessIcon.svg';
import aboutUsContactDMUS from '../../assets/aboutUs/aboutUsContactDMUS.svg';
import aboutUsContactEmail from '../../assets/aboutUs/aboutUsContactEmail.svg';
import aboutUsContactWhatsapp from '../../assets/aboutUs/aboutUsContactWhatsapp.svg';
import shareIcon from '../../assets/product/shareIcon.svg';
import tabbyIcon from '../../assets/product/tabbyIcon.svg';
import { BASE_URL } from "../../Constants/Global";
import { QuestionSign } from "../../components/recent/NewCustomRecentcs";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Product = ({ allProducts }) => {
  var rawid = useParams().id;
  var findid = rawid.split("_");
  const index = findid.length - 1;
  var id = findid[index].replace("-", " ");
  const history = useHistory();
  var mainURL = "https://appick.io/u/thriller/imgs/";

  var usr = JSON.parse(window.localStorage.getItem("user"));
  var sz = "4";
  if (usr !== null && usr !== undefined) sz = usr.defaultSize;
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
  const [shareShow, setshareShow] = useState(false);

  const [shippingDetailsOpen, setShippingDetailsOpen] = useState(false);
  const [priceGaurantyDetailsOpen, setPriceGaurantyDetailsOpen] = useState(false);
  const [authenticityDetailsOpen, setAuthenticityDetailsOpen] = useState(false);

  const [readMoreOpen, setReadMoreOpen] = useState(false);

  const closeMobileChart = () => {
    setSizeChart(false);
  };
  function Load() {
    var user = window.localStorage.getItem("user");
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
    var user = window.localStorage.getItem("user");
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
  let foundProduct = allProducts?.filter(
    (dat) => `${dat?.shoe_id}` === `${id}`
  );
  let product =
    foundProduct.length > 0
      ? foundProduct[0].release_date
        ? {
            ...foundProduct[0],
            release_date: foundProduct[0]?.release_date.split("T")[0],
          }
        : { ...foundProduct[0] }
      : {};

  const LoadDetails = async () => {
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
    //   window.localStorage.setItem("favSize", defaultSize);

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
      .get(BASE_URL+`shoesImages/${id}`)
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
  }, [id]);
  const addtoFavorite = () => {
    var user = window.localStorage.getItem("user");
    if (user === null) {
      history.push("/login");
    } else {
      const data = {
        shoe_id: parseInt(id),
        user_id: JSON.parse(window.localStorage.getItem("user")).user_id,
        size: JSON.parse(window.localStorage.getItem("favSize")),
      };

      axios
        .post("https://api.thrillerme.com/fav", data)
        .then((res) => {
          if (res.data === "already added") {
            alert("Already added to favourite!");
          } else {
            alert("Added to favourite!");
          }
        })
        .catch((err) => {
          alert("Something Went Wrong");
        });
    }
  };

  function updateSizeValue(val) {
    setDefaultSize(val);
    GetLowsetAsk(val);
    // setFavSize(val);
  }
  console.log(product);
  function GoToBuy() {
    history.push(`/buy/${id}/${defaultSize}/0`);
    window.localStorage.setItem("price", lowestAsk);
  }
  function GoToBid() {
    history.push(`/bid/${id}/${defaultSize}/0/bid`);
    window.localStorage.setItem("price", lowestAsk);
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
  let maintag = product?.tag ? product?.tag?.split(",") : ["---"];
  let productUrl = `${maintag[0]} / ${product?.name ? product?.name : "---"}`;

  function sellOrAskForMore() {
    window.localStorage.setItem("sellShoe", JSON.stringify(foundProduct));
    history.push("/shoe");
  }

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
      <div className="col-md-9 col-sm-11 mx-auto">
        <div
          className="borderedDiv px-2 py-1 row m-0 w-100 d-flex d-lg-none d-xl-none flex-row"
          style={{
            position: "sticky",
            top: "7vh",
            background: "white",
            zIndex: 999,
            width: '100% !important',
            margin: '0px 0px 0px 0px !important',
            border: 'none'
          }}
        >
          <button
            className="btn btn-outline-dark w-100 my-2 sizeSlctbtn"
            style={{ borderRadius: '0px' }}
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
          <div className="d-flex w-100 align-items-center justify-content-between p-0 flex-row mb-2 mx-auto">
            <button
              className="btn btn-outline-dark placeBidBtn"
              onClick={GoToBid}
            >
              Place Bid
            </button>
            <button
              className="btn btn-danger buyNowBtn"
              onClick={GoToBuy}
            >
              Buy
            </button>
          </div>

          <button
            className="btn btn-outline-light w-100 removeBorder mt-4 fM"
            style={{ color: "black" }}
            onClick={() => console.log("sell for")}
          >
            <span style={{ color: "#01633F" }} className="bold900" >Buy Now</span> Starting at AED--/mo with <img src={tabbyIcon} style={{ display: 'inline' }} />. <QuestionSign  />
          </button>
          <button
            className="btn btn-outline-light w-100 removeBorder mb-4 fM bold900"
            style={{ color:  "#01633F" }}
            onClick={() => sellOrAskForMore()}
          >
            Sell for -- or Ask for More <i className="" ></i>
          </button>
          <hr className="hr" />
        </div>

        <div className="row mt-2 noExtraMargins">
          <h1 className="productName" 
           >{product?.name ? product?.name : "---"}</h1>
          <span
          className="productsSubName"
          >{product?.colorway ? product?.colorway : "---"}</span>
        </div>
        <div className="row flex-row noExtraMargins pt-3 showOnMobile showOnMobileFlex" >
          <div className="col-5 mobileConTextContainer1 " >
            <div className="mobileConText">
              <span>Verified Authentic</span>
            </div>
          </div>

          <div className="col-5 mobileConTextContainer2">
            <div className="mobileConText blink">
              <span>
                Condition:<span style={{ color: "#01633F" }}> New</span>
              </span>
            </div>
          </div>
        </div>
        <div className="row d-flex flex-row noExtraMargins pt-2">
          <div className="smallBtnsContainer">
            <button
              className="btn smallBtns float-left float-lg-right float-xl-right"
              onClick={addtoFavorite}
            >
              <Favorite />
            </button>
            <button
              className="btn smallBtns float-left float-lg-right float-xl-right"
              onClick={() => setshareShow(!shareShow)}
            >
              {/* <ShareOutlined /> */}
              <img src={shareIcon} />
            </button>
          </div>
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
        <ShareModal
          open={shareShow}
          onCloseModal={() => setshareShow(!shareShow)}
        />
        <div className="row d-flex flex-row">
          <div className="col-lg-6 col-md-12">
            <div className="row d-none d-lg-flex d-xl-flex flex-row">
              <div className="col-6">
                <div className="conText blink">
                  <span>
                    Condition:<span style={{ color: "#ec1d25" }}> New</span>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="conText">
                  <span>100% Authentic</span>
                </div>
              </div>
            </div>

            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              // mousewheel={true}
            >
              <SwiperSlide>
                <img
                  className="img-fluid"
                  style={{ margin: '0px auto 0px 12.5%', width: '70%' }}  
                  src={product.cover_image}
                  alt={product.sku_number}
                />
              </SwiperSlide>
              {pimagesTotal.map((name, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img 
                        className="img-fluid"
                        style={{ margin: '0px auto 0px 12.5%', width: '70%' }}  
                        src={name} 
                        alt={name}
                    >
                    </img>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="col-lg-6 col-md-12  d-flex flex-column align-items-center justify-content-evenly h-100">
            <ThreeBannerResponsive />
            <div className="borderedDiv my-4  px-2 py-1 row m-0 w-100 d-none d-lg-flex d-xl-flex flex-row">
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
              <div className="d-flex w-100 align-items-center justify-content-between p-0 flex-row mb-2 mx-auto">
                <button
                  className="btn btn-outline-dark"
                  style={{ width: "48%" }}
                  onClick={GoToBid}
                >
                  Place Bid
                </button>
                <button
                  className="btn btn-danger"
                  style={{ width: "48%" }}
                  onClick={GoToBuy}
                >
                  Buy
                </button>
              </div>

              <hr />

              <button
                className="btn btn-outline-light w-100 removeBorder my-2"
                style={{ color: "green" }}
                onClick={() => {
                  sellOrAskForMore();
                }}
              >
                Sell for -- or Ask for More
              </button>
            </div>
            <div className="row w-100 d-flex flex-row mx-0">
              <div className="col-lg-4 col-md-12 d-flex align-items-center justify-content-start" style={{ padding: 0 }} >
                <span 
                  className="fM p-0 m-0"
                  style={{
                    fontSize: '20px'
                  }}
                >
                  Last Sale:
                  <b>---</b>
                </span>
              </div>
              {/* <div className="col-lg-8 col-md-12">
                <div className="row d-flex flex-row">
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-dark smallBtns">
                      View Asks
                    </button>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-dark smallBtns">
                      View Bids
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div className="col-12">
              <div className="row d-flex d-lg-none d-xl-none flex-row">
                <div className="col-6">
                  <div className="conText">
                    <span>100% Authentic</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="conText blink">
                    <span>
                      Condition:<span style={{ color: "#ec1d25" }}> New</span>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <hr className="my-4 hr" />
        <Suggestion
          allProducts={allProducts}
          collection_id={product?.collection_id ? product?.collection_id : id}
          shoe_id={product?.shoe_id ? product?.shoe_id : id}
          name="Related Products"
        />

        <div className="row d-flex flex-row">
          <div className="col-lg-6 col-md-12 mt-2">
            <h2 style={{ fontSize: 20, fontFamily: 'SuisseIntlM' }} className="productDetails" >Product Details</h2>
            <div className="row d-flex flex-row mb-2">
              <div className="col-6">Style</div>
              <div className="col-6 text-right">
                <span>
                  <b>{product?.sku_number ? product?.sku_number : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row mb-2">
              <div className="col-6">Colorway</div>
              <div className="col-6 text-right">
                <span>
                  <b>{product?.colorway ? product?.colorway : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row mb-2">
              <div className="col-6">Retail Price</div>
              <div className="col-6 text-right">
                <span>
                  <b>{product?.price ? product?.price : "---"}</b>
                </span>
              </div>
            </div>
            <div className="row d-flex flex-row mb-2">
              <div className="col-6">Release Date</div>
              <div className="col-6 text-right">
                <span>
                  <b>{product?.release_date ? product?.release_date : "---"}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column mt-3 mb-3">
            <span className="mb-3" >
              <b>Product Description</b>
            </span>
            <span className={`text-justify ${ !readMoreOpen ? 'productDescriptionTextLimiter' : ''}`} >{product?.summary ? product?.summary : "---"}</span>
            
            {
              !readMoreOpen && (
                <span>
                  <b style={{ color: '#01633F', cursor: 'pointer', fontSize: 14 }} onClick={() => setReadMoreOpen(true)} >READ MORE</b>
                </span>
              )
            }
            
          </div>

          <hr className="hrThick" />
          <div className="col-lg-12 col-md-12 d-flex flex-column mt-3">
            <button className="btn" 
              style={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'                
               }} 
               onClick={
                () => setShippingDetailsOpen(!shippingDetailsOpen )
               }
            >
              <div className="fM2" >SHIPPING & RETURNS</div>
              <div>
                {
                  shippingDetailsOpen && (
                    <KeyboardArrowUp />
                  )
                }
                {
                  !shippingDetailsOpen && (
                    <KeyboardArrowDown />
                  )
                }
              </div>
            </button>
            {
              shippingDetailsOpen && (
                <div>
                  <div>
                    <div className="mt-3">
                      You may return your order on all sneakers marked as Return Applicable. You will be able to see if you your sneaker is applicable for return on the Final Checkout Page.
                    </div>
                    <div className="mt-3" >
                      Delivery and processing speeds are of utmost importance to us. Orders ship to Thriller first for verification and typically take 2-4 days to reach to you.  All orders are shipped with expedited shipping to you.
                    </div>
                    <div className="mt-3" >
                      If you have any questions or concerns with regard to sizing or condition of a specific product on our site, please contact us before purchasing.
                    </div>
                    <div className="" >
                      Estimated delivery times for international orders can be found under our <a href="https://thrillerme.com/faq">‘List of Countries’</a> on the FAQ page. International customers do NOT pay any additional fees or taxes upon arrival. What you see is what you pay. 
                    </div>
                    <div className="mt-3">
                      If your country is not on our list, reach out to our logistics team <a href="https://thrillerme.com/contact">here</a> for support. 
                    </div>
                  </div>
                </div>  
              )
            }
          </div>
          <hr className="mb-4 mt-3" />
        </div>
        <div className="row productVerify">
          <h3 className="text-center py-2">Thriller Verified Sneakers</h3>
          <p className="text-center">We Verify Every Item. Every Time.</p>
          <img
            onClick={() => {
              history.push("/about");
            }}
            src={thrillerVerified}
            className="img-fluid mx-auto mb-4"
            style={{ maxWidth: "500px" }}
            alt="thrillerVerified"
          />
        </div>

        <div className="row d-flex flex-row">
          <hr className="hrThick" />
          <div className="col-lg-12 col-md-12 d-flex flex-column mt-3">
              <button className="btn" 
                style={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'                
                }} 
                onClick={
                  () => setPriceGaurantyDetailsOpen(!priceGaurantyDetailsOpen )
                }
              >
                <div className="fM2" >PRICE GUARANTEE</div>
                <div>
                  {
                    priceGaurantyDetailsOpen && (
                      <KeyboardArrowUp />
                    )
                  }
                  {
                    !priceGaurantyDetailsOpen && (
                      <KeyboardArrowDown />
                    )
                  }
                </div>
              </button>
              {
                priceGaurantyDetailsOpen && (
                  <div>
                    <div>
                      <div className="mt-3">
                        We guarantee your Best Buy, every time. 
                      </div>
                      <div className="mt-3" >
                        Due to our unique bidding system and marketplace platform, as well as our Authenticity Guarantee, we’re giving you access to the most limited sneakers in the world at a regulated price, decided by the only fair regulator-you. Choose a price that you’re willing to pay, or Buy Now.
                      </div>
                      <div className="mt-3" >
                        But rest assured that whatever you choose, you’re getting the sneaker you want at the fairest price out there. That is our Guarantee.
                      </div>
                      <div className="mt-3" >
                        Already made your purchase and are not satisfied? Don’t worry! Our customer service team will ensure that we make it up to you. Check out these <a href="https://uk.trustpilot.com/review/thrillerme.com?languages=all">1000’s of customers</a> that trust us already.
                      </div>
                    </div>
                  </div>  
                )
              }
          </div>
          <hr className="hrThick" />
          <div className="col-lg-12 col-md-12 d-flex flex-column mt-3">
              <button className="btn" 
                style={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'                
                }} 
                onClick={
                  () => setAuthenticityDetailsOpen(!authenticityDetailsOpen )
                }
              >
                <div className="fM2" >AUTHENTICITY GUARANTEE</div>
                <div>
                  {
                    authenticityDetailsOpen && (
                      <KeyboardArrowUp />
                    )
                  }
                  {
                    !authenticityDetailsOpen && (
                      <KeyboardArrowDown />
                    )
                  }
                </div>
              </button>
              {
                authenticityDetailsOpen && (
                  <div>
                    <div>
                      <div className="mt-3" >
                        Shop on Thriller with confidence knowing every purchase is Thriller Verified. Thriller Verified is our own designation using data points and industry experts, as well as machine learning, to Guarantee Authenticity every single time.                         
                      </div>
                      <div className="mt-3" >
                        Our team of experts uses a rigorous, multi-step verification process to ensure 100% Authenticity. We only allow deadstock on our marketplace. That means every item, bought or sold must be brand new and never worn. 
                      </div>
                      <div className="mt-3" >
                        We believe there's no substitute for experience. Since inception, we've inspected over AED 2 million worth of items on behalf of our customers. As a final check in our verification process, our QA experts ensure the product meets <a href="https://thrillerme.com/contact">our high standards</a>.
                      </div>
                    </div>
                  </div>  
                )
              }
          </div>
          <hr className="hrThick" />
        </div>

        <div className="row d-flex flex-row mt-3 pt-3">
          <div className="col-lg-6 col-md-12 mt-2">
            <div className="productEndBox" >
              <div>
                <img src={thrillerVerifiedIcon} />
              </div>
              <div className="pl-3" >
                <div className="productEndBoxHeading" >Thriller Verified</div>
                <div className="productEndBoxDescription mt-1" >
                  Thriller Verified is our own designation and means that we inspect every item, every time.
                </div>
                <div className="productEndBoxLearnMore mt-1" >
                  Learn More
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 mt-2">
            <div className="productEndBox" >
              <div>
                <img src={globalAccessIcon} />
              </div>
              <div className="pl-3" >
                <div className="productEndBoxHeading" >Global Access</div>
                <div className="productEndBoxDescription mt-1" >
                  Our millions of customers from over 200 countries allow you to easily secure those hard-to-find items.
                </div>
                <div className="productEndBoxLearnMore mt-1" >
                  Learn More
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 mt-2">
            <div className="productEndBox" >
              <div>
                <img src={startSellingAsab} />
              </div>
              <div className="pl-3" >
                <div className="productEndBoxHeading" >Start Selling ASAP</div>
                <div className="productEndBoxDescription mt-1" >
                  You can start selling on Thriller in just a few clicks, no application process necessary.
                </div>
                <div className="productEndBoxLearnMore mt-1" >
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row py-4 w-100 mx-auto overflow-hidden mt-3"
        style={{ background: '#0C0C0C' }}
      >
        <div className="col-md-9 col-sm-10 my-5 mx-auto">
          <h1 className="text-center mt-3 text-white footerHeading">Contact Customer Care</h1>
          <div className="row">
            <div className="col-md-2 mb-2" ></div>
            <div className="col-md-8 col-sm-12">
              <div className="row pt-3 px-2">
                <div className="col-4 mb-2 px-1">
                    <div className="contactCardsAbout">
                      <img src={aboutUsContactDMUS} />
                      <h1 className="text-center text-white">DM US</h1>
                    </div>
                  </div>
                  <div className="col-4 mb-2 px-1">
                    <div className="contactCardsAbout">
                      <img src={aboutUsContactWhatsapp} />
                      <h3 className="text-center">WHATSAPP</h3>
                    </div>
                  </div>
                  <div className="col-4 mb-2 px-1">
                    <div className="contactCardsAbout p13"  >
                      <img src={aboutUsContactEmail} />
                      <h3 className="text-center">EMAIL</h3>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr" />
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
