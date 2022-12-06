import React, { useState, useRef, useEffect } from "react";
import "./prod-rev-page.styles.scss";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components/custom-button/custome-button.component";
import ShoeBuy from "../../components/shoe-buy/shoe-buy.component";
import SHOE_DATA from "../../temporary-data/shoe-data";
import { useHistory, withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";
const BuyPage = ({ history, match, userDetails }) => {
  const [hasShipping, setShipping] = useState(false);
  const rawuserid = localStorage.getItem("user");
  var off = JSON.parse(localStorage.getItem("offer"));
  const [offer, setOffer] = useState(off);
  const params = useParams();
  const newhistory = useHistory();
  const rawid = useParams().id;
  const dataarry = `${rawid}`.split("_");
  const id = dataarry[0];
  const size = dataarry[2];
  const [product, setProduct] = useState({});
  const [highest, setHighest] = useState(null);
  const [lowest, setLowest] = useState(null);
  const [text, setText] = useState("Place offer");
  const [chk, setChk] = useState("0");

  // const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    var newuserdata = await JSON.parse(rawuserid);
    if (!newuserdata) {
      newhistory.push("/login");
    } else if (newuserdata?.isAuthenticated !== 1) {
      newhistory.push({
        pathname: "/twoFactorAuth/" + id + "-" + size + "-0",
        state: {
          hasShippingBuy: hasShipping,
          id: id,
          historyBuy: true,
        },
      });
      setOffer({ ...off, buyer_id: newuserdata.user_id });
      localStorage.setItem("offer", JSON.stringify(offer));
      await axios
        .get(`https://api.thrillerme.com/shippings/${newuserdata.user_id}`)
        .then((res) => {
          console.log("shipping info product-review", res.data);
          if (res.data) {
            setShipping(true);
            newhistory.push({
              pathname: "/shippingInfo/0/" + id + "-" + size + "-0",
              state: {
                id: id,
                historyBuy: true,
              },
            });
          }
        })
        .catch((res) => {
          console.error(res);
        });
    }
  }, []);

  function Load() {
    if (product.sku_number === undefined) {
      var url = `https://api.thrillerme.com/shoes/${id}`;
      var encodedURL = encodeURI(url);
      axios.get(encodedURL).then((res) => {
        setProduct(res.data);

        try {
          var url = `https://api.thrillerme.com/listing/highest/${res.data.shoe_id}/${offer.size}`;
          var encodedURL = encodeURI(url);
          axios.get(encodedURL).then((res) => {
            if (res.data.highest !== null) {
              setHighest(res.data.highest);
            } else {
              setHighest(0);
            }
          });

          var urlL = `https://api.thrillerme.com/listing/lowest/${res.data.shoe_id}/${offer.size}`;
          var encodedURLL = encodeURI(urlL);
          axios.get(encodedURLL).then((res) => {
            if (res.data.lowest !== null) {
              setLowest(res.data.lowest);
            } else {
              setLowest(0);
            }
          });
        } catch (error) {}
      });
    }
  }

  var mainURL = "https://appick.io/u/thriller/imgs/";

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    Load();
    var chk = localStorage.getItem("buy");
    setChk(chk);
    if (chk === "1") {
      setText("Buy Now");
    } else {
      setText("Place offer");
    }
  }, [product]);

  // function save() {
  //   localStorage.setItem("proID", id);
  //   userDetails === null
  //     ? history.push({
  //         pathname: "/login",
  //         state: "buy",
  //       })
  //     : SaveOffer();
  // }

  var shoe = {
    shoe: null,
  };
  SHOE_DATA.map((_shoe) => {
    shoe.shoe = _shoe;
  });

  function SaveOffer() {
    //localStorage.setItem("usd", 0);
    var chk = localStorage.getItem("buy");
    if (chk === "1") {
      //Paypal here
      alert("Wait...");
    } else {
      var url = "https://api.thrillerme.com/offers/";
      axios
        .post(url, {
          offer,
        })
        .then(
          (response) => {
            if (response.data.status === "success") {
              history.push("/buying-section");
            } else {
              console.error(response);
              //alert(response.data.data.result);
            }
          },
          (error) => {
            //console.log(error);
          }
        );
    }
  }

  return (
    <div className="shoex-page">
      <div className="shoe-content">
        <div className="shoe-image">
          <div className="shoe-info">
            <h1>{product.name}</h1>
            <p>
              Lowest Ask: <b>AED {lowest}</b> | Highest Offer:{" "}
              <b>AED {highest}</b>
            </p>
          </div>
          <img src={product.cover_image} alt="item-img" />
        </div>
        <div className="shoe-size">
          <ShoeBuy
            id={offer.shoe_id}
            offer={offer}
            selectedButton={params.selectedButton}
            size={offer.size}
            review={true}
            buyNow={chk}
            productName={product.name}
          />
        </div>
      </div>
      <hr></hr>

      <div className="button-parent">
        <Link to="/faq">
          <div className="bottomFAQ" style={{ color: "black" }}>
            <p>FAQ</p>
          </div>
        </Link>

        <div className="void-div"></div>

        {/* {chk === "0" && (
          <div className="control-buttons">
            <CustomButton
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </CustomButton>
            <CustomButton onClick={save}>{text}</CustomButton>
          </div>
        )} */}
      </div>
      <Links />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export default connect(mapStateToProps)(withRouter(BuyPage));
