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

export const LOGIN_PATH = "/login";

const Login = () => {
  //#region Hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswrodFocused, setIsPasswrodFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (username !== "" && password !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [username, password]);

  //#endregion

  //#region Local functions
  const handleSubmit = (e) => {
    console.log("test");
    e.preventDefault();
    dispatch(loginRequest({ username, password }));
  };
  //#endregion

  return (
    <div className={styles.loginSection}>
      <LogoIcon
        style={{
          width: "120px",
          height: "120px",
        }}
      />
      <h1 className={styles.title}>Simple Data</h1>
      <p className={styles.subTitle}>Masuk Dengan Akun Anda</p>

      <form onSubmit={handleSubmit} className={styles.formInputSection}>
        <InputText
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <InputPassword
          value={password}
          showPassword={showPassword}
          isPasswrodFocused={isPasswrodFocused}
          onFocus={() => setIsPasswrodFocused(true)}
          onBlur={() => setIsPasswrodFocused(false)}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShowPassword((val) => !val)}
        />
        <button
          type="submit"
          disabled={loading || !isFilled}
          className={`${styles.button} ${isFilled && styles.active}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
