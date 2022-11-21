import React, { useState } from "react";
import "./sell-page.styles.scss";

import { SearchResult } from "../../components/search-result/search-result.component";
import axios from "axios";
import { GETSEARCHEDSHOES } from "../../Constants/Global";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";

export const SellPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shoes, setShoes] = useState(null);
  const [isSearching, setSearching] = useState(false);
  var timer = null;

  const handleChange = async (event) => {
    //console.log(event.target.value);
    setSearching(true);
    setSearchValue(event.target.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      axios
        .get(GETSEARCHEDSHOES + event.target.value)
        .then((res) => {
          //console.log(res.data);
          setShoes(res.data);
          setSearching(false);
        })
        .catch((err) => {});
    }, 5000);
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
