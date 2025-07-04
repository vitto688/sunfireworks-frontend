import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import menuSaga from "./sagas/menuSaga";
import masterSaga from "./sagas/masterSaga";
import mutasiMasukSaga from "./sagas/mutasiMasukSaga";
import stockSaga from "./sagas/stockSaga";
import spgSaga from "./sagas/spgSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    menuSaga(),
    masterSaga(),
    mutasiMasukSaga(),
    stockSaga(),
    spgSaga(),
  ]);
}
