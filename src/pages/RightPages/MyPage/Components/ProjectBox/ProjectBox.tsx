import { useNavigate } from "react-router-dom";
import styles from "./ProjectBox.module.css";
import LangTag from "../../../../LeftPages/Mainpage/components/LangTag";
import Button from "../../../../../components/Button/Button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "../../../../../components/Dropdown/Dropdown";

//icons
import { MdMoreVert } from "react-icons/md";
import DropDownMenu from "../Contents/DropdownMenu";
import { PageEndPoints } from "../../../../../constants/api";
import { buildPath } from "../../../../../utils/buildPath";

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

  const handleClick = () =>
    navigate(buildPath(PageEndPoints.GITHUB_PROJECT, { id }));

  return (
    <div className={styles.project_item} onClick={handleClick}>
      {/* 상단 - 제목 */}
      <h2 className={styles.title}>{title}</h2>

      {/* 중간 - 내용 */}
      <p className={styles.contents}>{contents}</p>

      {/* 하단 - 언어태그, 더보기 버튼 */}
      <div className={styles.footer}>
        <LangTag langList={[lang]} />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="none" size="sm">
              <MdMoreVert size={24} />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropDownMenu menu="프로젝트" />
          </DropdownContent>
        </Dropdown>
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
