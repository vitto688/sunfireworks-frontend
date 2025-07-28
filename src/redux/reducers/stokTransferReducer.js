// Simple StokTransfer Reducer
const initialStokTransferState = {
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

const stokTransferReducer = (state = initialStokTransferState, action) => {
  switch (action.type) {
    case "FETCH_STOK_TRANSFER_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STOK_TRANSFER_SUCCESS":
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
    case "FETCH_STOK_TRANSFER_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching stok transfer",
      };
    case "FETCH_STOK_TRANSFER_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STOK_TRANSFER_BY_ID_SUCCESS":
      return {
        ...state,
        currentItem: action.payload.data,
        loading: false,
      };
    case "FETCH_STOK_TRANSFER_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching stok transfer by ID",
      };
    case "ADD_STOK_TRANSFER_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "ADD_STOK_TRANSFER_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        loading: false,
        message: "Stock transfer berhasil ditambahkan",
      };
    case "ADD_STOK_TRANSFER_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error adding stok transfer",
      };
    case "UPDATE_STOK_TRANSFER_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_STOK_TRANSFER_SUCCESS":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        ),
        currentItem: action.payload.data,
        loading: false,
        message: "Stock transfer berhasil diperbarui",
      };
    case "UPDATE_STOK_TRANSFER_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error updating stok transfer",
      };
    case "DELETE_STOK_TRANSFER_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "DELETE_STOK_TRANSFER_SUCCESS":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        loading: false,
        message: "Stock transfer berhasil dihapus",
      };
    case "DELETE_STOK_TRANSFER_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error deleting stok transfer",
      };
    case "RESET_STOK_TRANSFER_MESSAGES":
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

export default stokTransferReducer;
