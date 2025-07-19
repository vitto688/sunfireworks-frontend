import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  addCustomerRequest,
  resetMasterMessages,
} from "../../../../../redux/actions/masterActions";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";

// Define the path for the Add Customer page
export const TAMBAH_PELANGGAN_PATH = "/master-data/pelanggan/tambah-pelanggan";

const TambahPelanggan = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTel, setNoTel] = useState("");
  const [upline, setUpline] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    dispatch(resetMasterMessages());
  }, [dispatch]);

  useEffect(() => {
    if (nama !== "" && alamat !== "" && noTel !== "" && upline !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [nama, alamat, noTel, upline]);

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
    if (window.confirm("Apakah anda yakin ingin menambah pengguna ini?")) {
      dispatch(
        addCustomerRequest({
          body: {
            name: nama,
            address: alamat,
            contact_number: noTel,
            upline: upline,
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
    <div className={styles.addCustomerSection}>
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
          label="Nama"
          type="text"
          id="nama"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <InputField
          label="Alamat"
          type="text"
          id="alamat"
          name="alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />
        <InputField
          label="UP."
          type="text"
          id="upline"
          name="upline"
          value={upline}
          onChange={(e) => setUpline(e.target.value)}
        />
        <InputField
          label="Nomor Telepon"
          type="text"
          id="noTel"
          name="noTel"
          value={noTel}
          onChange={(e) => setNoTel(e.target.value)}
        />
      </div>
      {loading.customers && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default TambahPelanggan;
