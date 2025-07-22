import {
  FETCH_REPORT_PENGELUARAN_BARANG_REQUEST,
  FETCH_REPORT_PENGELUARAN_BARANG_SUCCESS,
  FETCH_REPORT_PENGELUARAN_BARANG_FAILURE,
  EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST,
  EXPORT_REPORT_PENGELUARAN_BARANG_SUCCESS,
  EXPORT_REPORT_PENGELUARAN_BARANG_FAILURE,
  RESET_REPORT_PENGELUARAN_BARANG_MESSAGES,
  SET_REPORT_PENGELUARAN_BARANG_FILTERS,
  CLEAR_REPORT_PENGELUARAN_BARANG_DATA,
} from "../actions/reportPengeluaranBarangActions";

const initialState = {
  reportPengeluaranBarang: [],
  totalCount: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  exportLoading: false,
  message: null,
  errorMessage: null,
  errorCode: null,
  filters: {},
};

const reportPengeluaranBarangReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_PENGELUARAN_BARANG_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case FETCH_REPORT_PENGELUARAN_BARANG_SUCCESS:
      return {
        ...state,
        loading: false,
        reportPengeluaranBarang: action.payload.data || [],
        totalCount: action.payload.totalCount || 0,
        totalPages: action.payload.totalPages || 1,
        currentPage: action.payload.currentPage || 1,
        message: action.payload.message,
        errorMessage: null,
        errorCode: null,
      };

    case FETCH_REPORT_PENGELUARAN_BARANG_FAILURE:
      return {
        ...state,
        loading: false,
        reportPengeluaranBarang: [],
        errorMessage:
          action.payload.message || "Terjadi kesalahan saat mengambil data",
        errorCode: action.payload.code || "UNKNOWN_ERROR",
      };

    case EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST:
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case EXPORT_REPORT_PENGELUARAN_BARANG_SUCCESS:
      return {
        ...state,
        exportLoading: false,
        message: action.payload.message || "Berhasil mengekspor data",
        errorMessage: null,
        errorCode: null,
      };

    case EXPORT_REPORT_PENGELUARAN_BARANG_FAILURE:
      return {
        ...state,
        exportLoading: false,
        errorMessage:
          action.payload.message || "Terjadi kesalahan saat mengekspor data",
        errorCode: action.payload.code || "EXPORT_ERROR",
      };

    case RESET_REPORT_PENGELUARAN_BARANG_MESSAGES:
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case SET_REPORT_PENGELUARAN_BARANG_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case CLEAR_REPORT_PENGELUARAN_BARANG_DATA:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reportPengeluaranBarangReducer;
