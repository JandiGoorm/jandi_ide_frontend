import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import styles from "./LoginPage.module.css";

//component
import Button from "../../../components/Button/Button";

const LoginPage = () => {
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

  const handleLogin = () => {
    // if new user
    navigate("/register/language");
  };

  return (
    <BaseLayout>
      <AuthLayout>
        {/* 로고 */}
        <p className={styles.logo}>Team! Jandi</p>

        {/* 캐치프레이즈 */}
        <div className={styles.catchphrase}>
          <p>Welcome Back!</p>
          <p>Your code missed you.</p>
        </div>

        {/* 설명 문구 */}
        <p className={styles.explain}>로그인하여 성장을 계속 이어가세요.</p>

        {/* 로그인 버튼 */}
        <Button onClick={handleLogin}>
          <div className={styles.inner}>
            <img
              className={styles.github_logo}
              src={
                theme === "dark"
                  ? "/github_icon_white.png"
                  : "/github_icon_black.png"
              }
            />
            <span className={styles.button_text}>Login with GitHub</span>
            <img
              className={styles.arrow_img}
              src={
                theme === "dark"
                  ? "/arrow_long_white.png"
                  : "/arrow_long_black.png"
              }
            />
          </div>
        </Button>
      </AuthLayout>
    </BaseLayout>
  );
};
export default LoginPage;
