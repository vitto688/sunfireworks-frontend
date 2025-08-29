import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMutasiBarangPenjualanReportSuccess,
  fetchMutasiBarangPenjualanReportFailure,
  exportMutasiBarangPenjualanReportSuccess,
  exportMutasiBarangPenjualanReportFailure,
} from "../actions/mutasiBarangPenjualanReportActions";
import {
  fetchMutasiBarangPenjualanReport,
  exportMutasiBarangPenjualanReport,
} from "../../api/reportMutasiBarangPenjualan";

//#region Fetch Mutasi Barang Penjualan Report Saga
function* fetchMutasiBarangPenjualanReportSaga(action) {
  try {
    const response = yield call(
      fetchMutasiBarangPenjualanReport,
      action.payload
    );
    yield put(fetchMutasiBarangPenjualanReportSuccess(response));
  } catch (error) {
    yield put(
      fetchMutasiBarangPenjualanReportFailure(
        error.response?.status || "UNKNOWN_ERROR"
      )
    );
  }
}
//#endregion

//#region Export Mutasi Barang Penjualan Report Saga
function* exportMutasiBarangPenjualanReportSaga(action) {
  try {
    const response = yield call(
      exportMutasiBarangPenjualanReport,
      action.payload
    );

    // Create download link for the exported file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Extract filename from response headers or use default
    const contentDisposition = response.headers["content-disposition"];
    let filename = "laporan_mutasi_barang_penjualan.xlsx";

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(exportMutasiBarangPenjualanReportSuccess(response.data));
  } catch (error) {
    yield put(
      exportMutasiBarangPenjualanReportFailure(
        error.response?.status || "UNKNOWN_ERROR"
      )
    );
  }
}
//#endregion

//#region Watcher Saga
function* mutasiBarangPenjualanReportSaga() {
  yield takeLatest(
    "FETCH_MUTASI_BARANG_PENJUALAN_REPORT_REQUEST",
    fetchMutasiBarangPenjualanReportSaga
  );
  yield takeLatest(
    "EXPORT_MUTASI_BARANG_PENJUALAN_REPORT_REQUEST",
    exportMutasiBarangPenjualanReportSaga
  );
}
//#endregion

export default mutasiBarangPenjualanReportSaga;
