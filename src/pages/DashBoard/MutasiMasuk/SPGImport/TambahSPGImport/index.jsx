/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../../components/CustomButton";
import InputField from "../../../../../components/InputField";
import AddStockButton from "../../../../../components/AddStockButton";
import SearchField from "../../../../../components/SearchField";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditButton from "../../../../../components/EditButton";
import AddStockModalImport from "../../../../../components/AddStockModalImport";
import EditStockModalImport from "../../../../../components/EditStockModalImport";

// Import Redux actions
import {
  addSPGImportRequest,
  resetSPGImportMessages,
} from "../../../../../redux/actions/spgActions";
import { formatNumberWithDot } from "../../../../../utils/numberUtils";

export const TAMBAH_SPGIMPORT_PATH =
  "/mutasi-masuk/spg-import/tambah-spg-import";

const TambahSPGImport = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [gudang, setGudang] = useState("");
  const [noSJ, setNoSJ] = useState("");
  const [noKontainer, setNoKontainer] = useState("");
  const [noKendaraan, setNoKendaraan] = useState("");
  const [mulaiBongkar, setMulaiBongkar] = useState(""); // type date time
  const [selesaiBongkar, setSelesaiBongkar] = useState(""); // type date time
  const [stok, setStok] = useState([]);
  const [totalCarton, setTotalCarton] = useState(0);
  const [totalPack, setTotalPack] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { import: importData } = useSelector((state) => state.spg);
  const { loading, message, errorMessage, errorCode } = importData;
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetSPGImportMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetSPGImportMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetSPGImportMessages());
    }
  }, [message, errorMessage, errorCode, navigate, dispatch]);

  useEffect(() => {
    // Calculate totals whenever stok changes
    const totalCarton = stok.reduce(
      (acc, item) => acc + (item.carton_quantity || 0),
      0
    );
    const totalPack = stok.reduce(
      (acc, item) => acc + (item.pack_quantity || 0),
      0
    );
    setTotalCarton(totalCarton);
    setTotalPack(totalPack);
    setTotalAll(totalCarton + totalPack);
  }, [stok]);

  //#endregion

  //#region Handlers
  const handleSimpanClick = () => {
    // Validate required fields
    if (
      !noSJ ||
      !gudang ||
      !noKontainer ||
      !noKendaraan ||
      !mulaiBongkar ||
      !selesaiBongkar ||
      stok.length === 0
    ) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const spgData = {
      warehouse: gudang.id,
      sj_number: noSJ,
      container_number: noKontainer,
      vehicle_number: noKendaraan,
      start_unload: mulaiBongkar,
      finish_load: selesaiBongkar,
      items: stok.map((item) => ({
        product: item.product || item.id,
        production_code: item.production_code || "",
        packaging_size: item.packaging_size || "",
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
        inn: item.inn || "",
        out: item.out || "",
        pjg: item.pjg || "",
        packaging_weight: item.packaging_weight || "",
        warehouse_size: item.warehouse_size || "",
        warehouse_weight: item.warehouse_weight || "",
      })),
    };

    dispatch(addSPGImportRequest(spgData));
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handleTambahStok = () => {
    // Logic to add stock, e.g., open a modal or navigate to another page

    if (!gudang) {
      alert("Harap pilih gudang terlebih dahulu");
      return;
    }
    setModalOpen(true);

    // navigate(`/mutasi-masuk/retur-penjualan/${argument.code}/tambah-stok`);
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();

    setEditModalOpen(value);
  };

  const handleSaveAddStok = (data) => {
    // Update stok state with new data
    setStok([...stok, data]);
    setModalOpen(false);
    // Kirim ke backend di sini...
  };

  const handleSaveEditStok = (data) => {
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) => (item.id === data.id ? data : item))
    );
    setEditModalOpen(null);
    // Kirim ke backend di sini...
  };

  const handleDeleteStok = (stokItem) => {
    // Update stok state to remove the deleted item
    setStok((prevStok) => prevStok.filter((item) => item.id !== stokItem.id));
    setModalDeleteOpen(null);
    // Kirim ke backend di sini...
  };
  //#endregion

  return (
    <div className={styles.tambahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Batal"
          variant="outline"
          onClick={handleBatalClick}
          disabled={loading}
        />
        <CustomButton
          label={loading ? "Menyimpan..." : "Simpan"}
          onClick={handleSimpanClick}
          disabled={loading}
        />
      </div>
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>Error: {errorMessage}</p>
        </div>
      )}
      <div className={styles.formSection}>
        <div className={styles.row}>
          <InputField
            label="No SJ"
            type="text"
            id="noSuratJalan"
            name="noSuratJalan"
            value={noSJ}
            onChange={(e) => setNoSJ(e.target.value)}
          />
          <InputField
            label="No Kontainer"
            type="text"
            id="noKontainer"
            name="noKontainer"
            value={noKontainer}
            onChange={(e) => setNoKontainer(e.target.value)}
          />
          <InputField
            label="No Kendaraan"
            type="text"
            id="noKendaraan"
            name="noKendaraan"
            value={noKendaraan}
            onChange={(e) => setNoKendaraan(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <InputField
            label="Mulai Bongkar"
            type="text"
            id="mulaiBongkar"
            name="mulaiBongkar"
            value={mulaiBongkar}
            onChange={(e) => setMulaiBongkar(e.target.value)}
          />
          <InputField
            label="Selesai Bongkar"
            type="text"
            id="selesaiBongkar"
            name="selesaiBongkar"
            value={selesaiBongkar}
            onChange={(e) => setSelesaiBongkar(e.target.value)}
          />
          <SearchField
            title="Cari Gudang"
            label="Gudang Tujuan"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            data={warehouses.map((warehouse) => ({
              id: warehouse.id,
              name: warehouse.name,
            }))}
            onChange={(warehouse) => setGudang(warehouse)}
          />
        </div>
      </div>
      <div className={styles.rowBetween}>
        <label className={styles.label} htmlFor="produk">
          Produk
        </label>

        <AddStockButton onClick={() => handleTambahStok()} />
      </div>
      <div className={styles.divider} />
      <div className={styles.stocksTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItem} />
          <div className={styles.tableHeaderItem}>No</div>
          <div className={styles.tableHeaderItem}>Kode Produk</div>
          <div className={styles.tableHeaderItem}>Nama Produk</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
          <div className={styles.tableHeaderItem}>Ukuran Dus</div>
          <div className={styles.tableHeaderItem}>Inn</div>
          <div className={styles.tableHeaderItem}>Out</div>
          <div className={styles.tableHeaderItem}>Pjg</div>
          <div className={styles.tableHeaderItem}>Kg Dus</div>
          <div className={styles.tableHeaderItem}>Ukuran Gudang</div>
          <div className={styles.tableHeaderItem}>Kg Gudang</div>
          <div className={styles.tableHeaderItem}>Kode Produksi</div>
        </div>
        <div className={styles.tableBody}>
          {stok.map((stokItem, index) => (
            <div key={stokItem.product_code} className={styles.tableRow}>
              <CustomDeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDeleteOpen(stokItem);
                }}
              />
              <div className={styles.tableRowItem}>{index + 1}</div>
              <div className={styles.tableRowItem}>{stokItem.product_code}</div>
              <div className={styles.tableRowItem}>{stokItem.product_name}</div>
              <div className={styles.tableRowItem}>{stokItem.packing}</div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.carton_quantity)}
              </div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.pack_quantity)}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.packaging_size}
              </div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.inn)}
              </div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.out)}
              </div>

              <div className={styles.tableRowItem}>{stokItem.pjg}</div>
              <div className={styles.tableRowItem}>
                {stokItem.packaging_weight}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.warehouse_size}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.warehouse_weight}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.production_code}
              </div>
              <div>
                <EditButton onClick={(e) => handleEdit(e, stokItem)} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tableFooter}>
          <div className={styles.total}>Total</div>
          <div className={styles.cartoon}>
            {formatNumberWithDot(totalCarton)}
          </div>
          <div className={styles.pack}>{formatNumberWithDot(totalPack)}</div>
          <div className={styles.all}>{formatNumberWithDot(totalAll)}</div>
        </div>
      </div>

      <AddStockModalImport
        stocks={stocks.filter((stock) => stock.warehouse === gudang.id)}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
      />

      <EditStockModalImport
        stocks={stocks}
        stock={editModalOpen}
        isOpen={editModalOpen !== null}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
      />

      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus item ini?"
        open={modalDeleteOpen !== null}
        onClose={(e) => {
          e.stopPropagation();
          setModalDeleteOpen(null);
        }}
        onConfirm={() => handleDeleteStok(modalDeleteOpen)}
      />
    </div>
  );
};

export default TambahSPGImport;
