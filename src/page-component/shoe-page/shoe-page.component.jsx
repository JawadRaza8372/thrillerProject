import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./shoe-page.styles.scss";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import { ShoeSizeList } from "../../components/shoe-size-list/shoe-size-list.component";
import { ShoeSell } from "../../components/shoe-sell/shoe-sell.component";

import { connect } from "react-redux";
import axios from "axios";
import { LISTING } from "../../Constants/Global";

import LocalStorage from "redux-persist/es/storage";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";
import ReactPixel from "react-facebook-pixel";
import { mylocalStorage } from "../../Constants/Functions";

const ShoePage = ({ match, location, userData, orderDetail }) => {
  var shoe = JSON.parse(mylocalStorage.getItem("sellShoe"));
  const [displayShoeSize, toggleShoeDisplay] = useState([true, shoe]);
  const [buttonCheck, setCheck] = useState(false);
  // const [isAuthenticated, setAuthenticated] = useState(false);
  // const [hasShipping, setShipping] = useState(false);
  // const [hasPayout, setPayout] = useState(false);
  const [shoeSize, setShowSize] = useState(null);
  const [offer, setOffers] = useState({
    highest: 0,
    lowest: 0,
  });
  const [lowestAsk, setLowestAsk] = useState("0");
  const [locationKeys, setLocationKeys] = useState([]);
  const [hasPayout, sethasPayout] = useState(false);
  const [hasShipping, setHasShipping] = useState(false);
  const history = useHistory();
  var user = mylocalStorage.getItem("user");
  var rawuserid = mylocalStorage.getItem("user");

  // var userData = JSON.parse(user);
  user.then((res) => {
    user = JSON.parse(res);
    userData = JSON.parse(res);
  });
  useEffect(async () => {
    var newuserdata = await JSON.parse(rawuserid);
    if (!newuserdata) {
      history.push({
        pathname: "/logins/1",
        state: {
          historyShoe: true,
        },
      });
    } else if (newuserdata?.isAuthenticated !== 1) {
      history.push({
        pathname: "/twoFactorAuth",
        state: {
          hasShipping: hasShipping,
          hasPayout: hasPayout,
          historyShoe: true,
        },
      });
      try {
        const res1 = await axios.get(
          `https://api.thrillerme.com/payout/${newuserdata.user_id}`
        );
        if (
          res1.data === null ||
          res1.data === "" ||
          res1.data === [] ||
          res1.data === {} ||
          res1.data.length <= 0
        ) {
          history.push({
            pathname: "/payoutInfo",
            state: {
              historyShoe: true,
            },
          });
        } else {
          try {
            const restt = await axios.get(
              `https://api.thrillerme.com/sellers/${newuserdata.user_id}`
            );
            if (
              restt.data === null ||
              restt.data === "" ||
              restt.data === [] ||
              restt.data === {} ||
              restt.data.length <= 0
            ) {
              history.push({
                pathname: "/shippingInfo/1",
                state: {
                  hasPayout: hasPayout,
                  historyShoe: true,
                },
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (
        mylocalStorage.getItem("price") !== null &&
        mylocalStorage.getItem("price") !== undefined
      )
        setLowestAsk(mylocalStorage.getItem("price"));
    } catch (e) {}

    if (shoeSize !== null) {
      var url = `https://api.thrillerme.com/listing/highest/${shoe.shoe_id}/${shoeSize}`;
      var encodedURL = encodeURI(url);
      axios.get(encodedURL).then((res) => {
        if (res.data.highest !== null) {
          setOffers((prevState) => ({
            ...prevState,
            highest: res.data.highest,
          }));
        } else {
          setOffers((prevState) => ({
            ...prevState,
            highest: 0,
          }));
        }
      });

      var urlL = `https://api.thrillerme.com/listing/lowest/${shoe.shoe_id}/${shoeSize}`;
      var encodedURLL = encodeURI(urlL);
      axios.get(encodedURLL).then((res) => {
        if (res.data.lowest !== null) {
          setOffers((prevState) => ({
            ...prevState,
            lowest: res.data.lowest,
          }));
        } else {
          setOffers((prevState) => ({
            ...prevState,
            lowest: 0,
          }));
        }
      });
    }

    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          // Handle back event
          if (displayShoeSize[0]) {
            history.push("/sell");
          } else {
            toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]]);
          }
        }
      }
    });
  }, [shoeSize, locationKeys]);

  // const initialSetup = async () => {
  //   //console.log(user);
  //   //console.log(userData);
  //   //console.log(user.user_id);
  //   //console.log(user.isAuthenticated);
  //   if (user.isAuthenticated === 1) {
  //     setAuthenticated(true);
  //   }

  //   var data = await axios.get(
  //     `https://api.thrillerme.com/sellers/${user.user_id}`
  //   );

  //   //console.log("### SHIPPING ###", data);
  //   if (data !== "") {
  //     setShipping(true);
  //   }

  //   try {
  //     var payData = axios.get(
  //       `https://api.thrillerme.com/payout/${user.user_id}`
  //     );

  //     if (payData.data !== "") {
  //       setPayout(true);
  //     }
  //   } catch (error) {}
  // };

  // shoeSize,
  // isAuthenticated,
  // hasShipping,
  // hasPayout,
  // user.isAuthenticated,
  // user.user_id,
  // shoe.shoe_id,
  // user,
  // history,
  function setShowSizeonHook(val) {
    setShowSize(val);
  }
  //offer.lowest
  return (
    <div className="shoe-page">
      <div className="shoe-content">
        <div className="shoe-image">
          <div className="shoe-info">
            <h1>{shoe.name}</h1>
            <p>
              Highest Offer: <b>AED {offer.highest}</b> | Lowest Ask:{" "}
              <b>AED {offer.lowest}</b>
            </p>
          </div>
          <img
            src={shoe.cover_image}
            alt="item-img"
            style={{ maxHeight: "500px" }}
          />
        </div>
        <div className="shoe-size" style={{ maxWidth: "875px" }}>
          {displayShoeSize[0] ? (
            <ShoeSizeList
              displayShoeSize={displayShoeSize}
              toggleShoeDisplay={toggleShoeDisplay}
              parentCallBack={setShowSizeonHook}
            />
          ) : (
            <ShoeSell
              displayShoeSize={displayShoeSize}
              toggleShoeDisplay={toggleShoeDisplay}
              buttonCheck={buttonCheck}
              setCheck={setCheck}
              offer={offer}
            />
          )}
        </div>
      </div>
      <hr></hr>
      <div className="button-parent">
        <div className="bottomFAQ">
          <Link to="/FaqSeller">FAQ</Link>
        </div>
        <div className="void-div"></div>

        <div className="control-buttons">
          <CustomButton
            onClick={() => {
              if (displayShoeSize[0]) {
                history.push("/sell");
              } else {
                toggleShoeDisplay([!displayShoeSize[0], displayShoeSize[1]]);
              }
            }}
          >
            {displayShoeSize[0] ? "Cancel" : "Back"}
          </CustomButton>
          <CustomButton
            //listing.post here
            onClick={() => {
              if (buttonCheck) {
                var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
                axios.get(url).then((res) => {
                  if (!res.data.isApproved) {
                    alert(
                      "Please wait, you can start selling once your account is approved."
                    );
                  } else {
                    console.log("Sell now...", offer.highest);

                    var date = new Date()
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ");
                    var expiry_date = new Date();
                    expiry_date.setDate(
                      expiry_date.getDate() + orderDetail.expiry
                    );
                    expiry_date = expiry_date
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ");

                    var l_shipping, l_trans, l_processing, l_payout;

                    axios
                      .get(`https://api.thrillerme.com/settings`)
                      .then((res) => {
                        var settings = res.data.result[0];
                        axios
                          .get(
                            "https://api.thrillerme.com/sellers/" + user.user_id
                          )
                          .then((res) => {
                            if (res.data.city !== undefined) {
                              if (
                                res.data.city !== "Dubai" &&
                                res.data.city !== "دبي" &&
                                res.data.city !== null
                              ) {
                                l_shipping = settings.deliveryIn;
                              } else {
                                l_shipping = settings.quidashIn;
                              }
                            } else {
                              l_shipping = settings.quidashIn;
                            }

                            l_trans = (
                              offer.highest *
                              (settings.marketplaceShare / 100).toFixed(4)
                            ).toFixed(2);

                            l_processing = (
                              offer.highest *
                              (settings.processingFee / 100).toFixed(4)
                            ).toFixed(2);

                            l_payout = (
                              offer.highest -
                              l_trans -
                              l_processing -
                              l_shipping
                            ).toFixed(2);

                            var _isReturnable = 0;
                            if (orderDetail.returnable) _isReturnable = 1;
                            let data = {
                              seller_id: user.user_id,
                              shoe_id: orderDetail.shoe_id,
                              askingPrice: offer.highest,
                              size: orderDetail.id,
                              postedOn: date,
                              validTill: expiry_date,
                              expiry: orderDetail.expiry,
                              isAuthentic: 0,
                              transactionFee: l_trans,
                              processingFee: l_processing,
                              shippingFee: l_shipping,
                              payout: l_payout,
                              status: "available",
                              soldTo: null,
                              soldDate: null,
                              acceptedOffer_id: null,
                              isReturnable: _isReturnable,
                            };

                            console.log(data);
                            //listing.post
                            if (
                              data.askingPrice < 25 ||
                              data.askingPrice === undefined
                            ) {
                              //console.log(data.askingPrice);
                              alert("Asking price should be atleast AED 25");
                            } else {
                              axios
                                .post(LISTING, data)
                                .then((resListing) => {
                                  console.log(resListing.data.insertId);

                                  //Accept Offer
                                  var url = `https://api.thrillerme.com/offers/getOffer/${data.shoe_id}/${data.size}/${offer.highest}`;

                                  console.log(url);
                                  axios
                                    .get(url)
                                    .then((res) => {
                                      //console.log(res);
                                      var offer = res.data;
                                      var offerData = {
                                        productID: offer.shoe_id,
                                        size: offer.size,
                                        buyerID: offer.buyer_id,
                                        sellerID: JSON.parse(
                                          mylocalStorage.getItem("user")
                                        ).user_id,
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
                                        console.log(
                                          "#### accepting ####",
                                          res.data.intentID
                                        );
                                        var url = `https://api.thrillerme.com/stripe/capture`;
                                        axios
                                          .post(url, {
                                            intentID: res.data.intentID,
                                          })
                                          .then(
                                            (response) => {
                                              console.log(
                                                "#### capResp ####",
                                                response
                                              );
                                              //Make Order
                                              var urlOrders = `https://api.thrillerme.com/orders`;

                                              axios
                                                .post(urlOrders, {
                                                  offerData: offerData,
                                                  listing_id:
                                                    resListing.data.insertId,
                                                  offer_id: offer.offers_id,
                                                  soldTo: offerData.buyerID,
                                                  shipping: parseFloat(
                                                    res.data.shippingFee
                                                  ),
                                                  vat: parseFloat(res.data.vat),
                                                  processing: parseFloat(
                                                    res.data.processingFee
                                                  ),
                                                  offerAmount: parseFloat(
                                                    res.data.offerAmount
                                                  ),
                                                })
                                                .then(
                                                  (response) => {
                                                    console.log(
                                                      "order",
                                                      response.data
                                                    );

                                                    const advancedMatching = {
                                                      em: "some@email.com",
                                                    }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
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

                                                    history.push(
                                                      "/selling-section"
                                                    );
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
                                })
                                .catch((err) => {
                                  alert("Something Went Wrong");
                                });
                            }
                          })
                          .catch((e) => {
                            console.error("settings", e);
                          });
                      });
                  }
                });
              } else {
                var date = new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                var expiry_date = new Date();
                expiry_date.setDate(expiry_date.getDate() + orderDetail.expiry);
                expiry_date = expiry_date
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");

                ////console.log(user);
                ////console.log(isAuthenticated);
                ////console.log(hasPayout);
                ////console.log(hasShipping);
                // if (user === null || user === undefined) {
                //   history.push("/login");
                // } else {
                var url = `https://api.thrillerme.com/registrations/${user.user_id}`;

                axios.get(url).then((res) => {
                  ////console.log(res);
                  // if (!res.data.isApproved) {
                  //   history.push({
                  //     pathname: "/twoFactorAuth",
                  //     state: {
                  //       hasShipping: hasShipping,
                  //       hasPayout: hasPayout,
                  //       historyShoe: true,
                  //     },
                  //   });
                  // } else if (!hasShipping) {
                  //   history.push({
                  //     pathname: "/shippingInfo/1",
                  //     state: {
                  //       hasPayout: hasPayout,
                  //       historyShoe: true,
                  //     },
                  //   });
                  // } else if (!hasPayout) {
                  //   history.push({
                  //     pathname: "/payoutInfo",
                  //     state: {
                  //       historyShoe: true,
                  //     },
                  //   });
                  // }
                  // else {
                  var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
                  //console.log(url);
                  // //console.log(hasPayout);
                  axios.get(url).then((res) => {
                    //console.log(res);
                    if (!res.data.isApproved) {
                      alert(
                        "Please wait, you can start selling once your account is approved."
                      );
                      // if (res.data.user_role === 1) {

                      // }
                      // // }
                      // else {
                      //   history.push("/shippingInfo/1");
                      // }
                    } else {
                      var l_shipping, l_trans, l_processing, l_payout;

                      axios
                        .get(`https://api.thrillerme.com/settings`)
                        .then((res) => {
                          var settings = res.data.result[0];
                          axios
                            .get(
                              "https://api.thrillerme.com/sellers/" +
                                user.user_id
                            )
                            .then((res) => {
                              if (res.data.city !== undefined) {
                                if (
                                  res.data.city !== "Dubai" &&
                                  res.data.city !== "دبي" &&
                                  res.data.city !== null
                                ) {
                                  l_shipping = settings.deliveryIn;
                                } else {
                                  l_shipping = settings.quidashIn;
                                }
                              } else {
                                l_shipping = settings.quidashIn;
                              }

                              l_trans = (
                                orderDetail.askingPrice *
                                (settings.marketplaceShare / 100).toFixed(4)
                              ).toFixed(2);

                              l_processing = (
                                orderDetail.askingPrice *
                                (settings.processingFee / 100).toFixed(4)
                              ).toFixed(2);

                              l_payout = (
                                orderDetail.askingPrice -
                                l_trans -
                                l_processing -
                                l_shipping
                              ).toFixed(2);

                              var _isReturnable = 0;
                              if (orderDetail.returnable) _isReturnable = 1;
                              let data = {
                                seller_id: user.user_id,
                                shoe_id: orderDetail.shoe_id,
                                askingPrice: orderDetail.askingPrice,
                                size: orderDetail.id,
                                postedOn: date,
                                validTill: expiry_date,
                                expiry: orderDetail.expiry,
                                isAuthentic: 0,
                                transactionFee: l_trans,
                                processingFee: l_processing,
                                shippingFee: l_shipping,
                                payout: l_payout,
                                status: "available",
                                soldTo: null,
                                soldDate: null,
                                acceptedOffer_id: null,
                                isReturnable: _isReturnable,
                              };

                              ////console.log(data);
                              //listing.post
                              if (
                                data.askingPrice < 25 ||
                                data.askingPrice === undefined
                              ) {
                                //console.log(data.askingPrice);
                                alert("Asking price should be atleast AED 25");
                              } else {
                                axios
                                  .post(LISTING, data)
                                  .then((res) => {
                                    //console.log(data.askingPrice);
                                    axios
                                      .post(
                                        "https://api.thrillerme.com/fav/email",
                                        {
                                          shoe_id: data.shoe_id,
                                          size: data.size,
                                          price: data.askingPrice,
                                        }
                                      )
                                      .then((ress) => {
                                        //console.log(ress);
                                        history.push("/selling-section");
                                      })
                                      .catch((e) => {
                                        console.error("favs emails", e);
                                      });
                                  })
                                  .catch((err) => {
                                    alert("Something Went Wrong");
                                  });
                              }
                            })
                            .catch((e) => {
                              console.error("settings", e);
                            });
                        });
                    }
                  });
                  // }
                });
                // }
              }
            }}
          >
            Next
          </CustomButton>
        </div>
      </div>
      <Links />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.user,
    orderDetail: state.sellerOrder.shoesDetail,
  };
};

export default connect(mapStateToProps)(withRouter(ShoePage));
