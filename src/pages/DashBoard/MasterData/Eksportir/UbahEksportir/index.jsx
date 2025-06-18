import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import {
  resetMasterMessages,
  updateSupplierRequest,
} from "../../../../../redux/actions/masterActions";
import Loading from "../../../../../components/Loading";

export const UBAH_EKSPORTIR_PATH = "/master-data/eksportir/ubah-eksportir";

const UbahEksportir = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const eksportir = location.state || {};

  const [pic, setPic] = useState(eksportir?.pic_name ?? "");
  const [nama, setNama] = useState(eksportir?.name ?? "");
  const [alamat, setAlamat] = useState(eksportir?.address ?? "");
  const [email, setEmail] = useState(eksportir?.email ?? "");
  const [noTel, setNoTel] = useState(eksportir?.pic_contact ?? "");

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
    if (window.confirm("Apakah anda yakin ingin mengubah eksportir ini?")) {
      dispatch(
        updateSupplierRequest({
          id: eksportir.id,
          body: {
            name: nama,
            email,
            address: alamat,
            pic_name: pic,
            pic_contact: noTel,
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
    <div className={styles.addSupplierSection}>
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
          label="Email"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          label="PIC"
          type="text"
          id="pic"
          name="pic"
          value={pic}
          onChange={(e) => setPic(e.target.value)}
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
      {loading.suppliers && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default UbahEksportir;
