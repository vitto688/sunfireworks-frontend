import React from "react";
import { FiLogOut } from "react-icons/fi";

import styles from "./style.module.scss";

const LogoutButton = ({ onClick }) => {
  return (
    <button className={styles.logoutBtn} onClick={onClick}>
      <FiLogOut className={styles.icon} />
      Keluar
    </button>
  );
};

export default LogoutButton;
