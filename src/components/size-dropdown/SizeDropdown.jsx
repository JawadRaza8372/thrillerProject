import React, { useState } from "react";
import Select from "react-select";

const sizeOptions = [
  { value: "us", label: "US" },
  { value: "uk", label: "UK" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35,
    width: "70px",
    border: 0,
    boxShadow: "none",
  }),
};

const SizeDropdown = () => {
  const [size, setSize] = useState("us");
  //console.log(size);

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

  return (
    <div>
      <Select
        options={sizeOptions}
        styles={customStyles}
        theme={customTheme}
        onChange={setSize}
        defaultValue={sizeOptions[0]}
      />
    </div>
  );
};

export default SizeDropdown;
