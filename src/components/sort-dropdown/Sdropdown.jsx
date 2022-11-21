import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Sdropdown.scss";
import axios from "axios";

const sortOptions = [
  { value: "desc", label: "Descending Price" },
  { value: "", label: "All" },
  { value: "featured", label: "Featured" },
  { value: "popular", label: "Popular" },
  { value: "new", label: "New" },
  { value: "asc", label: "Ascending price" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35,
    width: "200px",
  }),
};

const Sdropdown = ({ setProducts }) => {
  const [sort, setSort] = useState("popular");
  //console.log(sort);
  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary50: "whitesmoke",
        primary25: "whitesmoke",
        primary: "gray",
      },
    };
  };
  // useEffect(() => {
  //   const handleReq = async () => {
  //     if (sort.value === "") {
  //       const { data } = await axios.get(`https://api.thrillerme.com/shoes`);
  //       ////console.log(data);
  //       setProducts(data);
  //     } else if (sort.value === "asc") {
  //     } else if (sort.value === "desc") {
  //     } else {
  //       const { data } = await axios.get(
  //         `https://api.thrillerme.com/shoes/getByTag/${sort.value}`
  //       );
  //       ////console.log(data);
  //       setProducts(data);
  //     }
  //   };
  //   handleReq();
  // }, [setProducts, sort]);

  const handleReq = async (value) => {
    if (value === "") {
      const { data } = await axios.get(`https://api.thrillerme.com/shoes`);
      //console.log(data);
      setProducts(data);
    } else if (value === "asc") {
      const res = await axios.get(`https://api.thrillerme.com/shoes/priceAsc`);
      ////console.log(data);
      setProducts([]);
      setProducts(res.data);
      // setTimeout(() => {
      //   //console.log(res);
      //   setProducts(res.data);
      // }, 2000);
    } else if (value === "desc") {
      const res = await axios.get(`https://api.thrillerme.com/shoes/priceDesc`);
      ////console.log(data);
      setProducts([]);
      setProducts(res.data);
      // setTimeout(() => {
      //   //console.log(res);
      //   setProducts(res.data);
      // }, 2000);
    } else {
      const res = await axios.get(
        `https://api.thrillerme.com/shoes/getByTag/${value}`
      );
      ////console.log(data);

      setProducts([]);
      setProducts(res.data);
      // setTimeout(() => {
      //   //console.log(res);
      //   setProducts(res.data);
      // }, 2000);
    }
  };

  const handleInputChange = async (selected) => {
    setSort(selected.value);
    await handleReq(selected.value);
  };

  // const handleInputChange = (inputValue) => {
  //   setSort(inputValue);
  //   handleReq();
  //   //get the character entered by user here in inputValue
  // };

  return (
    <div>
      <Select
        options={sortOptions}
        styles={customStyles}
        theme={customTheme}
        onChange={handleInputChange}
        // onChange={setSort}
        defaultValue={sortOptions[0]}
        // onClick={handleReq}
      />
    </div>
  );
};

export default Sdropdown;
