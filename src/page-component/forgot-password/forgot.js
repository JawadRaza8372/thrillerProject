import React from "react";
import RP from "./assets/mail_2-01.png";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./reset.css";

const Forgot = ({ history }) => {
  return (
    <Grid contained className="reset_main">
      <div className="reset_img">
        <img src={RP} alt="" />
      </div>
      <div className="reset_text">
        <h4>
          An email with a link to reset your password has been sent to email
        </h4>
      </div>
      <div className="reset_btn">
        <button onClick={() => history.goBack()} alt="Go Back">
          Go Back
        </button>
      </div>
    </Grid>
  );
};

export default withRouter(Forgot);
