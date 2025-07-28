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
  isEdit = false,
  stocks,
  isOpen,
  onClose,
  onSave,
  defaultStock = null,
  defaultCarton = 0,
  defaultPack = 0,
}) => {
  const [carton, setCarton] = useState(defaultCarton);
  const [pack, setPack] = useState(defaultPack);
  // const [packSize, setPackSize] = useState("");
  const [stock, setStock] = useState(defaultStock);

  // Set default values when modal opens or defaults change
  useEffect(() => {
    if (isOpen) {
      setStock(defaultStock);
      setCarton(defaultCarton);
      setPack(defaultPack);
    }
  }, [isOpen, defaultStock, defaultCarton, defaultPack]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carton < 1 && pack < 1 && !stock) return alert("Lengkapi semua data");
    onSave({
      ...stock,
      carton_quantity: carton,
      pack_quantity: pack,
      // packaging_size: packSize,
    });
    setCarton(defaultCarton);
    setPack(defaultPack);
    setStock(defaultStock);
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
            onChange={(selectedStock) =>
              setStock(stocks.find((s) => s.id === selectedStock.id))
            }
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
                    stock?.carton_quantity ?? 0
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
                    stock?.pack_quantity ?? 0
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
