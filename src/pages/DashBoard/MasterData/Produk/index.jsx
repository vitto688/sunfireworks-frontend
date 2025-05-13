import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import { TAMBAH_PRODUK_PATH } from "./TambahProduk";
import { UBAH_PRODUK_PATH } from "./UbahProduk";
import FilterDropdown from "../../../../components/FilterDropdown";

// import actions
import { fetchProductsRequest } from "../../../../redux/actions/masterActions";

export const PRODUK_PATH = "/master-data/produk";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
];

const Produk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { products } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch products data from API or state management
    // For now, we are using dummy data
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleFindClick = () => {
    console.log("Product added!");
    navigate(TAMBAH_PRODUK_PATH);
  };

  const handleAddClick = () => {
    console.log("Product added!");
    navigate(TAMBAH_PRODUK_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
    console.log("Product deleted!", value);
  };

  const handleItemClick = (value) => {
    console.log("value", value);
    navigate(UBAH_PRODUK_PATH, { state: value });
  };

  return (
    <div className={styles.productSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          // variant="outline"
          label="+ Tambah"
          onClick={handleAddClick}
        />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        >
          {/* <CustomButton label="Cari" onClick={handleFindClick} /> */}
        </SearchBar>
        <div className={styles.filterSection}>
          <FilterDropdown
            options={filterOptions}
            onChange={(val) => console.log(val)}
          />

          <FilterDropdown
            options={filterOptions}
            onChange={(val) => console.log(val)}
          />
          <FilterDropdown
            options={filterOptions}
            onChange={(val) => console.log(val)}
          />
        </div>
      </div>

      <div className={styles.productsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Barcode</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Kategori</div>
          <div className={styles.tableHeaderItem}>Supplier</div>
          <div className={styles.tableHeaderItem}>Kemasan</div>
          <div className={styles.tableHeaderItem}>Kuantitas</div>
          <div className={styles.tableHeaderItem}>Gudang</div>
        </div>
        <div className={styles.tableBody}>
          {products.map((product, index) => (
            <div
              role="presentation"
              key={product.product_code}
              className={styles.tableRow}
              onClick={() => handleItemClick(product)}
            >
              <CustomDeleteButton onClick={() => setModalOpen((old) => !old)} />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{product.product_code}</div>
              <div className={styles.tableRowItem}>{product.barcode}</div>
              <div className={styles.tableRowItem}>{product.product_name}</div>
              <div className={styles.tableRowItem}>{product.category}</div>
              <div className={styles.tableRowItem}>{product.supplier_name}</div>
              <div className={styles.tableRowItem}>{product.packing}</div>
              <div className={styles.tableRowItem}>{product.quantity}</div>
              <div className={styles.tableRowItem}>
                {product.warehouse_name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus produk ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default Produk;
