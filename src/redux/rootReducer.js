import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import masterReducer from "./reducers/masterReducer";
import mutasiMasukReducer from "./reducers/mutasiMasukReducer";
import stockReducer from "./reducers/stockReducer";
import stockAdjustmentReducer from "./reducers/stockAdjustmentReducer";
import spgReducer from "./reducers/spgReducer";
import stokTransferReducer from "./reducers/stokTransferReducer";
import spkReducer from "./reducers/spkReducer";
import stbReducer from "./reducers/stbReducer";
import returPembelianReducer from "./reducers/returPembelianReducer";
import returPenjualanReducer from "./reducers/returPenjualanReducer";
import suratJalanReducer from "./reducers/suratJalanReducer";
import suratPengeluaranBarangReducer from "./reducers/suratPengeluaranBarangReducer";
import stockReportReducer from "./reducers/stockReportReducer";
import returPembelianReportReducer from "./reducers/returPembelianReportReducer";
import penerimaanBarangReportReducer from "./reducers/penerimaanBarangReportReducer";
import mutasiBarangReportReducer from "./reducers/mutasiBarangReportReducer";
import returPenjualanReportReducer from "./reducers/returPenjualanReportReducer";
import pengeluaranBarangReportReducer from "./reducers/pengeluaranBarangReportReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  master: masterReducer,
  mutasiMasuk: mutasiMasukReducer,
  stock: stockReducer,
  stockAdjustment: stockAdjustmentReducer,
  // Unified SPG Reducer
  spg: spgReducer,
  // Unified StokTransfer Reducer
  stokTransfer: stokTransferReducer,
  // Unified SPK Reducer
  spk: spkReducer,
  // Unified STB Reducer
  stb: stbReducer,
  // Mutasi Keluar Reducers
  returPembelian: returPembelianReducer,
  // Mutasi Masuk Reducers
  returPenjualan: returPenjualanReducer,
  suratJalan: suratJalanReducer,
  suratPengeluaranBarang: suratPengeluaranBarangReducer,
  // Report Reducers
  stockReport: stockReportReducer,
  returPembelianReport: returPembelianReportReducer,
  returPenjualanReport: returPenjualanReportReducer,
  pengeluaranBarangReport: pengeluaranBarangReportReducer,
  penerimaanBarangReport: penerimaanBarangReportReducer,
  mutasiBarangReport: mutasiBarangReportReducer,
});

export default rootReducer;
