import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import redux
import { loginRequest } from "../redux/actions/authActions";

// Import styles
import styles from "./login.module.scss";

// Import assets
import { ReactComponent as SignInIcon } from "../assets/svg/sign-in.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    console.log("test");
    e.preventDefault();
    dispatch(loginRequest({ username, password }));
  };

  return (
    <div className={styles.loginSection}>
      <SignInIcon
        style={{
          width: "160px",
          height: "160px",
        }}
      />

      <form onSubmit={handleSubmit} className={styles.formInputSection}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
