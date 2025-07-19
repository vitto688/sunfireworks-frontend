import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchReturPembelianSuccess,
  fetchReturPembelianFailure,
  fetchReturPembelianByIdSuccess,
  fetchReturPembelianByIdFailure,
  addReturPembelianSuccess,
  addReturPembelianFailure,
  updateReturPembelianSuccess,
  updateReturPembelianFailure,
  deleteReturPembelianSuccess,
  deleteReturPembelianFailure,
} from "../actions/returPembelianActions";

import {
  fetchReturPembelian,
  fetchReturPembelianById,
  addReturPembelian,
  updateReturPembelian,
  deleteReturPembelian,
} from "../../api/returPembelian";

// Fetch Retur Pembelian Saga
function* fetchReturPembelianSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchReturPembelian, params);
    yield put(fetchReturPembelianSuccess(response));
  } catch (error) {
    yield put(fetchReturPembelianFailure(error));
  }
}

// Fetch Retur Pembelian by ID Saga
function* fetchReturPembelianByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchReturPembelianById, id);
    yield put(fetchReturPembelianByIdSuccess(response));
  } catch (error) {
    yield put(fetchReturPembelianByIdFailure(error));
  }
}

// Add Retur Pembelian Saga
function* addReturPembelianSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addReturPembelian, data);
    yield put(addReturPembelianSuccess(response));
  } catch (error) {
    yield put(addReturPembelianFailure(error));
  }
}

// Update Retur Pembelian Saga
function* updateReturPembelianSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateReturPembelian, id, data);
    yield put(updateReturPembelianSuccess(response));
  } catch (error) {
    yield put(updateReturPembelianFailure(error));
  }
}

// Delete Retur Pembelian Saga
function* deleteReturPembelianSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteReturPembelian, id);
    yield put(deleteReturPembelianSuccess(id));
  } catch (error) {
    yield put(deleteReturPembelianFailure(error));
  }
}

// Watcher saga
export default function* returPembelianSaga() {
  yield takeLatest("FETCH_RETUR_PEMBELIAN_REQUEST", fetchReturPembelianSaga);
  yield takeLatest(
    "FETCH_RETUR_PEMBELIAN_BY_ID_REQUEST",
    fetchReturPembelianByIdSaga
  );
  yield takeLatest("ADD_RETUR_PEMBELIAN_REQUEST", addReturPembelianSaga);
  yield takeLatest("UPDATE_RETUR_PEMBELIAN_REQUEST", updateReturPembelianSaga);
  yield takeLatest("DELETE_RETUR_PEMBELIAN_REQUEST", deleteReturPembelianSaga);
}
