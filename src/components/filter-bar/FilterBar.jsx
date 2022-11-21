import React from "react";
import "./Filterbar.scss";
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from "axios";

const FilterBar = ({ setProducts }) => {
  const history = useHistory();

  const handleReq = async (param) => {
    var myCollectionID = localStorage.getItem("myCollectionID");

    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/collections/${myCollectionID}/tag/${param}`
    );
    setProducts([]);
    setProducts(data);
    console.log("filtersettocat");
    window.localStorage.setItem("filter", JSON.stringify(data));
    window.scrollTo(0, 0);
    // //console.log(data);
  };

  const handleReqReset = async () => {
    var myCollectionID = localStorage.getItem("myCollectionID");

    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/collections/${myCollectionID}`
    );
    setProducts([]);
    setProducts(data);
  };

  return (
    <div className="fb-container">
      <div className="sec-heading">Categories</div>
      <div className="sec-text">
        <Link>
          <span
            onClick={() => handleReqReset()}
            style={{ textDecoration: "underline" }}
          >
            Reset
          </span>
        </Link>
      </div>
      <div className="sec-text">
        <Link>
          <span onClick={() => handleReq("men")}>Men</span>
        </Link>
      </div>
      <div className="sec-text">
        <Link>
          <span onClick={() => handleReq("woman")}>Women</span>
        </Link>
      </div>
      <div className="sec-text">
        <Link>
          <span onClick={() => handleReq("men")}>Youth</span>
        </Link>
      </div>

      <div className="sec-text">
        <Link to="/browse/0">
          <span>Collection</span>
        </Link>
      </div>
    </div>
  );
};

export default FilterBar;
