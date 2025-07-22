import { call, put, takeEvery } from "redux-saga/effects";
import * as pengeluaranBarangReportAPI from "../../api/reportPengeluaranBarang";
import {
  fetchPengeluaranBarangReportSuccess,
  fetchPengeluaranBarangReportFailure,
  exportPengeluaranBarangReportSuccess,
  exportPengeluaranBarangReportFailure,
} from "../actions/pengeluaranBarangReportActions";

// Fetch Pengeluaran Barang Report Saga
function* fetchPengeluaranBarangReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      pengeluaranBarangReportAPI.fetchPengeluaranBarangReport,
      params
    );
    yield put(fetchPengeluaranBarangReportSuccess(response));
  } catch (error) {
    yield put(fetchPengeluaranBarangReportFailure(error));
  }
}

// Export Pengeluaran Barang Report Saga
function* exportPengeluaranBarangReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      pengeluaranBarangReportAPI.exportPengeluaranBarangReport,
      params
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `pengeluaran-barang-report-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(exportPengeluaranBarangReportSuccess(response));
  } catch (error) {
    yield put(exportPengeluaranBarangReportFailure(error));
  }
}

// Root Pengeluaran Barang Report Saga
export default function* pengeluaranBarangReportSaga() {
  yield takeEvery(
    "FETCH_PENGELUARAN_BARANG_REPORT_REQUEST",
    fetchPengeluaranBarangReportSaga
  );
  yield takeEvery(
    "EXPORT_PENGELUARAN_BARANG_REPORT_REQUEST",
    exportPengeluaranBarangReportSaga
  );
}
