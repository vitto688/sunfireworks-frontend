import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSPKSuccess,
  fetchSPKFailure,
  fetchSPKByIdSuccess,
  fetchSPKByIdFailure,
  addSPKSuccess,
  addSPKFailure,
  updateSPKSuccess,
  updateSPKFailure,
  deleteSPKSuccess,
  deleteSPKFailure,
} from "../actions/spkActions";

import {
  fetchSPK,
  fetchSPKById,
  addSPK,
  updateSPK,
  deleteSPK,
} from "../../api/spk";

// Fetch SPK Saga
export function* fetchSPKSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchSPK, params);
    yield put(fetchSPKSuccess(response));
  } catch (error) {
    yield put(fetchSPKFailure(error));
  }
}

// Fetch SPK by ID Saga
function* fetchSPKByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchSPKById, id);
    yield put(fetchSPKByIdSuccess(response));
  } catch (error) {
    yield put(fetchSPKByIdFailure(error));
  }
}

// Add SPK Saga
function* addSPKSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addSPK, data);
    yield put(addSPKSuccess(response));
  } catch (error) {
    yield put(addSPKFailure(error));
  }
}

// Update SPK Saga
function* updateSPKSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateSPK, id, data);
    yield put(updateSPKSuccess(response));
  } catch (error) {
    yield put(updateSPKFailure(error));
  }
}

// Delete SPK Saga
function* deleteSPKSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteSPK, id);
    yield put(deleteSPKSuccess(id));
  } catch (error) {
    yield put(deleteSPKFailure(error));
  }
}

// Watcher saga
function* spkSaga() {
  yield takeLatest("FETCH_SPK_REQUEST", fetchSPKSaga);
  yield takeLatest("FETCH_SPK_BY_ID_REQUEST", fetchSPKByIdSaga);
  yield takeLatest("ADD_SPK_REQUEST", addSPKSaga);
  yield takeLatest("UPDATE_SPK_REQUEST", updateSPKSaga);
  yield takeLatest("DELETE_SPK_REQUEST", deleteSPKSaga);
}

export default spkSaga;
