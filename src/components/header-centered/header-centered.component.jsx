import React from "react";

import { Link } from "react-router-dom";
import "./Header.css";
import { Navbar } from "react-bootstrap";

export const HeaderCentered = () => {
  return (
    <div>
      <Navbar
        className="nav-bar"
        bg="white"
        style={{
          height: "10vh",
        }}
      >
        <Link to={`/`}>
          <Navbar.Brand href="#home">
            <img
              src="/images/logo.svg"
              className="logoCentered"
              width="200px"
              alt="logo"
            />
          </Navbar.Brand>
        </Link>
      </Navbar>
    </div>
  );
};
