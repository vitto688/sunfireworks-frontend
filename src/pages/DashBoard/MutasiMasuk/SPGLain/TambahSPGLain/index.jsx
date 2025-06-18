/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../../components/CustomButton";
import InputField from "../../../../../components/InputField";
import AddStockButton from "../../../../../components/AddStockButton";
import AddStockModal from "../../../../../components/AddStockModal";
import SearchField from "../../../../../components/SearchField";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditStockModal from "../../../../../components/EditStockModal";
import EditButton from "../../../../../components/EditButton";

export const TAMBAH_SPGLAIN_PATH = "/mutasi-masuk/spg-lain/tambah-spg-lain";

const TambahSPGLain = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [kodeRetur, setKodeRetur] = useState("");
  const [tanggalRetur, setTanggalRetur] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gudang, setGudang] = useState("");
  const [noSJ, setNoSJ] = useState("");
  const [stok, setStok] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Logic to save the updated retur penjualan
    console.log("Retur Penjualan updated!", {
      kodeRetur,
      tanggalRetur,
      keterangan,
      gudang,
      stok,
    });
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handleTambahStok = () => {
    // Logic to add stock, e.g., open a modal or navigate to another page
    console.log("Tambah Stok clicked!");
    setModalOpen(true);

    // navigate(`/mutasi-masuk/retur-penjualan/${argument.code}/tambah-stok`);
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();

    setEditModalOpen(value);
  };

  const handleSaveAddStok = (data) => {
    console.log("Data stok ditambahkan:", data);
    // Kirim ke backend di sini...
  };

  const handleSaveEditStok = (data) => {
    console.log("Data stok diedit:", data);
    // Kirim ke backend di sini...
  };
  //#endregion

  return (
    <div className={styles.tambahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton label="Simpan" onClick={handleSimpanClick} />
      </div>
      <div className={styles.formSection}>
        <div className={styles.row}>
          <InputField
            label="No SPG Lain-Lain"
            type="text"
            id="noSPGLain-Lain"
            name="noSPGLain-Lain"
            value={kodeRetur}
            onChange={(e) => setKodeRetur(e.target.value)}
          />
          <InputField
            label="Tanggal"
            type="date"
            id="tanggal"
            name="tanggal"
            value={tanggalRetur}
            onChange={(e) => setTanggalRetur(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <SearchField
            title="Cari Gudang"
            label="Gudang"
            type="text"
            id="gudang"
            name="gudang"
            data={warehouses.map((warehouse) => ({
              id: warehouse.id,
              name: warehouse.name,
            }))}
            onChange={(warehouse) => setGudang(warehouse)}
          />
          <InputField
            label="Keterangan"
            type="text"
            id="keterangan"
            name="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
          <InputField
            label="No SJ"
            type="text"
            id="noSuratJalan"
            name="noSuratJalan"
            value={noSJ}
            onChange={(e) => setNoSJ(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.rowBetween}>
        <label className={styles.label} htmlFor="produk">
          Produk
        </label>

        <AddStockButton onClick={() => handleTambahStok()} />
      </div>
      <div className={styles.divider} />
      <div className={styles.stocksTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          {/* <div className={styles.tableHeaderItem}>Barcode</div> */}
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
          {/* <div className={styles.tableHeaderItem}>Kuantitas</div>
          <div className={styles.tableHeaderItem}>Gudang</div> */}
        </div>
        <div className={styles.tableBody}>
          {stok.map((stokItem, index) => (
            <div key={stokItem.product_code} className={styles.tableRow}>
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDeleteOpen(stokItem);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{stokItem.product_code}</div>
              {/* <div className={styles.tableRowItem}>{stokItem.barcode}</div> */}
              <div className={styles.tableRowItem}>{stokItem.product_name}</div>
              <div className={styles.tableRowItem}>
                {stokItem.warehouse_name}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.carton_quantity}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.pack_quantity}
              </div>
              <div>
                <EditButton onClick={(e) => handleEdit(e, stokItem)} />
              </div>
              {/* <div className={styles.tableRowItem}>{product.quantity}</div>
              <div className={styles.tableRowItem}>
                {product.warehouse_name}
              </div> */}
            </div>
          ))}
        </div>
      </div>

      <AddStockModal
        stocks={stocks}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
      />

      <EditStockModal
        stocks={stocks}
        stock={editModalOpen}
        isOpen={editModalOpen !== null}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
      />

      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus item ini?"
        open={modalDeleteOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalDeleteOpen(null);
        }}
        onConfirm={() => setModalDeleteOpen(null)}
      />
    </div>
  );
};

export default TambahSPGLain;
