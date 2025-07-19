// Simple SPK Actions
// Direct actions for SPK without sub-types

// Fetch SPK Actions
export const fetchSPKRequest = (params = {}) => ({
  type: "FETCH_SPK_REQUEST",
  payload: { params },
});

export const fetchSPKSuccess = (data) => ({
  type: "FETCH_SPK_SUCCESS",
  payload: { data },
});

export const fetchSPKFailure = (error) => ({
  type: "FETCH_SPK_FAILURE",
  payload: { error },
});

// Fetch SPK by ID Actions
export const fetchSPKByIdRequest = (id) => ({
  type: "FETCH_SPK_BY_ID_REQUEST",
  payload: { id },
});

export const fetchSPKByIdSuccess = (data) => ({
  type: "FETCH_SPK_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchSPKByIdFailure = (error) => ({
  type: "FETCH_SPK_BY_ID_FAILURE",
  payload: { error },
});

// Add SPK Actions
export const addSPKRequest = (data) => ({
  type: "ADD_SPK_REQUEST",
  payload: { data },
});

export const addSPKSuccess = (data) => ({
  type: "ADD_SPK_SUCCESS",
  payload: { data },
});

export const addSPKFailure = (error) => ({
  type: "ADD_SPK_FAILURE",
  payload: { error },
});

// Update SPK Actions
export const updateSPKRequest = (id, data) => ({
  type: "UPDATE_SPK_REQUEST",
  payload: { id, data },
});

export const updateSPKSuccess = (data) => ({
  type: "UPDATE_SPK_SUCCESS",
  payload: { data },
});

export const updateSPKFailure = (error) => ({
  type: "UPDATE_SPK_FAILURE",
  payload: { error },
});

// Delete SPK Actions
export const deleteSPKRequest = (id) => ({
  type: "DELETE_SPK_REQUEST",
  payload: { id },
});

export const deleteSPKSuccess = (id) => ({
  type: "DELETE_SPK_SUCCESS",
  payload: { id },
});

export const deleteSPKFailure = (error) => ({
  type: "DELETE_SPK_FAILURE",
  payload: { error },
});

// Reset Messages Actions
export const resetSPKMessages = () => ({
  type: "RESET_SPK_MESSAGES",
});
