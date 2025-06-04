import { takeLatest, put, call, all } from "redux-saga/effects";

// import services
import axiosInstance from "../../api/axios";

// import utils
import {
  getCookie,
  getLocalStorage,
  setCookie,
  setLocalStorage,
} from "../../utils/cookieUtils";

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
import { loadInitialMasterData } from "./masterSaga";

function* loadInitialData() {
  yield all([fetchRolesRequest(), loadInitialMasterData()]);
}

function* validateTokenRequest() {
  try {
    const token = getCookie("refreshToken");
    const user = getLocalStorage("user");

    if (token) {
      const response = yield call(axiosInstance.post, "/auth/refresh/", {
        refresh: token,
      });

      if (response.status !== 200) {
        yield put(validateTokenFailure("Token not found"));
        return;
      }

      setCookie("accessToken", response.data.access, 1); // 1 hari expired

      yield call(loadInitialData);
      yield put(validateTokenSuccess(user));
    } else {
      yield put(validateTokenFailure("Token not found"));
    }
  } catch (error) {
    yield put(validateTokenFailure(error));
  }
}

function* loginRequest(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      "/auth/login/",
      action.payload
    );

    if (response.status !== 200) {
      yield put(loginFailure());
      return;
    }

    setCookie("accessToken", response.data.tokens.access, 1); // 1 hari expired
    setCookie("refreshToken", response.data.tokens.refresh, 7); // 1 hari expired
    setLocalStorage("user", response.data.user);

    yield call(loadInitialData);

    yield put(loginSuccess(response.data.user));
  } catch (error) {
    yield put(loginFailure(error));
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
      yield put(fetchUsersSuccess(response.data));
    } else {
      yield put(fetchUsersFailure(response.status));
    }
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

function* addUserRequest(action) {
  try {
    const response = yield call(axiosInstance.post, "/users/", action.payload);
    if (response.status === 201) {
      yield put(addUserSuccess(response.data));
    } else {
      yield put(addUserFailure(response.status));
    }
  } catch (error) {
    yield put(addUserFailure(error));
  }
}

function* updateUserRequest(action) {
  try {
    const response = yield call(
      axiosInstance.put,
      `/users/${action.payload.id}/`,
      action.payload.body
    );
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    } else {
      yield put(updateUserFailure(response.status));
    }
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* fetchRolesRequest() {
  try {
    const response = yield call(axiosInstance.get, "/roles/");
    if (response.status === 200) {
      yield put(fetchRolesSuccess(response.data));
    } else {
      yield put(fetchRolesFailure(response.status));
    }
  } catch (error) {
    yield put(fetchRolesFailure(error));
  }
}

function* updateRoleRequest(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      `/users/${action.payload.id}/change_role/`,
      action.payload.body
    );
    if (response.status === 200) {
      yield put(updateRoleSuccess(response.data));
    } else {
      yield put(updateRoleFailure(response.status));
    }
  } catch (error) {
    yield put(updateRoleFailure(error));
  }
}

function* deleteUserRequest(action) {
  try {
    const response = yield call(
      axiosInstance.delete,
      `/users/${action.payload.id}/s`
    );
    if (response.status === 200) {
      yield put(deleteUserSuccess(action.payload.id));
    } else {
      yield put(deleteUserFailure(response.status));
    }
  } catch (error) {
    yield put(deleteUserFailure(error));
  }
}

function* restoreUserRequest(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      `/users/${action.payload.id}/restore/`
    );
    if (response.status === 200) {
      yield put(restoreUserSuccess(response.data));
    } else {
      yield put(restoreUserFailure(response.status));
    }
  } catch (error) {
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
