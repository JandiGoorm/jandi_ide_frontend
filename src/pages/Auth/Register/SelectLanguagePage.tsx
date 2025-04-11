import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";

//component
import AuthBanner from "../AuthBanner";
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
        {/* 상단 문구 */}
        <AuthBanner
          catchPhrases={["Welcome, creator.", "Tell me about yourself."]}
          explains={["선호하는 프로그래밍 언어를 선택해주세요."]}
        />

        {/* 언어 선택 버튼 */}
        <SelectButtonList
          type={"lang"}
          selectedItems={selectedLangs}
          onClickItem={handleLanguageClick}
        />

        {/* 이전 / 다음 버튼 */}
        <Button onClick={handleOnClickNext}>Next</Button>
      </AuthLayout>
    </BaseLayout>
  );
};
export default SelectLanguagePage;
