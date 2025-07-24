import { call, put, takeEvery } from "redux-saga/effects";
import * as mutasiBarangReportAPI from "../../api/reportMutasiBarang";
import {
  fetchMutasiBarangReportSuccess,
  fetchMutasiBarangReportFailure,
  exportMutasiBarangReportSuccess,
  exportMutasiBarangReportFailure,
  fetchMutasiBarangReportNPSuccess,
  fetchMutasiBarangReportNPFailure,
} from "../actions/mutasiBarangReportActions";

// Fetch Mutasi Barang Report Saga
function* fetchMutasiBarangReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      mutasiBarangReportAPI.fetchMutasiBarangReport,
      params
    );
    yield put(fetchMutasiBarangReportSuccess(response));
  } catch (error) {
    yield put(fetchMutasiBarangReportFailure(error));
  }
}

function* fetchMutasiBarangReportNPSaga(action) {
  try {
    const { params } = action.payload;
    params.paginate = false; // Disable pagination for non-paginated report
    const response = yield call(
      mutasiBarangReportAPI.fetchMutasiBarangReport,
      params
    );
    yield put(fetchMutasiBarangReportNPSuccess(response));
  } catch (error) {
    yield put(fetchMutasiBarangReportNPFailure(error));
  }
}

// Export Mutasi Barang Report Saga
function* exportMutasiBarangReportSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(
      mutasiBarangReportAPI.exportMutasiBarangReport,
      params
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `mutasi-barang-report-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(exportMutasiBarangReportSuccess(response));
  } catch (error) {
    yield put(exportMutasiBarangReportFailure(error));
  }
}

// Root Mutasi Barang Report Saga
export default function* mutasiBarangReportSaga() {
  yield takeEvery(
    "FETCH_MUTASI_BARANG_REPORT_REQUEST",
    fetchMutasiBarangReportSaga
  );
  yield takeEvery(
    "FETCH_MUTASI_BARANG_REPORT_NP_REQUEST",
    fetchMutasiBarangReportNPSaga
  );
  yield takeEvery(
    "EXPORT_MUTASI_BARANG_REPORT_REQUEST",
    exportMutasiBarangReportSaga
  );
}
