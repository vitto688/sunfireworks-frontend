import axios from "./axios";

// Fetch mutasi barang report with pagination and filters
export const fetchMutasiBarangReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/stock-transfer/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export mutasi barang report data
export const exportMutasiBarangReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/stock-transfer/export/", {
      params,
      responseType: "blob", // For file download
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
