import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./style.module.scss";

const FilterDropdown = ({ options = [], placeholder = "Filter", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        <p>{selected?.label || placeholder}</p>
        <FaChevronDown className={styles.icon} />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li key={opt.value} onClick={() => handleSelect(opt)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
