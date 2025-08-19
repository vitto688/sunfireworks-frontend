/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../components/CustomButton";
import InputField from "../../../../components/InputField";
import SearchField from "../../../../components/SearchField";
import AddStockButton from "../../../../components/AddStockButton";
import AddStockModal from "../../../../components/AddStockModal";
import DatePicker from "../../../../components/DatePicker";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import EditStockModal from "../../../../components/EditStockModal";
import EditButton from "../../../../components/EditButton";

// Import Redux actions
import {
  createStockAdjustmentRequest,
  resetStockAdjustmentMessages,
} from "../../../../redux/actions/stockAdjustmentActions";
import { formatNumberWithDot } from "../../../../utils/numberUtils";

export const TAMBAH_STOCK_ADJUSTMENT_PATH = "/stok-opname/tambah-stok-opname";

const TambahStokOpname = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState("");
  const [gudang, setGudang] = useState("");
  const [tanggal, setTanggal] = useState(() => {
    // Set default to today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [stok, setStok] = useState([]);
  const [warehouseStock, setWarehouseStock] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.stockAdjustment
  );

  // Extract actual loading state
  const isLoading = loading?.create || false;

  // Calculate total function
  const totalAll = stok.reduce((total, item) => {
    const cartonTotal =
      (item.carton_quantity || 0) * (item.carton_quantity || 0);
    const packTotal = (item.pack_quantity || 0) * (item.pack_quantity || 0);
    return total + cartonTotal + packTotal;
  }, 0);

  // Handle cancel button click
  const handleBatalClick = () => {
    navigate("/stok-opname");
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetStockAdjustmentMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetStockAdjustmentMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetStockAdjustmentMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Validate required fields
    if (!gudang) {
      alert("Gudang harus dipilih");
      return;
    }

    if (!keterangan) {
      alert("Keterangan harus diisi");
      return;
    }

    if (!tanggal) {
      alert("Tanggal harus diisi");
      return;
    }

    if (stok.length === 0) {
      alert("Minimal satu produk harus ditambahkan");
      return;
    }

    // Prepare data for API
    const stockAdjustmentData = {
      warehouse: gudang.id,
      reason: keterangan,
      transaction_date: tanggal,
      items: stok.map((item) => ({
        product: item.product || item.product_id,
        new_carton_quantity: item.carton_quantity || 0,
        new_pack_quantity: item.pack_quantity || 0,
      })),
    };

    dispatch(createStockAdjustmentRequest(stockAdjustmentData));
  };

  const handleTambahStok = () => {
    if (!gudang) {
      alert("Silakan pilih gudang terlebih dahulu");
      return;
    }
    setModalOpen(true);
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();
    setEditModalOpen(value);
  };

  const handleSaveAddStok = (data) => {
    // Check if product already exists
    const existingIndex = stok.findIndex(
      (item) =>
        item.product === data.product || item.product_code === data.product_code
    );

    if (existingIndex !== -1) {
      alert("Produk sudah ada dalam daftar");
      return;
    }

    // Update stok state with new data
    setStok([...stok, data]);
    setModalOpen(false);
  };

  const handleSaveEditStok = (data) => {
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) =>
        item.product_code === data.product_code ? data : item
      )
    );

    setEditModalOpen(null);
  };

  const handleDeleteStok = (stokItem) => {
    // Update stok state to remove the deleted item
    setStok((prevStok) => prevStok.filter((item) => item.id !== stokItem.id));
    setModalDeleteOpen(null);
  };
  //#endregion

  // Calculate totals
  const totalCarton = stok.reduce(
    (sum, item) => sum + (item.carton_quantity || 0),
    0
  );
  const totalPack = stok.reduce(
    (sum, item) => sum + (item.pack_quantity || 0),
    0
  );

  return (
    <div className={styles.tambahStokOpnameSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
          disabled={isLoading}
        />
        <CustomButton
          label={isLoading ? "Menyimpan..." : "Simpan"}
          onClick={handleSimpanClick}
          disabled={isLoading}
        />
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>Error: {errorMessage}</p>
        </div>
      )}

      <div className={styles.formSection}>
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

          <DatePicker
            isInput={true}
            label="Tanggal Transaksi"
            value={tanggal}
            onChange={setTanggal}
            required
          />
        </div>
        <div className={styles.row}>
          <InputField
            label="Keterangan"
            type="text"
            placeholder="Masukkan keterangan stok opname"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.stockHeader}>
        <label className={styles.label} htmlFor="produk">
          Daftar Produk
        </label>

        <AddStockButton onClick={handleTambahStok} />
      </div>
      <div className={styles.divider} />

      <div className={styles.stocksTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>KP</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Karton Baru</div>
          <div className={styles.tableHeaderItem}>Pack Baru</div>
          <div className={styles.tableHeaderItem}>Aksi</div>
        </div>

        <div className={styles.tableBody}>
          {stok.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Belum ada produk yang ditambahkan</p>
              <p>Klik tombol "Tambah Stok" untuk menambahkan produk</p>
            </div>
          ) : (
            stok.map((stokItem, index) => (
              <div
                key={stokItem.product_code || index}
                className={styles.tableRow}
              >
                <CustomDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalDeleteOpen(stokItem);
                  }}
                />
                <div className={styles.tableRowItem}>{index + 1}</div>
                <div className={styles.tableRowItem}>
                  {stokItem.product_code}
                </div>
                <div className={styles.tableRowItem}>
                  {stokItem.product_name}
                </div>
                <div className={styles.tableRowItem}>
                  {stokItem.supplier_name}
                </div>
                <div className={styles.tableRowItem}>{stokItem.packing}</div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(stokItem.carton_quantity || 0)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(stokItem.pack_quantity || 0)}
                </div>
                <div>
                  <EditButton onClick={(e) => handleEdit(e, stokItem)} />
                </div>
              </div>
            ))
          )}
        </div>

        {stok.length > 0 && (
          <div className={styles.tableFooter}>
            <div className={styles.totalText}>Total</div>
            <div className={styles.totalCarton}>
              {formatNumberWithDot(totalCarton)}
            </div>
            <div className={styles.totalPack}>
              {formatNumberWithDot(totalPack)}
            </div>
            <div className={styles.totalAll}>
              {formatNumberWithDot(totalAll)}
            </div>
          </div>
        )}
      </div>

      <AddStockModal
        stocks={stocks?.filter((stock) => stock.warehouse === gudang?.id) || []}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
        enabledQuantities={true}
        title="Tambah Produk untuk Stok Opname"
      />

      <EditStockModal
        stocks={stocks?.filter((stock) => stock.warehouse === gudang?.id) || []}
        stock={editModalOpen}
        isOpen={editModalOpen !== null}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
        enabledQuantities={true}
        title="Edit Produk Stok Opname"
      />

      <ConfirmDeleteModal
        label={`Apakah anda yakin untuk menghapus "${modalDeleteOpen?.product_name}" dari daftar?`}
        open={modalDeleteOpen !== null}
        onClose={() => setModalDeleteOpen(null)}
        onConfirm={() => handleDeleteStok(modalDeleteOpen)}
      />
    </div>
  );
};

export default TambahStokOpname;
