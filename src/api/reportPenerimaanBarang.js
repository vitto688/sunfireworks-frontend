import axios from "./axios";

// Fetch penerimaan barang report with pagination and filters
export const fetchPenerimaanBarangReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/penerimaan-barang/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export penerimaan barang report data
export const exportPenerimaanBarangReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/penerimaan-barang/export/", {
      params,
      responseType: "blob", // For file download
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
