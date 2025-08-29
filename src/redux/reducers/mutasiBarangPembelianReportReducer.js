const initialState = {
  data: [],
  loading: false,
  error: null,
  successMessage: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  filters: {
    supplier_id: "",
    warehouse_id: "",
    start_date: "",
    end_date: "",
    search: "",
  },
  // Export state
  exporting: false,
  exportError: null,
  exportSuccess: null,
};

const mutasiBarangPembelianReportReducer = (state = initialState, action) => {
  switch (action.type) {
    //#region Fetch Mutasi Barang Pembelian Report
    case "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_SUCCESS":
      // Handle different response structures
      let responseData = [];
      let paginationData = {};

      if (Array.isArray(action.payload)) {
        // Direct array response
        responseData = action.payload;
      } else if (action.payload && action.payload.data) {
        // Nested data structure
        responseData = action.payload.data;
        paginationData = action.payload;
      } else if (action.payload && Array.isArray(action.payload.results)) {
        // Results array structure
        responseData = action.payload.results;
        paginationData = action.payload;
      } else {
        // Fallback
        responseData = action.payload || [];
        paginationData = action.payload || {};
      }

      return {
        ...state,
        loading: false,
        data: responseData,
        pagination: {
          currentPage:
            paginationData.current_page ||
            paginationData.meta?.current_page ||
            1,
          totalPages:
            paginationData.last_page || paginationData.meta?.last_page || 1,
          totalItems: paginationData.total || paginationData.meta?.total || 0,
          itemsPerPage:
            paginationData.per_page || paginationData.meta?.per_page || 10,
        },
        error: null,
      };

    case "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };
    //#endregion

    //#region Export Mutasi Barang Pembelian Report
    case "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_REQUEST":
      return {
        ...state,
        exporting: true,
        exportError: null,
        exportSuccess: null,
      };

    case "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_SUCCESS":
      return {
        ...state,
        exporting: false,
        exportSuccess: "Data berhasil diekspor ke Excel",
        exportError: null,
      };

    case "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_FAILURE":
      return {
        ...state,
        exporting: false,
        exportError: action.payload,
        exportSuccess: null,
      };
    //#endregion

    //#region Utility Actions
    case "RESET_MUTASI_BARANG_PEMBELIAN_REPORT_MESSAGES":
      return {
        ...state,
        error: null,
        successMessage: null,
        exportError: null,
        exportSuccess: null,
      };

    case "CLEAR_MUTASI_BARANG_PEMBELIAN_REPORT_DATA":
      return {
        ...state,
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10,
        },
      };

    case "SET_MUTASI_BARANG_PEMBELIAN_REPORT_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    //#endregion

    default:
      return state;
  }
};

export default mutasiBarangPembelianReportReducer;
