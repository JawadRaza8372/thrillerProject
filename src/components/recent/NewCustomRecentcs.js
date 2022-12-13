import React from "react";
import { Link } from "react-router-dom";
import { makingValidName } from "../../Constants/Functions";
import cardImg6 from "../../temporary-data/6.png";
import "./NewCustomRecentcs.scss";
const NewCustomRecentcs = ({ name, tag, productData }) => {
  const recentSlider = productData?.filter((iem) => iem?.tag.includes(name));

  return (
    <div className="col-11" style={{ margin: "0px auto" }}>
      <h1>{tag}</h1>
      <div className="row">
        <div className="productShowDiv" style={{ background: "red" }}>
          {recentSlider?.slice(0, 7).map((elem, index) => {
            const newname = makingValidName(`${elem.name}`);
            const newshoeid = makingValidName(`${elem.shoe_id}`);
            return (
              <>
                <Link to={`/${newname}_id_${newshoeid}`} key={index}>
                  <div className="cardDiv">
                    <img
                      className="cardImg"
                      src={elem.cover_image ? elem.cover_image : cardImg6}
                    />
                    <div className="textCont">
                      <h5>{elem.name}</h5>
                      <span>Lowest Price</span>
                      <h5>null AED</h5>
                      <div className="lastSoldDiv">Last Sold: null</div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewCustomRecentcs;
