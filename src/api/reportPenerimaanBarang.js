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

// Fetch all penerimaan barang report data (no pagination) for print/export
export const fetchAllPenerimaanBarangReportData = async (params = {}) => {
  try {
    const response = await axios.get("/report/penerimaan-barang/", {
      params: {
        ...params,
        paginate: false, // Fetch all data without pagination
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
