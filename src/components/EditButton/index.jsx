import React from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./style.module.scss";

const EditButton = ({ onClick }) => {
  return (
    <button className={styles.editButton} onClick={onClick}>
      <FaEdit className={styles.icon} />
      Ubah Stok
    </button>
  );
};

export default EditButton;
