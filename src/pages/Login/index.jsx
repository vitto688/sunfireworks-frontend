import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import redux
import { loginRequest } from "../../redux/actions/authActions";

// Import styles
import styles from "./style.module.scss";

// Import assets
import { ReactComponent as LogoIcon } from "../../assets/svg/logo.svg";

// Import components
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import AlertDialog from "../../components/AlertDialog";

export const LOGIN_PATH = "/login";

const Login = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, errorCode, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [email, password]);

  //#endregion

  //#region Local functions
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };
  //#endregion

  return (
    <div className={styles.loginSection}>
      <AlertDialog show={errorCode} message={errorMessage} />
      <LogoIcon
        style={{
          width: "120px",
          height: "120px",
        }}
      />
      <h1 className={styles.title}>Simpel Data</h1>
      <p className={styles.subTitle}>Masuk Dengan Akun Anda</p>

      <form onSubmit={handleSubmit} className={styles.formInputSection}>
        <InputText
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <InputPassword
          value={password}
          showPassword={showPassword}
          isPasswordFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShowPassword((val) => !val)}
        />
        <button
          type="submit"
          disabled={loading.login || !isFilled}
          className={`${styles.button} ${isFilled && styles.active}`}
        >
          {loading.login ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
