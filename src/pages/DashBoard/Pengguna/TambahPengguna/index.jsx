import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import actions
import {
  addUserRequest,
  resetUserMessages,
} from "../../../../redux/actions/authActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import CustomButton from "../../../../components/CustomButton";
import Loading from "../../../../components/Loading";

// Define the path for the Add User page
export const TAMBAH_PENGGUNA_PATH = "/pengguna/tambah-pengguna";

const TambahPengguna = () => {
  //#region Hooks
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [role, setRole] = useState(0);
  const [isFilled, setIsFilled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roles, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(resetUserMessages());
  }, [dispatch]);

  useEffect(() => {
    if (
      nama !== "" &&
      email !== "" &&
      password !== "" &&
      nomorTelepon !== "" &&
      role !== 0
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [nama, email, password, nomorTelepon, role]);

  useEffect(() => {
    if (message !== null) {
      alert(message);

      dispatch(resetUserMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Local functions
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin menyimpan pengguna ini?")) {
      dispatch(
        addUserRequest({
          username: nama,
          email,
          password,
          phone_number: nomorTelepon,
          role: Number(role),
        })
      );
    }
  };

  const handleBatalClick = () => {
    dispatch(resetUserMessages());
    navigate(-1);
  };
  //#endregion

  return (
    <div className={styles.tambahPenggunaSection}>
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
          label="Nama Pengguna"
          type="text"
          id="nama"
          name="nama_tp"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email_tp"
          autoComplete="new-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          id="password_tp"
          name="password_tp"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Nomor Telepon"
          type="text"
          id="nomorTelepon"
          name="nomorTelepon_tp"
          value={nomorTelepon}
          onChange={(e) => setNomorTelepon(e.target.value)}
        />
        <SelectField
          label="Role"
          name="role_tp"
          autoComplete="new-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={roles}
        />
      </div>

      {loading.users && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default TambahPengguna;
