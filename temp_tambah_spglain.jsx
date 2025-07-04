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
  addSPGLainRequest,
  resetSPGLainMessages,
} from "../../../../../redux/actions/spgActions";

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
  const { lain } = useSelector((state) => state.spg);
  const { loading, error, successMessage } = lain;
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetSPGLainMessages());
  }, [dispatch]);

  useEffect(() => {
    // Handle success message
    if (successMessage) {
      console.log("SPG Lain berhasil ditambahkan:", successMessage);
      // Navigate back to SPG Lain list
      navigate("/mutasi-masuk/spg-lain");
    }
  }, [successMessage, navigate]);

  useEffect(() => {
    // Handle error message
    if (error) {
      console.error("Error menambahkan SPG Lain:", error);
    }
  }, [error]);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Validate required fields
    if (!kodeRetur || !tanggalRetur || !gudang) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const spgData = {
      no: kodeRetur,
      tanggal_transaksi: tanggalRetur,
      description: keterangan,
      gudang: gudang,
      no_surat_jalan: noSJ,
      products: stok.map((item) => ({
        product: item.product || item.id,
        warehouse: item.warehouse,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    console.log("Menambahkan SPG Lain:", spgData);
    dispatch(addSPGLainRequest(spgData));
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
    setStok([...stok, data]);
    setModalOpen(false);
  };

  const handleSaveEditStok = (data) => {
    console.log("Data stok diedit:", data);
    const updatedStok = stok.map((item) => (item.id === data.id ? data : item));
    setStok(updatedStok);
    setEditModalOpen(null);
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
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
        </div>
      )}
      <div className={styles.formSection}>
        <div className={styles.row}>
          <InputField
            label="No SPG Lain"
            type="text"
            id="noSPGLain"
            name="noSPGLain"
            value={kodeRetur}
            onChange={(e) => setKodeRetur(e.target.value)}
          />
          <InputField
            label="Tanggal Transaksi"
            type="date"
            id="tanggalTransaksi"
            name="tanggalTransaksi"
            value={tanggalRetur}
            onChange={(e) => setTanggalRetur(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <InputField
            label="Keterangan"
            type="text"
            id="keterangan"
            name="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
          <InputField
            label="Gudang"
            type="text"
            id="gudang"
            name="gudang"
            value={gudang}
            onChange={(e) => setGudang(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <InputField
            label="No Surat Jalan"
            type="text"
            id="noSJ"
            name="noSJ"
            value={noSJ}
            onChange={(e) => setNoSJ(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.header}>
        <h6>Daftar Stok</h6>
      </div>
      <div className={styles.tableSectionWithButton}>
        <AddStockButton onClick={handleTambahStok} />
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Kode Produk</th>
                <th>Gudang</th>
                <th>Karton</th>
                <th>Pack</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stok.length > 0 ? (
                stok.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.product_code}</td>
                    <td>{item.warehouse_name}</td>
                    <td>{item.carton_quantity}</td>
                    <td>{item.pack_quantity}</td>
                    <td className={styles.actionColumn}>
                      <EditButton onClick={(e) => handleEdit(e, item)} />
                      <CustomDeleteButton
                        onClick={() => setModalDeleteOpen(item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Belum ada stok ditambahkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      <AddStockModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
      />

      {/* Edit Stock Modal */}
      <EditStockModal
        isOpen={editModalOpen !== null}
        stockData={editModalOpen}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={modalDeleteOpen !== null}
        onClose={() => setModalDeleteOpen(null)}
        onConfirm={() => {
          console.log("Deleting stock:", modalDeleteOpen);
          setStok(stok.filter((item) => item.id !== modalDeleteOpen.id));
          setModalDeleteOpen(null);
        }}
        itemName={modalDeleteOpen?.product_name || ""}
      />
    </div>
  );
};

export default TambahSPGLain;
