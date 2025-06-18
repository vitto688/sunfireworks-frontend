export const validateTokenRequest = () => ({
  type: "VALIDATE_TOKEN_REQUEST",
});

export const validateTokenSuccess = (user) => ({
  type: "VALIDATE_TOKEN_SUCCESS",
  payload: user,
});

export const validateTokenFailure = (error) => ({
  type: "VALIDATE_TOKEN_FAILURE",
  payload: error,
});

export const loginRequest = ({ email, password }) => ({
  type: "LOGIN_REQUEST",
  payload: { email, password },
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const fetchUsersRequest = () => ({
  type: "FETCH_USERS_REQUEST",
});
export const fetchUsersSuccess = (users) => ({
  type: "FETCH_USERS_SUCCESS",
  payload: users,
});
export const fetchUsersFailure = (error) => ({
  type: "FETCH_USERS_FAILURE",
  payload: error,
});
export const resetUserMessages = () => ({
  type: "RESET_USER_MESSAGES",
});
export const addUserRequest = (user) => ({
  type: "ADD_USER_REQUEST",
  payload: user,
});
export const addUserSuccess = (user) => ({
  type: "ADD_USER_SUCCESS",
  payload: user,
});
export const addUserFailure = (error) => ({
  type: "ADD_USER_FAILURE",
  payload: error,
});
export const updateUserRequest = (user) => ({
  type: "UPDATE_USER_REQUEST",
  payload: user,
});
export const updateUserSuccess = (user) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: user,
});
export const updateUserFailure = (error) => ({
  type: "UPDATE_USER_FAILURE",
  payload: error,
});
export const deleteUserRequest = (userId) => ({
  type: "DELETE_USER_REQUEST",
  payload: userId,
});
export const deleteUserSuccess = (userId) => ({
  type: "DELETE_USER_SUCCESS",
  payload: userId,
});
export const deleteUserFailure = (error) => ({
  type: "DELETE_USER_FAILURE",
  payload: error,
});
export const restoreUserRequest = (userId) => ({
  type: "RESTORE_USER_REQUEST",
  payload: userId,
});
export const restoreUserSuccess = (userId) => ({
  type: "RESTORE_USER_SUCCESS",
  payload: userId,
});
export const restoreUserFailure = (error) => ({
  type: "RESTORE_USER_FAILURE",
  payload: error,
});
export const fetchRolesRequest = () => ({
  type: "FETCH_ROLES_REQUEST",
});
export const fetchRolesSuccess = (roles) => ({
  type: "FETCH_ROLES_SUCCESS",
  payload: roles,
});
export const fetchRolesFailure = (error) => ({
  type: "FETCH_ROLES_FAILURE",
  payload: error,
});
export const addRoleRequest = (role) => ({
  type: "ADD_ROLE_REQUEST",
  payload: role,
});
export const addRoleSuccess = (role) => ({
  type: "ADD_ROLE_SUCCESS",
  payload: role,
});
export const addRoleFailure = (error) => ({
  type: "ADD_ROLE_FAILURE",
  payload: error,
});
export const updateRoleRequest = (role) => ({
  type: "UPDATE_ROLE_REQUEST",
  payload: role,
});
export const updateRoleSuccess = (role) => ({
  type: "UPDATE_ROLE_SUCCESS",
  payload: role,
});
export const updateRoleFailure = (error) => ({
  type: "UPDATE_ROLE_FAILURE",
  payload: error,
});
export const deleteRoleRequest = (roleId) => ({
  type: "DELETE_ROLE_REQUEST",
  payload: roleId,
});
export const deleteRoleSuccess = (roleId) => ({
  type: "DELETE_ROLE_SUCCESS",
  payload: roleId,
});
export const deleteRoleFailure = (error) => ({
  type: "DELETE_ROLE_FAILURE",
  payload: error,
});
export const changePasswordRequest = (data) => ({
  type: "CHANGE_PASSWORD_REQUEST",
  payload: data,
});
export const changePasswordSuccess = () => ({
  type: "CHANGE_PASSWORD_SUCCESS",
});
export const changePasswordFailure = (error) => ({
  type: "CHANGE_PASSWORD_FAILURE",
  payload: error,
});
