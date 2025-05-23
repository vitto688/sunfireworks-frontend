import React from "react";

// Import styles
import styles from "./style.module.scss";

const SelectField = ({ label, name, value, onChange, options = [] }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={styles.select}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select role
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
