import React from "react";

// Import styles
import styles from "./style.module.scss";

const Chart = ({ title, period, data }) => {
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
        <h2>{title}</h2>
        <button className={styles.dropdown}>
          {period} <span className={styles.dropdownIcon}>▼</span>
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.chartCircleWrapper}>
          <div
            className={styles.chartCircle}
            style={{ background: `conic-gradient(${chartGradient})` }}
          >
            <div className={styles.innerCircle}>
              <span className={styles.chartIcon}>🛒</span>
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
              {item.label}{" "}
              <span className={styles.value}>{item.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chart;
