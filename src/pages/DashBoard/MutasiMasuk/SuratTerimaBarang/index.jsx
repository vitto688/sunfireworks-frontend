/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  fetchSTBRequest,
  deleteSTBRequest,
  resetSTBMessages,
} from "../../../../redux/actions/stbActions";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import { TAMBAH_SURAT_TERIMA_BARANG_PATH } from "./TambahSuratTerimaBarang";
import { UBAH_SURAT_TERIMA_BARANG_PATH } from "./UbahSuratTerimaBarang";

export const SURAT_TERIMA_BARANG_PATH = "/mutasi-masuk/stb";

const SuratTerimaBarang = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses } = useSelector((state) => state.master);
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.stb
  );

  //#region Helper Functions
  const fetchSTBData = useCallback(
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

      dispatch(fetchSTBRequest(params));
    },
    [dispatch, query, selectedWarehouseFilter, startDate, endDate]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchSTBData(newPage);
    }
  };
  //#endregion

  // Fetch STB data on component mount
  useEffect(() => {
    fetchSTBData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetSTBMessages());
    }
    if (errorMessage) {
      alert(errorMessage);
      dispatch(resetSTBMessages());
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
        fetchSTBData(1); // Reset to page 1 when search query changes
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
      fetchSTBData(1); // Reset to page 1 when filters change
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
    navigate(TAMBAH_SURAT_TERIMA_BARANG_PATH);
  };

  const handleDelete = (item) => {
    if (item && item.id) {
      dispatch(deleteSTBRequest(item.id));
    }
    setModalOpen(false);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_SURAT_TERIMA_BARANG_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.mainSection}>
      <div className={styles.actionsSection}>
        <CustomButton
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
              isSearching ? "Mencari..." : "Cari berdasarkan No STB..."
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
      <div className={styles.mainTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No STB</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {loading || isSearching ? (
            <div className={styles.loadingMessage}>
              {isSearching ? "Mencari data..." : "Loading STB data..."}
            </div>
          ) : data.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyStateContent}>
                <h3 className={styles.emptyStateTitle}>
                  {query
                    ? `Tidak ada data STB dengan No STB "${query}".`
                    : "Tidak ada data STB yang tersedia."}
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  {query
                    ? "Coba cari dengan No STB yang berbeda."
                    : 'Klik tombol "Tambah" untuk menambahkan STB baru.'}
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
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange((pagination.current_page || 1) - 1)}
            disabled={
              (pagination.current_page || 1) === 1 || loading || isSearching
            }
          >
            Previous
          </button>
          <span className={styles.paginationInfo}>
            Page {pagination.current_page || 1} of {pagination.total_pages || 1}{" "}
            ({pagination.count || 0} items)
            {query && ` - Filtering by: "${query}"`}
          </span>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange((pagination.current_page || 1) + 1)}
            disabled={
              (pagination.current_page || 1) ===
                (pagination.total_pages || 1) ||
              loading ||
              isSearching
            }
          >
            Next
          </button>
        </div>
      )}

      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus STB ini?"
        open={!!modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete(modalOpen)}
      />
    </div>
  );
};

export default SuratTerimaBarang;
