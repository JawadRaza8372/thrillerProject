import React from "react";
import BuyOrderButton from "../buy-order-button/BuyOrderButton";
import SizeSelectProd from "../size-selector-product/SizeSelectProd";
import "./SizeBuyProd.scss";

const SizeBuyProd = ({
  price,
  size,
  id,
  parentCallBack,
  lowestAsk,
  setFavSize,
}) => {
  return (
    <div className="size-buy-prod-container">
      <div style={{ alignSelf: "center" }}>
        <SizeSelectProd
          size={size}
          setFavSize={setFavSize}
          parentCallBack={parentCallBack}
        />
      </div>
      <div className="divider"></div>
      <div>
        <BuyOrderButton
          price={price}
          id={id}
          size={size}
          lowestAsk={lowestAsk}
        />
      </div>
    </div>
  );
};

export default SizeBuyProd;
