import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import InfoCard from "../../../components/InfoCard";
import Chart from "../../../components/Chart";
import DateRangeFilter from "../../../components/DateRangeFilter";
import { formatNumber } from "../../../utils/numberFormat";
import { fetchMutasiBarangReportNPRequest } from "../../../redux/actions/mutasiBarangReportActions";
import { fetchPenerimaanBarangReportNPRequest } from "../../../redux/actions/penerimaanBarangReportActions";
import { fetchPengeluaranBarangReportNPRequest } from "../../../redux/actions/pengeluaranBarangReportActions";
import { fetchReturPembelianReportNPRequest } from "../../../redux/actions/returPembelianReportActions";
import { fetchReturPenjualanReportNPRequest } from "../../../redux/actions/returPenjualanReportActions";

export const BERANDA_PATH = "/";

const Beranda = () => {
  //#region State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // Default to overview
  //#endregion

  //#region Redux
  const dispatch = useDispatch();

  const { mutasiBarangReportNP } = useSelector(
    (state) => state.mutasiBarangReport
  );
  const { penerimaanBarangNPReport } = useSelector(
    (state) => state.penerimaanBarangReport
  );
  const { pengeluaranBarangReportNP } = useSelector(
    (state) => state.pengeluaranBarangReport
  );
  const { returPembelianReportNP } = useSelector(
    (state) => state.returPembelianReport
  );
  const { returPenjualanReportNP } = useSelector(
    (state) => state.returPenjualanReport
  );

  // Calculate chart data based on InfoCard values
  const getChartData = () => {
    // If specific card is selected (including default "stock"), show detailed breakdown
    if (selectedCard !== null) {
      return getDetailedChartData(selectedCard);
    }

    // Overview chart (only when selectedCard is null)
    // Calculate actual quantities from each report
    const mutasiCount =
      mutasiBarangReportNP?.reduce(
        (acc, item) =>
          acc + (item.carton_quantity || 0) + (item.pack_quantity || 0),
        0
      ) || 0;

    const penerimaanCount =
      penerimaanBarangNPReport?.reduce(
        (acc, item) =>
          acc + (item.carton_quantity || 0) + (item.pack_quantity || 0),
        0
      ) || 0;

    const pengeluaranCount =
      pengeluaranBarangReportNP?.reduce(
        (acc, item) =>
          acc + (item.carton_quantity || 0) + (item.pack_quantity || 0),
        0
      ) || 0;

    const returPembelianCount =
      returPembelianReportNP?.reduce(
        (acc, item) =>
          acc + (item.carton_quantity || 0) + (item.pack_quantity || 0),
        0
      ) || 0;

    const returPenjualanCount =
      returPenjualanReportNP?.reduce(
        (acc, item) =>
          acc + (item.carton_quantity || 0) + (item.pack_quantity || 0),
        0
      ) || 0;

    console.log(
      "data",
      mutasiCount,
      penerimaanCount,
      pengeluaranCount,
      returPembelianCount,
      returPenjualanCount
    );
    console.log(
      "raw",
      mutasiBarangReportNP,
      penerimaanBarangNPReport,
      pengeluaranBarangReportNP,
      returPembelianReportNP,
      returPenjualanReportNP
    );

    const total =
      mutasiCount +
      penerimaanCount +
      pengeluaranCount +
      returPembelianCount +
      returPenjualanCount;

    if (total === 0) {
      return [
        {
          label: "Tidak ada data",
          percentage: 100,
          color: "#e0e0e0",
          value: 0,
        },
      ];
    }

    const chartData = [
      {
        label: "Mutasi Barang",
        percentage: Math.round((mutasiCount / total) * 100),
        color: "#2196F3",
        value: mutasiCount,
      },
      {
        label: "Penerimaan Barang",
        percentage: Math.round((penerimaanCount / total) * 100),
        color: "#FF9800",
        value: penerimaanCount,
      },
      {
        label: "Pengeluaran Barang",
        percentage: Math.round((pengeluaranCount / total) * 100),
        color: "#F44336",
        value: pengeluaranCount,
      },
      {
        label: "Retur Pembelian",
        percentage: Math.round((returPembelianCount / total) * 100),
        color: "#9C27B0",
        value: returPembelianCount,
      },
      {
        label: "Retur Penjualan",
        percentage: Math.round((returPenjualanCount / total) * 100),
        color: "#607D8B",
        value: returPenjualanCount,
      },
    ].filter((item) => item.percentage > 0); // Only show items with data

    console.log(chartData);

    // Ensure percentages add up to 100%
    const totalPercentage = chartData.reduce(
      (sum, item) => sum + item.percentage,
      0
    );
    if (totalPercentage !== 100 && chartData.length > 0) {
      // Adjust the largest item to make total 100%
      const maxItem = chartData.reduce(
        (max, item) => (item.percentage > max.percentage ? item : max),
        chartData[0]
      );
      maxItem.percentage += 100 - totalPercentage;
    }

    return chartData;
  };

  // Get detailed chart data for specific card
  const getDetailedChartData = (cardType) => {
    let data = [];

    switch (cardType) {
      case "mutasi":
        data = mutasiBarangReportNP || [];
        break;
      case "penerimaan":
        data = penerimaanBarangNPReport || [];
        break;
      case "pengeluaran":
        data = pengeluaranBarangReportNP || [];
        break;
      case "returPembelian":
        data = returPembelianReportNP || [];
        break;
      case "returPenjualan":
        data = returPenjualanReportNP || [];
        break;
      default:
        return [];
    }

    const cartonTotal = data.reduce(
      (acc, item) => acc + (item.carton_quantity || 0),
      0
    );
    const packTotal = data.reduce(
      (acc, item) => acc + (item.pack_quantity || 0),
      0
    );
    const total = cartonTotal + packTotal;

    if (total === 0) {
      return [
        {
          label: "Tidak ada data",
          percentage: 100,
          color: "#e0e0e0",
          value: 0,
        },
      ];
    }

    const chartData = [
      {
        label: "Carton Quantity",
        percentage: Math.round((cartonTotal / total) * 100),
        color: "#4CAF50",
        value: cartonTotal,
      },
      {
        label: "Pack Quantity",
        percentage: Math.round((packTotal / total) * 100),
        color: "#2196F3",
        value: packTotal,
      },
    ].filter((item) => item.percentage > 0);

    // Ensure percentages add up to 100%
    const totalPercentage = chartData.reduce(
      (sum, item) => sum + item.percentage,
      0
    );
    if (totalPercentage !== 100 && chartData.length > 0) {
      const maxItem = chartData.reduce(
        (max, item) => (item.percentage > max.percentage ? item : max),
        chartData[0]
      );
      maxItem.percentage += 100 - totalPercentage;
    }

    return chartData;
  };

  // Handle InfoCard chart view
  const handleViewChart = (cardType) => {
    setSelectedCard(cardType);
  };

  const handleBackToOverview = () => {
    setSelectedCard(null); // Set to null for overview
  };

  const handleShowOverview = () => {
    setSelectedCard(null); // Same as back to overview
  };

  // Get card title for chart
  const getCardTitle = (cardType) => {
    switch (cardType) {
      case "mutasi":
        return "Mutasi Barang";
      case "penerimaan":
        return "Penerimaan Barang";
      case "pengeluaran":
        return "Pengeluaran Barang";
      case "returPembelian":
        return "Retur Pembelian";
      case "returPenjualan":
        return "Retur Penjualan";
      default:
        return "";
    }
  };

  //#endregion

  //#region Filter Functions

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      const params = {
        start_date: startDate,
        end_date: endDate,
      };
      dispatch(fetchMutasiBarangReportNPRequest(params));
      dispatch(fetchPenerimaanBarangReportNPRequest(params));
      dispatch(fetchPengeluaranBarangReportNPRequest(params));
      dispatch(fetchReturPembelianReportNPRequest(params));
      dispatch(fetchReturPenjualanReportNPRequest(params));
      // setIsFilterApplied(true);
    }
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    // setIsFilterApplied(false);
    dispatch(fetchMutasiBarangReportNPRequest());
    dispatch(fetchPenerimaanBarangReportNPRequest());
    dispatch(fetchPengeluaranBarangReportNPRequest());
    dispatch(fetchReturPembelianReportNPRequest());
    dispatch(fetchReturPenjualanReportNPRequest());
  };
  //#endregion

  //#region effects
  useEffect(() => {
    // Initial load without filter
    dispatch(fetchMutasiBarangReportNPRequest());
    dispatch(fetchPenerimaanBarangReportNPRequest());
    dispatch(fetchPengeluaranBarangReportNPRequest());
    dispatch(fetchReturPembelianReportNPRequest());
    dispatch(fetchReturPenjualanReportNPRequest());
  }, [dispatch]);
  //#endregion

  return (
    <div className={styles.berandaSection}>
      <div className={styles.contentWrapper}>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApplyFilter={handleApplyFilter}
          onClearFilter={handleClearFilter}
        />

        <div className={styles.infoSection}>
          <InfoCard
            title="Mutasi Barang"
            value={formatNumber(mutasiBarangReportNP?.length || 0)}
            onViewChart={() => handleViewChart("mutasi")}
            isSelected={selectedCard === "mutasi"}
          />
          <InfoCard
            title="Penerimaan Barang"
            value={formatNumber(penerimaanBarangNPReport?.length || 0)}
            onViewChart={() => handleViewChart("penerimaan")}
            isSelected={selectedCard === "penerimaan"}
          />
          <InfoCard
            title="Pengeluaran Barang"
            value={formatNumber(pengeluaranBarangReportNP?.length || 0)}
            onViewChart={() => handleViewChart("pengeluaran")}
            isSelected={selectedCard === "pengeluaran"}
          />
          <InfoCard
            title="Retur Pembelian"
            value={formatNumber(returPembelianReportNP?.length || 0)}
            onViewChart={() => handleViewChart("returPembelian")}
            isSelected={selectedCard === "returPembelian"}
          />
          <InfoCard
            title="Retur Penjualan"
            value={formatNumber(returPenjualanReportNP?.length || 0)}
            onViewChart={() => handleViewChart("returPenjualan")}
            isSelected={selectedCard === "returPenjualan"}
          />
        </div>
      </div>
      <div className={styles.chartSection}>
        <Chart
          title={
            selectedCard === null
              ? "Distribusi Data Laporan"
              : `Detail ${getCardTitle(selectedCard)}`
          }
          period="Real-time"
          data={getChartData()}
          showBackButton={selectedCard !== null}
          onBack={handleBackToOverview}
          showOverviewButton={selectedCard !== null}
          onOverview={handleShowOverview}
        />
      </div>
    </div>
  );
};

export default Beranda;
