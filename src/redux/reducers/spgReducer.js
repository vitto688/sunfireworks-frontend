// Unified SPG Reducer
const initialSPGState = {
  import: {
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
  },
  bawang: {
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
  },
  kawat: {
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
  },
  lain: {
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
  },
};

const spgReducer = (state = initialSPGState, action) => {
  if (!action.payload || !action.payload.spgType) {
    return state;
  }

  const { spgType } = action.payload;

  switch (action.type) {
    case "FETCH_SPG_REQUEST":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: true,
          message: null,
          errorCode: null,
          errorMessage: null,
        },
      };
    case "FETCH_SPG_SUCCESS":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          // data: (action.payload.data.results || []).sort(
          //   (a, b) => new Date(a.created_at) - new Date(b.created_at)
          // ),
          data: action.payload.data.results || [],
          loading: false,
          // Update pagination info
          pagination: {
            count: action.payload.data.count || 0,
            total_pages: action.payload.data.total_pages || 0,
            current_page: action.payload.data.current_page || 1,
            next: action.payload.data.next || null,
            previous: action.payload.data.previous || null,
          },
        },
      };
    case "FETCH_SPG_FAILURE":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: false,
          errorCode: action.payload.error,
          errorMessage: `Gagal mengambil data SPG ${spgType}`,
        },
      };
    case "FETCH_SPG_BY_ID_REQUEST":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: true,
          message: null,
          errorCode: null,
          errorMessage: null,
        },
      };
    case "FETCH_SPG_BY_ID_SUCCESS":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          currentItem: action.payload.data,
          loading: false,
        },
      };
    case "FETCH_SPG_BY_ID_FAILURE":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: false,
          errorCode: action.payload.error,
          errorMessage: `Gagal mengambil data SPG ${spgType} berdasarkan ID`,
        },
      };
    case "ADD_SPG_REQUEST":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: true,
          message: null,
          errorCode: null,
          errorMessage: null,
        },
      };
    case "ADD_SPG_SUCCESS":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          data: [...state[spgType].data, action.payload.data],
          loading: false,
          message: `SPG ${spgType} berhasil ditambahkan`,
        },
      };
    case "ADD_SPG_FAILURE":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: false,
          errorCode: action.payload.error,
          errorMessage: `Gagal menambahkan SPG ${spgType}`,
        },
      };
    case "UPDATE_SPG_REQUEST":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: true,
          message: null,
          errorCode: null,
          errorMessage: null,
        },
      };
    case "UPDATE_SPG_SUCCESS":
      const updatedData = state[spgType].data.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          data: updatedData,
          currentItem: action.payload.data,
          loading: false,
          message: `SPG ${spgType} berhasil diperbarui`,
        },
      };
    case "UPDATE_SPG_FAILURE":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: false,
          errorCode: action.payload.error,
          errorMessage: `Gagal memperbarui SPG ${spgType}`,
        },
      };
    case "DELETE_SPG_REQUEST":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: true,
          message: null,
          errorCode: null,
          errorMessage: null,
        },
      };
    case "DELETE_SPG_SUCCESS":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          data: state[spgType].data.filter(
            (item) => item.id !== action.payload.id
          ),
          loading: false,
          message: `SPG ${spgType} berhasil dihapus`,
        },
      };
    case "DELETE_SPG_FAILURE":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          loading: false,
          errorCode: action.payload.error,
          errorMessage: `Gagal menghapus SPG ${spgType}`,
        },
      };
    case "RESET_SPG_MESSAGES":
      return {
        ...state,
        [spgType]: {
          ...state[spgType],
          message: null,
          errorCode: null,
          errorMessage: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};

export default spgReducer;
