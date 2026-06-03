/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  fetchStockReportNPRequest,
  exportStockReportRequest,
  resetStockReportMessages,
  setStockReportFilters,
  clearStockReportData,
} from "../../../../redux/actions/stockReportActions";

import {
  fetchCategoriesRequest,
  fetchSuppliersRequest,
  fetchWarehousesRequest,
} from "../../../../redux/actions/masterActions";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import LoadingOverlay from "../../../../components/LoadingOverlay";

// Import number formatting utility
import { formatNumberWithDot } from "../../../../utils/numberUtils";

// Import print and export utilities (util flat bersama dengan halaman Stok — kolom sama, tanpa KP)
import {
  printStockReport,
  exportStockToExcel,
  exportStockToCsv,
  groupStockByProduct,
} from "../../../../utils/printStockReport";

// Import API function for fetching all data
import { fetchAllStockReportData } from "../../../../api/reportStock";

// Define the path for the Laporan Stok Barang page
export const LAPORAN_STOK_BARANG_PATH = "/laporan/stok-barang";

const LaporanStokBarang = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [localExportLoading, setLocalExportLoading] = useState(false);

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
    stockReportNP,
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
  // Update query string parameters
  // const updateQueryString = useCallback(
  //   (key, value) => {
  //     const newSearchParams = new URLSearchParams(searchParams);
  //     if (value && value !== 0 && value !== "") {
  //       newSearchParams.set(key, value);
  //     } else {
  //       newSearchParams.delete(key);
  //     }
  //     setSearchParams(newSearchParams);
  //   },
  //   [searchParams, setSearchParams]
  // );

  // Get filter value from query string
  const getFilterFromQuery = useCallback(
    (key, defaultValue = 0) => {
      const value = searchParams.get(key);
      return value ? value : defaultValue;
    },
    [searchParams]
  );

  const fetchStockData = useCallback(() => {
    // Ambil SEMUA data sekali (tanpa pagination & tanpa param filter).
    // Semua filter (kategori & tanggal) dikerjakan di frontend.
    dispatch(fetchStockReportNPRequest({}));
  }, [dispatch]);

  // Filter data di frontend: Kategori + rentang tanggal (updated_at)
  const filteredReport = useMemo(() => {
    let data = stockReportNP || [];

    if (selectedCategoryFilter !== 0) {
      data = data.filter(
        (item) => item.product_category === selectedCategoryFilter
      );
    }
    if (startDate) {
      data = data.filter(
        (item) => item.updated_at && item.updated_at.slice(0, 10) >= startDate
      );
    }
    if (endDate) {
      data = data.filter(
        (item) => item.updated_at && item.updated_at.slice(0, 10) <= endDate
      );
    }

    return data;
  }, [stockReportNP, selectedCategoryFilter, startDate, endDate]);

  // Data hasil grouping per produk (carton & pack dijumlahkan lintas gudang)
  const groupedData = useMemo(
    () => groupStockByProduct(filteredReport),
    [filteredReport]
  );

  // Total keseluruhan untuk footer (dihitung dari data hasil grouping)
  const reportTotals = useMemo(() => {
    const carton = groupedData.reduce(
      (sum, item) => sum + (item.carton_quantity || 0),
      0
    );
    const pack = groupedData.reduce(
      (sum, item) => sum + (item.pack_quantity || 0),
      0
    );
    return { carton, pack };
  }, [groupedData]);
  //#endregion

  //#region Effects
  // Initialize filters from query string on component mount
  // useEffect(() => {
  //   const categoryParam = getFilterFromQuery("category");
  //   const supplierParam = getFilterFromQuery("supplier");
  //   const warehouseParam = getFilterFromQuery("warehouse");

  //   if (categoryParam && categoryParam !== 0) {
  //     setSelectedCategoryFilter(categoryParam);
  //   }
  //   if (supplierParam && supplierParam !== 0) {
  //     setSelectedSupplierFilter(supplierParam);
  //   }
  //   if (warehouseParam && warehouseParam !== 0) {
  //     setSelectedWarehouseFilter(warehouseParam);
  //   }
  // }, [getFilterFromQuery]);

  // useEffect(() => {
  //   // Reset messages when component mounts
  //   dispatch(resetStockReportMessages());

  //   // Fetch master data
  //   dispatch(fetchCategoriesRequest());
  //   dispatch(fetchSuppliersRequest());
  //   dispatch(fetchWarehousesRequest());

  //   // Load initial data
  //   fetchStockData(1);

  //   // Cleanup when component unmounts
  //   return () => {
  //     dispatch(clearStockReportData());
  //   };
  // }, [dispatch, fetchStockData]);

  useEffect(() => {
    // Handle success/error messages
    if (message !== null) {
      // You can show a toast notification here
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
        { label: "Semua Gudang", value: 0, id: 0 },
        ...warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.id,
          id: warehouse.id, // Menambahkan property id
        })),
      ];
      setWarehouseFilterOptions(options);
    }
  }, [warehouses]);

  useEffect(() => {
    if (categories.length > 0) {
      const options = [
        { label: "Semua Kategori", value: 0, id: 0 },
        ...categories.map((category) => ({
          label: category.name,
          value: category.name,
          id: category.id,
        })),
      ];
      setCategoryFilterOptions(options);
    }
  }, [categories]);

  useEffect(() => {
    if (suppliers.length > 0) {
      const options = [
        { label: "Semua Eksportir", value: 0, id: 0 },
        ...suppliers.map((supplier) => ({
          label: supplier.name,
          value: supplier.id,
          id: supplier.id,
        })),
      ];
      setSupplierFilterOptions(options);
    }
  }, [suppliers]);

  // Ambil data sekali saat mount; filter dikerjakan di frontend (lihat filteredReport)
  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  // Effect to sync filter values from query string when options are loaded
  useEffect(() => {
    const categoryParam = getFilterFromQuery("category");
    const supplierParam = getFilterFromQuery("supplier");
    const warehouseParam = getFilterFromQuery("warehouse");

    if (
      categoryParam &&
      categoryParam !== 0 &&
      categoryFilterOptions.length > 0
    ) {
      const foundCategory = categoryFilterOptions.find(
        (option) => option.value === categoryParam
      );
      if (foundCategory) {
        setSelectedCategoryFilter(categoryParam);
      }
    }

    if (
      supplierParam &&
      supplierParam !== 0 &&
      supplierFilterOptions.length > 0
    ) {
      const foundSupplier = supplierFilterOptions.find(
        (option) => option.value === supplierParam
      );
      if (foundSupplier) {
        setSelectedSupplierFilter(supplierParam);
      }
    }

    if (
      warehouseParam &&
      warehouseParam !== 0 &&
      warehouseFilterOptions.length > 0
    ) {
      const foundWarehouse = warehouseFilterOptions.find(
        (option) => option.value === warehouseParam
      );
      if (foundWarehouse) {
        setSelectedWarehouseFilter(warehouseParam);
      }
    }
  }, [
    categoryFilterOptions,
    supplierFilterOptions,
    warehouseFilterOptions,
    getFilterFromQuery,
  ]);
  //#endregion

  //#region Handlers
  // Filter change handlers
  const handleCategoryFilterChange = (selectedOption) => {
    setSelectedCategoryFilter(selectedOption);
    // updateQueryString("category", selectedOption.value);
    // // Trigger data fetch with new filter
    // setTimeout(() => fetchStockData(1), 100);
  };

  const handleSupplierFilterChange = (selectedOption) => {
    setSelectedSupplierFilter(selectedOption);
    // updateQueryString("supplier", selectedOption.value);
    // // Trigger data fetch with new filter
    // setTimeout(() => fetchStockData(1), 100);
  };

  const handleWarehouseFilterChange = (selectedOption) => {
    setSelectedWarehouseFilter(selectedOption);
    // updateQueryString("warehouse", selectedOption.value);
    // // Trigger data fetch with new filter
    // setTimeout(() => fetchStockData(1), 100);
  };

  const handleDownloadClick = () => {
    const params = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedCategoryFilter !== 0 && {
        category: selectedCategoryFilter.id,
      }),
      ...(selectedSupplierFilter !== 0 && {
        supplier: selectedSupplierFilter.id,
      }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    dispatch(exportStockReportRequest(params));
  };

  // Bangun info filter aktif untuk header laporan print/export
  const buildReportFilters = () => ({
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
    ...(selectedCategoryFilter !== 0 && { category: selectedCategoryFilter }),
  });

  const handlePrintClick = () => {
    setPrintLoading(true);
    try {
      // Pakai data hasil grouping (yang sedang tampil) agar print = tampilan website
      printStockReport(groupedData, buildReportFilters());
    } catch (error) {
      console.error("Error print:", error);
      alert("Gagal mencetak. Silakan coba lagi.");
    } finally {
      setPrintLoading(false);
    }
  };

  const handleExportExcelClick = () => {
    setLocalExportLoading(true);
    try {
      exportStockToExcel(groupedData, buildReportFilters());
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert("Gagal mengexport data. Silakan coba lagi.");
    } finally {
      setLocalExportLoading(false);
    }
  };

  const handleExportCSVClick = () => {
    setLocalExportLoading(true);
    try {
      exportStockToCsv(groupedData, buildReportFilters());
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Gagal mengexport data CSV. Silakan coba lagi.");
    } finally {
      setLocalExportLoading(false);
    }
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
  };

  const handleItemClick = (value) => {
    // navigate to details page if needed
  };
  //#endregion

  return (
    <div className={styles.mutasiMasukSection}>
      <LoadingOverlay show={loading || printLoading || localExportLoading} label="Memuat laporan stok barang..." />
      <div className={styles.actionsSection}>
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export Excel"}
          onClick={handleExportExcelClick}
          disabled={
            loading ||
            stockReportNP.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export CSV"}
          onClick={handleExportCSVClick}
          disabled={
            loading ||
            stockReportNP.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={printLoading ? "Printing..." : "Print"}
          onClick={handlePrintClick}
          disabled={
            loading ||
            stockReportNP.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        {/* <CustomButton
          label={exportLoading ? "Downloading..." : "Download"}
          onClick={handleDownloadClick}
          disabled={exportLoading || loading}
        /> */}
      </div>
      <div className={styles.searchFilterSection}>
        <div className={styles.searchSection}>
          {/* <SearchBar
            placeholder="Cari produk atau supplier..."
            value={query}
            onChange={setQuery}
          /> */}
        </div>
        <div className={styles.filterSection}>
          <DatePicker label="Dari" value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai" value={endDate} onChange={setEndDate} />
          <FilterDropdown
            options={categoryFilterOptions}
            placeholder="Filter Kategori"
            onChange={(val) => setSelectedCategoryFilter(val.value)}
          />
        </div>
      </div>
      <div className={styles.mutasiMasukTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
          <div className={styles.tableHeaderItem}>Total</div>
        </div>
        <div className={styles.tableBody}>
          {groupedData.length === 0 && !loading ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data stok barang</p>
            </div>
          ) : (
            groupedData.map((item, index) => (
              <div
                role="presentation"
                key={item.product ?? `${item.product_code}-${index}`}
                className={styles.tableRow}
                onClick={() => handleItemClick(item)}
              >
                <div className={styles.tableRowItem}>{index + 1}</div>
                <div className={styles.tableRowItem}>{item.product_code}</div>
                <div className={styles.tableRowItem}>{item.product_name}</div>
                <div className={styles.tableRowItem}>{item.packing}</div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.carton_quantity)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.pack_quantity)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(
                    (item.carton_quantity || 0) + (item.pack_quantity || 0)
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals */}
        <div className={styles.tableFooter}>
          <div className={styles.footerContent}>
            <div className={`${styles.footerItem} ${styles.totalItems}`}>
              <strong>Total Items: {groupedData.length}</strong>
            </div>
            <div className={`${styles.footerItem} ${styles.totalKarton}`}>
              <strong>{formatNumberWithDot(reportTotals.carton)}</strong>
            </div>
            <div className={`${styles.footerItem} ${styles.totalPack}`}>
              <strong>{formatNumberWithDot(reportTotals.pack)}</strong>
            </div>
            <div className={`${styles.footerItem} ${styles.totalTotal}`}>
              <strong>
                {formatNumberWithDot(reportTotals.carton + reportTotals.pack)}
              </strong>
            </div>
          </div>
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

export default LaporanStokBarang;
