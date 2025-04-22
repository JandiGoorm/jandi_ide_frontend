import styles from "./AlgoLeft.module.css";
import LeftPart from "../../../layouts/Components/LeftPart";
import Company from "./Components/Company";

import Button from "../../../components/Button/Button";
import Custom from "./Components/Custom";
import { useRef } from "react";

type Mode = "company" | "practice";

interface AlgoLeftProps {
  selected: Mode;
  setSelected: (value: Mode) => void;
  onStart: (form?: { title: string; language: string; time: number }) => void;
}

const AlgoLeft: React.FC<AlgoLeftProps> = ({
  selected,
  setSelected,
  onStart,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handleStartClick = () => {
    if (selected === "practice") {
      const form = {
        title: titleRef.current?.value || "",
        language: languageRef.current?.value || "",
        time: Number(timeRef.current?.value) || 0,
      };
      onStart(form);
    } else {
      onStart(); // company 모드
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
            <Company />
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
