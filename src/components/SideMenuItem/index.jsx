import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import styles
import styles from "./styles.module.scss";

const SideMenuItem = ({
  name,
  icon,
  to,
  subMenus = [],
  isSelected,
  isExpanded,
  onExpandCollapse,
}) => {
  // const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // const onExpandCollapse = () => setExpanded((val) => !val);

  function handleOnClick() {
    console.log("handleOnClick", to);
    if (onExpandCollapse) {
      onExpandCollapse();
    } else {
      navigate(to);
    }
  }

  return (
    <div className={styles.sideMenuItemSection}>
      <div
        role="presentation"
        className={styles.sideMenu}
        onClick={() => handleOnClick()}
      >
        {icon}
        <h5 className={`${styles.name} ${isSelected && styles.selected}`}>
          {name}
        </h5>
        {subMenus.length > 0 && (
          <span className={styles.trailing}>{isExpanded ? "▲" : "▼"}</span>
        )}
      </div>
      {isExpanded && subMenus.length > 0 && (
        <ul className={styles.subMenusSection}>
          {subMenus.map((subMenu) => {
            console.log("subMenu", subMenu);
            return (
              <li className={styles.subMenu}>
                <Link
                  to={subMenu.to}
                  className={`${styles.link} ${
                    subMenu.isSelected && styles.selected
                  }`}
                >
                  {subMenu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SideMenuItem;
