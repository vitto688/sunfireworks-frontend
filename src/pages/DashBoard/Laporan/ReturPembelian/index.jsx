/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

// Import Redux actions
import {
  fetchReturPembelianReportRequest,
  exportReturPembelianReportRequest,
  resetReturPembelianReportMessages,
  setReturPembelianReportFilters,
  clearReturPembelianReportData,
} from "../../../../redux/actions/returPembelianReportActions";

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
  printReturPembelianReport,
  exportReturPembelianToExcel,
  exportReturPembelianToExcelAdvanced,
} from "../../../../utils/printReturPembelianReport";

// Define the path for the Laporan Retur Pembelian page
export const LAPORAN_RETUR_PEMBELIAN_PATH = "/laporan/retur-pembelian";

const LaporanReturPembelian = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
    returPembelianReport,
    totalCount,
    totalPages,
    currentPage,
    loading,
    exportLoading,
    message,
    errorMessage,
    errorCode,
    filters,
  } = useSelector((state) => state.returPembelianReport);

  //#region Helper Functions
  const fetchReturPembelianData = useCallback(
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

      dispatch(fetchReturPembelianReportRequest(params));
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

      dispatch(fetchReturPembelianReportRequest(params));
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetReturPembelianReportMessages());

    // Load initial data
    fetchReturPembelianData(1);

    // Cleanup when component unmounts
    return () => {
      dispatch(clearReturPembelianReportData());
    };
  }, [dispatch, fetchReturPembelianData]);

  useEffect(() => {
    // Handle success/error messages
    if (message !== null) {
      // You can show a toast notification here
      dispatch(resetReturPembelianReportMessages());
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetReturPembelianReportMessages());
    }
  }, [message, errorMessage, errorCode, dispatch]);

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
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    dispatch(exportReturPembelianReportRequest(params));
  };

  const handlePrintClick = () => {
    // Create filter object for print function
    const filters = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    // Use current data for print
    printReturPembelianReport(returPembelianReport, filters);
  };

  const handleExportExcelClick = () => {
    // Create filter object for export function
    const filters = {
      ...(query && { search: query }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      // Try advanced Excel export with XLSX library
      const filename = exportReturPembelianToExcelAdvanced(
        returPembelianReport,
        filters,
        XLSX
      );
    } catch (error) {
      console.error("Error exporting Excel:", error);
      // Fallback to CSV export
      try {
        const filename = exportReturPembelianToExcel(
          returPembelianReport,
          filters
        );
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
      ...(selectedSupplierFilter !== 0 && { supplier: selectedSupplierFilter }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      const filename = exportReturPembelianToExcel(
        returPembelianReport,
        filters
      );
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
  };
  //#endregion

  return (
    <div className={styles.mainSection}>
      {loading && <Loading />}
      <div className={styles.actionsSection}>
        <CustomButton
          label="Print"
          onClick={handlePrintClick}
          disabled={loading || returPembelianReport.length === 0}
        />
        <CustomButton
          label="Export Excel"
          onClick={handleExportExcelClick}
          disabled={loading || returPembelianReport.length === 0}
        />
        <CustomButton
          label="Export CSV"
          onClick={handleExportCSVClick}
          disabled={loading || returPembelianReport.length === 0}
        />
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
          {returPembelianReport.length === 0 && !loading ? (
            <div className={styles.emptyState}>
              <p>Tidak ada data retur pembelian yang ditemukan</p>
            </div>
          ) : (
            returPembelianReport.map((item, index) => (
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

export default LaporanReturPembelian;
