import React from "react";
import { makeStyles, Avatar, Box, Typography, Button } from "@material-ui/core";
import user1 from "./assets/user1.jpg";

import Post1 from "./assets/post1.PNG";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "3px",
    // height: "500px",
    margin: "10px 15px",
    width: "360px",
    margin: "10px auto",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  storyCard: {
    backgroundColor: "white",
    width: "320px",
    margin: "0 auto",
    border: "1px solid #efefef",
    overflow: "hidden",
    // height: "450px",
    [theme.breakpoints.down("sm")]: {
      width: "270px",
    },
  },
  userName: {
    fontSize: "14px",
    fontWeight: "bold",
    marginLeft: "7px",
    position: "relative",
    top: "5px",
    fontFamily: "poppins, sans-serif !important",
  },
  followersCount: {
    fontSize: "14px",
    marginLeft: "7px",
    position: "relative",
    fontFamily: "poppins, sans-serif",

    // top: "-10px",
  },
  viewProfileBtn: {
    boxShadow: "none",
    backgroundColor: "#407EDA",
    color: "#fff",
    fontSize: "12px !important",
    fontFamily: "poppins, sans-serif",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#407EDA",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px !important",
    },
  },
}));

const StoryCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.storyCard}>
        <Box
          px={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={props.userImage}
              style={{ width: "55px", height: "55px" }}
            />
            <Box>
              <Typography
                variant="h6"
                color="initial"
                className={classes.userName}
              >
                {props.userName}
              </Typography>
              <Typography
                variant="subtitle2"
                color="initial"
                className={classes.followersCount}
              >
                <Typography
                  variant="h6"
                  color="initial"
                  style={{
                    fontSize: "12px",
                    color: "grey",
                    fontWeight: "bold",
                    fontFamily: "poppins, sans-serif",
                  }}
                >
                  {props.followersCount}
                </Typography>
                <label
                  style={{
                    position: "relative",
                    top: "-8px",
                    color: "grey",
                    fontSize: "12px",
                    fontFamily: "poppins, sans-serif",
                  }}
                >
                  Followers
                </label>
              </Typography>
            </Box>
          </Box>
          <a href={props.userProfile} target="_blank">
            <Button
              variant="contained"
              color="default"
              className={classes.viewProfileBtn}
            >
              View Profile
            </Button>
          </a>
        </Box>
        <Box style={{ position: "relative", height: "100%" }}>
          <img
            src={props.storyImage}
            alt=""
            style={{
              width: "100%",
              height: "462px",
              maxHeight: "462px",
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default StoryCard;
