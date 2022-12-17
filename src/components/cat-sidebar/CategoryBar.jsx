import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoryBar.scss";
import categories from "../../temporary-data/categories";
import axios from "axios";
import { mylocalStorage } from "../../Constants/Functions";

const CategoryBar = ({ allBrands, catbar, setCatbar, sidebar, setSidebar }) => {
  const onCatClick = (path) => {
    setSidebar(false);
    setCatbar(false);
    mylocalStorage.setItem("filter", null);
    window.open(`https://thrillerme.com/browse/${path}/`, "_self");
  };
  const onCatClickDone = () => {
    setSidebar(true);
    setCatbar(false);
  };

  const [collection, setsetCollection] = useState([]);
  var urlTo = "";

  // Similar to componentDidMount and componentDidUpdate:

  function Load() {
    ////console.log("Laoding Collection");
    var url = `https://api.thrillerme.com/collections`;
    var encodedURL = encodeURI(url);
    axios.get(encodedURL).then((res) => {
      setsetCollection(res.data);
    });
    if (window.location.href.indexOf("browse") > -1) {
      urlTo = "";
    } else {
      urlTo = "browse";
    }
  }

  return (
    <>
      <div
        className={catbar ? "clear" : "nav-menu"}
        onClick={() => setCatbar(!catbar)}
      ></div>
      <nav className={catbar ? "nav-menu active" : "nav-menu"}>
        <div className="heading-container">
          <div className="back-icon" onClick={() => onCatClickDone()}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="heading-text">Collections</div>
        </div>

        <ul className="nav-menu-items">
          <li className="navbar-toogle">
            <Link to="#" className="menu-bars"></Link>
          </li>
          {allBrands.length > 0
            ? allBrands.map((item, index) => {
                return (
                  <li
                    style={{ border: "5px", borderColor: "black" }}
                    key={index}
                    className="li"
                    onClick={() => onCatClick(item.collection_id)}
                  >
                    <Link
                      className="nav-text"
                      // to={`/browse/${item.collection_id}`}
                    >
                      <span>
                        <div className="hover">{item.title}</div>
                      </span>
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
      </nav>
    </>
  );
};

export default CategoryBar;
