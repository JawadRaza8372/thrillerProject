import React from "react";
import "./ShopBanner.scss";

const ShopBanner = ({ bannerText, productText, image }) => {
  return (
    <div className="shpbnr">
      <img className="bnrImg_img" src={image}></img>
      <div className="bnrtxt">{bannerText}</div>
      <div className="prdTxt">{productText}</div>
    </div>
  );
};

export default ShopBanner;
