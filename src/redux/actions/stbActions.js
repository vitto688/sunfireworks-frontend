// STB (Surat Terima Barang) Actions
// Direct actions for STB

// Fetch STB Actions
export const fetchSTBRequest = (params = {}) => ({
  type: "FETCH_STB_REQUEST",
  payload: { params },
});

export const fetchSTBSuccess = (data) => ({
  type: "FETCH_STB_SUCCESS",
  payload: { data },
});

export const fetchSTBFailure = (error) => ({
  type: "FETCH_STB_FAILURE",
  payload: { error },
});

// Fetch STB by ID Actions
export const fetchSTBByIdRequest = (id) => ({
  type: "FETCH_STB_BY_ID_REQUEST",
  payload: { id },
});

export const fetchSTBByIdSuccess = (data) => ({
  type: "FETCH_STB_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchSTBByIdFailure = (error) => ({
  type: "FETCH_STB_BY_ID_FAILURE",
  payload: { error },
});

// Add STB Actions
export const addSTBRequest = (data) => ({
  type: "ADD_STB_REQUEST",
  payload: { data },
});

export const addSTBSuccess = (data) => ({
  type: "ADD_STB_SUCCESS",
  payload: { data },
});

export const addSTBFailure = (error) => ({
  type: "ADD_STB_FAILURE",
  payload: { error },
});

// Update STB Actions
export const updateSTBRequest = (id, data) => ({
  type: "UPDATE_STB_REQUEST",
  payload: { id, data },
});

export const updateSTBSuccess = (data) => ({
  type: "UPDATE_STB_SUCCESS",
  payload: { data },
});

export const updateSTBFailure = (error) => ({
  type: "UPDATE_STB_FAILURE",
  payload: { error },
});

// Delete STB Actions
export const deleteSTBRequest = (id) => ({
  type: "DELETE_STB_REQUEST",
  payload: { id },
});

export const deleteSTBSuccess = (id) => ({
  type: "DELETE_STB_SUCCESS",
  payload: { id },
});

export const deleteSTBFailure = (error) => ({
  type: "DELETE_STB_FAILURE",
  payload: { error },
});

// Reset STB Messages
export const resetSTBMessages = () => ({
  type: "RESET_STB_MESSAGES",
});
