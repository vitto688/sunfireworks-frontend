import { takeLatest, put, call, all } from "redux-saga/effects";

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
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserSuccess,
  addUserFailure,
  updateUserSuccess,
  updateUserFailure,
  fetchRolesSuccess,
  fetchRolesFailure,
  deleteUserSuccess,
  deleteUserFailure,
  updateRoleSuccess,
  updateRoleFailure,
  restoreUserSuccess,
  restoreUserFailure,
} from "../actions/authActions";

function* loadInitialData() {
  console.log("loadInitialData");

  yield all([fetchRolesRequest()]);
}

function* validateTokenRequest() {
  try {
    const token = getCookie("accessToken");

    console.log("token", token);

    if (token) {
      yield call(loadInitialData);
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

    yield call(loadInitialData);

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
      yield put(fetchUsersSuccess(response.data));
    } else {
      yield put(fetchUsersFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(fetchUsersFailure(error));
  }
}

function* addUserRequest(action) {
  console.log("addUserRequest", action.payload);
  try {
    const response = yield call(axiosInstance.post, "/users/", action.payload);
    if (response.status === 201) {
      console.log("response", response);
      yield put(addUserSuccess(response.data));
    } else {
      yield put(addUserFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(addUserFailure(error));
  }
}

function* updateUserRequest(action) {
  console.log("updateUserRequest", action.payload);
  try {
    const response = yield call(
      axiosInstance.put,
      `/users/${action.payload.id}/`,
      action.payload.body
    );
    if (response.status === 200) {
      console.log("response", response);
      yield put(updateUserSuccess(response.data));
    } else {
      yield put(updateUserFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(updateUserFailure(error));
  }
}

function* fetchRolesRequest() {
  try {
    console.log("fetchRolesRequest");
    const response = yield call(axiosInstance.get, "/roles/");
    if (response.status === 200) {
      console.log("response", response);
      yield put(fetchRolesSuccess(response.data));
    } else {
      yield put(fetchRolesFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(fetchRolesFailure(error));
  }
}

function* updateRoleRequest(action) {
  console.log("updateRoleRequest", action.payload);
  try {
    const response = yield call(
      axiosInstance.post,
      `/users/${action.payload.id}/change_role/`,
      action.payload.body
    );
    if (response.status === 200) {
      console.log("response", response);
      yield put(updateRoleSuccess(response.data));
    } else {
      yield put(updateRoleFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(updateRoleFailure(error));
  }
}

function* deleteUserRequest(action) {
  console.log("deleteUserRequest", action.payload);
  try {
    const response = yield call(
      axiosInstance.delete,
      `/users/${action.payload.id}/s`
    );
    if (response.status === 200) {
      console.log("response", response);
      yield put(deleteUserSuccess(action.payload));
    } else {
      yield put(deleteUserFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(deleteUserFailure(error));
  }
}

function* restoreUserRequest(action) {
  console.log("restoreUserRequest", action.payload);
  try {
    const response = yield call(
      axiosInstance.post,
      `/users/${action.payload.id}/restore/`
    );
    if (response.status === 200) {
      console.log("response", response);
      yield put(restoreUserSuccess(response.data));
    } else {
      yield put(restoreUserFailure(response.status));
    }
  } catch (error) {
    console.log("error", error);
    yield put(restoreUserFailure(error));
  }
}

export default function* authSaga() {
  yield takeLatest("VALIDATE_TOKEN_REQUEST", validateTokenRequest);
  yield takeLatest("LOGIN_REQUEST", loginRequest);
  yield takeLatest("LOGOUT", logoutRequest);
  yield takeLatest("FETCH_USERS_REQUEST", fetchUsersRequest);
  yield takeLatest("ADD_USER_REQUEST", addUserRequest);
  yield takeLatest("UPDATE_USER_REQUEST", updateUserRequest);
  yield takeLatest("FETCH_ROLES_REQUEST", fetchRolesRequest);
  yield takeLatest("UPDATE_ROLE_REQUEST", updateRoleRequest);
  yield takeLatest("DELETE_USER_REQUEST", deleteUserRequest);
  yield takeLatest("RESTORE_USER_REQUEST", restoreUserRequest);
}
