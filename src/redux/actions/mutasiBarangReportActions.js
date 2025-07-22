// Mutasi Barang Report Actions

// Fetch Mutasi Barang Report Actions
export const fetchMutasiBarangReportRequest = (params = {}) => ({
  type: "FETCH_MUTASI_BARANG_REPORT_REQUEST",
  payload: { params },
});

export const fetchMutasiBarangReportSuccess = (data) => ({
  type: "FETCH_MUTASI_BARANG_REPORT_SUCCESS",
  payload: { data },
});

export const fetchMutasiBarangReportFailure = (error) => ({
  type: "FETCH_MUTASI_BARANG_REPORT_FAILURE",
  payload: { error },
});

// Export Mutasi Barang Report Actions
export const exportMutasiBarangReportRequest = (params = {}) => ({
  type: "EXPORT_MUTASI_BARANG_REPORT_REQUEST",
  payload: { params },
});

export const exportMutasiBarangReportSuccess = (data) => ({
  type: "EXPORT_MUTASI_BARANG_REPORT_SUCCESS",
  payload: { data },
});

export const exportMutasiBarangReportFailure = (error) => ({
  type: "EXPORT_MUTASI_BARANG_REPORT_FAILURE",
  payload: { error },
});

// Reset Mutasi Barang Report Messages
export const resetMutasiBarangReportMessages = () => ({
  type: "RESET_MUTASI_BARANG_REPORT_MESSAGES",
});

// Set Mutasi Barang Report Filters
export const setMutasiBarangReportFilters = (filters) => ({
  type: "SET_MUTASI_BARANG_REPORT_FILTERS",
  payload: { filters },
});

// Clear Mutasi Barang Report Data
export const clearMutasiBarangReportData = () => ({
  type: "CLEAR_MUTASI_BARANG_REPORT_DATA",
});
