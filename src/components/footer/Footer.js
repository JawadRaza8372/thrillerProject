import React from "react";
import "./Footer.css";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import facebook from '../../assets/Home/facebook.jpg';
import insta from '../../assets/Home/insta.png';
import twitter from '../../assets/Home/twitter.png';

const Footer = () => {
  return (
    <footer className="footerMain">
      {/* <hr />   */}
      <Row justify="center" align="middle" className="centerr footer">
        <Col xs={12} sm={12} md={12} lg={12} xl={10} className="footerLogos">
          <a href="https://www.facebook.com/ThrillerMiddleEast/?__tn__=-UC*F">
            {/* <i className="fab fa-facebook-square fa-2x mx-3 logos"></i> */}
            <img src={facebook} style={{ width: 40 }} />
          </a>
          <a href="https://twitter.com/THRILLER_ME">
            {/* <i className="fab fa-twitter fa-2x mx-3 logos"></i> */}
            <img src={twitter} style={{ width: 40 }} />
          </a>
          <a href="https://www.instagram.com/thrillerme/?hl=en">
            {/* <i className="fab fa-instagram-square fa-2x mx-3 logos"></i> */}
            <img src={insta} style={{ width: 33 }} />
          </a>
        </Col>
        <Col className="copy_write_main" xs={12} sm={12} md={12} lg={12} xl={2}>
          <div className="copy-write yyy">
            &copy; 2022 Thriller. All Rights Reserved
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
