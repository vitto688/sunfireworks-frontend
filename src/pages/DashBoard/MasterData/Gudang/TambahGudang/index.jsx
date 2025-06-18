import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import actions
import {
  addWarehouseRequest,
  resetMasterMessages,
} from "../../../../../redux/actions/masterActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";

export const TAMBAH_GUDANG_PATH = "/master-data/gudang/tambah-gudang";

const TambahGudang = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    dispatch(resetMasterMessages());
  }, [dispatch]);

  useEffect(() => {
    if (nama !== "" && deskripsi !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [nama, deskripsi]);

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

  //#region Functions
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin menambah gudang ini?")) {
      dispatch(
        addWarehouseRequest({
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
        <CustomButton
          label="Simpan"
          onClick={handleSimpanClick}
          inactive={!isFilled}
        />
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

export default TambahGudang;
