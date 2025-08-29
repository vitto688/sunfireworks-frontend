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
  fetchMutasiBarangPembelianReportRequest,
  exportMutasiBarangPembelianReportRequest,
  resetMutasiBarangPembelianReportMessages,
  clearMutasiBarangPembelianReportData,
} from "../../../../redux/actions/mutasiBarangPembelianReportActions";
import {
  fetchSuppliersRequest,
  fetchWarehousesRequest,
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
  printMutasiBarangPembelianReport,
  exportMutasiBarangPembelianToExcel,
  exportMutasiBarangPembelianToExcelAdvanced,
} from "../../../../utils/printMutasiBarangPembelianReport";

// Import API function for fetching all data
import { fetchAllMutasiBarangPembelianReportData } from "../../../../api/reportMutasiBarangPembelian";

// Import XLSX for advanced Excel export
import * as XLSX from "xlsx";

// Define the path for the Laporan Mutasi Barang Pembelian page
export const LAPORAN_MUTASI_BARANG_PEMBELIAN_PATH =
  "/dashboard/laporan-mutasi-barang-pembelian";

const LaporanMutasiBarangPembelian = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [localExportLoading, setLocalExportLoading] = useState(false);

  // Local filter states
  const [supplierFilterOptions, setSupplierFilterOptions] = useState([]);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState(0);
  const [warehouseFilterOptions, setWarehouseFilterOptions] = useState([]);
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux selectors
  const { suppliers, warehouses, products } = useSelector(
    (state) => state.master
  );

  const {
    data: mutasiBarangPembelianReport,
    loading,
    error,
    successMessage,
    pagination,
    filters,
    exporting: exportLoading,
    exportError,
    exportSuccess,
  } = useSelector(
    (state) =>
      state.mutasiBarangPembelianReport || {
        data: [],
        loading: false,
        error: null,
        successMessage: null,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10,
        },
        filters: {
          supplier_id: "",
          warehouse_id: "",
          start_date: "",
          end_date: "",
          search: "",
        },
        exporting: false,
        exportError: null,
        exportSuccess: null,
      }
  );

  // Extract pagination values
  const { currentPage, totalPages, totalItems: totalCount } = pagination;

  //#region Helper Functions
  const fetchMutasiBarangPembelianData = useCallback(
    (page) => {
      const params = {
        page,
        ...(query && { search: query }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchMutasiBarangPembelianReportRequest(params));
    },
    [
      dispatch,
      query,
      selectedSupplierFilter,
      selectedWarehouseFilter,
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
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      dispatch(fetchMutasiBarangPembelianReportRequest(params));
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    // Fetch suppliers data if not loaded
    if (suppliers.length === 0) {
      dispatch(fetchSuppliersRequest());
    }

    // Fetch warehouses data if not loaded
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesRequest());
    }

    // Fetch products data if not loaded
    if (products.length === 0) {
      dispatch(fetchProductsRequest());
    }

    // Reset messages when component mounts
    dispatch(resetMutasiBarangPembelianReportMessages());

    // Load initial data
    fetchMutasiBarangPembelianData(1);

    // Cleanup when component unmounts
    return () => {
      dispatch(clearMutasiBarangPembelianReportData());
    };
  }, [
    dispatch,
    fetchMutasiBarangPembelianData,
    suppliers.length,
    warehouses.length,
    products.length,
  ]);

  useEffect(() => {
    // Handle success/error messages
    if (successMessage !== null) {
      // You can show a toast notification here
      dispatch(resetMutasiBarangPembelianReportMessages());
    }

    if (error !== null) {
      alert(`${error}`);
      dispatch(resetMutasiBarangPembelianReportMessages());
    }

    if (exportSuccess !== null) {
      // Show success message for export
      dispatch(resetMutasiBarangPembelianReportMessages());
    }

    if (exportError !== null) {
      alert(`Export error: ${exportError}`);
      dispatch(resetMutasiBarangPembelianReportMessages());
    }
  }, [successMessage, error, exportSuccess, exportError, dispatch]);

  useEffect(() => {
    if (suppliers.length > 0) {
      const options = [
        { label: "Semua Supplier", value: 0 },
        ...suppliers.map((supplier) => ({
          label: supplier.name,
          value: supplier.id,
        })),
      ];
      setSupplierFilterOptions(options);
    }
  }, [suppliers]);

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

  //#endregion

  //#region Handlers
  // Product selection handlers
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductDialogOpen(false);
    // Trigger data refresh with new product filter
    fetchMutasiBarangPembelianData(1);
  };

  const handleClearProductFilter = () => {
    setSelectedProduct(null);
    // Trigger data refresh without product filter
    fetchMutasiBarangPembelianData(1);
  };

  const handleDownloadClick = () => {
    const params = {
      ...(query && { search: query }),
      ...(selectedSupplierFilter !== 0 && {
        supplier: selectedSupplierFilter,
      }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedProduct && { product: selectedProduct.id }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    dispatch(exportMutasiBarangPembelianReportRequest(params));
  };

  const handlePrintClick = async () => {
    setPrintLoading(true);

    try {
      // Create filter object for API call
      const apiParams = {
        paginate: false,
        ...(query && { search: query }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Fetch all data from API
      const allData = await fetchAllMutasiBarangPembelianReportData(apiParams);

      // Create filter object for print function
      const selectedSupplier = supplierFilterOptions.find(
        (s) => s.value === selectedSupplierFilter
      );
      const selectedWarehouse = warehouseFilterOptions.find(
        (w) => w.value === selectedWarehouseFilter
      );

      // Get selected product name for display
      const productName = selectedProduct
        ? `${selectedProduct.code} - ${selectedProduct.name}`
        : null;

      const filters = {
        ...(query && { search: query }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
          supplier_name: selectedSupplier?.label,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
          warehouse_name: selectedWarehouse?.label,
        }),
        ...(productName && { product_name: productName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Use fetched data for print
      printMutasiBarangPembelianReport(allData, filters);
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
      ...(selectedSupplierFilter !== 0 && {
        supplier: selectedSupplierFilter,
      }),
      ...(selectedWarehouseFilter !== 0 && {
        warehouse: selectedWarehouseFilter,
      }),
      ...(selectedProduct && { product: selectedProduct.id }),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    };

    try {
      // Fetch all data from API
      const allData = await fetchAllMutasiBarangPembelianReportData(apiParams);

      // Create filter object for export function
      const selectedSupplier = supplierFilterOptions.find(
        (s) => s.value === selectedSupplierFilter
      );
      const selectedWarehouse = warehouseFilterOptions.find(
        (w) => w.value === selectedWarehouseFilter
      );

      // Get selected product name for display
      const productName = selectedProduct
        ? `${selectedProduct.code} - ${selectedProduct.name}`
        : null;

      const filters = {
        ...(query && { search: query }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
          supplier_name: selectedSupplier?.label,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
          warehouse_name: selectedWarehouse?.label,
        }),
        ...(productName && { product_name: productName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Try Excel export using XLSX library with fetched data
      const filename = exportMutasiBarangPembelianToExcelAdvanced(
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
        const allData = await fetchAllMutasiBarangPembelianReportData(
          apiParams
        );
        const filters = {
          ...(query && { search: query }),
          ...(selectedSupplierFilter !== 0 && {
            supplier: selectedSupplierFilter,
          }),
          ...(selectedWarehouseFilter !== 0 && {
            warehouse: selectedWarehouseFilter,
          }),
          ...(selectedProduct && { product: selectedProduct.id }),
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate }),
        };
        const filename = exportMutasiBarangPembelianToExcel(allData, filters);

        // You can add a toast notification here
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
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
        }),
        ...(selectedProduct && { product: selectedProduct.id }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Fetch all data from API
      const allData = await fetchAllMutasiBarangPembelianReportData(apiParams);

      // Create filter object for export function
      const selectedSupplier = supplierFilterOptions.find(
        (s) => s.value === selectedSupplierFilter
      );
      const selectedWarehouse = warehouseFilterOptions.find(
        (w) => w.value === selectedWarehouseFilter
      );

      // Get selected product name for display
      const productName = selectedProduct
        ? `${selectedProduct.code} - ${selectedProduct.name}`
        : null;

      const filters = {
        ...(query && { search: query }),
        ...(selectedSupplierFilter !== 0 && {
          supplier: selectedSupplierFilter,
          supplier_name: selectedSupplier?.label,
        }),
        ...(selectedWarehouseFilter !== 0 && {
          warehouse: selectedWarehouseFilter,
          warehouse_name: selectedWarehouse?.label,
        }),
        ...(productName && { product_name: productName }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };

      // Export as CSV
      const filename = exportMutasiBarangPembelianToExcel(allData, filters);

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
            mutasiBarangPembelianReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={localExportLoading ? "Exporting..." : "Export CSV"}
          onClick={handleExportCSVClick}
          disabled={
            loading ||
            mutasiBarangPembelianReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
        <CustomButton
          label={printLoading ? "Printing..." : "Print"}
          onClick={handlePrintClick}
          disabled={
            loading ||
            mutasiBarangPembelianReport.length === 0 ||
            localExportLoading ||
            printLoading
          }
        />
      </div>

      <div className={styles.searchFilterSection}>
        <div className={styles.searchSection}>
          {/* <SearchBar
            placeholder="Cari berdasarkan nama produk, kode supplier..."
            value={query}
            onChange={setQuery}
          /> */}
        </div>
        <div className={styles.filterSection}>
          <div className={styles.productFilterContainer}>
            <label className={styles.filterLabel}>Produk</label>
            <div className={styles.productFilterButtons}>
              <button
                onClick={() => setProductDialogOpen(true)}
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
            label="Supplier"
            value={selectedSupplierFilter}
            options={supplierFilterOptions}
            onChange={(selectedOption) =>
              setSelectedSupplierFilter(selectedOption.value)
            }
          />
          <FilterDropdown
            label="Gudang"
            value={selectedWarehouseFilter}
            options={warehouseFilterOptions}
            onChange={(selectedOption) =>
              setSelectedWarehouseFilter(selectedOption.value)
            }
          />
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
          {mutasiBarangPembelianReport &&
          mutasiBarangPembelianReport.length > 0 ? (
            mutasiBarangPembelianReport.map((item, index) => (
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
              <p>Tidak ada data mutasi barang pembelian yang ditemukan</p>
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

export default LaporanMutasiBarangPembelian;
