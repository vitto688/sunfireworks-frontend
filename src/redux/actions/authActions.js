export const validateTokenRequest = () => ({
  type: "VALIDATE_TOKEN_REQUEST",
});

export const validateTokenSuccess = () => ({
  type: "VALIDATE_TOKEN_SUCCESS",
});

export const validateTokenFailure = () => ({
  type: "VALIDATE_TOKEN_FAILURE",
});

export const loginRequest = ({ username, password }) => ({
  type: "LOGIN_REQUEST",
  payload: { username, password },
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});
