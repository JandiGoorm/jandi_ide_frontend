import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectBox.module.css";
import LangTag from "../../../../LeftPages/Mainpage/components/LangTag";

//icons
import { MdMoreVert } from "react-icons/md";

interface ProjectBoxProps {
  id: number;
  title: string;
  contents: string;
  lang: string;
}

export default function ProjectBox({
  id,
  title,
  contents,
  lang,
}: ProjectBoxProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => navigate(`/mypage/project/${id}`);
  const handleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.project_item} onClick={handleClick}>
      {/* 상단 - 제목 */}
      <h2 className={styles.title}>{title}</h2>

      {/* 중간 - 내용 */}
      <p className={styles.contents}>{contents}</p>

      {/* 하단 - 언어태그, 더보기 버튼 */}
      <div className={styles.footer}>
        <LangTag langList={[lang]} />
        <button onClick={handleMenu}>
          <MdMoreVert />
        </button>
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
