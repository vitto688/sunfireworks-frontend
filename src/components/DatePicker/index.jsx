import React from "react";
import styles from "./style.module.scss";

const DatePicker = ({ isInput = false, label, value, onChange }) => {
  return (
    <div className={`${styles.datePicker} ${isInput ? styles.input : ""}`}>
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
