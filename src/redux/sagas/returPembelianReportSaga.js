import { call, put, takeEvery } from "redux-saga/effects";
import * as returPembelianReportAPI from "../../api/reportReturPembelian";
import {
  fetchReturPembelianReportSuccess,
  fetchReturPembelianReportFailure,
  exportReturPembelianReportSuccess,
  exportReturPembelianReportFailure,
} from "../actions/returPembelianReportActions";

// Fetch Retur Pembelian Report Saga
function* fetchReturPembelianReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      returPembelianReportAPI.fetchReturPembelianReport,
      params
    );
    yield put(fetchReturPembelianReportSuccess(response));
  } catch (error) {
    yield put(fetchReturPembelianReportFailure(error));
  }
}

// Export Retur Pembelian Report Saga
function* exportReturPembelianReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      returPembelianReportAPI.exportReturPembelianReport,
      params
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `retur-pembelian-report-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(exportReturPembelianReportSuccess(response));
  } catch (error) {
    yield put(exportReturPembelianReportFailure(error));
  }
}

// Root Retur Pembelian Report Saga
export default function* returPembelianReportSaga() {
  yield takeEvery(
    "FETCH_RETUR_PEMBELIAN_REPORT_REQUEST",
    fetchReturPembelianReportSaga
  );
  yield takeEvery(
    "EXPORT_RETUR_PEMBELIAN_REPORT_REQUEST",
    exportReturPembelianReportSaga
  );
}
