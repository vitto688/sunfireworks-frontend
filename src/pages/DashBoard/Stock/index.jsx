import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import actions
import {
  fetchStocksRequest,
  resetStockMessages,
} from "../../../redux/actions/stockActions";

// import components
// import CustomButton from "../../../components/CustomButton";
import SearchBar from "../../../components/SearchBar";
// import { TAMBAH_PRODUK_PATH } from "../MasterData/Produk/TambahProduk";
import FilterDropdown from "../../../components/FilterDropdown";
import { UBAH_STOK_PATH } from "./UbahStok";

// Define the path for the Penyesuaian Stok page
export const STOCK_PATH = "/stok";

const Stock = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [stok, setStok] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [productFilterOptions, setProductFilterOptions] = useState([]);
  const [selectedProductFilter, setSelectedProductFilter] = useState(0);

  const { stocks, message, errorMessage, errorCode } = useSelector(
    (state) => state.stock
  );

  const { warehouses, products } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch stock data from API or state management
    // For now, we are using dummy data
    dispatch(fetchStocksRequest());
  }, [dispatch]);

  useEffect(() => {
    const filteredStocks = filteredData.filter((stock) =>
      stock.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setStok(filteredStocks);
  }, [query, filteredData]);

  // Filter stocks
  useEffect(() => {
    if (warehouses.length > 0) {
      const options = [
        { label: "Semua Gudang", value: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.id,
        })),
      ];
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);

  useEffect(() => {
    if (products.length > 0) {
      const options = [
        { label: "Semua Produk", value: 0 },
        ...products.map((product) => ({
          label: product.name,
          value: product.name,
        })),
      ];
      setProductFilterOptions(options);
    }
  }, [products]);

  useEffect(() => {
    if (selectedWarehouseFilter === 0 && selectedProductFilter === 0) {
      setFilteredData(stocks);
    } else if (selectedWarehouseFilter !== 0 && selectedProductFilter === 0) {
      const filteredStocks = stocks.filter(
        (stock) => stock.warehouse === selectedWarehouseFilter
      );
      setFilteredData(filteredStocks);
    } else if (selectedWarehouseFilter === 0 && selectedProductFilter !== 0) {
      const filteredStocks = stocks.filter(
        (stock) => stock.product_name === selectedProductFilter
      );
      setFilteredData(filteredStocks);
    } else {
      const filteredStocks = stocks.filter(
        (stock) =>
          stock.warehouse === selectedWarehouseFilter &&
          stock.product_name === selectedProductFilter
      );
      setFilteredData(filteredStocks);
    }
  }, [selectedWarehouseFilter, selectedProductFilter, stocks]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
    dispatch(resetStockMessages());
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  //#endregion

  //#region Handlers
  // const handleAddClick = () => {
  //   navigate(TAMBAH_PRODUK_PATH);
  // };

  const handleItemClick = (item) => {
    navigate(UBAH_STOK_PATH, { state: item });
  };
  //#endregion

  return (
    <div className={styles.stocksSection}>
      <div className={styles.actionsSection}>
        {/* <CustomButton
          // variant="outline"
          label="+ Tambah"
          onClick={handleAddClick}
        /> */}
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari stok..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        >
          {/* <CustomButton label="Cari" onClick={handleFindClick} /> */}
        </SearchBar>
        <div className={styles.filterSection}>
          <FilterDropdown
            options={productFilterOptions}
            placeholder="Filter Produk"
            onChange={(val) => setSelectedProductFilter(val.value)}
          />
          <FilterDropdown
            options={warehouseFilterOptions}
            placeholder="Filter Gudang"
            onChange={(val) => setSelectedWarehouseFilter(val.value)}
          />
        </div>
      </div>

      <div className={styles.stocksTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          {/* <div className={styles.tableHeaderItem}>Barcode</div> */}
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
          {/* <div className={styles.tableHeaderItem}>Kuantitas</div>
          <div className={styles.tableHeaderItem}>Gudang</div> */}
        </div>
        <div className={styles.tableBody}>
          {stok.map((stokItem, index) => (
            <div
              role="presentation"
              key={stokItem.id}
              className={styles.tableRow}
              onClick={() => handleItemClick(stokItem)}
            >
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{stokItem.product_code}</div>
              {/* <div className={styles.tableRowItem}>{stokItem.barcode}</div> */}
              <div className={styles.tableRowItem}>{stokItem.product_name}</div>
              <div className={styles.tableRowItem}>
                {stokItem.warehouse_name}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.carton_quantity}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.pack_quantity}
              </div>
              {/* <div className={styles.tableRowItem}>{stokItem.quantity}</div>
              <div className={styles.tableRowItem}>
                {product.warehouse_name}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stock;
