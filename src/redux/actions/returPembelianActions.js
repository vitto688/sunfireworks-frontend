// Retur Pembelian Actions
// Direct actions for Retur Pembelian without sub-types

// Fetch Retur Pembelian Actions
export const fetchReturPembelianRequest = (params = {}) => ({
  type: "FETCH_RETUR_PEMBELIAN_REQUEST",
  payload: { params },
});

export const fetchReturPembelianSuccess = (data) => ({
  type: "FETCH_RETUR_PEMBELIAN_SUCCESS",
  payload: { data },
});

export const fetchReturPembelianFailure = (error) => ({
  type: "FETCH_RETUR_PEMBELIAN_FAILURE",
  payload: { error },
});

// Fetch Retur Pembelian by ID Actions
export const fetchReturPembelianByIdRequest = (id) => ({
  type: "FETCH_RETUR_PEMBELIAN_BY_ID_REQUEST",
  payload: { id },
});

export const fetchReturPembelianByIdSuccess = (data) => ({
  type: "FETCH_RETUR_PEMBELIAN_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchReturPembelianByIdFailure = (error) => ({
  type: "FETCH_RETUR_PEMBELIAN_BY_ID_FAILURE",
  payload: { error },
});

// Add Retur Pembelian Actions
export const addReturPembelianRequest = (data) => ({
  type: "ADD_RETUR_PEMBELIAN_REQUEST",
  payload: { data },
});

export const addReturPembelianSuccess = (data) => ({
  type: "ADD_RETUR_PEMBELIAN_SUCCESS",
  payload: { data },
});

export const addReturPembelianFailure = (error) => ({
  type: "ADD_RETUR_PEMBELIAN_FAILURE",
  payload: { error },
});

// Update Retur Pembelian Actions
export const updateReturPembelianRequest = (id, data) => ({
  type: "UPDATE_RETUR_PEMBELIAN_REQUEST",
  payload: { id, data },
});

export const updateReturPembelianSuccess = (data) => ({
  type: "UPDATE_RETUR_PEMBELIAN_SUCCESS",
  payload: { data },
});

export const updateReturPembelianFailure = (error) => ({
  type: "UPDATE_RETUR_PEMBELIAN_FAILURE",
  payload: { error },
});

// Delete Retur Pembelian Actions
export const deleteReturPembelianRequest = (id) => ({
  type: "DELETE_RETUR_PEMBELIAN_REQUEST",
  payload: { id },
});

export const deleteReturPembelianSuccess = (id) => ({
  type: "DELETE_RETUR_PEMBELIAN_SUCCESS",
  payload: { id },
});

export const deleteReturPembelianFailure = (error) => ({
  type: "DELETE_RETUR_PEMBELIAN_FAILURE",
  payload: { error },
});

// Reset messages
export const resetReturPembelianMessages = () => ({
  type: "RESET_RETUR_PEMBELIAN_MESSAGES",
});
