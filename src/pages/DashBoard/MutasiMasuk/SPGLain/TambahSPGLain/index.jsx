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
import AddStockModal from "../../../../../components/AddStockModal";
import SearchField from "../../../../../components/SearchField";
import DatePicker from "../../../../../components/DatePicker";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditStockModal from "../../../../../components/EditStockModal";
import EditButton from "../../../../../components/EditButton";

// Import Redux actions
import {
  addSPGLainRequest,
  resetSPGLainMessages,
} from "../../../../../redux/actions/spgActions";
import { formatNumberWithDot } from "../../../../../utils/numberUtils";

export const TAMBAH_SPG_LAIN_PATH = "/mutasi-masuk/spg-lain/tambah-spg-lain";

const TambahSPGLain = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState("");
  const [gudang, setGudang] = useState("");
  const [noSJ, setNoSJ] = useState("");
  const [tanggal, setTanggal] = useState(() => {
    // Set default to today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [stok, setStok] = useState([]);
  const [warehouseStock, setWarehouseStock] = useState(null);
  const [totalCarton, setTotalCarton] = useState(0);
  const [totalPack, setTotalPack] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { lain } = useSelector((state) => state.spg);
  const { loading, message, errorMessage, errorCode } = lain;
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetSPGLainMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetSPGLainMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetSPGLainMessages());
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
    if (!gudang || stok.length === 0) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const spgData = {
      warehouse: gudang.id,
      sj_number: noSJ,
      notes: keterangan,
      transaction_date: tanggal,
      items: stok.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    dispatch(addSPGLainRequest(spgData));
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
    setWarehouseStock(
      stocks.find(
        (s) => s.warehouse === gudang?.id && s.product === value?.product
      ) || null
    );
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
      prevStok.map((item) =>
        item.product_code === data.product_code ? data : item
      )
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

          <DatePicker
            isInput={true}
            label="Tanggal Transaksi"
            value={tanggal}
            onChange={setTanggal}
            required
          />
        </div>
        <div className={styles.row}>
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
          <InputField
            label="Keterangan"
            type="text"
            id="keterangan"
            name="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
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
          <div className={styles.tableHeaderItem}>KP</div>
          <div className={styles.tableHeaderItem}>Packing</div>
          <div className={styles.tableHeaderItem}>Karton</div>
          <div className={styles.tableHeaderItem}>Pack</div>
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
              <div className={styles.tableRowItem}>
                {stokItem.supplier_name}
              </div>
              <div className={styles.tableRowItem}>{stokItem.packing}</div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.carton_quantity)}
              </div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.pack_quantity)}
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

      <AddStockModal
        stocks={stocks.filter((stock) => stock.warehouse === gudang?.id)}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
      />
      <AddStockModal
        isEdit={true}
        stocks={stocks.filter((stock) => stock.warehouse === gudang?.id)}
        cartonQuantity={totalCarton}
        isOpen={editModalOpen !== null}
        defaultStock={editModalOpen}
        defaultCarton={warehouseStock?.carton_quantity ?? 0}
        defaultPack={warehouseStock?.pack_quantity ?? 0}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
      />
      {/* <EditStockModal
        stocks={stocks}
        stock={editModalOpen}
        isOpen={editModalOpen !== null}
        onClose={() => setEditModalOpen(null)}
        onSave={handleSaveEditStok}
      /> */}

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

export default TambahSPGLain;
