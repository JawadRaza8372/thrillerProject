import React from "react";
import "./search-result.styles.scss";


// import { SearchItem } from "../search-item/ponent";
import { SearchItem } from "../search-item-searchbar/search-item.component";


export const SearchResult = ({ searchOpen, setRefreshCompenent, refreshComponent, SearchResult }) => {

        // return SHOE_DATA.filter((shoe) =>
        //   shoe.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        //     ? shoe
        //     : null
        // ).map((shoe) => <SearchItem shoe={shoe} />);


        return SearchResult ? SearchResult.map((val, ind) => < SearchItem searchOpen refreshComponent = { refreshComponent }
            setRefreshCompenent = { setRefreshCompenent }
            shoe = { val }
            key = { ind + " " }
            />) : null

        };