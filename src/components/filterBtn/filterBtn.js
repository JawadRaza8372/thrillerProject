import React from "react";
import "./filterBtn.css";
function filterBtn({ filterComponent, setFilterComponent }) {
  return (
    <div className="filterBtn_buttonContainer">
      <button
        onClick={() => {
          window.scrollTo(0, 0);
          setFilterComponent(!filterComponent);
        }}
        className="filterBtn_buttonContainerBtn_item"
      >
        Filter
      </button>
    </div>
  );
}

export default filterBtn;
