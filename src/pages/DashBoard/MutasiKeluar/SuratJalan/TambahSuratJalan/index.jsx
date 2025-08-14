/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  addSuratJalanRequest,
  resetSuratJalanMessages,
} from "../../../../../redux/actions/suratJalanActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../../components/CustomButton";
import InputField from "../../../../../components/InputField";
import AddStockModal from "../../../../../components/AddStockModal";
import SearchField from "../../../../../components/SearchField";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditButton from "../../../../../components/EditButton";
import { formatNumberWithDot } from "../../../../../utils/numberUtils";
import DatePicker from "../../../../../components/DatePicker";
import AddStockButton from "../../../../../components/AddStockButton";
import SelectField from "../../../../../components/SelectField";

export const TAMBAH_SURAT_JALAN_PATH =
  "/mutasi-keluar/surat-jalan/tambah-surat-jalan";

const TambahSuratJalan = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState("");
  const [gudang, setGudang] = useState(null);
  const [kendaraan, setKendaraan] = useState("");
  const [noKendaraan, setNoKendaraan] = useState("");
  const [sjType, setSjType] = useState("");
  const [tanggal, setTanggal] = useState(() => {
    // Set default to today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [stok, setStok] = useState([]);
  const [warehouseStock, setWarehouseStock] = useState(null);
  const [spk, setSpk] = useState(null);
  const [totalCarton, setTotalCarton] = useState(0);
  const [totalPack, setTotalPack] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { allData: spkData } = useSelector((state) => state.spk);
  const { stocks } = useSelector((state) => state.stock);
  const { warehouses } = useSelector((state) => state.master);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.suratJalan
  );
  //#endregion

  //#region Data Constants
  const sjTypeOptions = [
    { id: "KA", name: "KA" },
    { id: "KA-SJ", name: "KA-SJ" },
    { id: "SO/B", name: "SO/B" },
    { id: "SO/K", name: "SO/K" },
    { id: "P-B", name: "P-B" },
    { id: "P-K", name: "P-K" },
  ];
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetSuratJalanMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetSuratJalanMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetSuratJalanMessages());
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
      !spk ||
      !gudang ||
      !tanggal ||
      !kendaraan ||
      !noKendaraan ||
      !sjType ||
      stok.length === 0
    ) {
      alert("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const suratJalanData = {
      spk: spk.id,
      warehouse: gudang.id,
      is_customer: true,
      customer: spk.customer,
      vehicle_type: kendaraan,
      vehicle_number: noKendaraan,
      notes: keterangan,
      transaction_date: tanggal,
      sj_type: sjType,
      items: stok.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    dispatch(addSuratJalanRequest(suratJalanData));
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

    if (!gudang) {
      alert("Harap pilih gudang terlebih dahulu");
      return;
    }

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

    if (
      data.carton_quantity > data.unfulfilled_carton_quantity ||
      data.pack_quantity > data.unfulfilled_pack_quantity
    ) {
      alert(
        "Jumlah karton dan pack tidak boleh melebihi jumlah yang belum terpenuhi"
      );
      return;
    }

    data.new_unfulfilled_carton_quantity =
      data.unfulfilled_carton_quantity - data.carton_quantity;
    data.new_unfulfilled_pack_quantity =
      data.unfulfilled_pack_quantity - data.pack_quantity;
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
          <SearchField
            title="Cari SPK"
            label="SPK"
            type="text"
            id="spk"
            name="spk"
            data={spkData
              .map((surat) => ({
                id: surat.id,
                name: surat.document_number,
                gudang: surat.warehouse_name,
                pelanggan: surat.customer_name,
                status: surat.status,
              }))
              .filter((item) => item.status.toLowerCase() !== "selesai")}
            defaultValue={{
              id: spk?.id,
              name: spk?.document_number,
              gudang: spk?.warehouse_name,
              pelanggan: spk?.customer_name,
              status: spk?.status,
            }}
            onChange={(surat) => {
              const selectedSpk = spkData.find((s) => s.id === surat.id);
              console.log("surat", surat, "selectedSpk", selectedSpk);
              setSpk(selectedSpk || null);
              if (selectedSpk) {
                selectedSpk.items = selectedSpk.items.filter(
                  (item) =>
                    item.unfulfilled_carton_quantity > 0 ||
                    item.unfulfilled_pack_quantity > 0
                );

                setStok([
                  ...selectedSpk.items.map((item) => ({
                    ...item,
                    carton_quantity: 0,
                    pack_quantity: 0,
                    new_unfulfilled_carton_quantity:
                      item.unfulfilled_carton_quantity,
                    new_unfulfilled_pack_quantity:
                      item.unfulfilled_pack_quantity,
                  })),
                ]);
              }
            }}
          />

          <InputField
            label="Pelanggan"
            type="text"
            id="pelanggan"
            name="pelanggan"
            defaultValue={spk?.customer_name ?? ""}
            disabled={true}
          />

          <SearchField
            title="Cari Gudang"
            label="Gudang"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            data={warehouses.map((warehouse) => ({
              id: warehouse.id,
              name: warehouse.name,
            }))}
            onChange={(warehouse) => setGudang(warehouse)}
          />

          <SelectField
            label="Tipe SJ"
            id="sjType"
            name="sjType"
            value={sjType}
            options={sjTypeOptions}
            onChange={(e) => setSjType(e.target.value)}
            required
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
            label="Kendaraan"
            type="text"
            id="kendaraan"
            name="kendaraan"
            value={kendaraan}
            onChange={(e) => setKendaraan(e.target.value)}
          />

          <InputField
            label="No Kendaraan"
            type="text"
            id="noKendaraan"
            name="noKendaraan"
            value={noKendaraan}
            onChange={(e) => setNoKendaraan(e.target.value)}
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
        {/* <AddStockButton onClick={() => handleTambahStok()} /> */}
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
          <div className={styles.tableHeaderItem}>SPK Karton</div>
          <div className={styles.tableHeaderItem}>SPK Pack</div>
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
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.new_unfulfilled_carton_quantity)}
              </div>
              <div className={styles.tableRowItem}>
                {formatNumberWithDot(stokItem.new_unfulfilled_pack_quantity)}
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
          {/* <div className={styles.all}>{formatNumberWithDot(totalAll)}</div> */}
        </div>
      </div>

      <AddStockModal
        stocks={stocks.filter((stock) => stock.warehouse === gudang?.id)}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddStok}
      />

      <AddStockModal
        disabledSearch={true}
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

export default TambahSuratJalan;
