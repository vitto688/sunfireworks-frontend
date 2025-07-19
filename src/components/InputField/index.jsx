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
  defaultValue = "",
  disabled = false,
}) => {
  // Determine if this should be a controlled or uncontrolled input
  const isControlled = value !== undefined;

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
        // Use either value OR defaultValue, not both
        {...(isControlled
          ? { value: value || "" }
          : { defaultValue: defaultValue })}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
