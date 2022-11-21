import React, { useState } from "react";
import "./date-picker-modal.styles.scss";

import Modal from "react-bootstrap/Modal";
import { CustomButton } from "../custom-button/custome-button.component";
import { SearchResult } from "../search-result/search-result.component";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

export const DatePickerModal = ({
  modalStatus,
  setModalStatus,
  handleSubmission,
  sendShoeToPending,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [printLabel, toggleLabel] = useState(true);

  // const handleChange = (event) => {
  //   setSearchValue(event.target.value);
  // };

  const handleDateChange = (date) => {
    setStartDate(date);
    //console.log(date);
  };
  const dateSubmission = () => {
    if (handleSubmission != true) {
      handleSubmission();
    }
    if (sendShoeToPending) {
      sendShoeToPending();
    }
    setModalStatus(false);
    window.open("./shipping.pdf", "_blank");
  };
  return (
    <>
      <Modal
        show={modalStatus}
        onHide={() => setModalStatus(false)}
        dialogClassName="modal-80w"
      >
        <Modal.Header className="modal-title">
          <Modal.Title> Date Picker </Modal.Title>{" "}
        </Modal.Header>{" "}
        <Modal.Body>
          <DatePicker
            dateFormat="MMMM d, yy h:mm aa"
            selected={startDate}
            onChange={(date) => handleDateChange(date)}
          />{" "}
        </Modal.Body>{" "}
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <label style={{ marginRight: "10px" }}>
              {" "}
              Print Shipping Label{" "}
            </label>{" "}
            <input
              checked={printLabel}
              onChange={() => toggleLabel(!printLabel)}
              type="checkbox"
            />
          </div>{" "}
          <CustomButton
            onClick={
              handleSubmission
                ? () => dateSubmission()
                : () => setModalStatus(false)
            }
          >
            {" "}
            Confirm{" "}
          </CustomButton>{" "}
        </Modal.Footer>{" "}
      </Modal>{" "}
    </>
  );
};
