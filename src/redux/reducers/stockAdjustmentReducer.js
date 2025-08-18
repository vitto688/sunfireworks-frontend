const initialState = {
  data: [],
  selectedStockAdjustment: null,
  loading: {
    fetch: false,
    fetchById: false,
    create: false,
    update: false,
    delete: false,
  },
  message: null,
  errorMessage: null,
  errorCode: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

const stockAdjustmentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Stock Adjustments
    case "FETCH_STOCK_ADJUSTMENTS_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, fetch: true },
      };

    case "FETCH_STOCK_ADJUSTMENTS_SUCCESS":
      return {
        ...state,
        loading: { ...state.loading, fetch: false },
        data: action.payload.results || action.payload,
        pagination: {
          currentPage: action.payload.current_page || 1,
          totalPages: action.payload.total_pages || 1,
          totalItems: action.payload.count || action.payload.length || 0,
          itemsPerPage: action.payload.page_size || 10,
        },
      };

    case "FETCH_STOCK_ADJUSTMENTS_FAILURE":
      return {
        ...state,
        loading: { ...state.loading, fetch: false },
        errorMessage:
          action.payload.message || "Failed to fetch stock adjustments",
        errorCode: action.payload.code,
      };

    // Fetch Stock Adjustment by ID
    case "FETCH_STOCK_ADJUSTMENT_BY_ID_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, fetchById: true },
      };

    case "FETCH_STOCK_ADJUSTMENT_BY_ID_SUCCESS":
      return {
        ...state,
        loading: { ...state.loading, fetchById: false },
        selectedStockAdjustment: action.payload,
      };

    case "FETCH_STOCK_ADJUSTMENT_BY_ID_FAILURE":
      return {
        ...state,
        loading: { ...state.loading, fetchById: false },
        errorMessage:
          action.payload.message || "Failed to fetch stock adjustment",
        errorCode: action.payload.code,
      };

    // Create Stock Adjustment
    case "CREATE_STOCK_ADJUSTMENT_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, create: true },
      };

    case "CREATE_STOCK_ADJUSTMENT_SUCCESS":
      return {
        ...state,
        loading: { ...state.loading, create: false },
        message: "Stock Adjustment berhasil dibuat",
        data: [...state.data, action.payload],
      };

    case "CREATE_STOCK_ADJUSTMENT_FAILURE":
      return {
        ...state,
        loading: { ...state.loading, create: false },
        errorMessage:
          action.payload.message || "Failed to create stock adjustment",
        errorCode: action.payload.code,
      };

    // Update Stock Adjustment
    case "UPDATE_STOCK_ADJUSTMENT_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, update: true },
      };

    case "UPDATE_STOCK_ADJUSTMENT_SUCCESS":
      return {
        ...state,
        loading: { ...state.loading, update: false },
        message: "Stock Adjustment berhasil diperbarui",
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        selectedStockAdjustment: action.payload,
      };

    case "UPDATE_STOCK_ADJUSTMENT_FAILURE":
      return {
        ...state,
        loading: { ...state.loading, update: false },
        errorMessage:
          action.payload.message || "Failed to update stock adjustment",
        errorCode: action.payload.code,
      };

    // Delete Stock Adjustment
    case "DELETE_STOCK_ADJUSTMENT_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, delete: true },
      };

    case "DELETE_STOCK_ADJUSTMENT_SUCCESS":
      return {
        ...state,
        loading: { ...state.loading, delete: false },
        message: "Stock Adjustment berhasil dihapus",
        data: state.data.filter((item) => item.id !== action.payload),
      };

    case "DELETE_STOCK_ADJUSTMENT_FAILURE":
      return {
        ...state,
        loading: { ...state.loading, delete: false },
        errorMessage:
          action.payload.message || "Failed to delete stock adjustment",
        errorCode: action.payload.code,
      };

    // Reset Messages
    case "RESET_STOCK_ADJUSTMENT_MESSAGES":
      return {
        ...state,
        message: null,
        errorMessage: null,
        errorCode: null,
      };

    default:
      return state;
  }
};

export default stockAdjustmentReducer;
