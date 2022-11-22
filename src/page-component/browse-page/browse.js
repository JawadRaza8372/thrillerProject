import React, { useState, useEffect, useCallback } from "react";
import FilterSection from "../../components/filter-section/FilterSection";
import FilterSort from "../../components/filter-sortbar/FilterSort";
import ShoeCard from "../../components/shoe-card/ShoeCard";
import ShopBanner from "../../components/shop-all-bannar/ShopBanner";
import cardImg1 from "../../temporary-data/1.png";
import logo from "../../temporary-data/nike.png";
import FilterButton from "../../components/filterBtn/filterBtn";
import FilterComponentt from "../../components/filterCompnent/Filter";

import axios from "axios";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useParams,
} from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Links from "../../components/links/Links";
import { Fragment } from "react";

const Browse = (props) => {
  const [dataLoad, setDataLoad] = useState(false);

  var mainURL = "https://appick.io/u/thriller/imgs/";
  var id = useParams().id;
  var keyword = useParams().keyword;
  var sizee = useParams().sizee;
  console.log("###### size ########", sizee);

  localStorage.setItem("myCollectionID", id);

  const [filter, setFilter] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [collectionData, setCollectionData] = useState({
    collection_id: 0,
    title: "Shop All",
    description: "",
    imageURL: "",
  });
  const [products, setProducts] = useState([]);
  const [filterComponent, setFilterComponent] = useState(false);

  //console.log("P: ", products.length);

  const toggleFilterComponent = () => {
    setFilterComponent(!filterComponent);
  };

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    // //console.log(width);
    return width;
  }

  const checkSelectedSection = async () => {
    // //console.log("Loading by tag: ", selectedSection);
    const selectedSection = JSON.parse(localStorage.getItem("selectedSection"));
    // //console.log(selectedSection)
    if (selectedSection !== null) {
      // //console.log("pass");
      ////setProducts([]);
      const { data } = await axios.get(
        `https://api.thrillerme.com/shoes/getByTag/${selectedSection}`
      );
      //////console.log(data);
      setProducts(data);
    }
  };

  const setFooter = () => {
    setTimeout(() => setDataLoad(true), 4000);
  };

  var widthScreen = getWindowDimensions();
  var check = false;

  useEffect(() => {
    async function load() {
      setProducts([]);
      if (isNaN(id) && keyword !== undefined) {
        console.log("################# 001 ################");
        //console.log("Search by keyword:", keyword);
        setCollectionData({
          ...collectionData,
          title: '"' + keyword + '"',
        });
        //Load Products
        var urlProducts = `https://api.thrillerme.com/shoes/getByName/${keyword}`;
        var encodedURLProducts = encodeURI(urlProducts);
        await axios.get(encodedURLProducts).then((res) => {
          setProducts([]);
          console.log(res);
          setProducts(res.data);
          localStorage.setItem("nav", `Collection/Shop All`);
        });
        // if (!filterComponent) {
        //   var filterDataCol = JSON.parse(localStorage.getItem("filter"));
        //   if (filterDataCol === null) {
        //     console.log("filtercheck");
        //   } else {
        //     setProducts([]);
        //     console.log("loadingfilterdata");
        //     console.log(filterDataCol);
        //     setProducts(filterDataCol);
        //   }
        // }
      } else if (id > 0) {
        console.log("################# 002 ################");

        if (sizee !== undefined) {
          //Load Products
          var urlProducts = `https://api.thrillerme.com/shoes/collections/${id}/size/${sizee}`;
          console.log(urlProducts);
          var encodedURLProducts = encodeURI(urlProducts);
          await axios
            .get(encodedURLProducts)
            .then((res) => {
              //console.log(res.data);
              setProducts(res.data);
            })
            .catch((e) => {
              console.error(e);
            });
        } else if (!filterComponent) {
          //console.log("Filtered.....");
          var url = `https://api.thrillerme.com/collections/${id}`;
          var encodedURL = encodeURI(url);
          await axios.get(encodedURL).then((res) => {
            //console.log(res);
            setCollectionData(res.data);
            localStorage.setItem("nav", `Collection/${collectionData.title}`);
          });

          //Load Products
          var urlProducts = `https://api.thrillerme.com/shoes/collections/${id}`;
          var encodedURLProducts = encodeURI(urlProducts);
          await axios(encodedURLProducts).then((res) => {
            //console.log("Res", res.data);
            setProducts(res.data);
          });

          // var filterDataId = JSON.parse(localStorage.getItem("filter"));
          // if (filterDataId === null) {
          //   console.log("filtercheck");
          // } else {
          //   setProducts([]);
          //   console.log("loadingfilterdata");
          //   console.log(filterDataId);
          //   setProducts(filterDataId);
          // }

          // axios
          //   .get(encodedURLProducts)
          //   .then((res) => {
          //     //console.log("Data", res.data);
          //     ////setProducts([]);
          //   })
          //   .catch((e) => {
          //     console.error(e);
          //   });
        } else {
          //console.log("Un Filtered.....");
          var url = `https://api.thrillerme.com/collections/${id}`;
          var encodedURL = encodeURI(url);
          await axios.get(encodedURL).then((res) => {
            setCollectionData(res.data);
            localStorage.setItem("nav", `Collection/${collectionData.title}`);
          });

          if (sizee !== undefined) {
            //Load Products
            var urlProducts = `https://api.thrillerme.com/shoes/collections/${id}/size/${sizee}`;
            var encodedURLProducts = encodeURI(urlProducts);
            await axios
              .get(encodedURLProducts)
              .then((res) => {
                //console.log(res.data);
                setProducts(res.data);
              })
              .catch((e) => {
                console.error(e);
              });
          } else {
            //Load Products
            var urlProducts = `https://api.thrillerme.com/shoes/collections/${id}`;
            var encodedURLProducts = encodeURI(urlProducts);
            await axios
              .get(encodedURLProducts)
              .then((res) => {
                //console.log(res.data);
                setProducts(res.data);
              })
              .catch((e) => {
                console.error(e);
              });
          }

          // var filterData = JSON.parse(localStorage.getItem("filter"));
          // if (filterData === null) {
          //   console.log("filtercheck");
          // } else {
          //   setProducts([]);
          //   console.log("loadingfilterdata");
          //   console.log(filterData);
          //   setProducts(filterData);
          // }
        }
      } else {
        console.log("################# 003 ################", sizee);

        if (sizee !== undefined) {
          //Load by size
          const { data } = await axios.get(
            `https://api.thrillerme.com/shoes/getBySize/${sizee}`
          );
          if (data.length === 0) {
            setProducts([]);
          } else {
            setProducts([]);
            window.localStorage.setItem("filter", JSON.stringify(data));
            setProducts(data);
          }
        } else {
          console.log(
            "################# filter ################",
            filterComponent
          );

          //Load Products
          var urlProducts = `https://api.thrillerme.com/shoes/priceDesc`;
          var encodedURLProducts = encodeURI(urlProducts);
          await axios.get(encodedURLProducts).then((res) => {
            setProducts(res.data);

            localStorage.setItem("nav", `Collection/Shop All`);
          });

          // if (!filterComponent) {
          //   //Load Products
          //   var urlProducts = `https://api.thrillerme.com/shoes/priceDesc`;
          //   var encodedURLProducts = encodeURI(urlProducts);
          //   await axios.get(encodedURLProducts).then((res) => {
          //     setProducts(res.data);

          //     localStorage.setItem("nav", `Collection/Shop All`);
          //   });
          //   var filterDataAll = JSON.parse(localStorage.getItem("filter"));
          //   if (filterDataAll === null) {
          //     console.log("filtercheck");
          //   } else {
          //     setProducts([]);
          //     console.log("loadingfilterdata");
          //     console.log(filterDataAll);
          //     setProducts(filterDataAll);
          //   }
          // }
        }
      }
      if (products.length === 0) {
        check = true;
      }
      //console.log("Found: ", products.length);
      //console.log("Check: ", check);

      setFooter();
    }
    ////console.log("Rendered...");
    const localStorageSet = localStorage.getItem("selectedSection");
    if (localStorageSet !== null) {
      checkSelectedSection();
    } else {
      // Load();
      load();

      ////console.log("load items");
      // setLoaded(true);
    }
    setLoaded(true);
  }, [keyword, id, sizee]);
  // Load, id, keyword, filterComponent
  // useEffect(() => {
  //   // Load()
  //   ////console.log("new data");
  //   ////console.log(check);
  //   ////console.log(products);
  //   // setLoaded(true);
  //   // setDataLoad(true)
  // }, [filterComponent]);
  // testing clgs

  // setProducts(tempAray)
  // Similar to componentDidMount and componentDidUpdate:

  // async function Load() {
  //   ////console.log("collection_id: ", id);

  //   if (keyword) {
  //     //console.log("################# 001 ################");
  //     if (!filterComponent) {
  //       //console.log("Search by keyword:", keyword);
  //       setCollectionData({
  //         ...collectionData,
  //         title: '"' + keyword + '"',
  //       });
  //       //Load Products
  //       var urlProducts = `https://api.thrillerme.com/shoes/getByName/${keyword}`;
  //       var encodedURLProducts = encodeURI(urlProducts);
  //       axios.get(encodedURLProducts).then((res) => {
  //         //console.log(res);
  //         setProducts(res.data);
  //         localStorage.setItem("nav", `Collection/Shop All`);
  //       });
  //     }
  //   } else if (id > 0) {
  //     //console.log("################# 002 ################");
  //     if (!filterComponent) {
  //       //console.log("Filtered.....");
  //       var url = `https://api.thrillerme.com/collections/${id}`;
  //       var encodedURL = encodeURI(url);
  //       axios.get(encodedURL).then((res) => {
  //         setCollectionData(res.data);
  //         localStorage.setItem("nav", `Collection/${collectionData.title}`);
  //       });

  //       //Load Products
  //       var urlProducts = `https://api.thrillerme.com/shoes/collections/${id}`;
  //       var encodedURLProducts = encodeURI(urlProducts);
  //       const res = await axios(encodedURLProducts);
  //       //console.log("Res", res.data);
  //       setProducts(res.data);

  //       // axios
  //       //   .get(encodedURLProducts)
  //       //   .then((res) => {
  //       //     //console.log("Data", res.data);
  //       //     ////setProducts([]);
  //       //   })
  //       //   .catch((e) => {
  //       //     console.error(e);
  //       //   });
  //     } else {
  //       //console.log("Un Filtered.....");
  //       var url = `https://api.thrillerme.com/collections/${id}`;
  //       var encodedURL = encodeURI(url);
  //       axios.get(encodedURL).then((res) => {
  //         setCollectionData(res.data);
  //         localStorage.setItem("nav", `Collection/${collectionData.title}`);
  //       });

  //       //Load Products
  //       var urlProducts = `https://api.thrillerme.com/shoes/collections/${id}`;
  //       var encodedURLProducts = encodeURI(urlProducts);
  //       axios
  //         .get(encodedURLProducts)
  //         .then((res) => {
  //           //console.log(res.data);
  //           ////setProducts([]);
  //           setProducts(res.data);
  //         })
  //         .catch((e) => {
  //           console.error(e);
  //         });
  //     }
  //   } else {
  //     //console.log("################# 003 ################");
  //     if (!filterComponent) {
  //       //Load Products
  //       var urlProducts = `https://api.thrillerme.com/shoes/`;
  //       var encodedURLProducts = encodeURI(urlProducts);
  //       axios.get(encodedURLProducts).then((res) => {
  //         //setProducts([]);
  //         setProducts(res.data);
  //         localStorage.setItem("nav", `Collection/Shop All`);
  //       });
  //     }
  //   }
  //   if (products.length === 0) {
  //     check = true;
  //   }
  //   //console.log("Found: ", products.length);
  //   //console.log("Check: ", check);

  //   setFooter();
  // }

  return (
    <div>
      {loaded && (
        <div className="primary-container">
          {filterComponent && (
            <div>
              <FilterComponentt
                setProducts={setProducts}
                filterComponent={filterComponent}
                setFilterComponent={setFilterComponent}
              />
            </div>
          )}
          {!filterComponent && (
            <div>
              {widthScreen > 481 ? (
                <div>
                  <ShopBanner
                    bannerText={collectionData.title}
                    productText={collectionData.description}
                    image={collectionData.imageURL}
                  />
                  <FilterSort
                    setProducts={setProducts}
                    count="1000"
                    filter={filter}
                    setFilter={setFilter}
                  />
                </div>
              ) : null}
              <div>
                <FilterButton
                  className="browse_FilterBtn"
                  filterComponent={filterComponent}
                  setFilterComponent={setFilterComponent}
                />
              </div>
              <div className="d-flex flex-row justify-content-center">
                {filter ? (
                  <FilterSection
                    setProducts={setProducts}
                    filterComponent={filterComponent}
                  />
                ) : null}
                <div
                  className="d-flex flex-row justify-content-center flex-wrap mb-4 "
                  // style={{ border: "1px solid red" }}
                  // style={{ paddingRight: "13px" }}
                >
                  {products &&
                    products.map((elem, index) => (
                      //Get lowest price here  by API
                      <ShoeCard
                        id={elem.shoe_id}
                        filter={filter}
                        img={elem.cover_image}
                        name={elem.name}
                        // oldprice="250"
                        newprice={elem.price}
                        date={elem.release_date}
                        tag={elem.tag}
                        showCount={products.length}
                        key={index}
                      />
                    ))}

                  {dataLoad && products.length === 0 ? (
                    <span>There are no available results</span>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          {dataLoad ? (
            <div className="zzz">
              <Fragment>
                <Links />
                <Footer />
              </Fragment>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Browse;
