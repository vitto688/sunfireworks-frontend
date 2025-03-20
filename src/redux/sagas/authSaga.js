import { takeLatest, put } from "redux-saga/effects";
// import axios from "axios";
import { loginSuccess, loginFailure } from "../actions/authActions";

function* loginSaga(action) {
  try {
    console.log("action.payload)", action.payload);
    // const response = yield call(axios.post, '/api/login', action.payload);
    // yield put(loginSuccess(response.data));
    yield put(loginSuccess({ id: "123", name: "Joko" }));
  } catch (error) {
    yield put(loginFailure());
  }
}

export default function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", loginSaga);
}
