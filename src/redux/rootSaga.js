import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import menuSaga from "./sagas/menuSaga";
import masterSaga from "./sagas/masterSaga";
import mutasiMasukSaga from "./sagas/mutasiMasukSaga";
import stockSaga from "./sagas/stockSaga";
import spgSaga from "./sagas/spgSaga";
import stokTransferSaga from "./sagas/stokTransferSaga";
import spkSaga from "./sagas/spkSaga";
import returPembelianSaga from "./sagas/returPembelianSaga";
import returPenjualanSaga from "./sagas/returPenjualanSaga";
import suratJalanSaga from "./sagas/suratJalanSaga";
import suratPengeluaranBarangSaga from "./sagas/suratPengeluaranBarangSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    menuSaga(),
    masterSaga(),
    mutasiMasukSaga(),
    stockSaga(),
    spgSaga(),
    stokTransferSaga(),
    spkSaga(),
    returPembelianSaga(),
    returPenjualanSaga(),
    suratJalanSaga(),
    suratPengeluaranBarangSaga(),
  ]);
}
