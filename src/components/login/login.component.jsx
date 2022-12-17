import React, { useState } from "react";
import "./login.styles.scss";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { CustomButton } from "../custom-button/custome-button.component";
import axios from "axios";
import { LOGIN } from "../../Constants/Global";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router";
import { validateEmail, validatePassword } from "../../Constants/Functions";
import * as Actions from "../../Redux/Actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import { mylocalStorage } from "../../Constants/Functions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";

const Login = ({ history, updateUser, location, signedIn, setSignIn }) => {
  let sellVar = useParams().sell;
  var isAuthenticated = false;
  var hasPayout = false;
  var hasShipping = false;

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [fieldStatus, setFieldStatus] = useState({
    email: true,
    password: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const activateField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  const disableField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: false });
  };

  const initialSetup = async () => {
    var uData = JSON.parse(mylocalStorage.getItem("user"));
    //console.log("######## init setup #####", uData);

    try {
      var authData = await axios.get(
        `https://api.thrillerme.com/registrations/${uData.user_id}`
      );

      //console.log("####### auth ######", authData.data.isAuthenticated);

      if (authData.data.isAuthenticated === 1) {
        //console.log("hello");
        isAuthenticated = true;
        //console.log(isAuthenticated);
      }

      var data = await axios.get(
        `https://api.thrillerme.com/sellers/${uData.user_id}`
      );

      //console.log("### SHIPPING ###", data);
      if (data.data !== "") {
        hasShipping = true;
      }

      try {
        var payData = await axios.get(
          `https://api.thrillerme.com/payout/${uData.user_id}`
        );
        //console.log(payData);
        if (payData.data !== "") {
          hasPayout = true;
        }
      } catch (error) {}
    } catch (e) {}
  };

  const setupChecks = async () => {
    try {
      await initialSetup();
      var uData = JSON.parse(mylocalStorage.getItem("user"));
      var url = `https://api.thrillerme.com/registrations/${uData.user_id}`;
      axios.get(url).then((res) => {
        ////console.log(res);
        // !res.data.isApproved
        if (!res.data.isAuthenticated) {
          history.push({
            pathname: "/twoFactorAuth",
            state: {
              hasShipping: hasShipping,
              hasPayout: hasPayout,
              historyShoe: true,
            },
          });
        } else if (!hasShipping) {
          history.push({
            pathname: "/shippingInfo/1",
            state: {
              hasPayout: hasPayout,
              historyShoe: true,
            },
          });
        } else if (!hasPayout) {
          history.push({
            pathname: "/payoutInfo",
            state: {
              historyShoe: true,
            },
          });
        } else {
          history.push("/sell");
        }
      });
    } catch {}
  };

  const login = async () => {
    const { email, password } = userCredentials;

    if (email === "" || password === "") {
      swal({
        title: "Error!",
        text: "Please Enter the Required Credentials",
        icon: "error",
      });
      return;
    }
    if (!validateEmail(email)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Email Address",
        icon: "error",
      });
      return;
    }
    if (password.length < 6) {
      swal({
        title: "Error!",
        text: "Your Password Must have atleast six digits",
        icon: "error",
      });
      return;
    }
    if (!validatePassword(password)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Password",
        icon: "error",
      });
      return;
    }

    setLoading(true);
    axios
      .post(LOGIN, userCredentials)
      .then((res) => {
        console.log("## res", res.data);
        setLoading(false);
        //console.log(res);

        //updateUser(res.data);
        mylocalStorage.setItem("user", JSON.stringify(res.data));
        mylocalStorage.setItem("user_id", res.data.user_id);
        // //console.log(JSON.parse(mylocalStorage.getItem("user")));

        //alert("User Logged in successfully, You can now Proceed!");
        setSignIn(true);

        setTimeout(() => {
          if (sellVar === "1") {
            setupChecks();
          } else {
            if (
              history.location.state !== undefined &&
              (history.location.state.historyProduct !== undefined ||
                history.location.state.historyProduct !== null) &&
              history.location.state.historyProduct
            ) {
              let size = history.location.state.size;
              let product = history.location.state.productId;
              history.push(`/buy/${product}/${size}/0`);
            } else {
              history.goBack();
            }
          }
        }, 500); //Not trigged in first attemp
      })
      .catch((e) => {
        //console.log("Login error", e);
        alert("Invalid credentials, please try again.");
        setLoading(false);
      });
  };

  //////console.log("Location", location);
  return (
    <>
      {/* {//console.log(history)} */}
      <div className="login-container">
        {!loading ? (
          <div className="login-form">
            <div className="form-container">
              <label
                className={
                  fieldStatus.email || userCredentials.email
                    ? "float-label"
                    : null
                }
                htmlFor={1}
              >
                Email Address
              </label>
              <input
                id={1}
                name="email"
                type="email"
                onChange={handleChange}
                onFocus={activateField}
                placeholder="Enter your email"
                value={userCredentials.email}
              />
            </div>
            <div className="form-container">
              <label
                className={
                  fieldStatus.password || userCredentials.password
                    ? "float-label"
                    : null
                }
                htmlFor={2}
              >
                Password
              </label>
              <input
                id={2}
                name="password"
                type="password"
                onChange={handleChange}
                onFocus={activateField}
                placeholder="Enter your password"
                value={userCredentials.password}
              />
            </div>
            <CustomButton size="large" onClick={login}>
              Log in
            </CustomButton>
            <Row align="middle">
              <Col span={12}>
                <a href="https://www.facebook.com/ThrillerMiddleEast/?__tn__=-UC*F">
                  <i className="fab fa-facebook-square fa-2x mx-3 logos"></i>
                </a>
                <a href="https://twitter.com/THRILLER_ME">
                  <i className="fab fa-twitter fa-2x mx-3 logos"></i>
                </a>
                <a href="https://www.instagram.com/thrillerme/?hl=en">
                  <i className="fab fa-instagram-square fa-2x mx-3 logos"></i>
                </a>
              </Col>
            </Row>
          </div>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => {
      dispatch({ type: Actions.SAVE_USER, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
