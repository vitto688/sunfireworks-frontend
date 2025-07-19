// Surat Pengeluaran Barang Actions
// Direct actions for Surat Pengeluaran Barang without sub-types

// Fetch Surat Pengeluaran Barang Actions
export const fetchSuratPengeluaranBarangRequest = (params = {}) => ({
  type: "FETCH_SURAT_PENGELUARAN_BARANG_REQUEST",
  payload: { params },
});

export const fetchSuratPengeluaranBarangSuccess = (data) => ({
  type: "FETCH_SURAT_PENGELUARAN_BARANG_SUCCESS",
  payload: { data },
});

export const fetchSuratPengeluaranBarangFailure = (error) => ({
  type: "FETCH_SURAT_PENGELUARAN_BARANG_FAILURE",
  payload: { error },
});

// Fetch Surat Pengeluaran Barang by ID Actions
export const fetchSuratPengeluaranBarangByIdRequest = (id) => ({
  type: "FETCH_SURAT_PENGELUARAN_BARANG_BY_ID_REQUEST",
  payload: { id },
});

export const fetchSuratPengeluaranBarangByIdSuccess = (data) => ({
  type: "FETCH_SURAT_PENGELUARAN_BARANG_BY_ID_SUCCESS",
  payload: { data },
});

export const fetchSuratPengeluaranBarangByIdFailure = (error) => ({
  type: "FETCH_SURAT_PENGELUARAN_BARANG_BY_ID_FAILURE",
  payload: { error },
});

// Add Surat Pengeluaran Barang Actions
export const addSuratPengeluaranBarangRequest = (data) => ({
  type: "ADD_SURAT_PENGELUARAN_BARANG_REQUEST",
  payload: { data },
});

export const addSuratPengeluaranBarangSuccess = (data) => ({
  type: "ADD_SURAT_PENGELUARAN_BARANG_SUCCESS",
  payload: { data },
});

export const addSuratPengeluaranBarangFailure = (error) => ({
  type: "ADD_SURAT_PENGELUARAN_BARANG_FAILURE",
  payload: { error },
});

// Update Surat Pengeluaran Barang Actions
export const updateSuratPengeluaranBarangRequest = (id, data) => ({
  type: "UPDATE_SURAT_PENGELUARAN_BARANG_REQUEST",
  payload: { id, data },
});

export const updateSuratPengeluaranBarangSuccess = (data) => ({
  type: "UPDATE_SURAT_PENGELUARAN_BARANG_SUCCESS",
  payload: { data },
});

export const updateSuratPengeluaranBarangFailure = (error) => ({
  type: "UPDATE_SURAT_PENGELUARAN_BARANG_FAILURE",
  payload: { error },
});

// Delete Surat Pengeluaran Barang Actions
export const deleteSuratPengeluaranBarangRequest = (id) => ({
  type: "DELETE_SURAT_PENGELUARAN_BARANG_REQUEST",
  payload: { id },
});

export const deleteSuratPengeluaranBarangSuccess = (id) => ({
  type: "DELETE_SURAT_PENGELUARAN_BARANG_SUCCESS",
  payload: { id },
});

export const deleteSuratPengeluaranBarangFailure = (error) => ({
  type: "DELETE_SURAT_PENGELUARAN_BARANG_FAILURE",
  payload: { error },
});

// Reset messages
export const resetSuratPengeluaranBarangMessages = () => ({
  type: "RESET_SURAT_PENGELUARAN_BARANG_MESSAGES",
});
