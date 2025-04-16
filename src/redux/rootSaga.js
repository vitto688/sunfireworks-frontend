import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import menuSaga from "./sagas/menuSaga";

export default function* rootSaga() {
  yield all([authSaga(), menuSaga()]);
}
