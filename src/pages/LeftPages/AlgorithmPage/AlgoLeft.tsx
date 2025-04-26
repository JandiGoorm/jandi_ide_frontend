import styles from "./AlgoLeft.module.css";
import LeftPart from "../../../layouts/Components/LeftPart";
import Company from "./Components/Company";

import Button from "../../../components/Button/Button";
import Custom from "./Components/Custom";
import { useRef, useState } from "react";
import { useToast } from "../../../contexts/ToastContext";

interface Form {
  title: string;
  language: string;
  time: number;
  company: string;
}
type Mode = "company" | "practice";

interface AlgoLeftProps {
  selected: Mode;
  setSelected: (value: Mode) => void;
  onStart: (form: Form) => void;
}

const AlgoLeft: React.FC<AlgoLeftProps> = ({
  selected,
  setSelected,
  onStart,
}) => {
  const companyRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const [companyTime, setCompanyTime] = useState<number>(60);
  const { createToast } = useToast();

  const handleStartClick = () => {
    if (selected === "practice") {
      const form = {
        company: "",
        title: titleRef.current?.value || "",
        language: languageRef.current?.value || "",
        time: Number(timeRef.current?.value) || 0,
      };
      if (!form.title || !form.language || form.time <= 0) {
        createToast({ type: "error", text: "모든 항목을 입력해주세요!" });
        return;
      }
      onStart(form);
    } else {
      const form = {
        company: companyRef.current?.value || "",
        language: languageRef.current?.value || "",
        title: titleRef.current?.value || "",
        time: companyTime,
      };

      if (!form.company || !form.title || !form.language || form.time <= 0) {
        createToast({ type: "error", text: "모든 항목을 입력해주세요!" });
        return;
      }
      onStart(form); // company 모드
    }
  };

  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.select_header}>
          <div
            className={`${styles.select_button} ${selected === "company" ? styles.active : ""}`}
            onClick={() => setSelected("company")}
          >
            모의 코딩하기
          </div>
          <div
            className={`${styles.select_button} ${selected === "practice" ? styles.active : ""}`}
            onClick={() => setSelected("practice")}
          >
            코딩 연습하기
          </div>
        </div>
        <div className={styles.content_box}>
          {selected === "company" ? (
            <Company
              refs={{ companyRef, languageRef, titleRef }}
              onChangeCompanyTime={setCompanyTime}
            />
          ) : (
            <Custom refs={{ titleRef, languageRef, timeRef }} />
          )}
        </div>
        <div className={styles.button_box}>
          <Button onClick={handleStartClick}>시작하기</Button>
        </div>
      </div>
    </LeftPart>
  );
};

export default AlgoLeft;
