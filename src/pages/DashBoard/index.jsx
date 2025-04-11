import React from "react";
import { Route, Routes } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import LiveClock from "../../components/LiveClock";
import SideBar from "./SideBar";
import Beranda, { berandaPath } from "./Beranda";
import Produk, { produkPath } from "./MasterData/Produk";
import KategoriProduk, {
  kategoriProdukPath,
} from "./MasterData/KategoriProduk";
import Eksportir, { eksportirPath } from "./MasterData/Eksportir";
import Pelanggan, { pelangganPath } from "./MasterData/Pelanggan";
import Gudang, { gudangPath } from "./MasterData/Gudang";

export const dashboardPath = "/*";

const Dashboard = () => {
  return (
    <div className={styles.dashboardSection}>
      <SideBar />
      <div className={styles.mainContent}>
        <div className={styles.topBarSection}>
          <h3>Beranda</h3>
          <div className={styles.trailingSection}>
            <LiveClock />
          </div>
        </div>
        <div className={styles.bodySection}>
          <Routes>
            <Route path={berandaPath} element={<Beranda />} />
            <Route path={produkPath} element={<Produk />} />
            <Route path={kategoriProdukPath} element={<KategoriProduk />} />
            <Route path={eksportirPath} element={<Eksportir />} />
            <Route path={pelangganPath} element={<Pelanggan />} />
            <Route path={gudangPath} element={<Gudang />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
