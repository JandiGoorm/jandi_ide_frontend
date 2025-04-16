import styles from "./AddProject.module.css";
import Input from "../../../../../components/Input/Input";
import Select from "../../../../../components/Select/Select";
import Button from "../../../../../components/Button/Button";

const AddProject = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>프로젝트 불러오기</div>
      <div className={styles.content_box}>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 이름</div>
          <Input style={{ width: "100%" }} />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 지정</div>
          <Select options={["React", "Vue", "Svelte"]} defaultValue="React" />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 설명</div>
          <Input style={{ width: "100%" }} />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button>프로젝트 등록</Button>
      </div>
    </div>
  );
};

export default AddProject;
