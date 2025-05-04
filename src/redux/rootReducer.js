import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import masterReducer from "./reducers/masterReducer";
import mutasiMasukReducer from "./reducers/mutasiMasukReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  master: masterReducer,
  mutasiMasukReducer: mutasiMasukReducer,
});

export default rootReducer;
