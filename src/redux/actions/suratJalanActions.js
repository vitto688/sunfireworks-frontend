// Surat Jalan Actions
// Direct actions for Surat Jalan without sub-types

// Fetch Surat Jalan Actions
export const fetchSuratJalanRequest = (params = {}) => ({
  type: "FETCH_SURAT_JALAN_REQUEST",
  payload: { params },
});

export const fetchSuratJalanSuccess = (data) => ({
  type: "FETCH_SURAT_JALAN_SUCCESS",
  payload: { data },
});

export const fetchSuratJalanFailure = (error) => ({
  type: "FETCH_SURAT_JALAN_FAILURE",
  payload: { error },
});

// Fetch Surat Jalan by ID Actions
export const fetchSuratJalanByIdRequest = (id) => ({
  type: "FETCH_SURAT_JALAN_BY_ID_REQUEST",
  payload: { id },
});

export const fetchSuratJalanByIdSuccess = (data) => ({
  type: "FETCH_SURAT_JALAN_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchSuratJalanByIdFailure = (error) => ({
  type: "FETCH_SURAT_JALAN_BY_ID_FAILURE",
  payload: { error },
});

// Add Surat Jalan Actions
export const addSuratJalanRequest = (data) => ({
  type: "ADD_SURAT_JALAN_REQUEST",
  payload: { data },
});

export const addSuratJalanSuccess = (data) => ({
  type: "ADD_SURAT_JALAN_SUCCESS",
  payload: { data },
});

export const addSuratJalanFailure = (error) => ({
  type: "ADD_SURAT_JALAN_FAILURE",
  payload: { error },
});

// Update Surat Jalan Actions
export const updateSuratJalanRequest = (id, data) => ({
  type: "UPDATE_SURAT_JALAN_REQUEST",
  payload: { id, data },
});

export const updateSuratJalanSuccess = (data) => ({
  type: "UPDATE_SURAT_JALAN_SUCCESS",
  payload: { data },
});

export const updateSuratJalanFailure = (error) => ({
  type: "UPDATE_SURAT_JALAN_FAILURE",
  payload: { error },
});

// Delete Surat Jalan Actions
export const deleteSuratJalanRequest = (id) => ({
  type: "DELETE_SURAT_JALAN_REQUEST",
  payload: { id },
});

export const deleteSuratJalanSuccess = (id) => ({
  type: "DELETE_SURAT_JALAN_SUCCESS",
  payload: { id },
});

export const deleteSuratJalanFailure = (error) => ({
  type: "DELETE_SURAT_JALAN_FAILURE",
  payload: { error },
});

// Reset messages
export const resetSuratJalanMessages = () => ({
  type: "RESET_SURAT_JALAN_MESSAGES",
});
