import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DoneButton.module.css";

//component
import Button from "../../../components/Button/Button";

const DoneButton = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 현재 html에 설정된 theme 속성 읽기
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("theme");
    if (currentTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Start 버튼 클릭 시 메인 페이지로 이동
  const handleNext = () => {
    navigate("/");
  };

  return (
    <Button onClick={handleNext}>
      <div className={styles.inner}>
        <span className={styles.button_text}>Done</span>
        <img
          className={styles.arrow_img}
          src={
            theme === "dark" ? "/arrow_next_white.png" : "/arrow_next_black.png"
          }
        />
      </div>
    </Button>
  );
};

export default DoneButton;
