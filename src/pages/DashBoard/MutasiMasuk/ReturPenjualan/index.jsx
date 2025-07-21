/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Redux actions
import {
  fetchReturPenjualanRequest,
  deleteReturPenjualanRequest,
  resetReturPenjualanMessages,
} from "../../../../redux/actions/returPenjualanActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../components/CustomButton";
import SearchBar from "../../../../components/SearchBar";
import FilterDropdown from "../../../../components/FilterDropdown";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import DatePicker from "../../../../components/DatePicker";
import { TAMBAH_RETUR_PENJUALAN_PATH } from "./TambahReturPenjualan";
import { UBAH_RETUR_PENJUALAN_PATH } from "./UbahReturPenjualan";

export const RETUR_PENJUALAN_PATH = "/mutasi-masuk/retur-penjualan";

const ReturPenjualan = () => {
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
  const { data, loading, message, errorMessage } = useSelector(
    (state) => state.returPenjualan
  );

  useEffect(() => {
    // Fetch Retur Penjualan data on component mount
    dispatch(fetchReturPenjualanRequest());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetReturPenjualanMessages());
    }

    if (errorMessage) {
      alert(errorMessage);
      dispatch(resetReturPenjualanMessages());
    }
  }, [message, errorMessage, dispatch]);

  useEffect(() => {
    // Set initial filtered data from Redux
    setFilteredData(data || []);
  }, [data]);

  // Combined filter effect
  useEffect(() => {
    let filtered = data || [];

    // Apply search filter
    if (query) {
      filtered = filtered.filter((item) =>
        (item.document_number || item.no_faktur || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    // Apply date filter
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.transaction_date || item.created_at);
        const startDateOnly = new Date(startDate);
        const endDateOnly = new Date(endDate);
        return itemDate >= startDateOnly && itemDate <= endDateOnly;
      });
    }

    // Apply warehouse filter
    if (selectedWarehouseFilter !== 0) {
      filtered = filtered.filter(
        (item) => item.warehouse_name === selectedWarehouseFilter
      );
    }

    setFilteredData(filtered);
  }, [query, data, startDate, endDate, selectedWarehouseFilter]);

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
    navigate(TAMBAH_RETUR_PENJUALAN_PATH);
  };

  const handleDelete = (item) => {
    if (item && item.id) {
      dispatch(deleteReturPenjualanRequest(item.id));
    }
    setModalOpen(false);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_RETUR_PENJUALAN_PATH, { state: value });
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
          placeholder="Cari Retur Pembelian..."
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
      <div className={styles.mainTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>No Faktur</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div className={styles.loadingMessage}>
              Loading Retur Pembelian data...
            </div>
          ) : filteredData.length === 0 ? (
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
          ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
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
                <div className={styles.tableRowItem}>{index + 1}</div>
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
                  Tidak ada data Retur Penjualan yang tersedia.
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  Klik tombol "Tambah" untuk menambahkan Retur Penjualan baru.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus Retur Pembelian ini?"
        open={!!modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete(modalOpen)}
      />
    </div>
  );
};

export default ReturPenjualan;
