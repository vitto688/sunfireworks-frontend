import apiClient from "./axios";

// API endpoints
const STOCK_IN_REPORT_ENDPOINT = "/report/stock-in/";

/**
 * Fetch mutasi barang pembelian report with pagination
 * @param {Object} params - Query parameters (page, supplier, warehouse, start_date, end_date, etc.)
 * @returns {Promise} API response
 */
export const fetchMutasiBarangPembelianReport = async (params = {}) => {
  try {
    const response = await apiClient.get(STOCK_IN_REPORT_ENDPOINT, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mutasi barang pembelian report:", error);
    throw error;
  }
};

/**
 * Fetch all mutasi barang pembelian report data (without pagination)
 * @param {Object} params - Query parameters (supplier, warehouse, start_date, end_date, etc.)
 * @returns {Promise} API response (array of data)
 */
export const fetchAllMutasiBarangPembelianReportData = async (params = {}) => {
  try {
    const queryParams = {
      ...params,
      paginate: false, // Ensure pagination is disabled
    };

    const response = await apiClient.get(STOCK_IN_REPORT_ENDPOINT, {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all mutasi barang pembelian report data:",
      error
    );
    throw error;
  }
};

/**
 * Export mutasi barang pembelian report
 * @param {Object} params - Query parameters for export
 * @returns {Promise} API response
 */
export const exportMutasiBarangPembelianReport = async (params = {}) => {
  try {
    const response = await apiClient.get(`${STOCK_IN_REPORT_ENDPOINT}export/`, {
      params,
      responseType: "blob", // Important for file download
    });
    return response;
  } catch (error) {
    console.error("Error exporting mutasi barang pembelian report:", error);
    throw error;
  }
};

const mutasiBarangPembelianAPI = {
  fetchMutasiBarangPembelianReport,
  fetchAllMutasiBarangPembelianReportData,
  exportMutasiBarangPembelianReport,
};

export default mutasiBarangPembelianAPI;
