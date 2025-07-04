import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import masterReducer from "./reducers/masterReducer";
import mutasiMasukReducer from "./reducers/mutasiMasukReducer";
import stockReducer from "./reducers/stockReducer";
import spgReducer from "./reducers/spgReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  master: masterReducer,
  mutasiMasuk: mutasiMasukReducer,
  stock: stockReducer,
  // Unified SPG Reducer
  spg: spgReducer,
});

export default rootReducer;
