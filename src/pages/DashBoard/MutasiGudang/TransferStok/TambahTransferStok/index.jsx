/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  addStokTransferRequest,
  resetStokTransferMessages,
} from "../../../../../redux/actions/stokTransferActions";

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

export const TAMBAH_TRANSFER_STOK_PATH =
  "/mutasi-gudang/transfer-stok/tambah-transfer-stok";

const TambahTransferStok = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [gudangAsal, setGudangAsal] = useState(null);
  const [gudangTujuan, setGudangTujuan] = useState(null);

  const [stok, setStok] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.stokTransfer
  );
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetStokTransferMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetStokTransferMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetStokTransferMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Validate required fields
    if (!gudangAsal || !gudangTujuan || stok.length === 0) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const transferData = {
      source_warehouse: gudangAsal.id,
      destination_warehouse: gudangTujuan.id,
      items: stok.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    console.log("Menambahkan Transfer Stok:", transferData);
    dispatch(addStokTransferRequest(transferData));
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handleTambahStok = () => {
    // Logic to add stock, e.g., open a modal or navigate to another page
    console.log("Tambah Stok clicked!");
    setModalOpen(true);
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();
    setEditModalOpen(value);
  };

  const handleSaveAddStok = (data) => {
    console.log("Data stok ditambahkan:", data);
    // Update stok state with new data
    setStok([...stok, data]);
    setModalOpen(false);
  };

  const handleSaveEditStok = (data) => {
    console.log("Data stok diedit:", data);
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) =>
        item.product_code === data.product_code ? data : item
      )
    );
    setEditModalOpen(null);
  };

  const handleDeleteStok = (stokItem) => {
    console.log("Menghapus stok:", stokItem);
    // Update stok state to remove the deleted item
    setStok((prevStok) => prevStok.filter((item) => item.id !== stokItem.id));
    setModalDeleteOpen(null);
  };
  //#endregion

  return (
    <div className={styles.tambahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
          disabled={loading}
        />
        <CustomButton
          label={loading ? "Menyimpan..." : "Simpan"}
          onClick={handleSimpanClick}
          disabled={loading}
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
            label="Gudang Asal"
            type="text"
            id="gudangAsal"
            name="gudangAsal"
            data={warehouses.map((warehouse) => ({
              id: warehouse.id,
              name: warehouse.name,
            }))}
            defaultValue={gudangAsal}
            onChange={(warehouse) => setGudangAsal(warehouse)}
          />
        </div>
        <div className={styles.row}>
          <SearchField
            title="Cari Gudang"
            label="Gudang Tujuan"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            data={warehouses.map((warehouse) => ({
              id: warehouse.id,
              name: warehouse.name,
            }))}
            defaultValue={gudangTujuan}
            onChange={(warehouse) => setGudangTujuan(warehouse)}
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
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
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
                  {stokItem.carton_quantity}
                </div>
                <div className={styles.tableRowItem}>
                  {stokItem.pack_quantity}
                </div>
                <div>
                  <EditButton onClick={(e) => handleEdit(e, stokItem)} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddStockModal
        stocks={stocks.filter((stock) => stock.warehouse === gudangAsal?.id)}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
      />

      <EditStockModal
        stocks={stocks.filter((stock) => stock.warehouse === gudangAsal?.id)}
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
        onConfirm={() => handleDeleteStok(modalDeleteOpen)}
      />
    </div>
  );
};

export default TambahTransferStok;
