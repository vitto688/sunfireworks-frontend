// Mutasi Barang Pembelian Report Actions

//#region Fetch Mutasi Barang Pembelian Report
export const fetchMutasiBarangPembelianReportRequest = (params) => ({
  type: "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_REQUEST",
  payload: params,
});

export const fetchMutasiBarangPembelianReportSuccess = (data) => ({
  type: "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_SUCCESS",
  payload: data,
});

export const fetchMutasiBarangPembelianReportFailure = (error) => ({
  type: "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_FAILURE",
  payload: error,
});
//#endregion

//#region Export Mutasi Barang Pembelian Report
export const exportMutasiBarangPembelianReportRequest = (params) => ({
  type: "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_REQUEST",
  payload: params,
});

export const exportMutasiBarangPembelianReportSuccess = (data) => ({
  type: "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_SUCCESS",
  payload: data,
});

export const exportMutasiBarangPembelianReportFailure = (error) => ({
  type: "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_FAILURE",
  payload: error,
});
//#endregion

//#region Utility Actions
export const resetMutasiBarangPembelianReportMessages = () => ({
  type: "RESET_MUTASI_BARANG_PEMBELIAN_REPORT_MESSAGES",
});

export const clearMutasiBarangPembelianReportData = () => ({
  type: "CLEAR_MUTASI_BARANG_PEMBELIAN_REPORT_DATA",
});

export const setMutasiBarangPembelianReportFilters = (filters) => ({
  type: "SET_MUTASI_BARANG_PEMBELIAN_REPORT_FILTERS",
  payload: filters,
});
//#endregion
