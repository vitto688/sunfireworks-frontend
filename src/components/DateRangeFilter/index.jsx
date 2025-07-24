import React from "react";
import styles from "./style.module.scss";
import DatePicker from "../DatePicker";
import CustomButton from "../CustomButton";

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
  onClearFilter,
}) => {
  return (
    <div className={styles.dateRangeFilter}>
      <div className={styles.dateInputs}>
        <DatePicker
          label="Dari Tanggal:"
          value={startDate}
          onChange={onStartDateChange}
        />
        <DatePicker
          label="Sampai Tanggal:"
          value={endDate}
          onChange={onEndDateChange}
        />
      </div>
      <div className={styles.filterButtons}>
        <CustomButton
          label="Terapkan Filter"
          onClick={onApplyFilter}
          variant="filled"
        />
        <CustomButton label="Reset" onClick={onClearFilter} variant="outline" />
      </div>
    </div>
  );
};

export default DateRangeFilter;
