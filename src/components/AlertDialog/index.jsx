import React from "react";
import styles from "./style.module.scss";

const AlertDialog = ({ message, show }) => {
  console.log("AlertDialog", message, show);
  if (!show) return null;

  return <div className={styles.alert}>{message}</div>;
};

export default AlertDialog;
