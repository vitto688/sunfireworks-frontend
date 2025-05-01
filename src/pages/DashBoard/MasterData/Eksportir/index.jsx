import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_EKSPORTIR_PATH } from "./TambahEksportir";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import { UBAH_EKSPORTIR_PATH } from "./UbahEksportir";

// import actions
import { fetchSuppliersRequest } from "../../../../redux/actions/masterActions";

export const EKSPORTIR_PATH = "/master-data/eksportir";

const Eksportir = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { suppliers } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch suppliers data from API or state management
    // For now, we are using dummy data
    dispatch(fetchSuppliersRequest());
  }, [dispatch]);

  const handleAddClick = () => {
    console.log("Supplier added!");
    navigate(TAMBAH_EKSPORTIR_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
    console.log("Product deleted!", value);
  };

  const handleItemClick = (value) => {
    console.log("value", value);
    navigate(UBAH_EKSPORTIR_PATH, { state: value });
  };

  return (
    <div className={styles.suppliersSection}>
      <SearchBar
        type="text"
        placeholder="Cari eksportir..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >
        <CustomButton label="Tambah" onClick={handleAddClick} />
      </SearchBar>
      <div className={styles.suppliersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Principal</div>
          <div className={styles.tableHeaderItem}>Nama</div>
          <div className={styles.tableHeaderItem}>Alamat</div>
          <div className={styles.tableHeaderItem}>Email</div>
          <div className={styles.tableHeaderItem}>Nomor Telepon</div>
        </div>
        <div className={styles.tableBody}>
          {suppliers.map((supplier, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(supplier)}
            >
              <CustomDeleteButton onClick={() => setModalOpen((old) => !old)} />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>
                {supplier.kode_principal}
              </div>
              <div className={styles.tableRowItem}>
                {supplier.nama_principal}
              </div>
              <div className={styles.tableRowItem}>
                {supplier.alamat_principal}
              </div>
              <div className={styles.tableRowItem}>
                {supplier.email_principal}
              </div>
              <div className={styles.tableRowItem}>
                {supplier.telp_principal}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus eksportir ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default Eksportir;
