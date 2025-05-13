import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_KATEGORI_PATH } from "./TambahKategoriProduk";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import { UBAH_KATEGORI_PATH } from "./UbahKategoriProduk";

// import actions
import { fetchCategoriesRequest } from "../../../../redux/actions/masterActions";

export const KATEGORI_PRODUK_PATH = "/master-data/kategori-produk";

const KategoriProduk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { categories } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch categories data from API or state management
    // For now, we are using dummy data
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleFindClick = () => {
    console.log("Cateogry added!");
    navigate(TAMBAH_KATEGORI_PATH);
  };

  const handleAddClick = () => {
    console.log("Cateogry added!");
    navigate(TAMBAH_KATEGORI_PATH);
  };

  const handleDelete = (value) => {
    setModalOpen((old) => !old);
    console.log("Product deleted!", value);
  };

  const handleItemClick = (value) => {
    console.log("value", value);
    navigate(UBAH_KATEGORI_PATH, { state: value });
  };

  return (
    <div className={styles.categoriesSection}>
      <SearchBar
        type="text"
        placeholder="Cari kategori..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >
        <CustomButton label="Cari" onClick={handleFindClick} />
        <CustomButton
          variant="outline"
          label="Tambah"
          onClick={handleAddClick}
        />
      </SearchBar>
      <div className={styles.categoriesTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Nama Kategori</div>
        </div>
        <div className={styles.tableBody}>
          {categories.map((category, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(category)}
            >
              <CustomDeleteButton onClick={() => setModalOpen((old) => !old)} />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>
                {category.nama_kategori}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus kategori ini?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete("test")}
      />
    </div>
  );
};

export default KategoriProduk;
