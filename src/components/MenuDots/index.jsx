import React, { useEffect, useRef, useState } from "react";

// Import styles
import styles from "./style.module.scss";

// Import components
import ConfirmDeleteModal from "../ConfirmDeleteModal";

const MenuDots = ({ count = 3, onEdit, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(false);
    setModalOpen(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    setModalOpen(false);
    onDelete();
  };

  return (
    <div className={styles.menuDotsSection} ref={menuRef}>
      <button
        className={styles.dotsButton}
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen((prev) => !prev);
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.dot}></div>
        ))}
      </button>
      {dropdownOpen && (
        <div className={styles.dropdown}>
          <button onClick={onEdit}>Edit Role</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      <ConfirmDeleteModal
        label="Apakah anda yakin untuk menghapus pengguna ini?"
        open={modalOpen}
        onClose={(e) => {
          e.stopPropagation();
          setModalOpen(false);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default MenuDots;
