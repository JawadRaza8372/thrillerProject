import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./price-calculator-buy.styles.scss";
import { ToolTip } from "../tool-tip/tool-tip.component";
import * as Actions from "../../Redux/Actions";
import axios from "axios";
import { useHistory, withRouter, useParams } from "react-router-dom";

const PriceCalculatorBuy = ({
  selectedButton,
  setShoeData,
  review,
  setOfferAmmount,
  setOfferAmount,
  amount,
  lowestAsk,
  offer,
  id,
  size,
}) => {
  const [askValue, setAskValue] = useState(0);
  const [shippingCost, setShippingCost] = useState(22.5);
  const [priceCalculations, setPriceCalculations] = useState({
    transactionFee: 0,
    paymentGateway: 0,
    shippingCost: 0,
    totalPayout: 0,
  });
  const [returnableStatus, setReturnableStatus] = useState(false);
  const [trans, setTrans] = useState(null);
  const [processingStr, setProcessing] = useState(null);
  const [vatStr, setVatStr] = useState(null);

  const handleChange = (event) => {
    const { transactionFee, paymentGateway, shippingCost, totalPayout } =
      priceCalculations;

    setAskValue(event.target.value);

    setTimeout(() => {
      const data = {
        vat: transactionFee,
        paymentGateway: paymentGateway,
        shippingCost: shippingCost,
        totalPayout: totalPayout,
        offerAmmount: event.target.value,
      };
      setShoeData(data);
    }, 2000);
  };

  var _lowestAsk = 0;
  try {
    _lowestAsk = localStorage.getItem("price");
  } catch (error) {}

  const [displayToolTip, toggleToolTip] = useState(false);

  const params = useParams();

  //console.log("##### Selected Button #######", params.selectedButton);

  useEffect(() => {
    //find shipping cost
    var user = JSON.parse(localStorage.getItem("user"));

    if (user !== null && user !== undefined) {
      //console.log("uID", user.user_id);

      axios
        .get("https://api.thrillerme.com/listing/buynow/" + id + "/" + size)
        .then((res) => {
          //console.log(res);
          //console.log(res.data.isReturnable);
          if (res.data.isReturnable !== undefined) {
            if (res.data.isReturnable === 0) {
              setReturnableStatus(false);
            } else {
              setReturnableStatus(true);
            }
          } else {
            setReturnableStatus(false);
          }
        });

      //console.log("buying shipping");

      axios.get(`https://api.thrillerme.com/settings`).then((res) => {
        var settings = res.data.result[0];
        console.log("##########", settings);
        settings.marketplaceShare = 0; //Marketplace share 0
        setTrans("(" + settings.marketplaceShare + "%)");
        setProcessing("(" + settings.processingFee + "%)");
        setVatStr("(" + settings.vat + "%)");

        axios
          .get("https://api.thrillerme.com/shippings/" + user.user_id)
          .then((res) => {
            //console.log(res);
            if (res.data.city !== undefined) {
              if (
                res.data.city !== "Dubai" &&
                res.data.city !== "دبي" &&
                res.data.city !== null
              ) {
                localStorage.setItem("shippingFee", settings.deliveryOut);
                setShippingCost(settings.deliveryOut); //next_day
              } else {
                localStorage.setItem("shippingFee", settings.deliveryIn);
                setShippingCost(settings.deliveryIn); //same_day
              }
            } else {
              localStorage.setItem("shippingFee", settings.deliveryIn);
              setShippingCost(settings.deliveryIn); //same_day
            }

            let data = {
              transactionFee: (
                amount * (settings.marketplaceShare / 100).toFixed(4)
              ).toFixed(2),
              paymentGateway: (
                amount * (settings.processingFee / 100).toFixed(4)
              ).toFixed(2),
              shippingCost: shippingCost,
              totalPayout:
                parseInt(amount).toFixed(2) +
                (
                  parseInt(amount) *
                  (settings.marketplaceShare / 100).toFixed(4)
                ).toFixed(2) +
                (
                  parseInt(amount) * (settings.processingFee / 100).toFixed(4)
                ).toFixed(2) +
                shippingCost,
            };

            if (selectedButton) {
              data.totalPayout =
                parseFloat(amount) +
                parseFloat(data.transactionFee) +
                parseFloat(data.paymentGateway) +
                parseFloat(data.shippingCost);

              data.totalPayout = data.totalPayout.toFixed(2);

              setPriceCalculations(data);
            } else {
              //Buy Now
              let data = {
                transactionFee: (
                  _lowestAsk * (settings.marketplaceShare / 100).toFixed(4)
                ).toFixed(2),
                paymentGateway: (
                  _lowestAsk * (settings.processingFee / 100).toFixed(4)
                ).toFixed(2),
                shippingCost: shippingCost,
                totalPayout:
                  parseInt(_lowestAsk).toFixed(2) +
                  (
                    parseInt(_lowestAsk) *
                    (settings.marketplaceShare / 100).toFixed(4)
                  ).toFixed(2) +
                  (
                    parseInt(_lowestAsk) *
                    (settings.processingFee / 100).toFixed(4)
                  ).toFixed(2) +
                  shippingCost,
              };

              data.totalPayout =
                parseFloat(_lowestAsk) +
                parseFloat(data.transactionFee) +
                parseFloat(data.paymentGateway) +
                parseFloat(data.shippingCost);

              localStorage.setItem(
                "order-processing",
                parseFloat(data.transactionFee)
              );

              data.totalPayout = data.totalPayout.toFixed(2);

              setPriceCalculations(data);
            }
          });
      });
    }
  }, [amount, lowestAsk, selectedButton, shippingCost]);

  return (
    <Fragment>
      <div className="price-calculator-buy">
        <div className="price-form">
          {!review ? (
            <div style={{ width: "100%" }}>
              <h2>AED:</h2>
              <input
                disabled={!selectedButton}
                value={selectedButton ? amount : _lowestAsk}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter your offer"
              ></input>
              {selectedButton ? (
                <p className="mini">
                  You must meet the minimum offer amount of AED 25
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {!review ? (
          <div className="price-table">
            <div className="price-row">
              <p>Transaction {trans}</p>
              <p>AED {priceCalculations.transactionFee}</p>
            </div>
            <div className="price-row">
              <p>Payment Proc. {processingStr}</p>
              <p>AED {priceCalculations.paymentGateway}</p>
            </div>
            <div className="price-row">
              <p>VAT {vatStr}</p>
              <p>AED 0</p>
            </div>
            <div className="price-row">
              <p>Shipping</p>
              <p>AED {priceCalculations.shippingCost}</p>
            </div>
            <div className="price-row">
              <p>Total Bill</p>
              <p>AED {parseFloat(priceCalculations.totalPayout).toFixed(2)}</p>
            </div>
          </div>
        ) : null}

        {review && (
          <div className="price-table">
            <div className="price-row">
              {selectedButton === "true" ? (
                <p>Offer Amount</p>
              ) : (
                <p>Asking Price</p>
              )}

              <p>AED {offer.offerAmount}</p>
            </div>
            <div className="price-row">
              <p>Transaction Fee {trans}</p>
              {/* marketplace share 0 */}
              <p>AED {offer.vat}</p>
            </div>
            <div className="price-row">
              <p>Payment Proc. {processingStr}</p>
              <p>AED {offer.processingFee}</p>
            </div>
            <div className="price-row">
              <p>VAT {vatStr}</p>
              <p>AED 0</p>
            </div>
            <div className="price-row">
              <p>Shipping</p>
              <p>AED {priceCalculations.shippingCost}</p>
            </div>
            <div className="price-row">
              <p>Total Bill</p>
              <p>AED {parseFloat(offer.totalBill).toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
      {!selectedButton ? (
        <div className="returnable-container-buy">
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
            Return Applicable
            <i
              onMouseOver={() => toggleToolTip(true)}
              onMouseOut={() => toggleToolTip(false)}
              className="fas fa-question-circle question"
              type="button"
            >
              {displayToolTip ? (
                <ToolTip text="The buyer has three days to request a return for the sneaker. Payout will be processed after the time period has expired. All returns are brand new and unworn." />
              ) : null}
            </i>
            :
          </label>
          {returnableStatus ? (
            <span style={{ marginTop: "4.5px", fontWeight: "600" }}>Yes</span>
          ) : (
            <span style={{ marginTop: "4.5px", fontWeight: "600" }}>No</span>
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShoeData: (data) => {
      dispatch({ type: Actions.SET_SHOE_AMMOUNT_DETAILS, payload: data });
    },
    setOfferAmmount: (data) => {
      dispatch({ type: Actions.SET_OFFER_AMMOUNT, payload: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(PriceCalculatorBuy);
