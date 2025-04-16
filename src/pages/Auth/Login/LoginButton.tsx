import styles from "./LoginButton.module.css";
import Button from "../../../components/Button/Button";
import { useDarkModeContext } from "../../../contexts/DarkmodeContext";

const LoginButton = () => {
  const { isDarkMode } = useDarkModeContext();

  // 로그인 버튼 클릭 시 로그인 or 회원가입 진행
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("클릭됨");
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

    // 깃허브 로그인으로 리다이렉트
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  };

  return (
    <Button onClick={(e) => handleLogin(e)}>
      <div className={styles.inner}>
        <img
          className={styles.github_logo}
          src={isDarkMode ? "/github_icon_white.png" : "/github_icon_black.png"}
        />
        <span className={styles.button_text}>Login with GitHub</span>
        <img
          className={styles.arrow_img}
          src={isDarkMode ? "/arrow_long_white.png" : "/arrow_long_black.png"}
        />
      </div>
    </Button>
  );
};
export default LoginButton;
