import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchReturPenjualanSuccess,
  fetchReturPenjualanFailure,
  fetchReturPenjualanByIdSuccess,
  fetchReturPenjualanByIdFailure,
  addReturPenjualanSuccess,
  addReturPenjualanFailure,
  updateReturPenjualanSuccess,
  updateReturPenjualanFailure,
  deleteReturPenjualanSuccess,
  deleteReturPenjualanFailure,
} from "../actions/returPenjualanActions";

import {
  fetchReturPenjualan,
  fetchReturPenjualanById,
  addReturPenjualan,
  updateReturPenjualan,
  deleteReturPenjualan,
} from "../../api/returPenjualan";

// Fetch Retur Penjualan Saga
function* fetchReturPenjualanSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchReturPenjualan, params);
    yield put(fetchReturPenjualanSuccess(response));
  } catch (error) {
    yield put(fetchReturPenjualanFailure(error));
  }
}

// Fetch Retur Penjualan by ID Saga
function* fetchReturPenjualanByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchReturPenjualanById, id);
    yield put(fetchReturPenjualanByIdSuccess(response));
  } catch (error) {
    yield put(fetchReturPenjualanByIdFailure(error));
  }
}

// Add Retur Penjualan Saga
function* addReturPenjualanSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addReturPenjualan, data);
    yield put(addReturPenjualanSuccess(response));
  } catch (error) {
    yield put(addReturPenjualanFailure(error));
  }
}

// Update Retur Penjualan Saga
function* updateReturPenjualanSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateReturPenjualan, id, data);
    yield put(updateReturPenjualanSuccess(response));
  } catch (error) {
    yield put(updateReturPenjualanFailure(error));
  }
}

// Delete Retur Penjualan Saga
function* deleteReturPenjualanSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteReturPenjualan, id);
    yield put(deleteReturPenjualanSuccess(id));
  } catch (error) {
    yield put(deleteReturPenjualanFailure(error));
  }
}

// Watcher saga
export default function* returPenjualanSaga() {
  yield takeLatest("FETCH_RETUR_PENJUALAN_REQUEST", fetchReturPenjualanSaga);
  yield takeLatest(
    "FETCH_RETUR_PENJUALAN_BY_ID_REQUEST",
    fetchReturPenjualanByIdSaga
  );
  yield takeLatest("ADD_RETUR_PENJUALAN_REQUEST", addReturPenjualanSaga);
  yield takeLatest("UPDATE_RETUR_PENJUALAN_REQUEST", updateReturPenjualanSaga);
  yield takeLatest("DELETE_RETUR_PENJUALAN_REQUEST", deleteReturPenjualanSaga);
}
