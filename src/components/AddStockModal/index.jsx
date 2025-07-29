import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

// Import components
import SearchField from "../SearchField";

// Import utility functions
import {
  formatNumberWithDot,
  parseFormattedNumber,
} from "../../utils/numberUtils";

const AddStockModal = ({
  defaultStock = null,
  defaultCarton = 0,
  defaultPack = 0,
  isEdit = false,
  stocks,
  isOpen,
  onClose,
  onSave,
}) => {
  const [carton, setCarton] = useState(0);
  const [pack, setPack] = useState(0);
  const [cartonLeft, setCartonLeft] = useState(0);
  const [packLeft, setPackLeft] = useState(0);
  const [stock, setStock] = useState(defaultStock);

  // Set default values when modal opens or defaults change
  useEffect(() => {
    if (isOpen) {
      setStock(defaultStock);
      setCarton(defaultStock?.carton_quantity ?? 0);
      setPack(defaultStock?.pack_quantity ?? 0);
      setCartonLeft(defaultCarton);
      setPackLeft(defaultPack);
    }
  }, [isOpen, defaultStock, defaultCarton, defaultPack]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carton < 1 && pack < 1 && !stock) return alert("Lengkapi semua data");
    onSave({
      ...stock,
      carton_quantity: carton,
      pack_quantity: pack,
    });
    setCarton(defaultStock?.carton_quantity ?? 0);
    setPack(defaultStock?.pack_quantity ?? 0);
    setStock(defaultStock);
    setCartonLeft(defaultCarton);
    setPackLeft(defaultPack);
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
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
          <h2>{isEdit ? "Edit" : "Tambah"} Stok Produk</h2>
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
              code: stock.product_code,
              name: stock.product_name,
              gudang: stock.warehouse_name,
              packQuantity: null,
              cartonQuantity: null,
              packing: stock.packing,
              supplierName: stock.supplier_name,
            }))}
            defaultValue={
              defaultStock
                ? {
                    id: defaultStock.id,
                    code: defaultStock.product_code,
                    name: defaultStock.product_name,
                    gudang: defaultStock.warehouse_name,
                    packQuantity: defaultStock.pack_quantity,
                    cartonQuantity: defaultStock.carton_quantity,
                    packing: defaultStock.packing,
                    supplierName: defaultStock.supplier_name,
                  }
                : null
            }
            onChange={(selectedStock) => {
              const selected = stocks.find((s) => s.id === selectedStock.id);
              setStock(selected);
              setCartonLeft(selected?.carton_quantity ?? 0);
              setPackLeft(selected?.pack_quantity ?? 0);
            }}
          />
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
              <label htmlFor="packSize">Packing</label>
              <input
                type="text"
                id="packSize"
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
                {stock?.carton_quantity !== null && (
                  <label htmlFor="sisaKarton">{`stok tersedia ${formatNumberWithDot(
                    cartonLeft
                  )}`}</label>
                )}
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
                {stock?.pack_quantity !== null && (
                  <label htmlFor="sisaKarton">{`stok tersedia ${formatNumberWithDot(
                    packLeft
                  )}`}</label>
                )}
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
