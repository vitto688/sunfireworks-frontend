import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

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
import Pengguna, { PENGGUNA_PATH } from "./Pengguna";
import TambahPengguna, {
  TAMBAH_PENGGUNA_PATH,
} from "./Pengguna/TambahPengguna";
import EditPengguna, { EDIT_PENGGUNA_PATH } from "./Pengguna/EditPengguna";
import TambahProduk, {
  TAMBAH_PRODUK_PATH,
} from "./MasterData/Produk/TambahProduk";

export const dashboardPath = "/*";

const Dashboard = () => {
  const { pathname } = useLocation();
  const lastPath = pathname.split("/").slice(-1)[0];

  return (
    <div className={styles.dashboardSection}>
      <SideBar />
      <div className={styles.mainContent}>
        <div className={styles.topBarSection}>
          {lastPath && <h5>{lastPath.replace("-", " ").toUpperCase()}</h5>}
          <div className={styles.trailingSection}>
            <LiveClock />
          </div>
        </div>
        <div className={styles.bodySection}>
          <Routes>
            <Route path={BERANDA_PATH} element={<Beranda />} />
            <Route path={PRODUK_PATH} element={<Produk />} />
            <Route path={TAMBAH_PRODUK_PATH} element={<TambahProduk />} />
            <Route path={KATEGORI_PRODUK_PATH} element={<KategoriProduk />} />
            <Route path={EKSPORTIR_PATH} element={<Eksportir />} />
            <Route path={PELANGGAN_PATH} element={<Pelanggan />} />
            <Route path={GUDANG_PATH} element={<Gudang />} />
            <Route path={PENGGUNA_PATH} element={<Pengguna />} />
            <Route path={TAMBAH_PENGGUNA_PATH} element={<TambahPengguna />} />
            <Route path={EDIT_PENGGUNA_PATH} element={<EditPengguna />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
