/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Redux actions
import {
  updateSuratJalanRequest,
  resetSuratJalanMessages,
} from "../../../../../redux/actions/suratJalanActions";

// Import styles
import styles from "./style.module.scss";

// Import components
import CustomButton from "../../../../../components/CustomButton";
import InputField from "../../../../../components/InputField";
// import AddStockButton from "../../../../../components/AddStockButton";
// import AddStockModal from "../../../../../components/AddStockModal";
// import SearchField from "../../../../../components/SearchField";
import CustomDeleteButton from "../../../../../components/CustomDeleteButton";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
// import EditButton from "../../../../../components/EditButton";
// import EditStockModal from "../../../../../components/EditStockModal";

// Import utility function
import { printSuratJalan } from "../../../../../utils/printSuratJalanUtils";

export const UBAH_SURAT_JALAN_PATH =
  "/mutasi-keluar/surat-jalan/ubah-surat-jalan";

const UbahSuratJalan = () => {
  //#region Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const argument = location.state || {};

  const [keterangan, setKeterangan] = useState(argument?.notes || "");
  const [kendaraan, setKendaraan] = useState(argument?.vehicle_type || "");
  const [noKendaraan, setNoKendaraan] = useState(
    argument?.vehicle_number || ""
  );
  const [stok, setStok] = useState(argument?.items || []);
  // const [warehouseStock, setWarehouseStock] = useState(null);
  // const [spk, setSpk] = useState(argument?.spk || null);
  const [totalCarton, setTotalCarton] = useState(0);
  const [totalPack, setTotalPack] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [editModalOpen, setEditModalOpen] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(null);

  // const { stocks } = useSelector((state) => state.stock);
  // const { data: spkData } = useSelector((state) => state.spk);
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
    if (kendaraan === "" || noKendaraan === "") {
      alert("Harap lengkapi semua field yang diperlukan");
      return;
    }

    // Prepare data for API
    const suratJalanData = {
      spk: argument.id,
      warehouse: argument.warehouse,
      is_customer: true,
      customer: argument.customer,
      vehicle_type: kendaraan,
      vehicle_number: noKendaraan,
      notes: keterangan,
      items: argument.items.map((item) => ({
        product: item.product || item.id,
        carton_quantity: item.carton_quantity || 0,
        pack_quantity: item.pack_quantity || 0,
      })),
    };

    console.log("Mengubah Surat Jalan:", suratJalanData);
    dispatch(updateSuratJalanRequest(argument.id, suratJalanData));
  };

  const handleBatalClick = () => {
    // Logic to cancel the update and navigate back
    navigate(-1);
  };

  const handlePrintClick = () => {
    printSuratJalan({
      ...argument,
      vehicle_type: kendaraan,
      vehicle_number: noKendaraan,
      notes: keterangan,
    });
  };

  // const handleTambahStok = () => {
  //   // Logic to add stock, e.g., open a modal or navigate to another page
  //   console.log("Tambah Stok clicked!", spk);

  //   if (!spk) {
  //     alert("Harap pilih SPK terlebih dahulu");
  //     return;
  //   }
  //   setModalOpen(true);
  // };

  // const handleEdit = (e, value) => {
  //   e.stopPropagation();

  //   setWarehouseStock(
  //     stocks.find(
  //       (s) => s.warehouse === spk?.warehouse && s.product === value?.product
  //     ) || null
  //   );

  //   setEditModalOpen(value);
  // };

  // const handleSaveAddStok = (data) => {
  //   console.log("Data stok ditambahkan:", data);
  //   // Update stok state with new data
  //   setStok([...stok, data]);
  //   setModalOpen(false);
  // };

  // const handleSaveEditStok = (data) => {
  //   console.log("Data stok diedit:", data);
  //   // Update stok state with new data
  //   setStok((prevStok) =>
  //     prevStok.map((item) =>
  //       item.product_code === data.product_code ? data : item
  //     )
  //   );

  //   setEditModalOpen(null);
  // };

  const handleDeleteStok = (stokItem) => {
    console.log("Menghapus stok:", stokItem);
    // Update stok state to remove the deleted item
    setStok((prevStok) => prevStok.filter((item) => item.id !== stokItem.id));
    setModalDeleteOpen(null);
  };
  //#endregion

  return (
    <div className={styles.ubahSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          label="Print SJ"
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
            label="No SJ"
            type="text"
            id="noSj"
            name="noSj"
            defaultValue={argument?.document_number ?? ""}
            disabled={true}
          />

          <InputField
            label="Pelanggan"
            type="text"
            id="pelanggan"
            name="pelanggan"
            defaultValue={argument?.customer_name ?? ""}
            disabled={true}
          />

          <InputField
            label="Gudang Tujuan"
            type="text"
            id="gudangTujuan"
            name="gudangTujuan"
            defaultValue={argument?.warehouse_name ?? ""}
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
                {stokItem.carton_quantity}
              </div>
              <div className={styles.tableRowItem}>
                {stokItem.pack_quantity}
              </div>
              <div>
                {/* <EditButton onClick={(e) => handleEdit(e, stokItem)} /> */}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tableFooter}>
          <div className={styles.total}>Total</div>
          <div className={styles.cartoon}>{totalCarton}</div>
          <div className={styles.pack}>{totalPack}</div>
          <div className={styles.all}>{totalAll}</div>
        </div>
      </div>

      {/* <AddStockModal
        stocks={spk?.items || []}
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

export default UbahSuratJalan;
