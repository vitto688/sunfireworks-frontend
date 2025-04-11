import React from "react";
import { Eye, EyeOff } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

const InputPassword = ({
  value,
  showPassword,
  isPasswrodFocused,
  onFocus,
  onBlur,
  onChange,
  onClick,
}) => {
  return (
    <div
      className={`${styles.inputPasswordSection} ${
        isPasswrodFocused && styles.focus
      }`}
    >
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder="Password"
        className={styles.input}
      />
      <div role="presentation" className={styles.icon} onClick={onClick}>
        {showPassword ? (
          <EyeOff size={20} color="#718096" />
        ) : (
          <Eye size={20} color="#718096" />
        )}
      </div>
    </div>
  );
};

export default InputPassword;
