/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  fetchSuratJalanRequest,
  deleteSuratJalanRequest,
  resetSuratJalanMessages,
} from "../../../../redux/actions/suratJalanActions";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import { UBAH_SURAT_JALAN_PATH } from "./UbahSuratJalan";
import { TAMBAH_SURAT_JALAN_PATH } from "./TambahSuratJalan";

// Define the path for the Surat Jalan page
export const SURAT_JALAN_PATH = "/mutasi-keluar/surat-jalan";

const SuratJalan = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [customerFilterOptions, setCustomerFilterOptions] = useState([]);
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses, customers } = useSelector((state) => state.master);
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.suratJalan
  );

  useEffect(() => {
    // Fetch Surat Jalan data on component mount
    dispatch(fetchSuratJalanRequest());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetSuratJalanMessages());
    }
    if (errorMessage) {
      alert(errorMessage);
      dispatch(resetSuratJalanMessages());
    }
  }, [message, errorMessage, dispatch]);

  useEffect(() => {
    if (
      !query &&
      !startDate &&
      !endDate &&
      selectedWarehouseFilter === 0 &&
      selectedCustomerFilter === 0
    ) {
      // Set initial filtered data from Redux
      setFilteredData(data || []);
    } else {
      // Filter data based on query, date range, and selected filters
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.transaction_date || item.created_at);

        // Extract only date part for comparison (ignore time)
        const itemDateOnly = new Date(
          itemDate.getFullYear(),
          itemDate.getMonth(),
          itemDate.getDate()
        );
        const startDateOnly = startDate
          ? new Date(
              new Date(startDate).getFullYear(),
              new Date(startDate).getMonth(),
              new Date(startDate).getDate()
            )
          : null;
        const endDateOnly = endDate
          ? new Date(
              new Date(endDate).getFullYear(),
              new Date(endDate).getMonth(),
              new Date(endDate).getDate()
            )
          : null;

        const isInDateRange =
          (!startDateOnly || itemDateOnly >= startDateOnly) &&
          (!endDateOnly || itemDateOnly <= endDateOnly);
        const matchesQuery =
          (item.document_number || item.no_faktur || "")
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (item.customer_name || "")
            .toLowerCase()
            .includes(query.toLowerCase());

        return (
          isInDateRange &&
          matchesQuery &&
          (selectedWarehouseFilter === 0 ||
            item.warehouse_name === selectedWarehouseFilter) &&
          (selectedCustomerFilter === 0 ||
            item.customer_name === selectedCustomerFilter)
        );
      });

      setFilteredData(filtered);
    }
  }, [
    data,
    query,
    startDate,
    endDate,
    selectedWarehouseFilter,
    selectedCustomerFilter,
  ]);

  useEffect(() => {
    if (warehouses.length > 0) {
      const options = [
        { label: "Semua Gudang", value: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.name, // Assuming warehouse.name is unique
        })),
      ];
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);

  useEffect(() => {
    if (customers && customers.length > 0) {
      const options = [
        { label: "Semua Pelanggan", value: 0 },
        ...customers.map((customer) => ({
          label: customer.name,
          value: customer.name, // Assuming customer.name is unique
        })),
      ];
      setCustomerFilterOptions(options);
    }
  }, [customers]);

  //#endregion

  //#region Handlers

  const handleAddClick = () => {
    navigate(TAMBAH_SURAT_JALAN_PATH);
  };

  const handleDelete = (item) => {
    if (item && item.id) {
      dispatch(deleteSuratJalanRequest(item.id));
    }
    setModalOpen(false);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_SURAT_JALAN_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.mainSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          // variant="outline"
          label={loading ? "Loading..." : "+ Tambah"}
          onClick={handleAddClick}
          disabled={loading}
        />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari Surat Jalan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.filterSection}>
          <DatePicker label="Dari " value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai " value={endDate} onChange={setEndDate} />
          <FilterDropdown
            options={warehouseFilterOptions}
            placeholder="Filter Gudang"
            onChange={(val) => setSelectedWarehouseFilter(val.value)}
          />
          <FilterDropdown
            options={customerFilterOptions}
            placeholder="Filter Pelanggan"
            onChange={(val) => setSelectedCustomerFilter(val.value)}
          />
        </div>
      </div>
      <div className={styles.returPenjualanTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No Bukti</div>
          <div className={styles.tableHeaderItem}>Nama Pelanggan</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>Kendaraan</div>
          <div className={styles.tableHeaderItem}>No Kendaraan</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div className={styles.loadingMessage}>
              Loading Surat Jalan data...
            </div>
          ) : filteredData.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyStateContent}>
                <h3 className={styles.emptyStateTitle}>
                  Tidak ada data Surat Jalan yang tersedia.
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  Klik tombol "Tambah" untuk menambahkan Surat Jalan baru.
                </p>
              </div>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={item.id}
                role="presentation"
                className={styles.tableRow}
                onClick={() => handleItemClick(item)}
              >
                <CustomDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(item);
                  }}
                />
                <div className={styles.tableRowItem}>{index + 1}</div>
                <div className={styles.tableRowItem}>
                  {item.request_date ||
                    new Date(item.transaction_date).toLocaleDateString()}
                </div>
                <div className={styles.tableRowItem}>
                  {item.document_number || item.id}
                </div>
                <div className={styles.tableRowItem}>
                  {item.customer_name || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.warehouse_name || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.vehicle_type || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.vehicle_number || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.user_username || "-"}
                </div>

                <div className={styles.tableRowItem}>{item.notes || "-"}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus Surat Jalan ini?"
        open={!!modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete(modalOpen)}
      />
    </div>
  );
};

export default SuratJalan;
