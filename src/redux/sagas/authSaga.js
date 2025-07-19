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
  changePasswordSuccess,
  changePasswordFailure,
} from "../actions/authActions";
import { loadInitialMasterData } from "./masterSaga";
import { fetchStocks } from "./stockSaga";
import { fetchSPKSaga } from "./spkSaga";

function* loadInitialData() {
  yield all([
    fetchRoles(),
    loadInitialMasterData(),
    fetchStocks(),
    fetchSPKSaga({ payload: { params: {} } }),
  ]);
}

function* validateToken() {
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

function* login(action) {
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

function* logout() {
  try {
    const refresh = getCookie("refreshToken");
    yield call(axiosInstance.post, "/auth/logout/", { refresh });
    setCookie("accessToken", "", -1);
    setCookie("refreshToken", "", -1);
  } catch (error) {
    console.log("error", error);
  }
}

function* fetchUsers() {
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

function* addUser(action) {
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

function* updateUser(action) {
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

function* fetchRoles() {
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

function* updateRole(action) {
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

function* deleteUser(action) {
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

function* restoreUser(action) {
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

function* changePassword(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      `/users/${action.payload.id}/change_password/`,
      action.payload.body
    );

    if (response.status === 200) {
      yield put(changePasswordSuccess());
    } else {
      yield put(changePasswordFailure(response.status));
    }
  } catch (error) {
    yield put(changePasswordFailure(error));
  }
}

export default function* authSaga() {
  yield takeLatest("VALIDATE_TOKEN_REQUEST", validateToken);
  yield takeLatest("LOGIN_REQUEST", login);
  yield takeLatest("LOGOUT", logout);
  yield takeLatest("FETCH_USERS_REQUEST", fetchUsers);
  yield takeLatest("ADD_USER_REQUEST", addUser);
  yield takeLatest("UPDATE_USER_REQUEST", updateUser);
  yield takeLatest("FETCH_ROLES_REQUEST", fetchRoles);
  yield takeLatest("UPDATE_ROLE_REQUEST", updateRole);
  yield takeLatest("DELETE_USER_REQUEST", deleteUser);
  yield takeLatest("RESTORE_USER_REQUEST", restoreUser);
  yield takeLatest("CHANGE_PASSWORD_REQUEST", changePassword);
}
