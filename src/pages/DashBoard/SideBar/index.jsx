import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import { expandMenu } from "../../../redux/actions/menuActions";

// Import assets
import { ReactComponent as LogoIcon } from "../../../assets/svg/logo.svg";
import { ReactComponent as HomeIcon } from "../../../assets/svg/home.svg";
import { ReactComponent as UserIcon } from "../../../assets/svg/user.svg";
import { ReactComponent as MasterDataIcon } from "../../../assets/svg/master-data.svg";
import { ReactComponent as LaporanIcon } from "../../../assets/svg/laporan.svg";
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
import { SPK_BARANG_PATH } from "../MutasiKeluar/SPKBarang";
import { PENGGUNA_PATH } from "../Pengguna";
import { CHANGE_PASSWORD_PATH } from "../ChangePassword";
import { STOCK_PATH } from "../Stock";
import { LAPORAN_RETUR_PENJUALAN_PATH } from "../Laporan/ReturPenjualan";
import { LAPORAN_STOK_BARANG_PATH } from "../Laporan/StokBarang";
import { LAPORAN_MUTASI_BARANG_PATH } from "../Laporan/MutasiBarang";
import { LAPORAN_RETUR_PEMBELIAN_PATH } from "../Laporan/ReturPembelian";
import { LAPORAN_PENERIMAAN_BARANG_PATH } from "../Laporan/PenerimaanBarang";
import { LAPORAN_PENGELUARAN_BARANG_PATH } from "../Laporan/PengeluaranBarang";

const SideBar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [masterDataMenu, setMasterDataMenu] = useState(null);
  const [laporanDataMenu, setLaporanDataMenu] = useState(null);
  const [pengaturanSubMenus, setPengaturanSubMenus] = useState([]);

  const { expandedMenus } = useSelector((state) => state.menu);
  const { user } = useSelector((state) => state.auth);

  const firstPath = pathname.split("/")[1];

  useEffect(() => {
    if (user?.role !== 3) {
      setMasterDataMenu(
        <>
          <div className={styles.devider}></div>
          <SideMenuItem
            name="Master Data"
            path="/master-data"
            icon={
              <MasterDataIcon
                className={`${styles.icon} ${
                  firstPath === "/master-data" && styles.selected
                }`}
              />
            }
            isSelected={firstPath === "/master-data"}
            isExpanded={expandedMenus.includes("/master-data")}
            onExpandCollapse={() => {
              dispatch(expandMenu({ path: "/master-data" }));
            }}
            subMenus={[
              {
                name: "Data Produk",
                to: PRODUK_PATH,
                isSelected: PRODUK_PATH === pathname,
              },
              {
                name: "Data Kategori Produk",
                to: KATEGORI_PRODUK_PATH,
                isSelected: KATEGORI_PRODUK_PATH === pathname,
              },
              {
                name: "Data Eksportir",
                to: EKSPORTIR_PATH,
                isSelected: EKSPORTIR_PATH === pathname,
              },
              {
                name: "Data Pelanggan",
                to: PELANGGAN_PATH,
                isSelected: PELANGGAN_PATH === pathname,
              },
              {
                name: "Data Gudang",
                to: GUDANG_PATH,
                isSelected: GUDANG_PATH === pathname,
              },
            ]}
          />
        </>
      );

      setLaporanDataMenu(
        <>
          <div className={styles.devider}></div>
          <SideMenuItem
            name="Laporan"
            icon={<LaporanIcon className={styles.iconLaporan} />}
            isSelected={false}
            isExpanded={expandedMenus.includes("/laporan")}
            onExpandCollapse={() => {
              dispatch(expandMenu({ path: "/laporan" }));
            }}
            subMenus={[
              {
                name: "Stok Barang",
                to: LAPORAN_STOK_BARANG_PATH,
                isSelected: LAPORAN_STOK_BARANG_PATH === pathname,
              },
              {
                name: "Mutasi Barang",
                to: LAPORAN_MUTASI_BARANG_PATH,
                isSelected: LAPORAN_MUTASI_BARANG_PATH === pathname,
              },

              {
                name: "Retur Penjualan",
                to: LAPORAN_RETUR_PENJUALAN_PATH,
                isSelected: LAPORAN_RETUR_PENJUALAN_PATH === pathname,
              },
              {
                name: "Retur Pembelian",
                to: LAPORAN_RETUR_PEMBELIAN_PATH,
                isSelected: LAPORAN_RETUR_PEMBELIAN_PATH === pathname,
              },
              {
                name: "Penerimaan Barang",
                to: LAPORAN_PENERIMAAN_BARANG_PATH,
                isSelected: LAPORAN_PENERIMAAN_BARANG_PATH === pathname,
              },
              {
                name: "Pengeluaran Barang",
                to: LAPORAN_PENGELUARAN_BARANG_PATH,
                isSelected: LAPORAN_PENGELUARAN_BARANG_PATH === pathname,
              },
            ]}
          />
        </>
      );

      setPengaturanSubMenus([
        {
          name: "Pengguna",
          to: PENGGUNA_PATH,
          isSelected: PENGGUNA_PATH === pathname,
        },
        {
          name: "Ubah Password",
          to: CHANGE_PASSWORD_PATH,
          isSelected: CHANGE_PASSWORD_PATH === pathname,
        },
      ]);
    } else {
      setPengaturanSubMenus([
        {
          name: "Ubah Password",
          to: CHANGE_PASSWORD_PATH,
          isSelected: CHANGE_PASSWORD_PATH === pathname,
        },
      ]);
    }
  }, [user, pathname, dispatch, expandedMenus, firstPath]);

  return (
    <div className={styles.sideBarSection}>
      <div className={styles.topSection}>
        <div className={styles.logoSection}>
          <LogoIcon
            style={{
              width: "36px",
              height: "36px",
            }}
          />
          <h2>Simple Data</h2>
        </div>
        <h4>Selamat datang, {(user?.username ?? "").toUpperCase()}</h4>
      </div>

      <SideMenuItem
        name="Beranda"
        to={BERANDA_PATH}
        icon={
          <HomeIcon
            className={`${styles.icon} ${
              BERANDA_PATH === pathname && styles.selected
            }`}
          />
        }
        isSelected={BERANDA_PATH === pathname}
      />
      {masterDataMenu}

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
          {
            name: "Retur Penjualan",
            to: RETUR_PENJUALAN_PATH,
            isSelected: RETUR_PENJUALAN_PATH === pathname,
          },
          {
            name: "SPG Import",
            to: SPG_IMPORT_PATH,
            isSelected: SPG_IMPORT_PATH === pathname,
          },
          {
            name: "SPG Bawang",
            to: SPG_BAWANG_PATH,
            isSelected: SPG_BAWANG_PATH === pathname,
          },
          {
            name: "SPG Kawat",
            to: SPG_KAWAT_PATH,
            isSelected: SPG_KAWAT_PATH === pathname,
          },
          {
            name: "SPG Lain-lain",
            to: SPG_LAIN_PATH,
            isSelected: SPG_LAIN_PATH === pathname,
          },
          {
            name: "Surat Terima Barang",
            to: SURAT_TERIMA_BARANG_PATH,
            isSelected: SURAT_TERIMA_BARANG_PATH === pathname,
          },
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
          {
            name: "Retur Pembelian",
            to: RETUR_PEMBELIAN_PATH,
            isSelected: RETUR_PEMBELIAN_PATH === pathname,
          },
          {
            name: "SPK Barang",
            to: SPK_BARANG_PATH,
            isSelected: SPK_BARANG_PATH === pathname,
          },
          {
            name: "Surat Jalan",
            to: SURAT_JALAN_PATH,
            isSelected: SURAT_JALAN_PATH === pathname,
          },
          {
            name: "Surat Pengeluaran Barang",
            to: SURAT_PENGELUARAN_BARANG_PATH,
            isSelected: SURAT_PENGELUARAN_BARANG_PATH === pathname,
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
            isSelected: TRANSFER_STOK_PATH === pathname,
          },
        ]}
      />
      <div className={styles.devider}></div>
      <SideMenuItem
        name="Stok"
        to={STOCK_PATH}
        icon={
          <PenyesuaianStockDataIcon
            className={`${styles.icon} ${
              STOCK_PATH === pathname && styles.selected
            }`}
          />
        }
        isSelected={STOCK_PATH === pathname}
      />

      <div className={styles.devider}></div>

      <SideMenuItem
        name="Pengaturan"
        icon={
          <UserIcon
            className={`${styles.icon} ${
              PENGGUNA_PATH === pathname && styles.selected
            }`}
          />
        }
        isSelected={false}
        isExpanded={expandedMenus.includes("/pengaturan")}
        onExpandCollapse={() => {
          dispatch(expandMenu({ path: "/pengaturan" }));
        }}
        subMenus={pengaturanSubMenus}
      />
    </div>
  );
};

export default SideBar;
