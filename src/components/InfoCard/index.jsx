import React from "react";
import { Info, BarChart3 } from "lucide-react";

// import styles
import styles from "./style.module.scss";

const InfoCard = ({ title, value, onViewChart, isSelected }) => {
  return (
    <div
      role="presentation"
      className={`${styles.infoCard} ${isSelected ? styles.selected : ""}`}
      onClick={onViewChart}
    >
      <div className={styles.infoHeader}>
        <span>{title}</span>
        <div className={styles.iconGroup}>
          <Info size={14} className={styles.infoIcon} />
          <BarChart3
            size={14}
            className={styles.chartIcon}
            title="Lihat Detail Chart"
          />
        </div>
      </div>
      <div className={styles.infoValue}>{value}</div>
      {isSelected && <div className={styles.selectedIndicator}></div>}
    </div>
  );
};

export default InfoCard;
