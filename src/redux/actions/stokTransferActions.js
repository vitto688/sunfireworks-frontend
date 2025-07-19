// Simple StokTransfer Actions
// Direct actions for stock transfer without sub-types

// Fetch StokTransfer Actions
export const fetchStokTransferRequest = (params = {}) => ({
  type: "FETCH_STOK_TRANSFER_REQUEST",
  payload: { params },
});

export const fetchStokTransferSuccess = (data) => ({
  type: "FETCH_STOK_TRANSFER_SUCCESS",
  payload: { data },
});

export const fetchStokTransferFailure = (error) => ({
  type: "FETCH_STOK_TRANSFER_FAILURE",
  payload: { error },
});

// Fetch StokTransfer by ID Actions
export const fetchStokTransferByIdRequest = (id) => ({
  type: "FETCH_STOK_TRANSFER_BY_ID_REQUEST",
  payload: { id },
});

export const fetchStokTransferByIdSuccess = (data) => ({
  type: "FETCH_STOK_TRANSFER_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchStokTransferByIdFailure = (error) => ({
  type: "FETCH_STOK_TRANSFER_BY_ID_FAILURE",
  payload: { error },
});

// Add StokTransfer Actions
export const addStokTransferRequest = (data) => ({
  type: "ADD_STOK_TRANSFER_REQUEST",
  payload: { data },
});

export const addStokTransferSuccess = (data) => ({
  type: "ADD_STOK_TRANSFER_SUCCESS",
  payload: { data },
});

export const addStokTransferFailure = (error) => ({
  type: "ADD_STOK_TRANSFER_FAILURE",
  payload: { error },
});

// Update StokTransfer Actions
export const updateStokTransferRequest = (id, data) => ({
  type: "UPDATE_STOK_TRANSFER_REQUEST",
  payload: { id, data },
});

export const updateStokTransferSuccess = (data) => ({
  type: "UPDATE_STOK_TRANSFER_SUCCESS",
  payload: { data },
});

export const updateStokTransferFailure = (error) => ({
  type: "UPDATE_STOK_TRANSFER_FAILURE",
  payload: { error },
});

// Delete StokTransfer Actions
export const deleteStokTransferRequest = (id) => ({
  type: "DELETE_STOK_TRANSFER_REQUEST",
  payload: { id },
});

export const deleteStokTransferSuccess = (id) => ({
  type: "DELETE_STOK_TRANSFER_SUCCESS",
  payload: { id },
});

export const deleteStokTransferFailure = (error) => ({
  type: "DELETE_STOK_TRANSFER_FAILURE",
  payload: { error },
});

// Reset Messages Actions
export const resetStokTransferMessages = () => ({
  type: "RESET_STOK_TRANSFER_MESSAGES",
});
