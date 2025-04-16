import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

export default rootReducer;
