// Retur Pembelian Reducer
const initialReturPembelianState = {
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

const returPembelianReducer = (state = initialReturPembelianState, action) => {
  switch (action.type) {
    case "FETCH_RETUR_PEMBELIAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_RETUR_PEMBELIAN_SUCCESS":
      return {
        ...state,
        data: (action.payload.data.results || []).sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        ),
        loading: false,
        pagination: {
          count: action.payload.data.count || 0,
          total_pages: action.payload.data.total_pages || 0,
          current_page: action.payload.data.current_page || 1,
          next: action.payload.data.next || null,
          previous: action.payload.data.previous || null,
        },
      };
    case "FETCH_RETUR_PEMBELIAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching Retur Pembelian",
      };

    case "FETCH_RETUR_PEMBELIAN_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_RETUR_PEMBELIAN_BY_ID_SUCCESS":
      return {
        ...state,
        currentItem: action.payload.data,
        loading: false,
      };
    case "FETCH_RETUR_PEMBELIAN_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching Retur Pembelian by ID",
      };

    case "ADD_RETUR_PEMBELIAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "ADD_RETUR_PEMBELIAN_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        loading: false,
        message: "Retur Pembelian berhasil ditambahkan",
      };
    case "ADD_RETUR_PEMBELIAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error adding Retur Pembelian",
      };

    case "UPDATE_RETUR_PEMBELIAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_RETUR_PEMBELIAN_SUCCESS":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        ),
        loading: false,
        message: "Retur Pembelian berhasil diupdate",
      };
    case "UPDATE_RETUR_PEMBELIAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error updating Retur Pembelian",
      };

    case "DELETE_RETUR_PEMBELIAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "DELETE_RETUR_PEMBELIAN_SUCCESS":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        loading: false,
        message: "Retur Pembelian berhasil dihapus",
      };
    case "DELETE_RETUR_PEMBELIAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error deleting Retur Pembelian",
      };

    case "RESET_RETUR_PEMBELIAN_MESSAGES":
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

export default returPembelianReducer;
