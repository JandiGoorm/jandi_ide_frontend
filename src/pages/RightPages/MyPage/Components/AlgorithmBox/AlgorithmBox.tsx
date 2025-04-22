import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AlgorithmBox.module.css";
import LangTag from "../../../../LeftPages/Mainpage/components/LangTag";
import Button from "../../../../../components/Button/Button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "../../../../../components/Dropdown/Dropdown";

//icons
import { BsPinAngle } from "react-icons/bs";
import { BsPinAngleFill } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";
import DropDownMenu from "../Contents/DropdownMenu";
import useProblems from "../../../../../hooks/useProblems";
import { ProblemInfo } from "../../../../../constants/types/types";
import { FaMedal } from "react-icons/fa";

interface AlgorithmBoxProps {
  id: number;
  title: string;
  problems: number[];
  duration: number;
  problemCount: number;
  lang: string;
}

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

export default function AlgorithmBox({
  id,
  title,
  problems,
  duration,
  problemCount,
  lang,
}: AlgorithmBoxProps) {
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);
  const { getaProblemsInfo } = useProblems();
  const [problemInfos, setProblemInfos] = useState<ProblemInfo[]>([]);

  const handleClick = () => navigate(`/mypage/problem/${id}`);
  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await getaProblemsInfo(problems); // problems: number[]
        console.log(res);
        setProblemInfos(res);
      } catch (err) {
        console.error("문제 정보를 가져오는 중 오류 발생:", err);
      }
    };

    fetchProblems();
  }, [problems, getaProblemsInfo]);

  return (
    <div className={styles.algorithm_item} onClick={handleClick}>
      {/* 상단 - 제목, 시간, 문제 */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.info}>
          {duration}분 / {problemCount}문제
        </p>
      </div>

      {/* 중간 - 문제 리스트 */}
      <div className={styles.problem_list}>
        {problemInfos.map((problemInfo) => (
          <div key={problemInfo.id} className={styles.problem}>
            <span>{problemInfo.title}</span>
            <FaMedal
              color={getMedalColor(problemInfo.level)}
              style={{ marginLeft: "0.3rem" }}
            />
          </div>
        ))}
      </div>

      {/* 하단 - 언어태그, 핀 버튼, 더보기 버튼 */}
      <div className={styles.footer}>
        <LangTag langList={[lang]} />
        <div className={styles.buttons}>
          <Button variant="none" size="sm" onClick={handlePin}>
            {isPinned ? <BsPinAngleFill size={24} /> : <BsPinAngle size={24} />}
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="none" size="sm">
                <MdMoreVert size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropDownMenu menu="문제집" />
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      {/* 더보기 버튼 처리 */}
      {/* {showMenu && (
            <div
            className={styles.drop_box}
            onClick={(e) => e.stopPropagation()}
            >
            <button className={styles.togle_btn}>문제집 수정</button>
            <button className={styles.togle_btn}>문제집 삭제</button>
            </div>
        )} */}
    </div>
  );
}
