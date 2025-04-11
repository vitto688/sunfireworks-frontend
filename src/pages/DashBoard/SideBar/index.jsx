import React from "react";

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
import { berandaPath } from "../Beranda";
import { produkPath } from "../MasterData/Produk";
import { kategoriProdukPath } from "../MasterData/KategoriProduk";
import { pelangganPath } from "../MasterData/Pelanggan";
import { gudangPath } from "../MasterData/Gudang";
import { eksportirPath } from "../MasterData/Eksportir";

const SideBar = () => {
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
        to={berandaPath}
        icon={<HomeIcon className={`${styles.icon} ${styles.selected}`} />}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Master Data"
        path="/master-data"
        icon={
          <MasterDataIcon className={`${styles.icon} ${styles.selected}`} />
        }
        isSelected={true}
        subMenus={[
          { name: "Data Produk", to: { produkPath } },
          {
            name: "Data Kategori Produk",
            to: { kategoriProdukPath },
            isSelected: true,
          },
          { name: "Data Eksportir", to: { eksportirPath } },
          { name: "Data Pelanggan", to: { pelangganPath } },
          { name: "Data Gudang", to: { gudangPath } },
        ]}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Mutasi Masuk"
        icon={
          <MutasiDataIcon className={`${styles.icon} ${styles.selected}`} />
        }
        isSelected={false}
        subMenus={[
          { name: "Retur Penjualan", to: "mutasi-masuk/retur-penjualan" },
          {
            name: "SPG Import",
            to: "master/spg-import",
            isSelected: false,
          },
          { name: "SPG Bawang", to: "mutasi-masuk/spg-bawang" },
          { name: "SPG Kawat", to: "mutasi-masuk/spg-kawat" },
          { name: "SPG Lain-lain", to: "mutasi-masuk/spg-lain-lain" },
          { name: "Surate Terima Barang", to: "mutasi-masuk/stb" },
        ]}
      />
      <div className={styles.devider}></div>

      <SideMenuItem
        name="Mutasi Keluar"
        icon={
          <MutasiDataIcon className={`${styles.icon} ${styles.selected}`} />
        }
        isSelected={false}
        subMenus={[
          { name: "Retur Pembelian", to: "mutasi-keluar/retur-pembelian" },
          {
            name: "SPK Barang",
            to: "mutasi-keluar/spk",
            isSelected: false,
          },
          { name: "Surat Jalan", to: "mutasi-keluar/surat-jalan" },
          { name: "Surat Pengeluaran Barang", to: "mutasi-keluar/spb" },
        ]}
      />
      <div className={styles.devider}></div>

      <SideMenuItem
        name="Mutasi Antar Gudang"
        icon={
          <MutasiDataIcon className={`${styles.icon} ${styles.selected}`} />
        }
        isSelected={false}
        subMenus={[
          {
            name: "Transfer Stok Barang",
            to: "mutasi-antar-gudang/transfer-stok-barang",
          },
        ]}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Penyesuaian Stok"
        icon={
          <PenyesuaianStockDataIcon
            className={`${styles.icon} ${styles.selected}`}
          />
        }
        isSelected={false}
        subMenus={[
          {
            name: "Penyesuaian Stok Barang",
            to: "penyesuaian-stok/penyesuaian-stok-barang",
          },
        ]}
      />
    </div>
  );
};

export default SideBar;
