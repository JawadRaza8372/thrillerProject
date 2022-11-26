import React from "react";
import "./CustomImageSlider.scss";
function CustomImageSlider({ currentimg, allimgs, onClickFunction }) {
  return (
    <div className="customesSliderContainer">
      <div className="mainImageContainer">
        <img className="mainImage" src={currentimg} alt={currentimg} />
      </div>
      <div className="imagesThumbnailContainer">
        {allimgs &&
          allimgs.map((image, index) => (
            <div
              className="thumbContainer"
              key={index}
              onClick={() => onClickFunction("image")}
            >
              <img className="thumbImage" src={image} alt={image} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomImageSlider;
