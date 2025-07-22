// Action Types
export const FETCH_REPORT_PENGELUARAN_BARANG_REQUEST =
  "FETCH_REPORT_PENGELUARAN_BARANG_REQUEST";
export const FETCH_REPORT_PENGELUARAN_BARANG_SUCCESS =
  "FETCH_REPORT_PENGELUARAN_BARANG_SUCCESS";
export const FETCH_REPORT_PENGELUARAN_BARANG_FAILURE =
  "FETCH_REPORT_PENGELUARAN_BARANG_FAILURE";

export const EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST =
  "EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST";
export const EXPORT_REPORT_PENGELUARAN_BARANG_SUCCESS =
  "EXPORT_REPORT_PENGELUARAN_BARANG_SUCCESS";
export const EXPORT_REPORT_PENGELUARAN_BARANG_FAILURE =
  "EXPORT_REPORT_PENGELUARAN_BARANG_FAILURE";

export const RESET_REPORT_PENGELUARAN_BARANG_MESSAGES =
  "RESET_REPORT_PENGELUARAN_BARANG_MESSAGES";
export const SET_REPORT_PENGELUARAN_BARANG_FILTERS =
  "SET_REPORT_PENGELUARAN_BARANG_FILTERS";
export const CLEAR_REPORT_PENGELUARAN_BARANG_DATA =
  "CLEAR_REPORT_PENGELUARAN_BARANG_DATA";

// Action Creators
export const fetchReportPengeluaranBarangRequest = (params) => ({
  type: FETCH_REPORT_PENGELUARAN_BARANG_REQUEST,
  payload: params,
});

export const fetchReportPengeluaranBarangSuccess = (data) => ({
  type: FETCH_REPORT_PENGELUARAN_BARANG_SUCCESS,
  payload: data,
});

export const fetchReportPengeluaranBarangFailure = (error) => ({
  type: FETCH_REPORT_PENGELUARAN_BARANG_FAILURE,
  payload: error,
});

export const exportReportPengeluaranBarangRequest = (params) => ({
  type: EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST,
  payload: params,
});

export const exportReportPengeluaranBarangSuccess = (data) => ({
  type: EXPORT_REPORT_PENGELUARAN_BARANG_SUCCESS,
  payload: data,
});

export const exportReportPengeluaranBarangFailure = (error) => ({
  type: EXPORT_REPORT_PENGELUARAN_BARANG_FAILURE,
  payload: error,
});

export const resetReportPengeluaranBarangMessages = () => ({
  type: RESET_REPORT_PENGELUARAN_BARANG_MESSAGES,
});

export const setReportPengeluaranBarangFilters = (filters) => ({
  type: SET_REPORT_PENGELUARAN_BARANG_FILTERS,
  payload: filters,
});

export const clearReportPengeluaranBarangData = () => ({
  type: CLEAR_REPORT_PENGELUARAN_BARANG_DATA,
});
