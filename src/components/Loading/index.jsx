import React from "react";

// Import styles
import styles from "./style.module.scss";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Loading;
