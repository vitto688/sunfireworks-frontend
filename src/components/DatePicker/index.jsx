import React from "react";
import styles from "./style.module.scss";

const DatePicker = ({ label, value, onChange }) => {
  return (
    <div className={styles.datePicker}>
      <label>{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
