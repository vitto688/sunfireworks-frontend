import React from "react";
import { ArrowLeft } from "lucide-react";

// Import styles
import styles from "./style.module.scss";
import { formatNumber } from "../../utils/numberFormat";

const Chart = ({
  title,
  period,
  data,
  showBackButton,
  onBack,
  showOverviewButton,
  onOverview,
}) => {
  const chartGradient = data
    .map((item, index, array) => {
      const start = array
        .slice(0, index)
        .reduce((acc, curr) => acc + curr.percentage, 0);
      const end = start + item.percentage;
      return `${item.color} ${start}%, ${item.color} ${end}%`;
    })
    .join(", ");

  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          {showBackButton && (
            <ArrowLeft
              size={16}
              className={styles.backButton}
              onClick={onBack}
              title="Kembali ke Overview"
            />
          )}
          <h2>{title}</h2>
        </div>
        <div className={styles.actionButtons}>
          {showOverviewButton && (
            <button
              className={styles.overviewButton}
              onClick={onOverview}
              title="Lihat Semua Kategori"
            >
              Overview
            </button>
          )}
          {/* <button className={styles.dropdown}>
            {period} <span className={styles.dropdownIcon}>▼</span>
          </button> */}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.chartCircleWrapper}>
          <div
            className={styles.chartCircle}
            style={{ background: `conic-gradient(${chartGradient})` }}
          >
            <div className={styles.innerCircle}>
              <span className={styles.chartIcon}>📊</span>
            </div>
          </div>
        </div>
        <ul className={styles.legend}>
          {data.map((item, index) => (
            <li key={index}>
              <span
                className={styles.legendCircle}
                style={{ backgroundColor: item.color }}
              ></span>
              <div className={styles.legendContent}>
                <span className={styles.legendLabel}>{item.label}</span>
                <div className={styles.legendValues}>
                  <span className={styles.percentage}>{item.percentage}%</span>
                  {item.value !== undefined && (
                    <span className={styles.value}>
                      ({formatNumber(item.value)} unit)
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chart;
