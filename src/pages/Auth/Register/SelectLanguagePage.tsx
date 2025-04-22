import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";

//component
import AuthBanner from "../AuthBanner";
import Button from "../../../components/Button/Button";
import SelectButtonList from "../../../components/SelectListButton/SelectListButton";

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

const SelectLanguagePage = () => {
  const navigate = useNavigate();
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);

  // 언어 버튼 클릭 시 selectedLangs에 추가 or 삭제
  const handleLanguageClick = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  // Next 버튼 클릭 시 selectedLangs을 감싸서 다음 페이지로 이동
  const handleOnClickNext = () => {
    if (selectedLangs.length === 0)
      // 언어 미선택 시 넘어가지 않음
      return;

    // 기업 선택 페이지로 이동
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
          listItem={languageList}
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
