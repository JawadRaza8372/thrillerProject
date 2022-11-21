import React, { useState, useEffect } from "react";
import "./SizeSelectorMobile.scss";
import { sizes } from "../../temporary-data/sizes";
import SizeBox from "../size-box-mobile/SizeBox";
import axios from "axios";
import { useParams } from "react-router-dom";
const SizeSelectorMobile = ({
  setSizeChart,
  id,
  fav,
  setSizechartFav,
  shoe,
  userID,
  setSizeFav,
  sizeFav,
}) => {
  const [lowestAsk, setLowestAsk] = useState(0);
  const [shoeSizes, setShowSizes] = useState([]);
  const params = useParams();
  //console.log(params);

  useEffect(() => {
    getSizes(params.id);
  }, [params]);

  useEffect(() => {
    getSizes(shoe.shoe_id);
  }, [shoe]);

  const getSizes = async (showID) => {
    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/shoeCost/${showID}`
    );
    // //console.log(data.data);
    setShowSizes(data.data);
    //console.log(shoeSizes);
  };
  //console.log(shoe.shoe_id);

  return (
    <div className="size-selector-mob">
      <div class="d-flex flex-row justify-content-between">
        <span style={{ fontSize: "19px", margin: "7px", fontWeight: "600" }}>
          Select A US Men's Size
        </span>
        <i
          onClick={() => setSizeChart(false)}
          class="fas fa-times fa-2x"
          style={{ margin: "10px", marginBottom: "0px", marginTop: "5px" }}
        ></i>
      </div>
      <div className="sizeboxes-container">
        {fav
          ? shoeSizes.map((size, index) => {
              return (
                <SizeBox
                  key={index}
                  size={size.size}
                  price={size.cost}
                  setSizeChart={setSizeChart}
                  lowestAsk={lowestAsk}
                  id={id}
                  shoe={shoe}
                  fav={fav}
                  setSizechartFav={setSizechartFav}
                />
              );
            })
          : shoeSizes.map((size, index) => {
              return (
                <SizeBox
                  key={index}
                  size={size.size}
                  price={size.cost}
                  setSizeChart={setSizeChart}
                  lowestAsk={lowestAsk}
                  id={id}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SizeSelectorMobile;
