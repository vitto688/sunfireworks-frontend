/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../components/SearchBar";
import CustomButton from "../../../components/CustomButton";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../components/CustomDeleteButton";
import FilterDropdown from "../../../components/FilterDropdown";
import DatePicker from "../../../components/DatePicker";
import { TAMBAH_STOCK_ADJUSTMENT_PATH } from "./TambahStokOpname";
import { UBAH_STOCK_ADJUSTMENT_PATH } from "./UbahStokOpname";

// Import Stock Adjustment Redux Actions
import {
  fetchStockAdjustmentsRequest,
  deleteStockAdjustmentRequest,
  resetStockAdjustmentMessages,
} from "../../../redux/actions/stockAdjustmentActions";

export const STOCK_ADJUSTMENT_PATH = "/stok-opname";

const StokOpname = () => {
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

  // Redux state untuk Stock Adjustment
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.stockAdjustment
  );
  const { warehouses } = useSelector((state) => state.master);

  // Extract actual loading state
  const isLoading = loading?.fetch || false;
  //#endregion

  //#region Helper Functions
  const fetchStockAdjustmentData = useCallback(
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

      dispatch(fetchStockAdjustmentsRequest(params));
    },
    [dispatch, query, selectedWarehouseFilter, startDate, endDate]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchStockAdjustmentData(newPage);
    }
  };
  //#endregion

  // Fetch Stock Adjustment data saat component mount
  useEffect(() => {
    fetchStockAdjustmentData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set initial filtered data from Redux
    setFilteredData(data || []);
  }, [data]);

  // Debounce search query specifically
  useEffect(() => {
    if (!query && selectedWarehouseFilter.id === 0 && !startDate && !endDate) {
      // Skip if no filters are applied and it's initial load
      return;
    }

    if (query) {
      setIsSearching(true);
    }

    const delayedSearch = setTimeout(() => {
      fetchStockAdjustmentData(1); // Reset to page 1 when search query changes
      setIsSearching(false);
    }, 300); // Shorter debounce for better UX

    return () => {
      clearTimeout(delayedSearch);
      if (query) {
        setIsSearching(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Handle filter changes (warehouse, dates) with immediate effect
  useEffect(() => {
    // Skip initial empty values to prevent multiple calls on mount
    if (selectedWarehouseFilter.id === 0 && !startDate && !endDate) {
      return;
    }
    fetchStockAdjustmentData(1); // Reset to page 1 when filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouseFilter, startDate, endDate]);

  useEffect(() => {
    if (warehouses.length > 0) {
      const options = [
        { label: "Semua Gudang", value: 0, id: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.id,
          id: warehouse.id,
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
    navigate(TAMBAH_STOCK_ADJUSTMENT_PATH);
  };

  const handleDelete = () => {
    if (selectedItemToDelete) {
      dispatch(deleteStockAdjustmentRequest(selectedItemToDelete.id));
      setModalOpen(false);
      setSelectedItemToDelete(null);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItemToDelete(item);
    setModalOpen(true);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_STOCK_ADJUSTMENT_PATH, { state: value });
  };
  //#endregion

  //#region Effects

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetStockAdjustmentMessages());
    }

    if (errorMessage) {
      alert(`Error: ${errorMessage}`);
      dispatch(resetStockAdjustmentMessages());
    }
  }, [message, errorMessage, dispatch, fetchStockAdjustmentData]);
  //#endregion

  return (
    <div className={styles.stokOpnameSection}>
      {/* Loading indicator */}
      {isLoading && (
        <div className={styles.loadingIndicator}>
          <p>Loading Stok Opname data...</p>
        </div>
      )}

      {/* Success/Error Messages */}
      {message && (
        <div className={styles.successMessage}>
          <p>{message}</p>
        </div>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={styles.actionsSection}>
        <CustomButton label="+ Tambah" onClick={handleAddClick} />
      </div>
      <div className={styles.searchFilterSection}>
        <div style={{ position: "relative", flex: 1 }}>
          <SearchBar
            type="text"
            placeholder={
              isSearching ? "Mencari..." : "Cari berdasarkan No Dokumen..."
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
      <div className={styles.stokOpnameTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal</div>
          <div className={styles.tableHeaderItem}>No Dokumen</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Alasan</div>
          <div className={styles.tableHeaderItem}>Jumlah Item</div>
        </div>
        <div className={styles.tableBody}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={item.id || index}
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
                  {new Date(item.transaction_date).toLocaleDateString("id-ID")}
                </div>
                <div className={styles.tableRowItem}>
                  {item.document_number || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.warehouse_name || "-"}
                </div>
                <div className={styles.tableRowItem}>{item.reason || "-"}</div>
                <div className={styles.tableRowItem}>
                  {item.items?.length || 0} item
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noDataMessage}>
              <p>Tidak ada data Stok Opname yang ditemukan.</p>
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
            disabled={(pagination.current_page || 1) === 1 || isLoading}
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
                (pagination.total_pages || 1) || isLoading
            }
          >
            Next
          </button>
        </div>
      )}

      <ConfirmDeleteModal
        label={`Apakah anda yakin untuk menghapus Stok Opname "${
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

export default StokOpname;
