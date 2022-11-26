import React from "react";
import "./CustomImageSlider.scss";
function CustomImageSlider({ currentimg, allimgs, onClickFunction }) {
  return (
    <div className="customesSliderContainer">
      <img className="mainImage" src={currentimg} alt={currentimg} />
      <div className="imagesThumbnailContainer">
        {allimgs &&
          allimgs.map((image, index) => {
            const onClickFunctionImageChange = () => {
              onClickFunction(image);
            };
            return (
              <div className="thumbContainer" key={index}>
                <button onClick={onClickFunctionImageChange} />
                <img className="thumbImage" src={image} alt={image} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CustomImageSlider;
