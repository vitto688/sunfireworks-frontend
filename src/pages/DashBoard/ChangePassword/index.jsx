import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  changePasswordRequest,
  resetUserMessages,
} from "../../../redux/actions/authActions";

// Import Components
import CustomButton from "../../../components/CustomButton";
import Loading from "../../../components/Loading";
import InputPassword from "../../../components/InputPassword";

// Define the path for the Change Password page
export const CHANGE_PASSWORD_PATH = "/pengaturan/ubah-password";

const ChangePassword = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, message, errorCode, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (password !== "" && newPassword !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [password, newPassword]);

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

  //#region Handlers
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin mengubah password?")) {
      dispatch(
        changePasswordRequest({
          id: user.id,
          body: { old_password: password, new_password: newPassword },
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
    <div className={styles.changePasswordSection}>
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
        <InputPassword
          value={password}
          showPassword={showPassword}
          placeholder="Password Lama"
          isPasswordFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShowPassword((val) => !val)}
        />
        <InputPassword
          value={newPassword}
          showPassword={showNewPassword}
          placeholder="Password Baru"
          isPasswordFocused={isNewPasswordFocused}
          onFocus={() => setIsNewPasswordFocused(true)}
          onBlur={() => setIsNewPasswordFocused(false)}
          onChange={(e) => setNewPassword(e.target.value)}
          onClick={() => setShowNewPassword((val) => !val)}
        />
      </div>
      {loading.warehouses && (
        <Loading message="Mengubah password, mohon tunggu..." />
      )}
    </div>
  );
};

export default ChangePassword;
