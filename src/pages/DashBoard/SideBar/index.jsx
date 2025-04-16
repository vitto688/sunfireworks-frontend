import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import assets
import { ReactComponent as LogoIcon } from "../../../assets/svg/logo.svg";
import { ReactComponent as HomeIcon } from "../../../assets/svg/home.svg";
import { ReactComponent as MasterDataIcon } from "../../../assets/svg/master-data.svg";
import { ReactComponent as MutasiDataIcon } from "../../../assets/svg/mutasi.svg";
import { ReactComponent as PenyesuaianStockDataIcon } from "../../../assets/svg/penyesuaian-stok.svg";

// Import components
import SideMenuItem from "../../../components/SideMenuItem";
import { BERANDA_PATH } from "../Beranda";
import { PRODUK_PATH } from "../MasterData/Produk";
import { KATEGORI_PRODUK_PATH } from "../MasterData/KategoriProduk";
import { PELANGGAN_PATH } from "../MasterData/Pelanggan";
import { GUDANG_PATH } from "../MasterData/Gudang";
import { EKSPORTIR_PATH } from "../MasterData/Eksportir";
import { RETUR_PENJUALAN_PATH } from "../MutasiMasuk/ReturPenjualan";
import { SPG_IMPORT_PATH } from "../MutasiMasuk/SPGImport";
import { SPG_BAWANG_PATH } from "../MutasiMasuk/SPGBawang";
import { SPG_KAWAT_PATH } from "../MutasiMasuk/SPGKawat";
import { SPG_LAIN_PATH } from "../MutasiMasuk/SPGLain";
import { SURAT_TERIMA_BARANG_PATH } from "../MutasiMasuk/SuratTerimaBarang";
import { RETUR_PEMBELIAN_PATH } from "../MutasiKeluar/ReturPembelian";
import { SURAT_JALAN_PATH } from "../MutasiKeluar/SuratJalan";
import { SURAT_PENGELUARAN_BARANG_PATH } from "../MutasiKeluar/SuratPengeluaranBarang";
import { TRANSFER_STOK_PATH } from "../MutasiGudang/TransferStok";
import { PENYESUAIAN_STOK_PATH } from "../PenyesuaianStok";
import { SPK_BARANG_PATH } from "../MutasiKeluar/SPKBarang";

// Import actions
import { expandMenu } from "../../../redux/actions/menuActions";

const SideBar = () => {
  const { expandedMenus } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  return (
    <div className={styles.sideBarSection}>
      <div className={styles.logoSection}>
        <LogoIcon
          style={{
            width: "36px",
            height: "36px",
          }}
        />
        <h2>Simple Data</h2>
      </div>
      <SideMenuItem
        name="Beranda"
        to={BERANDA_PATH}
        icon={<HomeIcon className={`${styles.icon} ${styles.selected}`} />}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Master Data"
        path="/master-data"
        icon={<MasterDataIcon className={`${styles.icon} `} />}
        isSelected={false}
        isExpanded={expandedMenus.includes("/master-data")}
        onExpandCollapse={() => {
          dispatch(expandMenu({ path: "/master-data" }));
        }}
        subMenus={[
          { name: "Data Produk", to: PRODUK_PATH },
          {
            name: "Data Kategori Produk",
            to: KATEGORI_PRODUK_PATH,
            isSelected: true,
          },
          { name: "Data Eksportir", to: EKSPORTIR_PATH },
          { name: "Data Pelanggan", to: PELANGGAN_PATH },
          { name: "Data Gudang", to: GUDANG_PATH },
        ]}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Mutasi Masuk"
        icon={<MutasiDataIcon className={`${styles.icon} `} />}
        isSelected={false}
        isExpanded={expandedMenus.includes("/mutasi-masuk")}
        onExpandCollapse={() => {
          dispatch(expandMenu({ path: "/mutasi-masuk" }));
        }}
        subMenus={[
          { name: "Retur Penjualan", to: RETUR_PENJUALAN_PATH },
          {
            name: "SPG Import",
            to: SPG_IMPORT_PATH,
            isSelected: false,
          },
          { name: "SPG Bawang", to: SPG_BAWANG_PATH },
          { name: "SPG Kawat", to: SPG_KAWAT_PATH },
          { name: "SPG Lain-lain", to: SPG_LAIN_PATH },
          { name: "Surat Terima Barang", to: SURAT_TERIMA_BARANG_PATH },
        ]}
      />
      <div className={styles.devider}></div>

      <SideMenuItem
        name="Mutasi Keluar"
        icon={<MutasiDataIcon className={`${styles.icon} `} />}
        isSelected={false}
        isExpanded={expandedMenus.includes("/mutasi-keluar")}
        onExpandCollapse={() => {
          dispatch(expandMenu({ path: "/mutasi-keluar" }));
        }}
        subMenus={[
          { name: "Retur Pembelian", to: RETUR_PEMBELIAN_PATH },
          {
            name: "SPK Barang",
            to: SPK_BARANG_PATH,
            isSelected: false,
          },
          { name: "Surat Jalan", to: SURAT_JALAN_PATH },
          {
            name: "Surat Pengeluaran Barang",
            to: SURAT_PENGELUARAN_BARANG_PATH,
          },
        ]}
      />
      <div className={styles.devider}></div>

      <SideMenuItem
        name="Mutasi Antar Gudang"
        icon={<MutasiDataIcon className={`${styles.icon} `} />}
        isSelected={false}
        isExpanded={expandedMenus.includes("/mutasi-gudang")}
        onExpandCollapse={() => {
          dispatch(expandMenu({ path: "/mutasi-gudang" }));
        }}
        subMenus={[
          {
            name: "Transfer Stok Barang",
            to: TRANSFER_STOK_PATH,
          },
        ]}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Penyesuaian Stok"
        to={PENYESUAIAN_STOK_PATH}
        icon={<PenyesuaianStockDataIcon className={`${styles.icon} `} />}
        isSelected={false}
        // subMenus={[
        //   {
        //     name: "Penyesuaian Stok Barang",
        //     to: "penyesuaian-stok/penyesuaian-stok-barang",
        //   },
        // ]}
      />
    </div>
  );
};

export default SideBar;
