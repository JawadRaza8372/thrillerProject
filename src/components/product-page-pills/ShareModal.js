import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import swal from "sweetalert";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import { validateUAE_Number_test } from "../../Constants/Functions";
const ShareModal = ({ open, onCloseModal }) => {
  const [secondOpen, setSecondOpen] = useState(false);

  function openTabFB() {
    var location = window.location.href;
    window.open(`http://www.facebook.com/share.php?u=${location}`);
    onCloseModal();
  }

  function openTabTwt() {
    var location = window.location.href;
    window.open(`https://twitter.com/intent/tweet?url=${location}`);
    onCloseModal();
  }
  const [contect, setContect] = useState("");

  function openTabWatsApp() {
    var location = window.location.href;
    window.open(
      `https://api.whatsapp.com/send?phone=${contect}&text=${location}`
    );
    onCloseModal();
  }
  const handleChange = (e) => {
    setContect(e.target.value);
  };
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
  const onSecondOpenModal = () => setSecondOpen(true);
  const onSecondCloseModal = () => setSecondOpen(false);

  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className="mt-5"></h2>
        <div className="d-flex justify-content-center">
          <div className="sharePill_modalIcon mx-3">
            <i onClick={openTabFB} className="fab fa-facebook-f"></i>
          </div>
          <div className="sharePill_modalIcon mx-3">
            <i onClick={onSecondOpenModal} className="fab fa-whatsapp"></i>
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
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
