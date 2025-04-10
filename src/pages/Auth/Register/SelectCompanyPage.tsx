import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import styles from "./SelectCompanyPage.module.css";

//component
import Button from "../../../components/Button/Button";

const languageList = [
  "삼성전자",
  "네이버",
  "카카오",
  "라인플러스",
  "우아한형제들",
  "구글",
  "애플",
  "아마존",
  "마이크로소프트",
  "메타",
  "하이퍼커넥트",
  "비바리퍼블리카",
  "당근마켓",
];
const SelectCompanyPage = () => {
  const navigate = useNavigate();

  const handleOnClickNext = () => {
    navigate("/");
  };

  return (
    <BaseLayout>
      <AuthLayout>
        <div className={styles.container}>
          {/* 로고 */}
          <p className={styles.logo}>Team! Jandi</p>

          {/* 캐치프레이즈 */}
          <div className={styles.catchphrase}>
            <p>Welcome, creator.</p>
            <p>Almost done.</p>
          </div>

          {/* 설명 문구 */}
          <p className={styles.explain}>선호하는 기업을 선택해주세요.</p>

          {/* 언어 선택 버튼 */}
          <div className={styles.languageButtons}>
            {languageList.map((language) => (
              <Button key={language} variant="lang">
                {language}
              </Button>
            ))}
          </div>

          {/* 이전 / 다음 버튼 */}
          <Button onClick={handleOnClickNext}>Next</Button>
        </div>
      </AuthLayout>
    </BaseLayout>
  );
};
export default SelectCompanyPage;
