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

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function QuestionSign({toolTip}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {toolTip}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <button type="button" class="infoQuestionBtn">
        ?
      </button>
    </OverlayTrigger>
  )
} 

const NewCustomRecentcs = ({ name, tag, productData, toolTip }) => {
  const history = useHistory();
  const recentSlider = productData?.filter((iem) => iem?.tag.includes(name));
  const setLocalStorage = (attr) => {
    window.localStorage.setItem("selectedSection", JSON.stringify(attr));
    history.push("/browse/0");
  };
  return (
    <>
      <div className="row flex-row">
        <div className="col-md-10 col-sm-12">
          <h1 className="slidersHeading my-5">{tag} <QuestionSign toolTip={toolTip} /></h1>
        </div>
        <div className="col-md-2 col-sm-12 hideInMobile">
          <button onClick={() => setLocalStorage(name)} className="nextButton">
            <span className="mr-1">SEE ALL</span>
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
                          {elem.name.length > 32
                            ? elem.name.substring(0, 29) + " .."
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
