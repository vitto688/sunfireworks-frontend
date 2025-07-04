//#region mutasi masuk
export const fetchMutasiMasukRequest = () => ({
  type: "FETCH_MUTASI_MASUK_REQUEST",
});

export const fetchMutasiMasukSuccess = (mutasiMasuk) => ({
  type: "FETCH_MUTASI_MASUK_SUCCESS",
  payload: mutasiMasuk,
});

export const fetchMutasiMasukFailure = (error) => ({
  type: "FETCH_MUTASI_MASUK_FAILURE",
  payload: error,
});

export const addMutasiMasukRequest = (mutasiMasuk) => ({
  type: "ADD_MUTASI_MASUK_REQUEST",
  payload: mutasiMasuk,
});

export const addMutasiMasukSuccess = (mutasiMasuk) => ({
  type: "ADD_MUTASI_MASUK_SUCCESS",
  payload: mutasiMasuk,
});

export const addMutasiMasukFailure = (error) => ({
  type: "ADD_MUTASI_MASUK_FAILURE",
  payload: error,
});

export const updateMutasiMasukRequest = (mutasiMasuk) => ({
  type: "UPDATE_MUTASI_MASUK_REQUEST",
  payload: mutasiMasuk,
});

export const updateMutasiMasukSuccess = (mutasiMasuk) => ({
  type: "UPDATE_MUTASI_MASUK_SUCCESS",
  payload: mutasiMasuk,
});

export const updateMutasiMasukFailure = (error) => ({
  type: "UPDATE_MUTASI_MASUK_FAILURE",
  payload: error,
});

export const deleteMutasiMasukRequest = (mutasiMasukId) => ({
  type: "DELETE_MUTASI_MASUK_REQUEST",
  payload: mutasiMasukId,
});

export const deleteMutasiMasukSuccess = (mutasiMasukId) => ({
  type: "DELETE_MUTASI_MASUK_SUCCESS",
  payload: mutasiMasukId,
});

export const deleteMutasiMasukFailure = (error) => ({
  type: "DELETE_MUTASI_MASUK_FAILURE",
  payload: error,
});

export const setCurrentMutasiMasuk = (mutasiMasuk) => ({
  type: "SET_CURRENT_MUTASI_MASUK",
  payload: mutasiMasuk,
});

export const clearCurrentMutasiMasuk = () => ({
  type: "CLEAR_CURRENT_MUTASI_MASUK",
});

//#region filter actions
export const setMutasiMasukDateFilter = (startDate, endDate) => ({
  type: "SET_MUTASI_MASUK_DATE_FILTER",
  payload: { startDate, endDate },
});

export const setMutasiMasukWarehouseFilter = (warehouseId) => ({
  type: "SET_MUTASI_MASUK_WAREHOUSE_FILTER",
  payload: warehouseId,
});

export const setMutasiMasukCategoryFilter = (categoryId) => ({
  type: "SET_MUTASI_MASUK_CATEGORY_FILTER",
  payload: categoryId,
});

export const setMutasiMasukSupplierFilter = (supplierId) => ({
  type: "SET_MUTASI_MASUK_SUPPLIER_FILTER",
  payload: supplierId,
});

export const setMutasiMasukSearchQuery = (query) => ({
  type: "SET_MUTASI_MASUK_SEARCH_QUERY",
  payload: query,
});

export const clearMutasiMasukFilters = () => ({
  type: "CLEAR_MUTASI_MASUK_FILTERS",
});
//#endregion

export const resetMutasiMasukMessages = () => ({
  type: "RESET_MUTASI_MASUK_MESSAGES",
});
//#endregion
