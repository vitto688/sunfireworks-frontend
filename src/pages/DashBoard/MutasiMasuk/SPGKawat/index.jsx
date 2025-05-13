/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import { TAMBAH_SPG_KAWAT_PATH } from "./TambahSPGKawat";
import { UBAH_SPG_KAWAT_PATH } from "./UbahSPGKawat";

export const SPG_KAWAT_PATH = "/mutasi-masuk/spg-kawat";

const SPGKawat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleFindClick = () => {
    console.log("Product added!");
  };

  const handleAddClick = () => {
    console.log("Product added!");
    navigate(TAMBAH_SPG_KAWAT_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
    console.log("Product deleted!", value);
  };

  const handleItemClick = (value) => {
    console.log("value", value);
    navigate(UBAH_SPG_KAWAT_PATH, { state: value });
  };

  return (
    <div className={styles.spgKawatSection}>
      <SearchBar
        type="text"
        placeholder="Cari spg..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >
        <CustomButton label="Cari" onClick={handleFindClick} />
        <CustomButton
          variant="outline"
          label="Tambah"
          onClick={handleAddClick}
        />
      </SearchBar>
      <div className={styles.spgKawatTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No Faktur</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
        </div>
        <div className={styles.tableBody}>
          <div
            role="presentation"
            className={styles.tableRow}
            onClick={() => handleItemClick({})}
          >
            <div className={styles.tableRowItem} />
            <div className={styles.tableRowItem}>1</div>
            <div className={styles.tableRowItem}>2023-10-01</div>
            <div className={styles.tableRowItem}>Faktur 1</div>
            <div className={styles.tableRowItem}>Gudang 1</div>
            <div className={styles.tableRowItem}>User 1</div>
          </div>
          {/* Add more rows as needed */}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus produk ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default SPGKawat;
