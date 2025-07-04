import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSPGSuccess,
  fetchSPGFailure,
  fetchSPGByIdSuccess,
  fetchSPGByIdFailure,
  addSPGSuccess,
  addSPGFailure,
  updateSPGSuccess,
  updateSPGFailure,
  deleteSPGSuccess,
  deleteSPGFailure,
} from "../actions/spgActions";

// Import API functions
import {
  spgImportAPI,
  spgBawangAPI,
  spgKawatAPI,
  spgLainAPI,
} from "../../api/spg";

// Helper function to get the correct API based on SPG type
const getSPGAPI = (spgType) => {
  switch (spgType) {
    case "import":
      return spgImportAPI;
    case "bawang":
      return spgBawangAPI;
    case "kawat":
      return spgKawatAPI;
    case "lain":
      return spgLainAPI;
    default:
      throw new Error(`Unknown SPG type: ${spgType}`);
  }
};

// Helper function to get the correct method names based on SPG type
const getSPGMethods = (spgType) => {
  let methodSuffix;
  switch (spgType) {
    case "import":
      methodSuffix = "Import";
      break;
    case "bawang":
      methodSuffix = "Bawang";
      break;
    case "kawat":
      methodSuffix = "Kawat";
      break;
    case "lain":
      methodSuffix = "Lain";
      break;
    default:
      methodSuffix = spgType.charAt(0).toUpperCase() + spgType.slice(1);
  }

  return {
    getAll: `getAllSPG${methodSuffix}`,
    getById: `getSPG${methodSuffix}ById`,
    create: `createSPG${methodSuffix}`,
    update: `updateSPG${methodSuffix}`,
    delete: `deleteSPG${methodSuffix}`,
  };
};

// Generic SPG Sagas
function* fetchSPG(action) {
  try {
    const { spgType } = action.payload;
    const api = getSPGAPI(spgType);
    const methods = getSPGMethods(spgType);
    const response = yield call(api[methods.getAll]);
    yield put(fetchSPGSuccess(spgType, response));
  } catch (error) {
    const { spgType } = action.payload;
    yield put(fetchSPGFailure(spgType, error.message));
  }
}

function* fetchSPGById(action) {
  try {
    const { spgType, id } = action.payload;
    const api = getSPGAPI(spgType);
    const methods = getSPGMethods(spgType);
    const response = yield call(api[methods.getById], id);
    yield put(fetchSPGByIdSuccess(spgType, response));
  } catch (error) {
    const { spgType } = action.payload;
    yield put(fetchSPGByIdFailure(spgType, error.message));
  }
}

function* addSPG(action) {
  try {
    const { spgType, data } = action.payload;
    const api = getSPGAPI(spgType);
    const methods = getSPGMethods(spgType);
    const response = yield call(api[methods.create], data);
    yield put(addSPGSuccess(spgType, response));
  } catch (error) {
    const { spgType } = action.payload;
    yield put(addSPGFailure(spgType, error.message));
  }
}

function* updateSPG(action) {
  try {
    const { spgType, data } = action.payload;
    const api = getSPGAPI(spgType);
    const methods = getSPGMethods(spgType);
    const response = yield call(api[methods.update], data.id, data);
    yield put(updateSPGSuccess(spgType, response));
  } catch (error) {
    const { spgType } = action.payload;
    yield put(updateSPGFailure(spgType, error.message));
  }
}

function* deleteSPG(action) {
  try {
    const { spgType, id } = action.payload;
    const api = getSPGAPI(spgType);
    const methods = getSPGMethods(spgType);
    yield call(api[methods.delete], id);
    yield put(deleteSPGSuccess(spgType, id));
  } catch (error) {
    const { spgType } = action.payload;
    yield put(deleteSPGFailure(spgType, error.message));
  }
}

// Root Saga
function* spgSaga() {
  // Generic SPG watchers
  yield takeLatest("FETCH_SPG_REQUEST", fetchSPG);
  yield takeLatest("FETCH_SPG_BY_ID_REQUEST", fetchSPGById);
  yield takeLatest("ADD_SPG_REQUEST", addSPG);
  yield takeLatest("UPDATE_SPG_REQUEST", updateSPG);
  yield takeLatest("DELETE_SPG_REQUEST", deleteSPG);
}

export default spgSaga;
