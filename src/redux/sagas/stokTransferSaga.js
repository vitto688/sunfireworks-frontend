import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchStokTransferSuccess,
  fetchStokTransferFailure,
  fetchStokTransferByIdSuccess,
  fetchStokTransferByIdFailure,
  addStokTransferSuccess,
  addStokTransferFailure,
  updateStokTransferSuccess,
  updateStokTransferFailure,
  deleteStokTransferSuccess,
  deleteStokTransferFailure,
} from "../actions/stokTransferActions";

import {
  fetchStokTransfer,
  fetchStokTransferById,
  addStokTransfer,
  updateStokTransfer,
  deleteStokTransfer,
} from "../../api/stokTransfer";

// Fetch StokTransfer Saga
function* fetchStokTransferSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchStokTransfer, params);
    yield put(fetchStokTransferSuccess(response));
  } catch (error) {
    yield put(fetchStokTransferFailure(error));
  }
}

// Fetch StokTransfer by ID Saga
function* fetchStokTransferByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchStokTransferById, id);
    yield put(fetchStokTransferByIdSuccess(response));
  } catch (error) {
    yield put(fetchStokTransferByIdFailure(error));
  }
}

// Add StokTransfer Saga
function* addStokTransferSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addStokTransfer, data);
    yield put(addStokTransferSuccess(response));
  } catch (error) {
    yield put(addStokTransferFailure(error));
  }
}

// Update StokTransfer Saga
function* updateStokTransferSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateStokTransfer, id, data);
    yield put(updateStokTransferSuccess(response));
  } catch (error) {
    yield put(updateStokTransferFailure(error));
  }
}

// Delete StokTransfer Saga
function* deleteStokTransferSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteStokTransfer, id);
    yield put(deleteStokTransferSuccess(id));
  } catch (error) {
    yield put(deleteStokTransferFailure(error));
  }
}

// Watcher saga
function* stokTransferSaga() {
  yield takeLatest("FETCH_STOK_TRANSFER_REQUEST", fetchStokTransferSaga);
  yield takeLatest("FETCH_STOK_TRANSFER_BY_ID_REQUEST", fetchStokTransferByIdSaga);
  yield takeLatest("ADD_STOK_TRANSFER_REQUEST", addStokTransferSaga);
  yield takeLatest("UPDATE_STOK_TRANSFER_REQUEST", updateStokTransferSaga);
  yield takeLatest("DELETE_STOK_TRANSFER_REQUEST", deleteStokTransferSaga);
}

export default stokTransferSaga;
