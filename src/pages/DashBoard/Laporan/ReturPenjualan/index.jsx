/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

// Import Redux actions
import {
  fetchReturPenjualanReportRequest,
  exportReturPenjualanReportRequest,
  resetReturPenjualanReportMessages,
  setReturPenjualanReportFilters,
  clearReturPenjualanReportData,
} from "../../../../redux/actions/returPenjualanReportActions";

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
import {
  formatCurrency,
  formatNumberWithDot,
  formatDate,
} from "../../../../utils/numberUtils";

// Import print utility
import {
  printReturPenjualanReport,
  exportReturPenjualanToExcel,
  exportReturPenjualanToExcelAdvanced,
} from "../../../../utils/printReturPenjualanReport";

// Import API function for fetching all data
import { fetchAllReturPenjualanReportData } from "../../../../api/reportReturPenjualan";

// Define the path for the Retur Penjualan page
export const LAPORAN_RETUR_PENJUALAN_PATH = "/laporan/retur-penjualan";

const LaporanReturPenjualan = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [localExportLoading, setLocalExportLoading] = useState(false);

  // Local filter states
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [supplierFilterOptions, setSupplierFilterOptions] = useState([]);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux selectors
  const { warehouses, suppliers } = useSelector((state) => state.master);

  const {
    returPenjualanReport,
    totalCount,
    totalPages,
    currentPage,
    loading,
    exportLoading,
    message,
    errorMessage,
    errorCode,
    filters,
  } = useSelector((state) => state.returPenjualanReport);

  //#region Helper Functions
  const fetchReturPenjualanData = useCallback(
    (page) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchReturPenjualanReportRequest(params));
    },
    [
      dispatch,
      query,
      selectedWarehouseFilter,
      selectedSupplierFilter,
      startDate,
      endDate,
    ]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = {
        page: newPage,
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchReturPenjualanReportRequest(params));
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetReturPenjualanReportMessages());

    // Load initial data
    fetchReturPenjualanData(1);

    // Cleanup when component unmounts
    return () => {
      dispatch(clearReturPenjualanReportData());
    };
  }, [dispatch, fetchReturPenjualanData]);

  useEffect(() => {
    // Handle success/error messages
    if (message !== null) {
      // You can show a toast notification here
      dispatch(resetReturPenjualanReportMessages());
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetReturPenjualanReportMessages());
    }
  }, [message, errorMessage, errorCode, dispatch]);

  // useEffect(() => {
  //   // Fetch data when filters change
  //   const delayedSearch = setTimeout(() => {
  //     fetchReturPenjualanData();
  //   }, 500); // Debounce search

  //   return () => clearTimeout(delayedSearch);
  // }, [fetchReturPenjualanData]);

  // Prepare filter options
  const warehouseFilterOpts = useMemo(() => {
    return [
      { value: 0, label: "Semua Gudang" },
      ...warehouses.map((warehouse) => ({
        value: warehouse.id,
        label: warehouse.name,
      })),
    ];
  }, [warehouses]);

  const supplierFilterOpts = useMemo(() => {
    return [
      { value: 0, label: "Semua Supplier" },
      ...suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      })),
    ];
  }, [suppliers]);

  //#region Handlers
  const handleDownloadClick = () => {
    const params = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    dispatch(exportReturPenjualanReportRequest(params));
  };

  const handlePrintClick = async () => {
    setPrintLoading(true);

    try {
      // Create filter object for API call
      const apiParams = {
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Fetch all data from API
      const allData = await fetchAllReturPenjualanReportData(apiParams);

      // Create filter object for print function
      const filters = {
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Use fetched data for print
      printReturPenjualanReport(allData, filters);
    } catch (error) {
      console.error("Error fetching data for print:", error);
      alert("Gagal mengambil data untuk print. Silakan coba lagi.");
    } finally {
      setPrintLoading(false);
    }
  };

  const handleExportExcelClick = async () => {
    setLocalExportLoading(true);

    // Create filter object for API call
    const apiParams = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedSupplierFilter !== 0 && {
        supplier: selectedSupplierFilter,
      }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      // Fetch all data from API
      const allData = await fetchAllReturPenjualanReportData(apiParams);

      // Create filter object for export function
      const filters = {
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Try advanced Excel export with XLSX library using fetched data
      const filename = exportReturPenjualanToExcelAdvanced(
        allData,
        filters,
        XLSX
      );
    } catch (error) {
      console.error("Error exporting Excel:", error);
      // Fallback to CSV export
      try {
        const allData = await fetchAllReturPenjualanReportData(apiParams);
        const filters = {
          ...(query && { search: query }),
          ...(selectedWarehouseFilter !== 0 && {
            warehouse: selectedWarehouseFilter,
          }),
          ...(selectedSupplierFilter !== 0 && {
            supplier: selectedSupplierFilter,
          }),
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate }),
        };
        const filename = exportReturPenjualanToExcel(allData, filters);
      } catch (csvError) {
        console.error("Error exporting CSV:", csvError);
        alert("Gagal mengexport data. Silakan coba lagi.");
      }
    } finally {
      setLocalExportLoading(false);
    }
  };

  const handleExportCSVClick = async () => {
    setLocalExportLoading(true);

    try {
      // Create filter object for API call
      const apiParams = {
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Fetch all data from API
      const allData = await fetchAllReturPenjualanReportData(apiParams);

      // Create filter object for export function
      const filters = {
        ...(query && { search: query }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      const filename = exportReturPenjualanToExcel(allData, filters);
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

  // // Event handlers
  // const handleSearchChange = useCallback((e) => {
  //   setQuery(e.target.value);
  // }, []);

  // const handleWarehouseFilterChange = useCallback((e) => {
  //   setSelectedWarehouseFilter(Number(e.target.value));
  // }, []);

  // const handleSupplierFilterChange = useCallback((e) => {
  //   setSelectedSupplierFilter(Number(e.target.value));
  // }, []);

  // const handleStartDateChange = useCallback((e) => {
  //   setStartDate(e.target.value);
  // }, []);

  // const handleEndDateChange = useCallback((e) => {
  //   setEndDate(e.target.value);
  // }, []);

  // const handleExportExcel = useCallback(() => {
  //   const params = {
  //     ...(query && { search: query }),
  //     ...(selectedWarehouseFilter !== 0 && {
  //       warehouse: selectedWarehouseFilter,
  //     }),
  //     ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
  //     ...(startDate && { start_date: startDate }),
  //     ...(endDate && { end_date: endDate }),
  //   };

  //   dispatch(exportReturPenjualanReportRequest(params));
  // }, [
  //   dispatch,
  //   query,
  //   selectedWarehouseFilter,
  //   selectedSupplierFilter,
  //   startDate,
  //   endDate,
  // ]);

  // const handlePrint = useCallback(() => {
  //   const printData = {
  //     data: returPenjualanReport,
  //     filters: {
  //       warehouse: selectedWarehouseFilter,
  //       supplier: selectedSupplierFilter,
  //       startDate,
  //       endDate,
  //       query,
  //     },
  //     warehouseOptions: warehouseFilterOpts,
  //     supplierOptions: supplierFilterOpts,
  //   };

  //   printReturPenjualanReport(printData);
  // }, [
  //   returPenjualanReport,
  //   selectedWarehouseFilter,
  //   selectedSupplierFilter,
  //   startDate,
  //   endDate,
  //   query,
  //   warehouseFilterOpts,
  //   supplierFilterOpts,
  // ]);
  // //#endregion

  return (
    <div className={styles.mainSection}>
      {(loading || printLoading || localExportLoading) && <Loading />}
      <div className={styles.actionsSection}>
        <CustomButton
          label={printLoading ? "Printing..." : "Print"}
          onClick={handlePrintClick}
          disabled={
            loading ||
            returPenjualanReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export Excel"}
          onClick={handleExportExcelClick}
          disabled={
            loading ||
            returPenjualanReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export CSV"}
          onClick={handleExportCSVClick}
          disabled={
            loading ||
            returPenjualanReport.length === 0 ||
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
            placeholder="Cari berdasarkan nomor dokumen, supplier..."
            value={query}
            onChange={setQuery}
          /> */}
        </div>
        <div className={styles.filterSection}>
          <DatePicker label="Dari " value={startDate} onChange={setStartDate} />
          <DatePicker label="Sampai " value={endDate} onChange={setEndDate} />
        </div>
        <div className={styles.filterSection}>
          {/* <FilterDropdown
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
      <div className={styles.mainTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>No. Dokumen</div>
          <div className={styles.tableHeaderItem}>Tanggal Transaksi</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Supplier</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Carton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
          <div className={styles.tableHeaderItem}>Keterangan</div>
        </div>
        <div className={styles.tableBody}>
          {returPenjualanReport.length === 0 && !loading ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data retur penjualan yang ditemukan</p>
            </div>
          ) : (
            returPenjualanReport.map((item, index) => (
              <div
                role="presentation"
                key={`${item.document_number}-${item.product_id}-${index}`}
                className={styles.tableRow}
                onClick={() => handleItemClick(item)}
              >
                <div className={styles.tableRowItem}>
                  {(currentPage - 1) * 10 + index + 1}
                </div>
                <div className={styles.tableRowItem}>
                  {item.document_number}
                </div>
                <div className={styles.tableRowItem}>
                  {formatDate(item.transaction_date)}
                </div>
                <div className={styles.tableRowItem}>{item.product_code}</div>
                <div className={styles.tableRowItem}>{item.product_name}</div>
                <div className={styles.tableRowItem}>{item.supplier_name}</div>
                <div className={styles.tableRowItem}>{item.warehouse_name}</div>
                <div className={styles.tableRowItem}>{item.packing}</div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.carton_quantity)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.pack_quantity)}
                </div>

                <div className={styles.tableRowItem}>{item.notes || "-"}</div>
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

export default LaporanReturPenjualan;
