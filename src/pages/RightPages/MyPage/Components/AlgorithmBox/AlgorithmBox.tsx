import { useState } from "react";
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

interface AlgorithmBoxProps {
  id: number;
  title: string;
  problems: string[];
  duration: number;
  problemCount: number;
  lang: string;
  levelImg: string;
}

export default function AlgorithmBox({
  id,
  title,
  problems,
  duration,
  problemCount,
  lang,
  levelImg,
}: AlgorithmBoxProps) {
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);

  const handleClick = () => navigate(`/mypage/problem/${id}`);
  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

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
        {problems.map((prob, idx) => (
          <div key={idx} className={styles.problem}>
            <span>{prob}</span>
            <img src={levelImg} />
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
