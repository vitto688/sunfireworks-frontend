/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  updateReturPenjualanRequest,
  resetReturPenjualanMessages,
} from "../../../../../redux/actions/returPenjualanActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../../components/CustomButton";
import InputField from "../../../../../components/InputField";
import DatePicker from "../../../../../components/DatePicker";
import AddStockButton from "../../../../../components/AddStockButton";
import AddStockModal from "../../../../../components/AddStockModal";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditButton from "../../../../../components/EditButton";

// Import utility functions
import { printReturPenjualan } from "../../../../../utils/printReturPenjualan";
import { formatNumberWithDot } from "../../../../../utils/numberUtils";
import SearchField from "../../../../../components/SearchField";

export const UBAH_RETUR_PENJUALAN_PATH =
  "/mutasi-masuk/retur-penjualan/ubah-retur-penjualan";

const UbahReturPenjualan = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState("");
  const [gudang, setGudang] = useState(null);
  const [noSJ, setNoSJ] = useState("");
  const [tanggal, setTanggal] = useState("");
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
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.returPenjualan
  );
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetReturPenjualanMessages());
  }, [dispatch]);

  useEffect(() => {
    if (argument?.warehouse) {
      setGudang(warehouses.find((w) => w.id === argument.warehouse) || null);
    }

    if (argument?.notes) {
      setKeterangan(argument.notes);
    }

    if (argument?.sj_number) {
      setNoSJ(argument.sj_number);
    }

    if (argument?.transaction_date) {
      // Convert date to YYYY-MM-DD format for DatePicker
      const date = new Date(argument.transaction_date);
      setTanggal(date.toISOString().split("T")[0]);
    }

    if (argument?.items) {
      setStok(argument.items);
    }
  }, [
    warehouses,
    argument.warehouse,
    argument.notes,
    argument.sj_number,
    argument.transaction_date,
    argument.items,
  ]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetReturPenjualanMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetReturPenjualanMessages());
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
    if (stok.length === 0) {
      alert("Harap tambahkan minimal 1 produk");
      return;
    }

    if (!tanggal) {
      alert("Tanggal transaksi harus diisi");
      return;
    }

    // Prepare data for API
    const returPenjualanData = {
      warehouse: gudang.id || argument.warehouse,
      sj_number: noSJ,
      notes: keterangan,
      transaction_date: tanggal,
      items: stok.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    dispatch(updateReturPenjualanRequest(argument.id, returPenjualanData));
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handlePrintClick = () => {
    printReturPenjualan({
      ...argument,
      warehouse: argument.warehouse,
      sj_number: noSJ,
      notes: keterangan,
      transaction_date: tanggal,
      items: stok,
    });
  };

  const handleTambahStok = () => {
    // Logic to add stock, e.g., open a modal or navigate to another page
    setModalOpen(true);
  };

  const handleEdit = (e, value) => {
    e.stopPropagation();

    setWarehouseStock(
      stocks.find(
        (s) =>
          s.warehouse === argument?.warehouse && s.product === value?.product
      ) || null
    );
    setEditModalOpen(value);
  };

  const handleSaveAddStok = (data) => {
    // Update stok state with new data
    setStok([...stok, data]);
    setModalOpen(false);
  };

  const handleSaveEditStok = (data) => {
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) =>
        item.product_code === data.product_code ? data : item
      )
    );
    setEditModalOpen(null);
  };

  const handleDeleteStok = (stokItem) => {
    // Update stok state to remove the deleted item
    setStok((prevStok) => prevStok.filter((item) => item.id !== stokItem.id));
    setModalDeleteOpen(null);
  };
  //#endregion

  return (
    <div className={styles.ubahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Print Retur"
          variant="outline"
          onClick={handlePrintClick}
          disabled={loading}
        />
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
            label="No Faktur"
            type="text"
            id="noFaktur"
            name="noFaktur"
            defaultValue={argument?.document_number ?? ""}
            disabled={true}
          />

          <SearchField
            title="Cari Gudang"
            label="Gudang Asal"
            type="text"
            id="gudang"
            name="gudang"
            data={warehouses.map((warehouse) => ({
              id: warehouse.id,
              name: warehouse.name,
            }))}
            defaultValue={gudang}
            onChange={(warehouse) => setGudang(warehouse)}
          />
        </div>

        <div className={styles.row}>
          <DatePicker
            isInput={true}
            label="Tanggal Transaksi"
            value={tanggal}
            onChange={setTanggal}
            required
          />
          <InputField
            label="No SJ"
            type="text"
            id="noSuratJalan"
            name="noSuratJalan"
            value={noSJ}
            onChange={(e) => setNoSJ(e.target.value)}
            placeholder="Masukkan nomor surat jalan..."
          />
          <InputField
            label="Keterangan"
            type="text"
            id="keterangan"
            name="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Masukkan keterangan retur penjualan..."
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
        cartonQuantity={totalCarton}
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

export default UbahReturPenjualan;
