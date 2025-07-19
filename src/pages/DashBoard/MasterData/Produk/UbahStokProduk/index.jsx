/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  fetchStockByProductIdRequest,
  resetStockMessages,
  updateMultipleStocksRequest,
} from "../../../../../redux/actions/stockActions";

// Import components
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";
import InputField from "../../../../../components/InputField";
import StokItem from "./stokItem";

// Define the path for the Ubah Stok Produk page
export const UBAH_STOK_PRODUK_PATH = "/master-data/produk/ubah-stok-produk";

const UbahStokProduk = () => {
  //#region Hooks

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const produk = location.state || {};

  const [stocksChanged, setStocksChanged] = useState([]);
  const [isFilled, setIsFilled] = useState(false);

  const { stocks, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.stock
  );

  useEffect(() => {
    // Fetch stock data from API or state management
    // For now, we are using dummy data
    dispatch(fetchStockByProductIdRequest(produk.id));
  }, [dispatch, produk.id]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      setStocksChanged([]);

      dispatch(resetStockMessages());
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetStockMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin mengubah stok ini?")) {
      dispatch(updateMultipleStocksRequest(stocksChanged));
    }
  };

  useEffect(() => {
    if (stocksChanged.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [stocksChanged.length]);

  const handleBatalClick = () => {
    dispatch(resetStockMessages());
    navigate(-1);
  };

  const handleCartonChange = (e, stok) => {
    const newCartonQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newCartonQuantity)) {
      setStocksChanged((prevStocks) => {
        const updatedStocks = [...prevStocks];
        const index = updatedStocks.findIndex((s) => s.id === stok.id);
        if (index !== -1) {
          updatedStocks[index].carton_quantity = newCartonQuantity;

          if (
            updatedStocks[index].carton_quantity === stok.carton_quantity &&
            updatedStocks[index].pack_quantity === stok.pack_quantity
          ) {
            // remove the stock from the updatedStocks array
            updatedStocks.splice(index, 1);
          }
        } else {
          updatedStocks.push({ ...stok, carton_quantity: newCartonQuantity });
        }

        return updatedStocks;
      });
    }
  };

  const handlePackChange = (e, stok) => {
    const newPackQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newPackQuantity)) {
      setStocksChanged((prevStocks) => {
        const updatedStocks = [...prevStocks];
        const index = updatedStocks.findIndex((s) => s.id === stok.id);
        if (index !== -1) {
          updatedStocks[index].pack_quantity = newPackQuantity;
          if (
            updatedStocks[index].carton_quantity === stok.carton_quantity &&
            updatedStocks[index].pack_quantity === stok.pack_quantity
          ) {
            // remove the stock from the updatedStocks array
            updatedStocks.splice(index, 1);
          }
        } else {
          updatedStocks.push({ ...stok, pack_quantity: newPackQuantity });
        }
        return updatedStocks;
      });
    }
  };
  //#endregion

  return (
    <div className={styles.ubahStokSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton
          label="Simpan"
          inactive={!isFilled || loading}
          onClick={handleSimpanClick}
        />
      </div>
      <div className={styles.formSection}>
        <InputField
          label="Kode Produk"
          type="text"
          id="kodeProduk"
          name="kodeProduk"
          disabled={true}
          value={produk?.code ?? ""}
        />

        <InputField
          label="Nama Produk"
          type="text"
          id="namaProduk"
          name="namaProduk"
          disabled={true}
          value={produk?.name ?? ""}
        />
        <div className={styles.quantitySection}>
          <InputField
            label="Kategori Produk"
            type="text"
            id="kategoriProduk"
            name="kategoriProduk"
            disabled={true}
            value={produk?.category_name ?? ""}
          />
          <InputField
            label="Eksportir"
            type="text"
            id="eksportir"
            name="eksportir"
            disabled={true}
            value={produk?.supplier_name ?? ""}
          />
          <InputField
            label="Packing"
            type="text"
            id="kemasan"
            name="kemasan"
            disabled={true}
            value={produk?.packing ?? ""}
          />
        </div>

        <label className={styles.label} htmlFor="stokDiGudang">
          Stok
        </label>
        <div className={styles.stokGudang}>
          {stocks.map((stok, index) => {
            if (stok.product !== produk.id) return null;

            return (
              <StokItem
                index={index}
                code={produk.code}
                stok={stok}
                handleCartonChange={handleCartonChange}
                handlePackChange={handlePackChange}
              />
            );
          })}
        </div>
      </div>
      {loading && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default UbahStokProduk;
