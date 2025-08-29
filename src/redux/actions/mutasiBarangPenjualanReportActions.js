// Mutasi Barang Penjualan Report Actions

//#region Fetch Mutasi Barang Penjualan Report
export const fetchMutasiBarangPenjualanReportRequest = (params) => ({
  type: "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_REQUEST",
  payload: params,
});

export const fetchMutasiBarangPenjualanReportSuccess = (data) => ({
  type: "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_SUCCESS",
  payload: data,
});

export const fetchMutasiBarangPenjualanReportFailure = (error) => ({
  type: "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_FAILURE",
  payload: error,
});
//#endregion

//#region Export Mutasi Barang Penjualan Report
export const exportMutasiBarangPenjualanReportRequest = (params) => ({
  type: "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_REQUEST",
  payload: params,
});

export const exportMutasiBarangPenjualanReportSuccess = (data) => ({
  type: "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_SUCCESS",
  payload: data,
});

export const exportMutasiBarangPenjualanReportFailure = (error) => ({
  type: "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_FAILURE",
  payload: error,
});
//#endregion

//#region Utility Actions
export const resetMutasiBarangPenjualanReportMessages = () => ({
  type: "RESET_MUTASI_BARANG_PENJUALAN_REPORT_MESSAGES",
});

export const clearMutasiBarangPenjualanReportData = () => ({
  type: "CLEAR_MUTASI_BARANG_PENJUALAN_REPORT_DATA",
});

export const setMutasiBarangPenjualanReportFilters = (filters) => ({
  type: "SET_MUTASI_BARANG_PENJUALAN_REPORT_FILTERS",
  payload: filters,
});
//#endregion
