import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import styles from "./DonePage.module.css";

//component
import AuthBanner from "../AuthBanner";
import Button from "../../../components/Button/Button";

const DonePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLangs = location.state?.selectedLangs || [];
  const selectedCompanies = location.state?.selectedCompanies || [];
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
  const handleNext = () => {
    navigate("/");
  };

  console.log("선택된 언어:", selectedLangs);
  console.log("선택된 기업:", selectedCompanies);

  return (
    <BaseLayout>
      <AuthLayout>
        {/* 상단 문구 */}
        <AuthBanner
          catchPhrases={["Your space is ready.", "Time to grow 🌱"]}
          explains={[
            "초록의 여정에 오신 것을 환영합니다.",
            "마음껏 작성하고, 마음껏 성장하세요.",
          ]}
        />

        {/* 다음 버튼 */}
        <Button onClick={handleNext}>
          <div className={styles.inner}>
            <span className={styles.button_text}>Start</span>
            <img
              className={styles.arrow_img}
              src={
                theme === "dark"
                  ? "/arrow_next_white.png"
                  : "/arrow_next_black.png"
              }
            />
          </div>
        </Button>
      </AuthLayout>
    </BaseLayout>
  );
};

export default DonePage;
