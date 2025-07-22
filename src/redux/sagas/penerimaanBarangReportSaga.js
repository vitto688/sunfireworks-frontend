import { call, put, takeEvery } from "redux-saga/effects";
import * as penerimaanBarangReportAPI from "../../api/reportPenerimaanBarang";
import {
  fetchPenerimaanBarangReportSuccess,
  fetchPenerimaanBarangReportFailure,
  exportPenerimaanBarangReportSuccess,
  exportPenerimaanBarangReportFailure,
} from "../actions/penerimaanBarangReportActions";

// Fetch Penerimaan Barang Report Saga
function* fetchPenerimaanBarangReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      penerimaanBarangReportAPI.fetchPenerimaanBarangReport,
      params
    );
    yield put(fetchPenerimaanBarangReportSuccess(response));
  } catch (error) {
    yield put(fetchPenerimaanBarangReportFailure(error));
  }
}

// Export Penerimaan Barang Report Saga
function* exportPenerimaanBarangReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      penerimaanBarangReportAPI.exportPenerimaanBarangReport,
      params
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `penerimaan-barang-report-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(exportPenerimaanBarangReportSuccess(response));
  } catch (error) {
    yield put(exportPenerimaanBarangReportFailure(error));
  }
}

// Root Penerimaan Barang Report Saga
export default function* penerimaanBarangReportSaga() {
  yield takeEvery(
    "FETCH_PENERIMAAN_BARANG_REPORT_REQUEST",
    fetchPenerimaanBarangReportSaga
  );
  yield takeEvery(
    "EXPORT_PENERIMAAN_BARANG_REPORT_REQUEST",
    exportPenerimaanBarangReportSaga
  );
}
