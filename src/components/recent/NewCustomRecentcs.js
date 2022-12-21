import {
  ArrowRight,
  ArrowRightAlt,
  KeyboardArrowRight,
} from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import { makingValidName } from "../../Constants/Functions";
import cardImg6 from "../../temporary-data/6.png";
import "./NewCustomRecentcs.scss";

const NewCustomRecentcs = ({ name, tag, productData }) => {
  const history = useHistory();
  const recentSlider = productData?.filter((iem) => iem?.tag.includes(name));
  const setLocalStorage = (attr) => {
    window.localStorage.setItem("selectedSection", JSON.stringify(attr));
    history.push("/browse/0");
  };
  return (
    <>
      <div className="row flex-row">
        <div className="col-10">
          <h1 className="my-5">{tag}</h1>
        </div>
        <div className="col-2">
          <button onClick={() => setLocalStorage(name)} className="nextButton">
            <KeyboardArrowRight />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="productShowDiv">
          {recentSlider?.slice(0, 6).map((elem, index) => {
            const newname = makingValidName(`${elem.name}`);
            const newshoeid = makingValidName(`${elem.shoe_id}`);
            return (
              <>
                <Link to={`/${newname}_id_${newshoeid}`} key={index}>
                  <div className="CustomcardDiv">
                    <img
                      className="cardImg"
                      src={elem.cover_image ? elem.cover_image : cardImg6}
                    />
                    <div className="textCont">
                      <div className="headingDiv">
                        <h6>
                          {elem.name.length > 47
                            ? elem.name.substring(0, 46) + " ..."
                            : elem.name}
                        </h6>
                      </div>
                      <div className="priceDiv">
                        <span>Lowest Price</span>
                        <h6>--</h6>
                      </div>

                      <div className="lastSoldDiv">
                        <span>Last Sold: --</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NewCustomRecentcs;
