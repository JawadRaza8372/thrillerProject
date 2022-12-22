import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import axios from "axios";
import LocalStorage from "redux-persist/es/storage";
import { connect } from "react-redux";
import { NavSearchBar } from "../searchbar/NavSearchBar";
import { Search } from "@material-ui/icons";
import List from "@material-ui/icons/Reorder";

const Header = ({
  brands,
  products,
  setSidebar,
  sidebar,
  setSearchbar,
  searchbar,
  setCatbar,
  catbar,
  signedIn,
  dropShadow,
}) => {
  // const [isAuthenticated, setAuthenticated] = useState(false);
  // const [hasShipping, setShipping] = useState(false);
  // const [hasPayout, setPayout] = useState(false);
  const [show, setShow] = useState(false);
  let [isUserAvailable, setisUserAvailable] = useState({});
  const history = useHistory();
  const showDropdown = (e) => {
    setShow(!show);
  };

  const hideDropdown = (e) => {
    setShow(false);
  };
  const fetchUser = async () => {
    const rawUserId = await window.localStorage.getItem("user");
    //
    if (rawUserId) {
      try {
        let rawuser = JSON.parse(rawUserId);
        setisUserAvailable(rawuser);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setisUserAvailable({});
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  // var user = JSON.parse(window.localStorage.getItem("user"));
  // const initialSetup = async () => {
  //   // user = window.localStorage.getItem("user");
  //   // //console.log(user);
  //   // user.then((res) => {
  //   //   user = JSON.parse(res);
  //   //   //console.log(user);
  //   // });
  //   // if (user === null || user === undefined) {
  //   //   //console.log(user);
  //   //   history.push("/login");
  //   // }

  //   // if (user === null) {
  //   //   //console.log(user);
  //   //   history.push("/login");
  //   // }

  //   try {
  //     // if (user.isAuthenticated === 1) {
  //     //   setAuthenticated(true);
  //     // }

  //     var authData = await axios.get(
  //       `https://api.thrillerme.com/registrations/${user.user_id}`
  //     );

  //     //console.log(authData.data.isAuthenticated);

  //     if (authData.data.isAuthenticated === 1) {
  //       //console.log("hello");
  //       isAuthenticated = true;
  //       //console.log(isAuthenticated);
  //     }

  //     var data = await axios.get(
  //       `https://api.thrillerme.com/sellers/${user.user_id}`
  //     );

  //     //console.log("### SHIPPING ###", data);
  //     if (data.data !== "") {
  //       hasShipping = true;
  //     }

  //     try {
  //       var payData = await axios.get(
  //         `https://api.thrillerme.com/payout/${user.user_id}`
  //       );
  //       //console.log(payData);
  //       if (payData.data !== "") {
  //         hasPayout = true;
  //       }
  //     } catch (error) {}
  //   } catch {}
  // };

  // const setupChecks = async () => {
  //   try {
  //     await initialSetup();
  //     var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
  //     axios.get(url).then((res) => {
  //       ////console.log(res);
  //       // !res.data.isApproved
  //       if (!isAuthenticated) {
  //         history.push({
  //           pathname: "/twoFactorAuth",
  //           state: {
  //             hasShipping: hasShipping,
  //             hasPayout: hasPayout,
  //             historyShoe: true,
  //           },
  //         });
  //       } else if (!hasShipping) {
  //         history.push({
  //           pathname: "/shippingInfo/1",
  //           state: {
  //             hasPayout: hasPayout,
  //             historyShoe: true,
  //           },
  //         });
  //       } else if (!hasPayout) {
  //         history.push({
  //           pathname: "/payoutInfo",
  //           state: {
  //             historyShoe: true,
  //           },
  //         });
  //       } else {
  //         history.push("/sell");
  //       }
  //     });
  //   } catch {
  //     //make logins/1 for smooth seller journey
  //     history.push({
  //       pathname: "/logins/1",
  //       state: {
  //         historyShoe: true,
  //       },
  //     });
  //   }
  // };

  // function goTo(rout) {
  //   setSearchbar(!searchbar);
  //   history.push(`/browse/${rout}/`);
  // }
  return (
    <div>
      <Navbar
        className={dropShadow ? "drop-shadow nav-pricon" : "nav-pricon"}
        // bg="light"
        expand={"lg"}
        fixed={!(sidebar || searchbar || catbar) ? "top" : null}
        style={{
          height: "10vh",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <div style={{ padding: "0px" }} className="container-fluid navBarContainer" >
          <button onClick={() => setSearchbar(true)} className="smallMenuBtns">
            <Search />
          </button>

          <Link to={`/`}>
            <Navbar.Brand href="#home">
              <img
                src="/images/logo.svg"
                className="navbrand"
                width="200px"
                alt="logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <button onClick={() => setSidebar(true)} className="smallMenuBtns">
            <List />
          </button>
          <Navbar.Collapse id="navbarScroll">
            <NavSearchBar allProducts={products} allBrands={brands} />
            <Nav
              className="ml-3 d-flex flex-row align-items-center justify-content-end"
              navbarScroll
            >
              <NavDropdown
                title="Browse"
                id="basic-nav-dropdown"
                className="navs centeredBtnsClass"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                {brands.map((item, index) => {
                  return (
                    <NavDropdown.Item
                      active="true"
                      href={"/browse/" + item.collection_id + "/"}
                      style={{ maxWidth: "50px" }}
                      onClick={() => {
                        window.localStorage.setItem("filter", null);
                      }}
                    >
                      {item.title}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Link
                to="/browse/0/"
                onClick={() => {
                  window.localStorage.setItem("filter", null);
                }}
                className="navs nav-link centeredBtnsClass"
              >
                Shop All
              </Link>
              <Link
                to="/styles"
                className="navs nav-link centeredBtnsClass"
              >
                Styles
              </Link>

              <Link to="/help" className="navs nav-link centeredBtnsClass">
                Help
              </Link>
              <Link
                to="/sell"
                className="mr-3 navs nav-link centeredBtnsClass"
                style={{ color: "Red" }}
              >
                Sell
              </Link>
              {isUserAvailable && isUserAvailable?.user_id ? (
                <>
                  <Link
                    to="/account"
                    className="mx-2 navs nav-link centeredBtnsClass"
                  >
                    Accounts
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      window.localStorage.removeItem("user");
                      setisUserAvailable({});
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-outline-secondary headerBtn" >Login</button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-danger headerBtn" >Signup</button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.user,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
