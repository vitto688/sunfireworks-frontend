// Import styles
import styles from "./style.module.scss";

const SearchBar = ({
  children,
  type = "text",
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.searchBarSection}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchBar}
      />
      {children}
    </div>
  );
};

export default SearchBar;
