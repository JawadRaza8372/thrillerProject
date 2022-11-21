import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import LocalStorage from "redux-persist/es/storage";
import { sidebarData } from "../../temporary-data/sidebarData";
import CategoryBar from "../cat-sidebar/CategoryBar";
import "./Sidebar.css";

const Sidebar = ({
  sidebar,
  setSidebar,
  catbar,
  setCatbar,
  userDetails,
  history,
  signedIn,
}) => {
  var userObj = null;
  try {
    userObj = JSON.parse(localStorage.getItem("user"));
    userDetails = userObj;
  } catch (error) {
    //console.log("### userObj ####", error);
  }
  const [userData, setUserData] = useState(userObj);

  useEffect(() => {
    ////////console.log("user", userData);
    initialSetup();
  }, [userData]);

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
  }

  var isAuthenticated = false;
  var hasPayout = false;
  var hasShipping = false;

  const History = useHistory();

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
    } catch {
      history.push({
        pathname: "/logins/1",
        state: {
          historyShoe: true,
        },
      });
    }
  };

  const isUserAvailable = localStorage.getItem("user");
  ////console.log(isUserAvailable);

  var widthScreen = getWindowDimensions();
  return sidebar ? (
    <div>
      <div
        className={sidebar ? "clear" : "nav-menu"}
        onClick={() => setSidebar(!sidebar)}
      ></div>
      <nav
        className={sidebar ? "nav-menu active" : "nav-menu"}
        style={{ marginBottom: "150px !important" }}
      >
        <ul className="nav-menu-items">
          <li className="navbar-toogle">
            <Link to="#" className="menu-bars"></Link>
          </li>

          {sidebarData.map((item, index) => {
            return (
              <li
                style={{ border: "5px", borderColor: "black" }}
                key={index}
                onClick={() => setSidebar(!sidebar)}
                className="li"
              >
                {item.title === "Sell Now" &&
                widthScreen >= 481 ? null : item.title === "Sell Now" &&
                  widthScreen < 481 ? (
                  <Link
                    // to={item.path}
                    className="nav-text"
                    onClick={setupChecks}
                  >
                    <span>
                      <div className="hover">{item.title}</div>
                    </span>
                  </Link>
                ) : item.title === "Accounts" ? (
                  <Link
                    className="nav-text"
                    onClick={() => {
                      if (userDetails === null) {
                        localStorage.setItem("coming", {
                          path: "accounts",
                          id: null,
                        });
                        history.push({
                          pathname: "/login",
                          data: "accounts",
                        });
                      } else {
                        history.push("/settings-section");
                      }
                    }}
                  >
                    <span>
                      <div className="hover">{item.title}</div>
                    </span>
                  </Link>
                ) : item.title === "Collections" ? (
                  <Link className="nav-text" onClick={() => setCatbar(true)}>
                    <span>
                      <div className="hover">{item.title}</div>
                    </span>
                  </Link>
                ) : item.title === "Log In / Sign Up" &&
                  isUserAvailable === null ? (
                  <Link className="nav-text" to={"/login"}>
                    <span>
                      {/* {////console.log(signedIn)} */}
                      <div className="hover">{item.title}</div>
                    </span>
                  </Link>
                ) : item.title === "Log In / Sign Up" &&
                  (signedIn === true || isUserAvailable !== null) ? (
                  <Link
                    className="nav-text"
                    onClick={() => {
                      window.localStorage.clear();
                      window.location.href = window.location.origin + "/login";
                    }}
                  >
                    <span>
                      {/* {////console.log(signedIn)} */}
                      <div className="hover">Logout</div>
                    </span>
                  </Link>
                ) : item.title === "Shop All" ? (
                  <Link
                    className="nav-text"
                    onClick={() => {
                      window.localStorage.setItem("filter", null);
                      localStorage.removeItem("selectedSection");
                      window.open(`https://thrillerme.com/browse/0/`, "_self");
                    }}
                  >
                    <span>
                      <div className="hover">{item.title}</div>
                    </span>
                  </Link>
                ) : (
                  <Link className="nav-text" to={item.path}>
                    <span>
                      <div className="hover">{item.title}</div>
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  ) : (
    <CategoryBar
      catbar={catbar}
      setCatbar={setCatbar}
      setSidebar={setSidebar}
      sidebar={sidebar}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export default connect(mapStateToProps)(withRouter(Sidebar));
