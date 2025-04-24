import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AlgorithmBox.module.css";
import LangTag from "../../../../LeftPages/Mainpage/components/LangTag";
import Button from "../../../../../components/Button/Button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "../../../../../components/Dropdown/Dropdown";
import { MdMoreVert } from "react-icons/md";
import useProblems from "../../../../../hooks/useProblems";
import { ProblemInfo } from "../../../../../constants/types/types";
import { FaMedal } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "../../../../../components/Modal/Modal";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import useBaskets from "../../../../../hooks/useBaskets";
import ModifyBaksket from "../Contents/ModifyBaksket";
import { getMedalColor } from "../../../../../utils/medal";

interface AlgorithmBoxProps {
  id: number;
  title: string;
  problems: number[];
  duration: number;
  problemCount: number;
  lang: string;
}

export default function AlgorithmBox({
  id,
  title,
  problems,
  duration,
  problemCount,
  lang,
}: AlgorithmBoxProps) {
  const navigate = useNavigate();
  const { getaProblemsInfo } = useProblems();
  const dropdownRef = useRef<{ close: () => void }>(null);
  const [problemInfos, setProblemInfos] = useState<ProblemInfo[]>([]);
  const { deleteBaskets } = useBaskets();

  const handleClick = () => navigate(`/mypage/problem/${id}`);

  const deleteClick = async () => {
    await deleteBaskets(id).then(() => {
      dropdownRef.current?.close();
    });
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await getaProblemsInfo(problems); // problems: number[]
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
          <Modal>
            <Dropdown dropdownRef={dropdownRef}>
              <DropdownTrigger>
                <Button variant="none" size="sm">
                  <MdMoreVert size={24} />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <div
                  className={styles.dropdown_content}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ModalTrigger
                    onOpen={() => {
                      if (
                        dropdownRef.current &&
                        typeof dropdownRef.current.close === "function"
                      ) {
                        dropdownRef.current.close();
                      }
                    }}
                  >
                    <div className={styles.dropdown_menu}>
                      <LuPencilLine /> 문제바구니 수정
                    </div>
                  </ModalTrigger>
                  <div className={styles.dropdown_menu} onClick={deleteClick}>
                    <LuTrash2 /> 문제바구니 삭제
                  </div>
                </div>
              </DropdownContent>
            </Dropdown>
            <ModalContent>
              <ModifyBaksket id={id} title={title} />
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
