import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Import actions
import {
  resetMasterMessages,
  updateWarehouseRequest,
} from "../../../../../redux/actions/masterActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";

export const UBAH_GUDANG_PATH = "/master-data/gudang/ubah-gudang";

const UbahGudang = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const gudang = location.state || {};

  const [nama, setNama] = useState(gudang?.name ?? "");
  const [deskripsi, setDeskripsi] = useState(gudang?.description ?? "");

  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetMasterMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetMasterMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  //#endregion

  //#region Handlers

  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin mengubah gudang ini?")) {
      dispatch(
        updateWarehouseRequest({
          id: gudang.id,
          body: {
            name: nama,
            description: deskripsi,
          },
        })
      );
    }
  };

  const handleBatalClick = () => {
    dispatch(resetMasterMessages());
    navigate(-1);
  };

  //#endregion

  return (
    <div className={styles.addWarehouseSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton label="Simpan" onClick={handleSimpanClick} />
      </div>
      <div className={styles.formSection}>
        <InputField
          label="Nama Gudang"
          type="text"
          id="nama"
          name="nama_tb"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <InputField
          label="Deskripsi"
          type="text"
          id="deskripsi"
          name="deskripsi_tb"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
      </div>
      {loading.warehouses && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default UbahGudang;
