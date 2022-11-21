import React,{useState} from 'react';
import "./drop-down.styles.scss";

import Select from "react-select";

const customStyles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
      width: "100%",
    }),
  };

export const DropDown = ({sortOptions}) => {
    const [sort, setSort] = useState(sortOptions);

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
        options={sort}
        styles={customStyles}
        theme={customTheme}
        // onChange={setSort}
        defaultValue={sortOptions[0]}
      />   
        </div>
    )
}
