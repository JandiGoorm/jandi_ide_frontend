import styles from "./Company.module.css";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";

const Company = () => {
  return (
    <div className={styles.content_box}>
      <div className={styles.input_box}>
        <p>회사 선택</p>
        <Select options={["React", "Vue", "Svelte"]} defaultValue="Vue" />
      </div>

      <div className={styles.input_box}>
        <p>언어 선택</p>
        <Select
          options={["C++", "Phython", "Java", "JS"]}
          defaultValue="Phython"
        />
      </div>
      <div className={styles.input_box}>
        <p>제목</p>
        <Input inputSize="md" />
      </div>
    </div>
  );
};

export default Company;
