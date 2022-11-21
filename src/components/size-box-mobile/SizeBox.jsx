import React, { Fragment, useState } from "react";
import "./SizeBox.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import localStorage from "redux-persist/es/storage";

const SizeBox = ({
  size,
  price,
  setSizeChart,
  id,
  shoe,
  fav,
  setSizechartFav,
}) => {
  let history = useHistory();
  let lowestAsk = 0;
  async function GetLowsetAsk(sizz) {
    var urlL = `https://api.thrillerme.com/listing/lowest/${id}/${sizz}`;
    //console.log(urlL);
    var encodedURLL = encodeURI(urlL);
    await axios.get(encodedURLL).then((res) => {
      if (res.data.lowest !== null) {
        //console.log(res.data.lowest);
        lowestAsk = res.data.lowest;
      }
    });
  }

  function GoToBuy() {
    GetLowsetAsk(size);
    setTimeout(() => {
      localStorage.setItem("price", lowestAsk);
      history.push(`/buy/${id}/${size}/${lowestAsk}`);
    }, 1000);
    setSizeChart(false);
  }

  function GoToFav() {
    //console.log("check we in");

    var user = localStorage.getItem("user");
    if (user !== null || user !== undefined) {
      var userID = JSON.parse(user).user_id;
      //console.log(userID);
      const data = {
        shoe_id: shoe.shoe_id,
        user_id: userID,
        size: size,
      };

      //console.log("Fav:", data);
      axios
        .post("https://api.thrillerme.com/fav", data)
        .then((res) => {
          console.log("Success", res.data);
          // setRefreshCompenent(!refreshComponent)
          window.location.reload();
          setSizechartFav(false);
          //history.push("/favourites-section");
        })
        .catch((err) => {
          //console.log(err);
          alert("Something Went Wrong");
        });
    } else {
      history.push("/login");
    }
    setSizechartFav(false);
  }

  return (
    <div>
      {fav ? (
        <div className="size-box-container" onClick={GoToFav}>
          <span>{size}</span>
          {price > 0 ? (
            <span style={{ fontSize: "10px", color: "red" }}>
              {Math.floor(price)}
            </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="size-box-container" onClick={GoToBuy}>
          <span>{size}</span>
          {price > 0 ? (
            <span style={{ fontSize: "10px", color: "red" }}>
              AED {Math.floor(price)}
            </span>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default SizeBox;
