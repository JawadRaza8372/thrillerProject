import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Links.css";
import List from "../list/List";
import ListSkeleton from "../list/ListSkeleton";

import { TermLinks } from "../term-links/term-links.component";
import { BASE_URL } from "../../Constants/Global";

const Links = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // setItems([
    //     {
    //       "collection_id": 20,
    //       "imageURL": "https://dk0pm9zdlq16s.cloudfront.net/4de136a4-a575-4f52-b82b-625e0692d9fd.png",
    //       "title": "Air Jordan ",
    //       "description": "It could be said that Michael Jordan was the genesis of basketball as we know it today. Throughout a fiery and storied career, MJ overcame his hurdles, soaring challenge above challenge to realize the unexpected. Along the way, he redefined basketball's relationship to style, the sports connection to youth counter-culture and the games creative potential."
    //     },
    //     {
    //       "collection_id": 21,
    //       "imageURL": null,
    //       "title": "Dunks",
    //       "description": "The Nike Dunk was released in August 1985 as a high-top basketball sneaker, having been crafted out of four earlier Nike models – the Air Force 1, the Terminator, the Air Jordan 1 and the Legend. The model is now embraced by skaters because of its durability and build, giving rise to the Nike SB and SB Dunk. "
    //     },
    //     {
    //       "collection_id": 22,
    //       "imageURL": "https://dk0pm9zdlq16s.cloudfront.net/e850eaad-4d4e-4e70-a61b-e8dfdb0bbe56.jpg",
    //       "title": "Yeezy",
    //       "description": "The man, the legend, the creator behind one of the biggest sneaker models in history. Kanye West first worked with adidas in 2006 when he designed a sneaker for the brand that was ultimately never released. "
    //     },
    //     {
    //       "collection_id": 23,
    //       "imageURL": null,
    //       "title": "The Ten ",
    //       "description": null
    //     },
    //     {
    //       "collection_id": 24,
    //       "imageURL": null,
    //       "title": "Travis Scott ",
    //       "description": "Travis Scott, hip-hop artist, record label founder and Houston, Texas native. Decades after MJ's abilities and fiery play pushed his sport's boundaries to new, never-before-seen heights, Scott's imaginative output has moved music and streetwear culture forwards with innovation and passion. View a stylistic mixture of purposeful simplicity, utility and comfort underlines another special collaboration between Jordan and Jack."
    //     },
    // ]);

    var url = BASE_URL+`shoes/footer/5`;
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
