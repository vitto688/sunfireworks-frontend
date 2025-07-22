// Penerimaan Barang Report Actions

// Fetch Penerimaan Barang Report Actions
export const fetchPenerimaanBarangReportRequest = (params = {}) => ({
  type: "FETCH_PENERIMAAN_BARANG_REPORT_REQUEST",
  payload: { params },
});

export const fetchPenerimaanBarangReportSuccess = (data) => ({
  type: "FETCH_PENERIMAAN_BARANG_REPORT_SUCCESS",
  payload: { data },
});

export const fetchPenerimaanBarangReportFailure = (error) => ({
  type: "FETCH_PENERIMAAN_BARANG_REPORT_FAILURE",
  payload: { error },
});

// Export Penerimaan Barang Report Actions
export const exportPenerimaanBarangReportRequest = (params = {}) => ({
  type: "EXPORT_PENERIMAAN_BARANG_REPORT_REQUEST",
  payload: { params },
});

export const exportPenerimaanBarangReportSuccess = (data) => ({
  type: "EXPORT_PENERIMAAN_BARANG_REPORT_SUCCESS",
  payload: { data },
});

export const exportPenerimaanBarangReportFailure = (error) => ({
  type: "EXPORT_PENERIMAAN_BARANG_REPORT_FAILURE",
  payload: { error },
});

// Reset Penerimaan Barang Report Messages
export const resetPenerimaanBarangReportMessages = () => ({
  type: "RESET_PENERIMAAN_BARANG_REPORT_MESSAGES",
});

// Set Penerimaan Barang Report Filters
export const setPenerimaanBarangReportFilters = (filters) => ({
  type: "SET_PENERIMAAN_BARANG_REPORT_FILTERS",
  payload: { filters },
});

// Clear Penerimaan Barang Report Data
export const clearPenerimaanBarangReportData = () => ({
  type: "CLEAR_PENERIMAAN_BARANG_REPORT_DATA",
});
