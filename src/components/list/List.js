import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./List.css";
import { makingValidName } from "../../Constants/Functions";
const List = ({ title, collection_id }) => {
  const [items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    var url = `https://api.thrillerme.com/shoes/footerItem/${collection_id}/7`;
    axios
      .get(url)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [collection_id]);
  // if (items.length > 0) {
  //   console.log("list.js wali file ma items array", items[0]);
  // }

  return (
    <div>
      <div className="h6">{title}</div>
      <ul className="listULs">
        {items.map((item, index) => {
          const newname = makingValidName(item.name);
          const newskunumb = makingValidName(`${item.sku_number}`);
          const newshoeid = makingValidName(`${item.shoe_id}`);

          return (
            <li key={index}>
              <Link
                to={`/product/${newname}_sku_${newskunumb}_id_${newshoeid}`}
              >
                {item.name}
              </Link>
              {/* <a href={"/product/" + item.shoe_id}>{item.name}</a> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
