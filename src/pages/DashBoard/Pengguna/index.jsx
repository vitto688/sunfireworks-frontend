import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./style.module.scss";

// Import actions
import {
  deleteUserRequest,
  fetchUsersRequest,
  resetUserMessages,
} from "../../../redux/actions/authActions";

// Import components
import CustomButton from "../../../components/CustomButton";
import MenuDots from "../../../components/MenuDots";
import { TAMBAH_PENGGUNA_PATH } from "./TambahPengguna";
import { EDIT_PENGGUNA_PATH } from "./EditPengguna";
import SearchBar from "../../../components/SearchBar";
import FilterDropdown from "../../../components/FilterDropdown";
import { EDIT_ROLE_PATH } from "./EditRole";
import Loading from "../../../components/Loading";

// Define the path for the Users page
export const PENGGUNA_PATH = "/pengaturan/pengguna";

const filterOptionsActive = [
  { label: "Semua pengguna", value: "all" },
  { label: "Aktif pengguna", value: false },
  { label: "Non-aktif pengguna", value: true },
];

const Pengguna = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the search query
  const [query, setQuery] = useState("");
  const [pengguna, setPengguna] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedActiveFilter, setSelectedActiveFilter] = useState("all");

  // Get the users data from the Redux store with selectors
  const { users, roles, loading, message, errorMessage, errorCode } =
    useSelector((state) => state.auth);

  useEffect(() => {
    // This effect runs when the component mounts
    // You can add any initialization logic here if needed
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  // Filter users based on the search query
  useEffect(() => {
    const filteredUsers = filteredData.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setPengguna(filteredUsers);
  }, [query, filteredData]);

  // Filter users
  useEffect(() => {
    const newFilterOptions = [
      {
        value: 0,
        label: "Semua",
      },
      ...roles.map((role) => {
        return {
          value: role.id,
          label: role.name,
        };
      }),
    ];
    setFilterOptions(newFilterOptions);
  }, [roles]);

  useEffect(() => {
    // Filter users based on the selected filter
    if (selectedFilter !== 0 && selectedActiveFilter !== "all") {
      const filteredUsers = users.filter(
        (user) =>
          user.role === selectedFilter &&
          user.is_deleted === selectedActiveFilter
      );
      setFilteredData(filteredUsers);
    } else if (selectedFilter !== 0) {
      const filteredUsers = users.filter(
        (user) => user.role === selectedFilter
      );
      setFilteredData(filteredUsers);
    } else if (selectedActiveFilter !== "all") {
      const filteredUsers = users.filter(
        (user) => user.is_deleted === selectedActiveFilter
      );
      setFilteredData(filteredUsers);
    }
    // If no filter is selected, show all users
    else {
      setFilteredData(users);
    }
  }, [selectedFilter, selectedActiveFilter, users]);

  useEffect(() => {
    if (message !== null) {
      alert(message);
    }

    if (errorMessage !== null) {
      alert(`${errorMessage}\nerror: ${errorCode}`);
    }
    dispatch(resetUserMessages());
  }, [message, errorMessage, errorCode, navigate, dispatch]);
  //#endregion

  //#region Local functions
  const handleAddClick = () => {
    navigate(TAMBAH_PENGGUNA_PATH);
  };

  const handleItemClick = (value) => {
    navigate(EDIT_PENGGUNA_PATH, { state: value });
  };
  //#endregion

  return (
    <div className={styles.usersSection}>
      <div className={styles.actionsSection}>
        <CustomButton
          // variant="outline"
          label="+ Tambah"
          onClick={handleAddClick}
        />
      </div>
      <div className={styles.searchFilterSection}>
        <SearchBar
          type="text"
          placeholder="Cari pengguna..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.filterSection}>
          <FilterDropdown
            options={filterOptions}
            placeholder="Filter role"
            onChange={(val) => setSelectedFilter(val.value)}
          />
          <FilterDropdown
            options={filterOptionsActive}
            placeholder="Filter pengguna aktif"
            onChange={(val) => setSelectedActiveFilter(val.value)}
          />
        </div>
      </div>
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
          {pengguna.map((user, index) => (
            <div
              key={user.id}
              role="presentation"
              className={`${styles.tableRow} ${
                user.is_deleted && styles.inactive
              }`}
              onClick={() => handleItemClick(user)}
            >
              <div className={styles.tableRowNo}>{index + 1}</div>
              <div className={styles.tableRowNama}>{user.username}</div>
              <div className={styles.tableRowEmail}>{user.email}</div>
              <div className={styles.tableRowNoTel}>{user.phone_number}</div>
              <div className={styles.tableRowRole}>
                {roles.find((role) => role.id === user.role)?.name ?? ""}
              </div>
              <div className={styles.tableRowActions}>
                {user.is_deleted ? (
                  <div />
                ) : (
                  <MenuDots
                    onEdit={(e) => {
                      e.stopPropagation();
                      navigate(EDIT_ROLE_PATH, { state: user });
                    }}
                    onDelete={() => {
                      dispatch(
                        deleteUserRequest({
                          id: user.id,
                        })
                      );
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading.users && (
        <Loading message="Sedamg memproses data, mohon tunggu..." />
      )}
    </div>
  );
};

export default Pengguna;
