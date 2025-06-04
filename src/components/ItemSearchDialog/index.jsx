import React, { useState } from "react";

// Import styles
import styles from "./style.module.scss";

// Import components
import SearchBar from "../SearchBar";

// const dummyProducts = [
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
//   { code: "P001", name: "Kembang Api A" },
//   { code: "P002", name: "Kembang Api B" },
//   { code: "P003", name: "Kembang Api C" },
// ];

const ItemSearchDialog = ({
  title = "Cari",
  data = [],
  isOpen,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState("");

  const filtered = data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>{title}</h2>
        <SearchBar
          type="text"
          placeholder="Cari kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className={styles.resultList}>
          {filtered.map((product) => (
            <li
              key={product.code}
              onClick={() => {
                onSelect(product);
                onClose();
              }}
            >
              {product.name}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className={styles.empty}>Tidak ditemukan</li>
          )}
        </ul>
        <button className={styles.closeBtn} onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ItemSearchDialog;
