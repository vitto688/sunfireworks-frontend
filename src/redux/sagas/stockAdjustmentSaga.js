import { call, put, takeEvery } from "redux-saga/effects";
import stockAdjustmentAPI from "../../api/stockAdjustment";
import {
  fetchStockAdjustmentsSuccess,
  fetchStockAdjustmentsFailure,
  fetchStockAdjustmentByIdSuccess,
  fetchStockAdjustmentByIdFailure,
  createStockAdjustmentSuccess,
  createStockAdjustmentFailure,
  updateStockAdjustmentSuccess,
  updateStockAdjustmentFailure,
  deleteStockAdjustmentSuccess,
  deleteStockAdjustmentFailure,
} from "../actions/stockAdjustmentActions";

// Fetch Stock Adjustments
function* fetchStockAdjustmentsSaga(action) {
  try {
    const response = yield call(
      stockAdjustmentAPI.getAllStockAdjustments,
      action.payload
    );
    yield put(fetchStockAdjustmentsSuccess(response));
  } catch (error) {
    yield put(
      fetchStockAdjustmentsFailure({
        message: error.response?.data?.message || error.message,
        code: error.response?.status,
      })
    );
  }
}

// Fetch Stock Adjustment by ID
function* fetchStockAdjustmentByIdSaga(action) {
  try {
    const response = yield call(
      stockAdjustmentAPI.getStockAdjustmentById,
      action.payload
    );
    yield put(fetchStockAdjustmentByIdSuccess(response));
  } catch (error) {
    yield put(
      fetchStockAdjustmentByIdFailure({
        message: error.response?.data?.message || error.message,
        code: error.response?.status,
      })
    );
  }
}

// Create Stock Adjustment
function* createStockAdjustmentSaga(action) {
  try {
    const response = yield call(
      stockAdjustmentAPI.createStockAdjustment,
      action.payload
    );
    yield put(createStockAdjustmentSuccess(response));
  } catch (error) {
    yield put(
      createStockAdjustmentFailure({
        message: error.response?.data?.message || error.message,
        code: error.response?.status,
      })
    );
  }
}

// Update Stock Adjustment
function* updateStockAdjustmentSaga(action) {
  try {
    const { id, stockAdjustmentData } = action.payload;
    const response = yield call(
      stockAdjustmentAPI.updateStockAdjustment,
      id,
      stockAdjustmentData
    );
    yield put(updateStockAdjustmentSuccess(response));
  } catch (error) {
    yield put(
      updateStockAdjustmentFailure({
        message: error.response?.data?.message || error.message,
        code: error.response?.status,
      })
    );
  }
}

// Delete Stock Adjustment
function* deleteStockAdjustmentSaga(action) {
  try {
    yield call(stockAdjustmentAPI.deleteStockAdjustment, action.payload);
    yield put(deleteStockAdjustmentSuccess(action.payload));
  } catch (error) {
    yield put(
      deleteStockAdjustmentFailure({
        message: error.response?.data?.message || error.message,
        code: error.response?.status,
      })
    );
  }
}

// Watcher Saga
function* stockAdjustmentSaga() {
  yield takeEvery("FETCH_STOCK_ADJUSTMENTS_REQUEST", fetchStockAdjustmentsSaga);
  yield takeEvery(
    "FETCH_STOCK_ADJUSTMENT_BY_ID_REQUEST",
    fetchStockAdjustmentByIdSaga
  );
  yield takeEvery("CREATE_STOCK_ADJUSTMENT_REQUEST", createStockAdjustmentSaga);
  yield takeEvery("UPDATE_STOCK_ADJUSTMENT_REQUEST", updateStockAdjustmentSaga);
  yield takeEvery("DELETE_STOCK_ADJUSTMENT_REQUEST", deleteStockAdjustmentSaga);
}

export default stockAdjustmentSaga;
