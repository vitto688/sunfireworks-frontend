import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import actions
import {
  deleteWarehouseRequest,
  fetchWarehousesRequest,
  resetMasterMessages,
} from "../../../../redux/actions/masterActions";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_GUDANG_PATH } from "./TambahGudang";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import { UBAH_GUDANG_PATH } from "./UbahGudang";
import Loading from "../../../../components/Loading";

export const GUDANG_PATH = "/master-data/gudang";

const Gudang = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gudang, setGudang] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(null);

  const { warehouses, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    // Fetch warehouses data from API or state management
    // For now, we are using dummy data
    dispatch(fetchWarehousesRequest());
  }, [dispatch]);

  // Filter warehouses based on the search query
  useEffect(() => {
    const filteredWarehouses = warehouses.filter((warehouse) =>
      warehouse.name.toLowerCase().includes(query.toLowerCase())
    );
    setGudang(filteredWarehouses);
  }, [query, warehouses]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      setModalOpen(null);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
    dispatch(resetMasterMessages());
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  const handleAddClick = () => {
    navigate(TAMBAH_GUDANG_PATH);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_GUDANG_PATH, { state: value });
  };

  return (
    <div className={styles.warehousesSection}>
      <div className={styles.actionsSection}>
        <CustomButton label="+ Tambah" onClick={handleAddClick} />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari gudang..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.filterSection}>
          {/* <FilterDropdown
            options={filterOptions}
            placeholder="Filter role"
            onChange={(val) => setSelectedFilter(val.value)}
          />
          <FilterDropdown
            options={filterOptionsActive}
            placeholder="Filter pengguna aktif"
            onChange={(val) => setSelectedActiveFilter(val.value)}
          /> */}
        </div>
      </div>
      <div className={styles.warehousesTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Nama Gudang</div>
          <div className={styles.tableHeaderItem}>Deskripsi</div>
        </div>
        <div className={styles.tableBody}>
          {gudang.map((warehouse, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(warehouse)}
            >
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(warehouse);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{warehouse.name}</div>
              <div className={styles.tableRowItem}>{warehouse.description}</div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus gudang ini?"
        open={modalOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalOpen(null);
        }}
        onConfirm={() =>
          dispatch(
            deleteWarehouseRequest({
              id: modalOpen.id,
            })
          )
        }
      />
      {loading.warehouses && (
        <Loading message="Sedamg memproses data, mohon tunggu..." />
      )}
    </div>
  );
};

export default Gudang;
