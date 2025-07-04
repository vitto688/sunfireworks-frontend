import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchMutasiMasukSuccess,
  fetchMutasiMasukFailure,
  addMutasiMasukSuccess,
  addMutasiMasukFailure,
  updateMutasiMasukSuccess,
  updateMutasiMasukFailure,
  deleteMutasiMasukSuccess,
  deleteMutasiMasukFailure,
} from "../actions/mutasiMasukActions";

// Import API functions with new structure
import mutasiMasukAPI from "../../api/mutasiMasuk";

// Worker Sagas
function* fetchMutasiMasukSaga() {
  try {
    const mutasiMasuk = yield call(mutasiMasukAPI.getAllMutasiMasuk);
    yield put(fetchMutasiMasukSuccess(mutasiMasuk));
  } catch (error) {
    yield put(fetchMutasiMasukFailure(error.message));
  }
}

function* addMutasiMasukSaga(action) {
  try {
    const newMutasiMasuk = yield call(
      mutasiMasukAPI.createMutasiMasuk,
      action.payload
    );
    yield put(addMutasiMasukSuccess(newMutasiMasuk));
  } catch (error) {
    yield put(addMutasiMasukFailure(error.message));
  }
}

function* updateMutasiMasukSaga(action) {
  try {
    const updatedMutasiMasuk = yield call(
      mutasiMasukAPI.updateMutasiMasuk,
      action.payload.id,
      action.payload
    );
    yield put(updateMutasiMasukSuccess(updatedMutasiMasuk));
  } catch (error) {
    yield put(updateMutasiMasukFailure(error.message));
  }
}

function* deleteMutasiMasukSaga(action) {
  try {
    yield call(mutasiMasukAPI.deleteMutasiMasuk, action.payload);
    yield put(deleteMutasiMasukSuccess(action.payload));
  } catch (error) {
    yield put(deleteMutasiMasukFailure(error.message));
  }
}

// Watcher Sagas
function* watchFetchMutasiMasuk() {
  yield takeLatest("FETCH_MUTASI_MASUK_REQUEST", fetchMutasiMasukSaga);
}

function* watchAddMutasiMasuk() {
  yield takeEvery("ADD_MUTASI_MASUK_REQUEST", addMutasiMasukSaga);
}

function* watchUpdateMutasiMasuk() {
  yield takeEvery("UPDATE_MUTASI_MASUK_REQUEST", updateMutasiMasukSaga);
}

function* watchDeleteMutasiMasuk() {
  yield takeEvery("DELETE_MUTASI_MASUK_REQUEST", deleteMutasiMasukSaga);
}

// Root Saga
export default function* mutasiMasukSaga() {
  yield [
    watchFetchMutasiMasuk(),
    watchAddMutasiMasuk(),
    watchUpdateMutasiMasuk(),
    watchDeleteMutasiMasuk(),
  ];
}
