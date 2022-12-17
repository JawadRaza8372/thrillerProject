import { red } from "@material-ui/core/colors";
import React from "react";
import { connect } from "react-redux";
import "./shoe-size.styles.scss";
import * as Actions from "../../Redux/Actions";
import { mylocalStorage } from "../../Constants/Functions";

const ShoeSize = ({
  shoe,
  displayShoeSize,
  toggleShoeDisplay,
  saveShoe,
  parentCallBack,
}) => {
  const { id, price } = shoe;

  function handleClick(displayShoeSize, toggleShoeDisplay, shoe, sizeID) {
    //console.log(sizeID);
    let data = {
      ...shoe,
      shoe_id: displayShoeSize[1].shoe_id,
      sizeID: sizeID,
    };

    mylocalStorage.setItem("shoeSize", sizeID);
    saveShoe(data);

    toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]]);
    parentCallBack(sizeID);
    //Send the size back using this to the parent Shoe Page component
    //So that it can render the sell page for that particular size
    //not being used for much as of right now.
  }

  return (
    <div
      className="shoe-details"
      onClick={() => handleClick(displayShoeSize, toggleShoeDisplay, shoe, id)}
    >
      {/* <p></p> */}
      <p className="price">{id}</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveShoe: (data) => {
      dispatch({ type: Actions.SAVE_SHOE_SIZE, payload: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(ShoeSize);
