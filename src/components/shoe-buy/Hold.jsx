import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import "./hold.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import ApplePay from "./ApplePay";

export default function Pay(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [intentID, setIntentID] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const [err, setErr] = useState(true);

  let history = useHistory();

  useEffect(() => {
    if (succeeded) {
      //console.log("##### Amount holded ######");

      //Place offer
      var url = "https://api.thrillerme.com/offers/";
      axios
        .post(url, {
          offer: props.offer,
          intentID: intentID,
        })
        .then(
          (response) => {
            if (response.data.status === "success") {
              const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
              const options = {
                autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
                debug: true, // enable logs
              };
              ReactPixel.init("3098857153686189", advancedMatching, options);

              ReactPixel.pageView(); // For tracking page view
              ReactPixel.trackSingleCustom(
                "3098857153686189",
                "InitiateCheckout",
                props.offer
              ); // For tracking custom events.

              history.push("/buying-section");
            } else {
              console.error(response);
              //alert(response.data.data.result);
            }
          },
          (error) => {
            //console.log(error);
          }
        );
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
        .post("https://api.thrillerme.com/stripe/hold", {
          amount: parseFloat(props.offer.totalBill) * 100,
        })
        .then(function (response) {
          setErr(false);
          //console.log("######## client secret #######", response.data);
          setClientSecret(response.data.clientSecret);
          setIntentID(response.data.intentID);
        });
    } catch (error) {
      setErr(true);
    }
  }, []);

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
                "Place offer"
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
            Payment captured succeeded! see the result in your
            <a href={`https://thrillerme.com/buying`}> Buying section.</a>{" "}
          </p>
          <br />
          <ApplePay offer={props.offer} />
        </form>
      )}
    </div>
  );
}
