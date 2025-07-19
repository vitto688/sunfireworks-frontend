import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// Import styles
import styles from "./style.module.scss";

// Import components

const EditStockModalImport = ({
  stocks = [],
  stock,
  isOpen,
  onClose,
  onSave,
}) => {
  const [carton, setCarton] = useState(stock?.carton_quantity ?? 0);
  const [pack, setPack] = useState(stock?.pack_quantity ?? 0);
  const [packSize, setPackSize] = useState(stock?.packaging_size ?? "");
  const [inn, setInn] = useState(stock?.inn ?? "");
  const [out, setOut] = useState(stock?.out ?? "");
  const [pjg, setPjg] = useState(stock?.pjg ?? "");
  const [packWeight, setPackWeight] = useState(stock?.packaging_weight ?? "");
  const [warehouseSize, setWarehouseSize] = useState(
    stock?.warehouse_size ?? ""
  );
  const [warehouseWeight, setWarehouseWeight] = useState(
    stock?.warehouse_weight ?? ""
  );
  const [productionCode, setProductionCode] = useState(
    stock?.production_code ?? ""
  );
  console.log("stock, stocks:", stock, stocks);

  const warehouseStock = stocks.find((s) => s.id === stock?.id);

  useEffect(() => {
    if (isOpen) {
      setCarton(stock?.carton_quantity ?? 0);
      setPack(stock?.pack_quantity ?? 0);
      setPackSize(stock?.packaging_size ?? "");
      setInn(stock?.inn ?? "");
      setOut(stock?.out ?? "");
      setPjg(stock?.pjg ?? "");
      setPackWeight(stock?.packaging_weight ?? "");
      setWarehouseSize(stock?.warehouse_size ?? "");
      setWarehouseWeight(stock?.warehouse_weight ?? "");
      setProductionCode(stock?.production_code ?? "");
    }
  }, [isOpen, stock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carton < 1 && pack < 1 && packSize < 1 && !stock)
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
            <label htmlFor="ukuranPack">Ukuran Pack</label>
            <input
              type="text"
              id="ukuranPack"
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
              <label htmlFor="sisaKarton">{`stok tersedia ${
                warehouseStock?.carton_quantity ?? 0
              }`}</label>
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

export default EditStockModalImport;
