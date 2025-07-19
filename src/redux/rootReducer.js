import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import masterReducer from "./reducers/masterReducer";
import mutasiMasukReducer from "./reducers/mutasiMasukReducer";
import stockReducer from "./reducers/stockReducer";
import spgReducer from "./reducers/spgReducer";
import stokTransferReducer from "./reducers/stokTransferReducer";
import spkReducer from "./reducers/spkReducer";
import returPembelianReducer from "./reducers/returPembelianReducer";
import suratJalanReducer from "./reducers/suratJalanReducer";
import suratPengeluaranBarangReducer from "./reducers/suratPengeluaranBarangReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  master: masterReducer,
  mutasiMasuk: mutasiMasukReducer,
  stock: stockReducer,
  // Unified SPG Reducer
  spg: spgReducer,
  // Unified StokTransfer Reducer
  stokTransfer: stokTransferReducer,
  // Unified SPK Reducer
  spk: spkReducer,
  // Mutasi Keluar Reducers
  returPembelian: returPembelianReducer,
  suratJalan: suratJalanReducer,
  suratPengeluaranBarang: suratPengeluaranBarangReducer,
});

export default rootReducer;
