import React, { Fragment, useState, useEffect } from "react";
import "./billing-setting-page.styles.scss";
import AccountBalanceSharpIcon from "@material-ui/icons/AccountBalanceSharp";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

export const BillingSettingPage = withRouter(({ history }) => {
  const [paypalDetails, setPaypalDetails] = useState({
    email: "",
  });

  const [paymentMode, setPaymentMode] = useState("");

  const [bankDetails, setBankDetails] = useState({
    Name: "",
    Nick: "",
    IBAN: "",
  });

  const [paypalEmail, setPaypalEmail] = useState(false);

  const [bankEmail, setBankEmail] = useState(false);

  const [fieldStatus, setFieldStatus] = useState({
    email: "",
    Name: "",
    Nick: "",
    IBAN: "",
    mode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaypalDetails({ ...paypalDetails, [name]: value });
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const activateField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  const disableField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: false });
  };

  const saveDetails = (name, value) => {
    // Get the existing data
    var existing = window.localStorage.getItem("user");

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : {};

    // Add new data to localStorage Array
    existing[name] = value;

    // Save back to localStorage
    window.localStorage.setItem("user", JSON.stringify(existing));
  };

  function savePayout() {
    var user = JSON.parse(window.localStorage.getItem("user"));

    //console.log(user);
    var payoutData = {
      userID: user.user_id,
      name: bankDetails.Name,
      nickName: bankDetails.Nick,
      IBAN: bankDetails.IBAN,
      paypalEmail: paypalDetails.email,
      payoutMode: paymentMode,
    };

    var urlS = `https://api.thrillerme.com/payout`;
    //console.log(JSON.stringify(payoutData));
    axios
      .post(urlS, payoutData)
      .then((res) => {
        //console.log(res);
        saveDetails("BankAccountName", bankDetails.Name);
        saveDetails("BankAccountNick", bankDetails.Nick);
        saveDetails("BankAccountIBAN", bankDetails.IBAN);
        saveDetails("paypalEmail", paypalDetails.email);
      })
      .catch((error) => {
        console.error(error);
      });

    if (history.location.state.historySetting) {
      history.push("settings-section");
    } else if (
      history.location.state.historyShoe !== null ||
      history.location.state.historyShoe !== undefined
    ) {
      history.push("/sell");
      // window.open(`http://localhost:3000/shoe`, "_self");
    } else {
      history.push("settings-section");
    }
  }

  useEffect(() => {
    var user = JSON.parse(window.localStorage.getItem("user"));

    if (user.paypalEmail !== undefined) {
      setPaypalDetails({ ...paypalDetails, email: user.paypalEmail });
    }
    if (user.BankAccountNick !== undefined) {
      setBankDetails({
        ...bankDetails,
        Nick: user.BankAccountNick,
        IBAN: user.BankAccountIBAN,
        Name: user.BankAccountName,
      });
    }
  }, []);

  return (
    <Fragment>
      <div className="billing-setting-container">
        <div className="billing-box">
          <div className="header-text payOutMobileView">
            <h1>Payout Method</h1>
            <span>Please choose your payout method</span>
          </div>
          <div className="">
            {/* <Link to="/settings-section"> */}
            <div
              className="billing-forms mx-2"
              onClick={() => {
                setPaypalEmail(true);
                setPaymentMode("paypal");
                setBankEmail(false);
              }}
            >
              <button className="d-flex justify-content-around align-items-center px-5">
                <img src="/images/paypal.png" alt="logo" />
                <span style={{ fontWeight: "800", fontSize: "20px" }}>
                  Paypal
                </span>
              </button>
            </div>
            {/* </Link> */}
            {paypalEmail ? (
              <div className="form-container">
                <label
                  className={
                    fieldStatus.email || paypalDetails.email
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
                  onBlur={disableField}
                  value={paypalDetails.email}
                />
              </div>
            ) : null}

            {/* <Link to="/settings-section"> */}
            <div
              className="billing-forms mx-2"
              onClick={() => {
                setPaypalEmail(false);
                setBankEmail(true);
                setPaymentMode("bank");
              }}
            >
              <button className="d-flex justify-content-around align-items-center px-5">
                <AccountBalanceSharpIcon />
                <span style={{ fontWeight: "800", fontSize: "20px" }}>
                  Online Bank Transfer
                </span>
              </button>
            </div>
            {bankEmail ? (
              <Fragment>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.Name || bankDetails.Name
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    Name
                  </label>
                  <input
                    id={1}
                    name="Name"
                    type="email"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={bankDetails.Name}
                  />
                </div>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.Nick || bankDetails.Nick
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    Nick Name
                  </label>
                  <input
                    id={1}
                    name="Nick"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={bankDetails.Nick}
                  />
                </div>
                <div className="form-container">
                  <label
                    className={
                      fieldStatus.IBAN || bankDetails.IBAN
                        ? "float-label"
                        : null
                    }
                    htmlFor={1}
                  >
                    IBAN
                  </label>
                  <input
                    id={1}
                    name="IBAN"
                    onChange={handleChange}
                    onFocus={activateField}
                    onBlur={disableField}
                    value={bankDetails.IBAN}
                  />
                </div>
              </Fragment>
            ) : null}
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div className="billing-setting-footer">
        <div className="button-container">
          <CustomButton
            size="inverted"
            onClick={() => {
              history.push("settings-section");
            }}
          >
            Cancel
          </CustomButton>
        </div>
        <div className="button-container">
          <CustomButton
            size="inverted"
            onClick={() => {
              savePayout();
            }}
          >
            Save
          </CustomButton>
        </div>
      </div>
    </Fragment>
  );
});
