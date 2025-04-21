import styles from "./IntroHeader.module.css";
import React from "react";
import { useDarkModeContext } from "../../contexts/DarkmodeContext";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../constants/api";

const IntroHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.button_div}>
        <Button
          onClick={() => {
            navigate(PageEndPoints.LOGIN);
          }}
        >
          LogIn
        </Button>
      </div>
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

export default IntroHeader;
