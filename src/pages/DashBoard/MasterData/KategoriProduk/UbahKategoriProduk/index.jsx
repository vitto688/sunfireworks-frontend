import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";

// Define the path for the Add Category page
export const UBAH_KATEGORI_PATH = "/master-data/kategori-produk/ubah-kategori";

const UbahKategoriProduk = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state || {};

  const [namaKategori, setNamaKategori] = useState(
    category?.nama_kategori ?? ""
  );

  const handleSimpanClick = () => {
    console.log("Category save!");
  };

  const handleBatalClick = () => {
    navigate(-1);
  };
  return (
    <div className={styles.addCategorySection}>
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
          label="Nama Kategori"
          type="text"
          id="namaKategori"
          name="namaKategori"
          value={namaKategori}
          onChange={(e) => setNamaKategori(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UbahKategoriProduk;
