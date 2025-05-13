import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";

// Define the path for the Add Customer page
export const UBAH_PELANGGAN_PATH = "/master-data/pelanggan/ubah-pelanggan";

const UbahPelanggan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pelanggan = location.state || {};

  const [kodePelanggan, setKodePelanggan] = useState(
    pelanggan?.kode_pelanggan ?? ""
  );
  const [nama, setNama] = useState(pelanggan?.nama_pelanggan ?? "");
  const [alamat, setAlamat] = useState(pelanggan?.alamat_pelanggan ?? "");
  const [email, setEmail] = useState(pelanggan?.telp_pelanggan ?? "");
  const [noTel, setNoTel] = useState(pelanggan?.email_pelanggan ?? "");

  const handleSimpanClick = () => {
    console.log("Customer save!");
  };

  const handleBatalClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.addCustomerSection}>
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
          label="Kode Pelanggan"
          type="text"
          id="kodePelanggan"
          name="kodePelanggan"
          value={kodePelanggan}
          onChange={(e) => setKodePelanggan(e.target.value)}
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

export default UbahPelanggan;
