import React, { useState } from "react";
import "./favourites-section.styles.scss";

import { CustomButton } from "../custom-button/custome-button.component";
import { FavouriteTable } from "../favourite-table/favourite-table.component";
import { FavouriteModal } from "../favourites-modal/favourites-modal.component";

export const FavouriteSection = () => {
  const [modalStatus, setModalStatus] = useState(false);
   
  return (
    <div className="favourites-container">
      <div className="favourites-header">
        <h2>FAVOURITES</h2>
        <CustomButton onClick={() => setModalStatus(!modalStatus)} size="small">
          Add Item
        </CustomButton>
        <FavouriteModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      </div>
      <FavouriteTable />
    </div>
  );
};
