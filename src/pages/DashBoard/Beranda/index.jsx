import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import InfoCard from "../../../components/InfoCard";
import Chart from "../../../components/Chart";
import { fetchMutasiBarangReportNPRequest } from "../../../redux/actions/mutasiBarangReportActions";
import { fetchPenerimaanBarangReportNPRequest } from "../../../redux/actions/penerimaanBarangReportActions";
import { fetchPengeluaranBarangReportNPRequest } from "../../../redux/actions/pengeluaranBarangReportActions";
import { fetchReturPembelianReportNPRequest } from "../../../redux/actions/returPembelianReportActions";
import { fetchReturPenjualanReportNPRequest } from "../../../redux/actions/returPenjualanReportActions";
import { fetchStockReportNPRequest } from "../../../redux/actions/stockReportActions";

export const BERANDA_PATH = "/";

const Beranda = () => {
  //#region Redux
  const dispatch = useDispatch();

  const salesData = [
    { label: "Retur Pembelian", percentage: 10, color: "#32cd32" },
    { label: "Retur Penjualan", percentage: 5, color: "#ffd700" },
    // { label: "Others", percentage: 35.9, color: "#d3d3d3" },
  ];

  const { mutasiBarangReportNP } = useSelector(
    (state) => state.mutasiBarangReport
  );
  const { penerimaanBarangNPReport } = useSelector(
    (state) => state.penerimaanBarangReport
  );
  const { pengeluaranBarangNPReport } = useSelector(
    (state) => state.pengeluaranBarangReport
  );
  const { returPembelianReportNP } = useSelector(
    (state) => state.returPembelianReport
  );
  const { returPenjualanReportNP } = useSelector(
    (state) => state.returPenjualanReport
  );
  const { stockReportNP } = useSelector((state) => state.stockReport);

  //#endregion

  //#region effects
  useEffect(() => {
    // Any initialization logic can go here
    dispatch(fetchMutasiBarangReportNPRequest());
    dispatch(fetchPenerimaanBarangReportNPRequest());
    dispatch(fetchPengeluaranBarangReportNPRequest());
    dispatch(fetchReturPembelianReportNPRequest());
    dispatch(fetchReturPenjualanReportNPRequest());
    dispatch(fetchStockReportNPRequest());
  }, [dispatch]);
  //#endregion

  return (
    <div className={styles.berandaSection}>
      <div className={styles.infoSection}>
        <InfoCard title="Perubahan Stok" value={stockReportNP?.length || 0} />
        <InfoCard
          title="Mutasi Barang"
          value={mutasiBarangReportNP?.length || 0}
        />
        <InfoCard
          title="Penerimaan Barang"
          value={penerimaanBarangNPReport?.length || 0}
        />
        <InfoCard
          title="Pengeluaran Barang"
          value={pengeluaranBarangNPReport?.length || 0}
        />
        <InfoCard
          title="Retur Pembelian"
          value={returPembelianReportNP?.length || 0}
        />
        <InfoCard
          title="Retur Penjualan"
          value={returPenjualanReportNP?.length || 0}
        />
      </div>
      <div className={styles.chartSection}>
        <Chart
          title="Pembelian dan Penjualan"
          period="Bulan"
          data={salesData}
        />
      </div>
    </div>
  );
};

export default Beranda;
