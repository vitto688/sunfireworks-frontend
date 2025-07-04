import React, { useState } from "react";
import { X } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

// Import components
import SearchField from "../SearchField";

const AddStockModal = ({ stocks, isOpen, onClose, onSave }) => {
  const [carton, setCarton] = useState(0);
  const [pack, setPack] = useState(0);
  const [packSize, setPackSize] = useState("");
  const [stock, setStock] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carton < 1 && pack < 1 && packSize === "" && !stock)
      return alert("Lengkapi semua data");
    onSave({ carton, pack, stock, packSize });
    setCarton(0);
    setPack(0);
    setStock(null);
    setPackSize("");
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
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
          <h2>Tambah Stok Produk</h2>
        </div>
        
        <div className={styles.modalBody}>
          <SearchField
            title="Cari Stok"
            label="Cari Stok"
            type="text"
            id="stok"
            name="stok"
            data={stocks.map((stock) => ({
              id: stock.id,
              name: stock.product_name,
            }))}
            onChange={(stock) => setStock(stocks.find((s) => s.id === stock.id))}
          />
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
              <label htmlFor="packSize">Ukuran Pack</label>
              <input
                type="text"
                id="packSize"
                value={packSize}
                onChange={(e) => setPackSize(e.target.value)}
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
                  stock?.carton_quantity ?? 0
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
                  stock?.pack_quantity ?? 0
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
    </div>
  );
};

export default AddStockModal;
