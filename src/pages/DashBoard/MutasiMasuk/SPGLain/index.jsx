/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import { TAMBAH_SPG_LAIN_PATH } from "./TambahSPGLain";
import { UBAH_SPG_LAIN_PATH } from "./UbahSPGLain";

// Import SPG Redux Actions
import {
  fetchSPGRequest,
  deleteSPGRequest,
  resetSPGMessages,
} from "../../../../redux/actions/spgActions";

export const SPG_LAIN_PATH = "/mutasi-masuk/spg-lain";

const SPGLain = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux state untuk SPG Lain
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.spg.lain
  );
  const { warehouses } = useSelector((state) => state.master);

  //#region Helper Functions
  const fetchSPGData = useCallback(
    (page = 1) => {
      const params = {
        page,
        ...(query && { document_number: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchSPGRequest("lain", params));
    },
    [dispatch, query, selectedWarehouseFilter, startDate, endDate]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchSPGData(newPage);
    }
  };
  //#endregion

  // Fetch SPG Lain data saat component mount
  useEffect(() => {
    fetchSPGData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset messages setelah 3 detik
  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(resetSPGMessages("lain"));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, errorMessage, dispatch]);

  useEffect(() => {
    // Set initial filtered data from Redux
    setFilteredData(data || []);
  }, [data]);

  // Debounce search query specifically
  useEffect(() => {
    if (query) {
      setIsSearching(true);
    }

    const delayedSearch = setTimeout(() => {
      if (query || selectedWarehouseFilter !== 0 || startDate || endDate) {
        fetchSPGData(1); // Reset to page 1 when search query changes
      }
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
    if (selectedWarehouseFilter !== 0 || startDate || endDate) {
      fetchSPGData(1); // Reset to page 1 when filters change
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouseFilter, startDate, endDate]);

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
  //#endregion

  //#region Handlers
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  const handleAddClick = () => {
    navigate(TAMBAH_SPG_LAIN_PATH);
  };

  const handleDelete = () => {
    if (selectedItemToDelete) {
      dispatch(deleteSPGRequest("lain", selectedItemToDelete.id));
      setModalOpen(false);
      setSelectedItemToDelete(null);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItemToDelete(item);
    setModalOpen(true);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_SPG_LAIN_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.spgLainSection}>
      {/* Loading indicator */}
      {loading && (
        <div className={styles.loadingIndicator}>
          <p>Loading SPG Lain data...</p>
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
              isSearching ? "Mencari..." : "Cari berdasarkan No SPG..."
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
          <DatePicker label="Dari " value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai " value={endDate} onChange={setEndDate} />
          <FilterDropdown
            options={warehouseFilterOptions}
            placeholder="Filter Gudang"
            onChange={(val) => setSelectedWarehouseFilter(val.value)}
          />
        </div>
      </div>
      <div className={styles.returPenjualanTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No SPG</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
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
                  {item.document_number}
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
            <div className={styles.noDataMessage}>
              <p>Tidak ada data SPG Lain yang ditemukan.</p>
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
        label={`Apakah anda yakin untuk menghapus SPG Lain "${
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

export default SPGLain;
