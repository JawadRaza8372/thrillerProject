import { useState } from "react";
import arrow from "../../assets/arrow.png";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import { makingValidName } from "../../Constants/Functions";

export const ImagePopup = (props) => {
  console.log("imagepopup wali file", props);
  const newname = makingValidName(`${props.fulldata.name}`);
  const newskunumb = makingValidName(`${props.fulldata.sku_number}`);
  const newshoeid = makingValidName(`${props.fulldata.shoe_id}`);
  return (
    <Link
      to={`/${newname}_id_${newshoeid}`}
      style={{ fontSize: 18, fontWeight: "600", color: "#000" }}
    >
      {props.image && (
        <div className="image-popup">
          <div className="image-popup-inner">
            <img src={props.image} alt="image" width="40px" />
            <p className="shop-title">{props.title}</p>
            <ArrowForwardIosIcon style={{ fontSize: 14 }} />
          </div>
        </div>
      )}
    </Link>
  );
};

const ImageGalleryModal = ({ isOpen, onClose, images, count, setCount }) => {
  console.log("isOpen", isOpen);

  const [popupData, setPopupData] = useState({});
  const [showUrlPopup, setShowPopupUrl] = useState(false);
  if (!images) {
    return "none";
  }
  return (
    <div
      className="image-gallery-modal"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="total-images-count">
        <span>{count + 1 < 10 ? `0${count + 1}` : count + 1}</span>
        <hr />
        <span>{images?.length}</span>
      </div>
      <div className="outer-container">
        <button className="close-button" onClick={onClose}>
          <CloseIcon className="modal-icons" style={{ fontSize: "14px" }} />
        </button>
        <button
          className="left-button"
          disabled={count <= 0}
          onClick={() => {
            setCount(count - 1);
            setShowPopupUrl(false);
          }}
        >
          <ArrowBackIosIcon
            className="modal-icons"
            style={{ fontSize: "14px" }}
          />
        </button>
        <button
          className="right-button"
          disabled={count === images?.length - 1}
          onClick={() => {
            setCount(count + 1);
            setShowPopupUrl(false);
          }}
        >
          <ArrowForwardIosIcon
            className="modal-icons"
            style={{
              fontSize: "14px",
            }}
          />
        </button>

        <div className="image-gallery">
          <img src={images[count].url} alt="Bed" />
          <ImagePopup
            image={popupData.cover_image}
            title={popupData.name}
            shoeId={popupData.shoe_id}
            fulldata={popupData}
          />
          <div className="marker-container">
            <img
              src={arrow}
              onClick={async () => {
                setShowPopupUrl(!showUrlPopup);
                const resp = await axios.get(
                  `https://api.thrillerme.com/shoes/${images[count].shoeId}`
                );

                setPopupData(resp.data);
              }}
            />
          </div>
        </div>
        <p className="gallery-user-name">{images[count].tag}</p>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
