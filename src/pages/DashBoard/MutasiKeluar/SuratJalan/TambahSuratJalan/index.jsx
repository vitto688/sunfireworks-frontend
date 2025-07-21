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
import AddStockButton from "../../../../../components/AddStockButton";
import AddStockModal from "../../../../../components/AddStockModal";
import SearchField from "../../../../../components/SearchField";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import EditStockModal from "../../../../../components/EditStockModal";
import EditButton from "../../../../../components/EditButton";
import { formatNumberWithDot } from "../../../../../utils/numberUtils";

export const TAMBAH_SURAT_JALAN_PATH =
  "/mutasi-keluar/surat-jalan/tambah-surat-jalan";

const TambahSuratJalan = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [noKendaraan, setNoKendaraan] = useState("");
  const [stok, setStok] = useState([]);
  // const [warehouseStock, setWarehouseStock] = useState(null);
  const [spk, setSpk] = useState(null);
  const [totalCarton, setTotalCarton] = useState(0);
  const [totalPack, setTotalPack] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  // const { stocks } = useSelector((state) => state.stock);
  const { data: spkData } = useSelector((state) => state.spk);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.suratJalan
  );
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
    if (!spk || stok.length === 0) {
      alert("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const suratJalanData = {
      spk: spk.id,
      warehouse: spk.warehouse,
      is_customer: true,
      customer: spk.customer,
      vehicle_type: kendaraan,
      vehicle_number: noKendaraan,
      notes: keterangan,
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
            data={spkData.map((surat) => ({
              id: surat.id,
              name: surat.document_number,
              gudang: surat.warehouse_name,
              pelanggan: surat.customer_name,
            }))}
            defaultValue={{
              id: spk?.id,
              name: spk?.document_number,
              gudang: spk?.warehouse_name,
              pelanggan: spk?.customer_name,
            }}
            onChange={(surat) => {
              const selectedSpk = spkData.find((s) => s.id === surat.id);
              setSpk(selectedSpk || null);
              if (selectedSpk) setStok([...selectedSpk.items]);
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

          <InputField
            label="Gudang Tujuan"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            defaultValue={spk?.warehouse_name ?? ""}
            disabled={true}
          />
        </div>

        <div className={styles.row}>
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
              <div />
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
