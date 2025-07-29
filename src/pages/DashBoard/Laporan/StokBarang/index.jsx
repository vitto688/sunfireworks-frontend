/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

/*
EXPORT EXCEL SETUP:
- Export CSV: Works immediately (no dependencies required)
- Export Excel (Advanced): Uses XLSX library (now installed)
  
Both export options are now available and fully functional.
*/

// Import Redux actions
import {
  fetchStockReportRequest,
  exportStockReportRequest,
  resetStockReportMessages,
  setStockReportFilters,
  clearStockReportData,
} from "../../../../redux/actions/stockReportActions";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import Loading from "../../../../components/Loading";

// Import number formatting utility
import { formatNumberWithDot } from "../../../../utils/numberUtils";

// Import print and export utilities
import {
  printStokBarangReport,
  exportStokBarangToExcel,
  exportStokBarangToExcelAdvanced,
} from "../../../../utils/printStokBarangReport";

// Define the path for the Laporan Stok Barang page
export const LAPORAN_STOK_BARANG_PATH = "/laporan/stok-barang";

const LaporanStokBarang = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Local filter states
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [categoryFilterOptions, setCategoryFilterOptions] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(0);
  const [supplierFilterOptions, setSupplierFilterOptions] = useState([]);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux selectors
  const { warehouses, categories, suppliers } = useSelector(
    (state) => state.master
  );

  const {
    stockReport,
    totalCount,
    totalPages,
    currentPage,
    loading,
    exportLoading,
    message,
    errorMessage,
    errorCode,
    filters,
  } = useSelector((state) => state.stockReport);

  //#region Helper Functions
  const fetchStockData = useCallback(
    (page) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedCategoryFilter !== 0 && {
          category: selectedCategoryFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchStockReportRequest(params));
    },
    [
      dispatch,
      query,
      selectedWarehouseFilter,
      selectedCategoryFilter,
      selectedSupplierFilter,
      startDate,
      endDate,
    ]
  );

  const handlePageChange = (newPage) => {
    console.log("handlePageChange called");

    if (newPage >= 1 && newPage <= totalPages) {
      const params = {
        page: newPage,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedCategoryFilter !== 0 && {
          category: selectedCategoryFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchStockReportRequest(params));
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetStockReportMessages());

    // Load initial data
    fetchStockData(1);

    // Cleanup when component unmounts
    return () => {
      dispatch(clearStockReportData());
    };
  }, [dispatch, fetchStockData]);

  useEffect(() => {
    // Handle success/error messages
    if (message !== null) {
      // You can show a toast notification here
      console.log("Success:", message);
      dispatch(resetStockReportMessages());
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetStockReportMessages());
    }
  }, [message, errorMessage, errorCode, dispatch]);

  // useEffect(() => {
  //   // Fetch data when filters change
  //   const delayedSearch = setTimeout(() => {
  //     fetchStockData();
  //   }, 500); // Debounce search

  //   return () => clearTimeout(delayedSearch);
  // }, [fetchStockData]);

  useEffect(() => {
    if (warehouses.length > 0) {
      const options = [
        { label: "Semua Gudang", value: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.name,
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
          value: category.name,
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
          value: supplier.name,
        })),
      ];
      setSupplierFilterOptions(options);
    }
  }, [suppliers]);
  //#endregion

  //#region Handlers
  const handleDownloadClick = () => {
    const params = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedCategoryFilter !== 0 && { category: selectedCategoryFilter }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    dispatch(exportStockReportRequest(params));
  };

  const handlePrintClick = () => {
    // Create filter object for print function
    const filters = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedCategoryFilter !== 0 && { category: selectedCategoryFilter }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    // Use current data for print
    printStokBarangReport(stockReport, filters);
  };

  const handleExportExcelClick = () => {
    // Create filter object for export function
    const filters = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedCategoryFilter !== 0 && { category: selectedCategoryFilter }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      // Try advanced Excel export with XLSX library
      const filename = exportStokBarangToExcelAdvanced(
        stockReport,
        filters,
        XLSX
      );
      console.log(`Excel file exported: ${filename}`);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      // Fallback to CSV export
      try {
        const filename = exportStokBarangToExcel(stockReport, filters);
        console.log(`CSV file exported: ${filename}`);
      } catch (csvError) {
        console.error("Error exporting CSV:", csvError);
        alert("Gagal mengexport data. Silakan coba lagi.");
      }
    }
  };

  const handleExportCSVClick = () => {
    // Create filter object for export function
    const filters = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedCategoryFilter !== 0 && { category: selectedCategoryFilter }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      const filename = exportStokBarangToExcel(stockReport, filters);
      console.log(`CSV file exported: ${filename}`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Gagal mengexport data CSV. Silakan coba lagi.");
    }
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
  };

  const handleItemClick = (value) => {
    // navigate to details page if needed
    console.log("Item clicked:", value);
  };
  //#endregion

  return (
    <div className={styles.mutasiMasukSection}>
      {loading && <Loading />}
      <div className={styles.actionsSection}>
        <CustomButton
          label="Export Excel"
          onClick={handleExportExcelClick}
          disabled={loading || stockReport.length === 0}
        />
        <CustomButton
          label="Export CSV"
          onClick={handleExportCSVClick}
          disabled={loading || stockReport.length === 0}
        />
        <CustomButton
          label="Print"
          onClick={handlePrintClick}
          disabled={loading || stockReport.length === 0}
        />
        {/* <CustomButton
          label={exportLoading ? "Downloading..." : "Download"}
          onClick={handleDownloadClick}
          disabled={exportLoading || loading}
        /> */}
      </div>
      <div className={styles.searchFilterSection}>
        {/* <div className={styles.searchSection}>
          <SearchBar
            placeholder="Cari produk atau supplier..."
            value={query}
            onChange={setQuery}
          />
        </div> */}
        <div className={styles.filterSection}>
          {/* <DatePicker label="Dari " value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai " value={endDate} onChange={setEndDate} /> */}
        </div>
        <div className={styles.filterSection}>
          {/* <FilterDropdown
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
          /> */}
        </div>
      </div>
      <div className={styles.mutasiMasukTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>KP</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
        </div>
        <div className={styles.tableBody}>
          {stockReport.length === 0 && !loading ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data stok barang</p>
            </div>
          ) : (
            stockReport.map((item, index) => (
              <div
                role="presentation"
                key={`${item.product_code}-${item.warehouse_name}-${index}`}
                className={styles.tableRow}
                onClick={() => handleItemClick(item)}
              >
                <div className={styles.tableRowItem}>
                  {(currentPage - 1) * 10 + index + 1}
                </div>
                <div className={styles.tableRowItem}>{item.product_code}</div>
                <div className={styles.tableRowItem}>{item.product_name}</div>
                <div className={styles.tableRowItem}>{item.packing}</div>
                <div className={styles.tableRowItem}>{item.supplier_name}</div>
                <div className={styles.tableRowItem}>{item.warehouse_name}</div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.carton_quantity)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.pack_quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </button>
            <span className={styles.paginationInfo}>
              Page {currentPage} of {totalPages} ({totalCount} items)
            </span>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </button>
          </div>
        )}
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

export default LaporanStokBarang;
