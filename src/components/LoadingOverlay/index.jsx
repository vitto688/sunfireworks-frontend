import React from "react";
import styles from "./style.module.scss";

/**
 * Centered loading overlay with an animated spinner.
 *
 * Renders nothing when `show` is false. When shown, it covers its nearest
 * positioned ancestor (the parent must be `position: relative`) with a
 * semi-transparent backdrop and a centered spinner + label.
 *
 * @param {boolean} show   whether to display the overlay
 * @param {string}  label  text shown under the spinner
 */
const LoadingOverlay = ({ show, label = "Memuat data..." }) => {
  if (!show) return null;
  return (
    <div className={styles.loadingOverlay}>
      <span className={styles.spinner} />
      <p>{label}</p>
    </div>
  );
};

export default LoadingOverlay;
