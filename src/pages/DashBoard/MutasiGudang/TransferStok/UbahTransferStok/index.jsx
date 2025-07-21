/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  updateStokTransferRequest,
  resetStokTransferMessages,
} from "../../../../../redux/actions/stokTransferActions";

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
import SearchField from "../../../../../components/SearchField";

// Import utility functions
import { formatDate } from "../../../../../utils/dateUtils";
import { formatNumberWithDot } from "../../../../../utils/numberUtils";

export const UBAH_TRANSFER_STOK_PATH =
  "/mutasi-gudang/transfer-stok/ubah-transfer-stok";

const UbahTransferStok = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  // const [noTransfer, setNoTransfer] = useState(argument?.document_number ?? "");
  // const [tanggalTransfer, setTanggalTransfer] = useState(
  //   formatDate(argument?.created_at ?? "")
  // );
  // const [keterangan, setKeterangan] = useState(argument?.user_email ?? "");
  // const [gudangAsal, setGudangAsal] = useState(
  //   argument?.source_warehouse_name ?? null
  // );
  // const [gudangTujuan, setGudangTujuan] = useState(
  //   argument?.destination_warehouse_name ?? null
  // );

  const [stok, setStok] = useState(argument?.items ?? []);

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

  // useEffect(() => {
  //   if (argument?.source_warehouse) {
  //     setGudangAsal(
  //       warehouses.find(
  //         (warehouse) => warehouse.id === argument.source_warehouse
  //       ) || null
  //     );
  //   }
  //   if (argument?.destination_warehouse) {
  //     setGudangTujuan(
  //       warehouses.find(
  //         (warehouse) => warehouse.id === argument.destination_warehouse
  //       ) || null
  //     );
  //   }
  // }, [warehouses, argument?.source_warehouse, argument?.destination_warehouse]);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Validate required fields
    if (stok.length === 0) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const transferData = {
      source_warehouse: argument.source_warehouse,
      destination_warehouse: argument.destination_warehouse,
      items: stok.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    dispatch(updateStokTransferRequest(argument.id, transferData));
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handleTambahStok = () => {
    // Logic to add stock, e.g., open a modal or navigate to another page

    setModalOpen(true);
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();
    setEditModalOpen(value);
  };

  const handleSaveAddStok = (data) => {
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

  return (
    <div className={styles.ubahSection}>
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
          <InputField
            label="No Transfer"
            type="text"
            id="noTransfer"
            name="noTransfer"
            defaultValue={argument?.document_number ?? ""}
          />
          <InputField
            label="Tanggal"
            type="text"
            id="tanggal"
            name="tanggal"
            defaultValue={formatDate(argument?.created_at ?? "")}
          />
        </div>

        <div className={styles.row}>
          <InputField
            label="Gudang Asal"
            type="text"
            id="gudangAsal"
            name="gudangAsal"
            defaultValue={argument?.source_warehouse_name ?? ""}
          />
          <InputField
            label="Gudang Tujuan"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            defaultValue={argument?.destination_warehouse_name ?? ""}
          />
          <InputField
            label="Di Input Oleh"
            type="text"
            id="diInputOleh"
            name="diInputOleh"
            defaultValue={argument?.user_username ?? ""}
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
                  {formatNumberWithDot(stokItem.carton_quantity)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(stokItem.pack_quantity)}
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
        stocks={stocks.filter(
          (stock) => stock.warehouse === argument.source_warehouse
        )}
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
        onConfirm={() => handleDeleteStok(modalDeleteOpen)}
      />
    </div>
  );
};

export default UbahTransferStok;
