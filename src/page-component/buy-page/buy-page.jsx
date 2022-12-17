import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./buy-page.styles.scss";
import Links from "../../components/links/Links";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import ShoeBuy from "../../components/shoe-buy/shoe-buy.component";
import SHOE_DATA from "../../temporary-data/shoe-data";
import { useHistory, withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import { mylocalStorage } from "../../Constants/Functions";

const BuyPage = ({ history, match, userDetails, buyer }) => {
  const id = useParams().id;
  const size = useParams().size;
  var _lowestAsk = 0;
  try {
    _lowestAsk = JSON.parse(mylocalStorage.getItem("price"));
  } catch (error) {}

  var user_data = JSON.parse(mylocalStorage.getItem("user"));
  // if (
  //   mylocalStorage.getItem("user") === null ||
  //   mylocalStorage.getItem("user") === undefined
  // )
  //   history.push("/login");
  //console.log("uData", mylocalStorage.getItem("user"));

  var mainURL = "https://appick.io/u/thriller/imgs/";

  // const [isAuthenticated, setAuthenticated] = useState(false);
  // const [hasShipping, setShipping] = useState(false);
  const [product, setProduct] = useState({});
  const [lowestAsk, setLowestAsk] = useState(_lowestAsk);
  const [highestOffer, setHighestOffer] = useState(0);
  const [offerAmount, setOfferAmount] = useState(null);

  try {
    var url = `https://api.thrillerme.com/listing/highest/${id}/${size}`;
    var urlL = `https://api.thrillerme.com/listing/lowest/${id}/${size}`;

    var encodedURL = encodeURI(url);
    var encodedURLL = encodeURI(urlL);

    axios.get(encodedURL).then((res) => {
      if (res.data.highest !== null) {
        setHighestOffer(res.data.highest);
      }
    });
    axios.get(encodedURLL).then((resk) => {
      if (resk.data.lowest !== null) {
        setLowestAsk(resk.data.lowest);
      } else {
        setLowestAsk(0);
      }
    });
    //console.log(highestOffer);
  } catch {}

  function updateOfferAmount(val) {
    ////console.log(val);
    setOfferAmount(val);
  }

  const [selectedButton, toggleButton] = useState(true);

  const Load = useCallback(() => {
    if (product.sku_number === undefined) {
      var url = `https://api.thrillerme.com/shoes/${id}`;
      var encodedURL = encodeURI(url);
      axios.get(encodedURL).then((res) => {
        setProduct(res.data);
      });
    }
  }, [id, product.sku_number]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    Load();
  }, [Load, product, highestOffer]);

  // //Transfered props using React Router Dom
  // const {
  //   location: {
  //     state: { shoe },
  //   },
  // } = useHistory();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(user_data);
  }, []);

  var shoe = {
    shoe: null,
  };
  SHOE_DATA.map((_shoe) => {
    shoe.shoe = _shoe;
  });

  ////////console.log("Product Aya", product);
  return (
    <div className="shoe-page" style={{ marginTop: "11vh" }}>
      <div className="shoe-content">
        <div className="shoe-image">
          <div className="shoe-info">
            <h1>{product.name}</h1>
            <p>
              Lowest Ask: <b>AED {lowestAsk}</b> | Highest Offer:{" "}
              <b>AED {highestOffer}</b>
            </p>
          </div>
          <img src={product.cover_image} alt="item-img" />
        </div>
        <div className="shoe-size">
          <ShoeBuy
            id={id}
            size={size}
            highestOffer={highestOffer}
            setOfferAmount={updateOfferAmount}
            amount={offerAmount}
            lowestAsk={lowestAsk}
            selectedButton={selectedButton}
            toggleButton={toggleButton}
            buyNow={"0"}
            productName={"-"}
          />
        </div>
      </div>
      <div className="button-parent">
        <Link to="/faq">
          <div className="bottomFAQ" style={{ color: "black" }}>
            <p>FAQ</p>
          </div>
        </Link>

        <div className="void-div"></div>

        <div className="control-buttons">
          <CustomButton
            onClick={() => {
              history.push("");
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={() => {
              var _lowestAsk = 0;
              try {
                _lowestAsk = JSON.parse(mylocalStorage.getItem("price"));
              } catch (error) {}
              if (!selectedButton) {
                setOfferAmount(_lowestAsk);
              }
              ////console.log("LA", _lowestAsk === 0);

              if (_lowestAsk === 0) {
                ////console.log(1);
                alert("This shoe is not available at the moment.");
              } else if (
                parseFloat(offerAmount) > parseFloat(lowestAsk) &&
                parseFloat(lowestAsk) > 0
              ) {
                //////console.log("2", lowestAsk);
                alert(
                  "You cannot place an offer that is higher than the asking price"
                );
              }

              // just for now
              else if (
                offerAmount === "" ||
                (offerAmount <= 0 && selectedButton)
              ) {
                alert("Please Enter the offer amount");
              } else if (parseFloat(offerAmount) < 25 && selectedButton) {
                alert("Minimum offer must be 25");
              } else {
                //just for now
                if (!selectedButton && parseFloat(lowestAsk) === 0) {
                  alert(
                    "There are no asks to buy now in that size. You may place an offer that a seller may choose to accept at any time, and we'll keep you notified if it get's back in stock"
                  );
                  return;
                }

                //offers.post
                axios.get(`https://api.thrillerme.com/settings`).then((res) => {
                  var settings = res.data.result[0];
                  settings.marketplaceShare = 0; //marketplace share 0
                  const rawuserid = mylocalStorage.getItem("user");
                  var data = {
                    buyer_id: rawuserid ? JSON.parse(rawuserid).user_id : "",
                    shoe_id: id,
                    size: size,
                    offerAmount: offerAmount,
                    vat: parseFloat(
                      offerAmount * (settings.marketplaceShare / 100).toFixed(4)
                    ).toFixed(2),
                    processingFee: parseFloat(
                      offerAmount * (settings.processingFee / 100).toFixed(4)
                    ).toFixed(2),
                    shippingFee: parseFloat(
                      mylocalStorage.getItem("shippingFee")
                    ),
                    totalBill: 0,
                    status: "Pending",
                  };
                  if (!selectedButton) {
                    data.offerAmount = _lowestAsk;
                    data.vat = parseFloat(
                      _lowestAsk * (settings.marketplaceShare / 100).toFixed(4)
                    ).toFixed(2);
                    data.processingFee = parseFloat(
                      _lowestAsk * (settings.processingFee / 100).toFixed(4)
                    ).toFixed(2);
                  }

                  data.totalBill = (
                    parseFloat(data.offerAmount) +
                    parseFloat(data.vat) +
                    parseFloat(data.processingFee) +
                    parseFloat(data.shippingFee)
                  ).toFixed(2);
                  //console.log("Offer Data", data);
                  mylocalStorage.setItem("offer", JSON.stringify(data));
                  if (!selectedButton) {
                    mylocalStorage.setItem("buy", "1");
                  } else {
                    mylocalStorage.setItem("buy", "0");
                  }
                  //just for now
                  // if (!isAuthenticated) {
                  //   history.push({
                  //     pathname: "/twoFactorAuth/" + id + "-" + size + "-0",
                  //     state: {
                  //       hasShippingBuy: hasShipping,
                  //       id: id,
                  //       historyBuy: true,
                  //     },
                  //   });
                  // } else
                  // if (!hasShipping) {
                  //   history.push({
                  //     pathname: "/shippingInfo/0/" + id + "-" + size + "-0",
                  //     state: {
                  //       id: id,
                  //       historyBuy: true,
                  //     },
                  //   });}
                  // else {
                  history.push(
                    `/product-review/${id}_size_${size}/${selectedButton}`
                  );
                  // }
                });
              }
            }}
          >
            Next
          </CustomButton>
        </div>
      </div>
      <hr></hr>

      <div style={{ marginTop: "10px" }}>
        <Fragment>
          <Links />
          <Footer />
        </Fragment>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
    buyer: state.buyShoe.buyShoe,
  };
};

export default connect(mapStateToProps)(withRouter(BuyPage));
