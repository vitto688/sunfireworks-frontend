// STB (Surat Terima Barang) Reducer
const initialSTBState = {
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

const stbReducer = (state = initialSTBState, action) => {
  switch (action.type) {
    case "FETCH_STB_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STB_SUCCESS":
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
    case "FETCH_STB_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message || "Error fetching STB",
      };
    case "FETCH_STB_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STB_BY_ID_SUCCESS":
      return {
        ...state,
        currentItem: action.payload.data,
        loading: false,
      };
    case "FETCH_STB_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching STB by ID",
      };
    case "ADD_STB_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "ADD_STB_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        loading: false,
        message: "STB berhasil ditambahkan",
      };
    case "ADD_STB_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message || "Error adding STB",
      };
    case "UPDATE_STB_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_STB_SUCCESS":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        ),
        currentItem: action.payload.data,
        loading: false,
        message: "STB berhasil diperbarui",
      };
    case "UPDATE_STB_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message || "Error updating STB",
      };
    case "DELETE_STB_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "DELETE_STB_SUCCESS":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
        loading: false,
        message: "STB berhasil dihapus",
      };
    case "DELETE_STB_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message || "Error deleting STB",
      };
    case "RESET_STB_MESSAGES":
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

export default stbReducer;
