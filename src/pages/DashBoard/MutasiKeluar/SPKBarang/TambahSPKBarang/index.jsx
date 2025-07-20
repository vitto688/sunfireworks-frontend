/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  addSPKRequest,
  resetSPKMessages,
} from "../../../../../redux/actions/spkActions";

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

export const TAMBAH_SPK_BARANG_PATH =
  "/mutasi-keluar/spk-barang/tambah-spk-barang";

const TambahSPKBarang = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState("");
  const [gudang, setGudang] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [stok, setStok] = useState([]);
  const [warehouseStock, setWarehouseStock] = useState(null);
  const [totalCarton, setTotalCarton] = useState(0);
  const [totalPack, setTotalPack] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  const { stocks } = useSelector((state) => state.stock);
  const { warehouses, customers } = useSelector((state) => state.master);
  const { loading, message, errorMessage, errorCode } = useSelector(
    (state) => state.spk
  );
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset messages when component mounts
    dispatch(resetSPKMessages());
  }, [dispatch]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
      dispatch(resetSPKMessages());
      navigate(-1);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
      dispatch(resetSPKMessages());
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
    if (!gudang || !customer || stok.length === 0) {
      console.error("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const spkData = {
      warehouse: gudang.id || gudang,
      customer: customer.id,
      notes: keterangan,
      items: stok.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    console.log("Menambahkan SPK:", spkData);
    dispatch(addSPKRequest(spkData));
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handleTambahStok = () => {
    // Logic to add stock, e.g., open a modal or navigate to another page
    console.log("Tambah Stok clicked!");

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
    console.log("Data stok ditambahkan:", data);
    // Update stok state with new data
    setStok([...stok, data]);
    setModalOpen(false);
  };

  const handleSaveEditStok = (data) => {
    console.log("Data stok diedit:", data);
    // Update stok state with new data
    setStok((prevStok) =>
      prevStok.map((item) =>
        item.product_code === data.product_code ? data : item
      )
    );

    setEditModalOpen(null);
  };

  const handleDeleteStok = (stokItem) => {
    console.log("Menghapus stok:", stokItem);
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
            title="Cari Pelanggan"
            label="Pelanggan"
            type="text"
            id="pelanggan"
            name="pelanggan"
            data={customers.map((customer) => ({
              id: customer.id,
              name: customer.name,
            }))}
            defaultValue={customer}
            onChange={(customer) => setCustomer(customer)}
          />

          <SearchField
            title="Cari Gudang"
            label="Gudang"
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

      <EditStockModal
        stock={editModalOpen}
        cartonQuantity={warehouseStock?.carton_quantity ?? 0}
        packQuantity={warehouseStock?.pack_quantity ?? 0}
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

export default TambahSPKBarang;
