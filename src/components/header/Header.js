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
  const [isUserAvailable, setisUserAvailable] = useState({});
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
  // var user = JSON.parse(LocalStorage.getItem("user"));
  // const initialSetup = async () => {
  //   // user = LocalStorage.getItem("user");
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
  console.log("headerUser", isUserAvailable);

  return (
    <div>
      <Navbar
        className={dropShadow ? "drop-shadow nav-pricon" : "nav-pricon"}
        bg="light"
        expand={"lg"}
        fixed={!(sidebar || searchbar || catbar) ? "top" : null}
        style={{
          // height: "10vh",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <Container fluid>
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
          <Navbar.Collapse id="navbarScroll">
            <NavSearchBar allProducts={products} allBrands={brands} />
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              {/* <Nav className="mr-auto" style={{ flex: "1" }}> */}
              {/* <NavSearchBar allProducts={products} allBrands={brands} /> */}
              {/* </Nav> */}
              <NavDropdown
                title="Browse"
                id="basic-nav-dropdown"
                className="m-1 navs centeredBtnsClass"
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
              <Nav.Link
                href="/browse/0/"
                onClick={() => {
                  window.localStorage.setItem("filter", null);
                }}
                className="m-1 navs centeredBtnsClass"
              >
                Shop All
              </Nav.Link>
              <Link
                to="/styles"
                className="m-1 navs nav-link centeredBtnsClass"
              >
                Styles
              </Link>

              <Link to="/help" className="m-1 navs nav-link centeredBtnsClass">
                Help
              </Link>
              <Link
                to="/sell"
                className="m-1 navs nav-link centeredBtnsClass"
                style={{ color: "Red" }}
              >
                Sell
              </Link>
              {isUserAvailable && isUserAvailable?.user_id ? (
                <>
                  <NavDropdown
                    title="Accounts"
                    id="basic-nav-dropdown"
                    className="m-1 navs centeredBtnsClass"
                  >
                    <NavDropdown.Item
                      active="true"
                      href="#"
                      onClick={() => {
                        history.push("/account");
                      }}
                    >
                      Accounts
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      active="true"
                      href="#"
                      onClick={() => {
                        window.localStorage.clear();
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Link className="centeredBtnsClass" to="/login">
                  <button className="loginButtonCustom">Login/SignUp</button>
                </Link>
              )}
              {/* <Nav.Link href="#link" className="m-1">
                <Row gutter={12}>
                  <Col span={6}>
                    <div onClick={() => setSearchbar(!searchbar)}>
                      <img
                        src="/images/search.png"
                        alt="logo"
                        onMouseOver={(e) =>
                          (e.currentTarget.src = "/images/search_dark.png")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.src = "/images/search.png")
                        }
                        style={{
                          width: "24px",
                          paddingBottom: "10px",
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={6}>
                    <div onClick={() => setSidebar(!sidebar)}>
                      <img
                        src="/images/menu.png"
                        alt="logo"
                        onMouseOver={(e) =>
                          (e.currentTarget.src = "/images/menu_dark.png")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.src = "/images/menu.png")
                        }
                        style={{
                          width: "24px",
                          paddingBottom: "10px",
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Nav.Link> */}
            </Nav>

            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
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
