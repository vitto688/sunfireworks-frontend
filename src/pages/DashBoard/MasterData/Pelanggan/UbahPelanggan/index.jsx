import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  resetMasterMessages,
  updateCustomerRequest,
} from "../../../../../redux/actions/masterActions";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";

// Define the path for the Add Customer page
export const UBAH_PELANGGAN_PATH = "/master-data/pelanggan/ubah-pelanggan";

const UbahPelanggan = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pelanggan = location.state || {};

  const [nama, setNama] = useState(pelanggan?.name ?? "");
  const [alamat, setAlamat] = useState(pelanggan?.address ?? "");
  const [noTel, setNoTel] = useState(pelanggan?.contact_number ?? "");
  const [upline, setUpline] = useState(pelanggan?.upline ?? "");

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
    if (window.confirm("Apakah anda yakin ingin mengubah pelanggan ini?")) {
      dispatch(
        updateCustomerRequest({
          id: pelanggan.id,
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
        <CustomButton label="Simpan" onClick={handleSimpanClick} />
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
          label="Upline"
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
      {loading.pelanggan && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default UbahPelanggan;
