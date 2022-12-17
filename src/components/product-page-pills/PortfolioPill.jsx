import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import "./Pill.scss";
import axios from "axios";
import { useHistory, withRouter, useParams } from "react-router-dom";

const PortfolioPill = (props) => {
  let history = useHistory();

  function saveFav(val, size) {
    var user = window.localStorage.getItem("user");
    if (user === null) {
      history.push("/login");
    } else {
      //console.log(JSON.parse(window.localStorage.getItem("favSize")));
      //console.log(parseInt(val));
      const data = {
        shoe_id: parseInt(val),
        user_id: JSON.parse(window.localStorage.getItem("user")).user_id,
        size: JSON.parse(window.localStorage.getItem("favSize")),
      };
      var url = `https://api.thrillerme.com/fav/${
        JSON.parse(window.localStorage.getItem("user")).user_id
      }`;
      axios.get(url).then((res) => {
        //console.log(url, res.data);
        // setFavData(res.data);
      });

      ////console.log("Fav:", data);
      axios
        .post("https://api.thrillerme.com/fav", data)
        .then((res) => {
          //console.log("Success", res.data);
          //console.log(res.data);
          if (res.data === "already added") {
            alert("Already added to favourite!");
          } else {
            alert("Added to favourite!");
          }
        })
        .catch((err) => {
          //console.log(err);
          alert("Something Went Wrong");
        });
    }
  }
  return (
    <div>
      <button
        data-tip="We will inform you <br> when the price changes"
        type="button"
        className="btn rounded-pill shrbtn shrbtn2"
        onClick={() => saveFav(props.shoe_id, props.favSize)}
      >
        <i className="fas fa-heart"></i>
        &nbsp; <span>{props.text}</span>
        <ReactTooltip
          place="bottom"
          type="light"
          effect="solid"
          backgroundColor="white"
          textColor="black"
          multiline={true}
          className="data-class"
          border={true}
          borderColor="black"
        />
      </button>
    </div>
  );
};

export default PortfolioPill;

// function saveFav(val) {
//   var user = window.localStorage.getItem("user");
//   if (user === null) {
//     history.push("/login");
//   } else {
//     const data = {
//       shoe_id: parseInt(val),
//       user_id: JSON.parse(window.localStorage.getItem("user")).user_id,
//     };

//     var url = `https://api.thrillerme.com/fav/${data.user_id}`;
//     axios.get(url).then((res) => {
//       //console.log(url, res.data);
//       let check = false;
//       res.data.forEach(checkFav);

//       function checkFav(value, index, array) {
//         //console.log("val: " + value.shoe_id);
//         //console.log("data: " + data.shoe_id);
//         if (value.shoe_id === data.shoe_id) {
//           check = true;
//           //console.log(check);
//         }
//       }

//       if (check) {
//         alert("Shoe already in favourites!");
//       } else {
//         axios
//           .post("https://api.thrillerme.com/fav", data)
//           .then((res) => {
//             //console.log(data.shoe_id);
//             ////console.log("Success", res.data);
//             alert("Added to favorite!");
//           })
//           .catch((err) => {
//             //console.log(err);
//             alert("Something Went Wrong");
//           });
//       }
//     });
//   }
