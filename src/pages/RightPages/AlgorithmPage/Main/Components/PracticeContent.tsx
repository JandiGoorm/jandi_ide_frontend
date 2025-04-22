import styles from "./PracticeContent.module.css";
import { FaMedal } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Button from "../../../../../components/Button/Button";
import { useState } from "react";
import { Problems } from "../../../../../constants/types/types";
import useProblems from "../../../../../hooks/useProblems";

const PracticeContent = () => {
  const [selected, setSelected] = useState<Problems[]>([]);
  const { problems } = useProblems();

  console.log(problems);
  const getMedalColor = (level: number) => {
    switch (level) {
      case 4:
        return "#27E2A4";
      case 3:
        return "#FFD700";
      case 2:
        return "#C0C0C0";
      case 1:
        return "#CD7F32";
      default:
        return "#b73d3d";
    }
  };
  const toggleProblem = (problem: Problems) => {
    const exists = selected.find((p) => p.id === problem.id);
    if (exists) {
      setSelected(selected.filter((p) => p.id !== problem.id));
    } else {
      setSelected((prev) => [...prev, problem]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.selected_box}>
        <div className={styles.header}>선택된 문제</div>
        <div className={styles.content_box}>
          {selected.map((problem) => (
            <div className={styles.problem} key={problem.id}>
              <Button variant="none" onClick={() => toggleProblem(problem)}>
                <MdClose size={18} />
              </Button>
              <FaMedal color={getMedalColor(problem.level)} />
              <span className={styles.desc}>{problem.description}</span>
              {problem.tags.map((tag) => (
                <div className={styles.tag}>{tag}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.select_box}>
        <div className={styles.header}>문제 리스트</div>
        <div className={styles.content_box}>
          {problems.map((problem) => (
            <div className={styles.problem} key={problem.id}>
              <Button variant="none" onClick={() => toggleProblem(problem)}>
                <FaPlus size={18} />
              </Button>
              <FaMedal color={getMedalColor(problem.level)} />
              <span className={styles.desc}>{problem.description}</span>
              <div className={styles.tag_box}>
                {problem.tags.map((tag) => (
                  <div className={styles.tag}>{tag}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeContent;
