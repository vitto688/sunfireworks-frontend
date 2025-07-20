import React, { useState } from "react";
import { X } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

// Import components
import SearchField from "../SearchField";

// Import utility functions
import { formatNumberWithDot } from "../../utils/numberUtils";

const AddStockModalImport = ({ stocks, isOpen, onClose, onSave }) => {
  const [carton, setCarton] = useState(0);
  const [pack, setPack] = useState(0);
  const [packSize, setPackSize] = useState("");
  const [inn, setInn] = useState("");
  const [out, setOut] = useState("");
  const [pjg, setPjg] = useState("");
  const [packWeight, setPackWeight] = useState("");
  const [warehouseSize, setWarehouseSize] = useState("");
  const [warehouseWeight, setWarehouseWeight] = useState("");
  const [productionCode, setProductionCode] = useState("");
  const [stock, setStock] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      carton < 1 &&
      pack < 1 &&
      packSize === "" &&
      productionCode === "" &&
      !stock
    )
      return alert("Lengkapi semua data");
    onSave({
      ...stock,
      carton_quantity: carton,
      pack_quantity: pack,
      packaging_size: packSize,
      inn,
      out,
      pjg,
      packaging_weight: packWeight,
      warehouse_size: warehouseSize,
      warehouse_weight: warehouseWeight,
      production_code: productionCode,
    });
    setCarton(0);
    setPack(0);
    setStock(null);
    setPackSize("");
    setInn("");
    setOut("");
    setPjg("");
    setPackWeight("");
    setWarehouseSize("");
    setWarehouseWeight("");
    setProductionCode("");
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
              code: stock.product_code,
              name: stock.product_name,
              gudang: stock.warehouse_name,
              packQuantity: stock.pack_quantity,
              cartonQuantity: stock.carton_quantity,
            }))}
            onChange={(stock) =>
              setStock(stocks.find((s) => s.id === stock.id))
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
              <label htmlFor="inn">Inn</label>
              <input
                type="text"
                id="inn"
                value={inn}
                onChange={(e) => setInn(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="out">Out</label>
              <input
                type="text"
                id="out"
                value={out}
                onChange={(e) => setOut(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pjg">Panjang</label>
              <input
                type="text"
                id="pjg"
                value={pjg}
                onChange={(e) => setPjg(e.target.value)}
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
              <label htmlFor="packWeight">Berat Pack</label>
              <input
                type="text"
                id="packWeight"
                value={packWeight}
                onChange={(e) => setPackWeight(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="warehouseSize">Ukuran Gudang</label>
              <input
                type="text"
                id="warehouseSize"
                value={warehouseSize}
                onChange={(e) => setWarehouseSize(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="warehouseWeight">Berat Gudang</label>
              <input
                type="text"
                id="warehouseWeight"
                value={warehouseWeight}
                onChange={(e) => setWarehouseWeight(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="productionCode">Kode Produksi</label>
              <input
                type="text"
                id="productionCode"
                value={productionCode}
                onChange={(e) => setProductionCode(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="karton">Kuantitas Karton </label>
              <div className={styles.quantityInput}>
                <input
                  type="text"
                  id="karton"
                  value={carton}
                  onChange={handleCartonChange}
                />
                <label htmlFor="sisaKarton">{`stok tersedia ${formatNumberWithDot(
                  stock?.carton_quantity ?? 0
                )}`}</label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pack">Kuantitas Pack </label>
              <div className={styles.quantityInput}>
                <input
                  type="text"
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

export default AddStockModalImport;
