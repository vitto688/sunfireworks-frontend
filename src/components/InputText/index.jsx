import React from "react";

// Import styles
import styles from "./style.module.scss";

const InputText = ({ username, placeholder, onChange }) => {
  return (
    <input
      type="text"
      value={username}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputTextSection}
    />
  );
};

export default InputText;
