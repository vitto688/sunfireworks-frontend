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

// Import Redux actions
import {
  updateSPGImportRequest,
  resetSPGImportMessages,
} from "../../../../../redux/actions/spgActions";

export const UBAH_SPGIMPORT_PATH = "/mutasi-masuk/spg-import/ubah-spg-import";

const UbahSPGImport = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [gudang, setGudang] = useState(null);
  const [noSJ, setNoSJ] = useState(argument?.sj_number || "");
  const [noKontainer, setNoKontainer] = useState(
    argument?.container_number || ""
  );
  const [noKendaraan, setNoKendaraan] = useState(
    argument?.vehicle_number || ""
  );
  const [mulaiBongkar, setMulaiBongkar] = useState(
    argument?.start_unload || ""
  ); // type date time
  const [selesaiBongkar, setSelesaiBongkar] = useState(
    argument?.finish_load || ""
  ); // type date time
  const [stok, setStok] = useState(argument?.items || []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { import: importData } = useSelector((state) => state.spg);
  const { loading, message, errorMessage, errorCode } = importData;
  //#endregion
  console.log("stok", stok);

  //#region Effects

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetSPGImportMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetSPGImportMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Validate required fields
    if (
      !noSJ ||
      !gudang ||
      !noKontainer ||
      !noKendaraan ||
      !mulaiBongkar ||
      !selesaiBongkar
    ) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const spgData = {
      id: argument.id,
      warehouse: gudang.id || gudang,
      sj_number: noSJ,
      container_number: noKontainer,
      vehicle_number: noKendaraan,
      start_unload: mulaiBongkar,
      finish_load: selesaiBongkar,
      items: stok.map((item) => ({
        product: item.stock?.product || item.id,
        packaging_size: item.packSize || "",
        carton_quantity: item.carton || 0,
        pack_quantity: item.pack || 0,
      })),
    };

    console.log("Mengubah SPG Import:", spgData);
    dispatch(updateSPGImportRequest(spgData));
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
    // Update stok state with new data
    setStok([...stok, data]);
    setModalOpen(false);
    // Kirim ke backend di sini...
  };

  const handleSaveEditStok = (data) => {
    console.log("Data stok diedit:", data);
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) =>
        item.stock.product_code === data.stock.product_code ? data : item
      )
    );
    setEditModalOpen(null);
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
            label="No SJ"
            type="text"
            id="noSuratJalan"
            name="noSuratJalan"
            value={noSJ}
            onChange={(e) => setNoSJ(e.target.value)}
          />
          <InputField
            label="No Kontainer"
            type="text"
            id="noKontainer"
            name="noKontainer"
            value={noKontainer}
            onChange={(e) => setNoKontainer(e.target.value)}
          />
          <InputField
            label="No Kendaraan"
            type="text"
            id="noKendaraan"
            name="noKendaraan"
            value={noKendaraan}
            onChange={(e) => setNoKendaraan(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <InputField
            label="Mulai Bongkar"
            type="text"
            id="mulaiBongkar"
            name="mulaiBongkar"
            value={mulaiBongkar}
            onChange={(e) => setMulaiBongkar(e.target.value)}
          />
          <InputField
            label="Selesai Bongkar"
            type="text"
            id="selesaiBongkar"
            name="selesaiBongkar"
            value={selesaiBongkar}
            onChange={(e) => setSelesaiBongkar(e.target.value)}
          />
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
            defaultValue={
              warehouses.find(
                (warehouse) => warehouse.id === argument?.warehouse
              ) || null
            }
            onChange={(warehouse) => setGudang(warehouse)}
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
          <div className={styles.tableHeaderItem}>Ukuran Pack</div>
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
                {stokItem.carton_quantity}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.pack_quantity}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.packaging_size}
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

export default UbahSPGImport;
