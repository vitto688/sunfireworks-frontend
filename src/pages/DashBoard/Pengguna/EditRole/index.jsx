import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Import actions
import {
  resetUserMessages,
  updateRoleRequest,
} from "../../../../redux/actions/authActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../components/CustomButton";
import Loading from "../../../../components/Loading";
import SelectField from "../../../../components/SelectField";

// Define the path for the Edit User page
export const EDIT_ROLE_PATH = "/pengguna/edit-role";

const EditRole = () => {
  //#region Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state || {};

  const [role, setRole] = useState(user?.role ?? "");

  const dispatch = useDispatch();

  const { roles, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (message !== null) {
      alert(message);

      dispatch(resetUserMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetUserMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  //#endregion

  const handleSimpanClick = () => {
    if (role === "") {
      alert("Role tidak boleh kosong");
      return;
    }
    if (window.confirm("Apakah anda yakin ingin mengubah role pengguna ini?")) {
      dispatch(
        updateRoleRequest({
          id: user.id,
          body: {
            role,
          },
        })
      );
    }
  };

  const handleBatalClick = () => {
    dispatch(resetUserMessages());
    navigate(-1);
  };

  return (
    <div className={styles.editRoleSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton label="Simpan" onClick={handleSimpanClick} />
      </div>
      <div className={styles.formSection}>
        <SelectField
          label="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={roles}
        />
      </div>
      {loading.users && <Loading message="Menyimpan data, mohon tunggu..." />}
    </div>
  );
};

export default EditRole;
