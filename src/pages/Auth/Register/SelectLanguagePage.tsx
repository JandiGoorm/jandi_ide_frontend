import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import styles from "./SelectLanguagePage.module.css";

//component
import Button from "../../../components/Button/Button";

const languageList = [
  "Python",
  "C/C++",
  "JavaScript",
  "C#",
  "Go",
  "Fortran",
  "Delphi/Object Pascal",
  "SQL",
  "MATLAB",
  "Rust",
  "R",
  "Ruby",
];
const LoginPage = () => {
  return (
    <BaseLayout>
      <AuthLayout>
        <div className={styles.container}>
          {/* 로고 */}
          <p className={styles.logo}>Team! Jandi</p>

          {/* 캐치프레이즈 */}
          <div className={styles.catchphrase}>
            <p>Welcome, creator.</p>
            <p>Tell me about yourself.</p>
          </div>

          {/* 설명 문구 */}
          <p className={styles.explain}>
            선호하는 프로그래밍 언어를 선택해주세요.
          </p>

          {/* 언어 선택 버튼 */}
          <div className={styles.languageButtons}>
            {languageList.map((language) => (
              <Button key={language} variant="lang">
                {language}
              </Button>
            ))}
          </div>

          {/* 이전 / 다음 버튼 */}
          <Button>Next</Button>
        </div>
      </AuthLayout>
    </BaseLayout>
  );
};
export default LoginPage;
