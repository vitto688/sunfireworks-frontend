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
import Loading from "../../../../components/Loading";
import DatePicker from "../../../../components/DatePicker";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import EditStockModal from "../../../../components/EditStockModal";
import EditButton from "../../../../components/EditButton";

// Import Redux actions
import { resetStockAdjustmentMessages } from "../../../../redux/actions/stockAdjustmentActions";
import { formatNumberWithDot } from "../../../../utils/numberUtils";

export const UBAH_STOCK_ADJUSTMENT_PATH = "/stok-opname/ubah-stok-opname";

const UbahStokOpname = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState(argument?.reason || "");
  const [gudang, setGudang] = useState(null);
  const [tanggal, setTanggal] = useState(argument?.transaction_date || "");
  const [stok, setStok] = useState(argument?.items || []);
  const [warehouseStock, setWarehouseStock] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.stockAdjustment
  );

  // Extract actual loading state
  const isLoading = loading?.update || false;

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
    if (argument?.warehouse) {
      setGudang(warehouses.find((w) => w.id === argument.warehouse) || null);
    }
  }, [warehouses, argument.warehouse]);

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
  const handleEdit = (e, value) => {
    e.stopPropagation();
    setEditModalOpen(value);
  };

  const handleSaveEditStok = (data) => {
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) =>
        item.product_code === data.product_code || item.product === data.product
          ? data
          : item
      )
    );

    setEditModalOpen(null);
  };

  const handleDeleteStok = (stokItem) => {
    // Update stok state to remove the deleted item
    setStok((prevStok) =>
      prevStok.filter(
        (item) =>
          item.id !== stokItem.id &&
          item.product !== stokItem.product &&
          item.product_code !== stokItem.product_code
      )
    );
    setModalDeleteOpen(null);
  };
  //#endregion

  // Calculate totals
  const totalCarton = stok.reduce(
    (sum, item) =>
      sum + (item.carton_quantity || item.new_carton_quantity || 0),
    0
  );
  const totalPack = stok.reduce(
    (sum, item) => sum + (item.pack_quantity || item.new_pack_quantity || 0),
    0
  );

  return (
    <div className={styles.ubahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
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
          <InputField
            label="No Dokumen"
            type="text"
            id="noDokumen"
            name="noDokumen"
            value={argument?.document_number || ""}
            disabled={true}
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
            defaultValue={gudang}
            disabled={true}
          />
          <InputField
            label="Keterangan"
            type="text"
            id="keterangan"
            name="keterangan"
            placeholder="Masukkan keterangan stok opname"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.rowBetween}>
        <label className={styles.label} htmlFor="produk">
          Daftar Produk
        </label>
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
                key={stokItem.product_code || stokItem.product || index}
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
                  {stokItem.product_code || stokItem.product?.code || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {stokItem.product_name || stokItem.product?.name || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {stokItem.supplier_name ||
                    stokItem.product?.supplier?.name ||
                    "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {stokItem.packing || stokItem.product?.packing || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(
                    stokItem.carton_quantity ||
                      stokItem.new_carton_quantity ||
                      0
                  )}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(
                    stokItem.pack_quantity || stokItem.new_pack_quantity || 0
                  )}
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
            <div className={styles.pack}>{formatNumberWithDot(totalPack)}</div>
          </div>
        )}
      </div>

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
        message={`Apakah Anda yakin ingin menghapus ${
          modalDeleteOpen?.product_name || modalDeleteOpen?.product?.name
        } dari daftar?`}
      />

      {isLoading && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default UbahStokOpname;
