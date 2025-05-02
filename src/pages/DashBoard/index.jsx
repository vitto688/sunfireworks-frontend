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
import TambahPelanggan, {
  TAMBAH_PELANGGAN_PATH,
} from "./MasterData/Pelanggan/TambahPelanggan";
import TambahKategoriProduk, {
  TAMBAH_KATEGORI_PATH,
} from "./MasterData/KategoriProduk/TambahKategoriProduk";
import TambahEksportir, {
  TAMBAH_EKSPORTIR_PATH,
} from "./MasterData/Eksportir/TambahEksportir";
import TambahGudang, {
  TAMBAH_GUDANG_PATH,
} from "./MasterData/Gudang/TambahGudang";
import UbahProduk, { UBAH_PRODUK_PATH } from "./MasterData/Produk/UbahProduk";
import UbahPelanggan, {
  UBAH_PELANGGAN_PATH,
} from "./MasterData/Pelanggan/UbahPelanggan";
import UbahKategoriProduk, {
  UBAH_KATEGORI_PATH,
} from "./MasterData/KategoriProduk/UbahKategoriProduk";
import UbahEksportir, {
  UBAH_EKSPORTIR_PATH,
} from "./MasterData/Eksportir/UbahEksportir";
import UbahGudang, { UBAH_GUDANG_PATH } from "./MasterData/Gudang/UbahGudang";

export const dashboardPath = "/*";

const Dashboard = () => {
  const { pathname } = useLocation();
  let lastPath = pathname.split("/").slice(-1)[0];
  if (lastPath === "") {
    lastPath = "beranda";
  }

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
            <Route path={UBAH_PRODUK_PATH} element={<UbahProduk />} />
            <Route path={KATEGORI_PRODUK_PATH} element={<KategoriProduk />} />
            <Route
              path={TAMBAH_KATEGORI_PATH}
              element={<TambahKategoriProduk />}
            />
            <Route path={UBAH_KATEGORI_PATH} element={<UbahKategoriProduk />} />
            <Route path={EKSPORTIR_PATH} element={<Eksportir />} />
            <Route path={TAMBAH_EKSPORTIR_PATH} element={<TambahEksportir />} />
            <Route path={UBAH_EKSPORTIR_PATH} element={<UbahEksportir />} />
            <Route path={PELANGGAN_PATH} element={<Pelanggan />} />
            <Route path={TAMBAH_PELANGGAN_PATH} element={<TambahPelanggan />} />
            <Route path={UBAH_PELANGGAN_PATH} element={<UbahPelanggan />} />
            <Route path={GUDANG_PATH} element={<Gudang />} />
            <Route path={TAMBAH_GUDANG_PATH} element={<TambahGudang />} />
            <Route path={UBAH_GUDANG_PATH} element={<UbahGudang />} />
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
