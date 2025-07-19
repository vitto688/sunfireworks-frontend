// Retur Penjualan Actions
// Direct actions for Retur Penjualan without sub-types

// Fetch Retur Penjualan Actions
export const fetchReturPenjualanRequest = (params = {}) => ({
  type: "FETCH_RETUR_PENJUALAN_REQUEST",
  payload: { params },
});

export const fetchReturPenjualanSuccess = (data) => ({
  type: "FETCH_RETUR_PENJUALAN_SUCCESS",
  payload: { data },
});

export const fetchReturPenjualanFailure = (error) => ({
  type: "FETCH_RETUR_PENJUALAN_FAILURE",
  payload: { error },
});

// Fetch Retur Penjualan by ID Actions
export const fetchReturPenjualanByIdRequest = (id) => ({
  type: "FETCH_RETUR_PENJUALAN_BY_ID_REQUEST",
  payload: { id },
});

export const fetchReturPenjualanByIdSuccess = (data) => ({
  type: "FETCH_RETUR_PENJUALAN_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchReturPenjualanByIdFailure = (error) => ({
  type: "FETCH_RETUR_PENJUALAN_BY_ID_FAILURE",
  payload: { error },
});

// Add Retur Penjualan Actions
export const addReturPenjualanRequest = (data) => ({
  type: "ADD_RETUR_PENJUALAN_REQUEST",
  payload: { data },
});

export const addReturPenjualanSuccess = (data) => ({
  type: "ADD_RETUR_PENJUALAN_SUCCESS",
  payload: { data },
});

export const addReturPenjualanFailure = (error) => ({
  type: "ADD_RETUR_PENJUALAN_FAILURE",
  payload: { error },
});

// Update Retur Penjualan Actions
export const updateReturPenjualanRequest = (id, data) => ({
  type: "UPDATE_RETUR_PENJUALAN_REQUEST",
  payload: { id, data },
});

export const updateReturPenjualanSuccess = (data) => ({
  type: "UPDATE_RETUR_PENJUALAN_SUCCESS",
  payload: { data },
});

export const updateReturPenjualanFailure = (error) => ({
  type: "UPDATE_RETUR_PENJUALAN_FAILURE",
  payload: { error },
});

// Delete Retur Penjualan Actions
export const deleteReturPenjualanRequest = (id) => ({
  type: "DELETE_RETUR_PENJUALAN_REQUEST",
  payload: { id },
});

export const deleteReturPenjualanSuccess = (id) => ({
  type: "DELETE_RETUR_PENJUALAN_SUCCESS",
  payload: { id },
});

export const deleteReturPenjualanFailure = (error) => ({
  type: "DELETE_RETUR_PENJUALAN_FAILURE",
  payload: { error },
});

// Reset messages
export const resetReturPenjualanMessages = () => ({
  type: "RESET_RETUR_PENJUALAN_MESSAGES",
});
