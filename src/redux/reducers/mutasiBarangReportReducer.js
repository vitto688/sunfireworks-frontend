const initialState = {
  // Data
  mutasiBarangReport: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  nextPage: null,
  previousPage: null,

  // Loading states
  loading: false,
  exportLoading: false,

  // Messages
  message: null,
  errorMessage: null,
  errorCode: null,

  // Filters
  filters: {
    page: 1,
    search: "",
    warehouse: "",
    supplier: "",
    document_number: "",
    start_date: "",
    end_date: "",
  },
};

const mutasiBarangReportReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Mutasi Barang Report Cases
    case "FETCH_MUTASI_BARANG_REPORT_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_MUTASI_BARANG_REPORT_SUCCESS":
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        mutasiBarangReport: data.results || [],
        totalCount: data.count || 0,
        totalPages: data.total_pages || 0,
        currentPage: data.current_page || 1,
        nextPage: data.next || null,
        previousPage: data.previous || null,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_MUTASI_BARANG_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        mutasiBarangReport: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        errorMessage:
          action.payload.error?.message ||
          "Failed to fetch mutasi barang report",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    // Export Mutasi Barang Report Cases
    case "EXPORT_MUTASI_BARANG_REPORT_REQUEST":
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_MUTASI_BARANG_REPORT_SUCCESS":
      return {
        ...state,
        exportLoading: false,
        message: "Mutasi barang report exported successfully",
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_MUTASI_BARANG_REPORT_FAILURE":
      return {
        ...state,
        exportLoading: false,
        errorMessage:
          action.payload.error?.message ||
          "Failed to export mutasi barang report",
        errorCode: action.payload.error?.code || "EXPORT_ERROR",
      };

    // Utility Cases
    case "RESET_MUTASI_BARANG_REPORT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "SET_MUTASI_BARANG_REPORT_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };

    case "CLEAR_MUTASI_BARANG_REPORT_DATA":
      return {
        ...state,
        mutasiBarangReport: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
      };

    default:
      return state;
  }
};

export default mutasiBarangReportReducer;
