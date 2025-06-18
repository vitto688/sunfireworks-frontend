import React from "react";
import { PackagePlus } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

const AddStockButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.addStockButton}>
      <PackagePlus size={18} />
      Tambah Stok
    </button>
  );
};

export default AddStockButton;
