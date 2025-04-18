import LeftPart from "../../../layouts/Components/LeftPart";
import styles from "./CodeTestLeft.module.css";
// import { useDarkModeContext } from "../../../contexts/DarkmodeContext";

const ProjectLeft = () => {
  // const { isDarkMode } = useDarkModeContext();
  const contents = "문제문제";

  return (
    <LeftPart>
      <div className={styles.container}>
        <div className={styles.prob}>
          <div className={styles.prob_title}> 문제 제목제목 </div>
          <div className={styles.prob_content}> {contents} </div>
        </div>
      </div>
    </LeftPart>
  );
};

export default ProjectLeft;
