import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import styles from "./SelectLanguagePage.module.css";

//component
import Button from "../../../components/Button/Button";
import SelectButtonList from "../../../components/SelectListButton/SelectListButton";

const SelectLanguagePage = () => {
  const navigate = useNavigate();
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);

  const handleLanguageClick = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleOnClickNext = () => {
    if (selectedLangs.length === 0) return;

    navigate("/register/company", {
      state: { selectedLangs },
    });
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
            <p>Tell me about yourself.</p>
          </div>

          {/* 설명 문구 */}
          <p className={styles.explain}>
            선호하는 프로그래밍 언어를 선택해주세요.
          </p>

          {/* 언어 선택 버튼 */}
          <SelectButtonList
            type={"lang"}
            selectedItems={selectedLangs}
            onClickItem={handleLanguageClick}
          />

          {/* 이전 / 다음 버튼 */}
          <Button onClick={handleOnClickNext}>Next</Button>
        </div>
      </AuthLayout>
    </BaseLayout>
  );
};
export default SelectLanguagePage;
