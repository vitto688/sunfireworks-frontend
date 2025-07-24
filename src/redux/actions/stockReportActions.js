// Stock Report Actions

// Fetch Stock Report Actions
export const fetchStockReportRequest = (params = {}) => ({
  type: "FETCH_STOCK_REPORT_REQUEST",
  payload: { params },
});

export const fetchStockReportSuccess = (data) => ({
  type: "FETCH_STOCK_REPORT_SUCCESS",
  payload: { data },
});

export const fetchStockReportFailure = (error) => ({
  type: "FETCH_STOCK_REPORT_FAILURE",
  payload: { error },
});

export const fetchStockReportNPRequest = (params = {}) => ({
  type: "FETCH_STOCK_REPORT_NP_REQUEST",
  payload: { params },
});

export const fetchStockReportNPSuccess = (data) => ({
  type: "FETCH_STOCK_REPORT_NP_SUCCESS",
  payload: { data },
});

export const fetchStockReportNPFailure = (error) => ({
  type: "FETCH_STOCK_REPORT_NP_FAILURE",
  payload: { error },
});

// Export Stock Report Actions
export const exportStockReportRequest = (params = {}) => ({
  type: "EXPORT_STOCK_REPORT_REQUEST",
  payload: { params },
});

export const exportStockReportSuccess = (data) => ({
  type: "EXPORT_STOCK_REPORT_SUCCESS",
  payload: { data },
});

export const exportStockReportFailure = (error) => ({
  type: "EXPORT_STOCK_REPORT_FAILURE",
  payload: { error },
});

// Reset Stock Report Messages
export const resetStockReportMessages = () => ({
  type: "RESET_STOCK_REPORT_MESSAGES",
});

// Set Stock Report Filters
export const setStockReportFilters = (filters) => ({
  type: "SET_STOCK_REPORT_FILTERS",
  payload: { filters },
});

// Clear Stock Report Data
export const clearStockReportData = () => ({
  type: "CLEAR_STOCK_REPORT_DATA",
});
