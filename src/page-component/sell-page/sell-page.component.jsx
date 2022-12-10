import React, { useState } from "react";
import "./sell-page.styles.scss";

import { SearchResult } from "../../components/search-result/search-result.component";
import axios from "axios";
import { GETSEARCHEDSHOES } from "../../Constants/Global";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";
import { makingValidName } from "../../Constants/Functions";

export const SellPage = ({ allProducts }) => {
  const [searchValue, setSearchValue] = useState("");
  const [shoes, setShoes] = useState([]);
  const [isSearching, setSearching] = useState(false);
  var timer = null;

  const handleChange = async (event) => {
    setSearchValue(event.target.value);
    var enterdValue = makingValidName(`${event.target.value}`);
    setSearching(true);
    await setShoes(
      allProducts?.filter(
        (dat, index) =>
          makingValidName(`${dat.name}`)?.includes(enterdValue) ||
          makingValidName(`${dat.name}`) === enterdValue ||
          makingValidName(`${dat.sku_number}`)?.includes(enterdValue) ||
          makingValidName(`${dat.sku_number}`) === enterdValue
      )
    );
    setSearching(false);
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   axios
    //     .get(GETSEARCHEDSHOES + event.target.value)
    //     .then((res) => {
    //       //console.log(res.data);
    //       setShoes(res.data);
    //       setSearching(false);
    //     })
    //     .catch((err) => {});
    // }, 5000);
  };

  return (
    <div>
      <div className="container">
        <div className="secondary-container">
          <div className="text-container">
            <h3>Choose a product</h3>
          </div>
          <hr></hr>
        </div>
        <div className="search-container-sell">
          <input placeholder="Search..." onChange={handleChange} />
          <i className="fas fa-search"></i>
          {searchValue.length > 0 ? (
            <SearchResult className="result" SearchResult={shoes} />
          ) : null}
          {isSearching ? (
            <i
              className="fas fa-circle-notch fa-spin"
              style={{
                textAlign: "center",
                position: "absolute",
                right: "-90%",
              }}
            ></i>
          ) : null}
        </div>
      </div>
      <a href="mailto:thefuture@thrillerme.com">
        <div className="bottomx">
          <p className="bottom">Can't find your product?</p>
        </div>
      </a>
      <Links />
      <Footer />
    </div>
  );
};
