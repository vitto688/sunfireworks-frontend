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

// Import dummy data
import { laporanMutasiMasuk } from "../../../../dummy_data/laporan";

// Define the path for the Retur Penjualan page
export const LAPORAN_RETUR_PENJUALAN_PATH = "/laporan/retur-penjualan";

const LaporanReturPenjualan = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  // warehouse filters
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  // category filters
  const [categoryFilterOptions, setCategoryFilterOptions] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(0);
  // supplier filters
  const [supplierFilterOptions, setSupplierFilterOptions] = useState([]);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses, categories, suppliers } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    // Fetch data or perform any necessary actions on component mount
  }, []);

  useEffect(() => {
    const filteredTransaksi = filteredData.filter(
      (item) =>
        item.nama_produk.toLowerCase().includes(query.toLowerCase()) ||
        item.kode_supplier.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredTransaksi);
  }, [query, filteredData]);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = filteredData.filter((item) => {
        const itemDate = new Date(item.tanggal_transaksi);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
      setData(filtered);
    }
  }, [startDate, endDate, filteredData]);

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
    if (categories.length > 0) {
      const options = [
        { label: "Semua Kategori", value: 0 },
        ...categories.map((category) => ({
          label: category.name,
          value: category.name, // Assuming category.name is unique
        })),
      ];

      setCategoryFilterOptions(options);
    }
  }, [categories]);

  useEffect(() => {
    if (suppliers.length > 0) {
      const options = [
        { label: "Semua Supplier", value: 0 },
        ...suppliers.map((supplier) => ({
          label: supplier.name,
          value: supplier.name, // Assuming supplier.name is unique
        })),
      ];
      setSupplierFilterOptions(options);
    }
  }, [suppliers]);

  useEffect(() => {
    if (
      selectedWarehouseFilter === 0 &&
      selectedCategoryFilter === 0 &&
      selectedSupplierFilter === 0
    ) {
      setFilteredData(laporanMutasiMasuk);
    } else {
      const filtered = laporanMutasiMasuk.filter(
        (item) =>
          (selectedWarehouseFilter === 0 ||
            item.gudang === selectedWarehouseFilter) &&
          (selectedCategoryFilter === 0 ||
            item.kategori === selectedCategoryFilter) &&
          (selectedSupplierFilter === 0 ||
            item.supplier === selectedSupplierFilter)
      );
      setFilteredData(filtered);
    }
  }, [selectedWarehouseFilter, selectedCategoryFilter, selectedSupplierFilter]);
  //#endregion

  //#region Handlers

  const handleAddClick = () => {
    // navigate(TAMBAH_TRANSFER_STOK_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
  };

  const handleItemClick = (value) => {
    // navigate(UBAH_TRANSFER_STOK_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.mutasiMasukSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          // variant="outline"
          label="Download"
          onClick={handleAddClick}
        />
      </div>
      <div className={styles.searchFilterSection}>
        {/* <SearchBar
          type="text"
          placeholder="Cari Transfer Stok Barang..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}
        <div className={styles.filterSection}>
          <DatePicker label="Dari " value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai " value={endDate} onChange={setEndDate} />
        </div>
        <div className={styles.filterSection}>
          <FilterDropdown
            options={categoryFilterOptions}
            placeholder="Filter Kategori"
            onChange={(val) => setSelectedCategoryFilter(val.value)}
          />
          <FilterDropdown
            options={supplierFilterOptions}
            placeholder="Filter Supplier"
            onChange={(val) => setSelectedSupplierFilter(val.value)}
          />
          <FilterDropdown
            options={warehouseFilterOptions}
            placeholder="Filter Gudang"
            onChange={(val) => setSelectedWarehouseFilter(val.value)}
          />
        </div>
      </div>
      <div className={styles.mutasiMasukTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Kode Supplier</div>
          <div className={styles.tableHeaderItem}>Qty</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {data.map((item) => (
            <div
              role="presentation"
              className={styles.tableRow}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.tableRowItem}>{item.no}</div>
              <div className={styles.tableRowItem}>
                {item.tanggal_transaksi}
              </div>
              <div className={styles.tableRowItem}>{item.nama_produk}</div>
              <div className={styles.tableRowItem}>{item.kode_supplier}</div>
              <div className={styles.tableRowItem}>{item.kuantitas}</div>
              <div className={styles.tableRowItem}>{item.keterangan}</div>
            </div>
          ))}
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

export default LaporanReturPenjualan;
