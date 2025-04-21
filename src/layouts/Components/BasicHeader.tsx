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
          <div className={styles.switchHandle}>
            <img src={isDarkMode ? "/switch_moon.png" : "/switch_sun.png"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicHeader;
