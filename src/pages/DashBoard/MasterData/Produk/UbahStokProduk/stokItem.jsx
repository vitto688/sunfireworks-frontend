import React, { useState } from "react";

// Import styles
import styles from "./style.module.scss";
import InputField from "../../../../../components/InputField";

// Import components

const StokItem = ({
  index,
  code,
  stok,
  handleCartonChange,
  handlePackChange,
}) => {
  //#region Hooks
  const [carton, setCarton] = useState(stok.carton_quantity ?? 0);
  const [pack, setPack] = useState(stok.pack_quantity ?? 0);

  //#endregion

  return (
    <div key={`stok-item-${stok.id}-${code}`} className={styles.stokItem}>
      <InputField
        label="Gudang"
        type="text"
        id={`gudang-${stok.id}-${code}`}
        name={`gudang-${stok.id}-${code}`}
        disabled={true}
        value={stok.warehouse_name ?? ""}
      />
      <InputField
        label="Stok Karton"
        type="text"
        id={`stok-karton-${stok.id}-${code}`}
        name={`stok-karton-${stok.id}-${code}`}
        disabled={true}
        value={stok.carton_quantity ?? ""}
      />
      <InputField
        label="Stok Pack"
        type="text"
        id={`stok-pack-${stok.id}-${code}`}
        name={`stok-pack-${stok.id}-${code}`}
        disabled={true}
        value={stok.pack_quantity ?? ""}
      />
      <label className={styles.label} htmlFor="ubahStokDiGudang">
        {"Ubah Stok ===>"}
      </label>
      <InputField
        type="text"
        id={`stok-karton-${stok.id}-${code}`}
        name={`stok-karton-${stok.id}-${code}`}
        value={carton}
        onChange={(e) => {
          setCarton(e.target.value);
          handleCartonChange(e, stok);
        }}
      />
      <InputField
        type="text"
        id={`stok-pack-${stok.id}-${code}`}
        name={`stok-pack-${stok.id}-${code}`}
        value={pack}
        onChange={(e) => {
          setPack(e.target.value);
          handlePackChange(e, stok);
        }}
      />
    </div>
  );
};

export default StokItem;
