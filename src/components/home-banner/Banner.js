import React from "react";
import "./style.scss";
import {
  Typography,
  Box,
  Container,
  makeStyles,
  Grid,
  Hidden,
} from "@material-ui/core";
import Shoe1 from "./assets/banner-shoe-image-1.png";
import Shoe2 from "./assets/banner-shoe-image-2.png";
import Shoe3 from "./assets/banner-shoe-image-3.png";

const useStyles = makeStyles((theme) => ({
  Images: {
    width: "100%",
  },
  // centeredImage: {
  //   maxWidth: "400px",
  //   maxHeight: "500px",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "100%",
  //     maxHeight: "400px",
  //   },
  // },
}));

const HomeBanner = () => {
  const classes = useStyles();
  return (
    <div className="homepage-banner-container">
      <Container maxWidth="xl">
        <Hidden smDown>
          <div className="hompage-banner-caption">
            <Typography
              variant="h2"
              className="banner-secondary-caption"
              align="center"
              style={{
                fontFamily: "proxima-nova, sans-serif",
                fontWeight: "800",
              }}
            >
              Buy & Sell
            </Typography>
            <Typography
              variant="h4"
              className="banner-secondary-caption"
              align="center"
              style={{
                fontFamily: "proxima-nova, sans-serif",
                fontWieght: 700,
              }}
            >
              On the UAE's first marketplace for authentic sneakers
            </Typography>
          </div>
        </Hidden>

        <Grid container spacing={3} alignItems="center">
          <Hidden smDown>
            <Grid item lg={4} md={4}>
              <img
                src={Shoe1}
                alt="shoe1"
                className={`${classes.Images} banner-shoe-image`}
              />
            </Grid>
          </Hidden>
          <Grid item lg={4} md={4} sm={12} style={{ textAlign: "center" }}>
            <img src={Shoe2} alt="shoe2" className={classes.Images} />
          </Grid>
          <Hidden smDown>
            <Grid item lg={4} md={4}>
              <img
                src={Shoe3}
                alt="shoe3"
                className={`${classes.Images} banner-shoe-image`}
              />
            </Grid>
          </Hidden>
        </Grid>
        <Hidden mdUp>
          <Typography
            variant="h5"
            className="banner-secondary-caption"
            align="center"
            style={{ fontFamily: "proxima-nova, sans-serif" }}
          >
            Jordan 4 Retro 'Lightning' 2021
          </Typography>
        </Hidden>
      </Container>
    </div>
  );
};

export default HomeBanner;
