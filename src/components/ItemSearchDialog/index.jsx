import React, { useEffect, useState } from "react";

// Import styles
import styles from "./style.module.scss";

// Import components
import SearchBar from "../SearchBar";
import { formatNumberWithDot } from "../../utils/numberUtils";

const ItemSearchDialog = ({
  title = "Cari",
  data = [],
  isOpen,
  onClose,
  onSelect,
  // showStatus = false, // New prop to control status display
}) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Helper function to get status display
  const getStatusDisplay = (item) => {
    if (!item.status) return null;

    return {
      text: item.status,
      className:
        item.status === "Selesai"
          ? styles.statusCompleted
          : styles.statusPending,
    };
  };

  useEffect(() => {
    const results = data.filter(
      (product) =>
        product.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        product.code?.toLowerCase()?.includes(search?.toLowerCase())
    );

    // Remove duplicates dan debug
    // const uniqueResults = results.reduce((acc, current) => {
    //   const isDuplicate = acc.find((item) => item.code === current.code||);
    //   if (!isDuplicate) {
    //     acc.push(current);
    //   }
    //   return acc;
    // }, []);

    // console.log("Unique filtered results:", uniqueResults);
    setFiltered(results);
  }, [data, search]);

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
          {filtered.length > 0 &&
            filtered.map((product, index) => (
              <div
                key={`${product.code}-${index}`}
                className={styles.productItem}
                onClick={() => {
                  onSelect(product);
                  onClose();
                }}
              >
                <div className={styles.productHeader}>
                  <div className={styles.productCode}>{product.code}</div>
                  <div className={styles.productName}>{product.name}</div>
                  {product.status && getStatusDisplay(product) && (
                    <div className={styles.statusContainer}>
                      <span className={getStatusDisplay(product).className}>
                        {getStatusDisplay(product).text}
                      </span>
                    </div>
                  )}
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
                        <span className={styles.label}>Packing:</span>
                        <span className={styles.value}>
                          {product.packing || ""}
                        </span>
                      </div>
                      {product.cartonQuantity !== null && (
                        <div className={styles.quantityItem}>
                          <span className={styles.label}>Karton:</span>
                          <span className={styles.value}>
                            {formatNumberWithDot(product.cartonQuantity || 0)}
                          </span>
                        </div>
                      )}
                      {product.packQuantity !== null && (
                        <div className={styles.quantityItem}>
                          <span className={styles.label}>Pack:</span>
                          <span className={styles.value}>
                            {formatNumberWithDot(product.packQuantity || 0)}
                          </span>
                        </div>
                      )}
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
