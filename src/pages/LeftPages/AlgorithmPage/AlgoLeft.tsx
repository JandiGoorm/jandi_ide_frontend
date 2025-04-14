import styles from "./AlgoLeft.module.css";
import LeftPart from "../../../layouts/Components/LeftPart"; //왼쪽 부분 컴포넌트
import Input from "../../../components/Input/Input";
// import Button from "../../../components/Button/Button";

const AlgoLeft = () => {
  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.select_header}></div>
        <div className={styles.content_box}>
          <div className={styles.input_box}>
            <p>회사 선택</p>
            <Input
              style={{
                boxSizing: "border-box",
                width: "100%",
              }}
            />
          </div>

          <Input />
          <Input />
        </div>
      </div>
    </LeftPart>
  );
};

export default AlgoLeft;
