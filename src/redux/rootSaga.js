import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import masterSaga from "./sagas/masterSaga";
import stockSaga from "./sagas/stockSaga";
import mutasiMasukSaga from "./sagas/mutasiMasukSaga";
import spgSaga from "./sagas/spgSaga";
import stokTransferSaga from "./sagas/stokTransferSaga";
import spkSaga from "./sagas/spkSaga";
import stbSaga from "./sagas/stbSaga";
import returPembelianSaga from "./sagas/returPembelianSaga";
import returPenjualanSaga from "./sagas/returPenjualanSaga";
import suratJalanSaga from "./sagas/suratJalanSaga";
import suratPengeluaranBarangSaga from "./sagas/suratPengeluaranBarangSaga";
import stockReportSaga from "./sagas/stockReportSaga";
import returPembelianReportSaga from "./sagas/returPembelianReportSaga";
import penerimaanBarangReportSaga from "./sagas/penerimaanBarangReportSaga";
import pengeluaranBarangReportSaga from "./sagas/pengeluaranBarangReportSaga";
import mutasiBarangReportSaga from "./sagas/mutasiBarangReportSaga";
import returPenjualanReportSaga from "./sagas/returPenjualanReportSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    masterSaga(),
    stockSaga(),
    mutasiMasukSaga(),
    // Unified SPG Saga
    spgSaga(),
    // Unified StokTransfer Saga
    stokTransferSaga(),
    // Unified SPK Saga
    spkSaga(),
    // Unified STB Saga
    stbSaga(),
    // Mutasi Keluar Sagas
    returPembelianSaga(),
    // Mutasi Masuk Sagas
    returPenjualanSaga(),
    suratJalanSaga(),
    suratPengeluaranBarangSaga(),
    // Report Sagas
    stockReportSaga(),
    returPembelianReportSaga(),
    returPenjualanReportSaga(),
    penerimaanBarangReportSaga(),
    pengeluaranBarangReportSaga(),
    mutasiBarangReportSaga(),
  ]);
}
