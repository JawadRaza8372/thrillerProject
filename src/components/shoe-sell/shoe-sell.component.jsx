import React, { useState, useEffect, useRef } from "react";
import "./shoe-sell.styles.scss";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import axios from "axios";
import LocalStorage from "redux-persist/es/storage";

import PriceCalculator from "../price-calculator/price-calculator.component";
import { BASE_URL } from "../../Constants/Global";

export const ShoeSell = ({
  displayShoeSize,
  toggleShoeDisplay,
  offer,
  buttonCheck,
  setCheck,
  user_id,
}) => {
  var user = window.localStorage.getItem("user");
  var userData = JSON.parse(user);
  // user.then((res) => {
  //   user = JSON.parse(res);
  // });

  const payout = useRef("");

  const [payoutText, setPayoutText] = useState("");

  const payoutFunc = () => {
    setPayoutText(payout.current);
  };

  useEffect(() => {
    //console.log(user_id);
    var url = `${BASE_URL}payout/${user.user_id}`;
    //console.log(url);
    axios
      .get(url)
      .then((res) => {
        //console.log(res.data);
        if (res.data.payoutMode === "paypal") {
          payout.current = "Paypal";
        } else if (res.data.payoutMode === "bank") {
          payout.current = "Bank Transfer";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user.user_id, user_id]);

  var sizeID = window.localStorage.getItem("shoeSize");
  const shoeSize = useState(sizeID);

  const { name, id } = displayShoeSize[1];
  const [selectedButton, toggleButton] = useState(true);
  return (
    // <Row aligin="middle">
    // <Col offset={1} span={10}>
    <div className="shoe-sell">
      <div className="sell-header">
        <div className="size-info">
          <p>Lowest Asking Price</p>
        </div>
        <span
          className="size-info"
          onClick={() =>
            toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          }
        >
          AED {offer.lowest}
        </span>
      </div>
      <div className="sell-header">
        <div className="size-info">
          <p>US Men Size</p>
        </div>
        <span
          className="size-info"
          onClick={() =>
            toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          }
        >
          {shoeSize}
        </span>
      </div>

      <div className="sell-header">
        <div className="size-info">
          <p>Condition</p>
        </div>
        <span
          className="size-info"
          onClick={() =>
            toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          }
        >
          Brand New
        </span>
      </div>
      <div className="sell-header" style={{}}>
        <div className="size-info">
          <p>Box Condition</p>
        </div>
        <span
          className="size-info"
          onClick={() =>
            toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          }
        >
          Good
        </span>
      </div>

      <div className="sell-body">
        <div className="button-group">
          <button
            className={selectedButton ? "active" : "inactive"}
            onClick={() => {
              setCheck(false);
              toggleButton(true);
            }}
          >
            Place Ask
          </button>
          <button
            className={!selectedButton ? "active" : "inactive"}
            onClick={() => {
              toggleButton(false);
              setCheck(true);
            }}
          >
            Sell Now
          </button>
        </div>
        <PriceCalculator
          selectedButton={selectedButton}
          highest={offer.highest}
        />
      </div>

      <div
        className="sell-header"
        style={{
          marginTop: "20px",
        }}
      >
        <div className="size-info">
          <p>Payout Method</p>
        </div>
        <span
          className="size-info"
          // onClick={() =>
          //   // toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          // }
        >
          {payoutText}
          <div style={{ display: "none" }}>
            {setTimeout(() => {
              payoutFunc();
            }, 2000)}
          </div>
        </span>
      </div>
    </div>
    // </Col>
    // </Row>
  );
};
