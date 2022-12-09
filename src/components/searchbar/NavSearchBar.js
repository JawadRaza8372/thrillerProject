import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import "./Searchbar.scss";
import axios from "axios";
import { SearchResult } from "../../components/search-result/search-result.component";

export const NavSearchBar = ({ allProducts, allBrands }) => {
  const [inputValue, setInputValue] = useState("");

  const history = useHistory();
  const [filterData, setFilterData] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [searchbar, setSearchbar] = useState(true);
  var timer = null;
  const handlechange = (e) => {
    if (e.target.value.length === 0) {
      setSearching(false);
    } else {
      setSearching(true);
    }
    setInputValue(e.target.value);
    const filterproducts = allProducts?.filter(
      (dat, index) =>
        dat?.name?.includes(e.target.value) ||
        dat?.name === e.target.value ||
        dat.sku_number?.includes(e.target.value) ||
        dat.sku_number === e.target.value
    );
    const filterBrands = allBrands?.filter(
      (item, index) =>
        item.title?.includes(e.target.value) || item.title === e.target.value
    );
    console.log("show filtered Products", filterproducts);
    console.log("filteredBrands", filterBrands);
    console.log("all products", allProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="searchBarComponentMain">
      <div className="searchBox">
        <div className="search-container">
          <input
            style={{
              fontWeight: "1000",
              fontSize: "18px",
              textTransform: "uppercase",
            }}
            name="input"
            onChange={handlechange}
            value={inputValue}
            placeholder="TYPE TO SEARCH"
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
      {/* {isSearching ? (
        <i
          className="fas fa-circle-notch fa-spin"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></i>
      ) : null} */}

      {/* {inputValue.length > 0 ? (
        <SearchResult
          className="result"
          SearchResult={filterData}
          setSearchbar={() => setSearchbar(!searchbar)}
          setInputValue={setInputValue}
          searchbar={searchbar}
        />
      ) : null} */}
      <NavDropdown
        title="Browse"
        id="basic-nav-dropdown"
        className="m-1 navs"
        // show={show}
        // onMouseEnter={showDropdown}
        // onMouseLeave={hideDropdown}
      >
        {filterData.map((item, index) => {
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
    </div>
  );
};
