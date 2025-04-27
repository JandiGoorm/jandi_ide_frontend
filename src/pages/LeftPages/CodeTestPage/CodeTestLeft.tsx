import React, { useEffect } from "react";
import { ProblemInfo } from "../../../constants/types/types";
import LeftPart from "../../../layouts/Components/LeftPart";
import styles from "./CodeTestLeft.module.css";
import Button from "../../../components/Button/Button";
import { FaMedal } from "react-icons/fa";
import { getMedalColor } from "../../../utils/medal";

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

  // console.log(currentProblem);

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

  if (!currentProblem) return null;
  const arr = currentProblem.description.split("\n");

  return (
    <LeftPart>
      <div className={styles.container}>
        {currentProblem ? (
          <>
            <div className={styles.prob}>
              <div className={styles.prob_title}>
                {currentProblem.title}
                <FaMedal
                  color={getMedalColor(currentProblem.level)}
                  size="1.25rem"
                />
              </div>
              <div className={styles.prob_content}>
                {arr.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
            <div className={styles.prob_reuirement}>
              <p>메모리제한:{currentProblem.memory}MB</p>
              <p>시간제한:{currentProblem.timeLimit}초</p>
            </div>
            <div className={styles.prob_reuirement}>
              <div className={styles.prob_title}>테스트 케이스</div>
              {currentProblem.testCases.map((testcase) => (
                <div className={styles.testcase_card} key={testcase.id}>
                  <div>입력값</div>
                  <div className={styles.case_input}>
                    {testcase.input.split("\n").map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                  <div>출력값</div>
                  <div className={styles.case_input}>
                    {testcase.output.split("\n").map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
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
