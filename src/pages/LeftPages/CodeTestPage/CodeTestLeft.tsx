import { useEffect } from "react";
import { ProblemInfo } from "../../../constants/types/types";
import LeftPart from "../../../layouts/Components/LeftPart";
import styles from "./CodeTestLeft.module.css";
import Button from "../../../components/Button/Button";
// import { useDarkModeContext } from "../../../contexts/DarkmodeContext";

const ProjectLeft = ({
  problems,
  currentIndex,
  setCurrentIndex,
}: {
  problems: ProblemInfo[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const currentProblem = problems[currentIndex];

  useEffect(() => {
    console.log("문제 리스트가 업데이트됨", problems);
    setCurrentIndex(0);
  }, [problems, setCurrentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < problems.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <LeftPart>
      <div className={styles.container}>
        {currentProblem ? (
          <>
            <div className={styles.prob}>
              <div className={styles.prob_title}>{currentProblem.title}</div>
              <div className={styles.prob_content}>
                {currentProblem.description}
              </div>
            </div>

            <div className={styles.button_group}>
              <Button
                onClick={handlePrev}
                variant="none"
                disabled={currentIndex === 0}
              >
                이전
              </Button>
              <Button
                onClick={handleNext}
                variant="none"
                disabled={currentIndex === problems.length - 1}
              >
                다음
              </Button>
            </div>
          </>
        ) : (
          <p>문제를 불러오는 중입니다...</p>
        )}
      </div>
    </LeftPart>
  );
};

export default ProjectLeft;
