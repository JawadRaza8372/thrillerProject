import React, { Fragment, useState } from "react";
import "./setting-item.styles.scss";
import EditOffering from "../edit-offering-modal/EditOffering";

import { EditPriceModal } from "../edit-price-modal/edit-price-modal.component";
import { SearchItem } from "../search-item/search-item.component";
import { CustomButton } from "../custom-button/custome-button.component";
import { DatePickerModal } from "../date-picker-modal/date-picker-modal.component";
import axios from "axios";

import { Link, useHistory, useLocation } from "react-router-dom";

// //console.log('Jutta');
export const SettingItem = ({
  shoe,
  history,
  favourite,
  datePicker,
  pending,
  buying,
  setBuy,
  linkCheck,
}) => {
  const { name, detail, coloway, imageUrl, price, id } = shoe;
  const [modalStatus, setModalStatus] = useState(false);
  const [dateModalStatus, setDateModalStatus] = useState(false);
  const [requestSubmitted, activateRequestSubmission] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  // //console.log(shoe);
  const handleSubmission = () => {
    activateRequestSubmission(true);
    //window.open('./shipping.pdf','_blank');
  };

  function OnDemandQuiqup(oID, name) {
    var d = new Date();
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var offset = 4; //UTC of Dubai is +04.00
    var dubai = utc + 3600000 * offset;
    var nd = new Date(dubai);
    var hour = nd.getHours();

    //Check for 2 days validation
    var orUrl = `https://api.thrillerme.com/orders/${oID}`;
    ////console.log(orUrl);
    axios.get(orUrl).then((res) => {
      var d1 = new Date();
      var dt = res.data[0].date;

      var d2 = new Date(dt);

      var validDate = new Date(
        d2.getFullYear(),
        d2.getMonth(),
        d2.getDate() + 2
      );

      var currentDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      ////console.log(currentDate, validDate);
      ////console.log(currentDate.getTime(), validDate.getTime());
      if (validDate.getTime() >= currentDate.getTime()) {
        if (hour < 9) {
          alert("Please call quiqup between 9:00 AM to 6:00 PM");
          return;
        } else if (hour >= 18) {
          alert("Please call quiqup between 9:00 AM to 6:00 PM");
          return;
        } else {
          //run the code
          if (shoe.status !== "Pending") {
            window.open(shoe.dropOffTrackingURL, "_blank");
          } else {
            //console.log("ON", oID, name);
            var user = JSON.parse(window.localStorage.getItem("user"));
            if (user !== null && user !== undefined) {
              var url = `https://api.thrillerme.com/sellers/${user.user_id}`;
              //console.log(url);
              axios
                .get(url)
                .then((res) => {
                  //console.log(res);
                  var urlN = "https://api.thrillerme.com/quiqup/ondemand";
                  //console.log("requesting..", urlN);

                  var quidash = true;
                  if (
                    res.data.city !== "Dubai" &&
                    res.data.city !== "دبي" &&
                    res.data.city !== null
                  ) {
                    quidash = false;
                  }

                  var myObj = {
                    name: res.data.firstName + " " + res.data.lastName,
                    contact_phone: res.data.phone,
                    partner_order_id: oID,
                    address1: res.data.address,
                    lat: res.data.latitude,
                    long: res.data.longitude,
                    country: "UAE",
                    city: res.data.city,
                    item: name,
                    quidash: quidash,
                  };
                  //console.log("Quidash", quidash);
                  //console.log(myObj);

                  axios
                    .post(urlN, myObj)
                    .then((res) => {
                      //console.log(res);
                      if (res.data.status === "success") {
                        alert(
                          "Please keep the package ready, Quiqup will arrive within 4 hours."
                        );
                        var userID = JSON.parse(
                          window.localStorage.getItem("user")
                        ).user_id;
                        axios
                          .get(
                            `https://api.thrillerme.com/orders/sellerPending/${userID}`
                          )
                          .then((res) => {
                            //console.log("Refresh data");
                            setBuy(res.data);
                          })
                          .catch((err) => {
                            console.errpr("pendling load", err);
                          });
                      }
                    })
                    .catch((error) => {
                      console.error("quiqup", error);
                    });
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              history.push("/login");
            }
          }
        }
      } else {
        alert("2 days are already passed, you cannot proceed with this order.");
      }
    });
  }

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    // //console.log(width);
    return width;
  }

  var widthScreen = getWindowDimensions();

  const location = useLocation();
  var prefix = "";
  if (location.pathname === "/selling-section") {
    prefix = "S-";
  } else {
    prefix = "B-";
  }

  return (
    <div className="setting-item-container">
      <div className="item-container">
        <SearchItem
          shoe={shoe}
          pending={pending}
          buying={buying}
          linkCheck={linkCheck}
          history={history}
        />
      </div>
      {history && widthScreen >= 481 ? (
        <Fragment>
          {/* {//console.log(shoe)} */}
          <div className="heading-container tier-two">
            {prefix}
            {shoe.order_id}
          </div>
          <div className="heading-container tier-two">
            {shoe.date !== undefined && shoe.date.split("T")[0]}
          </div>
          <div className="heading-container">AED {shoe.offer}</div>
          <div className="heading-container tier-two">{shoe.status}</div>
        </Fragment>
      ) : history && widthScreen <= 481 ? (
        <Fragment>
          {/* {//console.log(shoe)} */}

          <div className="heading-container">AED {shoe.offer}</div>
        </Fragment>
      ) : pending && widthScreen >= 481 ? (
        <Fragment>
          <div className="heading-container tier-two">
            {prefix}
            {shoe.order_id}
          </div>
          <div className="heading-container tier-two">
            {shoe.date !== undefined && shoe.date.split("T")[0]}
          </div>
          <div className="heading-container">AED {shoe.offer}</div>
          <div className="heading-container tier-two">
            {shoe.status}
            {datePicker ? (
              <CustomButton
                // onClick={() => setDateModalStatus(!dateModalStatus)}
                onClick={() => OnDemandQuiqup(shoe.order_id, shoe.name)}
                style={{
                  height: "20px",
                  width: "90px",
                  position: "absolute",
                  left: "50%",
                  bottom: "50%",
                }}
                size="smallInverted"
              >
                {shoe.status === "Pending" ? "Request courier" : "Track"}
              </CustomButton>
            ) : null}
          </div>

          <DatePickerModal
            handleSubmission={handleSubmission}
            modalStatus={dateModalStatus}
            setModalStatus={setDateModalStatus}
          />
        </Fragment>
      ) : favourite && widthScreen >= 481 ? (
        <Fragment>
          {/* {//console.log(shoe)} */}
          <div className="heading-container tier-two">{shoe.size}</div>
          {favourite !== 1 && (
            <div className="heading-container tier-two">
              {/* AED <span>500 </span> */}
              {/* {shoe.marketValue !== null &&
                parseFloat(shoe.marketValue).toFixed(2)}
              {shoe.marketValue === null && 0} */}
            </div>
          )}
          {favourite === 1 && (
            <div className="heading-container tier-two">
              AED <span></span>
              {shoe.marketValue !== null
                ? parseFloat(shoe.marketValue).toFixed(2)
                : shoe.marketValue === null && 0}
            </div>
          )}

          {/* {favourite !== 1 && (
            <div className="heading-container tier-two">
              AED <span> </span>
              {shoe.lowestAsk !== null && parseFloat(shoe.lowestAsk).toFixed(2)}
              {shoe.lowestAsk === null && 0}
            </div>
          )} */}
          {favourite === 1 && (
            <div className="heading-container tier-two">
              AED <span> </span>
              {shoe.lowestAsk !== null && parseFloat(shoe.lowestAsk).toFixed(2)}
              {shoe.lowestAsk === null && 0}
            </div>
          )}

          {favourite === 1 ? (
            <div className="heading-container">{shoe.lastSale}</div>
          ) : (
            <div className="heading-container">
              {shoe.status}
              <i
                onClick={() => setModalStatus(!modalStatus)}
                className="fas fa-edit"
              ></i>
            </div>
          )}
          <EditPriceModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
        </Fragment>
      ) : pending && widthScreen <= 481 ? (
        <div className="heading-containerx">
          &nbsp;&nbsp;&nbsp;&nbsp;
          {shoe.status}
          {datePicker ? (
            <CustomButton
              // onClick={() => setDateModalStatus(!dateModalStatus)}
              onClick={() => OnDemandQuiqup(shoe.order_id, shoe.name)}
              style={{
                height: "20px",
                width: "70px",
              }}
              size="smallInverted"
            >
              {shoe.status === "Pending" ? "Request courier" : "Track"}
            </CustomButton>
          ) : null}
          <DatePickerModal
            handleSubmission={handleSubmission}
            modalStatus={dateModalStatus}
            setModalStatus={setDateModalStatus}
          />
        </div>
      ) : buying && widthScreen > 481 ? (
        <Fragment>
          <div className="heading-container tier-two">{shoe.size}</div>
          {/* <div className="heading-container tier-two">
            {shoe.date !== undefined && shoe.date.split("T")[0]}
          </div> */}
          <div className="heading-container tier-two">
            AED {shoe.offerAmount}
          </div>
          <div className="heading-container tier-two">AED {shoe.lowestAsk}</div>
          <div className="heading-container tier-two">{shoe.status}</div>
          {datePicker ? (
            <CustomButton
              // onClick={() => setDateModalStatus(!dateModalStatus)}
              onClick={() => OnDemandQuiqup(shoe.order_id, shoe.name)}
              style={{
                height: "20px",
                width: "90px",
                position: "absolute",
                left: "86%",
              }}
              size="smallInverted"
            >
              {shoe.status === "Pending" ? "Request courier" : "Track"}
            </CustomButton>
          ) : null}
          <div
            className="editIcon"
            onClick={() => setEditModal(!showEditModal)}
          >
            <i className="fas fa-edit"></i>
          </div>
          {showEditModal ? (
            <EditOffering
              setEditModal={setEditModal}
              showEditModal={showEditModal}
              shoe={shoe}
              buying={true}
            />
          ) : null}
          <DatePickerModal
            handleSubmission={handleSubmission}
            modalStatus={dateModalStatus}
            setModalStatus={setDateModalStatus}
          />
        </Fragment>
      ) : buying && widthScreen <= 481 ? (
        <Fragment>
          <div
            className="heading-containery"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              className="fas fa-edit"
              style={{ height: "30px", alignSelf: "center" }}
              onClick={() => setEditModal(!showEditModal)}
            ></div>

            {/* {showEditModal ? (
              <EditOffering
                setEditModal={setEditModal}
                showEditModal={showEditModal}
              />
            ) : null} */}
            <div>{shoe.status}</div>
            {datePicker ? (
              <CustomButton
                // onClick={() => setDateModalStatus(!dateModalStatus)}
                onClick={() => OnDemandQuiqup(shoe.order_id, shoe.name)}
                style={{
                  height: "20px",
                  width: "90px",
                }}
                size="smallInverted"
              >
                {shoe.status === "Pending" ? "Request courier" : "Track"}
              </CustomButton>
            ) : null}
            {showEditModal ? (
              <EditOffering
                setEditModal={setEditModal}
                showEditModal={showEditModal}
                shoe={shoe}
                buying={true}
              />
            ) : null}
            <DatePickerModal
              handleSubmission={handleSubmission}
              modalStatus={dateModalStatus}
              setModalStatus={setDateModalStatus}
            />
          </div>
        </Fragment>
      ) : null}
      {/* {showEditModal ? (
        <EditOffering
          setEditModal={setEditModal}
          showEditModal={showEditModal}
          shoe={shoe}
          buying={true}
        />
      ) : null} */}
    </div>
  );
};
