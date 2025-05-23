import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Import actions
import {
  resetUserReducer,
  restoreUserRequest,
  updateUserRequest,
} from "../../../../redux/actions/authActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../components/InputField";
import CustomButton from "../../../../components/CustomButton";
import Loading from "../../../../components/Loading";

// Define the path for the Edit User page
export const EDIT_PENGGUNA_PATH = "/pengguna/edit-pengguna";

const EditPengguna = () => {
  //#region Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state || {};

  const [nama, setNama] = useState(user?.username ?? "");
  // const [email, setEmail] = useState(user?.email ?? "");
  const [nomorTelepon, setNomorTelepon] = useState(user?.phone_number ?? "");
  // const [role, setRole] = useState(user?.role ?? "");

  const dispatch = useDispatch();

  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (message !== null) {
      alert(message);

      dispatch(resetUserReducer());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  //#endregion

  const handleSimpanClick = () => {
    if (user?.is_deleted) {
      if (window.confirm("Apakah anda yakin ingin memulihkan pengguna ini?")) {
        dispatch(
          restoreUserRequest({
            id: user.id,
          })
        );
        return;
      }
    } else {
      if (window.confirm("Apakah anda yakin ingin menyimpan perubahan?")) {
        dispatch(
          updateUserRequest({
            id: user.id,
            body: {
              username: nama,
              phone_number: nomorTelepon,
            },
          })
        );
      }
    }
  };

  const handleBatalClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.editPenggunaSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton
          label={user?.is_deleted ? "Pulihkan" : "Simpan"}
          onClick={handleSimpanClick}
        />
      </div>
      <div className={styles.formSection}>
        <InputField
          label="Nama Pengguna"
          type="text"
          id="nama"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          disabled={user?.is_deleted}
        />

        <InputField
          label="Nomor Telepon"
          type="text"
          id="nomorTelepon"
          name="nomorTelepon"
          value={nomorTelepon}
          onChange={(e) => setNomorTelepon(e.target.value)}
          disabled={user?.is_deleted}
        />
      </div>
      {loading.users && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default EditPengguna;
