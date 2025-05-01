import React from "react";

// Import styles
import styles from "./style.module.scss";

const ConfirmDeleteModal = ({ label, open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>{label}</h3>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Batal
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
