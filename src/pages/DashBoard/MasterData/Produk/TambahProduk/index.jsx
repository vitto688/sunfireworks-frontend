import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import SelectField from "../../../../../components/SelectField";
import CustomButton from "../../../../../components/CustomButton";

// Define the path for the Add Product page
export const TAMBAH_PRODUK_PATH = "/master-data/tambah-produk";

const TambahProduk = () => {
  const [kodePoruduk, setKodeProduk] = useState("");
  const [barcode, setBarcode] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [kategori, setKategori] = useState("");
  const [supplier, setSupplier] = useState("");
  const [kemasan, setKemasan] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [gudang, setGudang] = useState("");

  const navigate = useNavigate();

  // Ambil dari API
  const warehouseOptions = [
    // { label: "Global", value: "global" },
    { label: "Gudang 1", value: "gudang1" },
    { label: "Gudang 2", value: "gudang2" },
  ];

  const handleSimpanClick = () => {
    console.log("Product save!");
  };

  const handleBatalClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.tambahProdukSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton
          label="Simpan"
          onClick={handleSimpanClick}
          inactive={true}
        />
      </div>
      <div className={styles.formSection}>
        <InputField
          label="Kode Produk"
          type="text"
          id="kodeProduk"
          name="kodeProduk"
          value={kodePoruduk}
          onChange={(e) => setKodeProduk(e.target.value)}
        />
        <InputField
          label="Barcode"
          type="text"
          id="barcode"
          name="barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <InputField
          label="Nama Produk"
          type="text"
          id="namaProduk"
          name="namaProduk"
          value={namaProduk}
          onChange={(e) => setNamaProduk(e.target.value)}
        />
        <InputField
          label="Kategori"
          type="text"
          id="kategori"
          name="kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        />
        <InputField
          label="Supplier"
          type="text"
          id="supplier"
          name="supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <InputField
          label="Kemasan"
          type="text"
          id="kemasan"
          name="kemasan"
          value={kemasan}
          onChange={(e) => setKemasan(e.target.value)}
        />
        <InputField
          label="Kuantitas"
          type="text"
          id="kuantitas"
          name="kuantitas"
          value={kuantitas}
          onChange={(e) => setKuantitas(e.target.value)}
        />
        <SelectField
          label="Gudang"
          name="gudang"
          value={gudang}
          onChange={(e) => setGudang(e.target.value)}
          options={warehouseOptions}
        />
      </div>
    </div>
  );
};

export default TambahProduk;
