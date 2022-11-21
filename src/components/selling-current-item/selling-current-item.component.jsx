import React, { Fragment, useState } from "react";
import "./selling-current-item.styles.scss";
import axios from "axios";
import { DatePickerModal } from "../date-picker-modal/date-picker-modal.component";
import { SearchItem } from "../search-item/search-item.component";
import { CustomButton } from "../custom-button/custome-button.component";
import EditOffering from "../edit-offering-modal/EditOffering";
import ReactPixel from "react-facebook-pixel";

export const SellingCurrentItem = ({
  shoe,
  appendPendingShoeData,
  setCurrentData,
}) => {
  const { name, detail, coloway, imageUrl, price, id } = shoe;
  const [modalStatus, setModalStatus] = useState(false);
  const [showEditModal, setEditModal] = useState(false);

  ////////console.log("sData:", shoe);

  const sendShoeToPending = () => {
    //////console.log("append?");
    appendPendingShoeData(shoe);
  };

  function AcceptOffer() {
    var url = `https://api.thrillerme.com/offers/getOffer/${shoe.shoe_id}/${shoe.size}/${shoe.highest_offer}`;

    ////console.log(url);
    axios
      .get(url)
      .then((res) => {
        //console.log(res);
        var offer = res.data;
        var offerData = {
          productID: offer.shoe_id,
          size: offer.size,
          buyerID: offer.buyer_id,
          sellerID: JSON.parse(localStorage.getItem("user")).user_id,
          price: offer.totalBill,
          isAuthentic: 0,
          notes: null,
          status: "Pending",
          quiqupJobID: null,
          pickupState: null,
          dropOffstate: null,
          pickupTrackingURL: null,
          dropOffTrackingURL: null,
        };

        //Capture payment
        try {
          ////console.log("#### accepting ####", res.data.intentID);
          var url = `https://api.thrillerme.com/stripe/capture`;
          axios
            .post(url, {
              intentID: res.data.intentID,
            })
            .then(
              (response) => {
                ////console.log("#### capResp ####", response);
                //Make Order

                // var urlOrders = `https://api.thrillerme.com/orders`;

                var urlOrders = `https://api.thrillerme.com/orders`;

                //console.log("O", offerData);
                // //console.log(
                //   "Shipping",
                //   parseFloat(localStorage.getItem("shippingFee"))
                // );
                axios
                  .post(urlOrders, {
                    offerData: offerData,
                    listing_id: shoe.listing_id,
                    offer_id: offer.offers_id,
                    soldTo: offerData.buyerID,
                    shipping: parseFloat(res.data.shippingFee),
                    vat: parseFloat(res.data.vat),
                    processing: parseFloat(res.data.processingFee),
                    offerAmount: parseFloat(res.data.offerAmount),
                  })
                  .then(
                    (response) => {
                      //console.log(response);

                      const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
                      const options = {
                        autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
                        debug: true, // enable logs
                      };
                      ReactPixel.init(
                        "3098857153686189",
                        advancedMatching,
                        options
                      );

                      ReactPixel.pageView(); // For tracking page view
                      ReactPixel.trackSingleCustom(
                        "3098857153686189",
                        "Purchase",
                        offerData
                      ); // For tracking custom events.

                      var user = JSON.parse(localStorage.getItem("user"));
                      var url = `https://api.thrillerme.com/listing/current/${user.user_id}`;
                      //console.log(url);
                      axios.get(encodeURI(url)).then((res) => {
                        //console.log("cData", res.data);
                        setCurrentData(res.data);
                      });
                    },
                    (error) => {
                      //console.log(error);
                    }
                  );
              },
              (error) => {
                //console.log(error);
              }
            );
        } catch (error) {}
      })
      .catch((err) => {
        ////console.log(err);
      });
  }

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    ////console.log(width);
    return width;
  }

  var widthScreen = getWindowDimensions();

  return (
    <div className="selling-current-item-container">
      {widthScreen <= 481 && showEditModal ? (
        <div style={{ transform: "translate(280px, 0)", zIndex: "1" }}>
          <EditOffering
            setEditModal={setEditModal}
            showEditModal={showEditModal}
            selling={true}
            shoe={shoe}
          />
        </div>
      ) : null}
      <div className="item-container">
        <SearchItem shoe={shoe} selling={true} />
      </div>
      <div className="heading-container tier-two">{shoe.size}</div>
      <div className="heading-container tier-two">AED {shoe.askingPrice}</div>
      <div className="heading-container">
        <div>
          AED <span> </span>
          {shoe.highest_offer !== null &&
            parseInt(shoe.highest_offer).toFixed(0)}
          {shoe.highest_offer === null && 0}
        </div>
        <div style={{ alignSelf: "center" }}>
          {widthScreen <= 481
            ? shoe.highest_offer > 0 && (
                <CustomButton
                  onClick={AcceptOffer}
                  style={{ height: "20px" }}
                  size="smallInverted"
                >
                  Accept
                </CustomButton>
              )
            : null}
        </div>
        {widthScreen <= 481 ? (
          <div
            className="editIcon"
            onClick={() => setEditModal(!showEditModal)}
          >
            <i class="fas fa-edit"></i>
          </div>
        ) : null}
        {/* {widthScreen <= 481 && showEditModal ? (
          <EditOffering
            setEditModal={setEditModal}
            showEditModal={showEditModal}
          />
        ) : null} */}
      </div>

      {widthScreen > 481
        ? shoe.highest_offer > 0 && (
            <CustomButton
              onClick={AcceptOffer}
              style={{ height: "20px", position: "absolute", left: "90%" }}
              size="smallInverted"
            >
              Accept
            </CustomButton>
          )
        : null}

      {widthScreen > 481 ? (
        <div className="editIcon" onClick={() => setEditModal(!showEditModal)}>
          <i class="fas fa-edit"></i>
        </div>
      ) : null}
      {widthScreen > 481 && showEditModal ? (
        <EditOffering
          setEditModal={setEditModal}
          showEditModal={showEditModal}
          selling={true}
          shoe={shoe}
        />
      ) : null}

      <DatePickerModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        sendShoeToPending={sendShoeToPending}
        handleSubmission={true}
      />
    </div>
  );
};
