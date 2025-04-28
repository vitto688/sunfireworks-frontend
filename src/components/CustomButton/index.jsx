import React from "react";

// Import styles
import styles from "./style.module.scss";

const CustomButton = ({
  label,
  onClick,
  variant = "filled",
  inactive = false,
}) => {
  const buttonClass = `
  ${styles.customButton}
  ${inactive ? styles.inactive : ""}
  ${variant === "outline" ? styles.outline : ""}
`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={inactive}>
      {label}
    </button>
  );
};

export default CustomButton;
