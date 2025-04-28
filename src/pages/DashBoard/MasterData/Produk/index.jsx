import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_PRODUK_PATH } from "./TambahProduk";

// import actions
import { fetchProductsRequest } from "../../../../redux/actions/masterActions";

export const PRODUK_PATH = "/master-data/produk";

const Produk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { products } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch products data from API or state management
    // For now, we are using dummy data
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleAddClick = () => {
    console.log("Customer added!");
    navigate(TAMBAH_PRODUK_PATH);
  };

  console.log("products", products);

  return (
    <div className={styles.productSection}>
      <SearchBar
        type="text"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >
        <CustomButton label="Tambah" onClick={handleAddClick} />
      </SearchBar>
      <div className={styles.productsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderNo}>No</div>
          <div className={styles.tableHeaderKode}>Kode Produk</div>
          <div className={styles.tableHeaderBarcode}>Barcode</div>
          <div className={styles.tableHeaderNama}>Nama Produk</div>
          <div className={styles.tableHeaderKategori}>Kategori</div>
          <div className={styles.tableHeaderSupplier}>Supplier</div>
          <div className={styles.tableHeaderKemasan}>Kemasan</div>
          <div className={styles.tableHeaderKemasan}>Kuantitas</div>
          <div className={styles.tableHeaderKemasan}>Gudang</div>
        </div>
        <div className={styles.tableBody}>
          {products.map((product, index) => (
            <div key={product.product_code} className={styles.tableRow}>
              <div className={styles.tableRowNo}>{index + 1}</div>
              <div className={styles.tableRowKode}>{product.product_code}</div>
              <div className={styles.tableRowBarcode}>{product.barcode}</div>
              <div className={styles.tableRowNama}>{product.product_name}</div>
              <div className={styles.tableRowKategori}>{product.category}</div>
              <div className={styles.tableRowSupplier}>
                {product.supplier_name}
              </div>
              <div className={styles.tableRowKemasan}>{product.packing}</div>
              <div className={styles.tableRowKemasan}>{product.quantity}</div>
              <div className={styles.tableRowKemasan}>
                {product.warehouse_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Produk;
