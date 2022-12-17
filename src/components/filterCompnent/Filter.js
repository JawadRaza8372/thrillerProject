import React from "react";
import "./filter.css";
import FilterBar from "../filter-bar/FilterBar";
import { Link } from "react-router-dom";
import SizeSelector from "../size-selector/SizeSelector";
import axios from "axios";

function FilterComponentt({
  setProducts,
  setFilterComponent,
  filterComponent,
}) {
  //console.log("########### A ############", setFilterComponent);

  const handleReq = async (param) => {
    var myCollectionID = window.localStorage.getItem("myCollectionID");

    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/collections/${myCollectionID}/tag/${param}`
    );
    setProducts([]);
    setProducts(data);
    window.localStorage.setItem("filter", JSON.stringify(data));
    // //console.log(data);
  };

  const handleClick = async (param) => {
    if (param === "reset") {
      var myCollectionID = window.localStorage.getItem("myCollectionID");

      const { data } = await axios.get(
        `https://api.thrillerme.com/shoes/collections/${myCollectionID}`
      );
      setProducts([]);
      setProducts(data);
      window.localStorage.setItem("filter", JSON.stringify(data));
    } else {
      handleReq(param);
    }
    setFilterComponent(!filterComponent);
  };

  return (
    <div className="filterComponent_ComponentContainer">
      <div className="filterComponent_ComponentHeader text-center">
        <span
          className="filterComponent_closeBtn"
          onClick={() => setFilterComponent(!filterComponent)}
        >
          cancel
        </span>
        <span>
          <h3>Filter</h3>
        </span>
        <Link>
          <span
            className="filterComponent_resetBtn"
            onClick={() => handleClick("reset")}
          >
            reset
          </span>
        </Link>
      </div>
      <div className="filterComponent_headerDevider"></div>
      <div className="filterComponent_body">
        <div>
          <h4>Categories</h4>
        </div>
        <div className="filterComponent_categoriesBtns">
          <div className="filterComponent_StartTwoBtn">
            <span className="filterComponent_categoriesBtn">
              <button
                className="filterComponent_catogriesEachButton"
                onClick={() => handleClick("men")}
              >
                Men
              </button>
            </span>
            <span className="filterComponent_categoriesBtn">
              <button
                className="filterComponent_catogriesEachButton"
                onClick={() => handleClick("woman")}
              >
                Women
              </button>
            </span>
          </div>

          <span className="filterComponent_categoriesBtn">
            <button
              className="filterComponent_catogriesEachButton"
              onClick={() => handleClick("men")}
            >
              Youth
            </button>
          </span>
        </div>

        <SizeSelector
          setProducts={setProducts}
          filterComponent={filterComponent}
          setFilterComponent={setFilterComponent}
        />
      </div>
    </div>
  );
}

export default FilterComponentt;
