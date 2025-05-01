import React from "react";
import { Trash2 } from "lucide-react";

// import style
import styles from "./style.module.scss";

const CustomDeleteButton = ({ onClick }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick} title="Hapus">
      <Trash2 />
    </button>
  );
};

export default CustomDeleteButton;
