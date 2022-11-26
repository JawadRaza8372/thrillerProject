import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import arrow from "../../assets/arrow.png";
import CloseIcon from "@material-ui/icons/Close";
import "./gallery.css";

const ImageGalleryModal = ({ isOpen, onClose, images, count, setCount }) => {
  const [popupData, setPopupData] = useState({});
  const [showUrlPopup, setShowPopupUrl] = useState(false);
  if (!images) {
    return "none";
  }
  return (
    <>
      {isOpen && (
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
              <CloseIcon style={{ fontSize: "14px" }} />
            </button>
            <button
              className="left-button"
              disabled={count <= 0}
              onClick={() => {
                setCount(count - 1);
                setShowPopupUrl(false);
              }}
            >
              <ArrowBackIosIcon style={{ fontSize: "14px" }} />
            </button>
            <button
              className="right-button"
              disabled={count === images?.length - 1}
              onClick={() => {
                setCount(count + 1);
                setShowPopupUrl(false);
              }}
            >
              <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
            </button>

            <div className="image-gallery">
              <img src={images[count].url} alt="Bed" />
            </div>
            <p className="gallery-user-name">{images[count].tag}</p>
          </div>
        </div>
      )}
    </>
  );
};

const ImagePopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [count, setCount] = useState(0);
  console.log("gallery popup", props);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleGetGalleryImages = async () => {
    const images = await axios.get(
      `https://api.thrillerme.com/styles/galleryselected/${props.shoe_id}`
    );
    const metaImages = [
      images.data[0].cover,
      ...images.data[0].meta_tag.split(","),
    ];

    const updatedImages = metaImages.map((item) => {
      return {
        url: item,
        tag: images.data[0].tag,
      };
    });

    setGalleryImages(updatedImages);
    onOpen();
  };

  return (
    <div>
      <ImageGalleryModal
        isOpen={isOpen}
        onClose={onClose}
        images={galleryImages}
        count={count}
        setCount={setCount}
      />
      <div
        className="mobile-gallery-popup"
        onClick={handleGetGalleryImages}
        style={{
          position: "static",
          cursor: "pointer",
          textAlign: "center",
          paddingLeft: 100,
        }}
      >
        <div
          className="image-popup-inner-mob mb-inner  inner-my mob-inner"
          style={{
            padding: 5,
            borderRadius: "5px",
            border: "2px solid #000",
            height: "auto",
          }}
        >
          <img
            src={props.image}
            alt="image"
            id="popup-thumbnail"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
