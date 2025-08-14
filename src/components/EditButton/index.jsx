import React from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./style.module.scss";

const EditButton = ({ label = "Ubah", onClick }) => {
  return (
    <button className={styles.editButton} onClick={onClick}>
      <FaEdit className={styles.icon} />
      {label}
    </button>
  );
};

export default EditButton;
