import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./List.css";

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

  return (
    <div>
      <div className="h6">{title}</div>
      <ul className="listULs">
        {items.map((item, index) => {
          return (
            <li key={index}>
              <a href={"/product/" + item.shoe_id}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
