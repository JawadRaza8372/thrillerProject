import { CloseSharp, Facebook, Twitter, WhatsApp } from "@material-ui/icons";
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
      <Modal open={open} onClose={onCloseModal}>
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "200px",
              background: "white",
              position: "absolute",
              bottom: "2vh",
            }}
          >
            <div className="col-md-10 col-lg-8 mx-auto">
              <div className="titleContSocialShare">
                <h1>Share</h1>
                <button onClick={onCloseModal} className="btn float-right">
                  <CloseSharp />
                </button>
              </div>
              <div className="socailBtnsContaineShare">
                <div onClick={openTabFB} className="newSocialBtn">
                  <Facebook />
                  <span>Facebook</span>
                </div>
                <div onClick={onSecondOpenModal} className="newSocialBtn">
                  <WhatsApp />
                  <span>WhatsApp</span>
                </div>
                <div onClick={openTabTwt} className="newSocialBtn">
                  <Twitter />
                  <span>Twitter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={secondOpen} onClose={onSecondCloseModal} center>
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "230px",
              background: "white",
              position: "absolute",
              bottom: "2vh",
            }}
          >
            <div className="col-md-10 col-lg-8 mx-auto">
              <div className="titleContSocialShare">
                <h1>Contact Number</h1>
                <button
                  onClick={onSecondCloseModal}
                  className="btn float-right"
                >
                  <CloseSharp />
                </button>
              </div>
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
