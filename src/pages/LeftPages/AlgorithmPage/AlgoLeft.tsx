import styles from "./AlgoLeft.module.css";
import { useState } from "react";
import LeftPart from "../../../layouts/Components/LeftPart";
import Company from "./Components/Company";

import Button from "../../../components/Button/Button";
import Custom from "./Components/Custom";

const AlgoLeft: React.FC = () => {
  const [selected, setSelected] = useState<0 | 1>(0);

  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.select_header}>
          <div
            className={`${styles.select_button} ${selected === 0 ? styles.active : ""}`}
            onClick={() => setSelected(0)}
          >
            모의 코딩하기
          </div>
          <div
            className={`${styles.select_button} ${selected === 1 ? styles.active : ""}`}
            onClick={() => setSelected(1)}
          >
            코딩 연습하기
          </div>
        </div>
        <div className={styles.content_box}>
          {selected === 0 ? <Company /> : <Custom />}
        </div>
        <div className={styles.button_box}>
          <Button>시작하기</Button>
        </div>
      </div>
    </LeftPart>
  );
};

export default AlgoLeft;
