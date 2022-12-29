import React from "react";
import TrustPilotIcon from "./assets/trust-pilot.png";

const CarouselCard = (props) => {
  return (
    <a
      href="https://uk.trustpilot.com/review/thrillerme.com?languages=all"
      target="_blank"
      style={{ color: "#000" }}
    >
      <div className="carousel-card" style={{boxShadow: '0px 4px 8px 0px #00000040'}} >
        <div className="icon-div" style={{ textAlign: "center" }}>
          <img
            src={TrustPilotIcon}
            style={{ width: "128px", margin: "0 auto" }}
          />
        </div>
        <div className="post-body">
          <p className="post-name">{props.content}</p>
          <p className="post-by">@{props.userName}</p>
        </div>
      </div>
    </a>
  );
};

export default CarouselCard;
