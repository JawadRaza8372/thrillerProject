import React from "react";
import {
  makeStyles,
  Avatar,
  Box,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import user1 from "./assets/user1.jpg";
import Post1 from "./assets/post1.PNG";
import loveIcon from "./assets/Love.svg";
import commentIcon from "./assets/Comment.svg";
import uploadIcon from "./assets/upload.svg";
import instaIcon from "./assets/Insta.svg";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import aIcon from "./assets/a.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "3px",
    margin: "10px auto",
    width: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  storyCard: {
    backgroundColor: "white",
    width: "270px",
    margin: "0 auto",
    border: "1px solid #efefef",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "270px",
    },
    // height: "450px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "bold",
    marginLeft: "7px",
    position: "relative",
    top: "7px",
    fontFamily: "poppins, sans-serif",
  },
  followersCount: {
    fontSize: "14px",
    marginLeft: "7px",
    position: "relative",
    fontFamily: "poppins, sans-serif !important",

    // top: "-10px",
  },
  viewProfileBtn: {
    boxShadow: "none",
    backgroundColor: "#407EDA",
    color: "#fff",
    fontSize: "8px !important",
    fontFamily: "poppins, sans-serif",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#407EDA",
    },
  },
  hr: {
    backgroundColor: "#000",
    // margin: "3px 0",
  },
  viewMoreBtn: {
    color: "#407EDA",
    fontFamily: "poppins, sans-serif",
  },
  icons: {
    marginRight: "7px",
  },
  cardTop: {
    width: "145px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "145px",
      overflow: "hidden",
    },
  },
  favouriteIcon: {
    "&:hover": {
      color: "red",
    },
  },
  otherIcon: {
    "&:hover": {
      opacity: "0.7",
      cursor: "pointer",
    },
  },
}));

const PostCard = (props) => {
  const classes = useStyles();
  console.log(props, "Aa");
  return (
    <div className={classes.container}>
      <div className={classes.storyCard}>
        <Box
          px={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" className={classes.cardTop}>
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
        <Box>
          <img
            src={props.storyImage}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Divider className={classes.hr} />
        <Box px={1} my={1}>
          <a href={props.postLink} target="_blank">
            <Typography
              variant="subtitle1"
              color="initial"
              className={classes.viewMoreBtn}
            >
              View More on Instagram
            </Typography>
          </a>
        </Box>
        <Divider className={classes.hr} />
        <Box display="flex" alignItems="center" my={2} mx={1}>
          <a href={props.postLink} target="_blank" style={{ color: "#000" }}>
            <FavoriteBorderIcon
              className={classes.favouriteIcon}
              style={{
                fontSize: "30px",
                marginRight: "3px",
                cursor: "pointer",
              }}
            />
          </a>
          <a href={props.postLink} target="_blank">
            <img
              src={commentIcon}
              alt=""
              className={`${classes.icons} ${classes.otherIcon}`}
            />
          </a>
          <a href={props.postLink} target="_blank">
            <img
              src={uploadIcon}
              alt=""
              className={`${classes.icons} ${classes.otherIcon}`}
            />
          </a>
          <a
            href={props.postLink}
            target="_blank"
            style={{ marginLeft: "auto" }}
          >
            <img src={aIcon} alt="" className={classes.icons} />
          </a>
        </Box>
        <Divider className={classes.hr} />
        <Box px={1} display="flex" my={1}>
          <a href={props.postLink} target="_blank">
            <Typography
              variant="subtitle1"
              color="initial"
              className={classes.viewMoreBtn}
            >
              Add a comment...
            </Typography>
          </a>
          <a
            href={props.postLink}
            target="_blank"
            style={{ marginLeft: "auto" }}
          >
            <img
              src={instaIcon}
              alt=""
              style={{ marginLeft: "auto", marginRight: "5px" }}
            />
          </a>
        </Box>
      </div>
    </div>
  );
};

export default PostCard;
