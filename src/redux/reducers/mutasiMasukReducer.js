const initialState = {
  returPenjualan: [],
  spgImport: [],
  spgProduk: [],
  suratTerimaBarang: [],
  currentReturPenjualan: null,
  currentSpgImport: null,
  currentSpgProduk: null,
  currentSuratTerimaBarang: null,
  loading: {
    returPenjualan: false,
    spgImport: false,
    spgProduk: false,
    suratTerimaBarang: false,
  },
  error: null,
};

const mutasiMasukReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RETUR_PENJUALAN_REQUEST":
      return {
        ...state,
        loading: { ...state.loading, returPenjualan: true },
      };
    case "FETCH_RETUR_PENJUALAN_SUCCESS":
      return {
        ...state,
        loading: { ...state.loading, returPenjualan: false },
        returPenjualan: action.payload,
      };
    case "FETCH_RETUR_PENJUALAN_FAILURE":
      return {
        ...state,
        loading: { ...state.loading, returPenjualan: false },
        error: action.payload,
      };
    case "SET_CURRENT_RETUR_PENJUALAN":
      return {
        ...state,
        currentReturPenjualan: action.payload,
      };
    // Add other cases for spgImport, spgProduk, suratTerimaBarang
    default:
      return state;
  }
};

export default mutasiMasukReducer;
