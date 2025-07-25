/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
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

  //#region Helper Functions
  const fetchSuratJalanData = useCallback(
    (page = 1) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedCustomerFilter !== 0 && {
          customer: selectedCustomerFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchSuratJalanRequest(params));
    },
    [
      dispatch,
      query,
      selectedWarehouseFilter,
      selectedCustomerFilter,
      startDate,
      endDate,
    ]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchSuratJalanData(newPage);
    }
  };
  //#endregion

  useEffect(() => {
    // Fetch Surat Jalan data on component mount
    fetchSuratJalanData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // Set initial filtered data from Redux
    setFilteredData(data || []);
  }, [data]);

  // Filter data when filters change
  useEffect(() => {
    // Skip if all filters are empty/default (to prevent initial double call)
    if (
      !query &&
      !startDate &&
      !endDate &&
      selectedWarehouseFilter === 0 &&
      selectedCustomerFilter === 0
    ) {
      return;
    }

    const delayedSearch = setTimeout(() => {
      fetchSuratJalanData(1); // Reset to page 1 when filters change
    }, 500); // Debounce search

    return () => clearTimeout(delayedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query,
    selectedWarehouseFilter,
    selectedCustomerFilter,
    startDate,
    endDate,
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
          ) : data.length === 0 ? (
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
            data.map((item, index) => (
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
                <div className={styles.tableRowItem}>
                  {((pagination?.current_page || 1) - 1) * 10 + index + 1}
                </div>
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

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange((pagination.current_page || 1) - 1)}
            disabled={(pagination.current_page || 1) === 1 || loading}
          >
            Previous
          </button>
          <span className={styles.paginationInfo}>
            Page {pagination.current_page || 1} of {pagination.total_pages || 1}{" "}
            ({pagination.count || 0} items)
          </span>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange((pagination.current_page || 1) + 1)}
            disabled={
              (pagination.current_page || 1) ===
                (pagination.total_pages || 1) || loading
            }
          >
            Next
          </button>
        </div>
      )}

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
