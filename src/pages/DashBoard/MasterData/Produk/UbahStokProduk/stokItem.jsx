import React, { useState, useEffect } from "react";

// Import styles
import styles from "./style.module.scss";
import InputField from "../../../../../components/InputField";
import {
  formatNumberWithDot,
  parseFormattedNumber,
} from "../../../../../utils/numberUtils";

// Import components

const StokItem = ({ code, stok, handleCartonChange, handlePackChange }) => {
  //#region Hooks
  const [carton, setCarton] = useState(stok.carton_quantity ?? 0);
  const [pack, setPack] = useState(stok.pack_quantity ?? 0);
  //#endregion

  //#region Effects
  // Update carton and pack state when stok changes
  useEffect(() => {
    setCarton(stok.carton_quantity ?? 0);
    setPack(stok.pack_quantity ?? 0);
  }, [stok.carton_quantity, stok.pack_quantity, stok.id]);
  //#endregion

  return (
    <div key={`stok-item-${stok.id}-${code}`} className={styles.stokItem}>
      <InputField
        label="Gudang"
        type="text"
        id={`gudang-${stok.id}-${code}`}
        name={`gudang-${stok.id}-${code}`}
        disabled={true}
        defaultValue={stok.warehouse_name ?? ""}
      />
      <InputField
        label="Stok Karton"
        type="text"
        id={`stok-karton-${stok.id}-${code}`}
        name={`stok-karton-${stok.id}-${code}`}
        disabled={true}
        defaultValue={formatNumberWithDot(stok.carton_quantity ?? 0)}
      />
      <InputField
        label="Stok Pack"
        type="text"
        id={`stok-pack-${stok.id}-${code}`}
        name={`stok-pack-${stok.id}-${code}`}
        disabled={true}
        defaultValue={formatNumberWithDot(stok.pack_quantity ?? 0)}
      />
      <label className={styles.label} htmlFor="ubahStokDiGudang">
        {"Ubah Stok ===>"}
      </label>
      <InputField
        type="text"
        id={`stok-karton-${stok.id}-${code}`}
        name={`stok-karton-${stok.id}-${code}`}
        value={formatNumberWithDot(carton)}
        onChange={(e) => {
          const parsedValue = parseFormattedNumber(e.target.value);
          if (/^\d*$/.test(parsedValue)) {
            setCarton(Number(parsedValue));
            handleCartonChange(e, stok);
          }
        }}
      />
      <InputField
        type="text"
        id={`stok-pack-${stok.id}-${code}`}
        name={`stok-pack-${stok.id}-${code}`}
        value={formatNumberWithDot(pack)}
        onChange={(e) => {
          const parsedValue = parseFormattedNumber(e.target.value);
          if (/^\d*$/.test(parsedValue)) {
            setPack(Number(parsedValue));
            handlePackChange(e, stok);
          }
        }}
      />
    </div>
  );
};

export default StokItem;
