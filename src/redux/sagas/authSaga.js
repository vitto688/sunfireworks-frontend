import { takeLatest, put, call } from "redux-saga/effects";

// import services
import axiosInstance from "../../api/axios";

// import utils
import { getCookie, setCookie } from "../../utils/cookieUtils";

// import actions
import {
  loginSuccess,
  loginFailure,
  validateTokenSuccess,
  validateTokenFailure,
} from "../actions/authActions";

function* validateTokenRequest() {
  try {
    const token = getCookie("accessToken");

    console.log("token", token);

    if (token) {
      yield put(validateTokenSuccess({ id: "123", username: token }));
    } else {
      yield put(validateTokenFailure());
    }
  } catch (error) {
    yield put(validateTokenFailure());
  }
}

function* loginRequest(action) {
  try {
    console.log("action.payload)", action.payload);
    const response = yield call(
      axiosInstance.post,
      "/auth/login/",
      action.payload
    );

    if (response.status !== 200) {
      yield put(loginFailure());
      return;
    }

    console.log("response", response);
    setCookie("accessToken", response.data.tokens.access, 1); // 1 hari expired
    setCookie("refreshToken", response.data.tokens.refresh, 7); // 1 hari expired
    yield put(loginSuccess(response.data.user));
  } catch (error) {
    console.log("error", error);
    console.log("error", error.response.status);
    yield put(loginFailure());
  }
}

function* logoutRequest() {
  try {
    const refresh = getCookie("refreshToken");
    yield call(axiosInstance.post, "/auth/logout/", { refresh });
    setCookie("accessToken", "", -1);
    setCookie("refreshToken", "", -1);
  } catch (error) {
    console.log("error", error);
  }
}

function* fetchUsersRequest() {
  try {
    const response = yield call(axiosInstance.get, "/users/?view=all");
    if (response.status === 200) {
      console.log("response", response);
      yield put({ type: "FETCH_USERS_SUCCESS", payload: response.data });
    } else {
      yield put({ type: "FETCH_USERS_FAILURE", payload: response.status });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: "FETCH_USERS_FAILURE", payload: error });
  }
}

export default function* authSaga() {
  yield takeLatest("VALIDATE_TOKEN_REQUEST", validateTokenRequest);
  yield takeLatest("LOGIN_REQUEST", loginRequest);
  yield takeLatest("LOGOUT", logoutRequest);
  yield takeLatest("FETCH_USERS_REQUEST", fetchUsersRequest);
}
