import React, { useState, useEffect } from "react";
import "./login-signup-page.styles.scss";

import Login from "../../components/login/login.component";
import Signup from "../../components/signup/signup.component";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useParams,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { mylocalStorage } from "../../Constants/Functions";

export const LoginSignupPage = ({ signedIn, setSignIn }) => {
  let history = useHistory();
  var id = useParams().id;

  useEffect(() => {
    //console.log("sate", id);
    if (id === "0") {
      mylocalStorage.clear();
      //history.go("/login");
    }
  }, []);

  const [loginSelected, toggleLoginSelected] = useState(true);

  return (
    <div className="login-signup-container">
      <div className="box-container">
        <div className="button-container">
          <button
            onClick={() => toggleLoginSelected(true)}
            className={loginSelected ? "active" : "in-active"}
          >
            Log In
          </button>
          <button
            onClick={() => toggleLoginSelected(false)}
            className={!loginSelected ? "active" : "in-active"}
          >
            Sign Up
          </button>
        </div>
        {loginSelected ? (
          <Login signedIn={signedIn} setSignIn={setSignIn} />
        ) : (
          <Signup signedIn={signedIn} setSignIn={setSignIn} />
        )}
      </div>
    </div>
  );
};
