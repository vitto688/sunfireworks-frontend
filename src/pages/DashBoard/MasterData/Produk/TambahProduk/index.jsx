import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  addProductRequest,
  resetMasterMessages,
} from "../../../../../redux/actions/masterActions";

// Import components
import InputField from "../../../../../components/InputField";
// import SelectField from "../../../../../components/SelectField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";
import SearchField from "../../../../../components/SearchField";

// Define the path for the Add Product page
export const TAMBAH_PRODUK_PATH = "/master-data/produk/tambah-produk";

const TambahProduk = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [kodeProduk, setKodeProduk] = useState("");
  // const [barcode, setBarcode] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [kategori, setKategori] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [kemasan, setKemasan] = useState("");
  // const [kuantitas, setKuantitas] = useState("");
  // const [gudang, setGudang] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const { categories, suppliers, loading, message, errorMessage, errorCode } =
    useSelector((state) => state.master);

  useEffect(() => {
    dispatch(resetMasterMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetMasterMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  useEffect(() => {
    // Check if all input fields are filled
    setIsFilled(
      kodeProduk.trim() !== "" &&
        namaProduk.trim() !== "" &&
        (kategori?.name ?? "") !== "" &&
        (supplier?.name ?? "") !== "" &&
        kemasan.trim() !== ""
    );
  }, [kodeProduk, namaProduk, kategori, supplier, kemasan]);
  //#endregion

  //#region Handlers

  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin menambah produk ini?")) {
      dispatch(
        addProductRequest({
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
        <CustomButton
          label="Simpan"
          onClick={handleSimpanClick}
          inactive={!isFilled}
        />
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
        {/* <InputField
          label="Barcode"
          type="text"
          id="barcode"
          name="barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        /> */}
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
          data={suppliers.map((supplier) => ({
            id: supplier.id,
            name: supplier.name,
          }))}
          onChange={(supplier) => setSupplier(supplier)}
        />
        <InputField
          label="Kemasan"
          type="text"
          id="kemasan"
          name="kemasan"
          value={kemasan}
          onChange={(e) => setKemasan(e.target.value)}
        />

        {/* <InputField
          label="Kuantitas"
          type="text"
          id="kuantitas"
          name="kuantitas"
          value={kuantitas}
          onChange={(e) => setKuantitas(e.target.value)}
        /> */}
        {/* <SelectField
          label="Gudang"
          name="gudang"
          value={gudang}
          onChange={(e) => setGudang(e.target.value)}
          options={warehouseOptions}
        /> */}
      </div>
      {loading.products && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default TambahProduk;
