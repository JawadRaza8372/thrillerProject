import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Links.css";
import List from "../list/List";
import ListSkeleton from "../list/ListSkeleton";

import { TermLinks } from "../term-links/term-links.component";

const Links = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    var url = `https://api.thrillerme.com/shoes/footer/5`;
    axios
      .get(url)
      .then((res) => {
        ////console.log("Foo", res.data);
        setItems(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="top-container">
        {items.map((item, index) => {
          return (
            <div className="list-container" key={index}>
              <div style={{ display: "none" }}>
                {setTimeout(() => {
                  setLoading(false);
                }, 2000)}{" "}
              </div>

              {loading ? (
                <ListSkeleton />
              ) : (
                <List title={item.title} collection_id={item.collection_id} />
              )}
            </div>
          );
        })}
      </div>
      {/* <hr className="term_link_hr" /> */}
      <div
        style={{
          // background: "#000000",
          position: "relative",
          zIndex: "950",
        }}
      >
        <TermLinks />
      </div>
    </div>
  );
};

export default Links;
