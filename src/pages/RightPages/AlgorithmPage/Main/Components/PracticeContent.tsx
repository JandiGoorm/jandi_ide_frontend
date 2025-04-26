import styles from "./PracticeContent.module.css";
import { FaMedal } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Button from "../../../../../components/Button/Button";
import { ProblemInfo, Problems } from "../../../../../constants/types/types";
import useProblems from "../../../../../hooks/useProblems";
import { getMedalColor } from "../../../../../utils/medal";
import usePagination from "../../../../../hooks/usePagination";
import Pagination from "../../../../../components/Pagination/Pagination";
import { useEffect, useState } from "react";

interface PracticeContentProps {
  selectedProblems: Problems[];
  setSelectedProblems: React.Dispatch<React.SetStateAction<Problems[]>>;
}

const PracticeContent: React.FC<PracticeContentProps> = ({
  selectedProblems,
  setSelectedProblems,
}) => {
  const { getProblems } = useProblems();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const [problems, setProblems] = useState<ProblemInfo[]>([]);

  const toggleProblem = (problem: Problems) => {
    const exists = selectedProblems.find((p) => p.id === problem.id);
    if (exists) {
      setSelectedProblems(selectedProblems.filter((p) => p.id !== problem.id));
    } else {
      setSelectedProblems((prev) => [...prev, problem]);
    }
  };

  useEffect(() => {
    const fetchProblems = async (page: number) => {
      const data = await getProblems(page);
      setTotalPage(data.totalPages);
      setProblems(data.data);
    };
    fetchProblems(currentPage - 1);
  }, [getProblems, currentPage, setTotalPage]);

  return (
    <div className={styles.container}>
      <div className={styles.selected_box}>
        <div className={styles.header}>선택된 문제</div>
        <div className={styles.content_box}>
          {selectedProblems.map((problem) => (
            <div className={styles.problem} key={problem.id}>
              <Button variant="none" onClick={() => toggleProblem(problem)}>
                <MdClose size={18} />
              </Button>
              <FaMedal
                color={getMedalColor(problem.level)}
                size={18}
                style={{ flexShrink: 0, minWidth: 18 }}
              />
              <span className={styles.desc}>{problem.title}</span>
              <div className={styles.tag_box}>
                {problem.tags.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.select_box}>
        <div className={styles.header}>문제 리스트</div>
        <div className={styles.content_box}>
          {problems
            // .filter(
            //   (problem) => !selectedProblems.some((p) => p.id === problem.id)
            // ) // 선택된 문제 제외
            .map((problem) => (
              <div className={styles.problem} key={problem.id}>
                <Button variant="none" onClick={() => toggleProblem(problem)}>
                  {selectedProblems.some((p) => p.id === problem.id) ? (
                    <MdClose size={18} />
                  ) : (
                    <FaPlus size={18} />
                  )}
                </Button>
                <div>
                  <FaMedal
                    color={getMedalColor(problem.level)}
                    size={18}
                    style={{ flexShrink: 0, minWidth: 18 }}
                  />
                </div>
                <span className={styles.desc}>{problem.title}</span>
                <div className={styles.tag_box}>
                  {problem.tags.map((tag, index) => (
                    <div key={index} className={styles.tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            callback={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeContent;
