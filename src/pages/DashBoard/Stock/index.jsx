import React, { useEffect, useState, useMemo } from "react";
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
import CustomButton from "../../../components/CustomButton";
import SearchBar from "../../../components/SearchBar";
import LoadingOverlay from "../../../components/LoadingOverlay";
// import { TAMBAH_PRODUK_PATH } from "../MasterData/Produk/TambahProduk";
import FilterDropdown from "../../../components/FilterDropdown";
import DatePicker from "../../../components/DatePicker";
// import { UBAH_STOK_PATH } from "./UbahStok";
import { formatNumberWithDot } from "../../../utils/numberUtils";

// import print & export utilities (khusus halaman Stok, kolom flat = sama dengan tabel website)
import {
  printStockReport,
  exportStockToExcel,
  exportStockToCsv,
  groupStockByProduct,
} from "../../../utils/printStockReport";

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
  const [categoryFilterOptions, setCategoryFilterOptions] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(0);
  const [supplierFilterOptions, setSupplierFilterOptions] = useState([]);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState(0);

  // Filter tanggal (range) berdasarkan updated_at, untuk cek pergerakan stok
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Flag: hanya tampilkan gudang yang ada stoknya di filter gudang
  const [showOnlyWithStock, setShowOnlyWithStock] = useState(false);

  const { stocks, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.stock
  );
  // const { user } = useSelector((state) => state.auth);

  const { warehouses, categories, suppliers } = useSelector(
    (state) => state.master
  );

  //#region Helper Functions
  // Build filter options for dropdowns
  const buildFilterOptions = (items, labelKey, valueKey, allLabel) => {
    return [
      { label: allLabel, value: 0 },
      ...items.map((item) => ({
        label: item[labelKey],
        value: item[valueKey],
      })),
    ];
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Fetch stock data from API or state management
    dispatch(fetchStocksRequest());
  }, [dispatch]);

  // Apply search filter to already filtered data
  useEffect(() => {
    if (!query.trim()) {
      setStok(filteredData);
      return;
    }

    const searchedStocks = filteredData.filter(
      (stock) =>
        stock.product_name.toLowerCase().includes(query.toLowerCase()) ||
        stock.product_code.toLowerCase().includes(query.toLowerCase()) ||
        stock.supplier_name.toLowerCase().includes(query.toLowerCase())
    );
    setStok(searchedStocks);
  }, [query, filteredData]);

  // Build filter options when master data changes
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

  useEffect(() => {
    if (categories.length > 0) {
      const options = buildFilterOptions(
        categories,
        "name",
        "name",
        "Semua Kategori"
      );
      setCategoryFilterOptions(options);
    }
  }, [categories]);

  useEffect(() => {
    if (suppliers.length > 0) {
      const options = buildFilterOptions(
        suppliers,
        "name",
        "name",
        "Semua Eksportir"
      );
      setSupplierFilterOptions(options);
    }
  }, [suppliers]);

  // Nama gudang yang sedang dipilih (untuk header laporan print/export)
  const selectedWarehouseName = useMemo(() => {
    if (selectedWarehouseFilter === 0) return null;
    return (
      warehouses.find((w) => w.id === selectedWarehouseFilter)?.name || null
    );
  }, [selectedWarehouseFilter, warehouses]);

  // Filter stocks based on selected filters (semua filter dikerjakan di sini / client-side)
  useEffect(() => {
    let filteredStocks = stocks;

    // Apply warehouse filter
    if (selectedWarehouseFilter !== 0) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.warehouse === selectedWarehouseFilter
      );
    }

    // Apply category filter
    if (selectedCategoryFilter !== 0) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.product_category === selectedCategoryFilter
      );
    }

    // Apply supplier filter
    if (selectedSupplierFilter !== 0) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.supplier_name === selectedSupplierFilter
      );
    }

    // Apply date range filter berdasarkan updated_at (bandingkan bagian tanggal YYYY-MM-DD)
    if (startDate) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.updated_at && stock.updated_at.slice(0, 10) >= startDate
      );
    }
    if (endDate) {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.updated_at && stock.updated_at.slice(0, 10) <= endDate
      );
    }

    // Apply "tampilkan yang ada stok": hanya baris dengan carton/pack > 0
    if (showOnlyWithStock) {
      filteredStocks = filteredStocks.filter(
        (stock) => (stock.carton_quantity || 0) + (stock.pack_quantity || 0) > 0
      );
    }

    setFilteredData(filteredStocks);
  }, [
    selectedWarehouseFilter,
    selectedCategoryFilter,
    selectedSupplierFilter,
    startDate,
    endDate,
    showOnlyWithStock,
    stocks,
  ]);

  // Handle success/error messages
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

  //#endregion

  //#region Handlers
  // const handleAddClick = () => {
  //   navigate(TAMBAH_PRODUK_PATH);
  // };

  const handleItemClick = (item) => {
    // if (user?.role !== 3) navigate(UBAH_STOK_PATH, { state: item });
  };

  // Bangun objek filter untuk header laporan print/export (sesuai yang sedang tampil)
  const buildReportFilters = () => ({
    ...(query && { search: query }),
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
    ...(selectedWarehouseName && { warehouse: selectedWarehouseName }),
    ...(selectedCategoryFilter !== 0 && { category: selectedCategoryFilter }),
    ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
    ...(showOnlyWithStock && { only_with_stock: true }),
  });

  const handlePrintClick = () => {
    printStockReport(groupedStok, buildReportFilters());
  };

  const handleExportExcelClick = () => {
    exportStockToExcel(groupedStok, buildReportFilters());
  };

  const handleExportCsvClick = () => {
    exportStockToCsv(groupedStok, buildReportFilters());
  };

  // Toggle flag "tampilkan yang ada stok" (filter baris dengan carton/pack > 0)
  const handleToggleOnlyWithStock = () => {
    setShowOnlyWithStock((prev) => !prev);
  };

  // Data hasil grouping per produk (carton & pack dijumlahkan lintas gudang)
  const groupedStok = useMemo(() => groupStockByProduct(stok), [stok]);

  // Calculate totals for footer
  const totals = useMemo(() => {
    const totalCarton = stok.reduce(
      (sum, item) => sum + (item.carton_quantity || 0),
      0
    );
    const totalPack = stok.reduce(
      (sum, item) => sum + (item.pack_quantity || 0),
      0
    );

    return {
      carton: totalCarton,
      pack: totalPack,
    };
  }, [stok]);
  //#endregion

  return (
    <div className={styles.stocksSection}>
      <LoadingOverlay show={loading} label="Memuat data stok..." />
      <div className={styles.actionsSection}>
        <CustomButton
          variant="outline"
          label="Print"
          onClick={handlePrintClick}
          inactive={stok.length === 0}
        />
        <CustomButton
          variant="outline"
          label="Download Excel"
          onClick={handleExportExcelClick}
          inactive={stok.length === 0}
        />
        <CustomButton
          variant="outline"
          label="Download CSV"
          onClick={handleExportCsvClick}
          inactive={stok.length === 0}
        />
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
          <DatePicker label="Dari" value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai" value={endDate} onChange={setEndDate} />
          <label className={styles.stockToggle}>
            <input
              type="checkbox"
              checked={showOnlyWithStock}
              onChange={handleToggleOnlyWithStock}
            />
            <span>Tampilkan yang ada stok</span>
          </label>
          <FilterDropdown
            options={categoryFilterOptions}
            placeholder="Filter Kategori"
            onChange={(val) => setSelectedCategoryFilter(val.value)}
          />
          <FilterDropdown
            options={supplierFilterOptions}
            placeholder="Filter Eksportir"
            onChange={(val) => setSelectedSupplierFilter(val.value)}
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
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
          <div className={styles.tableHeaderItem}>Total</div>
          {/* <div className={styles.tableHeaderItem}>Kuantitas</div>
          <div className={styles.tableHeaderItem}>Gudang</div> */}
        </div>
        <div className={styles.tableBody}>
          {groupedStok.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data stok yang ditemukan</p>
            </div>
          ) : (
            groupedStok.map((stokItem, index) => (
              <div
                role="presentation"
                key={stokItem.product ?? `${stokItem.product_code}-${index}`}
                className={styles.tableRow}
                onClick={() => handleItemClick(stokItem)}
              >
                <div className={styles.tableRowItem}>{index + 1}</div>
                <div className={styles.tableRowItem}>
                  {stokItem.product_code}
                </div>
                {/* <div className={styles.tableRowItem}>{stokItem.barcode}</div> */}
                <div className={styles.tableRowItem}>
                  {stokItem.product_name}
                </div>
                <div className={styles.tableRowItem}>{stokItem.packing}</div>

                <div className={`${styles.tableRowItem} ${styles.quantity}`}>
                  {formatNumberWithDot(stokItem.carton_quantity)}
                </div>
                <div className={`${styles.tableRowItem} ${styles.quantity}`}>
                  {formatNumberWithDot(stokItem.pack_quantity)}
                </div>
                <div className={`${styles.tableRowItem} ${styles.quantity}`}>
                  {formatNumberWithDot(
                    (stokItem.carton_quantity || 0) +
                      (stokItem.pack_quantity || 0)
                  )}
                </div>
                {/* <div className={styles.tableRowItem}>{stokItem.quantity}</div>
              <div className={styles.tableRowItem}>
                {product.warehouse_name}
              </div> */}
              </div>
            ))
          )}
        </div>

        {/* Footer with totals */}
        <div className={styles.tableFooter}>
          <div className={styles.footerContent}>
            <div className={`${styles.footerItem} ${styles.totalItems}`}>
              <strong>Total Items: {groupedStok.length}</strong>
            </div>
            <div className={`${styles.footerItem} ${styles.totalKarton}`}>
              <strong>{formatNumberWithDot(totals.carton)}</strong>
            </div>
            <div className={`${styles.footerItem} ${styles.totalPack}`}>
              <strong>{formatNumberWithDot(totals.pack)}</strong>
            </div>
            <div className={`${styles.footerItem} ${styles.totalTotal}`}>
              <strong>{formatNumberWithDot(totals.carton + totals.pack)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
