const initialState = {
  mutasiMasuk: [],
  currentMutasiMasuk: null,
  loading: false,
  error: null,
  successMessage: null,
  // filter states
  filters: {
    dateRange: {
      startDate: "",
      endDate: "",
    },
    warehouseId: 0,
    categoryId: 0,
    supplierId: 0,
    searchQuery: "",
  },
  filteredData: [],
};

const mutasiMasukReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch mutasi masuk
    case "FETCH_MUTASI_MASUK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_MUTASI_MASUK_SUCCESS":
      return {
        ...state,
        loading: false,
        mutasiMasuk: action.payload,
        filteredData: action.payload,
        error: null,
      };
    case "FETCH_MUTASI_MASUK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Add mutasi masuk
    case "ADD_MUTASI_MASUK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_MUTASI_MASUK_SUCCESS":
      return {
        ...state,
        loading: false,
        mutasiMasuk: [...state.mutasiMasuk, action.payload],
        filteredData: [...state.filteredData, action.payload],
        successMessage: "Mutasi masuk berhasil ditambahkan",
        error: null,
      };
    case "ADD_MUTASI_MASUK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update mutasi masuk
    case "UPDATE_MUTASI_MASUK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_MUTASI_MASUK_SUCCESS":
      return {
        ...state,
        loading: false,
        mutasiMasuk: state.mutasiMasuk.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        filteredData: state.filteredData.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        currentMutasiMasuk: action.payload,
        successMessage: "Mutasi masuk berhasil diperbarui",
        error: null,
      };
    case "UPDATE_MUTASI_MASUK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete mutasi masuk
    case "DELETE_MUTASI_MASUK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_MUTASI_MASUK_SUCCESS":
      return {
        ...state,
        loading: false,
        mutasiMasuk: state.mutasiMasuk.filter(
          (item) => item.id !== action.payload
        ),
        filteredData: state.filteredData.filter(
          (item) => item.id !== action.payload
        ),
        successMessage: "Mutasi masuk berhasil dihapus",
        error: null,
      };
    case "DELETE_MUTASI_MASUK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Set current mutasi masuk
    case "SET_CURRENT_MUTASI_MASUK":
      return {
        ...state,
        currentMutasiMasuk: action.payload,
      };
    case "CLEAR_CURRENT_MUTASI_MASUK":
      return {
        ...state,
        currentMutasiMasuk: null,
      };

    // Filter actions
    case "SET_MUTASI_MASUK_DATE_FILTER":
      const { startDate, endDate } = action.payload;
      const dateFilteredData = state.mutasiMasuk.filter((item) => {
        if (!startDate || !endDate) return true;
        const itemDate = new Date(item.tanggal_transaksi);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
      return {
        ...state,
        filters: {
          ...state.filters,
          dateRange: { startDate, endDate },
        },
        filteredData: dateFilteredData,
      };

    case "SET_MUTASI_MASUK_WAREHOUSE_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          warehouseId: action.payload,
        },
      };

    case "SET_MUTASI_MASUK_CATEGORY_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          categoryId: action.payload,
        },
      };

    case "SET_MUTASI_MASUK_SUPPLIER_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          supplierId: action.payload,
        },
      };

    case "SET_MUTASI_MASUK_SEARCH_QUERY":
      const searchFilteredData = state.mutasiMasuk.filter(
        (item) =>
          item.nama_produk
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          item.kode_supplier
            .toLowerCase()
            .includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filters: {
          ...state.filters,
          searchQuery: action.payload,
        },
        filteredData: searchFilteredData,
      };

    case "CLEAR_MUTASI_MASUK_FILTERS":
      return {
        ...state,
        filters: {
          dateRange: { startDate: "", endDate: "" },
          warehouseId: 0,
          categoryId: 0,
          supplierId: 0,
          searchQuery: "",
        },
        filteredData: state.mutasiMasuk,
      };

    // Reset messages
    case "RESET_MUTASI_MASUK_MESSAGES":
      return {
        ...state,
        error: null,
        successMessage: null,
      };

    default:
      return state;
  }
};

export default mutasiMasukReducer;
