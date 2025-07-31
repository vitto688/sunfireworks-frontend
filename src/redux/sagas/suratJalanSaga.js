import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSuratJalanSuccess,
  fetchSuratJalanFailure,
  fetchSuratJalanByIdSuccess,
  fetchSuratJalanByIdFailure,
  addSuratJalanSuccess,
  addSuratJalanFailure,
  updateSuratJalanSuccess,
  updateSuratJalanFailure,
  deleteSuratJalanSuccess,
  deleteSuratJalanFailure,
} from "../actions/suratJalanActions";

import {
  fetchSuratJalan,
  fetchSuratJalanById,
  addSuratJalan,
  updateSuratJalan,
  deleteSuratJalan,
} from "../../api/suratJalan";
import { fetchAllSPKSaga } from "./spkSaga";

// Fetch Surat Jalan Saga
function* fetchSuratJalanSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(fetchSuratJalan, params);
    yield call(fetchAllSPKSaga, { payload: { params: { paginate: false } } });
    yield put(fetchSuratJalanSuccess(response));
  } catch (error) {
    yield put(fetchSuratJalanFailure(error));
  }
}

// Fetch Surat Jalan by ID Saga
function* fetchSuratJalanByIdSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(fetchSuratJalanById, id);
    yield put(fetchSuratJalanByIdSuccess(response));
  } catch (error) {
    yield put(fetchSuratJalanByIdFailure(error));
  }
}

// Add Surat Jalan Saga
function* addSuratJalanSaga(action) {
  try {
    const { data } = action.payload;
    const response = yield call(addSuratJalan, data);
    yield call(fetchAllSPKSaga, { payload: { params: { paginate: false } } });
    yield put(addSuratJalanSuccess(response));
  } catch (error) {
    yield put(addSuratJalanFailure(error));
  }
}

// Update Surat Jalan Saga
function* updateSuratJalanSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateSuratJalan, id, data);
    yield call(fetchAllSPKSaga, { payload: { params: { paginate: false } } });
    yield put(updateSuratJalanSuccess(response));
  } catch (error) {
    yield put(updateSuratJalanFailure(error));
  }
}

// Delete Surat Jalan Saga
function* deleteSuratJalanSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteSuratJalan, id);
    yield call(fetchAllSPKSaga, { payload: { params: { paginate: false } } });
    yield put(deleteSuratJalanSuccess(id));
  } catch (error) {
    yield put(deleteSuratJalanFailure(error));
  }
}

// Watcher saga
export default function* suratJalanSaga() {
  yield takeLatest("FETCH_SURAT_JALAN_REQUEST", fetchSuratJalanSaga);
  yield takeLatest("FETCH_SURAT_JALAN_BY_ID_REQUEST", fetchSuratJalanByIdSaga);
  yield takeLatest("ADD_SURAT_JALAN_REQUEST", addSuratJalanSaga);
  yield takeLatest("UPDATE_SURAT_JALAN_REQUEST", updateSuratJalanSaga);
  yield takeLatest("DELETE_SURAT_JALAN_REQUEST", deleteSuratJalanSaga);
}
