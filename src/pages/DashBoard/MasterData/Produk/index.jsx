import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./style.module.scss";

// import actions
import {
  deleteProductRequest,
  fetchProductsRequest,
  resetMasterMessages,
} from "../../../../redux/actions/masterActions";

// import components
import SearchBar from "../../../../components/SearchBar";
import CustomButton from "../../../../components/CustomButton";
import CustomDeleteButton from "../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import { TAMBAH_PRODUK_PATH } from "./TambahProduk";
import { UBAH_PRODUK_PATH } from "./UbahProduk";
import Loading from "../../../../components/Loading";
import FilterDropdown from "../../../../components/FilterDropdown";
import EditButton from "../../../../components/EditButton";
import { UBAH_STOK_PRODUK_PATH } from "./UbahStokProduk";
// import FilterDropdown from "../../../../components/FilterDropdown";

export const PRODUK_PATH = "/master-data/produk";

const Produk = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [produk, setProduk] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryFilterOptions, setCategoryFilterOptions] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(0);
  const [supplierFilterOptions, setSupplierFilterOptions] = useState([]);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState(0);

  const {
    products,
    categories,
    suppliers,
    loading,
    message,
    errorMessage,
    errorCode,
  } = useSelector((state) => state.master);

  useEffect(() => {
    // Fetch products data from API or state management
    // For now, we are using dummy data
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  // Filter products based on the search query
  useEffect(() => {
    const filteredProducts = filteredData.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.code.toLowerCase().includes(query.toLowerCase())
    );
    setProduk(filteredProducts);
  }, [query, filteredData]);

  // Filter categories
  useEffect(() => {
    if (categories.length > 0) {
      const options = [
        { label: "Semua Kategori", value: 0 },
        ...categories.map((category) => ({
          label: category.name,
          value: category.id,
        })),
      ];
      setCategoryFilterOptions(options);
    }
  }, [categories]);

  useEffect(() => {
    if (suppliers.length > 0) {
      const options = [
        { label: "Semua Eksportir", value: 0 },
        ...suppliers.map((supplier) => ({
          label: supplier.name,
          value: supplier.id,
        })),
      ];
      setSupplierFilterOptions(options);
    }
  }, [suppliers]);

  useEffect(() => {
    if (selectedCategoryFilter === 0 && selectedSupplierFilter === 0) {
      setFilteredData(products);
    } else if (selectedCategoryFilter !== 0 && selectedSupplierFilter === 0) {
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategoryFilter
      );
      setFilteredData(filteredProducts);
    } else if (selectedCategoryFilter === 0 && selectedSupplierFilter !== 0) {
      const filteredProducts = products.filter(
        (product) => product.supplier === selectedSupplierFilter
      );
      setFilteredData(filteredProducts);
    } else {
      const filteredProducts = products.filter(
        (product) =>
          product.category === selectedCategoryFilter &&
          product.supplier === selectedSupplierFilter
      );
      setFilteredData(filteredProducts);
    }
  }, [selectedCategoryFilter, selectedSupplierFilter, products]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      setModalOpen(null);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
    dispatch(resetMasterMessages());
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Handlers
  const handleAddClick = () => {
    navigate(TAMBAH_PRODUK_PATH);
  };

  const handleItemClick = (value) => {
    navigate(UBAH_PRODUK_PATH, { state: value });
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();

    navigate(UBAH_STOK_PRODUK_PATH, { state: value });
  };

  //#endregion

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
        ></SearchBar>
        <div className={styles.filterSection}>
          <FilterDropdown
            options={categoryFilterOptions}
            placeholder="Filter Kategori"
            onChange={(val) => setSelectedCategoryFilter(val.value)}
          />
          <FilterDropdown
            options={supplierFilterOptions}
            placeholder="Filter Eksportir"
            onChange={(val) => setSelectedSupplierFilter(val.value)}
          />
        </div>
      </div>

      <div className={styles.productsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          {/* <div className={styles.tableHeaderItem}>Barcode</div> */}
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>KP</div>
          <div className={styles.tableHeaderItem}>Kategori</div>
          <div className={styles.tableHeaderItem}>Stok Global</div>
          {/* <div className={styles.tableHeaderItem}>Kuantitas</div>
          <div className={styles.tableHeaderItem}>Gudang</div> */}
        </div>
        <div className={styles.tableBody}>
          {produk.map((product, index) => (
            <div
              role="presentation"
              key={product.product_code}
              className={styles.tableRow}
              onClick={() => handleItemClick(product)}
            >
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(product);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{product.code}</div>
              {/* <div className={styles.tableRowItem}>{product.barcode}</div> */}
              <div className={styles.tableRowItem}>{product.name}</div>
              <div className={styles.tableRowItem}>{product.packing}</div>
              <div className={styles.tableRowItem}>{product.supplier_name}</div>
              <div className={styles.tableRowItem}>{product.category_name}</div>
              <div>
                <EditButton onClick={(e) => handleEdit(e, product)} />
              </div>

              {/* <div className={styles.tableRowItem}>{product.quantity}</div>
              <div className={styles.tableRowItem}>
                {product.warehouse_name}
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus produk ini?"
        open={modalOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalOpen(null);
        }}
        onConfirm={() => dispatch(deleteProductRequest({ id: modalOpen.id }))}
      />
      {loading.products && (
        <Loading message="Sedang memproses data, mohon tunggu..." />
      )}
    </div>
  );
};

export default Produk;
