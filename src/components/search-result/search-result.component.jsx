import React from "react";
import "./search-result.styles.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SearchItem } from "../search-item/search-item.component";

export const SearchResult = ({
  SearchResult,
  setSearchbar,
  setInputValue,
  searchbar,
}) => {
  const location = useLocation();
  // return SHOE_DATA.filter((shoe) =>
  //   shoe.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  //     ? shoe
  //     : null
  // ).map((shoe) => <SearchItem shoe={shoe} />);

  return (
    <div className="searchManDiv">
      {SearchResult && location.pathname === "/favourites-section"
        ? SearchResult.map((val, ind) => (
            <SearchItem
              shoe={val}
              key={ind + " "}
              setSearchbar={setSearchbar}
              setInputValue={setInputValue}
              searchbar={searchbar}
              linkCheck={false}
            />
          ))
        : SearchResult
        ? SearchResult.map((val, ind) => (
            <SearchItem
              shoe={val}
              key={ind + " "}
              setSearchbar={setSearchbar}
              setInputValue={setInputValue}
              searchbar={searchbar}
            />
          ))
        : null}
    </div>
  );
};
