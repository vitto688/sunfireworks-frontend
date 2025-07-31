import axios from "./axios";

// Fetch retur penjualan report with pagination and filters
export const fetchReturPenjualanReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/retur-penjualan/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export retur penjualan report data
export const exportReturPenjualanReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/retur-penjualan/export/", {
      params,
      responseType: "blob", // For file download
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
