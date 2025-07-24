const initialState = {
  // Data
  stockReport: [],
  stockReportNP: [],
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
    category: "",
    supplier: "",
    start_date: "",
    end_date: "",
  },
};

const stockReportReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Stock Report Cases
    case "FETCH_STOCK_REPORT_REQUEST":
    case "FETCH_STOCK_REPORT_NP_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_STOCK_REPORT_SUCCESS":
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        stockReport: data.results || [],
        totalCount: data.count || 0,
        totalPages: data.total_pages || 0,
        currentPage: data.current_page || 1,
        nextPage: data.next || null,
        previousPage: data.previous || null,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_STOCK_REPORT_NP_SUCCESS":
      return {
        ...state,
        loading: false,
        stockReportNP: action.payload.data || [],
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "FETCH_STOCK_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        stockReport: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        errorMessage:
          action.payload.error?.message || "Failed to fetch stock report",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    case "FETCH_STOCK_REPORT_NP_FAILURE":
      return {
        ...state,
        loading: false,
        stockReportNP: [],
        errorMessage:
          action.payload.error?.message || "Failed to fetch stock report NP",
        errorCode: action.payload.error?.code || "FETCH_ERROR",
      };

    // Export Stock Report Cases
    case "EXPORT_STOCK_REPORT_REQUEST":
      return {
        ...state,
        exportLoading: true,
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_STOCK_REPORT_SUCCESS":
      return {
        ...state,
        exportLoading: false,
        message: "Stock report exported successfully",
        errorMessage: null,
        errorCode: null,
      };

    case "EXPORT_STOCK_REPORT_FAILURE":
      return {
        ...state,
        exportLoading: false,
        errorMessage:
          action.payload.error?.message || "Failed to export stock report",
        errorCode: action.payload.error?.code || "EXPORT_ERROR",
      };

    // Utility Cases
    case "RESET_STOCK_REPORT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    case "SET_STOCK_REPORT_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };

    case "CLEAR_STOCK_REPORT_DATA":
      return {
        ...state,
        stockReport: [],
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

export default stockReportReducer;
