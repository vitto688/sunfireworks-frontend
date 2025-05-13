import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import { fetchUsersRequest } from "../../../redux/actions/authActions";

// Import components
import CustomButton from "../../../components/CustomButton";
import MenuDots from "../../../components/MenuDots";
import { TAMBAH_PENGGUNA_PATH } from "./TambahPengguna";
import { EDIT_PENGGUNA_PATH } from "./EditPengguna";
import SearchBar from "../../../components/SearchBar";
import { useSelector } from "react-redux";

// Define the path for the Users page
export const PENGGUNA_PATH = "/pengguna";

const Pengguna = () => {
  const dispatch = useDispatch();

  // State to manage the search query
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Get the users data from the Redux store with selectors
  const { users, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // This effect runs when the component mounts
    // You can add any initialization logic here if needed
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleAddClick = () => {
    console.log("Customer added!");
    navigate(TAMBAH_PENGGUNA_PATH);
  };

  return (
    <div className={styles.usersSection}>
      <SearchBar
        type="text"
        placeholder="Cari pengguna..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >
        <CustomButton label="Tambah" onClick={handleAddClick} />
      </SearchBar>
      <div className={styles.usersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderNo}>No</div>
          <div className={styles.tableHeaderNama}>Nama</div>
          <div className={styles.tableHeaderEmail}>Email</div>
          <div className={styles.tableHeaderNoTel}>Nomor Telepon</div>
          <div className={styles.tableHeaderRole}>Role</div>
          <div className={styles.tableHeaderActions} />
        </div>
        <div className={styles.tableBody}>
          {users.map((user, index) => (
            <div key={user.id} className={styles.tableRow}>
              <div className={styles.tableRowNo}>{index + 1}</div>
              <div className={styles.tableRowNama}>{user.username}</div>
              <div className={styles.tableRowEmail}>{user.email}</div>
              <div className={styles.tableRowNoTel}>{user.phone_number}</div>
              <div className={styles.tableRowRole}>{user.role}</div>
              <div className={styles.tableRowActions}>
                <MenuDots
                  onEdit={() => navigate(EDIT_PENGGUNA_PATH)}
                  onDelete={() => console.log("Confirmed delete")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pengguna;
