import React from "react";
import { Link } from "react-router-dom";
import cardImg6 from "../../temporary-data/6.png";
import "./CustomSearchResultItem.scss";
export const CustomSearchResultItem = ({
  imgUrl,
  title,
  description,
  toLink,
}) => {
  const shortDes =
    description?.length > 30
      ? `${description}`?.substring(0, 28) + "..."
      : description;
  return (
    <div className="searchResultItemCont" onClick={toLink}>
      <div className="imgContainr">
        <img src={`${imgUrl ? imgUrl : cardImg6}`} alt={title} />
      </div>
      <div className="infoContainr">
        <span>{title}</span>
        <span>{shortDes}</span>
      </div>
    </div>
  );
};
