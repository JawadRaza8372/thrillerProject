import React, { useState } from "react";
import "./returnable-cell.styles.scss";
import { ToolTip } from "../tool-tip/tool-tip.component";
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { connect } from "react-redux";
import * as Actions from "../../Redux/Actions";

const ReturnableCell = ({ saveDays }) => {
  const [selectedButton, toggleButton] = useState(1);
  const [displayToolTip, toggleToolTip] = useState(false);
  return (
    <div>
      <Row>
        <Col
          xs={12}
          sm={12}
          xl={4}
          style={{
            marginTop: "7px",
          }}
        >
          <img
            src="https://dk0pm9zdlq16s.cloudfront.net/8c6183ac-915b-4638-aaa3-651d8bc89e15.png"
            alt="icon"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
          <label
            className="returnable-label"
            style={{
              marginLeft: "10px",
            }}
          >
            Expiry Date{" "}
            <i
              onMouseOver={() => toggleToolTip(true)}
              onMouseOut={() => toggleToolTip(false)}
              className="fas fa-question-circle question"
              type="button"
            >
              {displayToolTip ? (
                <ToolTip text="You can select the number of days until a listing expires. We'll send you an email when it is about to expire so you can renew it or let it go." />
              ) : null}
            </i>
            :
          </label>
        </Col>
        <Col xl={8} sm={12} xs={12}>
          <div className="returnable-cell-container">
            <button
              className={selectedButton == 1 ? "active" : "inactive"}
              onClick={() => {
                toggleButton(1);
                saveDays(30);
              }}
            >
              30 days
            </button>
            <button
              className={selectedButton == 2 ? "active" : "inactive"}
              onClick={() => {
                saveDays(60);
                toggleButton(2);
              }}
            >
              60 days
            </button>
            <button
              className={selectedButton == 3 ? "active" : "inactive"}
              onClick={() => {
                saveDays(90);
                toggleButton(3);
              }}
            >
              90 days
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDays: (data) => {
      dispatch({ type: Actions.SAVE_DAYS, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnableCell);
