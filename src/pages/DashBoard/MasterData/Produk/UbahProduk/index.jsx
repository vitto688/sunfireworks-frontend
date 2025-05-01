import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import SelectField from "../../../../../components/SelectField";
import CustomButton from "../../../../../components/CustomButton";

// Define the path for the Add Product page
export const UBAH_PRODUK_PATH = "/master-data/ubah-produk";

const UbahProduk = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const produk = location.state || {};

  const [kodeProduk, setKodeProduk] = useState(produk?.product_code ?? "");
  const [barcode, setBarcode] = useState(produk?.barcode ?? "");
  const [namaProduk, setNamaProduk] = useState(produk?.product_name ?? "");
  const [kategori, setKategori] = useState(produk?.category ?? "");
  const [supplier, setSupplier] = useState(produk?.supplier_name ?? "");
  const [kemasan, setKemasan] = useState(produk?.packing ?? "");
  const [kuantitas, setKuantitas] = useState(produk?.quantity ?? "");
  const [gudang, setGudang] = useState(produk?.warehouse_name ?? "");

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
          inactive={true}
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

export default UbahProduk;
