import { useEffect, useState } from "react";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BasyLaout/BaseLayout";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
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

  return (
    <BaseLayout>
      <AuthLayout>
        <div className={styles.container}>
          {/* 문구 */}
          <p className={styles.logo}>Team! Jandi</p>
          <div className={styles.catchphrase}>
            <p>Welcome Back!</p>
            <p>Your code missed you.</p>
          </div>
          <div className={styles.general}>
            <p>로그인하여 성장을 계속 이어가세요.</p>
          </div>

          {/* 로그인 버튼 */}
          <button className={styles.login_button}>
            <img
              className={styles.github_logo}
              src={
                theme === "dark"
                  ? "/github_icon_white.png"
                  : "/github_icon_black.png"
              }
            ></img>
            <p>Login with GitHub</p>
            <img
              className={styles.arrow_img}
              src={
                theme === "dark"
                  ? "/arrow_long_white.png"
                  : "/arrow_long_black.png"
              }
            ></img>
          </button>
        </div>
      </AuthLayout>
    </BaseLayout>
  );
};
export default LoginPage;
