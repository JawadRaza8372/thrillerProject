import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import axios from "axios";
import LocalStorage from "redux-persist/es/storage";
import { connect } from "react-redux";
import { NavSearchBar } from "../searchbar/NavSearchBar";

const Header = ({
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
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  var isAuthenticated = false;
  var hasPayout = false;
  var hasShipping = false;

  const history = useHistory();
  const [brands, setBrands] = useState([]);

  var user = LocalStorage.getItem("user");
  //console.log(user);
  user.then((res) => {
    user = JSON.parse(res);
    //console.log(user);
  });

  const initialSetup = async () => {
    // user = LocalStorage.getItem("user");
    // //console.log(user);
    // user.then((res) => {
    //   user = JSON.parse(res);
    //   //console.log(user);
    // });
    // if (user === null || user === undefined) {
    //   //console.log(user);
    //   history.push("/login");
    // }

    // if (user === null) {
    //   //console.log(user);
    //   history.push("/login");
    // }

    try {
      // if (user.isAuthenticated === 1) {
      //   setAuthenticated(true);
      // }

      var authData = await axios.get(
        `https://api.thrillerme.com/registrations/${user.user_id}`
      );

      //console.log(authData.data.isAuthenticated);

      if (authData.data.isAuthenticated === 1) {
        //console.log("hello");
        isAuthenticated = true;
        //console.log(isAuthenticated);
      }

      var data = await axios.get(
        `https://api.thrillerme.com/sellers/${user.user_id}`
      );

      //console.log("### SHIPPING ###", data);
      if (data.data !== "") {
        hasShipping = true;
      }

      try {
        var payData = await axios.get(
          `https://api.thrillerme.com/payout/${user.user_id}`
        );
        //console.log(payData);
        if (payData.data !== "") {
          hasPayout = true;
        }
      } catch (error) {}
    } catch {}
  };

  useEffect(() => {
    var url = `https://api.thrillerme.com/collections`;
    axios
      .get(url)
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    initialSetup();
  }, []);

  const setupChecks = async () => {
    try {
      await initialSetup();
      var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
      axios.get(url).then((res) => {
        ////console.log(res);
        // !res.data.isApproved
        if (!isAuthenticated) {
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
      //make logins/1 for smooth seller journey
      history.push({
        pathname: "/logins/1",
        state: {
          historyShoe: true,
        },
      });
    }
  };

  function goTo(rout) {
    setSearchbar(!searchbar);
    history.push(`/browse/${rout}/`);
  }

  return (
    <div>
      <Navbar
        className={dropShadow ? "drop-shadow nav-pricon" : "nav-pricon"}
        bg="white"
        fixed={!(sidebar || searchbar || catbar) ? "top" : null}
        style={{
          height: "10vh",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
        }}
      >
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
        <Nav className="mr-auto" style={{ flex: "1" }}>
          <NavSearchBar allProducts={products} allBrands={brands} />
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown
            title="Browse"
            id="basic-nav-dropdown"
            className="m-1 navs"
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
            className="m-1 navs"
          >
            Shop All
          </Nav.Link>

          <Nav.Link href="/styles" className="m-1 navs">
            Styles
          </Nav.Link>

          <Link
            className=" sellbtn"
            style={{
              height: "40px",
              width: "85px",
              marginTop: "5px",
              marginRight: "5px",
            }}
          >
            <Button
              style={{
                height: "35px",
                width: "85px",
                background: "#ec1d25",
                borderColor: "#ec1d25",
                padding: "0px",
                marginLeft: "5px",
                marginTop: "2px",
              }}
              onClick={setupChecks}
            >
              <span className="p-0 m-0 selltxt">Sell</span>
            </Button>
          </Link>

          <Nav.Link href="#link" className="m-1">
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
          </Nav.Link>
        </Nav>
      </Navbar>
      {/* 
      <Navbar
        className={dropShadow ? "drop-shadow nav-priconmob" : "nav-priconmob"}
        bg="white"
        fixed={!(sidebar || searchbar || catbar) ? "top" : null}
        // style={{
        //   height: "10vh",
        // }}
      >
        <Nav className="sldbtn">
          <div onClick={() => setSidebar(!sidebar)}>
            <img
              src="/images/menu.png"
              alt="logo"
              onMouseOver={(e) =>
                (e.currentTarget.src = "/images/menu_dark.png")
              }
              onMouseOut={(e) => (e.currentTarget.src = "/images/menu.png")}
              style={{
                width: "24px",
                margin: "10px",
              }}
            />
          </div>
          <Link to={`/`}>
            <Navbar.Brand href="#home">
              <img
                src="/images/logo.svg"
                className="navbrand"
                width="150px"
                alt="logo"
              />
            </Navbar.Brand>
          </Link>

          <div onClick={() => setSearchbar(!searchbar)}>
            <img
              src="/images/search.png"
              alt="logo"
              onMouseOver={(e) =>
                (e.currentTarget.src = "/images/search_dark.png")
              }
              onMouseOut={(e) => (e.currentTarget.src = "/images/search.png")}
              style={{
                width: "24px",
                margin: "10px",
              }}
            />
          </div>
        </Nav>
      </Navbar> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.user,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
