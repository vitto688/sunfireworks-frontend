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
import { UBAH_TRANSFER_STOK_PATH } from "./UbahTransferStok";
import { TAMBAH_TRANSFER_STOK_PATH } from "./TambahTransferStok";

// Import Redux actions
import {
  fetchStokTransferRequest,
  deleteStokTransferRequest,
  resetStokTransferMessages,
} from "../../../../redux/actions/stokTransferActions";

// Import utility functions
import { formatDate } from "../../../../utils/dateUtils";

// Define the path for the Transfer Stok page
export const TRANSFER_STOK_PATH = "/mutasi-gudang/transfer-stok";

const TransferStok = () => {
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
    (state) => state.stokTransfer
  );

  useEffect(() => {
    // Fetch StokTransfer data on component mount
    dispatch(fetchStokTransferRequest());
  }, [dispatch]);

  // Initialize filteredData when data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(resetStokTransferMessages());
    }
    if (errorMessage) {
      alert(errorMessage);
      dispatch(resetStokTransferMessages());
    }
  }, [message, errorMessage, dispatch]);

  useEffect(() => {
    const filteredByQuery = data.filter((item) =>
      (item.transfer_number || item.no_faktur || "")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    // Update local filtered data for search
    setFilteredData(filteredByQuery);
  }, [query, data]);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.tanggal_transaksi);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data || []);
    }
  }, [startDate, endDate, data]);

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

  useEffect(() => {
    if (selectedWarehouseFilter === 0) {
      setFilteredData(data || []);
    } else {
      const filtered = data.filter(
        (item) =>
          item.source_warehouse_name === selectedWarehouseFilter ||
          item.destination_warehouse_name === selectedWarehouseFilter
      );
      setFilteredData(filtered);
    }
  }, [selectedWarehouseFilter, data]);
  //#endregion

  //#region Handlers

  const handleAddClick = () => {
    navigate(TAMBAH_TRANSFER_STOK_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_TRANSFER_STOK_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.transferStokSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          // variant="outline"
          label="+ Tambah"
          onClick={handleAddClick}
        />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari Transfer Stok Barang..."
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
          <div className={styles.tableHeaderItem}>No Bukti</div>
          <div className={styles.tableHeaderItem}>Gudang Asal</div>
          <div className={styles.tableHeaderItem}>Gudang Tujuan</div>
          <div className={styles.tableHeaderItem}>Di Input Oleh</div>
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div className={styles.emptyState}>
              <p>Memuat data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data transfer stok yang tersedia.</p>
              <p>Klik tombol "Tambah" untuk menambahkan transfer stok baru.</p>
            </div>
          ) : (
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
                    setModalOpen(item);
                  }}
                />
                <div className={styles.tableRowItem}>{index + 1}</div>
                <div className={styles.tableRowItem}>
                  {formatDate(item.created_at || item.tanggal_transaksi)}
                </div>
                <div className={styles.tableRowItem}>
                  {item.document_number || item.no_faktur}
                </div>
                <div className={styles.tableRowItem}>
                  {item.source_warehouse_name || item.gudang_asal}
                </div>
                <div className={styles.tableRowItem}>
                  {item.destination_warehouse_name || item.gudang_tujuan}
                </div>
                <div className={styles.tableRowItem}>
                  {item.user_username || item.diinput_oleh}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus item ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default TransferStok;
