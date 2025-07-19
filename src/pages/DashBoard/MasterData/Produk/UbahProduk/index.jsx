import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  resetMasterMessages,
  updateProductRequest,
} from "../../../../../redux/actions/masterActions";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import SearchField from "../../../../../components/SearchField";
import Loading from "../../../../../components/Loading";

// Define the path for the Add Product page
export const UBAH_PRODUK_PATH = "/master-data/produk/ubah-produk";

const UbahProduk = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const produk = location.state || {};

  const { categories, suppliers, loading, message, errorMessage, errorCode } =
    useSelector((state) => state.master);

  const [kodeProduk, setKodeProduk] = useState(produk?.code ?? "");
  // const [barcode, setBarcode] = useState(produk?.barcode ?? "");
  const [namaProduk, setNamaProduk] = useState(produk?.name ?? "");
  const [kategori, setKategori] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [kemasan, setKemasan] = useState(produk?.packing ?? "");
  // const [kuantitas, setKuantitas] = useState(produk?.kuantitas ?? "");
  // const [gudang, setGudang] = useState(produk?.gudang ?? "");

  useEffect(() => {
    const selectedCategory = categories.find(
      (cat) => cat.id === produk.category
    );
    if (selectedCategory) {
      setKategori({ id: selectedCategory.id, name: selectedCategory.name });
    }
    const selectedSupplier = suppliers.find(
      (sup) => sup.id === produk.supplier
    );
    if (selectedSupplier) {
      setSupplier({ id: selectedSupplier.id, name: selectedSupplier.name });
    }
  }, [categories, suppliers, produk.category, produk.supplier]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetMasterMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetMasterMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin mengubah produk ini?")) {
      dispatch(
        updateProductRequest({
          id: produk.id,
          body: {
            code: kodeProduk,
            name: namaProduk,
            category: kategori.id,
            supplier: supplier.id,
            supplier_price: 0,
            packing: kemasan,
          },
        })
      );
    }
  };

  const handleBatalClick = () => {
    dispatch(resetMasterMessages());
    navigate(-1);
  };
  //#endregion

  return (
    <div className={styles.addProductSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton label="Simpan" onClick={handleSimpanClick} />
      </div>
      <div className={styles.formSection}>
        <InputField
          label="Kode Produk"
          type="text"
          id="kodeProduk"
          name="kodeProduk"
          value={kodeProduk}
          onChange={(e) => setKodeProduk(e.target.value)}
        />

        <InputField
          label="Nama Produk"
          type="text"
          id="namaProduk"
          name="namaProduk"
          value={namaProduk}
          onChange={(e) => setNamaProduk(e.target.value)}
        />
        <SearchField
          title="Cari Kategori"
          label="Kategori"
          type="text"
          id="kategori"
          name="kategori"
          defaultValue={{ id: kategori?.id, name: kategori?.name }}
          data={categories.map((category) => ({
            id: category.id,
            name: category.name,
          }))}
          onChange={(category) => setKategori(category)}
        />

        <SearchField
          title="Cari Eksportir"
          label="Eksportir"
          type="text"
          id="eksportir"
          name="eksportir"
          defaultValue={{ id: supplier?.id, name: supplier?.name }}
          data={suppliers.map((supplier) => ({
            id: supplier.id,
            name: supplier.name,
          }))}
          onChange={(supplier) => setSupplier(supplier)}
        />
        <InputField
          label="Packing"
          type="text"
          id="kemasan"
          name="kemasan"
          value={kemasan}
          onChange={(e) => setKemasan(e.target.value)}
        />
      </div>
      {loading.products && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default UbahProduk;
