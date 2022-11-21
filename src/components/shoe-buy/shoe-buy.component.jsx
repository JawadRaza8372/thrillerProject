import React, { useState, useRef, useEffect } from "react";
import "./shoe-buy.styles.scss";
import { useHistory, withRouter, useParams } from "react-router-dom";
import PriceCalculatorBuy from "../price-calculator-buy/price-calculator-buy.component";
import { connect } from "react-redux";
import * as Actions from "../../Redux/Actions";
import axios from "axios";
import { CustomButton } from "../custom-button/custome-button.component";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Pay from "./Pay";
import Hold from "./Hold";

//Stripe Live
const stripepro = loadStripe(
  "pk_live_51IiIJ9BPtBbBG1D4RECcgbhgde32T8O7otN8o4yUWnfEKlowDBlHkGg1KF8YWaAe7bfW7zAM3nrE2S9LHFGnJHbl00rZXzZiqQ"
);

//Stripe Test
// const stripepro = loadStripe(
//   "pk_test_51IiIJ9BPtBbBG1D4Lw59W0SkR7Zn4rnXVN9l5De0uR6wYinpi0lKsikv4M6v3sM4ip1hUOEaPbepjDTU8mGMonhj00edd6puGr"
// );
//console.log(stripepro);

const ShoeBuy = (props) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const [usd, setUSD] = useState(0);

  let history = useHistory();

  function AcceptOffer() {
    //show loader here
    var url = `https://api.thrillerme.com/listing/buynow/${props.id}/${props.size}`;
    //console.log(url);
    var shipping = 22.5;
    axios
      .get(
        "https://api.thrillerme.com/shippings/" +
          JSON.parse(localStorage.getItem("user")).user_id
      )
      .then((res) => {
        if (res.data.city !== undefined) {
          if (
            res.data.city !== "Dubai" &&
            res.data.city !== "دبي" &&
            res.data.city !== null
          ) {
            //console.log("update shipping");
            localStorage.setItem("shippingFee", 20);
            shipping = 20; //next_day
          } else {
            localStorage.setItem("shippingFee", 22.5);
            shipping = 22.5; //same_day
          }
        } else {
          localStorage.setItem("shippingFee", 22.5);
          shipping = 22.5; //same_day
        }

        axios
          .get(url)
          .then((res) => {
            //console.log(res);
            var offer = res.data;
            var offerData = {
              productID: offer.shoe_id,
              size: offer.size,
              buyerID: JSON.parse(localStorage.getItem("user")).user_id,
              sellerID: offer.seller_id,
              price: props.offer.totalBill,
              isAuthentic: 0,
              notes: null,
              status: "Pending",
              quiqupJobID: null,
              pickupState: null,
              dropOffstate: null,
              pickupTrackingURL: null,
              dropOffTrackingURL: null,
            };

            // var urlOrders = `https://api.thrillerme.com/orders`;

            var urlOrders = `https://api.thrillerme.com/orders`;

            //console.log("O", offerData);
            // //console.log(
            //   "Shipping",
            //   parseFloat(localStorage.getItem("shippingFee"))
            // );

            var orderProcessing = 0;
            try {
              orderProcessing = localStorage.getItem("order-processing");
            } catch (error) {}

            console.log("order processing", orderProcessing);

            axios
              .post(urlOrders, {
                offerData: offerData,
                listing_id: offer.listing_id,
                offer_id: 0,
                soldTo: JSON.parse(localStorage.getItem("user")).user_id,
                shipping: shipping,
                vat: offer.processingFee,
                processing: orderProcessing,
                offerAmount: offer.askingPrice,
              })
              .then(
                (response) => {
                  //console.log(response);
                  localStorage.setItem("history", "1");
                  history.push("/buying-section");
                },
                (error) => {
                  //console.log(error);
                }
              );
          })
          .catch((err) => {
            console.error("order error", err);
          });
      })
      .catch((err) => {
        console.error("shipping cost error", err);
      });
  }

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    ////console.log("user", user);
    if (user === null || user === undefined) {
      history.push({
        path: "/login",
        state: {
          historyProduct: true,
          productId: props.id,
          size: props.size,
        },
      });
    } else {
      if (props.offer !== undefined && props.offer.totalBill !== undefined) {
        ////console.log("offer", props.offer);
        // axios
        //   .post("https://mancave.appick.io/conv", {
        //     amount: props.offer.totalBill,
        //   })
        //   .then((res) => {
        //     var uusd = Math.ceil(parseFloat(res.data.AmountAED));
        //     //console.log("Res", uusd);
        //     window.paypal
        //       .Buttons({
        //         createOrder: (data, actions) => {
        //           return actions.order.create({
        //             purchase_units: [
        //               {
        //                 description: props.productName,
        //                 amount: {
        //                   currency_code: "USD",
        //                   value: uusd,
        //                 },
        //               },
        //             ],
        //           });
        //         },
        //         onApprove: async (data, actions) => {
        //           const order = await actions.order.capture();
        //           setPaidFor(true);
        //           AcceptOffer();
        //           //console.log("Paid", order);
        //         },
        //         onError: (err) => {
        //           setError(err);
        //           console.error("Payerror", err);
        //         },
        //       })
        //       .render(paypalRef.current);
        //   })
        //   .catch((err) => {
        //     //console.log("Errr: ", err);
        //   });
      }
    }
  }, []);

  function SaveOffer() {
    var offer = props.offer;
    var url = "https://api.thrillerme.com/offers/";
    axios
      .post(url, {
        offer,
      })
      .then(
        (response) => {
          //////console.log("off", response);
          if (response.data.status === "success") {
            //history.push("/buying-section");
          } else {
            alert(response.data.data.result);
          }
        },
        (error) => {
          //////console.log("offer saving error", error);
        }
      );
  }

  function stripe() {
    //console.log("########### stripe ##############");
    axios
      .post("https://api.thrillerme.com/stripe", {
        amount: "2000",
      })
      .then(function (response) {
        //console.log(response.data.id);
        return stripepro.redirectToCheckout({ sessionId: response.data.id });
      })
      .then(function (session) {})
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }

  return (
    <div className="shoe-sell">
      <div className="sell-header">
        <div className="size-info">
          <p>Highest offer</p>
        </div>
        <span className="size-info">AED {props.highestOffer}</span>
      </div>
      <div className="sell-header">
        <div className="size-info">
          <p>US Men Size</p>
        </div>
        <span className="size-info">{props.size}</span>
      </div>

      <div className="sell-header">
        <div className="size-info">
          <p>Condition</p>
        </div>
        <span
          className="size-info"
          // onClick={() =>
          //   toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          // }
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
          // onClick={() =>
          //   toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]])
          // }
        >
          Good
        </span>
      </div>

      <div className="sell-body">
        {!props.review ? (
          <div className="button-group">
            <button
              className={props.selectedButton ? "active" : "inactive"}
              onClick={() => {
                //////console.log("hello offer");
                props.toggleButton(true);
                props.setOfferOrOrder(true);
              }}
            >
              Place offer
            </button>
            <button
              className={!props.selectedButton ? "active" : "inactive"}
              onClick={() => {
                props.toggleButton(false);
                //////console.log("hello buy");
                props.setOfferOrOrder(false);
              }}
            >
              Buy Now
            </button>
          </div>
        ) : null}
        <PriceCalculatorBuy
          id={props.id}
          size={props.size}
          selectedButton={props.selectedButton}
          review={props.review}
          setOfferAmount={props.setOfferAmount}
          amount={props.amount}
          lowestAsk={props.lowestAsk}
          offer={props.offer}
        />
      </div>

      {props.buyNow === "0" && (
        <div
          className="sell-header"
          style={{
            marginTop: "20px",
          }}
        >
          <div className="size-info">
            <p>Payment Method</p>
          </div>
          <span className="size-info">Credit Card</span>
        </div>
      )}
      <br></br>
      {props.buyNow === "1" && <div ref={paypalRef}></div>}

      {/* <CustomButton size="large" onClick={stripe}>
        Stripe
      </CustomButton>
       */}

      {useParams().selectedButton === "false" && (
        <Elements stripe={stripepro}>
          <Pay id={props.id} size={props.size} offer={props.offer} />
        </Elements>
      )}

      {/* For offers - Hold Payment */}
      {useParams().selectedButton === "true" && (
        <Elements stripe={stripepro}>
          <Hold id={props.id} size={props.size} offer={props.offer} />
        </Elements>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOfferOrOrder: (data) => {
      dispatch({ type: Actions.SET_OFFER_ORDER, payload: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(ShoeBuy);
