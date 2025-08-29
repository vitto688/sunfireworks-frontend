import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../../api/reportMutasiBarangPembelian";
import {
  fetchMutasiBarangPembelianReportSuccess,
  fetchMutasiBarangPembelianReportFailure,
  exportMutasiBarangPembelianReportSuccess,
  exportMutasiBarangPembelianReportFailure,
} from "../actions/mutasiBarangPembelianReportActions";
import { printMutasiBarangPembelianReport } from "../../utils/printMutasiBarangPembelianReport";

//#region Fetch Mutasi Barang Pembelian Report
function* fetchMutasiBarangPembelianReportSaga(action) {
  try {
    const response = yield call(
      api.fetchMutasiBarangPembelianReport,
      action.payload
    );
    // Response dari API sudah berupa response.data, jadi tidak perlu .data lagi
    yield put(fetchMutasiBarangPembelianReportSuccess(response));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Gagal mengambil data laporan mutasi barang pembelian";
    yield put(fetchMutasiBarangPembelianReportFailure(errorMessage));
  }
}
//#endregion

//#region Export Mutasi Barang Pembelian Report
function* exportMutasiBarangPembelianReportSaga(action) {
  try {
    const response = yield call(
      api.fetchAllMutasiBarangPembelianReportData,
      action.payload
    );

    if (response && Array.isArray(response)) {
      // Use print utility to generate Excel file
      yield call(printMutasiBarangPembelianReport, response, action.payload);
      yield put(exportMutasiBarangPembelianReportSuccess());
    } else if (response && response.data && Array.isArray(response.data)) {
      // Fallback jika response masih nested
      yield call(
        printMutasiBarangPembelianReport,
        response.data,
        action.payload
      );
      yield put(exportMutasiBarangPembelianReportSuccess());
    } else {
      throw new Error("Format data tidak valid");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Gagal mengekspor data laporan mutasi barang pembelian";
    yield put(exportMutasiBarangPembelianReportFailure(errorMessage));
  }
}
//#endregion

//#region Root Saga
function* mutasiBarangPembelianReportSaga() {
  yield takeEvery(
    "FETCH_MUTASI_BARANG_PEMBELIAN_REPORT_REQUEST",
    fetchMutasiBarangPembelianReportSaga
  );
  yield takeEvery(
    "EXPORT_MUTASI_BARANG_PEMBELIAN_REPORT_REQUEST",
    exportMutasiBarangPembelianReportSaga
  );
}
//#endregion

export default mutasiBarangPembelianReportSaga;
