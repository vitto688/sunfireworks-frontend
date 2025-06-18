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
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditButton from "../../../../../components/EditButton";
import EditStockModal from "../../../../../components/EditStockModal";

export const UBAH_RETUR_PEMBELIAN_PATH =
  "/mutasi-keluar/retur-pembelian/ubah-retur-pembelian";

const UbahReturPembelian = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [kodeRetur, setKodeRetur] = useState(argument?.no ?? "");
  const [tanggalRetur, setTanggalRetur] = useState(
    argument?.tanggal_transaksi ?? ""
  );
  const [keterangan, setKeterangan] = useState(argument?.description ?? "");
  const [gudang, setGudang] = useState(argument?.gudang ?? "");
  const [noSJ, setNoSJ] = useState(argument?.no_surat_jalan ?? "");

  const [stok, setStok] = useState(
    argument?.products ?? [
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
      {
        id: 19,
        product: 7,
        product_name: "Kembang Api Tes",
        product_code: "PROD101",
        warehouse: 6,
        warehouse_name: "G7",
        carton_quantity: 20,
        pack_quantity: 75,
        is_product_deleted: false,
        created_at: "2025-06-04T17:05:58.804334Z",
        updated_at: "2025-06-07T08:01:42.007215Z",
      },
    ]
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);

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
    <div className={styles.ubahSection}>
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
            label="No Faktur"
            type="text"
            id="noFaktur"
            name="noFaktur"
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
          <InputField
            label="Gudang Tujuan"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            value={gudang}
            onChange={(e) => setGudang(e.target.value)}
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
                  setDeleteModalOpen(stokItem);
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
        open={deleteModalOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setDeleteModalOpen(null);
        }}
        onConfirm={() => setDeleteModalOpen(null)}
      />
    </div>
  );
};

export default UbahReturPembelian;
