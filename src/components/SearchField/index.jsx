import React, { useEffect, useState } from "react";

// Import styles
import styles from "./style.module.scss";

// Import components
import ItemSearchDialog from "../ItemSearchDialog";

const SearchField = ({
  title,
  label,
  name,
  data,
  onChange,
  defaultValue,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.searchFieldSection}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.searchInput}>
        <input
          className={styles.input}
          id={name}
          name={name}
          type="text"
          defaultValue={selected?.name ?? ""}
          disabled={true}
        />
        <button onClick={() => setOpen(true)} disabled={disabled}>
          {title}
        </button>
      </div>
      <ItemSearchDialog
        title={title}
        data={data}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={(product) => {
          onChange(product);
          setSelected(product);
        }}
      />
    </div>
  );
};

export default SearchField;
