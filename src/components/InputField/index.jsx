import React from "react";

// Import styles
import styles from "./style.module.scss";

const InputField = ({ label, value, onChange, name, type = "text" }) => {
  return (
    <div className={styles.inputFieldSection}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
