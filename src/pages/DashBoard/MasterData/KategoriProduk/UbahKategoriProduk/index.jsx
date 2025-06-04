import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  resetMasterMessages,
  updateCategoryRequest,
} from "../../../../../redux/actions/masterActions";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";

// Define the path for the Add Category page
export const UBAH_KATEGORI_PATH = "/master-data/kategori-produk/ubah-kategori";

const UbahKategoriProduk = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const category = location.state || {};

  const [namaKategori, setNamaKategori] = useState(category?.name ?? "");

  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

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
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin mengubah kategori ini?")) {
      dispatch(
        updateCategoryRequest({
          id: category.id,
          body: {
            name: namaKategori,
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
    <div className={styles.addCategorySection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
        />
        <CustomButton label="Simpan" onClick={handleSimpanClick} />
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
      {loading.categories && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default UbahKategoriProduk;
