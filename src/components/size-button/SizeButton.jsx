import React, { Fragment, useEffect } from "react";
import "./SizeButton.scss";
import { useHistory, withRouter } from "react-router-dom";
import SizeSelectProd from "../size-selector-product/SizeSelectProd";
import * as Actions from "../../Redux/Actions";
import { connect } from "react-redux";
import axios from "axios";
import { mylocalStorage } from "../../Constants/Functions";

const SizeButton = ({
  fromFilter,
  size,
  cost,
  price,
  type,
  setSizeNo,
  setSize,
  parentCallBack,
  setFavSize,
  setProducts,
  setFilterComponent,
  filterComponent,
}) => {
  const history = useHistory();

  const sortBySize = async (arg) => {
    if (fromFilter === undefined) {
      //console.log("argument is: ", arg);
      mylocalStorage.setItem("bSize", arg);
      const { data } = await axios.get(
        `https://api.thrillerme.com/shoes/getBySize/${arg}`
      );
      if (data.length === 0) {
        //console.log("empty....");
        setProducts([]);
      } else {
        //console.log("Data found on size");
        setProducts([]);
        window.mylocalStorage.setItem("filter", JSON.stringify(data));
        setProducts(data);
      }
      try {
        setFilterComponent(false);
      } catch (error) {}
    } else {
      if (window.location.href.indexOf("size") > -1) {
        history.push(`${arg}`);
      } else {
        history.push(`size/${arg}`);
      }
    }
    setFilterComponent(!filterComponent);
  };

  return {
    browse: (
      <Fragment>
        <div
          className="btn btn-primary szBtnPro"
          onClick={() => {
            sortBySize(size);
            // history.push("buy");
          }}
        >
          {size}
        </div>
      </Fragment>
    ),
    product: (
      <Fragment>
        <div
          className="btn btn-primary szBtn"
          style={{
            textAlign: "center",
          }}
          onClick={() => {
            setSize(size);
            setSizeNo(size);
            parentCallBack(size);

            mylocalStorage.setItem("favSize", size);
            // setFavSize(size);
          }}
        >
          {cost > 0 ? (
            <div
              style={{
                textAlign: "center !important",
                // "border": "1px solid red",
                height: " 60px",
                paddingTop: "10%",
              }}
            >
              {size}
              <div style={{ color: "red" }}>
                AED {cost > 0 ? Math.floor(cost) : null}
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center !important",
                // "border": "1px solid red",
                height: " 60px",
                paddingTop: "20%",
              }}
            >
              {size}
              <div style={{ color: "red" }}>
                {cost > 0 ? Math.floor(cost) : null}
              </div>
            </div>
          )}
        </div>
      </Fragment>
    ),
  }[type];
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSize: (data) => {
      dispatch({ type: Actions.SET_SIZE, payload: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(SizeButton);
