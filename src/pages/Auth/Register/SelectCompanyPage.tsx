import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";

//component
import AuthBanner from "../AuthBanner";
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
        {/* 상단 문구 */}
        <AuthBanner
          catchPhrases={["Welcome, creator.", "Almost done."]}
          explains={["선호하는 기업을 선택해주세요."]}
        />

        {/* 기업 선택 버튼 */}
        <SelectButtonList
          type={"company"}
          selectedItems={selectedCompanies}
          onClickItem={handleCompanyClick}
        />

        {/* 이전 / 다음 버튼 */}
        <Button onClick={handleOnClickNext}>Next</Button>
      </AuthLayout>
    </BaseLayout>
  );
};
export default SelectCompanyPage;
