const initialState = {
  mutasiBarangPenjualanReport: [],
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

const mutasiBarangPenjualanReportReducer = (state = initialState, action) => {
  switch (action.type) {
    //#region Fetch Mutasi Barang Penjualan Report
    case "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_SUCCESS":
      return {
        ...state,
        loading: false,
        mutasiBarangPenjualanReport: action.payload.results || action.payload,
        totalCount: action.payload.count || 0,
        totalPages: action.payload.total_pages || 1,
        currentPage: action.payload.current_page || 1,
        message: "Data berhasil dimuat",
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        mutasiBarangPenjualanReport: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
        errorMessage: "Gagal mengambil data laporan mutasi barang penjualan",
        errorCode: action.payload,
      };
    //#endregion

    //#region Export Mutasi Barang Penjualan Report
    case "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_REQUEST":
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_SUCCESS":
      return {
        ...state,
        exportLoading: false,
        message: "Data berhasil diekspor",
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_FAILURE":
      return {
        ...state,
        exportLoading: false,
        errorMessage: "Gagal mengekspor data laporan mutasi barang penjualan",
        errorCode: action.payload,
      };
    //#endregion

    //#region Utility Cases
    case "RESET_MUTASI_BARANG_PENJUALAN_REPORT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "CLEAR_MUTASI_BARANG_PENJUALAN_REPORT_DATA":
      return {
        ...initialState,
      };

    case "SET_MUTASI_BARANG_PENJUALAN_REPORT_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };
    //#endregion

    default:
      return state;
  }
};

export default mutasiBarangPenjualanReportReducer;
