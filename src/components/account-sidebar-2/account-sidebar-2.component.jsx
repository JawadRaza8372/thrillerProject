import React from "react";
import "./account-sidebar-2.styles.scss";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user,
  };
};

export const AccountSidebar2 = connect(mapStateToProps)(
  withRouter(
    ({
      sideBarLinks,
      setPage,
      selectedPage,
      sideBarStatus,
      userDetails,
      history,
    }) => {
      userDetails = JSON.parse(window.localStorage.getItem("user"));

      return (
        <div
          className={
            sideBarStatus
              ? "account-sidebar-container"
              : "small-account-sidebar-container"
          }
        >
          <h3>{userDetails.firstName + " " + userDetails.lastName}</h3>
          {sideBarLinks.map(({ page, name, image, description }) => (
            <div
              onClick={() => {
                setPage(name);
                if (name === "Security") {
                  history.push({
                    pathname: page,
                    state: {
                      historySetting: true,
                    },
                  });
                } else {
                  history.push(page);
                }
              }}
              className={
                selectedPage === name
                  ? "link-container selected"
                  : "link-container"
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
    }
  )
);
