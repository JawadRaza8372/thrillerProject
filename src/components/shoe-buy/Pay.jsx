import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import "./pay.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import ApplePay from "./ApplePay";
import { mylocalStorage } from "../../Constants/Functions";

export default function Pay(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const [err, setErr] = useState(true);

  let history = useHistory();

  useEffect(() => {
    if (succeeded) {
      AcceptOffer();
    }
  }, [succeeded]);

  useEffect(() => {}, [err]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    try {
      // //console.log(
      //   "################## Trying #################",
      //   props.offer.totalBill
      // );
      axios
        .post("https://api.thrillerme.com/stripe", {
          amount: parseFloat(props.offer.totalBill) * 100,
        })
        .then(function (response) {
          setErr(false);
          console.log("######## client secret #######", response.data);
          setClientSecret(response.data.clientSecret);
        });
    } catch (error) {
      setErr(true);
    }
  }, []);

  function AcceptOffer() {
    //show loader here
    var url = `https://api.thrillerme.com/listing/buynow/${props.id}/${props.size}`;
    //console.log(url);
    var shipping = 22.5;
    axios
      .get(
        "https://api.thrillerme.com/shippings/" +
          JSON.parse(mylocalStorage.getItem("user")).user_id
      )
      .then((res) => {
        if (res.data.city !== undefined) {
          if (
            res.data.city !== "Dubai" &&
            res.data.city !== "دبي" &&
            res.data.city !== null
          ) {
            //console.log("update shipping");
            mylocalStorage.setItem("shippingFee", 20);
            shipping = 20; //next_day
          } else {
            mylocalStorage.setItem("shippingFee", 22.5);
            shipping = 22.5; //same_day
          }
        } else {
          mylocalStorage.setItem("shippingFee", 22.5);
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
              buyerID: JSON.parse(mylocalStorage.getItem("user")).user_id,
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
            //   parseFloat(mylocalStorage.getItem("shippingFee"))
            // );
            axios
              .post(urlOrders, {
                offerData: offerData,
                listing_id: offer.listing_id,
                offer_id: 0,
                soldTo: JSON.parse(mylocalStorage.getItem("user")).user_id,
                shipping: shipping,
                vat: offer.processingFee,
                processing: offer.transactionFee,
                offerAmount: offer.askingPrice,
              })
              .then(
                (response) => {
                  const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
                  const options = {
                    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
                    debug: true, // enable logs
                  };
                  ReactPixel.init(
                    "3098857153686189",
                    advancedMatching,
                    options
                  );

                  ReactPixel.pageView(); // For tracking page view
                  ReactPixel.trackSingleCustom(
                    "3098857153686189",
                    "Purchase",
                    offerData
                  ); // For tracking custom events.

                  mylocalStorage.setItem("history", "1");
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

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div>
      {!err && (
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button
            className="button"
            disabled={processing || disabled || succeeded}
            id="submit"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded! see the result in your
            <a href={`https://thrillerme.com/buying`}> Buying section.</a>{" "}
          </p>
          <br />
          <ApplePay offer={props.offer} />
        </form>
      )}
    </div>
  );
}
