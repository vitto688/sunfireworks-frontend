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
import { TAMBAH_SPGIMPORT_PATH } from "./TambahSPGImport";
import { UBAH_SPGIMPORT_PATH } from "./UbahSPGImport";

// Import SPG Redux Actions
import {
  fetchSPGRequest,
  deleteSPGRequest,
  resetSPGMessages,
} from "../../../../redux/actions/spgActions";

export const SPG_IMPORT_PATH = "/mutasi-masuk/spg-import";

const SPGImport = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux state untuk SPG Import
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.spg.import
  );
  const { warehouses } = useSelector((state) => state.master);

  //#region Helper Functions
  const fetchSPGData = useCallback(
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

      dispatch(fetchSPGRequest("import", params));
    },
    [dispatch, query, selectedWarehouseFilter, startDate, endDate]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
      fetchSPGData(newPage);
    }
  };
  //#endregion

  // Fetch SPG Import data saat component mount
  useEffect(() => {
    fetchSPGData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset messages setelah 3 detik
  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(resetSPGMessages("import"));
      }, 3000);
      return () => clearTimeout(timer);
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
      fetchSPGData(1); // Reset to page 1 when filters change
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
          value: warehouse.name, // Assuming warehouse.name is unique
        })),
      ];
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);
  //#endregion

  //#region Handlers
  const handleAddClick = () => {
    navigate(TAMBAH_SPGIMPORT_PATH);
  };

  const handleDelete = () => {
    if (selectedItemToDelete) {
      dispatch(deleteSPGRequest("import", selectedItemToDelete.id));
      setModalOpen(false);
      setSelectedItemToDelete(null);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItemToDelete(item);
    setModalOpen(true);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_SPGIMPORT_PATH, { state: value });
  };
  //#endregion
  return (
    <div className={styles.spgImportSection}>
      {/* Loading indicator */}
      {loading && (
        <div className={styles.loadingIndicator}>
          <p>Loading SPG Import data...</p>
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
        <SearchBar
          type="text"
          placeholder="Cari SPG..."
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
          <div className={styles.tableHeaderItem}>No SPG</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>No Kontainer</div>
          <div className={styles.tableHeaderItem}>No Polisi</div>
          <div className={styles.tableHeaderItem}>Mulai Bongkar</div>
          <div className={styles.tableHeaderItem}>Selesai Muat</div>
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
                <div className={styles.tableRowItem}>{item.warehouse_name}</div>
                <div className={styles.tableRowItem}>{item.user_username}</div>
                <div className={styles.tableRowItem}>
                  {item.container_number || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.vehicle_number || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.start_unload || "-"}
                </div>
                <div className={styles.tableRowItem}>
                  {item.finish_load || "-"}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noDataMessage}>
              <p>Tidak ada data SPG Import yang ditemukan.</p>
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
        label={`Apakah anda yakin untuk menghapus SPG Import "${
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

export default SPGImport;
