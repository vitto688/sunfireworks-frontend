import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import components
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import CustomButton from "../../../../components/CustomButton";

// Define the path for the Edit User page
export const EDIT_PENGGUNA_PATH = "/edit-pengguna";

const EditPengguna = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Ambil dari API
  const roleOptions = [
    { label: "Owner", value: "owner" },
    { label: "Finance", value: "finance" },
    { label: "Warehouse", value: "warehouse" },
  ];

  const handleSimpanClick = () => {
    console.log("Customer save!");
  };

  const handleBatalClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.editPenggunaSection}>
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
          label="Nama Pengguna"
          type="text"
          id="nama"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Nomor Telepon"
          type="text"
          id="nomorTelepon"
          name="nomorTelepon"
          value={nomorTelepon}
          onChange={(e) => setNomorTelepon(e.target.value)}
        />
        <SelectField
          label="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={roleOptions}
        />
      </div>
    </div>
  );
};

export default EditPengguna;
