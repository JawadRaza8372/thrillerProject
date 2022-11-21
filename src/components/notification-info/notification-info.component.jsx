import React from "react";
import "./notification-info.styles.scss";

import { AccountSettingHeader } from "../account-settings-header/account-settings-header.component";

export const NotificationInfo = () => {
  return (
    <div className="notification-info-section">
      <AccountSettingHeader
        headerTitle="Notifications"
        pageRoute="payoutInfo"
        displayButton={true}
      />
      <div className="notification-info-content">
        <p>You do not have any payout information on file.</p>
      </div>
    </div>
  );
};
