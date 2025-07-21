/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses } = useSelector((state) => state.master);
  const { data, loading, message, errorMessage, pagination } = useSelector(
    (state) => state.stb
  );

  useEffect(() => {
    // Fetch STB data on component mount
    dispatch(fetchSTBRequest());
  }, [dispatch]);

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
        <SearchBar
          type="text"
          placeholder="Cari STB..."
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
          <div className={styles.tableHeaderItem}>No STB</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>No SJ</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div className={styles.loadingMessage}>Loading STB data...</div>
          ) : filteredData.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyStateContent}>
                <h3 className={styles.emptyStateTitle}>
                  Tidak ada data STB yang tersedia.
                </h3>
                <p className={styles.emptyStateSubtitle}>
                  Klik tombol "Tambah" untuk menambahkan STB baru.
                </p>
              </div>
            </div>
          ) : (
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

      {/* Pagination Info */}
      {filteredData.length > 0 && (
        <div className={styles.paginationInfo}>
          <p>
            Menampilkan {filteredData.length} dari {pagination?.count || 0} data
            STB
            {(pagination?.total_pages || 0) > 1 && (
              <span>
                {" "}
                - Halaman {pagination?.current_page || 1} dari{" "}
                {pagination?.total_pages || 1}
              </span>
            )}
          </p>
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
