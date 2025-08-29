import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import { logout } from "../../redux/actions/authActions";

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
import ReturPenjualan, {
  RETUR_PENJUALAN_PATH,
} from "./MutasiMasuk/ReturPenjualan";
import SPGBawang, { SPG_BAWANG_PATH } from "./MutasiMasuk/SPGBawang";
import SPGImport, { SPG_IMPORT_PATH } from "./MutasiMasuk/SPGImport";
import SPGKawat, { SPG_KAWAT_PATH } from "./MutasiMasuk/SPGKawat";
import SPGLain, { SPG_LAIN_PATH } from "./MutasiMasuk/SPGLain";
import SuratTerimaBarang, {
  SURAT_TERIMA_BARANG_PATH,
} from "./MutasiMasuk/SuratTerimaBarang";
import TransferStok, { TRANSFER_STOK_PATH } from "./MutasiGudang/TransferStok";
import ReturPembelian, {
  RETUR_PEMBELIAN_PATH,
} from "./MutasiKeluar/ReturPembelian";
import SPKBarang, { SPK_BARANG_PATH } from "./MutasiKeluar/SPKBarang";
import SuratJalan, { SURAT_JALAN_PATH } from "./MutasiKeluar/SuratJalan";
import SuratPengeluaranBarang, {
  SURAT_PENGELUARAN_BARANG_PATH,
} from "./MutasiKeluar/SuratPengeluaranBarang";
import TambahReturPenjualan, {
  TAMBAH_RETUR_PENJUALAN_PATH,
} from "./MutasiMasuk/ReturPenjualan/TambahReturPenjualan";
import UbahReturPenjualan, {
  UBAH_RETUR_PENJUALAN_PATH,
} from "./MutasiMasuk/ReturPenjualan/UbahReturPenjualan";
import TambahSPGBawang, {
  TAMBAH_SPGBAWANG_PATH,
} from "./MutasiMasuk/SPGBawang/TambahSPGBawang";
import UbahSPGBawang, {
  UBAH_SPGBAWANG_PATH,
} from "./MutasiMasuk/SPGBawang/UbahSPGBawang";
import TambahSPGImport, {
  TAMBAH_SPGIMPORT_PATH,
} from "./MutasiMasuk/SPGImport/TambahSPGImport";
import UbahSPGImport, {
  UBAH_SPGIMPORT_PATH,
} from "./MutasiMasuk/SPGImport/UbahSPGImport";
import TambahSPGKawat, {
  TAMBAH_SPG_KAWAT_PATH,
} from "./MutasiMasuk/SPGKawat/TambahSPGKawat";
import UbahSPGKawat, {
  UBAH_SPG_KAWAT_PATH,
} from "./MutasiMasuk/SPGKawat/UbahSPGKawat";
import TambahSPGLain, {
  TAMBAH_SPG_LAIN_PATH,
} from "./MutasiMasuk/SPGLain/TambahSPGLain";
import UbahSPGLain, {
  UBAH_SPG_LAIN_PATH,
} from "./MutasiMasuk/SPGLain/UbahSPGLain";
import TambahSuratTerimaBarang, {
  TAMBAH_SURAT_TERIMA_BARANG_PATH,
} from "./MutasiMasuk/SuratTerimaBarang/TambahSuratTerimaBarang";
import UbahSuratTerimaBarang, {
  UBAH_SURAT_TERIMA_BARANG_PATH,
} from "./MutasiMasuk/SuratTerimaBarang/UbahSuratTerimaBarang";
import TambahTransferStok, {
  TAMBAH_TRANSFER_STOK_PATH,
} from "./MutasiGudang/TransferStok/TambahTransferStok";
import UbahTransferStok, {
  UBAH_TRANSFER_STOK_PATH,
} from "./MutasiGudang/TransferStok/UbahTransferStok";
import TambahReturPembelian, {
  TAMBAH_RETUR_PEMBELIAN_PATH,
} from "./MutasiKeluar/ReturPembelian/TambahReturPembelian";

import TambahSPKBarang, {
  TAMBAH_SPK_BARANG_PATH,
} from "./MutasiKeluar/SPKBarang/TambahSPKBarang";
import UbahSPKBarang, {
  UBAH_SPK_BARANG_PATH,
} from "./MutasiKeluar/SPKBarang/UbahSPKBarang";
import TambahSuratJalan, {
  TAMBAH_SURAT_JALAN_PATH,
} from "./MutasiKeluar/SuratJalan/TambahSuratJalan";
import UbahSuratJalan, {
  UBAH_SURAT_JALAN_PATH,
} from "./MutasiKeluar/SuratJalan/UbahSuratJalan";
import TambahSPB, {
  TAMBAH_SPB_PATH,
} from "./MutasiKeluar/SuratPengeluaranBarang/TambahSPB";
import UbahSPB, {
  UBAH_SPB_PATH,
} from "./MutasiKeluar/SuratPengeluaranBarang/UbahSPB";
import LogoutButton from "../../components/LogoutButton";
import EditRole, { EDIT_ROLE_PATH } from "./Pengguna/EditRole";
import ChangePassword, { CHANGE_PASSWORD_PATH } from "./ChangePassword";
import Stock, { STOCK_PATH } from "./Stock";
import UbahStok, { UBAH_STOK_PATH } from "./Stock/UbahStok";
import StokOpname, { STOCK_ADJUSTMENT_PATH } from "./StokOpname";
import TambahStokOpname, {
  TAMBAH_STOCK_ADJUSTMENT_PATH,
} from "./StokOpname/TambahStokOpname";
import UbahStokOpname, {
  UBAH_STOCK_ADJUSTMENT_PATH,
} from "./StokOpname/UbahStokOpname";
import UbahStokProduk, {
  UBAH_STOK_PRODUK_PATH,
} from "./MasterData/Produk/UbahStokProduk";
import LaporanReturPenjualan, {
  LAPORAN_RETUR_PENJUALAN_PATH,
} from "./Laporan/ReturPenjualan";
import LaporanReturPembelian, {
  LAPORAN_RETUR_PEMBELIAN_PATH,
} from "./Laporan/ReturPembelian";
import LaporanStokBarang, {
  LAPORAN_STOK_BARANG_PATH,
} from "./Laporan/StokBarang";
import LaporanMutasiBarang, {
  LAPORAN_MUTASI_BARANG_PATH,
} from "./Laporan/MutasiBarang";
import LaporanPenerimaanBarang, {
  LAPORAN_PENERIMAAN_BARANG_PATH,
} from "./Laporan/PenerimaanBarang";
import LaporanPengeluaranBarang, {
  LAPORAN_PENGELUARAN_BARANG_PATH,
} from "./Laporan/PengeluaranBarang";
import LaporanMutasiBarangPenjualan, {
  LAPORAN_MUTASI_BARANG_PENJUALAN_PATH,
} from "./Laporan/MutasiBarangPenjualan";
import LaporanMutasiBarangPembelian, {
  LAPORAN_MUTASI_BARANG_PEMBELIAN_PATH,
} from "./Laporan/MutasiBarangPembelian";
import UbahReturPembelian, {
  UBAH_RETUR_PEMBELIAN_PATH,
} from "./MutasiKeluar/ReturPembelian/EditReturPembelian";

export const dashboardPath = "/*";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let lastPath = pathname.split("/").slice(-1)[0];
  if (lastPath === "") {
    lastPath = "beranda";
  }

  //#region Local functions
  const handleLogout = () => {
    dispatch(logout());
  };
  //#endregion

  return (
    <div className={styles.dashboardSection}>
      <SideBar />
      <div className={styles.mainContent}>
        <div className={styles.topBarSection}>
          {lastPath && <h5>{lastPath.replace("-", " ").toUpperCase()}</h5>}
          <div className={styles.trailingSection}>
            <LiveClock />
            <LogoutButton onClick={handleLogout} />
          </div>
        </div>
        <div className={styles.bodySection}>
          <Routes>
            <Route path={BERANDA_PATH} element={<Beranda />} />
            <Route path={PRODUK_PATH} element={<Produk />} />
            <Route path={TAMBAH_PRODUK_PATH} element={<TambahProduk />} />
            <Route path={UBAH_PRODUK_PATH} element={<UbahProduk />} />
            <Route path={UBAH_STOK_PRODUK_PATH} element={<UbahStokProduk />} />
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
            <Route path={EDIT_ROLE_PATH} element={<EditRole />} />
            <Route path={RETUR_PENJUALAN_PATH} element={<ReturPenjualan />} />
            <Route
              path={TAMBAH_RETUR_PENJUALAN_PATH}
              element={<TambahReturPenjualan />}
            />
            <Route
              path={UBAH_RETUR_PENJUALAN_PATH}
              element={<UbahReturPenjualan />}
            />
            <Route path={SPG_BAWANG_PATH} element={<SPGBawang />} />
            <Route path={TAMBAH_SPGBAWANG_PATH} element={<TambahSPGBawang />} />
            <Route path={UBAH_SPGBAWANG_PATH} element={<UbahSPGBawang />} />
            <Route path={SPG_IMPORT_PATH} element={<SPGImport />} />
            <Route path={TAMBAH_SPGIMPORT_PATH} element={<TambahSPGImport />} />
            <Route path={UBAH_SPGIMPORT_PATH} element={<UbahSPGImport />} />
            <Route path={SPG_KAWAT_PATH} element={<SPGKawat />} />
            <Route path={TAMBAH_SPG_KAWAT_PATH} element={<TambahSPGKawat />} />
            <Route path={UBAH_SPG_KAWAT_PATH} element={<UbahSPGKawat />} />
            <Route path={SPG_LAIN_PATH} element={<SPGLain />} />
            <Route path={TAMBAH_SPG_LAIN_PATH} element={<TambahSPGLain />} />
            <Route path={UBAH_SPG_LAIN_PATH} element={<UbahSPGLain />} />
            <Route
              path={SURAT_TERIMA_BARANG_PATH}
              element={<SuratTerimaBarang />}
            />
            <Route
              path={TAMBAH_SURAT_TERIMA_BARANG_PATH}
              element={<TambahSuratTerimaBarang />}
            />
            <Route
              path={UBAH_SURAT_TERIMA_BARANG_PATH}
              element={<UbahSuratTerimaBarang />}
            />
            <Route path={TRANSFER_STOK_PATH} element={<TransferStok />} />
            <Route
              path={TAMBAH_TRANSFER_STOK_PATH}
              element={<TambahTransferStok />}
            />
            <Route
              path={UBAH_TRANSFER_STOK_PATH}
              element={<UbahTransferStok />}
            />
            <Route path={RETUR_PEMBELIAN_PATH} element={<ReturPembelian />} />
            <Route
              path={TAMBAH_RETUR_PEMBELIAN_PATH}
              element={<TambahReturPembelian />}
            />
            <Route
              path={UBAH_RETUR_PEMBELIAN_PATH}
              element={<UbahReturPembelian />}
            />
            <Route path={SPK_BARANG_PATH} element={<SPKBarang />} />
            <Route
              path={TAMBAH_SPK_BARANG_PATH}
              element={<TambahSPKBarang />}
            />
            <Route path={UBAH_SPK_BARANG_PATH} element={<UbahSPKBarang />} />
            <Route path={SURAT_JALAN_PATH} element={<SuratJalan />} />
            <Route
              path={TAMBAH_SURAT_JALAN_PATH}
              element={<TambahSuratJalan />}
            />
            <Route path={UBAH_SURAT_JALAN_PATH} element={<UbahSuratJalan />} />
            <Route
              path={SURAT_PENGELUARAN_BARANG_PATH}
              element={<SuratPengeluaranBarang />}
            />
            <Route path={TAMBAH_SPB_PATH} element={<TambahSPB />} />
            <Route path={UBAH_SPB_PATH} element={<UbahSPB />} />
            <Route path={STOCK_PATH} element={<Stock />} />
            <Route path={UBAH_STOK_PATH} element={<UbahStok />} />
            <Route path={STOCK_ADJUSTMENT_PATH} element={<StokOpname />} />
            <Route
              path={TAMBAH_STOCK_ADJUSTMENT_PATH}
              element={<TambahStokOpname />}
            />
            <Route
              path={UBAH_STOCK_ADJUSTMENT_PATH}
              element={<UbahStokOpname />}
            />
            <Route
              path={LAPORAN_RETUR_PENJUALAN_PATH}
              element={<LaporanReturPenjualan />}
            />
            <Route
              path={LAPORAN_RETUR_PEMBELIAN_PATH}
              element={<LaporanReturPembelian />}
            />
            <Route
              path={LAPORAN_STOK_BARANG_PATH}
              element={<LaporanStokBarang />}
            />
            <Route
              path={LAPORAN_MUTASI_BARANG_PATH}
              element={<LaporanMutasiBarang />}
            />
            <Route
              path={LAPORAN_PENERIMAAN_BARANG_PATH}
              element={<LaporanPenerimaanBarang />}
            />
            <Route
              path={LAPORAN_PENGELUARAN_BARANG_PATH}
              element={<LaporanPengeluaranBarang />}
            />
            <Route
              path={LAPORAN_MUTASI_BARANG_PENJUALAN_PATH}
              element={<LaporanMutasiBarangPenjualan />}
            />
            <Route
              path={LAPORAN_MUTASI_BARANG_PEMBELIAN_PATH}
              element={<LaporanMutasiBarangPembelian />}
            />
            <Route path={CHANGE_PASSWORD_PATH} element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/// index index.html index.htm index.nginx-debian.html;
