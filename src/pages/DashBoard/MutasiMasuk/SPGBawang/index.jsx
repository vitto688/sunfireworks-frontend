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
import { dataTransaksi } from "../../../../dummy_data/transactions";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import { UBAH_SPGBAWANG_PATH } from "./UbahSPGBawang";
import { TAMBAH_SPGBAWANG_PATH } from "./TambahSPGBawang";

export const SPG_BAWANG_PATH = "/mutasi-masuk/spg-bawang";

const SPGBawang = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { warehouses } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch data or perform any necessary actions on component mount
  }, []);

  useEffect(() => {
    const filteredTransaksi = filteredData.filter((item) =>
      item.no_faktur.toLowerCase().includes(query.toLowerCase())
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
    console.log("Selected Warehouse Filter:", selectedWarehouseFilter);
    if (selectedWarehouseFilter === 0) {
      setFilteredData(dataTransaksi);
    } else {
      const filtered = dataTransaksi.filter(
        (item) => item.gudang === selectedWarehouseFilter
      );
      setFilteredData(filtered);
    }
  }, [selectedWarehouseFilter]);
  //#endregion

  //#region Handlers

  const handleAddClick = () => {
    navigate(TAMBAH_SPGBAWANG_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_SPGBAWANG_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.spgBawangSection}>
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
          <div className={styles.tableHeaderItem}>No SJ</div>
        </div>
        <div className={styles.tableBody}>
          {data.map((item) => (
            <div
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
              <div className={styles.tableRowItem}>{item.no}</div>
              <div className={styles.tableRowItem}>
                {item.tanggal_transaksi}
              </div>
              <div className={styles.tableRowItem}>{item.no_faktur}</div>
              <div className={styles.tableRowItem}>{item.gudang}</div>
              <div className={styles.tableRowItem}>{item.diinput_oleh}</div>
              <div className={styles.tableRowItem}>{item.no_surat_jalan}</div>
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

export default SPGBawang;
