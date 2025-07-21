const initialState = {
  // Data
  returPembelianReport: [],
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

const returPembelianReportReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Retur Pembelian Report Cases
    case "FETCH_RETUR_PEMBELIAN_REPORT_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_RETUR_PEMBELIAN_REPORT_SUCCESS":
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        returPembelianReport: data.results || [],
        totalCount: data.count || 0,
        totalPages: data.total_pages || 0,
        currentPage: data.current_page || 1,
        nextPage: data.next || null,
        previousPage: data.previous || null,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_RETUR_PEMBELIAN_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        returPembelianReport: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        errorMessage:
          action.payload.error?.message ||
          "Failed to fetch retur pembelian report",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    // Export Retur Pembelian Report Cases
    case "EXPORT_RETUR_PEMBELIAN_REPORT_REQUEST":
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_RETUR_PEMBELIAN_REPORT_SUCCESS":
      return {
        ...state,
        exportLoading: false,
        message: "Retur pembelian report exported successfully",
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_RETUR_PEMBELIAN_REPORT_FAILURE":
      return {
        ...state,
        exportLoading: false,
        errorMessage:
          action.payload.error?.message ||
          "Failed to export retur pembelian report",
        errorCode: action.payload.error?.code || "EXPORT_ERROR",
      };

    // Utility Cases
    case "RESET_RETUR_PEMBELIAN_REPORT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "SET_RETUR_PEMBELIAN_REPORT_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };

    case "CLEAR_RETUR_PEMBELIAN_REPORT_DATA":
      return {
        ...state,
        returPembelianReport: [],
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

export default returPembelianReportReducer;
