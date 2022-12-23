import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { recentData } from "../../temporary-data/recentData";
import { popularData } from "../../temporary-data/popularData";
import "./Searchbar.scss";
import axios from "axios";
import { SearchResult } from "../../components/search-result/search-result.component";
import { Avatar } from "@material-ui/core";
import debounce from "lodash.debounce";
import { makingValidName } from "../../Constants/Functions";
import searchIcon from '../../assets/searchIcon.png';
import { BASE_URL } from "../../Constants/Global";
// api.thrillerme.com/shoes/getByName/nike%20dunk

const Searchbar = ({ searchbar, setSearchbar, allProducts, allBrands }) => {
  const CancelToken = axios.CancelToken;
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterBrands, setfilterBrands] = useState([]);
  let cancel;

  const [inputValue, setInputValue] = useState("");
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const history = useHistory();
  const [filterData, setFilterData] = useState([]);
  const [isSearching, setSearching] = useState(false);
  var searchArr = [];
  var sVal = "";
  const [products, setProudcts] = useState(null);
  var timer = null;
  // useEffect(() => {
  //   axios.get(BASE_URL+`shoes`).then((res) => {
  //     setProudcts(res.data);
  //     //console.log("### data ###", products);
  //   });
  // }, []);

  useEffect(() => {
    try {
      var userID = JSON.parse(window.localStorage.getItem("user"));
      //////console.log("userID", userID);
      if (userID !== null) {
        userID = userID.user_id;
      } else {
        userID = 0;
      }

      var url = BASE_URL+`searches/recent/${userID}/5`;
      axios
        .get(url)
        .then((res) => {
          setRecent(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      //////console.log(e);
    }

    var urlP = BASE_URL+`searches/popular/5`;
    axios
      .get(urlP)
      .then((res) => {
        setPopular(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchbar]);

  function goTo(rout) {
    setSearchbar(!searchbar);
    // history.push(`/browse/0/${rout}`);
    window.open(`https://thrillerme.com/browse/0/${rout}/`, "_self");
  }
  // const handleFeild = () => {
  //   handlechange()
  //   getFilterData()
  // }

  const handlechange = (e) => {
    if (e.target.value.length === 0) {
      setSearchbar(false);
    } else {
      setSearchbar(true);
    }
    setInputValue(e.target.value);

    var enterdValue = makingValidName(`${e.target.value}`);
    setFilterProducts(
      allProducts?.filter(
        (dat, index) =>
          makingValidName(`${dat.name}`)?.includes(enterdValue) ||
          makingValidName(`${dat.name}`) === enterdValue ||
          makingValidName(`${dat.colorway}`)?.includes(enterdValue) ||
          makingValidName(`${dat.colorway}`) === enterdValue ||
          makingValidName(`${dat.sku_number}`)?.includes(enterdValue) ||
          makingValidName(`${dat.sku_number}`) === enterdValue
      )
    );
    setfilterBrands(
      allBrands?.filter(
        (item, index) =>
          makingValidName(`${item.title}`)?.includes(enterdValue) ||
          makingValidName(`${item.title}`) === enterdValue
      )
    );
  };

  // var setQuery = debounce(async function (query) {
  //   //console.log("#### val #####", query);
  //   searchArr.push(query);
  //   makeSearchArray(query);
  // }, 1000);

  // const makeSearchArray = debounce(async function (query) {
  //   getFilterData();
  // }, 3000);

  const getFilterData = (e) => {
    if (cancel !== undefined) {
      cancel();
    }
    //console.log("### search ###", e);

    axios
      .get(BASE_URL+`shoes/searchShoe/${e}`, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then((res) => {
        setFilterData([]);
        setFilterData(res.data);
        setSearching(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          //console.log("post Request canceled");
        }
      });
  };

  const getUser = async () => {
    try {
      let { user_id } = await JSON.parse(window.localStorage.getItem("user"));
      return user_id;
    } catch (error) {
      return 0;
    }
  };

  function SaveSearch(key) {
    if (
      inputValue !== null &&
      inputValue !== "" &&
      inputValue.trim().length > 1
    ) {
      var url = "https://api.thrillerme.com/searches";
      var userID = 0;
      try {
        userID = JSON.parse(window.localStorage.getItem("user")).user_id;
        window.localStorage.setItem("filter", null);
      } catch (error) {}
      axios
        .post(url, {
          user_id: userID,
          keyword: key,
        })
        .then((res) => {
          const data = { keyword: inputValue, userId: userID };
          setInputValue("");
          window.open(
            `https://thrillerme.com/browse/0/${data.keyword}`,
            "_self"
          );
          // window.open(
          //   `http://localhost:3000/browse/0/${data.keyword}`,
          //   "_self"
          // );
          // history.push(`/browse/0/${data.keyword}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const postRoute = async (data) => {
    await axios.post("https://api.thrillerme.com", data);
  };

  const handleSubmit = async (e) => {
    setSearchbar(!searchbar);
    e.preventDefault();
    const userID = await getUser();
    SaveSearch(inputValue);
  };
  //////console.log(filterData);
  return (
    <div className="searchBarComponentMain">
      <div
        className={searchbar ? "clear" : "nav-menusb"}
        onClick={() => setSearchbar(!searchbar)}
      ></div>
      <nav className={searchbar ? "nav-menusb active" : "nav-menusb"}>
        <div className="searchBox">
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <input
                style={{
                  // textAlign: 'center',
                  // verticalAlign: 'center',
                  fontWeight: "1000",
                  fontSize: "18px",
                  // textTransform: "uppercase",
                }}
                name="input"
                onChange={handlechange}
                value={inputValue}
                placeholder="Search for brands, colors etc"
              />
              {/* <i className="fas fa-search"></i> */}
              <img src={searchIcon} />
            </form>
          </div>
        </div>
        {isSearching ? (
          <i
            className="fas fa-circle-notch fa-spin"
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></i>
        ) : null}

        {(inputValue == "" || inputValue == null) && recent.length > 0 && (
          <h6>Recent Searches</h6>
        )}

        {(inputValue == "" || inputValue == null) && (
          <ul className="nav-menu-items">
            {recent && recent.map((item, index) => {
              return (
                <li
                  key={index}
                  className="search-text"
                  onClick={() => goTo(item.keyword)}
                >
                  {/* {////console.log(item)} */}
                  {/* to="/browse/0/" */}
                  <Link>
                    <span className="nav-text">
                      <div className="hover">{item.keyword}</div>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {(inputValue == "" || inputValue == null) && <h6>Popular Searches</h6>}
        {(inputValue == "" || inputValue == null) && (
          <ul className="nav-menu-items">
            <li
              className="navbar-toogle"
              onClick={() => setSearchbar(!searchbar)}
            >
              <Link to="#" className="menu-bars"></Link>
            </li>
            {popular.map((item, index) => {
              return (
                <li
                  key={index}
                  className="search-text"
                  onClick={() => goTo(item.keyword)}
                >
                  {/* to="/browse/0/" */}
                  <Link>
                    <span className="nav-text">
                      <div className="hover">{item.keyword}</div>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {inputValue.length > 0 ? (
          <SearchResult
            className="result"
            SearchResult={filterProducts}
            setSearchbar={setSearchbar}
            setInputValue={setInputValue}
            searchbar={searchbar}
          />
        ) : null}
      </nav>
    </div>
  );
};

export default Searchbar;

// (inputValue !== "") && <ul className="nav-menu-items">
//           {filterData.map((item) => {
//             return (
//               <li
//                 key={item.shoe_id}
//                 className="search-text"
//               // onClick={() => goTo(item.keyword)}
//               >
//                 {//////console.log(item)}
//                 <Link to={`/browse/0/${item.shoe_id}`}>
//                   <span className="nav-text">
//                     <Avatar src={item.cover_image} />
//                     <div className="hover">{item.name}</div>
//                   </span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
