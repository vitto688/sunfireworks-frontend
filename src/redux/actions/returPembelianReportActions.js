// Retur Pembelian Report Actions

// Fetch Retur Pembelian Report Actions
export const fetchReturPembelianReportRequest = (params = {}) => ({
  type: "FETCH_RETUR_PEMBELIAN_REPORT_REQUEST",
  payload: { params },
});

export const fetchReturPembelianReportSuccess = (data) => ({
  type: "FETCH_RETUR_PEMBELIAN_REPORT_SUCCESS",
  payload: { data },
});

export const fetchReturPembelianReportFailure = (error) => ({
  type: "FETCH_RETUR_PEMBELIAN_REPORT_FAILURE",
  payload: { error },
});

// Export Retur Pembelian Report Actions
export const exportReturPembelianReportRequest = (params = {}) => ({
  type: "EXPORT_RETUR_PEMBELIAN_REPORT_REQUEST",
  payload: { params },
});

export const exportReturPembelianReportSuccess = (data) => ({
  type: "EXPORT_RETUR_PEMBELIAN_REPORT_SUCCESS",
  payload: { data },
});

export const exportReturPembelianReportFailure = (error) => ({
  type: "EXPORT_RETUR_PEMBELIAN_REPORT_FAILURE",
  payload: { error },
});

// Reset Retur Pembelian Report Messages
export const resetReturPembelianReportMessages = () => ({
  type: "RESET_RETUR_PEMBELIAN_REPORT_MESSAGES",
});

// Set Retur Pembelian Report Filters
export const setReturPembelianReportFilters = (filters) => ({
  type: "SET_RETUR_PEMBELIAN_REPORT_FILTERS",
  payload: { filters },
});

// Clear Retur Pembelian Report Data
export const clearReturPembelianReportData = () => ({
  type: "CLEAR_RETUR_PEMBELIAN_REPORT_DATA",
});
