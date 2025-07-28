// Surat Jalan Reducer
const initialSuratJalanState = {
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

const suratJalanReducer = (state = initialSuratJalanState, action) => {
  switch (action.type) {
    case "FETCH_SURAT_JALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_SURAT_JALAN_SUCCESS":
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
    case "FETCH_SURAT_JALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching Surat Jalan",
      };

    case "FETCH_SURAT_JALAN_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_SURAT_JALAN_BY_ID_SUCCESS":
      return {
        ...state,
        currentItem: action.payload.data,
        loading: false,
      };
    case "FETCH_SURAT_JALAN_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error fetching Surat Jalan by ID",
      };

    case "ADD_SURAT_JALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "ADD_SURAT_JALAN_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        loading: false,
        message: "Surat Jalan berhasil ditambahkan",
      };
    case "ADD_SURAT_JALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error adding Surat Jalan",
      };

    case "UPDATE_SURAT_JALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_SURAT_JALAN_SUCCESS":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        ),
        loading: false,
        message: "Surat Jalan berhasil diupdate",
      };
    case "UPDATE_SURAT_JALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error updating Surat Jalan",
      };

    case "DELETE_SURAT_JALAN_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "DELETE_SURAT_JALAN_SUCCESS":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        loading: false,
        message: "Surat Jalan berhasil dihapus",
      };
    case "DELETE_SURAT_JALAN_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload.error?.response?.status || 500,
        errorMessage:
          action.payload.error?.response?.data?.message ||
          "Error deleting Surat Jalan",
      };

    case "RESET_SURAT_JALAN_MESSAGES":
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

export default suratJalanReducer;
