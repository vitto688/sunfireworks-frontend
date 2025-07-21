import { call, put, takeEvery } from "redux-saga/effects";
import * as stockReportAPI from "../../api/reportStock";
import {
  fetchStockReportSuccess,
  fetchStockReportFailure,
  exportStockReportSuccess,
  exportStockReportFailure,
} from "../actions/stockReportActions";

// Fetch Stock Report Saga
function* fetchStockReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(stockReportAPI.fetchStockReport, params);
    yield put(fetchStockReportSuccess(response));
  } catch (error) {
    yield put(fetchStockReportFailure(error));
  }
}

// Export Stock Report Saga
function* exportStockReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(stockReportAPI.exportStockReport, params);

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `stock-report-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(exportStockReportSuccess(response));
  } catch (error) {
    yield put(exportStockReportFailure(error));
  }
}

// Root Stock Report Saga
export default function* stockReportSaga() {
  yield takeEvery("FETCH_STOCK_REPORT_REQUEST", fetchStockReportSaga);
  yield takeEvery("EXPORT_STOCK_REPORT_REQUEST", exportStockReportSaga);
}
