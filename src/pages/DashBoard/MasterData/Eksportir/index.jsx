import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import actions
import {
  deleteSupplierRequest,
  fetchSuppliersRequest,
  resetMasterMessages,
} from "../../../../redux/actions/masterActions";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_EKSPORTIR_PATH } from "./TambahEksportir";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import { UBAH_EKSPORTIR_PATH } from "./UbahEksportir";
import Loading from "../../../../components/Loading";

export const EKSPORTIR_PATH = "/master-data/eksportir";

const Eksportir = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eksportir, setEksportir] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(null);

  const { suppliers, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    // Fetch suppliers data from API or state management
    // For now, we are using dummy data
    dispatch(fetchSuppliersRequest());
  }, [dispatch]);

  // Filter suppliers based on the search query
  useEffect(() => {
    const filteredSuppliers = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(query.toLowerCase())
    );
    setEksportir(filteredSuppliers);
  }, [query, suppliers]);

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
  //#endregion

  //#region handlers
  const handleAddClick = () => {
    navigate(TAMBAH_EKSPORTIR_PATH);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_EKSPORTIR_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.suppliersSection}>
      <div className={styles.actionsSection}>
        <CustomButton label="+ Tambah" onClick={handleAddClick} />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari eksportir..."
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
      <div className={styles.suppliersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Nama</div>
          <div className={styles.tableHeaderItem}>email</div>
          <div className={styles.tableHeaderItem}>Alamat</div>
          <div className={styles.tableHeaderItem}>PIC</div>
          <div className={styles.tableHeaderItem}>Nomor Telepon</div>
        </div>
        <div className={styles.tableBody}>
          {eksportir.map((supplier, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(supplier)}
            >
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(supplier);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{supplier.name}</div>
              <div className={styles.tableRowItem}>{supplier.email}</div>
              <div className={styles.tableRowItem}>{supplier.address}</div>
              <div className={styles.tableRowItem}>{supplier.pic_name}</div>
              <div className={styles.tableRowItem}>{supplier.pic_contact}</div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus eksportir ini?"
        open={modalOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalOpen(null);
        }}
        onConfirm={() => dispatch(deleteSupplierRequest({ id: modalOpen.id }))}
      />
      {loading.suppliers && (
        <Loading message="Sedamg memproses data, mohon tunggu..." />
      )}
    </div>
  );
};

export default Eksportir;
