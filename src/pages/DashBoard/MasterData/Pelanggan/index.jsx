import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_PELANGGAN_PATH } from "./TambahPelanggan";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";

// import actions
import { fetchCustomersRequest } from "../../../../redux/actions/masterActions";
import { UBAH_PELANGGAN_PATH } from "./UbahPelanggan";

export const PELANGGAN_PATH = "/master-data/pelanggan";

const Pelanggan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { customers } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch customers data from API or state management
    // For now, we are using dummy data
    dispatch(fetchCustomersRequest());
  }, [dispatch]);

  const handleAddClick = () => {
    console.log("Customer added!");
    navigate(TAMBAH_PELANGGAN_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
    console.log("Product deleted!", value);
  };

  const handleItemClick = (value) => {
    console.log("value", value);
    navigate(UBAH_PELANGGAN_PATH, { state: value });
  };

  return (
    <div className={styles.customersSection}>
      <SearchBar
        type="text"
        placeholder="Cari pelanggan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >
        <CustomButton label="Tambah" onClick={handleAddClick} />
      </SearchBar>
      <div className={styles.customersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Pelanggan</div>
          <div className={styles.tableHeaderItem}>Nama Pelanggan</div>
          <div className={styles.tableHeaderItem}>Alamat</div>
          <div className={styles.tableHeaderItem}>Email</div>
          <div className={styles.tableHeaderItem}>Nomor Telepon</div>
        </div>
        <div className={styles.tableBody}>
          {customers.map((customer, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(customer)}
            >
              <CustomDeleteButton onClick={() => setModalOpen((old) => !old)} />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>
                {customer.kode_pelanggan}
              </div>
              <div className={styles.tableRowItem}>
                {customer.nama_pelanggan}
              </div>
              <div className={styles.tableRowItem}>
                {customer.alamat_pelanggan}
              </div>
              <div className={styles.tableRowItem}>
                {customer.email_pelanggan}
              </div>
              <div className={styles.tableRowItem}>
                {customer.telp_pelanggan}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus pelanggan ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default Pelanggan;
