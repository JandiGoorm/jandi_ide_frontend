import styles from "./DoneButton.module.css";
import Button from "../../../components/Button/Button";
import { useDarkModeContext } from "../../../contexts/DarkmodeContext";
import { PageEndPoints } from "../../../constants/api";

const DoneButton = () => {
  const { isDarkMode } = useDarkModeContext();

  // Done 버튼 클릭 시 메인 페이지로 이동
  const handleNext = () => {
    window.location.href = PageEndPoints.HOME;
  };

  return (
    <Button onClick={handleNext}>
      <div className={styles.inner}>
        <span className={styles.button_text}>Done</span>
        <img
          className={styles.arrow_img}
          src={isDarkMode ? "/arrow_next_white.png" : "/arrow_next_black.png"}
        />
      </div>
    </Button>
  );
};

export default DoneButton;
