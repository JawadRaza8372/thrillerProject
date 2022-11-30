import React, { useEffect, useState } from "react";
import "./CustomToast.scss";
import Close from "@material-ui/icons/Close";
function CustomToast({ imgurl, text, show, hide }) {
  const onClickClose = () => {
    hide();
  };
  return (
    <>
      <div
        className={`toaster ${
          show === "close" ? "hide" : show === "" ? "dnone" : ""
        }`}
      >
        <div
          className={`toasterContent ${
            show === "open"
              ? "inAnimation"
              : show === "close"
              ? "outAnimation"
              : ""
          }`}
        >
          <img src={imgurl} alt={text} />
          <div className="toastmsg">
            <span>{text}</span>
          </div>
          <button className="toasterDismiss" onClick={onClickClose}>
            <Close />
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomToast;