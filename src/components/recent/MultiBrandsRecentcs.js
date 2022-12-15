import React from "react";
import "./NewCustomRecentcs.scss";
import { makingValidName } from "../../Constants/Functions";
import { useHistory } from "react-router-dom";
import cardImg6 from "../../temporary-data/6.png";
import { KeyboardArrowRight } from "@material-ui/icons";
const MultiBrandsRecentcs = ({ allProducts, tagsArry }) => {
  const history = useHistory();
  let resultProducts1 = allProducts?.filter((dat, index) =>
    makingValidName(dat?.tag).includes(makingValidName(tagsArry[0]))
  );
  let resultProducts2 = allProducts?.filter((dat, index) =>
    makingValidName(dat?.tag).includes(makingValidName(tagsArry[1]))
  );
  let resultProducts3 = allProducts?.filter((dat, index) =>
    makingValidName(dat?.tag).includes(makingValidName(tagsArry[2]))
  );
  let resultProducts4 = allProducts?.filter((dat, index) =>
    makingValidName(dat?.tag).includes(makingValidName(tagsArry[3]))
  );
  let resultProducts5 = allProducts?.filter((dat, index) =>
    makingValidName(dat?.tag).includes(makingValidName(tagsArry[4]))
  );
  const finalArray = [
    { brandName: tagsArry[0] + " Top 10", data: resultProducts1?.slice(0, 10) },
    { brandName: tagsArry[1] + " Top 10", data: resultProducts2?.slice(0, 10) },
    { brandName: tagsArry[2] + " Top 10", data: resultProducts3?.slice(0, 10) },
    { brandName: tagsArry[3] + " Top 10", data: resultProducts4?.slice(0, 10) },
    { brandName: tagsArry[4] + " Top 10", data: resultProducts5?.slice(0, 10) },
  ];

  return (
    <div className="col-11" style={{ margin: "0px auto" }}>
      <div className="row flex-row">
        <div className="col-10">
          <h1>Thriller Top 10</h1>
        </div>
        <div className="col-2">
          <button
            onClick={() => alert("don't know where to go")}
            className="nextButton"
          >
            <KeyboardArrowRight />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="productShowDivBrands">
          {finalArray.map((dat, index) => (
            <div className="columnProductContainer" key={index}>
              <h4>{dat.brandName}</h4>
              <div className="cardContainers">
                {dat?.data?.map((dam, ind) => {
                  const newname = makingValidName(`${dam.name}`);
                  const newshoeid = makingValidName(`${dam.shoe_id}`);
                  return (
                    <div
                      onClick={() =>
                        history.push(`/${newname}_id_${newshoeid}`)
                      }
                      key={ind}
                      className="smallCardCont"
                    >
                      <span className="spanText">{ind + 1}</span>
                      <img
                        src={dam.cover_image ? dam.cover_image : cardImg6}
                        alt={dam.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiBrandsRecentcs;
