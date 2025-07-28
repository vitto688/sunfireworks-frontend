// Retur Penjualan Reducer
const initialReturPenjualanState = {
  data: [],
  currentItem: null,
  loading: false,
  message: null,
  errorCode: null,
  errorMessage: null,
  // Pagination data
  pagination: {
    count: 0,
    total_pages: 0,
    current_page: 1,
    next: null,
    previous: null,
  },
};

const returPenjualanReducer = (state = initialReturPenjualanState, action) => {
  switch (action.type) {
    case "FETCH_RETUR_PENJUALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_RETUR_PENJUALAN_SUCCESS":
      return {
        ...state,
        // data: (action.payload.data.results || []).sort(
        //   (a, b) => new Date(a.created_at) - new Date(b.created_at)
        // ),
        data: action.payload.data.results || [],
        loading: false,
        pagination: {
          count: action.payload.data.count || 0,
          total_pages: action.payload.data.total_pages || 0,
          current_page: action.payload.data.current_page || 1,
          next: action.payload.data.next || null,
          previous: action.payload.data.previous || null,
        },
      };
    case "FETCH_RETUR_PENJUALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching Retur Penjualan",
      };

    case "FETCH_RETUR_PENJUALAN_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_RETUR_PENJUALAN_BY_ID_SUCCESS":
      return {
        ...state,
        currentItem: action.payload.data,
        loading: false,
      };
    case "FETCH_RETUR_PENJUALAN_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching Retur Penjualan by ID",
      };

    case "ADD_RETUR_PENJUALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "ADD_RETUR_PENJUALAN_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        loading: false,
        message: "Retur Penjualan berhasil ditambahkan",
      };
    case "ADD_RETUR_PENJUALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error adding Retur Penjualan",
      };

    case "UPDATE_RETUR_PENJUALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_RETUR_PENJUALAN_SUCCESS":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        ),
        loading: false,
        message: "Retur Penjualan berhasil diupdate",
      };
    case "UPDATE_RETUR_PENJUALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error updating Retur Penjualan",
      };

    case "DELETE_RETUR_PENJUALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "DELETE_RETUR_PENJUALAN_SUCCESS":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        loading: false,
        message: "Retur Penjualan berhasil dihapus",
      };
    case "DELETE_RETUR_PENJUALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error deleting Retur Penjualan",
      };

    case "RESET_RETUR_PENJUALAN_MESSAGES":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default returPenjualanReducer;
