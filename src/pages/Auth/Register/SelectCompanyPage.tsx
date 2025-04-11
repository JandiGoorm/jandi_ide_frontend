import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import styles from "./SelectCompanyPage.module.css";

//component
import Button from "../../../components/Button/Button";
import SelectButtonList from "../../../components/SelectListButton/SelectListButton";

const SelectCompanyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLangs = location.state?.selectedLangs || [];
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  console.log("선택된 언어:", selectedLangs);

  const handleCompanyClick = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const handleOnClickNext = () => {
    if (selectedCompanies.length === 0) return;

    navigate("/register/done", {
      state: { selectedLangs, selectedCompanies },
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
            <p>Almost done.</p>
          </div>

          {/* 설명 문구 */}
          <p className={styles.explain}>선호하는 기업을 선택해주세요.</p>

          {/* 기업 선택 버튼 */}
          <SelectButtonList
            type={"company"}
            selectedItems={selectedCompanies}
            onClickItem={handleCompanyClick}
          />

          {/* 이전 / 다음 버튼 */}
          <Button onClick={handleOnClickNext}>Next</Button>
        </div>
      </AuthLayout>
    </BaseLayout>
  );
};
export default SelectCompanyPage;
