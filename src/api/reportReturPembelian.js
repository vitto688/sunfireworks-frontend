import axios from "./axios";

// Fetch retur pembelian report with pagination and filters
export const fetchReturPembelianReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/retur-pembelian/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export retur pembelian report data
export const exportReturPembelianReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/retur-pembelian/export/", {
      params,
      responseType: "blob", // For file download
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch all retur pembelian report data for print/export (without pagination)
export const fetchAllReturPembelianReportData = async (params = {}) => {
  try {
    // Remove page parameter and add paginate=false to get all data
    const { page, ...otherParams } = params;
    const response = await axios.get("/report/retur-pembelian/", {
      params: {
        ...otherParams,
        paginate: false, // Use paginate=false to get all data
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
