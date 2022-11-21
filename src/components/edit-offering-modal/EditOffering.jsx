import React, { useState, useRef, useEffect } from "react";
import "./EditOffering.scss";
import { CustomButton } from "../custom-button/custome-button.component";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { LaptopWindows } from "@material-ui/icons";
const EditOffering = ({
  showEditModal,
  setEditModal,
  selling,
  shoe,
  buying,
}) => {
  const location = useLocation();
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEditModal(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const [expiryDate, setExpiryDate] = useState(shoe.expiry);
  const [price, setPrice] = useState(shoe.askingPrice);
  const [offer, setOffer] = useState(shoe.offerAmount);
  const handleChange = (event) => {
    selling ? setPrice(event.target.value) : setOffer(event.target.value);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className="edit-offering-container">
      <div className="eo-heading">
        <span>Edit Offering</span>
      </div>
      {location.pathname === "/selling-section" ? (
        <div className="eo-expiry">
          <label className="returnable-label">Expiry Date</label>
          <select
            dir="rtl"
            className="select-return"
            onChange={(event) => {
              setExpiryDate(event.target.value);
            }}
            value={expiryDate}
          >
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={90}>90</option>
          </select>
        </div>
      ) : null}

      <div className="eo-price">
        <label className="returnable-label">Price</label>
        <div className="price-form">
          {selling ? (
            <input
              onChange={handleChange}
              placeholder="Enter price"
              value={price}
            ></input>
          ) : (
            <input
              onChange={handleChange}
              placeholder="Enter price"
              value={offer}
            ></input>
          )}
        </div>
      </div>
      <div className="eo-buttons">
        <div className="eo-delete">
          <CustomButton
            onClick={() => {
              setEditModal(false);
              if (selling === true) {
                axios
                  .delete(
                    `https://api.thrillerme.com/listing/${shoe.listing_id}/${shoe.shoe_id}/${shoe.size}`
                  )
                  .then((res) => {
                    //console.log("Success", res.data);
                    //console.log(res.data);
                    window.location.reload();
                  })
                  .catch((err) => {
                    //console.log(err);
                    alert("Something Went Wrong");
                  });
              }
              if (buying === true) {
                //console.log(shoe);
                axios
                  .delete(
                    `https://api.thrillerme.com/offers/${shoe.offers_id}/${shoe.shoe_id}/${shoe.size}`
                  )
                  .then((res) => {
                    //console.log("Success", res.data);
                    //console.log(res.data);
                    window.location.reload();
                  })
                  .catch((err) => {
                    //console.log(err);
                    alert("Something Went Wrong");
                  });
              }
            }}
            style={{ height: "20px" }}
            size="smallInverted"
          >
            Delete
          </CustomButton>
        </div>
        <div className="eo-save">
          <CustomButton
            onClick={() => {
              setEditModal(false);
              if (selling === true) {
                const data = {
                  askingPrice: parseFloat(price),
                  expiry: parseInt(expiryDate),
                  shoe_id: parseInt(shoe.shoe_id),
                  size: shoe.size,
                  postedOn: shoe.postedOn.split("T")[0],
                  shipping: parseFloat(shoe.shippingFee),
                };
                //console.log(data);
                axios
                  .put(
                    `https://api.thrillerme.com/listing/${shoe.listing_id}`,
                    data
                  )
                  .then((res) => {
                    //console.log("Success", res.data);
                    //console.log(res.data);
                    window.location.reload();
                  })
                  .catch((err) => {
                    //console.log(err);
                    alert("Something Went Wrong");
                  });
              }
              if (buying === true) {
                const data = {
                  offerAmount: parseFloat(offer),
                  shoe_id: parseInt(shoe.shoe_id),
                  size: shoe.size,
                  shipping: parseFloat(shoe.shippingFee),
                };
                //console.log(shoe);
                axios
                  .put(
                    `https://api.thrillerme.com/offers/${shoe.offers_id}`,
                    data
                  )
                  .then((res) => {
                    //console.log("Success", res.data);
                    window.location.reload();
                  })
                  .catch((err) => {
                    //console.log(err);
                    alert("Something Went Wrong");
                  });
              }
            }}
            style={{ height: "20px" }}
            size="smallInverted"
          >
            Save
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
export default EditOffering;
