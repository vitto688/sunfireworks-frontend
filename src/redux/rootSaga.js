import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import menuSaga from "./sagas/menuSaga";
import masterSaga from "./sagas/masterSaga";

export default function* rootSaga() {
  yield all([authSaga(), menuSaga(), masterSaga()]);
}
