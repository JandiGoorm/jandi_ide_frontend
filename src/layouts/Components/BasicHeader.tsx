import styles from "./BasicHeader.module.css";
import React from "react";
import { useDarkModeContext } from "../../contexts/DarkmodeContext";

const BasicHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <div className={styles.container}>
      <div className={styles.switchContainer}>
        <div
          className={`${styles.switch} ${isDarkMode ? styles.switchOn : ""}`}
          onClick={toggleDarkMode}
        >
          <div className={styles.switchHandle}></div>
        </div>
        <span>{isDarkMode ? "On" : "Off"}</span>
      </div>
    </div>
  );
};

export default BasicHeader;
