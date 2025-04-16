const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VALIDATE_TOKEN_REQUEST":
      return { ...state, isLoading: true }; // Set isLoading saat request
    case "VALIDATE_TOKEN_SUCCESS":
      return { ...state, isAuthenticated: true, isLoading: false };
    case "VALIDATE_TOKEN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: "Invalid token",
      };
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
