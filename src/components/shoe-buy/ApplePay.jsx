import React, { useState, useEffect } from "react";
import {
  useStripe,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ApplePay(props) {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  const [err, setErr] = useState(true);

  let history = useHistory();

  useEffect(() => {
    if (stripe) {
      console.log("#### total bill", props.offer.totalBill);
      const pr = stripe.paymentRequest({
        country: "AE",
        currency: "aed",
        total: {
          label: "Amount",
          amount: parseInt(props.offer.totalBill) * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          console.log("####### pR set", result);
          setPaymentRequest(pr);
        }
      });

      pr.on("paymentmethod", async (ev) => {
        try {
          var config = {
            method: "post",
            url: "https://api.thrillerme.com/stripe",
            data: {
              amount: parseInt(props.offer.totalBill) * 100,
            },
          };

          var clientSec = await axios(config);
          console.log("######## client secret #######", clientSec.data);

          // Confirm the PaymentIntent without handling potential next actions (yet).
          const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(
              clientSec.data,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            );

          if (confirmError) {
            // Report to the browser that the payment failed, prompting it to
            // re-show the payment interface, or show an error message and close
            // the payment interface.
            ev.complete("fail");
          } else {
            // Report to the browser that the confirmation was successful, prompting
            // it to close the browser payment method collection interface.
            ev.complete("success");
            // Check if the PaymentIntent requires any actions and if so let Stripe.js
            // handle the flow. If using an API version older than "2019-02-11"
            // instead check for: `paymentIntent.status === "requires_source_action"`.
            if (paymentIntent.status === "requires_action") {
              // Let Stripe.js handle the rest of the payment flow.
              const { error } = await stripe.confirmCardPayment(clientSec.data);
              if (error) {
                // The payment failed -- ask your customer for a new payment method.
                alert("Payment failed.");
              } else {
                // The payment has succeeded.
                alert("Payment Success.");
              }
            } else {
              // The payment has succeeded.
              alert("Payment Success.");
            }
          }
        } catch (error) {
          console.err(error);
        }
      });
    }
  }, [stripe]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />;
  }

  return <p></p>;
}
