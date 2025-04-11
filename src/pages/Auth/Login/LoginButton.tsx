import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./LoginButton.module.css";
import Button from "../../../components/Button/Button";

const LoginButton = () => {
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

  // 로그인 버튼 클릭 시 로그인 or 회원가입 진행
  const handleLogin = () => {
    // 만약 기존회원이라면 로그인 진행
    // 로그인 진행...

    // 만약 신규 회원이라면 회원가입 진행
    navigate("/register/language");
  };

  return (
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
            theme === "dark" ? "/arrow_long_white.png" : "/arrow_long_black.png"
          }
        />
      </div>
    </Button>
  );
};
export default LoginButton;
