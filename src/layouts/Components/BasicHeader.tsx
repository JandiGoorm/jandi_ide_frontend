import styles from "./BasicHeader.module.css";
import React from "react";
import { useDarkModeContext } from "../../contexts/DarkmodeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const BasicHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <div className={styles.container}>
      <div className={styles.switchContainer}>
        <div
          className={`${styles.switch} ${isDarkMode ? styles.switchOn : ""}`}
          onClick={toggleDarkMode}
        >
          <div className={styles.switchHandle}>
            {isDarkMode ? (
              <FaMoon size={16} color={"white"} />
            ) : (
              <FaSun size={16} color={"white"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicHeader;
