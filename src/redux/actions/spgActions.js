// Unified SPG Actions with spgType parameter

export const fetchSPGRequest = (spgType) => ({
  type: "FETCH_SPG_REQUEST",
  payload: { spgType },
});

export const fetchSPGSuccess = (spgType, data) => ({
  type: "FETCH_SPG_SUCCESS",
  payload: { spgType, data },
});

export const fetchSPGFailure = (spgType, error) => ({
  type: "FETCH_SPG_FAILURE",
  payload: { spgType, error },
});

export const fetchSPGByIdRequest = (spgType, id) => ({
  type: "FETCH_SPG_BY_ID_REQUEST",
  payload: { spgType, id },
});

export const fetchSPGByIdSuccess = (spgType, data) => ({
  type: "FETCH_SPG_BY_ID_SUCCESS",
  payload: { spgType, data },
});

export const fetchSPGByIdFailure = (spgType, error) => ({
  type: "FETCH_SPG_BY_ID_FAILURE",
  payload: { spgType, error },
});

export const addSPGRequest = (spgType, data) => ({
  type: "ADD_SPG_REQUEST",
  payload: { spgType, data },
});

export const addSPGSuccess = (spgType, data) => ({
  type: "ADD_SPG_SUCCESS",
  payload: { spgType, data },
});

export const addSPGFailure = (spgType, error) => ({
  type: "ADD_SPG_FAILURE",
  payload: { spgType, error },
});

export const updateSPGRequest = (spgType, data) => ({
  type: "UPDATE_SPG_REQUEST",
  payload: { spgType, data },
});

export const updateSPGSuccess = (spgType, data) => ({
  type: "UPDATE_SPG_SUCCESS",
  payload: { spgType, data },
});

export const updateSPGFailure = (spgType, error) => ({
  type: "UPDATE_SPG_FAILURE",
  payload: { spgType, error },
});

export const deleteSPGRequest = (spgType, id) => ({
  type: "DELETE_SPG_REQUEST",
  payload: { spgType, id },
});

export const deleteSPGSuccess = (spgType, id) => ({
  type: "DELETE_SPG_SUCCESS",
  payload: { spgType, id },
});

export const deleteSPGFailure = (spgType, error) => ({
  type: "DELETE_SPG_FAILURE",
  payload: { spgType, error },
});

export const resetSPGMessages = (spgType) => ({
  type: "RESET_SPG_MESSAGES",
  payload: { spgType },
});

// Helper actions dengan nama yang mudah digunakan
export const fetchSPGImportRequest = () => fetchSPGRequest("import");
export const fetchSPGBawangRequest = () => fetchSPGRequest("bawang");
export const fetchSPGKawatRequest = () => fetchSPGRequest("kawat");
export const fetchSPGLainRequest = () => fetchSPGRequest("lain");

export const fetchSPGImportByIdRequest = (id) =>
  fetchSPGByIdRequest("import", id);
export const fetchSPGBawangByIdRequest = (id) =>
  fetchSPGByIdRequest("bawang", id);
export const fetchSPGKawatByIdRequest = (id) =>
  fetchSPGByIdRequest("kawat", id);
export const fetchSPGLainByIdRequest = (id) => fetchSPGByIdRequest("lain", id);

export const addSPGImportRequest = (data) => addSPGRequest("import", data);
export const addSPGBawangRequest = (data) => addSPGRequest("bawang", data);
export const addSPGKawatRequest = (data) => addSPGRequest("kawat", data);
export const addSPGLainRequest = (data) => addSPGRequest("lain", data);

export const updateSPGImportRequest = (data) =>
  updateSPGRequest("import", data);
export const updateSPGBawangRequest = (data) =>
  updateSPGRequest("bawang", data);
export const updateSPGKawatRequest = (data) => updateSPGRequest("kawat", data);
export const updateSPGLainRequest = (data) => updateSPGRequest("lain", data);

export const deleteSPGImportRequest = (id) => deleteSPGRequest("import", id);
export const deleteSPGBawangRequest = (id) => deleteSPGRequest("bawang", id);
export const deleteSPGKawatRequest = (id) => deleteSPGRequest("kawat", id);
export const deleteSPGLainRequest = (id) => deleteSPGRequest("lain", id);

export const resetSPGImportMessages = () => resetSPGMessages("import");
export const resetSPGBawangMessages = () => resetSPGMessages("bawang");
export const resetSPGKawatMessages = () => resetSPGMessages("kawat");
export const resetSPGLainMessages = () => resetSPGMessages("lain");
