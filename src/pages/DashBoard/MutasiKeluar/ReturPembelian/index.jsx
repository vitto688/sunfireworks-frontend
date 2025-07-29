/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Redux actions
import {
  fetchReturPembelianRequest,
  deleteReturPembelianRequest,
  resetReturPembelianMessages,
} from "../../../../redux/actions/returPembelianActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../components/CustomButton";
import SearchBar from "../../../../components/SearchBar";
import FilterDropdown from "../../../../components/FilterDropdown";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import EditButton from "../../../../components/EditButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import DatePicker from "../../../../components/DatePicker";
import { TAMBAH_RETUR_PEMBELIAN_PATH } from "./TambahReturPembelian";
import { UBAH_RETUR_PEMBELIAN_PATH } from "./EditReturPembelian";

// Define the main path for Retur Pembelian
export const RETUR_PEMBELIAN_PATH = "/mutasi-keluar/retur-pembelian";

const ReturPembelian = () => {
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
  const [isSearching, setIsSearching] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses } = useSelector((state) => state.master);
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.returPembelian
  );

  //#region Helper Functions
  const fetchReturPembelianData = useCallback(
    (page = 1) => {
      const params = {
        page,
        ...(query && { document_number: query }),
        ...(selectedWarehouseFilter.id !== 0 && {
          warehouse: selectedWarehouseFilter.id,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchReturPembelianRequest(params));
    },
    [dispatch, query, selectedWarehouseFilter, startDate, endDate]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchReturPembelianData(newPage);
    }
  };
  //#endregion

  useEffect(() => {
    // Fetch Retur Pembelian data on component mount
    fetchReturPembelianData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetReturPembelianMessages());
    }
    if (errorMessage) {
      alert(errorMessage);
      dispatch(resetReturPembelianMessages());
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
      fetchReturPembelianData(1);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(delayedSearch);
      setIsSearching(false);
    };
  }, [query, fetchReturPembelianData]);

  // Filter changes effect (immediate)
  useEffect(() => {
    fetchReturPembelianData(1);
  }, [selectedWarehouseFilter, startDate, endDate, fetchReturPembelianData]);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedWarehouseFilter({ id: 0 });
    setStartDate("");
    setEndDate("");
  };

  const handleAddClick = () => {
    navigate(TAMBAH_RETUR_PEMBELIAN_PATH);
  };

  const handleDelete = () => {
    if (selectedItemToDelete) {
      dispatch(deleteReturPembelianRequest(selectedItemToDelete.id));
      setModalOpen(false);
      setSelectedItemToDelete(null);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItemToDelete(item);
    setModalOpen(true);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_RETUR_PEMBELIAN_PATH, { state: value });
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
              isSearching ? "Mencari..." : "Cari berdasarkan No Faktur..."
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
          {(query ||
            selectedWarehouseFilter.id !== 0 ||
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
      <div className={styles.mainTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No Faktur</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div className={styles.loadingMessage}>
              Loading Retur Pembelian data...
            </div>
          ) : data.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyStateContent}>
                <h3 className={styles.emptyStateTitle}>
                  Tidak ada data Retur Pembelian yang tersedia.
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  Klik tombol "Tambah" untuk menambahkan Retur Pembelian baru.
                </p>
              </div>
            </div>
          ) : Array.isArray(data) && data.length > 0 ? (
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
                  {new Date(item.transaction_date).toLocaleDateString()}
                </div>
                <div className={styles.tableRowItem}>
                  {item.document_number || item.id}
                </div>
                <div className={styles.tableRowItem}>
                  {item.warehouse_name || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.sj_number || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.user_username || "-"}
                </div>
                <div className={styles.tableRowItem}>{item.notes || "-"}</div>
              </div>
            ))
          ) : (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyStateContent}>
                <h3 className={styles.emptyStateTitle}>
                  Tidak ada data Retur Pembelian yang tersedia.
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  Klik tombol "Tambah" untuk menambahkan Retur Pembelian baru.
                </p>
              </div>
            </div>
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
        label={`Apakah anda yakin untuk menghapus Retur Pembelian "${
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

export default ReturPembelian;
