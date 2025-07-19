import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSuratPengeluaranBarangSuccess,
  fetchSuratPengeluaranBarangFailure,
  fetchSuratPengeluaranBarangByIdSuccess,
  fetchSuratPengeluaranBarangByIdFailure,
  addSuratPengeluaranBarangSuccess,
  addSuratPengeluaranBarangFailure,
  updateSuratPengeluaranBarangSuccess,
  updateSuratPengeluaranBarangFailure,
  deleteSuratPengeluaranBarangSuccess,
  deleteSuratPengeluaranBarangFailure,
} from "../actions/suratPengeluaranBarangActions";

import {
  fetchSuratPengeluaranBarang,
  fetchSuratPengeluaranBarangById,
  addSuratPengeluaranBarang,
  updateSuratPengeluaranBarang,
  deleteSuratPengeluaranBarang,
} from "../../api/suratPengeluaranBarang";

// Fetch Surat Pengeluaran Barang Saga
function* fetchSuratPengeluaranBarangSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchSuratPengeluaranBarang, params);
    yield put(fetchSuratPengeluaranBarangSuccess(response));
  } catch (error) {
    yield put(fetchSuratPengeluaranBarangFailure(error));
  }
}

// Fetch Surat Pengeluaran Barang by ID Saga
function* fetchSuratPengeluaranBarangByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchSuratPengeluaranBarangById, id);
    yield put(fetchSuratPengeluaranBarangByIdSuccess(response));
  } catch (error) {
    yield put(fetchSuratPengeluaranBarangByIdFailure(error));
  }
}

// Add Surat Pengeluaran Barang Saga
function* addSuratPengeluaranBarangSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addSuratPengeluaranBarang, data);
    yield put(addSuratPengeluaranBarangSuccess(response));
  } catch (error) {
    yield put(addSuratPengeluaranBarangFailure(error));
  }
}

// Update Surat Pengeluaran Barang Saga
function* updateSuratPengeluaranBarangSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateSuratPengeluaranBarang, id, data);
    yield put(updateSuratPengeluaranBarangSuccess(response));
  } catch (error) {
    yield put(updateSuratPengeluaranBarangFailure(error));
  }
}

// Delete Surat Pengeluaran Barang Saga
function* deleteSuratPengeluaranBarangSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteSuratPengeluaranBarang, id);
    yield put(deleteSuratPengeluaranBarangSuccess(id));
  } catch (error) {
    yield put(deleteSuratPengeluaranBarangFailure(error));
  }
}

// Watcher saga
export default function* suratPengeluaranBarangSaga() {
  yield takeLatest(
    "FETCH_SURAT_PENGELUARAN_BARANG_REQUEST",
    fetchSuratPengeluaranBarangSaga
  );
  yield takeLatest(
    "FETCH_SURAT_PENGELUARAN_BARANG_BY_ID_REQUEST",
    fetchSuratPengeluaranBarangByIdSaga
  );
  yield takeLatest(
    "ADD_SURAT_PENGELUARAN_BARANG_REQUEST",
    addSuratPengeluaranBarangSaga
  );
  yield takeLatest(
    "UPDATE_SURAT_PENGELUARAN_BARANG_REQUEST",
    updateSuratPengeluaranBarangSaga
  );
  yield takeLatest(
    "DELETE_SURAT_PENGELUARAN_BARANG_REQUEST",
    deleteSuratPengeluaranBarangSaga
  );
}
