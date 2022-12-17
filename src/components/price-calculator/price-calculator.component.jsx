import React, { Fragment, useState, useEffect } from "react";
import "./price-calculator.styles.scss";

import { ToolTip } from "../tool-tip/tool-tip.component";
import ReturnableCell from "../returnable-cells/returnable-cell.component";
import { connect } from "react-redux";
import * as Actions from "../../Redux/Actions";
import axios from "axios";
import { mylocalStorage } from "../../Constants/Functions";

const PriceCalculator = ({
  selectedButton,
  saveReturnable,
  saveCharges,
  highest,
}) => {
  const [askValue, setAskValue] = useState(0);
  const [priceCalculations, setPriceCalculations] = useState({
    transactionFee: 0,
    paymentGateway: 0,
    shippingCost: 0,
    totalPayout: 0,
  });
  const [returnableStatus, setReturnableStatus] = useState(false);
  const [shippingFee, setShippingCost] = useState(null);
  const [trans, setTrans] = useState(null);
  const [processing, setProcessing] = useState(null);

  const handleChange = (event) => {
    setAskValue(event.target.value);

    setTimeout(() => {
      const { transactionFee, paymentGateway, shippingCost, totalPayout } =
        priceCalculations;
      const data = {
        askingPrice: event.target.value,
        shippingFee: shippingFee,
        processingFee: paymentGateway,
        payout: totalPayout,
      };

      saveCharges(data);
    }, 1000);
  };

  const [displayToolTip, toggleToolTip] = useState(false);

  useEffect(() => {
    //console.log("################# myhook #############", selectedButton);
    if (!selectedButton) {
      //console.log("###### set ##########", parseFloat(highest));
      setAskValue(parseFloat(highest));
    }
  }, [selectedButton]);

  useEffect(() => {
    var user = JSON.parse(mylocalStorage.getItem("user"));
    //console.log("### Ask Value ####", askValue);
    if (user !== null && user !== undefined) {
      //console.log("sellers shipping...", user.user_id);

      axios
        .get(`https://api.thrillerme.com/settings`)
        .then((res) => {
          var settings = res.data.result[0];

          axios
            .get("https://api.thrillerme.com/sellers/" + user.user_id)
            .then((res) => {
              if (res.data.city !== undefined) {
                if (
                  res.data.city !== "Dubai" &&
                  res.data.city !== "دبي" &&
                  res.data.city !== null
                ) {
                  setShippingCost(settings.deliveryIn); //outside dubai -> same_day cost Quid
                  mylocalStorage.setItem(
                    "l_shipping",
                    JSON.stringify(settings.deliveryIn)
                  );
                } else {
                  setShippingCost(settings.quidashIn); //same_day
                  mylocalStorage.setItem(
                    "l_shipping",
                    JSON.stringify(settings.quidashIn)
                  );
                }
              } else {
                setShippingCost(settings.quidashIn); //same_day
                mylocalStorage.setItem(
                  "l_shipping",
                  JSON.stringify(settings.quidashIn)
                );
              }

              var share = (settings.marketplaceShare / 100).toFixed(4);
              setTrans("(" + settings.marketplaceShare + "%)");
              setProcessing("(" + settings.processingFee + "%)");

              mylocalStorage.setItem(
                "l_trans",
                JSON.stringify((askValue * share).toFixed(2))
              );
              mylocalStorage.setItem(
                "l_processing",
                JSON.stringify(
                  (
                    askValue * (settings.processingFee / 100).toFixed(4)
                  ).toFixed(2)
                )
              );
              mylocalStorage.setItem(
                "l_payout",
                JSON.stringify(
                  (
                    askValue -
                    (
                      askValue * (settings.marketplaceShare / 100).toFixed(4)
                    ).toFixed(2) -
                    (
                      askValue * (settings.processingFee / 100).toFixed(4)
                    ).toFixed(2) -
                    shippingFee
                  ).toFixed(2)
                )
              );

              setPriceCalculations({
                transactionFee: (askValue * share).toFixed(2),
                paymentGateway: (
                  askValue * (settings.processingFee / 100).toFixed(4)
                ).toFixed(2),
                shippingCost: shippingFee,
                totalPayout: (
                  askValue -
                  (
                    askValue * (settings.marketplaceShare / 100).toFixed(4)
                  ).toFixed(2) -
                  (
                    askValue * (settings.processingFee / 100).toFixed(4)
                  ).toFixed(2) -
                  shippingFee
                ).toFixed(2),
              });
            });
        })
        .catch((e) => {
          console.error("settings", e);
        });
    }
  }, [askValue, shippingFee]);
  return (
    <Fragment>
      <div className="price-calculator">
        <div className="price-form">
          <h2>AED:</h2>
          <input
            disabled={!selectedButton}
            onChange={handleChange}
            placeholder="Enter asking price"
            value={!selectedButton ? highest : askValue}
          ></input>
        </div>
        {selectedButton && (
          <p className="mini">
            You must meet the minimum asking price of AED{" "}
            {selectedButton ? 25 : 325}
          </p>
        )}

        <div className="price-table">
          <div className="price-row">
            <p>Transaction Fee {trans}</p>
            <p>
              AED{" "}
              {askValue > 25 && selectedButton
                ? priceCalculations.transactionFee
                : priceCalculations.transactionFee}
            </p>
          </div>
          <div className="price-row">
            <p>Payment Proc. {processing}</p>
            <p>
              AED{" "}
              {askValue > 25 && selectedButton
                ? priceCalculations.paymentGateway
                : priceCalculations.paymentGateway}
            </p>
          </div>
          <div className="price-row">
            <p>Shipping</p>
            <p>AED {shippingFee}</p>
          </div>
          <div className="price-row">
            <p>Total Payout</p>
            <p>
              AED{" "}
              {askValue > 25 && selectedButton
                ? priceCalculations.totalPayout
                : priceCalculations.totalPayout > 0
                ? priceCalculations.totalPayout
                : null}
            </p>
          </div>
        </div>
      </div>
      <div className="returnable-container">
        <img
          src="https://dk0pm9zdlq16s.cloudfront.net/a0134473-f7ea-40b1-bd99-a5a8be8155e0.png"
          alt="icon"
          style={{
            width: "20px",
            height: "20px",
            marginTop: "8px",
          }}
        />
        <label className="returnable-label">
          Is Returnable
          <i
            onMouseOver={() => toggleToolTip(true)}
            onMouseOut={() => toggleToolTip(false)}
            className="fas fa-question-circle question"
            type="button"
          >
            {displayToolTip ? (
              <ToolTip text="The buyer has three days to request a return for the sneaker. Payout will be processed after the time period has expired. All returns are brand new and unworn. All returns leaves a seller in a good standing position." />
            ) : null}
          </i>
          :
        </label>
        <select
          className="select-return"
          onChange={(event) => {
            setReturnableStatus(event.target.value);
            saveReturnable(event.target.value);
          }}
          value={returnableStatus}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      {selectedButton && <ReturnableCell />}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveReturnable: (data) => {
      dispatch({ type: Actions.SAVE_RETURNABLE, payload: data });
    },
    saveCharges: (data) => {
      dispatch({ type: Actions.SAVE_CHARGES, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceCalculator);
