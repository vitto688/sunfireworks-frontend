import React from "react";
import { Route, Routes } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import assets
import logoIcon from "../../assets/png/sun-fireworks-logo.png";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { ReactComponent as MasterDataIcon } from "../../assets/svg/master-data.svg";
import { ReactComponent as MutasiDataIcon } from "../../assets/svg/mutasi.svg";
import { ReactComponent as MutasiAntarGudangDataIcon } from "../../assets/svg/mutasi-antar-gudang.svg";
import { ReactComponent as PenyesuaianStockDataIcon } from "../../assets/svg/penyesuaian-stok.svg";

// Import components
import SideMenuItem from "../../components/SideMenuItem";
import LiveClock from "../../components/LiveClock";
import Home from "./Home";

const Dashboard = () => {
  return (
    <div className={styles.dashboardSection}>
      <div className={styles.sideBarSection}>
        <img src={logoIcon} alt="Logo" className={styles.logo} />
        <SideMenuItem
          name="Beranda"
          icon={
            <HomeIcon
              style={{
                width: "20px",
                height: "20px",
                fill: `${false ? "#ff934b" : "#080808"}`,
              }}
            />
          }
        />
        <div className={styles.devider}></div>
        <SideMenuItem
          name="Master Data"
          icon={
            <MasterDataIcon
              style={{
                width: "20px",
                height: "20px",
                fill: `${true ? "#ff934b" : "#080808"}`,
              }}
            />
          }
          isSelected={true}
          subMenus={[
            { name: "Data Produk", to: "master-data/produk" },
            {
              name: "Data Kategori Produk",
              to: "master-data/kategori-produk",
              isSelected: true,
            },
            { name: "Data Eksportir", to: "master-data/eksportir" },
            { name: "Data Pelanggan", to: "master-data/pelanggan" },
            { name: "Data Gudang", to: "master-data/gudang" },
          ]}
        />
        <div className={styles.devider}></div>
        <SideMenuItem
          name="Mutasi Masuk"
          icon={
            <MutasiDataIcon
              style={{
                width: "20px",
                height: "20px",
                fill: `${false ? "#ff934b" : "#080808"}`,
              }}
            />
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
            <MutasiDataIcon
              style={{
                width: "20px",
                height: "20px",
                fill: `${false ? "#ff934b" : "#080808"}`,
              }}
            />
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
            <MutasiAntarGudangDataIcon
              style={{
                width: "24px",
                height: "24px",
                fill: `${false ? "#ff934b" : "#080808"}`,
              }}
            />
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
              style={{
                width: "20px",
                height: "20px",
                fill: `${false ? "#ff934b" : "#080808"}`,
              }}
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
      <div className={styles.mainContent}>
        <div className={styles.topBarSection}>
          <p>Beranda</p>
          <div className={styles.trailingSection}>
            <LiveClock />
          </div>
        </div>
        <div className={styles.bodySection}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
