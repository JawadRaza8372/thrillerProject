import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pill.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import { validateUAE_Number_test } from "../../Constants/Functions";
import swal from "sweetalert";

const SharePill = ({ text }) => {
  const [contect, setContect] = useState("");
  const [fieldStatus, setFieldStatus] = useState({
    contectNumber: true,
  });
  const handleChange = (e) => {
    setContect(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onSecondOpenModal = () => setSecondOpen(true);
  const onSecondCloseModal = () => setSecondOpen(false);
  function openTabFB() {
    var location = window.location.href;
    window.open(`http://www.facebook.com/share.php?u=${location}`);
    setOpen(false);
  }

  function openTabTwt() {
    var location = window.location.href;
    window.open(`https://twitter.com/intent/tweet?url=${location}`);
    setOpen(false);
  }

  function openTabWatsApp() {
    var location = window.location.href;
    window.open(
      `https://api.whatsapp.com/send?phone=${contect}&text=${location}`
    );
    setOpen(false);
  }
  const activateField = (event) => {
    const { name } = event.target;
    setFieldStatus({ [name]: true });
  };
  // const disableField = (event) => {
  //   const { name } = event.target;
  //   setFieldStatus({ ...fieldStatus, [name]: false });
  // };

  const handleSubmit = () => {
    if (!validateUAE_Number_test(contect)) {
      swal({
        title: "Error!",
        text: "Please Enter the Correct Contact Number",
        icon: "error",
      });
      //console.log(contect);
      return;
    }

    openTabWatsApp();
  };

  return (
    <div>
      <button
        type="button"
        class="btn rounded-pill shrbtn "
        onClick={onOpenModal}
      >
        <i class="fas fa-arrow-up"></i>
        &nbsp;{text}
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className="mt-5"></h2>
        <div className="d-flex justify-content-center">
          <div className="sharePill_modalIcon mx-3">
            <i onClick={openTabFB} class="fab fa-facebook-f"></i>
          </div>
          <div className="sharePill_modalIcon mx-3">
            <i onClick={onSecondOpenModal} class="fab fa-whatsapp"></i>
            {
              <Modal open={secondOpen} onClose={onSecondCloseModal} center>
                <div className="sharePillInputText my-3 mx-3">
                  <h4>Contact Number</h4>
                  <div className="SharePillform-container my-3">
                    <label htmlFor={1}></label>
                    <input
                      placeholder="+9715******"
                      id={1}
                      name="contectNumber"
                      type="text"
                      onChange={handleChange}
                      // onFocus={activateField}
                      // onBlur={disableField}
                      value={contect}
                    />
                  </div>
                  <div className="ttbutton-container">
                    <CustomButton onClick={handleSubmit}>Share</CustomButton>
                  </div>
                </div>
              </Modal>
            }
          </div>
          <div onClick={openTabTwt} className="sharePill_modalIcon mx-3">
            <i class="fab fa-twitter"></i>
          </div>
          {/* <div
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setOpen(false);
            }}
            className="sharePill_modalIcon mx-3"
          >
            <i class="far fa-copy"></i>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default SharePill;
