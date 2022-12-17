import React, { useState } from "react";
import "./account-settings-header.styles.scss";

import ReactTooltip from "react-tooltip";

import { CustomButton } from "../custom-button/custome-button.component";
import { withRouter } from "react-router-dom";
import { ToolTip } from "../tool-tip/tool-tip.component";
import { mylocalStorage } from "../../Constants/Functions";
export const AccountSettingHeader = withRouter(
  ({ headerTitle, pageRoute, history, displayButton, toolTip }) => {
    return (
      <div className="setting-header-wrapper">
        <div className="setting-header-container">
          <p>
            {headerTitle}
            {toolTip ? (
              <i
                className="fas fa-question-circle question"
                data-tip="To uphold the integrity of the marketplace, <br> all sellers must have a valid payout <br> method on file."
              >
                <ReactTooltip
                  multiline={true}
                  place="top"
                  type="light"
                  effect="solid"
                  backgroundColor="white"
                  textColor="black"
                  className="data-class"
                  border={true}
                  borderColor="black"
                />
              </i>
            ) : null}
          </p>
          {displayButton ? null : (
            <CustomButton
              onClick={() => {
                mylocalStorage.setItem("cords", null);
                if (
                  pageRoute === "shippingInfo/1" ||
                  pageRoute === "shippingInfo/0" ||
                  pageRoute === "payoutInfo"
                ) {
                  mylocalStorage.setItem("cords", null);
                  //console.log("hello");
                  history.push({
                    pathname: pageRoute,
                    state: {
                      historySetting: true,
                    },
                  });
                } else {
                  history.push(`${pageRoute}`);
                }
              }}
              size="smallInverted"
            >
              Edit
            </CustomButton>
          )}
        </div>
        <hr></hr>
      </div>
    );
  }
);
