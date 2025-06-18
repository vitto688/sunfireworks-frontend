import React from "react";

// Import styles
import styles from "./style.module.scss";

const InputField = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  autoComplete = "off",
  disabled = false,
}) => {
  return (
    <div className={styles.inputFieldSection}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
