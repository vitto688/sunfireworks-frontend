import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  fetchStockByIdRequest,
  resetStockMessages,
  updateStockRequest,
} from "../../../../redux/actions/stockActions";

// Import components
import CustomButton from "../../../../components/CustomButton";
import InputField from "../../../../components/InputField";
import Loading from "../../../../components/Loading";
import {
  formatNumberWithDot,
  parseFormattedNumber,
} from "../../../../utils/numberUtils";

// Define the path for the Ubah Stok page
export const UBAH_STOK_PATH = "/stok/ubah-stok";

const UbahStok = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const stok = location.state || {};

  const [carton, setCarton] = useState(stok.carton_quantity ?? 0);
  const [pack, setPack] = useState(stok.pack_quantity ?? 0);
  const [isFilled, setIsFilled] = useState(false);

  const { currentStock, loading, message, errorMessage, errorCode } =
    useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStockByIdRequest(stok.id));
  }, [dispatch, stok.id]);

  useEffect(() => {
    if (currentStock) {
      setCarton(currentStock.carton_quantity ?? 0);
      setPack(currentStock.pack_quantity ?? 0);
    }
  }, [currentStock]);

  useEffect(() => {
    if (
      carton !== (stok.carton_quantity ?? 0) ||
      pack !== (stok.pack_quantity ?? 0)
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [carton, pack, stok.carton_quantity, stok.pack_quantity]);

  useEffect(() => {
    if (message !== null) {
      alert(message);

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
      dispatch(
        updateStockRequest({
          id: stok.id,
          body: {
            product: stok.product,
            warehouse: stok.warehouse,
            carton_quantity: carton,
            pack_quantity: pack,
          },
        })
      );
    }
  };

  const handleBatalClick = () => {
    dispatch(resetStockMessages());
    navigate(-1);
  };

  const handleCartonChange = (e) => {
    const value = parseFormattedNumber(e.target.value);
    if (/^\d*$/.test(value)) {
      setCarton(Number(value));
    }
  };

  const handlePackChange = (e) => {
    const value = parseFormattedNumber(e.target.value);
    if (/^\d*$/.test(value)) {
      setPack(Number(value));
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
          onClick={handleSimpanClick}
          inactive={!isFilled}
        />
      </div>
      <div className={styles.formSection}>
        <InputField
          label="Kode Produk"
          type="text"
          id="kodeProduk"
          name="kodeProduk"
          defaultValue={stok.product_code ?? ""}
          disabled={true}
        />

        <InputField
          label="Nama Produk"
          type="text"
          id="namaProduk"
          name="namaProduk"
          defaultValue={stok.product_name ?? ""}
          disabled={true}
        />
        <InputField
          label="Packing"
          type="text"
          id="packing"
          name="packing"
          defaultValue={stok.packing ?? ""}
          disabled={true}
        />
        <InputField
          label="KP"
          type="text"
          id="kp"
          name="kp"
          defaultValue={stok.supplier_name ?? ""}
          disabled={true}
        />
        <InputField
          label="Gudang"
          type="text"
          id="gudang"
          name="gudang"
          defaultValue={stok.warehouse_name ?? ""}
          disabled={true}
        />

        <div className={styles.quantitySection}>
          <InputField
            label="Kuantitas Karton Lama"
            type="text"
            id="kartonLama"
            name="kartonLama"
            defaultValue={formatNumberWithDot(
              currentStock?.carton_quantity ?? 0
            )}
            disabled={true}
          />

          <InputField
            label="Kuantitas Karton Baru"
            type="text"
            id="kartonBaru"
            name="kartonBaru"
            value={formatNumberWithDot(carton)}
            onChange={handleCartonChange}
          />
        </div>

        <div className={styles.quantitySection}>
          <InputField
            label="Kuantitas Pack Lama"
            type="text"
            id="packLama"
            name="packLama"
            defaultValue={formatNumberWithDot(currentStock?.pack_quantity ?? 0)}
            disabled={true}
          />

          <InputField
            label="Kuantitas Karton Baru"
            type="text"
            id="kartonBaru"
            name="kartonBaru"
            value={formatNumberWithDot(pack)}
            onChange={handlePackChange}
          />
        </div>
      </div>
      {loading && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default UbahStok;
