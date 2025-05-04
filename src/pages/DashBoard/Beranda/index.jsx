import React from "react";

// import styles
import styles from "./style.module.scss";

// import components
import InfoCard from "../../../components/InfoCard";
import Chart from "../../../components/Chart";

export const BERANDA_PATH = "/";

const Beranda = () => {
  const salesData = [
    { label: "Retur Pembelian", percentage: 10, color: "#32cd32" },
    { label: "Retur Penjualan", percentage: 5, color: "#ffd700" },
    // { label: "Others", percentage: 35.9, color: "#d3d3d3" },
  ];

  return (
    <div className={styles.berandaSection}>
      <div className={styles.infoSection}>
        <InfoCard title="SPK Berjalan" value={1} />
        <InfoCard title="Stok Minim" value={0} />
        <InfoCard title="Perpindahan Stok" value={2} />
        <InfoCard title="Supplier Aktif" value={6} />
        <InfoCard title="Retur Pembelian" value={10} />
        <InfoCard title="Retur Penjualan" value={5} />
      </div>
      <div className={styles.chartSection}>
        <Chart
          title="Pembelian dan Penjualan"
          period="Bulan"
          data={salesData}
        />
      </div>
    </div>
  );
};

export default Beranda;
