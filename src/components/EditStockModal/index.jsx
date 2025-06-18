import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

// Import components

const EditStockModal = ({ stocks, stock, isOpen, onClose, onSave }) => {
  const [carton, setCarton] = useState(stock?.carton_quantity ?? 0);
  const [pack, setPack] = useState(stock?.pack_quantity ?? 0);

  const warehouseStock = stocks.find((s) => s.id === stock?.id);

  useEffect(() => {
    if (isOpen) {
      setCarton(warehouseStock?.carton_quantity ?? 0);
      setPack(warehouseStock?.pack_quantity ?? 0);
    }
  }, [isOpen, warehouseStock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carton < 1 || pack < 1 || !stock) return alert("Lengkapi semua data");
    onSave({ carton, pack, stock });
    setCarton(0);
    setPack(0);
    onClose();
  };

  const handleCartonChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCarton(Number(value));
    }
  };

  const handlePackChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPack(Number(value));
    }
  };

  if (!isOpen) return null;

  console.log("stocks:", stocks, stock);

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
              value={stock?.product_code ?? ""}
              disabled={true}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="namaProduk">Nama Produk</label>
            <input
              type="text"
              id="namaProduk"
              value={stock?.product_name ?? ""}
              disabled={true}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gudang">Gudang</label>
            <input
              type="text"
              id="gudang"
              value={stock?.warehouse_name ?? ""}
              disabled={true}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="karton">Kuantitas Karton </label>
            <div className={styles.quantityInput}>
              <input
                type="number"
                id="karton"
                value={carton}
                onChange={handleCartonChange}
              />
              <label htmlFor="sisaKarton">{`stok tersedia ${
                warehouseStock?.carton_quantity ?? 0
              }`}</label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pack">Kuantitas Pack </label>
            <div className={styles.quantityInput}>
              <input
                type="number"
                id="pack"
                value={pack}
                onChange={handlePackChange}
              />
              <label htmlFor="sisaKarton">{`stok tersedia ${
                warehouseStock?.pack_quantity ?? 0
              }`}</label>
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
