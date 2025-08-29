import apiClient from "./axios";

// API endpoints
const STOCK_OUT_REPORT_ENDPOINT = "/report/stock-out/";

/**
 * Fetch mutasi barang penjualan report with pagination
 * @param {Object} params - Query parameters (page, customer, start_date, end_date, etc.)
 * @returns {Promise} API response
 */
export const fetchMutasiBarangPenjualanReport = async (params = {}) => {
  try {
    const response = await apiClient.get(STOCK_OUT_REPORT_ENDPOINT, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mutasi barang penjualan report:", error);
    throw error;
  }
};

/**
 * Fetch all mutasi barang penjualan report data (without pagination)
 * @param {Object} params - Query parameters (customer, start_date, end_date, etc.)
 * @returns {Promise} API response (array of data)
 */
export const fetchAllMutasiBarangPenjualanReportData = async (params = {}) => {
  try {
    const queryParams = {
      ...params,
      paginate: false, // Ensure pagination is disabled
    };

    const response = await apiClient.get(STOCK_OUT_REPORT_ENDPOINT, {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all mutasi barang penjualan report data:",
      error
    );
    throw error;
  }
};

/**
 * Export mutasi barang penjualan report
 * @param {Object} params - Query parameters for export
 * @returns {Promise} API response
 */
export const exportMutasiBarangPenjualanReport = async (params = {}) => {
  try {
    const response = await apiClient.get(
      `${STOCK_OUT_REPORT_ENDPOINT}export/`,
      {
        params,
        responseType: "blob", // Important for file download
      }
    );
    return response;
  } catch (error) {
    console.error("Error exporting mutasi barang penjualan report:", error);
    throw error;
  }
};

const mutasiBarangPenjualanAPI = {
  fetchMutasiBarangPenjualanReport,
  fetchAllMutasiBarangPenjualanReportData,
  exportMutasiBarangPenjualanReport,
};

export default mutasiBarangPenjualanAPI;
