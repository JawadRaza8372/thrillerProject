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

import sneaker from "../../assets/aboutUs/aboutUsSneaker.svg";
import chat from "../../assets/aboutUs/aboutUsChat.png";
import lock from "../../assets/aboutUs/aboutUsLock.png";
import authentication from "../../assets/aboutUs/aboutUsAuthentication.svg";
import yourPrice from "../../assets/aboutUs/aboutUsYourPrice.svg";
import securityLogos from "../../assets/aboutUs/security-logos.png";

import step1Shoo from "../../assets/aboutUs/step1Shoo.gif";

import Slider from "react-slick";

import aboutBanner from '../../assets/aboutUs/aboutBanner.svg';
import aboutPostVerifiedIcon from '../../assets/aboutUs/aboutPostVerifiedIcon.svg';

import aboutUsPostImg1 from '../../assets/aboutUs/aboutUsPostImg1.jpg';
import aboutUsPostImg1Avatar from '../../assets/aboutUs/aboutUsPostImg1Avatar.svg';
import aboutUsPostImg2 from '../../assets/aboutUs/aboutUsPostImg2.jpg';
import aboutUsPostImg2Avatar from '../../assets/aboutUs/aboutUsPostImg2Avatar.jpg';
import aboutUsPostImg3 from '../../assets/aboutUs/aboutUsPostImg3.jpg';
import aboutUsPostImg3Avatar from '../../assets/aboutUs/aboutUsPostImg3Avatar.jpg';

import aboutUsContactDMUS from '../../assets/aboutUs/aboutUsContactDMUS.svg';
import aboutUsContactEmail from '../../assets/aboutUs/aboutUsContactEmail.svg';
import aboutUsContactWhatsapp from '../../assets/aboutUs/aboutUsContactWhatsapp.svg';

import CarouselCard from "../../components/review-carousel/reviewCard";


const AboutPage = () => {
  const postArray = [
    { 
      imgUrl: aboutUsPostImg1,
      avatar: aboutUsPostImg1Avatar,
      name: 'Jasonderulo',
      url: 'https://instagram.com/jasonderulo?igshid=YWJhMjlhZTc='
    },
    { 
      imgUrl: aboutUsPostImg2,
      avatar: aboutUsPostImg2Avatar,
      name: 'Swaelee',
      url: 'https://instagram.com/swaelee?igshid=YWJhMjlhZTc='
    },
    { 
      imgUrl: aboutUsPostImg3,
      avatar: aboutUsPostImg3Avatar,
      name: 'Rsd89',
      url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTMzNTIwMTcyNjQxNjQ3?story_media_id=2656083454456222494&igshid=YWJhMjlhZTc='
    }
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
      <div className="col-md-9 col-sm-10 mx-auto aboutPage" style={{ marginTop: "12.5vh" }}>
        <div className="row py-5 HeroSectionAbout" style={{ background: "black" }}>
          <div className="col-lg-5 col-md-12 responsiveheight">
            <div className="col-12 d-flex flex-column align-items-end justify-content-center h-100 texts">
                <div style={{ color: "white", lineHeight: 1.2 }}>
                  All the Sneakers you 
                  <br />
                  Want. Always in stock, 
                  <br />
                  never sold out.
                  <br />
                  <div className="subText" >
                    <p style={{ color: "white" }}>
                      Buying grails has never been easier
                    </p>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center imges">
            <img src={aboutBanner} style={{width: '70%'}} />
          </div>
        </div>
        <div className="row py-5 my-5 aboutInfoCardsSection">
          <div className="col-12 mx-auto">
            <div className="row">
              <div className="col-lg-4 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start aboutInfoCards">
                <img src={sneaker} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Global Access</h3>
                <p className="text-center mx-auto smallCardTextP">
                  On Thriller, every item you want is always in stock and always available. Discover and shop products you love from around the world. It doesn't matter whether it’s an internationally exclusive sneaker or that latest drop that’s sold out, you can always find them available on our marketplace. 
                </p>
              </div>
              <div className="col-lg-4 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start aboutInfoCards">
                <img src={authentication} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Enjoy With Confidence</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Every item purchased on our platform comes with an Authenticity Guarantee. This means that our expert team of Authenticators inspect every item to make sure you get exactly what you want, in the condition you expect. 
                </p>
              </div>
              <div className="col-lg-4 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start aboutInfoCards">
                <img src={yourPrice} className="customAboutSmallImage" alt="" />
                <h3 className="text-center my-3">Your World, Your Price</h3>
                <p className="text-center mx-auto smallCardTextP">
                  Hey, it’s your world, we’re just living in it. When buying on Thriller, there are two options. Either Buy Now at the Lowest Ask and get your pair right away, or place a lower Bid at the price you want to pay. We will send you immediate updates as prices move on your bids. Bids can be removed or renewed at any time, and you’ll only be charged when the seller accepts. 
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-1">
              </div>
              <div className="col-lg-5 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start aboutInfoCards">
                <img src={lock} className="customAboutSmallImage" alt="" style={{width: '60px'}} />
                <h3 className="text-center my-3">Security </h3>
                <p className="text-center mx-auto smallCardTextP">
                  Preserving the integrity of our marketplace and over 100s of thousands of dollars moving through Thriller every day means staying a step ahead. Our security and fraud alert systems, powered by world-renowned partners, have your info protected 24/7. 
                </p>
                <img src={securityLogos} style={{ width: '40%', objectFit: 'contain', margin: '0px auto' }} className="securityLogos" />
              </div>
              <div className="col-lg-5 col-md-12 py-2 px-1 d-flex flex-column align-item-center justify-content-start aboutInfoCards">
                <img src={chat} className="customAboutSmallImage" alt="" style={{width: '60px'}} />
                <h3 className="text-center my-3">Support</h3>
                <p className="text-center mx-auto smallCardTextP">
                  We're born and bred local, so we understand your needs and know what's important to you. The difference between us and others is nothing is more important for us than your satisfaction. That's why we employ a full staffed 24/7 support team ready at your disposal, to help you with your orders and sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row py-5 my-5 w-100 mx-auto overflow-hidden stepsSection"
        style={{ background: "#F4F3F1" }}
      >
        <div className="col-md-9 col-sm-10 mx-auto">
          <h1 className="text-center py-5 titlePc" style={{fontSize: 34}}>Getting your grail in 3 steps</h1>
          <h1 className="text-center py-5 titleMobile" style={{fontSize: 34}}>3 Steps For Success</h1>
          <div className="row">
            <div className="col-lg-1">
            </div>
            <div className="col-lg-10">

              <div className="row mt-3 step2">
                <div className="col-lg-6 col-md-12 d-flex order-2 order-lg-1 order-xl-2 flex-column align-items-center justify-content-center py-2 img">
                  <img src={step1Shoo} className="myImagsec" />
                </div>
                <div className="col-lg-6 col-md-12 d-flex order-1 order-lg-2 order-xl-2 flex-column align-items-start justify-content-center py-2 text">
                  <div style={{width: '500px'}} >
                    <h1 className="stepHeadNumber mx-auto">01</h1>
                    <h3 className="stepHeading mx-auto">
                      Bidding animation
                    </h3>
                    <p className="stepInfo mx-auto">
                      On Thriller, we don't determine the price, you do.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row step2">
                <div className="col-lg-6 col-md-12 order-1 d-flex flex-column align-items-end justify-content-center py-2 text" >
                  <div style={{width: '560px'}}>
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
                </div>
                <div className="col-lg-6 col-md-12 order-2 d-flex flex-column align-items-center justify-content-center py-2 img">
                  <img src={Step2} className="myImagsec" />
                </div>
              </div>
              <div className="row step3">
                <div className="col-lg-6 col-md-12 order-2  order-lg-1 order-xl-1 d-flex flex-column align-items-center justify-content-center py-2 img">
                  <img src={Step3} className="myImagsec" style={{width: '80%'}} />
                </div>
                <div className="col-lg-6 col-md-12 order-1 order-lg-2 order-xl-2 d-flex flex-column align-items-start justify-content-center py-2 text">
                  <div style={{width: '400px'}} >
                    <h1 className="stepHeadNumber mx-auto">03</h1>
                    <h3 className="stepHeading mx-auto">
                      Order
                    </h3>
                    <p className="stepInfo mx-auto">
                      After we verify your order, we send it your way within 1 business day.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 pb-5 mx-auto overflow-hidden">
        {/* <div className="col-md-1 col-sm-12">
        </div>
        <div className="col-md-10 col-sm-12">
          <div className="row w-100 pb-5 overflow-hidden">
            {postArray.map((dat, index) => (
              <div className="col-md-4 col-sm-12">
                <a href={dat.url}>
                  <div className="aboutPostCardContainer mx-3" >
                    <div className="aboutPost" >
                      <div className="aboutPostHeader" >
                        <img src={dat.avatar} className='aboutPostHeaderAvatar' />
                        <div className="aboutPostHeaderDetails" >
                          <h3>{dat.name} <img src={aboutPostVerifiedIcon} /> </h3>
                          <p>21.5M Followers</p>
                        </div>
                        <button>
                          View Profile
                        </button>
                      </div>
                      <div className="aboutPostBody" >
                        <img src={dat.imgUrl} />
                      </div>
                      <div className="aboutPostFooter" >
                        View more on Instagram
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div> */}
        <div className="col-md-9 col-sm-10 mx-auto">
          <Slider {...settings}>
            {postArray.map((dat, index) => (
                <a href={dat.url} target="_blank">
                  <div className="aboutPostCardContainer mx-3" >
                    <div className="aboutPost" >
                      <div className="aboutPostHeader" >
                        <img src={dat.avatar} className='aboutPostHeaderAvatar' />
                        <div className="aboutPostHeaderDetails" >
                          <h3>{dat.name} <img src={aboutPostVerifiedIcon} /> </h3>
                          <p>21.5M Followers</p>
                        </div>
                        <button>
                          View Profile
                        </button>
                      </div>
                      <div className="aboutPostBody" >
                        <img src={dat.imgUrl} />
                      </div>
                      <div className="aboutPostFooter" >
                        View more on Instagram
                      </div>
                    </div>
                  </div>  
                </a>
            ))}
            <CarouselCard
              content="Amazing service , Great communication from start to end. Fast and efficient delivery to door."
              userName="Yazeed"
            />
            <CarouselCard
              content="I purchased yeezy breds and Air Jordan 1 University blues. Very happy with my purchase and shoes were legit."
              userName="Ali Al Ameez"
            />
            <CarouselCard
              content="Professional and authentic marketplace for buying and selling hype items. My experience was smooth and simple!."
              userName="Adnan Lakdawala"
            />
          </Slider>
        </div>
      </div>
      <div
        className="row py-4 w-100 mx-auto overflow-hidden"
        style={{ background: "#F4F3F1" }}
      >
        <div className="col-md-9 col-sm-10 my-5 mx-auto">
          <h1 className="text-center mt-5">Contact Customer Care</h1>
          <div className="row py-5">
            <div className="col-md-2 mb-2" ></div>
            <div className="col-md-8 col-sm-12 mb-2">
              <div className="row py-5">
                <div className="col-4 mx-auto mb-2">
                    <div className="contactCardsAbout">
                      <img src={aboutUsContactDMUS} />
                      <h1 className="text-center text-white">DM US</h1>
                    </div>
                  </div>
                  <div className="col-4 mx-auto mb-2">
                    <div className="contactCardsAbout">
                      <img src={aboutUsContactWhatsapp} />
                      <h3 className="text-center">WHATSAPP</h3>
                    </div>
                  </div>
                  <div className="col-4 mx-auto mb-2">
                    <div className="contactCardsAbout">
                      <img src={aboutUsContactEmail} />
                      <h3 className="text-center">EMAIL</h3>
                    </div>
                  </div>
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
