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
import {
  deleteCustomerRequest,
  fetchCustomersRequest,
  resetMasterMessages,
} from "../../../../redux/actions/masterActions";
import { UBAH_PELANGGAN_PATH } from "./UbahPelanggan";
import Loading from "../../../../components/Loading";

export const PELANGGAN_PATH = "/master-data/pelanggan";

const Pelanggan = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pelanggan, setPelanggan] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(null);

  const { customers, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    // Fetch customers data from API or state management
    // For now, we are using dummy data
    dispatch(fetchCustomersRequest());
  }, [dispatch]);

  // Filter customers based on the search query
  useEffect(() => {
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(query.toLowerCase())
    );
    setPelanggan(filteredCustomers);
  }, [query, customers]);

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

  //#region Handlers
  const handleAddClick = () => {
    navigate(TAMBAH_PELANGGAN_PATH);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_PELANGGAN_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.customersSection}>
      <div className={styles.actionsSection}>
        <CustomButton label="+ Tambah" onClick={handleAddClick} />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari pelanggan..."
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

      <div className={styles.customersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Nama Pelanggan</div>
          <div className={styles.tableHeaderItem}>Alamat</div>
          <div className={styles.tableHeaderItem}>Up.</div>
          <div className={styles.tableHeaderItem}>Nomor Telepon</div>
        </div>
        <div className={styles.tableBody}>
          {pelanggan.map((customer, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(customer)}
            >
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(customer);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{customer.name}</div>
              <div className={styles.tableRowItem}>{customer.address}</div>
              <div className={styles.tableRowItem}>{customer.upline}</div>
              <div className={styles.tableRowItem}>
                {customer.contact_number}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus pelanggan ini?"
        open={modalOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalOpen(null);
        }}
        onConfirm={() => dispatch(deleteCustomerRequest({ id: modalOpen.id }))}
      />
      {loading.customers && (
        <Loading message="Sedang memproses data, mohon tunggu..." />
      )}
    </div>
  );
};

export default Pelanggan;
