import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";

export const UBAH_GUDANG_PATH = "/master-data/ubah-gudang";

const UbahGudang = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gudang = location.state || {};

  const [nama, setNama] = useState(gudang?.nama_gudang ?? "");
  const [alamat, setAlamat] = useState(gudang?.alamat ?? "");

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

export default UbahGudang;
