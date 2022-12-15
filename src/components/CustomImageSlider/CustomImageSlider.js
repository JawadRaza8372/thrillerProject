import React from "react";
import "./CustomImageSlider.scss";
function CustomImageSlider({ currentimg, allimgs, onClickFunction }) {
  return (
    <div className="customesSliderContainer">
      <div className="mainImageContainer">
        {currentimg && (
          <img className="mainImage" src={currentimg} alt={currentimg} />
        )}
      </div>
      <div className="imagesThumbnailContainer">
        {allimgs?.length > 0 &&
          allimgs.map((image, index) => {
            const onClickFunctionImageChange = () => {
              onClickFunction(image);
            };
            return (
              <>
                {image && (
                  <div className="thumbContainer" key={index}>
                    <button onClick={onClickFunctionImageChange} />
                    <img className="thumbImage" src={image} alt={image} />
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}

export default CustomImageSlider;
