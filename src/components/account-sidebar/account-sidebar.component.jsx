import React from "react";
import { connect } from "react-redux";
import "./account-sidebar.styles.scss";
import { mylocalStorage } from "../../Constants/Functions";

const AccountSidebar = ({
  sideBarLinks,
  setPage,
  selectedPage,
  sideBarStatus,
  userDetails,
}) => {
  userDetails = JSON.parse(mylocalStorage.getItem("user"));
  //console.log("ud", userDetails);
  return (
    <div className="account-sidebar-container">
      <h3>{userDetails.firstName + userDetails.lastName}</h3>
      {sideBarLinks.map(({ name, image, description }) => (
        <div
          onClick={() => setPage(name)}
          className={
            selectedPage === name ? "link-container selected" : "link-container"
          }
        >
          <img src={image} alt="logo" />
          <div className="link-text">
            <h4 className="link-name">{name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export default connect(mapStateToProps)(AccountSidebar);
