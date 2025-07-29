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
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState({
    id: 0,
  });
  const [customerFilterOptions, setCustomerFilterOptions] = useState([]);
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState({
    id: 0,
  });
  const [isSearching, setIsSearching] = useState(false);
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
        ...(query && { document_number: query }),
        ...(selectedWarehouseFilter.id !== 0 && {
          warehouse: selectedWarehouseFilter.id,
        }),
        ...(selectedCustomerFilter.id !== 0 && {
          customer: selectedCustomerFilter.id,
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

  // Debounced search effect
  useEffect(() => {
    if (!query) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delayedSearch = setTimeout(() => {
      fetchSuratJalanData(1);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(delayedSearch);
      setIsSearching(false);
    };
  }, [query, fetchSuratJalanData]);

  // Filter changes effect (immediate)
  useEffect(() => {
    fetchSuratJalanData(1);
  }, [
    selectedWarehouseFilter,
    selectedCustomerFilter,
    startDate,
    endDate,
    fetchSuratJalanData,
  ]);

  useEffect(() => {
    if (warehouses.length > 0) {
      const options = [
        { label: "Semua Gudang", value: 0, id: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.id,
          id: warehouse.id, // Menambahkan property id
        })),
      ];
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);

  useEffect(() => {
    if (customers.length > 0) {
      const options = [
        { label: "Semua Pelanggan", value: 0, id: 0 },
        ...customers.map((customer) => ({
          label: customer.name,
          value: customer.id,
          id: customer.id, // Menambahkan property id
        })),
      ];
      setCustomerFilterOptions(options);
    }
  }, [customers]);

  //#endregion

  //#region Handlers
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  const handleWarehouseFilterChange = (selectedOption) => {
    setSelectedWarehouseFilter(selectedOption);
  };

  const handleCustomerFilterChange = (selectedOption) => {
    setSelectedCustomerFilter(selectedOption);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedWarehouseFilter({ id: 0 });
    setSelectedCustomerFilter({ id: 0 });
    setStartDate("");
    setEndDate("");
  };

  const handleAddClick = () => {
    navigate(TAMBAH_SURAT_JALAN_PATH);
  };

  const handleDelete = () => {
    if (selectedItemToDelete) {
      dispatch(deleteSuratJalanRequest(selectedItemToDelete.id));
      setModalOpen(false);
      setSelectedItemToDelete(null);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItemToDelete(item);
    setModalOpen(true);
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
        <div style={{ position: "relative", flex: 1 }}>
          <SearchBar
            type="text"
            placeholder={
              isSearching ? "Mencari..." : "Cari berdasarkan No Surat Jalan..."
            }
            value={query}
            onChange={handleSearchChange}
          >
            {query && (
              <button
                onClick={handleClearSearch}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#666",
                }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </SearchBar>
        </div>
        <div className={styles.filterSection}>
          <DatePicker
            label="Dari "
            value={startDate}
            onChange={handleStartDateChange}
          />
          <DatePicker
            label="Sampai "
            value={endDate}
            onChange={handleEndDateChange}
          />
          <FilterDropdown
            options={warehouseFilterOptions}
            placeholder="Filter Gudang"
            onChange={handleWarehouseFilterChange}
          />
          <FilterDropdown
            options={customerFilterOptions}
            placeholder="Filter Pelanggan"
            onChange={handleCustomerFilterChange}
          />
          {(query ||
            selectedWarehouseFilter.id !== 0 ||
            selectedCustomerFilter.id !== 0 ||
            startDate ||
            endDate) && (
            <button
              onClick={handleClearFilters}
              style={{
                padding: "8px 12px",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#666",
              }}
              title="Clear all filters"
            >
              Clear Filters
            </button>
          )}
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
                    handleDeleteClick(item);
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
        label={`Apakah anda yakin untuk menghapus Surat Jalan "${
          selectedItemToDelete?.document_number || "ini"
        }"?`}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedItemToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default SuratJalan;
