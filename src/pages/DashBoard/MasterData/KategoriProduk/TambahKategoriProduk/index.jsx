import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  addCategoryRequest,
  resetMasterMessages,
} from "../../../../../redux/actions/masterActions";

// Import components
import InputField from "../../../../../components/InputField";
import CustomButton from "../../../../../components/CustomButton";
import Loading from "../../../../../components/Loading";

// Define the path for the Add Category page
export const TAMBAH_KATEGORI_PATH =
  "/master-data/kategori-produk/tambah-kategori";

const TambahKategoriProduk = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [namaKategori, setNamaKategori] = useState("");

  const [isFilled, setIsFilled] = useState(false);

  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    dispatch(resetMasterMessages());
  }, [dispatch]);

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

  useEffect(() => {
    // Check if the input field is filled
    setIsFilled(namaKategori.trim() !== "");
  }, [namaKategori]);
  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    if (window.confirm("Apakah anda yakin ingin menambah kategori ini?")) {
      dispatch(
        addCategoryRequest({
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
        <CustomButton
          label="Simpan"
          onClick={handleSimpanClick}
          inactive={!isFilled}
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
      {loading.categories && (
        <Loading message="Menyimpan data, mohon tunggu..." />
      )}
    </div>
  );
};

export default TambahKategoriProduk;
