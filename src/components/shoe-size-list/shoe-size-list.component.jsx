import React, { Fragment } from "react";
import "./shoe-size-list.styles.scss";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";

import ShoeSize from "../shoe-size/shoe-size.component";
import SHOE_DATA from "../../temporary-data/shoe-data";

export const ShoeSizeList = ({
  displayShoeSize,
  toggleShoeDisplay,
  parentCallBack,
}) => {
  return (
    <Fragment>
      <div className="size-title">
        <h1>Select Size</h1>
        <p>U.S Men Sizes</p>
      </div>
      <Row>
        <Col offset={2} span={8}>
          <div className="shoe-size-container">
            {/* hard coded */}
            {SHOE_DATA.map((shoe) => (
              <ShoeSize
                key={shoe.id}
                shoe={shoe}
                displayShoeSize={displayShoeSize}
                toggleShoeDisplay={toggleShoeDisplay}
                parentCallBack={parentCallBack}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
