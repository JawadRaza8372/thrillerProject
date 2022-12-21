import React from "react";
import Slider from "react-slick";
import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "./reviewCard";
import PostCard from "./PostCard";
import Post1 from "../../assets/post.jpg";
import Post2 from "../../assets/post2.jpg";
import Post3 from "../../assets/review 3.jpg";
import Post4 from "../../assets/post3.jpg";
import Post5 from "../../assets/post4.jpg";
import StoryCard from "./StoryCard";
import user1 from "./assets/user1.jpg";
import user2 from "./assets/user2.jpg";
import user3 from "./assets/user3.jpg";
import user4 from "./assets/user4.jpg";
import user5 from "./assets/user5.jpg";

import post1 from "./assets/post2.PNG";
import post2 from "./assets/post1.PNG";
import post3 from "./assets/post3.PNG";
import post4 from "./assets/post4.jpg";
import post5 from "./assets/post5.JPG";

export default function Carousel() {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
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
  return (
    <div className="App">
      <h1 className="review-title">Don't take our word for it</h1>
      <Slider {...settings}>
        <div>
          <CarouselCard
            content="Amazing service , Great communication from start to end. Fast and efficient delivery to door."
            userName="Yazeed"
          />
        </div>
        <div>
          <CarouselCard
            content="I purchased yeezy breds and Air Jordan 1 University blues. Very happy with my purchase and shoes were legit."
            userName="Ali Al Ameez"
          />
        </div>
        <div>
          <CarouselCard
            content="Professional and authentic marketplace for buying and selling hype items. My experience was smooth and simple!."
            userName="Adnan Lakdawala"
          />
        </div>
        <div>
          <PostCard
            userImage={user5}
            storyImage={post5}
            userName="rsd89"
            followersCount="2,799"
            userProfile="https://www.instagram.com/rsd89/?utm_medium=copy_link"
            postLink="https://www.instagram.com/p/CTcTFmQp1Gk/?utm_source=ig_web_copy_link"
          />
        </div>
        <div>
          <PostCard
            userImage={user4}
            storyImage={post4}
            userName="shophappy_kickz"
            followersCount="171"
            userProfile="https://www.instagram.com/shophappy_kickz/"
            postLink="https://www.instagram.com/p/CRvi-CMJ31m/?utm_source=ig_web_copy_link"
          />
        </div>
        {/* <div>
          <StoryCard
            userImage={user3}
            storyImage={post3}
            userName="yazeed_khan"
            followersCount="1,979"
            userProfile="https://www.instagram.com/yazeed_khan/"
          />
        </div> */}
        {/* <div>
          <StoryCard
            userImage={user2}
            storyImage={post2}
            userName="mas_alsalimi"
            followersCount="6,388"
            userProfile="https://www.instagram.com/mas_alsalimi/"
          />
        </div>
        <div>
          {/* <PostCard img={Post4} /> */}
        {/* <StoryCard
            userImage={user1}
            storyImage={post1}
            userName="bishr_"
            followersCount="5,743"
            userProfile="https://www.instagram.com/bishr__/"
          />
        </div> */}
      </Slider>
    </div>
  );
}
