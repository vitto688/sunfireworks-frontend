import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";

export const UBAH_EKSPORTIR_PATH = "/master-data/eksportir/ubah-eksportir";

const UbahEksportir = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eksportir = location.state || {};

  const [kodePrincipal, setKodePrincipal] = useState(
    eksportir?.kode_principal ?? ""
  );
  const [nama, setNama] = useState(eksportir?.nama_principal ?? "");
  const [alamat, setAlamat] = useState(eksportir?.alamat_principal ?? "");
  const [email, setEmail] = useState(eksportir?.telp_principal ?? "");
  const [noTel, setNoTel] = useState(eksportir?.email_principal ?? "");

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

export default UbahEksportir;
