import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// Import styles
import styles from "./style.module.scss";
import {
  formatNumberWithDot,
  parseFormattedNumber,
} from "../../utils/numberUtils";

// Import components

const EditStockModal = ({
  stock,
  cartonQuantity = 0,
  packQuantity = 0,
  isOpen,
  onClose,
  onSave,
}) => {
  const [carton, setCarton] = useState(stock?.carton_quantity ?? 0);
  const [pack, setPack] = useState(stock?.pack_quantity ?? 0);

  useEffect(() => {
    if (isOpen) {
      setCarton(stock?.carton_quantity ?? 0);
      setPack(stock?.pack_quantity ?? 0);
    }
  }, [isOpen, stock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carton < 1 && pack < 1 && !stock) return alert("Lengkapi semua data");
    onSave({
      ...stock,
      carton_quantity: carton,
      pack_quantity: pack,
    });
    setCarton(0);
    setPack(0);
    onClose();
  };

  const handleCartonChange = (e) => {
    const value = parseFormattedNumber(e.target.value);
    if (/^\d*$/.test(value)) {
      setCarton(Number(value));
    }
  };

  const handlePackChange = (e) => {
    const value = parseFormattedNumber(e.target.value);
    if (/^\d*$/.test(value)) {
      setPack(Number(value));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        <h2>Edit Stok Produk</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="kodeProduk">Kode Produk</label>
            <input
              type="text"
              id="kodeProduk"
              defaultValue={stock?.product_code ?? ""}
              disabled={true}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="namaProduk">Nama Produk</label>
            <input
              type="text"
              id="namaProduk"
              defaultValue={stock?.product_name ?? ""}
              disabled={true}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="kp">KP</label>
            <input
              type="text"
              id="kp"
              defaultValue={stock?.supplier_name ?? ""}
              disabled={true}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ukuranPack">Ukuran Pack</label>
            <input
              type="text"
              id="ukuranPack"
              defaultValue={stock?.packing ?? ""}
              disabled={true}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="karton">Kuantitas Karton </label>
            <div className={styles.quantityInput}>
              <input
                type="text"
                id="karton"
                value={formatNumberWithDot(carton)}
                onChange={handleCartonChange}
              />
              <label htmlFor="sisaKarton">{`stok tersedia ${formatNumberWithDot(
                cartonQuantity
              )}`}</label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pack">Kuantitas Pack </label>
            <div className={styles.quantityInput}>
              <input
                type="text"
                id="pack"
                value={formatNumberWithDot(pack)}
                onChange={handlePackChange}
              />
              <label htmlFor="sisaKarton">{`stok tersedia ${formatNumberWithDot(
                packQuantity
              )}`}</label>
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className={styles.saveBtn}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStockModal;
