const initialState = {
  // Data
  pengeluaranBarangReport: [],
  pengeluaranBarangReportNP: [],
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

const pengeluaranBarangReportReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Pengeluaran Barang Report Cases
    case "FETCH_PENGELUARAN_BARANG_REPORT_REQUEST":
    case "FETCH_PENGELUARAN_BARANG_REPORT_NP_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_PENGELUARAN_BARANG_REPORT_SUCCESS":
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        pengeluaranBarangReport: data.results || [],
        totalCount: data.count || 0,
        totalPages: data.total_pages || 0,
        currentPage: data.current_page || 1,
        nextPage: data.next || null,
        previousPage: data.previous || null,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_PENGELUARAN_BARANG_REPORT_NP_SUCCESS":
      return {
        ...state,
        loading: false,
        pengeluaranBarangReportNP: action.payload.data || [],
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_PENGELUARAN_BARANG_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        pengeluaranBarangReport: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        errorMessage:
          action.payload.error?.message ||
          "Failed to fetch pengeluaran barang report",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    case "FETCH_PENGELUARAN_BARANG_REPORT_NP_FAILURE":
      return {
        ...state,
        loading: false,
        pengeluaranBarangReportNP: [],
        errorMessage:
          action.payload.error?.message ||
          "Failed to fetch pengeluaran barang report NP",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    // Export Pengeluaran Barang Report Cases
    case "EXPORT_PENGELUARAN_BARANG_REPORT_REQUEST":
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_PENGELUARAN_BARANG_REPORT_SUCCESS":
      return {
        ...state,
        exportLoading: false,
        message: "Pengeluaran barang report exported successfully",
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_PENGELUARAN_BARANG_REPORT_FAILURE":
      return {
        ...state,
        exportLoading: false,
        errorMessage:
          action.payload.error?.message ||
          "Failed to export pengeluaran barang report",
        errorCode: action.payload.error?.code || "EXPORT_ERROR",
      };

    // Utility Cases
    case "RESET_PENGELUARAN_BARANG_REPORT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "SET_PENGELUARAN_BARANG_REPORT_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };

    case "CLEAR_PENGELUARAN_BARANG_REPORT_DATA":
      return {
        ...state,
        pengeluaranBarangReport: [],
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

export default pengeluaranBarangReportReducer;
