import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  createStockAdjustmentRequest,
  resetStockAdjustmentMessages,
} from "../../../../redux/actions/stockAdjustmentActions";
import { fetchWarehousesRequest } from "../../../../redux/actions/masterActions";
import { fetchStocksRequest } from "../../../../redux/actions/stockActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../components/CustomButton";
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import DatePicker from "../../../../components/DatePicker";
import AddStockButton from "../../../../components/AddStockButton";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import EditButton from "../../../../components/EditButton";
import AddStockModal from "../../../../components/AddStockModal";
import EditStockModal from "../../../../components/EditStockModal";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import Loading from "../../../../components/Loading";

// Import utility functions
import { formatNumberWithDot } from "../../../../utils/numberUtils";

export const TAMBAH_STOCK_ADJUSTMENT_PATH = "/stok-opname/tambah";

const TambahStokOpname = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alasan, setAlasan] = useState("");
  const [gudang, setGudang] = useState(null);
  const [tanggal, setTanggal] = useState(() => {
    // Set default to today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [stok, setStok] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { warehouses } = useSelector((state) => state.master);
  const { stocks } = useSelector((state) => state.stock);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.stockAdjustment
  );

  // Transform warehouses for SelectField
  const gudangOptions = warehouses.map((warehouse) => ({
    id: warehouse.id,
    name: warehouse.name,
  }));
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetStockAdjustmentMessages());

    // Fetch required data
    dispatch(fetchWarehousesRequest());
    dispatch(fetchStocksRequest());
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

  //#region Event Handlers
  const handleBatalClick = () => {
    navigate(-1);
  };

  const handleSimpanClick = () => {
    // Validation
    if (!gudang) {
      alert("Gudang harus dipilih");
      return;
    }

    if (!alasan.trim()) {
      alert("Alasan harus diisi");
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
      reason: alasan,
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
    <div className={styles.tambahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
          disabled={loading.create}
        />
        <CustomButton
          label={loading.create ? "Menyimpan..." : "Simpan"}
          onClick={handleSimpanClick}
          disabled={loading.create}
        />
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>Error: {errorMessage}</p>
        </div>
      )}

      <div className={styles.formSection}>
        <SelectField
          label="Gudang"
          placeholder="Pilih Gudang"
          options={gudangOptions}
          value={gudang}
          onChange={setGudang}
          required
        />

        <DatePicker
          label="Tanggal Transaksi"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
        />

        <InputField
          label="Alasan"
          type="text"
          placeholder="Masukkan alasan stock adjustment"
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          required
        />
      </div>

      <div className={styles.stockSection}>
        <div className={styles.stockHeader}>
          <h6>Daftar Produk</h6>
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
              <div className={styles.total}>Total</div>
              <div className={styles.cartoon}>
                {formatNumberWithDot(totalCarton)}
              </div>
              <div className={styles.pack}>
                {formatNumberWithDot(totalPack)}
              </div>
            </div>
          )}
        </div>
      </div>

      <AddStockModal
        stocks={stocks.filter((stock) => stock.warehouse === gudang?.id)}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
        enabledQuantities={true}
        title="Tambah Produk untuk Stock Adjustment"
      />

      <EditStockModal
        stocks={stocks.filter((stock) => stock.warehouse === gudang?.id)}
        stock={editModalOpen}
        isOpen={editModalOpen !== null}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
        enabledQuantities={true}
        title="Edit Produk Stock Adjustment"
      />

      <ConfirmDeleteModal
        isOpen={modalDeleteOpen !== null}
        onCancel={() => setModalDeleteOpen(null)}
        onConfirm={() => handleDeleteStok(modalDeleteOpen)}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus ${modalDeleteOpen?.product_name} dari daftar?`}
      />

      {loading.create && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default TambahStokOpname;
