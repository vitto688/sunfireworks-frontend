import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSTBSuccess,
  fetchSTBFailure,
  fetchSTBByIdSuccess,
  fetchSTBByIdFailure,
  addSTBSuccess,
  addSTBFailure,
  updateSTBSuccess,
  updateSTBFailure,
  deleteSTBSuccess,
  deleteSTBFailure,
} from "../actions/stbActions";

import {
  fetchSTB,
  fetchSTBById,
  addSTB,
  updateSTB,
  deleteSTB,
} from "../../api/stb";

// Fetch STB Saga
export function* fetchSTBSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchSTB, params);
    yield put(fetchSTBSuccess(response));
  } catch (error) {
    yield put(fetchSTBFailure(error));
  }
}

// Fetch STB by ID Saga
function* fetchSTBByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchSTBById, id);
    yield put(fetchSTBByIdSuccess(response));
  } catch (error) {
    yield put(fetchSTBByIdFailure(error));
  }
}

// Add STB Saga
function* addSTBSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addSTB, data);
    yield put(addSTBSuccess(response));
  } catch (error) {
    yield put(addSTBFailure(error));
  }
}

// Update STB Saga
function* updateSTBSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateSTB, id, data);
    yield put(updateSTBSuccess(response));
  } catch (error) {
    yield put(updateSTBFailure(error));
  }
}

// Delete STB Saga
function* deleteSTBSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteSTB, id);
    yield put(deleteSTBSuccess(id));
  } catch (error) {
    yield put(deleteSTBFailure(error));
  }
}

// Watcher saga
function* stbSaga() {
  yield takeLatest("FETCH_STB_REQUEST", fetchSTBSaga);
  yield takeLatest("FETCH_STB_BY_ID_REQUEST", fetchSTBByIdSaga);
  yield takeLatest("ADD_STB_REQUEST", addSTBSaga);
  yield takeLatest("UPDATE_STB_REQUEST", updateSTBSaga);
  yield takeLatest("DELETE_STB_REQUEST", deleteSTBSaga);
}

export default stbSaga;
