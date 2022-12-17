import React from "react";
import GridImg from "../../assets/Vector (2).png";
import "./AboutPage.scss";
import Sneaker from "../../assets/sneker.png";
import Globe from "../../assets/globe.png";
import Auth from "../../assets/auth.png";
import Lock from "../../assets/lock.png";
import Chat from "../../assets/chat.png";
import Step1 from "../../assets/1step.png";
import Step2 from "../../assets/2step.png";
import Step3 from "../../assets/3step.png";
import { Instagram, Mail, WhatsApp } from "@material-ui/icons";
import Links from "../../components/links/Links";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Post1 from "../../assets/post.jpg";
import Post2 from "../../assets/post2.jpg";
import Post3 from "../../assets/post3.jpg";
import Post4 from "../../assets/post4.jpg";
import Post5 from "../../assets/review 3.jpg";
import Slider from "react-slick";

const AboutPage = () => {
  const postArray = [
    { imgUrl: Post1 },
    { imgUrl: Post2 },
    { imgUrl: Post3 },
    { imgUrl: Post4 },
    { imgUrl: Post5 },
  ];
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
  return (
    <>
      <div className="col-md-9 col-sm-10 mx-auto" style={{ marginTop: "11vh" }}>
        <div className="row py-4" style={{ background: "black" }}>
          <div className="col-lg-6 col-md-12 py-2 px-4 responsiveheight">
            <div className="col-12 d-flex flex-column align-items-start justify-content-center h-100">
              <h1 style={{ color: "white" }}>
                All the sneakers you
                <br />
                want. Always in stock,
                <br />
                never sold out.
              </h1>
              <p style={{ color: "white" }}>
                Buying grails has never been easier
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center py-2 px-4">
            <img src={GridImg} className="myImag" />
          </div>
        </div>
        <div className="row py-4">
          <div className="col-12 mx-auto">
            <div className="row">
              <div className="col-lg-4 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start">
                <img src={Sneaker} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Sneaker</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Every item is always in stock and always available. Our
                  mission is to provide you access to the most coveted items in
                  the smartest way possible
                </p>
              </div>
              <div className="col-lg-4 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start">
                <img src={Auth} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Authentication</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Enjoy with confidence
                </p>
              </div>
              <div className="col-lg-4 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start">
                <img src={Globe} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Globe</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Whether it’s pre-release, regionally limited, or “sold out” –
                  our millions of customers from over 200 countries allow you to
                  easily secure those hard-to-find, coveted items.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start">
                <img src={Lock} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Security</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Preserving the integrity of our marketplace means staying a
                  step ahead. Our security and fraud systems, powered by our
                  world class partners, have your personal information covered
                  24/7.
                </p>
              </div>
              <div className="col-lg-6 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start">
                <img src={Chat} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Support</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Thanks to our Support Chatbot, and dedicated global-support
                  staff, you can be sure that we are always available to answer
                  any and every question regarding our marketplace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row py-4 w-100 mx-auto overflow-hidden"
        style={{ background: "#F4F3F1" }}
      >
        <div className="col-md-9 col-sm-10 mx-auto">
          <h3 className="text-center">Getting your grail in 3 steps</h3>
          <div className="row">
            <div className="col-lg-6 col-md-12 d-flex order-2 order-lg-1 order-xl-2 flex-column align-items-center justify-content-center py-2 px-4">
              <img src={Step1} className="myImagsec" />
            </div>
            <div className="col-lg-6 col-md-12 d-flex order-1 order-lg-2 order-xl-2 flex-column align-items-center justify-content-center py-2 px-4">
              <h1 className="stepHeadNumber mx-auto">01</h1>
              <h3 className="stepHeading mx-auto">
                On Thriller, we don't determine the price, you do.
              </h3>
              <p className="stepInfo mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo.
              </p>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-lg-6 col-md-12 order-1 d-flex flex-column align-items-center justify-content-center py-2 px-4">
              <h1 className="stepHeadNumber mx-auto">02</h1>
              <h3 className="stepHeading mx-auto">Verification</h3>
              <p className="stepInfo mx-auto">
                Kick back and relax while we get to work. We make sure items are
                shipped to us first for verification, inspecting everything from
                the packaging and accessories, to the stitching and sole. Once
                we confirm your order is authentic and meets our highs
                standards, we ship it off to you!
              </p>
            </div>
            <div className="col-lg-6 col-md-12 order-2 d-flex flex-column align-items-center justify-content-center py-2 px-4">
              <img src={Step2} className="myImagsec" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 order-2  order-lg-1 order-xl-1 d-flex flex-column align-items-center justify-content-center py-2 px-4">
              <img src={Step3} className="myImagsec" />
            </div>
            <div className="col-lg-6 col-md-12 order-1 order-lg-2 order-xl-2 d-flex flex-column align-items-center justify-content-center py-2 px-4">
              <h1 className="stepHeadNumber mx-auto">03</h1>
              <h3 className="stepHeading mx-auto">
                After we verify your order
              </h3>
              <p className="stepInfo mx-auto">
                We send it your way within 1 business day.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-4 w-100 mx-auto overflow-hidden">
        <div className="col-md-9 py-4 col-sm-10 mx-auto">
          <Slider {...settings}>
            {postArray.map((dat, index) => (
              <>
                <img
                  key={index}
                  className="col img-fluid"
                  src={dat.imgUrl}
                  alt={`post ${index}`}
                />
              </>
            ))}
          </Slider>
        </div>
      </div>
      <div
        className="row py-4 w-100 mx-auto overflow-hidden"
        style={{ background: "#F4F3F1" }}
      >
        <div className="col-md-9 col-sm-10 mx-auto">
          <h3 className="text-center">Contact Customer Care</h3>
          <div className="row py-4">
            <div className="col-md-4 col-sm-10 mx-auto mb-2">
              <div className="contactCardsAbout">
                <Instagram />
                <h3 className="text-center">DM US</h3>
              </div>
            </div>
            <div className="col-md-4 col-sm-10 mx-auto mb-2">
              <div className="contactCardsAbout">
                <WhatsApp />
                <h3 className="text-center">WHATSAPP</h3>
              </div>
            </div>
            <div className="col-md-4 col-sm-10 mx-auto mb-2">
              <div className="contactCardsAbout">
                <Mail />
                <h3 className="text-center">EMAIL</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Links />
    </>
  );
};

export default AboutPage;
