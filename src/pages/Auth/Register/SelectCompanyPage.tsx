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

  // 기업 버튼 클릭 시 selectedCompanies에 추가 or 삭제
  const handleCompanyClick = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  // Next 버튼 클릭 시 회원가입 진행 후 홈으로 이동
  const handleOnClickNext = () => {
    if (selectedCompanies.length === 0)
      // 기업 미선택 시 넘어가지 않음
      return;

    console.log("언어 선택:", selectedLangs);
    console.log("기업 선택:", selectedCompanies);

    // 회원가입 진행...

    // 가입 완료 페이지로 이동
    navigate("/register/done");
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
