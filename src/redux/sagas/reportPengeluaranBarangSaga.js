import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_REPORT_PENGELUARAN_BARANG_REQUEST,
  EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST,
  fetchReportPengeluaranBarangSuccess,
  fetchReportPengeluaranBarangFailure,
  exportReportPengeluaranBarangSuccess,
  exportReportPengeluaranBarangFailure,
} from "../actions/reportPengeluaranBarangActions";

import {
  fetchPengeluaranBarangReport,
  exportPengeluaranBarangReport,
} from "../../api/reportPengeluaranBarang";

function* fetchReportPengeluaranBarangSaga(action) {
  try {
    const response = yield call(fetchPengeluaranBarangReport, action.payload);

    yield put(
      fetchReportPengeluaranBarangSuccess({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || 1,
        message: response.message,
      })
    );
  } catch (error) {
    yield put(
      fetchReportPengeluaranBarangFailure({
        message:
          error.message ||
          "Terjadi kesalahan saat mengambil data laporan pengeluaran barang",
        code: error.code || "FETCH_ERROR",
      })
    );
  }
}

function* exportReportPengeluaranBarangSaga(action) {
  try {
    const response = yield call(exportPengeluaranBarangReport, action.payload);

    // Handle file download
    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-pengeluaran-barang-${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(
      exportReportPengeluaranBarangSuccess({
        message: "Berhasil mengunduh laporan pengeluaran barang",
      })
    );
  } catch (error) {
    yield put(
      exportReportPengeluaranBarangFailure({
        message: error.message || "Terjadi kesalahan saat mengunduh laporan",
        code: error.code || "EXPORT_ERROR",
      })
    );
  }
}

export default function* reportPengeluaranBarangSaga() {
  yield takeLatest(
    FETCH_REPORT_PENGELUARAN_BARANG_REQUEST,
    fetchReportPengeluaranBarangSaga
  );
  yield takeLatest(
    EXPORT_REPORT_PENGELUARAN_BARANG_REQUEST,
    exportReportPengeluaranBarangSaga
  );
}
