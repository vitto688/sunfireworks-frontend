// Retur Penjualan Report Actions

// Fetch Retur Penjualan Report Actions
export const fetchReturPenjualanReportRequest = (params = {}) => ({
  type: "FETCH_RETUR_PENJUALAN_REPORT_REQUEST",
  payload: { params },
});

export const fetchReturPenjualanReportSuccess = (data) => ({
  type: "FETCH_RETUR_PENJUALAN_REPORT_SUCCESS",
  payload: { data },
});

export const fetchReturPenjualanReportFailure = (error) => ({
  type: "FETCH_RETUR_PENJUALAN_REPORT_FAILURE",
  payload: { error },
});

export const fetchReturPenjualanReportNPRequest = (params = {}) => ({
  type: "FETCH_RETUR_PENJUALAN_REPORT_NP_REQUEST",
  payload: { params },
});

export const fetchReturPenjualanReportNPSuccess = (data) => ({
  type: "FETCH_RETUR_PENJUALAN_REPORT_NP_SUCCESS",
  payload: { data },
});

export const fetchReturPenjualanReportNPFailure = (error) => ({
  type: "FETCH_RETUR_PENJUALAN_REPORT_NP_FAILURE",
  payload: { error },
});

// Export Retur Penjualan Report Actions
export const exportReturPenjualanReportRequest = (params = {}) => ({
  type: "EXPORT_RETUR_PENJUALAN_REPORT_REQUEST",
  payload: { params },
});

export const exportReturPenjualanReportSuccess = (data) => ({
  type: "EXPORT_RETUR_PENJUALAN_REPORT_SUCCESS",
  payload: { data },
});

export const exportReturPenjualanReportFailure = (error) => ({
  type: "EXPORT_RETUR_PENJUALAN_REPORT_FAILURE",
  payload: { error },
});

// Reset Retur Penjualan Report Messages
export const resetReturPenjualanReportMessages = () => ({
  type: "RESET_RETUR_PENJUALAN_REPORT_MESSAGES",
});

// Set Retur Penjualan Report Filters
export const setReturPenjualanReportFilters = (filters) => ({
  type: "SET_RETUR_PENJUALAN_REPORT_FILTERS",
  payload: { filters },
});

// Clear Retur Penjualan Report Data
export const clearReturPenjualanReportData = () => ({
  type: "CLEAR_RETUR_PENJUALAN_REPORT_DATA",
});
