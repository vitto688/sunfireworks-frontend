import React, { useState } from "react";

// Import styles
import styles from "./style.module.scss";

// Import components
import SearchBar from "../SearchBar";

const ItemSearchDialog = ({
  title = "Cari",
  data = [],
  isOpen,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState("");

  const filtered = data.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.code.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>{title}</h2>
        <SearchBar
          type="text"
          placeholder="Cari berdasarkan nama atau kode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.resultList}>
          {filtered.map((product) => (
            <div
              key={product.code}
              className={styles.productItem}
              onClick={() => {
                onSelect(product);
                onClose();
              }}
            >
              <div className={styles.productHeader}>
                <div className={styles.productCode}>{product.code}</div>
                <div className={styles.productName}>{product.name}</div>
              </div>

              <div className={styles.productDetails}>
                {product.gudang && (
                  <div className={styles.productInfo}>
                    <span className={styles.label}>Gudang:</span>
                    <span className={styles.value}>
                      {product.gudang || product.warehouse || "-"}
                    </span>
                  </div>
                )}
                {product.pelanggan && (
                  <div className={styles.productInfo}>
                    <span className={styles.label}>Pelanggan:</span>
                    <span className={styles.value}>
                      {product.pelanggan || "-"}
                    </span>
                  </div>
                )}
                {product.supplierName && product.packing && (
                  <div className={styles.productQuantity}>
                    <div className={styles.quantityItem}>
                      <span className={styles.label}>KP:</span>
                      <span className={styles.value}>
                        {product.supplierName || ""}
                      </span>
                    </div>
                    <div className={styles.quantityItem}>
                      <span className={styles.label}>Pack:</span>
                      <span className={styles.value}>
                        {product.packing || ""}
                      </span>
                    </div>
                    <div className={styles.quantityItem}>
                      <span className={styles.label}>Karton:</span>
                      <span className={styles.value}>
                        {product.cartonQuantity || 0}
                      </span>
                    </div>
                    <div className={styles.quantityItem}>
                      <span className={styles.label}>Pack:</span>
                      <span className={styles.value}>
                        {product.packQuantity || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={styles.empty}>Tidak ditemukan</div>
          )}
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ItemSearchDialog;
