import React, { useEffect } from "react";
import RP from "./assets/mail_2-01.png";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./reset-email.css";
import axios from "axios";
import { mylocalStorage } from "../../Constants/Functions";

const ResetEmail = ({ history }) => {
  useEffect(() => {
    //Send email
    axios
      .post("https://api.thrillerme.com/signup", {
        emailType: "forgot",
        emailTo: JSON.parse(mylocalStorage.getItem("user")).email,
      })
      .then((res) => {
        //console.log("email sent", res.data);
      })
      .catch((err) => {
        console.error("email error", err);
      });
  }, []);

  return (
    <Grid contained className="reset_main">
      <div className="reset_img">
        <img className="resetPasswordImage" src={RP} alt="" />
      </div>
      <div className="reset_text">
        <h4>
          An email with a link to reset your password has been sent to email
        </h4>
      </div>
      <div className="reset_btn">
        <button
          className="buttonEm"
          onClick={() => history.goBack()}
          alt="Go Back"
        >
          Go Back
        </button>
      </div>
    </Grid>
  );
};

export default withRouter(ResetEmail);
