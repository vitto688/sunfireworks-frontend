import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_GUDANG_PATH } from "./TambahGudang";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import { UBAH_GUDANG_PATH } from "./UbahGudang";

// import actions
import { fetchWarehousesRequest } from "../../../../redux/actions/masterActions";

export const GUDANG_PATH = "/master-data/gudang";

const Gudang = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { warehouses } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch warehouses data from API or state management
    // For now, we are using dummy data
    dispatch(fetchWarehousesRequest());
  }, [dispatch]);

  const handleFindClick = () => {
    console.log("Warehouse added!");
    navigate(TAMBAH_GUDANG_PATH);
  };

  const handleAddClick = () => {
    console.log("Warehouse added!");
    navigate(TAMBAH_GUDANG_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
    console.log("Product deleted!", value);
  };

  const handleItemClick = (value) => {
    console.log("value", value);
    navigate(UBAH_GUDANG_PATH, { state: value });
  };

  return (
    <div className={styles.warehousesSection}>
      <SearchBar
        type="text"
        placeholder="Cari gudang..."
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
      <div className={styles.warehousesTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Nama Gudang</div>
          <div className={styles.tableHeaderItem}>Alamat</div>
        </div>
        <div className={styles.tableBody}>
          {warehouses.map((warehouse, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(warehouse)}
            >
              <CustomDeleteButton onClick={() => setModalOpen((old) => !old)} />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{warehouse.nama_gudang}</div>
              <div className={styles.tableRowItem}>{warehouse.alamat}</div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus gudang ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default Gudang;
