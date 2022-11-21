import React from "react";
import "./custom-button.styles.scss";

export const CustomButton = ({
  type,
  children,
  size,
  color,
  onClick,
  ...props
}) => {
  return (
    <button
      className={
        {
          large: "large custom-button",
          small: "small custom-button",
          inverted: "custom-button inverted",
          smallInverted: "small custom-button inverted",
        }[size] || "custom-button"
      }
      onClick={onClick}
      type={type}
      {...props}
    >
      {children.toUpperCase()}
    </button>
  );
};
