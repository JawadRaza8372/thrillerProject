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
  const shortDes = `${description}`?.substring(0, 28) + "...";
  return (
    <Link to={`${toLink}`}>
      <div className="searchResultItemCont">
        <div className="imgContainr">
          <img src={`${imgUrl ? imgUrl : cardImg6}`} alt={title} />
        </div>
        <div className="infoContainr">
          <span>{title}</span>
          <span>{shortDes}</span>
        </div>
      </div>
    </Link>
  );
};
