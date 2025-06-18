import { all, call, put, takeLatest } from "redux-saga/effects";

import stockAPI from "../../api/stock";
import {
  fetchStockByIdFailure,
  fetchStockByIdSuccess,
  fetchStockByProductIdFailure,
  fetchStockByProductIdSuccess,
  fetchStockByWarehouseIdFailure,
  fetchStockByWarehouseIdSuccess,
  fetchStocksFailure,
  fetchStocksSuccess,
  updateMultipleStocksFailure,
  updateMultipleStocksSuccess,
  updateStockFailure,
  updateStockSuccess,
} from "../actions/stockActions";

export function* fetchStocks() {
  try {
    const stocks = yield call(stockAPI.getAllStocks);
    yield put(fetchStocksSuccess(stocks));
  } catch (error) {
    yield put(fetchStocksFailure(error.message));
  }
}

function* fetchStockById(action) {
  try {
    const stock = yield call(stockAPI.getStockById, action.payload);
    yield put(fetchStockByIdSuccess(stock));
  } catch (error) {
    yield put(fetchStockByIdFailure(error.message));
  }
}

function* fetchStockByWarehouseId(action) {
  try {
    const stocks = yield call(stockAPI.getStockByWarehouseId, action.payload);
    yield put(fetchStockByWarehouseIdSuccess(stocks));
  } catch (error) {
    yield put(fetchStockByWarehouseIdFailure(error.message));
  }
}

function* fetchStockByProductId(action) {
  try {
    const stocks = yield call(stockAPI.getStockByProductId, action.payload);
    yield put(fetchStockByProductIdSuccess(stocks));
  } catch (error) {
    yield put(fetchStockByProductIdFailure(error.message));
  }
}

function* updateStock(action) {
  try {
    const stock = yield call(
      stockAPI.updateStock,
      action.payload.id,
      action.payload.body
    );
    yield put(updateStockSuccess(stock));
  } catch (error) {
    yield put(updateStockFailure(error.message));
  }
}

function* updateMultipleStocks(action) {
  try {
    const requests = [];
    action.payload.forEach((item) => {
      requests.push(
        call(stockAPI.updateStock, item.id, {
          product: item.product,
          warehouse: item.warehouse,
          carton_quantity: item.carton_quantity,
          pack_quantity: item.pack_quantity,
        })
      );
    });

    const stocks = yield all(requests);

    yield put(updateMultipleStocksSuccess(stocks));
  } catch (error) {
    yield put(updateMultipleStocksFailure(error.message));
  }
}

function* stockSaga() {
  yield takeLatest("FETCH_STOCKS_REQUEST", fetchStocks);
  yield takeLatest("FETCH_STOCK_BY_ID_REQUEST", fetchStockById);
  yield takeLatest(
    "FETCH_STOCK_BY_WAREHOUSE_ID_REQUEST",
    fetchStockByWarehouseId
  );
  yield takeLatest("FETCH_STOCK_BY_PRODUCT_ID_REQUEST", fetchStockByProductId);
  yield takeLatest("UPDATE_STOCK_REQUEST", updateStock);
  yield takeLatest("UPDATE_MULTIPLE_STOCKS_REQUEST", updateMultipleStocks);
}

export default stockSaga;
