import React from "react";
import "./help-page.styles.scss";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";
import help_graph_2 from "./graph_new.png";
import shoe from "./shoe_anim.gif";
import { Fragment } from "react";
import Carousel from "../../components/review-carousel/reviewCarousel";

export const HelpPage = () => {
  return (
    <Fragment>
      <div className="helpContainer">
        <Row justify="center" className="outer">
          <Col className="red" xs={12} sm={12} md={6} lg={4} xl={4}>
            <img
              src="../../images/1-01.png"
              alt="logo"
              style={{
                height: "200px",
                marginBottom: "20px",
              }}
            />
            <h4>List</h4>
            <p>
              Seller's list items for sale or sell immediately, <br></br>
              while buyers pursue countless listings.
            </p>
          </Col>
          <Col className="red" xs={12} sm={12} md={6} lg={4} xl={4}>
            <img
              src="../../images/1-02.png"
              alt="logo"
              style={{
                height: "200px",
                marginBottom: "20px",
              }}
            />
            <h4>Authenticate</h4>
            <p>
              Prepare to ship item to checking facility.<br></br> Once
              authenticated, your item is shipped.
            </p>
          </Col>
          <Col className="red" xs={12} sm={12} md={6} lg={4} xl={4}>
            <img
              src="../../images/1-03.png"
              alt="logo"
              style={{
                height: "200px",
                marginBottom: "20px",
              }}
            />
            <h4>Prosper</h4>
            <p>Sit back and wait for your payout.</p>
          </Col>
        </Row>

        {/* <div
          // justify="center"
          className="sectionOne"
        >
          <div className="gif-container" style={{}}>
            <img src={help_graph_2} alt="logo"></img>
          </div>

          <div style={{}} className="img-container">
            <img src={shoe} alt="logo"></img>
          </div>

          <div className="empty-space"></div>

          <div className="text-container">
            <p className="d-flex flex-column justify-content-center">
              <strong>Visibility</strong>
              <span>Understand true market price</span>
            </p>
            <p className="d-flex flex-column justify-content-center">
              <strong>Transparency</strong>
              <span>Buy and Sell smarter than ever</span>
            </p>
            <p className="d-flex flex-column justify-content-center">
              <strong>Power</strong>
              <span>Bid or Buy, easily and efficiently</span>
            </p>
          </div>
        </div> */}

        {/* <Row
          className="sectionOne"
          style={{
            marginTop: "220px",
          }}
        >
          <Col span={8} style={{ border: "1px solid red" }}>
            <img
              src="https://appick.io/u/thriller/thriller.gif"
              alt="logo"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
          </Col>
          <Col span={4} xs={12} sm={12} md={6} lg={4} xl={4}>
            <img
              src="https://thriillerr.web.app/static/media/4.e415a05e.png"
              alt="logo"
              style={{
                marginBottom: "20px",
              }}
            />
          </Col>
          <Col
            span={4}
            style={{
              margin: "auto",
              top: "0",
              bottom: "0",
            }}
          >
            <h4>Title here</h4>
            <p>Lorme epsmm srwet ewkkqwo dsdkk</p>
          </Col>
        </Row> */}
      </div>
      <Carousel />
      <Links />
      <Footer />
    </Fragment>
  );
};
