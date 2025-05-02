import { takeLatest, put } from "redux-saga/effects";

// import services
// import axiosInstance from "../../api/axios";

// import utils
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
    // const response = yield call(
    //   axiosInstance.post,
    //   "/auth/login/",
    //   action.payload
    // );
    const response = {
      user: {
        id: 1,
        email: "alexandervitto116@gmail.com",
        username: "vitto",
        role: null,
        phone_number: null,
        is_active: true,
        is_superuser: true,
        is_deleted: false,
        deleted_at: null,
        created_at: "2025-03-25T10:40:15.793772Z",
        updated_at: "2025-03-25T10:40:15.793781Z",
      },
      tokens: {
        refresh:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTIyNTkwMywiaWF0IjoxNzQ1MTM5NTAzLCJqdGkiOiI0MGE4MzRkODBkNTQ0N2UxYmIzOTc5YjlkMDZmZDBkZCIsInVzZXJfaWQiOjF9.Qom9ciIubBNdzwT6JG1KyRMJ5TUgG4WEo_gmrzFlsYk",
        access:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MTQzMTAzLCJpYXQiOjE3NDUxMzk1MDMsImp0aSI6IjUyMjY1YWVjZmQ3MjRmNzNiYmQwOWE3ZmViNThmMzUwIiwidXNlcl9pZCI6MX0.2GrooC4kcwmBoyfvHrPleeQpo2eUDlagKq7lTE-ZxTM",
      },
      message: "Login successful",
    };

    console.log("response", response);
    setCookie("accessToken", response.tokens.access, 5); // 1 hari expired
    yield put(loginSuccess(response));
    // yield put(loginSuccess({ id: "123", username: action.payload.username }));
  } catch (error) {
    yield put(loginFailure());
  }
}

export default function* authSaga() {
  yield takeLatest("VALIDATE_TOKEN_REQUEST", validateTokenRequest);
  yield takeLatest("LOGIN_REQUEST", loginRequest);
}
