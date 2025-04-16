import React from "react";
import { Route, Routes } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import LiveClock from "../../components/LiveClock";
import SideBar from "./SideBar";
import Beranda, { BERANDA_PATH } from "./Beranda";
import Produk, { PRODUK_PATH } from "./MasterData/Produk";
import KategoriProduk, {
  KATEGORI_PRODUK_PATH,
} from "./MasterData/KategoriProduk";
import Eksportir, { EKSPORTIR_PATH } from "./MasterData/Eksportir";
import Pelanggan, { PELANGGAN_PATH } from "./MasterData/Pelanggan";
import Gudang, { GUDANG_PATH } from "./MasterData/Gudang";

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
            <Route path={BERANDA_PATH} element={<Beranda />} />
            <Route path={PRODUK_PATH} element={<Produk />} />
            <Route path={KATEGORI_PRODUK_PATH} element={<KategoriProduk />} />
            <Route path={EKSPORTIR_PATH} element={<Eksportir />} />
            <Route path={PELANGGAN_PATH} element={<Pelanggan />} />
            <Route path={GUDANG_PATH} element={<Gudang />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
