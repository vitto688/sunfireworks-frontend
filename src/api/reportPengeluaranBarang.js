import axios from "./axios";

// Fetch pengeluaran barang report with pagination and filters
export const fetchPengeluaranBarangReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/pengeluaran-barang/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export pengeluaran barang report data
export const exportPengeluaranBarangReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/pengeluaran-barang/export/", {
      params,
      responseType: "blob", // For file download
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
