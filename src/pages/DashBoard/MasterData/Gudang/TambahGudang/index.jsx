import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";

export const TAMBAH_GUDANG_PATH = "/master-data/gudang/tambah-gudang";

const TambahGudang = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");

  const navigate = useNavigate();

  const handleSimpanClick = () => {
    console.log("Supplier save!");
  };

  const handleBatalClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.addWarehouseSection}>
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
          label="Nama"
          type="text"
          id="nama"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <InputField
          label="Alamat"
          type="text"
          id="alamat"
          name="alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TambahGudang;
