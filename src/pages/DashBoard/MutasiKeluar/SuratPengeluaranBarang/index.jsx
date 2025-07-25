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
import { UBAH_SPB_PATH } from "./UbahSPB";
import { TAMBAH_SPB_PATH } from "./TambahSPB";

// Import Redux actions
import {
  fetchSuratPengeluaranBarangRequest,
  deleteSuratPengeluaranBarangRequest,
  resetSuratPengeluaranBarangMessages,
} from "../../../../redux/actions/suratPengeluaranBarangActions";

// Define the path for the Surat Pengeluaran Barang page
export const SURAT_PENGELUARAN_BARANG_PATH =
  "/mutasi-keluar/surat-pengeluaran-barang";

const SuratPengeluaranBarang = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses } = useSelector((state) => state.master);
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.suratPengeluaranBarang
  );

  //#region Helper Functions
  const fetchSuratPengeluaranBarangData = useCallback(
    (page = 1) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchSuratPengeluaranBarangRequest(params));
    },
    [dispatch, query, selectedWarehouseFilter, startDate, endDate]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchSuratPengeluaranBarangData(newPage);
    }
  };
  //#endregion

  useEffect(() => {
    // Fetch Surat Pengeluaran Barang data on component mount
    fetchSuratPengeluaranBarangData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetSuratPengeluaranBarangMessages());
    }
    if (errorMessage) {
      alert(errorMessage);
      dispatch(resetSuratPengeluaranBarangMessages());
    }
  }, [message, errorMessage, dispatch]);

  useEffect(() => {
    // Set initial filtered data from Redux
    setFilteredData(data || []);
  }, [data]);

  // Filter data when filters change
  useEffect(() => {
    // Skip if all filters are empty/default (to prevent initial double call)
    if (!query && !startDate && !endDate && selectedWarehouseFilter === 0) {
      return;
    }

    const delayedSearch = setTimeout(() => {
      fetchSuratPengeluaranBarangData(1); // Reset to page 1 when filters change
    }, 500); // Debounce search

    return () => clearTimeout(delayedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedWarehouseFilter, startDate, endDate]);

  useEffect(() => {
    if (warehouses.length > 0) {
      const options = [
        { label: "Semua Gudang", value: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.name,
        })),
      ];
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);

  //#endregion

  //#region Handlers
  const handleTambahClick = () => {
    navigate(TAMBAH_SPB_PATH);
  };

  const handleDelete = (item) => {
    if (item && item.id) {
      dispatch(deleteSuratPengeluaranBarangRequest(item.id));
    }
    setModalOpen(false);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_SPB_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.suratPengeluaranBarangSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label={loading ? "Loading..." : "+ Tambah"}
          onClick={handleTambahClick}
          disabled={loading}
        />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari no SPB..."
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
        </div>
      </div>
      <div className={styles.returPenjualanTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No SPB</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>Input Oleh</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div className={styles.loadingMessage}>Loading SPB data...</div>
          ) : filteredData.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyStateContent}>
                <h3 className={styles.emptyStateTitle}>
                  Tidak ada data surat pengeluaran barang yang tersedia.
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  Klik tombol "Tambah" untuk menambahkan SPB baru.
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
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </div>
                <div className={styles.tableRowItem}>
                  {item.document_number || item.no_faktur || item.id}
                </div>
                <div className={styles.tableRowItem}>
                  {item.warehouse_name || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.user_username || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.sj_number || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.description || item.notes || "-"}
                </div>
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
        label="Apakah anda yakin untuk menghapus surat pengeluaran barang ini?"
        open={!!modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete(modalOpen)}
      />
    </div>
  );
};

export default SuratPengeluaranBarang;
