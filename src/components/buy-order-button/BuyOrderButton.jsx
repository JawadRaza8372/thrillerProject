import React from "react";
import { Link } from "react-router-dom";
import "./BuyOrderButton.scss";
import { useHistory } from "react-router-dom";
// import localStorage from "redux-persist/es/storage";

const BuyOrderButton = (props) => {
  ////console.log("Props", props);
  let history = useHistory();
  function GoToBuy() {
    var user = localStorage.getItem("user");
    history.push(`/buy/${props.id}/${props.size}/0`);
    localStorage.setItem("price", props.lowestAsk);
    // if (user === null) {
    //   localStorage.setItem("coming", props.lowestAsk);
    //   history.push("/login");

    // }
    // else{
    //   console.log("not user")
    //   localStorage.setItem("price", props.lowestAsk);
    //   history.push(`/buy/${props.id}/${props.size}/0`);
    // }
  }

  return (
    <div>
      <div className="buy-order-container">
        <div className="price-part">
          <div>{parseInt(props.price)}</div>
          <div>AED</div>
        </div>
        <div className="divider"></div>

        <div className="link-edit">
          <div className="buy-offer-part" onClick={GoToBuy}>
            <div className="buy-part">Buy</div>
            <div>or Offer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyOrderButton;
