import { call, put, takeEvery } from "redux-saga/effects";
import * as returPenjualanReportAPI from "../../api/reportReturPenjualan";
import {
  fetchReturPenjualanReportSuccess,
  fetchReturPenjualanReportFailure,
  exportReturPenjualanReportSuccess,
  exportReturPenjualanReportFailure,
  fetchReturPenjualanReportNPSuccess,
  fetchReturPenjualanReportNPFailure,
} from "../actions/returPenjualanReportActions";

// Fetch Retur Penjualan Report Saga
function* fetchReturPenjualanReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      returPenjualanReportAPI.fetchReturPenjualanReport,
      params
    );
    yield put(fetchReturPenjualanReportSuccess(response));
  } catch (error) {
    yield put(fetchReturPenjualanReportFailure(error));
  }
}

function* fetchReturPenjualanReportNPSaga(action) {
  try {
    const { params } = action.payload;
    params.paginate = false; // Disable pagination for non-paginated report
    const response = yield call(
      returPenjualanReportAPI.fetchReturPenjualanReport,
      params
    );
    yield put(fetchReturPenjualanReportNPSuccess(response));
  } catch (error) {
    yield put(fetchReturPenjualanReportNPFailure(error));
  }
}

// Export Retur Penjualan Report Saga
function* exportReturPenjualanReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      returPenjualanReportAPI.exportReturPenjualanReport,
      params
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `retur-penjualan-report-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(exportReturPenjualanReportSuccess(response));
  } catch (error) {
    yield put(exportReturPenjualanReportFailure(error));
  }
}

// Root Retur Penjualan Report Saga
export default function* returPenjualanReportSaga() {
  yield takeEvery(
    "FETCH_RETUR_PENJUALAN_REPORT_REQUEST",
    fetchReturPenjualanReportSaga
  );
  yield takeEvery(
    "FETCH_RETUR_PENJUALAN_REPORT_NP_REQUEST",
    fetchReturPenjualanReportNPSaga
  );
  yield takeEvery(
    "EXPORT_RETUR_PENJUALAN_REPORT_REQUEST",
    exportReturPenjualanReportSaga
  );
}
