import { takeLatest, put } from "redux-saga/effects";
// import axios from "axios";

import { getCookie, setCookie } from "../../utils/cookieUtils";

// import actions
import { loginSuccess, loginFailure } from "../actions/authActions";

function* validateTokenRequest() {
  try {
    const token = getCookie("accessToken");

    console.log("token", token);

    if (token) {
      yield put(loginSuccess({ id: "123", username: token }));
    } else {
      yield put(loginFailure());
    }
  } catch (error) {
    yield put(loginFailure());
  }
}

function* loginRequest(action) {
  try {
    console.log("action.payload)", action.payload);
    // const response = yield call(axios.post, '/api/login', action.payload);
    // yield put(loginSuccess(response.data));
    setCookie("accessToken", action.payload.username, 1); // 1 hari expired
    yield put(loginSuccess({ id: "123", username: action.payload.username }));
  } catch (error) {
    yield put(loginFailure());
  }
}

export default function* authSaga() {
  yield takeLatest("VALIDATE_TOKEN_REQUEST", validateTokenRequest);
  yield takeLatest("LOGIN_REQUEST", loginRequest);
}
