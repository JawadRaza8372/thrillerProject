import React, { useState } from "react";
import "./two-factor.styles.scss";
import { useHistory, withRouter, useParams } from "react-router-dom";
import axios from "axios";
import { validateTowFactorAuthNumber } from "../../Constants/Functions";
import swal from "sweetalert";

import { CustomButton } from "../../components/custom-button/custome-button.component";
import SelectSearch from "react-select-search";
import Select from "react-select";

var codes = [
  { label: "Afghanistan", value: "93", code: "AF" },
  { label: "Albania", value: "355", code: "AL" },
  { label: "Algeria", value: "213", code: "DZ" },
  { label: "AmericanSamoa", value: "1684", code: "AS" },
  { label: "Andorra", value: "376", code: "AD" },
  { label: "Angola", value: "244", code: "AO" },
  { label: "Anguilla", value: "1264", code: "AI" },
  { label: "AntiguaandBarbuda", value: "1268", code: "AG" },
  { label: "Argentina", value: "54", code: "AR" },
  { label: "Armenia", value: "374", code: "AM" },
  { label: "Aruba", value: "297", code: "AW" },
  { label: "Australia", value: "61", code: "AU" },
  { label: "Austria", value: "43", code: "AT" },
  { label: "Azerbaijan", value: "994", code: "AZ" },
  { label: "Bahamas", value: "1242", code: "BS" },
  { label: "Bahrain", value: "973", code: "BH" },
  { label: "Bangladesh", value: "880", code: "BD" },
  { label: "Barbados", value: "1246", code: "BB" },
  { label: "Belarus", value: "375", code: "BY" },
  { label: "Belgium", value: "32", code: "BE" },
  { label: "Belize", value: "501", code: "BZ" },
  { label: "Benin", value: "229", code: "BJ" },
  { label: "Bermuda", value: "1441", code: "BM" },
  { label: "Bhutan", value: "975", code: "BT" },
  { label: "BosniaandHerzegovina", value: "387", code: "BA" },
  { label: "Botswana", value: "267", code: "BW" },
  { label: "Brazil", value: "55", code: "BR" },
  { label: "BritishIndianOceanTerritory", value: "246", code: "IO" },
  { label: "Bulgaria", value: "359", code: "BG" },
  { label: "BurkinaFaso", value: "226", code: "BF" },
  { label: "Burundi", value: "257", code: "BI" },
  { label: "Cambodia", value: "855", code: "KH" },
  { label: "Cameroon", value: "237", code: "CM" },
  { label: "Canada", value: "1", code: "CA" },
  { label: "CapeVerde", value: "238", code: "CV" },
  { label: "CaymanIslands", value: "345", code: "KY" },
  { label: "CentralAfricanRepublic", value: "236", code: "CF" },
  { label: "Chad", value: "235", code: "TD" },
  { label: "Chile", value: "56", code: "CL" },
  { label: "China", value: "86", code: "CN" },
  { label: "ChristmasIsland", value: "61", code: "CX" },
  { label: "Colombia", value: "57", code: "CO" },
  { label: "Comoros", value: "269", code: "KM" },
  { label: "Congo", value: "242", code: "CG" },
  { label: "CookIslands", value: "682", code: "CK" },
  { label: "CostaRica", value: "506", code: "CR" },
  { label: "Croatia", value: "385", code: "HR" },
  { label: "Cuba", value: "53", code: "CU" },
  { label: "Cyprus", value: "537", code: "CY" },
  { label: "CzechRepublic", value: "420", code: "CZ" },
  { label: "Denmark", value: "45", code: "DK" },
  { label: "Djibouti", value: "253", code: "DJ" },
  { label: "Dominica", value: "1767", code: "DM" },
  { label: "DominicanRepublic", value: "1849", code: "DO" },
  { label: "Ecuador", value: "593", code: "EC" },
  { label: "Egypt", value: "20", code: "EG" },
  { label: "ElSalvador", value: "503", code: "SV" },
  { label: "EquatorialGuinea", value: "240", code: "GQ" },
  { label: "Eritrea", value: "291", code: "ER" },
  { label: "Estonia", value: "372", code: "EE" },
  { label: "Ethiopia", value: "251", code: "ET" },
  { label: "FaroeIslands", value: "298", code: "FO" },
  { label: "Fiji", value: "679", code: "FJ" },
  { label: "Finland", value: "358", code: "FI" },
  { label: "France", value: "33", code: "FR" },
  { label: "FrenchGuiana", value: "594", code: "GF" },
  { label: "FrenchPolynesia", value: "689", code: "PF" },
  { label: "Gabon", value: "241", code: "GA" },
  { label: "Gambia", value: "220", code: "GM" },
  { label: "Georgia", value: "995", code: "GE" },
  { label: "Germany", value: "49", code: "DE" },
  { label: "Ghana", value: "233", code: "GH" },
  { label: "Gibraltar", value: "350", code: "GI" },
  { label: "Greece", value: "30", code: "GR" },
  { label: "Greenland", value: "299", code: "GL" },
  { label: "Grenada", value: "1473", code: "GD" },
  { label: "Guadeloupe", value: "590", code: "GP" },
  { label: "Guam", value: "1671", code: "GU" },
  { label: "Guatemala", value: "502", code: "GT" },
  { label: "Guinea", value: "224", code: "GN" },
  { label: "Guinea-Bissau", value: "245", code: "GW" },
  { label: "Guyana", value: "595", code: "GY" },
  { label: "Haiti", value: "509", code: "HT" },
  { label: "Honduras", value: "504", code: "HN" },
  { label: "Hungary", value: "36", code: "HU" },
  { label: "Iceland", value: "354", code: "IS" },
  { label: "India", value: "91", code: "IN" },
  { label: "Indonesia", value: "62", code: "ID" },
  { label: "Iraq", value: "964", code: "IQ" },
  { label: "Ireland", value: "353", code: "IE" },
  { label: "Italy", value: "39", code: "IT" },
  { label: "Jamaica", value: "1876", code: "JM" },
  { label: "Japan", value: "81", code: "JP" },
  { label: "Jordan", value: "962", code: "JO" },
  { label: "Kazakhstan", value: "77", code: "KZ" },
  { label: "Kenya", value: "254", code: "KE" },
  { label: "Kiribati", value: "686", code: "KI" },
  { label: "Kuwait", value: "965", code: "KW" },
  { label: "Kyrgyzstan", value: "996", code: "KG" },
  { label: "Latvia", value: "371", code: "LV" },
  { label: "Lebanon", value: "961", code: "LB" },
  { label: "Lesotho", value: "266", code: "LS" },
  { label: "Liberia", value: "231", code: "LR" },
  { label: "Liechtenstein", value: "423", code: "LI" },
  { label: "Lithuania", value: "370", code: "LT" },
  { label: "Luxembourg", value: "352", code: "LU" },
  { label: "Madagascar", value: "261", code: "MG" },
  { label: "Malawi", value: "265", code: "MW" },
  { label: "Malaysia", value: "60", code: "MY" },
  { label: "Maldives", value: "960", code: "MV" },
  { label: "Mali", value: "223", code: "ML" },
  { label: "Malta", value: "356", code: "MT" },
  { label: "MarshallIslands", value: "692", code: "MH" },
  { label: "Martinique", value: "596", code: "MQ" },
  { label: "Mauritania", value: "222", code: "MR" },
  { label: "Mauritius", value: "230", code: "MU" },
  { label: "Mayotte", value: "262", code: "YT" },
  { label: "Mexico", value: "52", code: "MX" },
  { label: "Monaco", value: "377", code: "MC" },
  { label: "Mongolia", value: "976", code: "MN" },
  { label: "Montenegro", value: "382", code: "ME" },
  { label: "Montserrat", value: "1664", code: "MS" },
  { label: "Morocco", value: "212", code: "MA" },
  { label: "Myanmar", value: "95", code: "MM" },
  { label: "Namibia", value: "264", code: "NA" },
  { label: "Nauru", value: "674", code: "NR" },
  { label: "Nepal", value: "977", code: "NP" },
  { label: "Netherlands", value: "31", code: "NL" },
  { label: "NetherlandsAntilles", value: "599", code: "AN" },
  { label: "NewCaledonia", value: "687", code: "NC" },
  { label: "NewZealand", value: "64", code: "NZ" },
  { label: "Nicaragua", value: "505", code: "NI" },
  { label: "Niger", value: "227", code: "NE" },
  { label: "Nigeria", value: "234", code: "NG" },
  { label: "Niue", value: "683", code: "NU" },
  { label: "NorfolkIsland", value: "672", code: "NF" },
  { label: "NorthernMarianaIslands", value: "1670", code: "MP" },
  { label: "Norway", value: "47", code: "NO" },
  { label: "Oman", value: "968", code: "OM" },
  { label: "Pakistan", value: "92", code: "PK" },
  { label: "Palau", value: "680", code: "PW" },
  { label: "Panama", value: "507", code: "PA" },
  { label: "PapuaNewGuinea", value: "675", code: "PG" },
  { label: "Paraguay", value: "595", code: "PY" },
  { label: "Peru", value: "51", code: "PE" },
  { label: "Philippines", value: "63", code: "PH" },
  { label: "Poland", value: "48", code: "PL" },
  { label: "Portugal", value: "351", code: "PT" },
  { label: "PuertoRico", value: "1939", code: "PR" },
  { label: "Qatar", value: "974", code: "QA" },
  { label: "Romania", value: "40", code: "RO" },
  { label: "Rwanda", value: "250", code: "RW" },
  { label: "Samoa", value: "685", code: "WS" },
  { label: "SanMarino", value: "378", code: "SM" },
  { label: "SaudiArabia", value: "966", code: "SA" },
  { label: "Senegal", value: "221", code: "SN" },
  { label: "Serbia", value: "381", code: "RS" },
  { label: "Seychelles", value: "248", code: "SC" },
  { label: "SierraLeone", value: "232", code: "SL" },
  { label: "Singapore", value: "65", code: "SG" },
  { label: "Slovakia", value: "421", code: "SK" },
  { label: "Slovenia", value: "386", code: "SI" },
  { label: "SolomonIslands", value: "677", code: "SB" },
  { label: "SouthAfrica", value: "27", code: "ZA" },
  {
    label: "SouthGeorgiaandtheSouthSandwichIslands",
    value: "500",
    code: "GS",
  },
  { label: "Spain", value: "34", code: "ES" },
  { label: "SriLanka", value: "94", code: "LK" },
  { label: "Sudan", value: "249", code: "SD" },
  { label: "Surilabel", value: "597", code: "SR" },
  { label: "Swaziland", value: "268", code: "SZ" },
  { label: "Sweden", value: "46", code: "SE" },
  { label: "Switzerland", value: "41", code: "CH" },
  { label: "Tajikistan", value: "992", code: "TJ" },
  { label: "Thailand", value: "66", code: "TH" },
  { label: "Togo", value: "228", code: "TG" },
  { label: "Tokelau", value: "690", code: "TK" },
  { label: "Tonga", value: "676", code: "TO" },
  { label: "TrinidadandTobago", value: "1868", code: "TT" },
  { label: "Tunisia", value: "216", code: "TN" },
  { label: "Turkey", value: "90", code: "TR" },
  { label: "Turkmenistan", value: "993", code: "TM" },
  { label: "TurksandCaicosIslands", value: "1649", code: "TC" },
  { label: "Tuvalu", value: "688", code: "TV" },
  { label: "Uganda", value: "256", code: "UG" },
  { label: "Ukraine", value: "380", code: "UA" },
  { label: "UnitedArabEmirates", value: "971", code: "AE" },
  { label: "UnitedKingdom", value: "44", code: "GB" },
  { label: "UnitedStates", value: "1", code: "US" },
  { label: "Uruguay", value: "598", code: "UY" },
  { label: "Uzbekistan", value: "998", code: "UZ" },
  { label: "Vanuatu", value: "678", code: "VU" },
  { label: "WallisandFutuna", value: "681", code: "WF" },
  { label: "Yemen", value: "967", code: "YE" },
  { label: "Zambia", value: "260", code: "ZM" },
  { label: "Zimbabwe", value: "263", code: "ZW" },
  { label: "landIslands", value: "", code: "AX" },
  { label: "Antarctica", value: null, code: "AQ" },
  { label: "Bolivia,PlurinationalStateof", value: "591", code: "BO" },
  { label: "BruneiDarussalam", value: "673", code: "BN" },
  { label: "Cocos(Keeling)Islands", value: "61", code: "CC" },
  {
    label: "Congo,TheDemocraticRepublicofthe",
    value: "243",
    code: "CD",
  },
  { label: "Coted'Ivoire", value: "225", code: "CI" },
  { label: "FalklandIslands(Malvinas)", value: "500", code: "FK" },
  { label: "Guernsey", value: "44", code: "GG" },
  { label: "HolySee(VaticanCityState)", value: "379", code: "VA" },
  { label: "HongKong", value: "852", code: "HK" },
  { label: "Iran,IslamicRepublicof", value: "98", code: "IR" },
  { label: "IsleofMan", value: "44", code: "IM" },
  { label: "Jersey", value: "44", code: "JE" },
  {
    label: "Korea,DemocraticPeople'sRepublicof",
    value: "850",
    code: "KP",
  },
  { label: "Korea,Republicof", value: "82", code: "KR" },
  { label: "LaoPeople'sDemocraticRepublic", value: "856", code: "LA" },
  { label: "LibyanArabJamahiriya", value: "218", code: "LY" },
  { label: "Macao", value: "853", code: "MO" },
  {
    label: "Macedonia,TheFormerYugoslavRepublicof",
    value: "389",
    code: "MK",
  },
  { label: "Micronesia,FederatedStatesof", value: "691", code: "FM" },
  { label: "Moldova,Republicof", value: "373", code: "MD" },
  { label: "Mozambique", value: "258", code: "MZ" },
  { label: "Palestine", value: "970", code: "PS" },
  { label: "Pitcairn", value: "872", code: "PN" },
  { label: "Réunion", value: "262", code: "RE" },
  { label: "Russia", value: "7", code: "RU" },
  { label: "SaintBarthélemy", value: "590", code: "BL" },
  {
    label: "SaintHelena,AscensionandTristanDaCunha",
    value: "290",
    code: "SH",
  },
  { label: "SaintKittsandNevis", value: "1869", code: "KN" },
  { label: "SaintLucia", value: "1758", code: "LC" },
  { label: "SaintMartin", value: "590", code: "MF" },
  { label: "SaintPierreandMiquelon", value: "508", code: "PM" },
  {
    label: "SaintVincentandtheGrenadines",
    value: "1784",
    code: "VC",
  },
  { label: "SaoTomeandPrincipe", value: "239", code: "ST" },
  { label: "Somalia", value: "252", code: "SO" },
  { label: "SvalbardandJanMayen", value: "47", code: "SJ" },
  { label: "SyrianArabRepublic", value: "963", code: "SY" },
  { label: "Taiwan,ProvinceofChina", value: "886", code: "TW" },
  { label: "Tanzania,UnitedRepublicof", value: "255", code: "TZ" },
  { label: "Timor-Leste", value: "670", code: "TL" },
  { label: "Venezuela,BolivarianRepublicof", value: "58", code: "VE" },
  { label: "VietNam", value: "84", code: "VN" },
  { label: "VirginIslands,British", value: "1284", code: "VG" },
  { label: "VirginIslands,U.S.", value: "1340", code: "VI" },
];

export const TwoFactorPage = withRouter(({ history }) => {
  var uType = useParams().userType;
  const [phoneCode, setPhoneCode] = useState();
  const [codeSent, setCodeSent] = useState(false);
  const [state, setState] = useState({
    selectedOption: null,
  });
  const History = useHistory();
  const SShandleChange = (selectedOption) => {
    setState({ selectedOption });
    setPhoneCode(selectedOption.value);
    // //console.log(`Option selected:`, selectedOption);
  };

  //console.log("test: ", phoneCode);
  const [userCredentials, setUserCredentials] = useState({
    countryCode: "",
    phoneNumber: "",
  });

  const [fieldStatus, setFieldStatus] = useState({
    countryCode: true,
    phoneNumber: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const activateField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: true });
  };

  const disableField = (event) => {
    const { name } = event.target;
    setFieldStatus({ ...fieldStatus, [name]: false });
  };

  function VerifyAccount() {
    var user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (fieldStatus.countryCode !== "" && fieldStatus.phoneNumber !== "") {
      // if (!validateTowFactorAuthNumber(fieldStatus.phoneNumber)) {
      //   swal({
      //     title: "Error!",
      //     text: "Please Enter UAE number",
      //     icon: "error",
      //   });
      //   return;
      // }

      if (!codeSent) {
        axios
          .post(`https://api.thrillerme.com/sms/sendVerificationCode`, {
            user_id: user.user_id,
            username: "ThrillerTrans",
            password: "4xMrLRQs",
            destination:
              userCredentials.countryCode + userCredentials.phoneNumber,
            source: "THRILLER",
          })
          .then((res) => {
            //console.log(res);
            setCodeSent(true);
            //Verify Account
            swal({
              text: "Please enter the verification code",
              content: "input",
              button: {
                text: "Verify",
                closeModal: false,
              },
            })
              .then((name) => {
                //console.log(name);
                if (!name) throw null;

                return fetch(
                  `https://api.thrillerme.com/sms/verifyCode/${user.user_id}/${name}`
                );
              })
              .then((results) => {
                return results.json();
              })

              .then((json) => {
                //console.log(json);
                if (json) {
                  //replace true with json
                  swal({
                    title: "Done!",
                    text: "Your account is verified!",
                    icon: "success",
                  });
                  var user = JSON.parse(localStorage.getItem("user"));
                  var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
                  console.log(url);
                  user.isAuthenticated = 1;
                  axios
                    .put(url, user)
                    .then((res) => {
                      console.log(res.data);
                      localStorage.setItem("user", JSON.stringify(user));
                      swal.close();
                    })
                    .catch((err) => {
                      console.log(err);
                      //console.log(err);
                    });
                  if (!history.location.state.checkSetting) {
                    if (
                      (history.location.state.historyShoe !== null ||
                        history.location.state.historyShoe !== undefined) &&
                      !history.location.state.hasShipping
                    ) {
                      if (uType === undefined) {
                        history.push({
                          pathname: "/shippingInfo/1",
                          state: {
                            hasPayout: history.location.state.hasPayout,
                            historyShoe: history.location.state.historyShoe,
                          },
                        });
                      } else {
                        //This is from buyers -> login -> buy now
                        history.push({
                          pathname: "/shippingInfo/0/" + uType,
                          state: {
                            hasPayout: history.location.state.hasPayout,
                            historyShoe: history.location.state.historyShoe,
                          },
                        });
                      }
                    } else if (
                      (history.location.state.historyBuy !== null ||
                        history.location.state.historyBuy !== undefined) &&
                      !history.location.state.hasShippingBuy
                    ) {
                      history.push({
                        pathname: "/shippingInfo/0",
                        state: {
                          id: history.location.state.id,
                          historyBuy: history.location.state.historyBuy,
                        },
                      });
                    } else if (
                      (history.location.state.historyShoe !== null ||
                        history.location.state.historyShoe !== undefined) &&
                      !history.location.state.hasPayout
                    ) {
                      history.push({
                        pathname: "/payoutInfo",
                        state: {
                          historyShoe: history.location.state.historyShoe,
                        },
                      });
                    } else {
                      history.goBack();
                    }
                  }
                } else {
                  // swal({
                  //   title: "Error!",
                  //   text: "Invalid verification code!",
                  //   icon: "error",
                  // });
                  alert("Invalid verification code!");
                  swal.stopLoading();
                  swal.close();
                }
              })
              .catch((err) => {
                history.goBack();
                // console.error(err);
                // if (err) {
                //   swal("Error, request failed!", "error");
                // } else {
                //   swal.stopLoading();
                //   swal.close();
                // }
              });
          })
          .catch((err) => {
            console.error("sms", err);
          });
      } else {
        swal({
          text: "Please enter the verification code",
          content: "input",
          button: {
            text: "Verify",
            closeModal: false,
          },
        })
          .then((name) => {
            //console.log(name);
            if (!name) throw null;

            return fetch(
              `https://api.thrillerme.com/sms/verifyCode/${user.user_id}/${name}`
            );
          })
          .then((results) => {
            return results.json();
          })
          .then((json) => {
            //console.log(json);
            if (json) {
              //replace with json
              swal({
                title: "Done!",
                text: "Your account is verified!",
                icon: "success",
              });
              var user = JSON.parse(localStorage.getItem("user"));
              var url = `https://api.thrillerme.com/registrations/${user.user_id}`;
              user.isAuthenticated = 1;
              axios
                .put(url, user)
                .then((res) => {
                  //console.log(res.data);
                  localStorage.setItem("user", JSON.stringify(user));
                  swal.close();
                })
                .catch((err) => {
                  //console.log(err);
                });
              if (!history.location.state.checkSetting) {
                if (
                  (history.location.state.historyShoe !== null ||
                    history.location.state.historyShoe !== undefined) &&
                  !history.location.state.hasShipping
                ) {
                  if (uType === undefined) {
                    history.push({
                      pathname: "/shippingInfo/1",
                      state: {
                        hasPayout: history.location.state.hasPayout,
                        historyShoe: history.location.state.historyShoe,
                      },
                    });
                  } else {
                    history.push({
                      pathname: "/shippingInfo/0/" + uType,
                      state: {
                        hasPayout: history.location.state.hasPayout,
                        historyShoe: history.location.state.historyShoe,
                      },
                    });
                  }
                } else if (
                  (history.location.state.historyShoe !== null ||
                    history.location.state.historyShoe !== undefined) &&
                  !history.location.state.hasPayout
                ) {
                  history.push({
                    pathname: "/payoutInfo",
                    state: {
                      historyShoe: history.location.state.historyShoe,
                    },
                  });
                } else {
                  history.goBack();
                }
              }
            } else {
              // swal({
              //   title: "Error!",
              //   text: "Invalid verification code!",
              //   icon: "error",
              // });
              alert("Invalid verification code!");
              swal.stopLoading();
              swal.close();
            }
          })
          .catch((err) => {
            //console.log(err);
            if (err) {
              swal("Error, request failed!", "error");
            } else {
              swal.stopLoading();
              swal.close();
            }
          });
      }
    } else {
      alert("Please enter your phone number with country code.");
    }
  }
  return (
    <div className="page-container">
      <div className="two-factor-container">
        <i className="fas fa-shield-alt shield pt-2"></i>
        <div className="two-factor-text ">
          <h3>Secure Your Account</h3>
          <p>
            Enter your phone number below. An SMS will be sent to that number
            with a code to enter on the next screen.
          </p>
        </div>
        <div className="form-container">
          <Select
            // value={selectedOption}
            onChange={SShandleChange}
            options={codes}
          />
        </div>
        <div className="d-flex justify-content-center align-item-center mt-3">
          <div className="form-container1">
            <label
              className={fieldStatus.countryCode ? "float-label" : null}
              htmlFor={1}
            >
              Country Code
            </label>
            <input
              id={1}
              name="countryCode"
              type="text"
              onChange={handleChange}
              onFocus={activateField}
              // onBlur={disableField}
              disabled={true}
              value={phoneCode}
            />
          </div>
          <div className="form-container">
            <label
              className={fieldStatus.phoneNumber ? "float-label" : null}
              htmlFor={2}
            >
              Phone Number
            </label>
            <input
              id={2}
              name="phoneNumber"
              type="text"
              onChange={handleChange}
              onFocus={activateField}
              // onBlur={disableField}
              value={userCredentials.phoneNumber}
              placeholder="Phone number (5********)"
            />
          </div>
        </div>
        <div style={{ width: "100%" }} className="pb-1">
          <CustomButton onClick={() => VerifyAccount()} size="large">
            Continue
          </CustomButton>
        </div>
      </div>
    </div>
  );
});

// first select
// <SelectSearch
//   options={codes}
//   search
//   // filterOptions={fuzzySearch}
//   emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//   placeholder="Select your country" />
