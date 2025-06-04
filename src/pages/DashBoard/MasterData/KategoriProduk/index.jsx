import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import styles
import styles from "./style.module.scss";

// import actions
import {
  deleteCategoryRequest,
  fetchCategoriesRequest,
  resetMasterMessages,
} from "../../../../redux/actions/masterActions";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import { TAMBAH_KATEGORI_PATH } from "./TambahKategoriProduk";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import { UBAH_KATEGORI_PATH } from "./UbahKategoriProduk";
import Loading from "../../../../components/Loading";

export const KATEGORI_PRODUK_PATH = "/master-data/kategori-produk";

const KategoriProduk = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [kategori, setKategori] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(null);

  const { categories, loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    // Fetch categories data from API or state management
    // For now, we are using dummy data
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  // Filter categories based on the search query
  useEffect(() => {
    const filteredCateogries = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setKategori(filteredCateogries);
  }, [query, categories]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      setModalOpen(null);

      dispatch(resetMasterMessages());
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Handlers

  const handleAddClick = () => {
    navigate(TAMBAH_KATEGORI_PATH);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_KATEGORI_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.actionsSection}>
        <CustomButton label="+ Tambah" onClick={handleAddClick} />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari kategori..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.filterSection}>
          {/* <FilterDropdown
            options={filterOptions}
            placeholder="Filter role"
            onChange={(val) => setSelectedFilter(val.value)}
          />
          <FilterDropdown
            options={filterOptionsActive}
            placeholder="Filter pengguna aktif"
            onChange={(val) => setSelectedActiveFilter(val.value)}
          /> */}
        </div>
      </div>
      <div className={styles.categoriesTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Nama Kategori</div>
        </div>
        <div className={styles.tableBody}>
          {kategori.map((category, index) => (
            <div
              role="presentation"
              key={index}
              className={styles.tableRow}
              onClick={() => handleItemClick(category)}
            >
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(category);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{category.name}</div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus kategori ini?"
        open={modalOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalOpen(null);
        }}
        onConfirm={() => dispatch(deleteCategoryRequest({ id: modalOpen.id }))}
      />

      {loading.categories && (
        <Loading message="Sedamg memproses data, mohon tunggu..." />
      )}
    </div>
  );
};

export default KategoriProduk;
