import { Container, Typography, makeStyles } from "@material-ui/core";
import WovenImageList from "./image-gallery";
import MasonaryComponent from "./react-masonary";
import axios from "axios";
import { useEffect, useState } from "react";

console.log("test");

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "3rem 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  topContainer: {
    padding: "5em 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  topHeading: {
    fontSize: "32px",
    lineHeight: "1.38rem",
    letterSpacing: "0.1px",
    marginBlockStart: "0.67em",
    marginBlockEnd: "0.67em",
    marginInlinestart: "0px",
    marginInlineEnd: "0px",
  },
  topText: {
    color: "#818181",
    fontSize: "14px",
    lineHeight: "16px",
    marginTop: "1rem",
    fontWeight: "500",
  },
}));

const StylePage = () => {
  const classes = useStyles();

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [headerData, setHeaderData] = useState({});
  const [metaImages, setMetaImages] = useState([]);

  const fetchData = async () => {
    const result = await axios(
      `https://api.thrillerme.com/styles/gallery/${count}`
    );
    setData(result.data);
  };

  useEffect(async () => {
    const fetchImages = await axios.get(
      `https://api.thrillerme.com/styles/gallery/${count}`
    );
    setData(fetchImages.data);

    const test = fetchImages.data.map((item) => ({
      id: item.id,
      images: [
        { id: item.id, url: item.cover, shoeId: item.shoe_id, tag: item.tag },
        // ...item.meta_tag.split(",").map((image) => ({
        //   id: item.id,
        //   url: image,
        //   shoeId: item.shoe_id,
        //   tag: item.tag,
        // })),
      ],
    }));

    const values = test.map((val) => {
      return {
        id: val.id,
        images: val.images.filter((item) => item.url !== ""),
      };
    });
    console.log(values, "aaaa");
    setMetaImages(values);

    const resultedData = await axios.get("https://api.thrillerme.com/styles");

    setHeaderData(resultedData.data[0]);
  }, []);

  // console.log(data);

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
      <div className={classes.topContainer}>
        <Typography variant="h4" align="center">
          {headerData.header}
        </Typography>
        <Typography variant="body1" align="center" className={classes.topText}>
          {headerData.details}
        </Typography>
      </div>
      <div className="image-gallery">
        {console.log(data, "hey")}
        <MasonaryComponent images={data} metaImages={metaImages} />
      </div>
      {data.length >= 24 && (
        <div style={{ textAlign: "center" }}>
          <button
            className="load-more-btn"
            onClick={() => {
              setCount(count + 1);
              fetchData();
            }}
          >
            Load more
          </button>
        </div>
      )}
    </Container>
  );
};

export default StylePage;
