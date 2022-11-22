import React, { useState } from "react";
import "./signup.styles.scss";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { CustomButton } from "../custom-button/custome-button.component";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { SIGNUP, BASE_URL } from "../../Constants/Global";
import { withRouter } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../Constants/Functions";
import * as Actions from "../../Redux/Actions";
import { connect } from "react-redux";
import swal from "sweetalert";

const Signup = ({ setSignIn }) => {
  let history = useHistory();

  let sellVar = useParams().sell;
  var isAuthenticated = false;
  var hasPayout = false;
  var hasShipping = false;

  //console.log("##### sell #####", sellVar);

  //console.log("SI", setSignIn);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [serverRequest, setServerRequest] = useState(false);

  const [fieldStatus, setFieldStatus] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const signUpNow = async () => {
    //setServerRequest(true);
    var sign = await signUp();
    //console.log("###### Sign ########", sign);
    if (sign) history.goBack();
  };

  const initialSetup = async () => {
    var uData = JSON.parse(localStorage.getItem("user"));
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
      var uData = JSON.parse(localStorage.getItem("user"));
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

  const signUp = async () => {
    //////console.log("SignUp works", userCredentials);
    const { firstName, lastName, email, password } = userCredentials;

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      swal({
        title: "Error!",
        text: "Please Fill All the details",
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
    if (!validateName(firstName)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct First Name",
        icon: "error",
      });
      return;
    }
    if (!validateName(lastName)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Last Name",
        icon: "error",
      });
      return;
    }

    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      verification_code: 2128,
      isAuthenticated: 1,
      isApproved: 0,
      isSuspended: 0,
      suspendedTill: null,
      defaultSize: 4,
      userInfo: "",
      user_role: 2,
      business_name: "",
      contact: null,
      paypal: null,
      address: null,
    };

    setLoading(true);

    axios
      .post(SIGNUP, data)
      .then((res) => {
        let response = res.data;
        if (response.status === "success") {
          response = parseInt(response.message.split(" ")[5]);
          data = {
            ...data,
            user_id: response,
          };
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("user_id", response);

          //Send email
          axios
            .post("https://api.thrillerme.com/signup", {
              emailType: "signup",
              emailTo: data.email,
            })
            .then((res) => {
              //console.log("########### Email #############:", res);

              try {
                setSignIn(true);
                // history.goBack();
                // history.goBack();
                // history.goBack();
                setTimeout(() => {
                  if (sellVar === "1") {
                    setupChecks();
                  } else {
                    //console.log(history);
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
              } catch (error) {
                console.error("Unable to set signin");
              }
            })
            .catch((err) => {
              console.error("email error", err);
            });
        } else {
          swal({
            title: "Error!",
            text: "User with same email already exists.",
            icon: "error",
          });
        }
      })
      .catch((e) => {
        //////console.log("error", e);
        setLoading(false);
        alert("Something went Wrong");
      });
  };

  return (
    <div className="signup-container">
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <div className="main-wrapper">
          <div className="form-container">
            <label
              className={
                fieldStatus.firstName || userCredentials.firstName
                  ? "float-label"
                  : null
              }
              htmlFor={1}
            >
              First Name
            </label>
            <input
              id={1}
              name="firstName"
              type="text"
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              value={userCredentials.firstName}
            />
          </div>
          <div className="form-container">
            <label
              className={
                fieldStatus.lastName || userCredentials.lastName
                  ? "float-label"
                  : null
              }
              htmlFor={2}
            >
              Last Name
            </label>
            <input
              id={2}
              name="lastName"
              type="text"
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              value={userCredentials.lastName}
            />
          </div>
          <div className="form-container">
            <label
              className={
                fieldStatus.email || userCredentials.email
                  ? "float-label"
                  : null
              }
              htmlFor={3}
            >
              Email Address
            </label>
            <input
              id={3}
              name="email"
              type="text"
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
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
              htmlFor={4}
            >
              Password
            </label>
            <input
              id={4}
              name="password"
              type="password"
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              value={userCredentials.password}
            />
          </div>

          <CustomButton
            size="large"
            onClick={signUpNow}
            disabled={serverRequest}
          >
            Sign Up
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
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
