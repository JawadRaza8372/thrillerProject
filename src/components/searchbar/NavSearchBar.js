import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import "./Searchbar.scss";
import { CustomSearchResultItem } from "../search-item/CustomSearchResultItem";
import { makingValidName } from "../../Constants/Functions";
import { CloseSharp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export const NavSearchBar = ({ allProducts, allBrands }) => {
  const newhistory = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterBrands, setfilterBrands] = useState([]);
  const [searchbar, setSearchbar] = useState(false);
  const handlechange = (e) => {
    if (e.target.value.length === 0) {
      setSearchbar(false);
    } else {
      setSearchbar(true);
    }
    setInputValue(e.target.value);
    var enterdValue = makingValidName(`${e.target.value}`);
    setFilterProducts(
      allProducts?.filter(
        (dat, index) =>
          makingValidName(`${dat.name}`)?.includes(enterdValue) ||
          makingValidName(`${dat.name}`) === enterdValue ||
          makingValidName(`${dat.sku_number}`)?.includes(enterdValue) ||
          makingValidName(`${dat.sku_number}`) === enterdValue
      )
    );
    setfilterBrands(
      allBrands?.filter(
        (item, index) =>
          makingValidName(`${item.title}`)?.includes(enterdValue) ||
          makingValidName(`${item.title}`) === enterdValue
      )
    );
  };

  return (
    <>
      <div className="searchContainerCont">
        <div className="CustomSearchContainer" style={{ margin: "0px" }}>
          <i className="fas fa-search"></i>

          <input
            className="searchInput"
            name="input"
            onChange={handlechange}
            value={inputValue}
            placeholder="TYPE TO SEARCH"
          />
          {inputValue.length > 0 && (
            <button
              onClick={() => {
                setInputValue("");
                setSearchbar(false);
              }}
              className="closeBtn"
            >
              <CloseSharp />
            </button>
          )}
        </div>
        <NavDropdown
          title=""
          id="basic-nav-dropdown"
          className="navs"
          show={searchbar}
        >
          <div className="fixedHeightDiv">
            {filterProducts.map((dat, index) => {
              const newname = makingValidName(`${dat.name}`);
              const newshoeid = makingValidName(`${dat.shoe_id}`);

              return (
                <CustomSearchResultItem
                  imgUrl={dat.cover_image}
                  title={dat?.name}
                  description={`Sku Number: ${dat?.sku_number}`}
                  toLink={() => {
                    newhistory.push(`/${newname}_id_${newshoeid}`);
                    setInputValue("");
                    setSearchbar(false);
                  }}
                />
              );
            })}

            {filterBrands.map((item, index) => {
              return (
                <>
                  <CustomSearchResultItem
                    imgUrl={item.imageURL}
                    title={item.title}
                    description={item.description}
                    toLink={() => {
                      newhistory.push(`/browse/${item.collection_id}/`);
                      setInputValue("");
                      setSearchbar(false);
                    }}
                  />
                </>
              );
            })}
          </div>
        </NavDropdown>
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
    </>
  );
};
