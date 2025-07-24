// Pengeluaran Barang Report Actions

// Fetch Pengeluaran Barang Report Actions
export const fetchPengeluaranBarangReportRequest = (params = {}) => ({
  type: "FETCH_PENGELUARAN_BARANG_REPORT_REQUEST",
  payload: { params },
});

export const fetchPengeluaranBarangReportSuccess = (data) => ({
  type: "FETCH_PENGELUARAN_BARANG_REPORT_SUCCESS",
  payload: { data },
});

export const fetchPengeluaranBarangReportFailure = (error) => ({
  type: "FETCH_PENGELUARAN_BARANG_REPORT_FAILURE",
  payload: { error },
});

export const fetchPengeluaranBarangReportNPRequest = (params = {}) => ({
  type: "FETCH_PENGELUARAN_BARANG_REPORT_NP_REQUEST",
  payload: { params },
});

export const fetchPengeluaranBarangReportNPSuccess = (data) => ({
  type: "FETCH_PENGELUARAN_BARANG_REPORT_NP_SUCCESS",
  payload: { data },
});

export const fetchPengeluaranBarangReportNPFailure = (error) => ({
  type: "FETCH_PENGELUARAN_BARANG_REPORT_NP_FAILURE",
  payload: { error },
});

// Export Pengeluaran Barang Report Actions
export const exportPengeluaranBarangReportRequest = (params = {}) => ({
  type: "EXPORT_PENGELUARAN_BARANG_REPORT_REQUEST",
  payload: { params },
});

export const exportPengeluaranBarangReportSuccess = (data) => ({
  type: "EXPORT_PENGELUARAN_BARANG_REPORT_SUCCESS",
  payload: { data },
});

export const exportPengeluaranBarangReportFailure = (error) => ({
  type: "EXPORT_PENGELUARAN_BARANG_REPORT_FAILURE",
  payload: { error },
});

// Reset Pengeluaran Barang Report Messages
export const resetPengeluaranBarangReportMessages = () => ({
  type: "RESET_PENGELUARAN_BARANG_REPORT_MESSAGES",
});

// Set Pengeluaran Barang Report Filters
export const setPengeluaranBarangReportFilters = (filters) => ({
  type: "SET_PENGELUARAN_BARANG_REPORT_FILTERS",
  payload: { filters },
});

// Clear Pengeluaran Barang Report Data
export const clearPengeluaranBarangReportData = () => ({
  type: "CLEAR_PENGELUARAN_BARANG_REPORT_DATA",
});
