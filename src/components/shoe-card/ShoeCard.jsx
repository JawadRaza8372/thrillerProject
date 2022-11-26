import React from "react";
import { Row, Card } from "react-bootstrap";
import "./ShoeCard.scss";
import { useHistory, withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makingValidName } from "../../Constants/Functions";

const ShoeCard = ({
  id,
  img,
  name,
  oldprice,
  newprice,
  date,
  filter,
  tag,
  showCount,
  fulldata,
}) => {
  const history = useHistory();
  // if (fulldata) {
  //   console.log("shoecard ma checking k liy rakha hy", fulldata);
  // }
  // //console.log(showCount);
  const newname = makingValidName(`${fulldata.name}`);
  const newskunumb = makingValidName(`${fulldata.sku_number}`);
  const newshoeid = makingValidName(`${fulldata.shoe_id}`);

  return (
    <div
      style={showCount == 1 ? { width: "100%" } : null}
      className={filter ? "px-container  " : "px-container large"}
    >
      <div className="d-flex flex-row justify-content-between card-btn-container">
        <div style={{ paddingLeft: "15px", paddingTop: "3px" }}>
          {date !== null && date !== undefined ? (
            <span className="dtTxt">{date.split("-")[0]}</span>
          ) : (
            <span>
              <br />
            </span>
          )}
        </div>
        {tag.indexOf("New") > -1 && (
          <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
            <div className="btn btn-primary btnWnt">New</div>
          </div>
        )}
      </div>
      <div style={{ width: "fit-content" }}>
        <Card
          onClick={() => {
            history.push(
              `/product/${newname}_sku_${newskunumb}_id_${newshoeid}`
            );
          }}
        >
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {newprice ? (
                <span className="newTxt"> AED {newprice}</span>
              ) : null}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ShoeCard;
