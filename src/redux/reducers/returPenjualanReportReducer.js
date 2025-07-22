const initialState = {
  // Data
  returPenjualanReport: [],
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

const returPenjualanReportReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Retur Penjualan Report Cases
    case "FETCH_RETUR_PENJUALAN_REPORT_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_RETUR_PENJUALAN_REPORT_SUCCESS":
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        returPenjualanReport: data.results || [],
        totalCount: data.count || 0,
        totalPages: data.total_pages || 0,
        currentPage: data.current_page || 1,
        nextPage: data.next || null,
        previousPage: data.previous || null,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_RETUR_PENJUALAN_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        returPenjualanReport: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        errorMessage:
          action.payload.error?.message ||
          "Failed to fetch retur penjualan report",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    // Export Retur Penjualan Report Cases
    case "EXPORT_RETUR_PENJUALAN_REPORT_REQUEST":
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_RETUR_PENJUALAN_REPORT_SUCCESS":
      return {
        ...state,
        exportLoading: false,
        message: "Retur penjualan report exported successfully",
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_RETUR_PENJUALAN_REPORT_FAILURE":
      return {
        ...state,
        exportLoading: false,
        errorMessage:
          action.payload.error?.message ||
          "Failed to export retur penjualan report",
        errorCode: action.payload.error?.code || "EXPORT_ERROR",
      };

    // Utility Cases
    case "RESET_RETUR_PENJUALAN_REPORT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "SET_RETUR_PENJUALAN_REPORT_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };

    case "CLEAR_RETUR_PENJUALAN_REPORT_DATA":
      return {
        ...state,
        returPenjualanReport: [],
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

export default returPenjualanReportReducer;
