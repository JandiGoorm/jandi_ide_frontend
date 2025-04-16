import styles from "./AlgoLeft.module.css";
import LeftPart from "../../../layouts/Components/LeftPart";
import Company from "./Components/Company";

import Button from "../../../components/Button/Button";
import Custom from "./Components/Custom";
import { useNavigate } from "react-router-dom";

type Mode = "company" | "practice";

interface AlgoLeftProps {
  selected: Mode;
  setSelected: (value: Mode) => void;
}

const AlgoLeft: React.FC<AlgoLeftProps> = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const startAlgo = () => {
    if (selected === "company") {
      navigate("/algo/test/company");
    } else {
      navigate("/algo/test/custom");
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
          {selected === "company" ? <Company /> : <Custom />}
        </div>
        <div className={styles.button_box}>
          <Button
            onClick={() => {
              startAlgo();
            }}
          >
            시작하기
          </Button>
        </div>
      </div>
    </LeftPart>
  );
};

export default AlgoLeft;
