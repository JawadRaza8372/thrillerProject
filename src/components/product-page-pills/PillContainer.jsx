import React from "react";
import PortfolioPill from "./PortfolioPill";
import SharePill from "./SharePill";

const PillContainer = ({ shoe_id, favSize }) => {
  return (
    <div className="pill-container">
      <SharePill text="SHARE" />
      <PortfolioPill shoe_id={shoe_id} favSize={favSize} text="FAVOURITE" />
    </div>
  );
};

export default PillContainer;
