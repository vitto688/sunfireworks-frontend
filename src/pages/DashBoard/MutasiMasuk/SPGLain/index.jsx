/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux state untuk SPG Lain
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.spg.lain
  );
  const { warehouses } = useSelector((state) => state.master);

  // Fetch SPG Lain data saat component mount
  useEffect(() => {
    dispatch(fetchSPGRequest("lain"));
  }, [dispatch]);

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

  useEffect(() => {
    if (!query && !startDate && !endDate && selectedWarehouseFilter === 0) {
      // Set initial filtered data from Redux
      setFilteredData(data || []);
    } else {
      // Filter data based on query, date range, and selected filter
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
            item.warehouse_name === selectedWarehouseFilter)
        );
      });
      setFilteredData(filtered);
    }
  }, [data, query, startDate, endDate, selectedWarehouseFilter]);

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
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
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
                <div className={styles.tableRowItem}>{index + 1}</div>
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

      {/* Pagination Info */}
      {pagination && pagination.count > 0 && (
        <div className={styles.paginationInfo}>
          <p>
            Menampilkan {filteredData.length} dari {pagination.count} data SPG
            Lain
            {pagination.total_pages > 1 && (
              <span>
                {" "}
                - Halaman {pagination.current_page} dari{" "}
                {pagination.total_pages}
              </span>
            )}
          </p>
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
