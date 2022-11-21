import React, { useState, useEffect } from "react";
import "./conformPassword.scss";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import swal from "sweetalert";

export const Reset = withRouter(({ history }) => {
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      history.push("/login");
    }
  }, []);

  const [userCredentials, setUserCredentials] = useState({
    newPassword: "",
    conformPassword: "",
  });

  const [fieldStatus, setFieldStatus] = useState({
    newPassword: "",
    conformPassword: "",
  });
  const validnewPassword = (newPassword) => {
    return /^[A-Za-z0-9_\.\-\@\#\!\%\^\$]{6,}$/.test(newPassword);
  };

  const validconformPassword = (conformPassword) => {
    return /^[A-Za-z0-9_\.\-\@\#\!\%\^\$]{6,}$/.test(conformPassword);
  };

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

  function VerifyAccount() {
    if (
      fieldStatus.newPassword !== "" &&
      fieldStatus.conformPassword !== "" &&
      validnewPassword(userCredentials.newPassword) &&
      validconformPassword(userCredentials.conformPassword) &&
      userCredentials.newPassword === userCredentials.conformPassword
    ) {
      //Verify Account
      var user = JSON.parse(localStorage.getItem("user"));
      var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
      user.password = userCredentials.newPassword;
      axios
        .put(url, user)
        .then((res) => {
          //console.log(res.data);
          localStorage.setItem("user", JSON.stringify(user));
          axios
            .post("https://api.thrillerme.com/signup", {
              emailType: "change",
              emailTo: JSON.parse(localStorage.getItem("user")).email,
            })
            .then((res) => {
              //console.log("email sent", res.data);
              swal({
                title: "Done!",
                text: "Password reset successfully.",
                icon: "success",
              });
              history.push("/settings-section");
            })
            .catch((err) => {
              console.error("email error", err);
            });
        })
        .catch((err) => {
          ////console.log(err);
        });
    } else {
      if (!validnewPassword(userCredentials.newPassword)) {
        swal({
          title: "Error!",
          text: "Password must be minimum 6 characters",
          icon: "error",
        });
        return;
      } else if (
        userCredentials.newPassword !== userCredentials.conformPassword
      ) {
        swal({
          title: "Error!",
          text: "Your passwords did not match",
          icon: "error",
        });
        ////console.log(userCredentials.conformPassword, "dsad");
        ////console.log(userCredentials.newPassword);

        return;
      } else if (!validconformPassword(userCredentials.conformPassword)) {
        swal({
          title: "Error!",
          text: "Password must be minimum 6 characters",
          icon: "error",
        });
        return;
      }
    }
  }

  return (
    <div className="page-container">
      <div className="conformPassword-container">
        <i className="fas fa-shield-alt shield"></i>
        <div className="conformPassword-text">
          <h3> Reset Password</h3>
          <p>Create a New Password</p>
        </div>
        <div className="form-container-conformPassword">
          <label
            className={
              fieldStatus.newPassword ? "float-label-conformPassword" : null
            }
            htmlFor={1}
          >
            New Password
          </label>
          <input
            id={1}
            name="newPassword"
            type="password"
            onChange={handleChange}
            onFocus={activateField}
            // onBlur={disableField}
            value={userCredentials.newPassword}
          />
        </div>
        <div className="form-container-conformPassword">
          <label
            className={
              fieldStatus.conformPassword ? "float-label-conformPassword" : null
            }
            htmlFor={2}
          >
            Confirm Password
          </label>
          <input
            id={2}
            name="conformPassword"
            type="password"
            onChange={handleChange}
            onFocus={activateField}
            value={userCredentials.conformPassword}
          />
        </div>
        <CustomButton onClick={() => VerifyAccount()} size="large">
          Reset Password
        </CustomButton>
      </div>
    </div>
  );
});
