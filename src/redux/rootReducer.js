import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import masterReducer from "./reducers/masterReducer";
import mutasiMasukReducer from "./reducers/mutasiMasukReducer";
import stockReducer from "./reducers/stockReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  master: masterReducer,
  mutasiMasuk: mutasiMasukReducer,
  stock: stockReducer, // Assuming you have a stockReducer defined
});

export default rootReducer;
