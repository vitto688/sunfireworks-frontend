import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import actions
import {
  fetchStockAdjustmentsRequest,
  deleteStockAdjustmentRequest,
  resetStockAdjustmentMessages,
} from "../../../redux/actions/stockAdjustmentActions";
import { fetchWarehousesRequest } from "../../../redux/actions/masterActions";

// import components
import SearchBar from "../../../components/SearchBar";
import CustomButton from "../../../components/CustomButton";
import FilterDropdown from "../../../components/FilterDropdown";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../components/CustomDeleteButton";
import EditButton from "../../../components/EditButton";
import Loading from "../../../components/Loading";

// Define the path for the Stock Adjustment page
export const STOCK_ADJUSTMENT_PATH = "/stok-opname";

const StokOpname = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [stockAdjustments, setStockAdjustments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);

  // Filter states
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState({
    id: 0,
  });

  const { warehouses } = useSelector((state) => state.master);
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.stockAdjustment
  );
  //#endregion

  //#region Helper Functions
  const fetchStockAdjustmentData = useCallback(
    (page = 1) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter.id !== 0 && {
          warehouse: selectedWarehouseFilter.id,
        }),
      };

      dispatch(fetchStockAdjustmentsRequest(params));
    },
    [dispatch, query, selectedWarehouseFilter]
  );

  const buildFilterOptions = (items, labelKey, valueKey, allLabel) => {
    return [
      { label: allLabel, value: 0 },
      ...items.map((item) => ({
        label: item[labelKey],
        value: item[valueKey],
      })),
    ];
  };

  const handlePageChange = (newPage) => {
    fetchStockAdjustmentData(newPage);
  };

  const handleWarehouseFilterChange = (selectedOption) => {
    setSelectedWarehouseFilter({ id: selectedOption.value });
  };

  const handleDeleteClick = (item) => {
    setSelectedItemToDelete(item);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemToDelete) {
      dispatch(deleteStockAdjustmentRequest(selectedItemToDelete.id));
      setModalOpen(false);
      setSelectedItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setSelectedItemToDelete(null);
  };

  const handleAddClick = () => {
    navigate("/stok-opname/tambah");
  };

  const handleEditClick = (item) => {
    navigate("/stok-opname/ubah", { state: item });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID");
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages and fetch initial data
    dispatch(resetStockAdjustmentMessages());
    dispatch(fetchWarehousesRequest());
    fetchStockAdjustmentData();
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetStockAdjustmentMessages());
      fetchStockAdjustmentData(); // Refresh data after success
    }

    if (errorMessage) {
      alert(`Error: ${errorMessage}`);
      dispatch(resetStockAdjustmentMessages());
    }
  }, [message, errorMessage, dispatch, fetchStockAdjustmentData]);

  // Apply search and filter
  useEffect(() => {
    let filtered = data;

    // Apply warehouse filter
    if (selectedWarehouseFilter.id !== 0) {
      filtered = filtered.filter(
        (item) => item.warehouse === selectedWarehouseFilter.id
      );
    }

    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.reason?.toLowerCase().includes(query.toLowerCase()) ||
          item.warehouse_name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setStockAdjustments(filtered);
  }, [data, query, selectedWarehouseFilter]);

  // Build filter options when warehouses data changes
  useEffect(() => {
    if (warehouses.length > 0) {
      const options = buildFilterOptions(
        warehouses,
        "name",
        "id",
        "Semua Gudang"
      );
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);

  // Refetch when filters change
  useEffect(() => {
    fetchStockAdjustmentData();
  }, [query, selectedWarehouseFilter]); // eslint-disable-line react-hooks/exhaustive-deps
  //#endregion

  return (
    <div className={styles.stockAdjustmentSection}>
      <div className={styles.actionsSection}>
        <CustomButton label="+ Tambah Stok Opname" onClick={handleAddClick} />
      </div>

      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari stok opname..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.filterSection}>
          <FilterDropdown
            options={warehouseFilterOptions}
            placeholder="Filter Gudang"
            onChange={handleWarehouseFilterChange}
          />
        </div>
      </div>

      <div className={styles.stockAdjustmentTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Alasan</div>
          <div className={styles.tableHeaderItem}>Jumlah Item</div>
          <div className={styles.tableHeaderItem}>Aksi</div>
        </div>

        <div className={styles.tableBody}>
          {loading.fetch ? (
            <Loading message="Memuat data stok opname..." />
          ) : stockAdjustments.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data stok opname yang ditemukan</p>
            </div>
          ) : (
            stockAdjustments.map((item, index) => (
              <div key={item.id} className={styles.tableRow}>
                <div className={styles.tableRowItem}>
                  {(pagination.currentPage - 1) * pagination.itemsPerPage +
                    index +
                    1}
                </div>
                <div className={styles.tableRowItem}>
                  {formatDate(item.transaction_date)}
                </div>
                <div className={styles.tableRowItem}>
                  {item.warehouse_name || "-"}
                </div>
                <div className={styles.tableRowItem}>{item.reason || "-"}</div>
                <div className={styles.tableRowItem}>
                  {item.items?.length || 0} item
                </div>
                <div className={styles.tableRowItem}>
                  <div className={styles.actionButtons}>
                    <EditButton onClick={() => handleEditClick(item)} />
                    <CustomDeleteButton
                      onClick={() => handleDeleteClick(item)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {pagination.totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles.pageButton} ${
                    pageNumber === pagination.currentPage ? styles.active : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={modalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus stok opname ini?`}
      />
    </div>
  );
};

export default StokOpname;
