const initialState = {
  isAuthenticated: false,
  user: null,
  users: [],
  roles: [],
  message: null,
  errorCode: null,
  errorMessage: null,
  loading: {
    login: false,
    validateToken: true,
    users: false,
    roles: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VALIDATE_TOKEN_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { validateToken: true },
      }; // Set isLoading saat request
    case "VALIDATE_TOKEN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: { validateToken: false },
      };
    case "VALIDATE_TOKEN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        loading: { validateToken: false },
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { login: true },
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: { login: false },
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        errorCode: 400,
        errorMessage: "Login gagal. Cek kembali email atau password Anda.",
        loading: { login: false },
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, error: null };
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { users: true },
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: { users: false },
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data user.",
        loading: { users: false },
      };
    case "RESET_USER_REDUCER":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: { users: false },
      };
    case "ADD_USER_REQUEST":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: { users: true },
      };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        users: [...state.users, action.payload],
        message: "User berhasil ditambahkan.",
        loading: { users: false },
      };
    case "ADD_USER_FAILURE":
      return {
        ...state,
        message: null,
        errorCode: action.payload,
        errorMessage: "Gagal menambah user.",
        loading: { users: false },
      };
    case "UPDATE_USER_REQUEST":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: { users: true },
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        message: "User berhasil diperbarui.",
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: { users: false },
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        message: null,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui user.",
        loading: { users: false },
      };
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: { users: true },
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        message: "User berhasil dihapus.",
        users: state.users.filter((user) => user.id !== action.payload),
        loading: { users: false },
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        message: null,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus user.",
        loading: { users: false },
      };
    case "RESTORE_USER_REQUEST":
      return {
        ...state,
        message: null,
        errorCode: null,
        errorMessage: null,
        loading: { users: true },
      };
    case "RESTORE_USER_SUCCESS":
      return {
        ...state,
        message: "User berhasil dipulihkan.",
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: { users: false },
      };
    case "RESTORE_USER_FAILURE":
      return {
        ...state,
        message: null,
        errorCode: action.payload,
        errorMessage: "Gagal memulihkan user.",
        loading: { users: false },
      };
    case "FETCH_ROLES_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { roles: true },
      };
    case "FETCH_ROLES_SUCCESS":
      return {
        ...state,
        roles: action.payload,
        loading: { roles: false },
      };
    case "FETCH_ROLES_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal mengambil data role.",
        loading: { roles: false },
      };
    case "ADD_ROLE_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { roles: true },
      };
    case "ADD_ROLE_SUCCESS":
      return {
        ...state,
        roles: [...state.roles, action.payload],
        loading: { roles: false },
      };
    case "ADD_ROLE_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menambah role.",
        loading: { roles: false },
      };
    case "UPDATE_ROLE_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { roles: true },
      };
    case "UPDATE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
        loading: { roles: false },
      };
    case "UPDATE_ROLE_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal memperbarui role.",
        loading: { roles: false },
      };
    case "DELETE_ROLE_REQUEST":
      return {
        ...state,
        errorCode: null,
        errorMessage: null,
        loading: { roles: true },
      };
    case "DELETE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload),
        loading: { roles: false },
      };
    case "DELETE_ROLE_FAILURE":
      return {
        ...state,
        errorCode: action.payload,
        errorMessage: "Gagal menghapus role.",
        loading: { roles: false },
      };
    default:
      return state;
  }
};

export default authReducer;
