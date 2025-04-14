import styles from "./Custom.module.css";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";

const Custom = () => {
  return (
    <div className={styles.content_box}>
      <div className={styles.input_box}>
        <p>제목</p>
        <Input inputSize="md" />
      </div>

      <div className={styles.input_box}>
        <p>언어 선택</p>
        <Select options={["C++", "Phython", "Java", "JS"]} defaultValue="Vue" />
      </div>
      <div className={styles.input_box}>
        <p>시간 지정</p>
        <Input inputSize="md" />
      </div>
    </div>
  );
};

export default Custom;
