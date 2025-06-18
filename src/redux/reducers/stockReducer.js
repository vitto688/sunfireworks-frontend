const initialState = {
  stocks: [],
  currentStock: null,
  loading: false,
  message: null,
  errorCode: null,
  errorMessage: null,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STOCKS_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STOCKS_SUCCESS":
      return {
        ...state,
        stocks: action.payload,
        loading: false,
      };
    case "FETCH_STOCKS_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data stok",
      };
    case "FETCH_STOCK_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STOCK_BY_ID_SUCCESS":
      return {
        ...state,
        currentStock: action.payload,
        loading: false,
      };
    case "FETCH_STOCK_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data stok berdasarkan ID",
      };
    case "FETCH_STOCK_BY_PRODUCT_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "FETCH_STOCK_BY_PRODUCT_ID_SUCCESS":
      return {
        ...state,
        stocks: action.payload,
        loading: false,
      };
    case "FETCH_STOCK_BY_PRODUCT_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data stok berdasarkan ID Produk",
      };
    case "FETCH_STOCK_BY_WAREHOUSE_ID_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };

    case "FETCH_STOCK_BY_WAREHOUSE_ID_SUCCESS":
      return {
        ...state,
        stocks: action.payload,
        loading: false,
      };
    case "FETCH_STOCK_BY_WAREHOUSE_ID_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data stok berdasarkan ID Gudang",
      };
    case "ADD_STOCK_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "ADD_STOCK_SUCCESS":
      return {
        ...state,
        stocks: [...state.stocks, action.payload],
        loading: false,
        message: "Stok berhasil ditambahkan",
      };
    case "ADD_STOCK_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal menambahkan data stok",
      };
    case "UPDATE_STOCK_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_STOCK_SUCCESS":
      const updatedStocks = state.stocks.map((stock) =>
        stock.id === action.payload.id ? action.payload : stock
      );
      return {
        ...state,
        stocks: updatedStocks,
        currentStock: action.payload,
        loading: false,
        message: "Stok berhasil diperbarui",
      };
    case "UPDATE_STOCK_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui data stok",
      };
    case "UPDATE_MULTIPLE_STOCKS_REQUEST":
      return {
        ...state,
        loading: true,
        message: null,
        errorCode: null,
        errorMessage: null,
      };
    case "UPDATE_MULTIPLE_STOCKS_SUCCESS":
      const updatedMultipleStocks = state.stocks.map((stock) => {
        const updatedStock = action.payload.find((s) => s.id === stock.id);
        return updatedStock ? updatedStock : stock;
      });
      return {
        ...state,
        stocks: updatedMultipleStocks,
        loading: false,
        message: "Stok berhasil diperbarui",
      };
    case "UPDATE_MULTIPLE_STOCKS_FAILURE":
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui beberapa data stok",
      };

    case "RESET_STOCK_MESSAGES":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default stockReducer;
