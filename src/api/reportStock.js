import axios from "./axios";

// Fetch stock report with pagination and filters
export const fetchStockReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/stock-info/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export stock report data
export const exportStockReport = async (params = {}) => {
  try {
    const response = await axios.get("/report/stock-info/export/", {
      params,
      responseType: "blob", // For file download
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch all stock report data for print/export (without pagination)
export const fetchAllStockReportData = async (params = {}) => {
  try {
    // Remove page parameter and add paginate=false to get all data
    const { page, ...otherParams } = params;
    const response = await axios.get("/report/stock-info/", {
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
