/* eslint-disable no-unused-vars */

/*
EXPORT EXCEL SETUP:
- Export CSV: Works immediately (no dependencies required)
- Export Excel (Advanced): Uses XLSX library (now installed)
  
Both export options are now available and fully functional.
*/

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import Redux actions
import {
  fetchMutasiBarangPenjualanReportRequest,
  exportMutasiBarangPenjualanReportRequest,
  resetMutasiBarangPenjualanReportMessages,
  clearMutasiBarangPenjualanReportData,
} from "../../../../redux/actions/mutasiBarangPenjualanReportActions";
import {
  fetchCustomersRequest,
  fetchProductsRequest,
} from "../../../../redux/actions/masterActions";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import FilterDropdown from "../../../../components/FilterDropdown";
import DatePicker from "../../../../components/DatePicker";
import Loading from "../../../../components/Loading";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import ItemSearchDialog from "../../../../components/ItemSearchDialog";

// Import number formatting utility
import { formatNumberWithDot, formatDate } from "../../../../utils/numberUtils";

// Import print and export utilities
import {
  printMutasiBarangPenjualanReport,
  exportMutasiBarangPenjualanToExcel,
  exportMutasiBarangPenjualanToExcelAdvanced,
} from "../../../../utils/printMutasiBarangPenjualanReport";

// Import API function for fetching all data
import { fetchAllMutasiBarangPenjualanReportData } from "../../../../api/reportMutasiBarangPenjualan";

// Import XLSX for advanced Excel export
import * as XLSX from "xlsx";

// Define the path for the Laporan Mutasi Barang Penjualan page
export const LAPORAN_MUTASI_BARANG_PENJUALAN_PATH =
  "/laporan/mutasi-barang-penjualan";

const LaporanMutasiBarangPenjualan = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [localExportLoading, setLocalExportLoading] = useState(false);

  // Local filter states
  const [customerFilterOptions, setCustomerFilterOptions] = useState([]);
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux selectors
  const { customers, products } = useSelector((state) => state.master);

  const {
    mutasiBarangPenjualanReport,
    totalCount,
    totalPages,
    currentPage,
    loading,
    exportLoading,
    message,
    errorMessage,
    errorCode,
    filters,
  } = useSelector(
    (state) =>
      state.mutasiBarangPenjualanReport || {
        mutasiBarangPenjualanReport: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
        loading: false,
        exportLoading: false,
        message: null,
        errorMessage: null,
        errorCode: null,
        filters: {},
      }
  );

  //#region Helper Functions
  const fetchMutasiBarangPenjualanData = useCallback(
    (page) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedCustomerFilter !== 0 && {
          customer: selectedCustomerFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchMutasiBarangPenjualanReportRequest(params));
    },
    [
      dispatch,
      query,
      selectedCustomerFilter,
      selectedProduct,
      startDate,
      endDate,
    ]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = {
        page: newPage,
        ...(query && { search: query }),
        ...(selectedCustomerFilter !== 0 && {
          customer: selectedCustomerFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchMutasiBarangPenjualanReportRequest(params));
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Fetch customers and products data if not loaded
    if (customers.length === 0) {
      dispatch(fetchCustomersRequest());
    }
    if (products.length === 0) {
      dispatch(fetchProductsRequest());
    }

    // Reset messages when component mounts
    dispatch(resetMutasiBarangPenjualanReportMessages());

    // Load initial data
    fetchMutasiBarangPenjualanData(1);

    // Cleanup when component unmounts
    return () => {
      dispatch(clearMutasiBarangPenjualanReportData());
    };
  }, [
    dispatch,
    fetchMutasiBarangPenjualanData,
    customers.length,
    products.length,
  ]);

  useEffect(() => {
    // Handle success/error messages
    if (message !== null) {
      // You can show a toast notification here
      dispatch(resetMutasiBarangPenjualanReportMessages());
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetMutasiBarangPenjualanReportMessages());
    }
  }, [message, errorMessage, errorCode, dispatch]);

  useEffect(() => {
    if (customers.length > 0) {
      const options = [
        { label: "Semua Pelanggan", value: 0 },
        ...customers.map((customer) => ({
          label: customer.name,
          value: customer.id,
        })),
      ];
      setCustomerFilterOptions(options);
    }
  }, [customers]);

  //#endregion

  //#region Handlers
  // Product selection handlers
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductDialogOpen(false);
    // Trigger data refresh with new product filter
    fetchMutasiBarangPenjualanData(1);
  };

  const handleClearProductFilter = () => {
    setSelectedProduct(null);
    // Trigger data refresh without product filter
    fetchMutasiBarangPenjualanData(1);
  };
  const handleDownloadClick = () => {
    const params = {
      ...(query && { search: query }),
      ...(selectedCustomerFilter !== 0 && {
        customer: selectedCustomerFilter,
      }),
      ...(selectedProduct && { product: selectedProduct.id }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    dispatch(exportMutasiBarangPenjualanReportRequest(params));
  };

  const handlePrintClick = async () => {
    setPrintLoading(true);

    try {
      // Create filter object for API call
      const apiParams = {
        paginate: false,
        ...(query && { search: query }),
        ...(selectedCustomerFilter !== 0 && {
          customer: selectedCustomerFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Fetch all data from API
      const allData = await fetchAllMutasiBarangPenjualanReportData(apiParams);

      // Get selected customer name for display
      const selectedCustomer = customers.find(
        (customer) => customer.id === selectedCustomerFilter
      );
      const customerName = selectedCustomer ? selectedCustomer.name : null;

      // Get selected product name for display
      const productName = selectedProduct
        ? `${selectedProduct.code} - ${selectedProduct.name}`
        : null;

      // Create filter object for print function
      const filters = {
        ...(query && { search: query }),
        ...(customerName && { customer_name: customerName }),
        ...(productName && { product_name: productName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Use fetched data for print
      printMutasiBarangPenjualanReport(allData, filters);
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
      paginate: false,
      ...(query && { search: query }),
      ...(selectedCustomerFilter !== 0 && {
        customer: selectedCustomerFilter,
      }),
      ...(selectedProduct && { product: selectedProduct.id }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      // Fetch all data from API
      const allData = await fetchAllMutasiBarangPenjualanReportData(apiParams);

      // Get selected customer name for display
      const selectedCustomer = customers.find(
        (customer) => customer.id === selectedCustomerFilter
      );
      const customerName = selectedCustomer ? selectedCustomer.name : null;

      // Get selected product name for display
      const productName = selectedProduct
        ? `${selectedProduct.code} - ${selectedProduct.name}`
        : null;

      // Create filter object for export function
      const filters = {
        ...(query && { search: query }),
        ...(customerName && { customer_name: customerName }),
        ...(productName && { product_name: productName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Try advanced Excel export with XLSX library using fetched data
      const filename = exportMutasiBarangPenjualanToExcelAdvanced(
        allData,
        filters,
        XLSX
      );

      // You can add a toast notification here
      // showSuccessToast(`File ${filename} berhasil didownload`);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      // Fallback to CSV export
      try {
        const allData = await fetchAllMutasiBarangPenjualanReportData(
          apiParams
        );

        // Get selected customer name for display
        const selectedCustomer = customers.find(
          (customer) => customer.id === selectedCustomerFilter
        );
        const customerName = selectedCustomer ? selectedCustomer.name : null;

        // Get selected product name for display
        const productName = selectedProduct
          ? `${selectedProduct.code} - ${selectedProduct.name}`
          : null;

        const filters = {
          ...(query && { search: query }),
          ...(customerName && { customer_name: customerName }),
          ...(productName && { product_name: productName }),
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate }),
        };
        const filename = exportMutasiBarangPenjualanToExcel(allData, filters); // You can add a toast notification here
        // showSuccessToast(`File CSV ${filename} berhasil didownload`);
      } catch (csvError) {
        console.error("Error exporting CSV:", csvError);
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
        paginate: false,
        ...(query && { search: query }),
        ...(selectedCustomerFilter !== 0 && {
          customer: selectedCustomerFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Fetch all data from API
      const allData = await fetchAllMutasiBarangPenjualanReportData(apiParams);

      // Get selected customer name for display
      const selectedCustomer = customers.find(
        (customer) => customer.id === selectedCustomerFilter
      );
      const customerName = selectedCustomer ? selectedCustomer.name : null;

      // Get selected product name for display
      const productName = selectedProduct
        ? `${selectedProduct.code} - ${selectedProduct.name}`
        : null;

      // Create filter object for export function
      const filters = {
        ...(query && { search: query }),
        ...(customerName && { customer_name: customerName }),
        ...(productName && { product_name: productName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Export as CSV
      const filename = exportMutasiBarangPenjualanToExcel(allData, filters);

      // You can add a toast notification here
      // showSuccessToast(`File CSV ${filename} berhasil didownload`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Gagal mengexport data. Silakan coba lagi.");
    } finally {
      setLocalExportLoading(false);
    }
  };

  const handleDelete = (value) => {
    // Implement delete functionality if needed
  };

  const handleItemClick = (value) => {
    // Implement item click functionality if needed
  };
  //#endregion

  return (
    <div className={styles.mutasiMasukSection}>
      {(loading || printLoading || localExportLoading) && <Loading />}

      <div className={styles.actionsSection}>
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export Excel"}
          onClick={handleExportExcelClick}
          disabled={
            loading ||
            mutasiBarangPenjualanReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export CSV"}
          onClick={handleExportCSVClick}
          disabled={
            loading ||
            mutasiBarangPenjualanReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={printLoading ? "Printing..." : "Print"}
          onClick={handlePrintClick}
          disabled={
            loading ||
            mutasiBarangPenjualanReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
      </div>

      <div className={styles.searchFilterSection}>
        <div className={styles.searchSection}>
          {/* <SearchBar
            placeholder="Cari berdasarkan nama produk, kode pelanggan..."
            value={query}
            onChange={setQuery}
          /> */}
        </div>
        <div className={styles.filterSection}>
          <DatePicker
            label="Dari"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            label="Sampai"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <FilterDropdown
            label="Pelanggan"
            value={selectedCustomerFilter}
            options={customerFilterOptions}
            onChange={(selectedOption) =>
              setSelectedCustomerFilter(selectedOption.value)
            }
          />
          <div className={styles.productFilterContainer}>
            <label className={styles.filterLabel}>Produk</label>
            <div className={styles.productFilterButtons}>
              <button
                onClick={() => {
                  console.log("open dialog", products);
                  setProductDialogOpen(true);
                }}
                className={styles.productSelectButton}
              >
                {selectedProduct
                  ? `${selectedProduct.code} - ${selectedProduct.name}`
                  : "Pilih Produk"}
              </button>
              {selectedProduct && (
                <CustomButton
                  label="✕"
                  onClick={handleClearProductFilter}
                  className={styles.productClearButton}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mutasiMasukTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Total Carton</div>
          <div className={styles.tableHeaderItem}>Total Pack</div>
        </div>

        <div className={styles.tableBody}>
          {mutasiBarangPenjualanReport &&
          mutasiBarangPenjualanReport.length > 0 ? (
            mutasiBarangPenjualanReport.map((item, index) => (
              <div
                role="presentation"
                key={`${item.product_code}-${index}`}
                className={styles.tableRow}
                onClick={() => handleItemClick(item)}
              >
                <div className={styles.tableRowItem}>
                  {(currentPage - 1) * 10 + index + 1}
                </div>
                <div className={styles.tableRowItem}>{item.product_code}</div>
                <div className={styles.tableRowItem}>{item.product_name}</div>
                <div className={styles.tableRowItem}>{item.packing}</div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.total_carton_quantity)}
                </div>
                <div className={styles.tableRowItem}>
                  {formatNumberWithDot(item.total_pack_quantity)}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Tidak ada data mutasi barang penjualan yang ditemukan</p>
            </div>
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
        onConfirm={() => {
          // Implement confirm delete
          setModalOpen(false);
        }}
      />

      <ItemSearchDialog
        title="Pilih Produk"
        data={products}
        isOpen={productDialogOpen}
        onClose={() => setProductDialogOpen(false)}
        onSelect={handleProductSelect}
      />
    </div>
  );
};

export default LaporanMutasiBarangPenjualan;
