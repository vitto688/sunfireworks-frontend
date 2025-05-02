import React from "react";
import { Info } from "lucide-react";

// import styles
import styles from "./style.module.scss";

const InfoCard = ({ title, value }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoHeader}>
        <span>{title}</span>
        <Info size={14} className={styles.infoIcon} />
      </div>
      <div className={styles.infoValue}>{value}</div>
    </div>
  );
};

export default InfoCard;
