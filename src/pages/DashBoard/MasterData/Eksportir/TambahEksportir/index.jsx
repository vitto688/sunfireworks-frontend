import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";

export const TAMBAH_EKSPORTIR_PATH = "/master-data/tambah-eksportir";

const TambahEksportir = () => {
  const [kodePrincipal, setKodePrincipal] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [noTel, setNoTel] = useState("");

  const navigate = useNavigate();

  const handleSimpanClick = () => {
    console.log("Supplier save!");
  };

  const handleBatalClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.addSupplierSection}>
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
          label="Kode Principal"
          type="text"
          id="kodePrincipal"
          name="kodePrincipal"
          value={kodePrincipal}
          onChange={(e) => setKodePrincipal(e.target.value)}
        />
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
        <InputField
          label="Email"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Nomor Telepon"
          type="text"
          id="noTel"
          name="noTel"
          value={noTel}
          onChange={(e) => setNoTel(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TambahEksportir;
