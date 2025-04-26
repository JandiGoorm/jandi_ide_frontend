import { useNavigate } from "react-router-dom";
import styles from "./ProjectBox.module.css";
import Button from "../../../../../components/Button/Button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "../../../../../components/Dropdown/Dropdown";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { PageEndPoints } from "../../../../../constants/api";
import { buildPath } from "../../../../../utils/buildPath";
import { useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "../../../../../components/Modal/Modal";
import ModifyProject from "../Contents/ModifyProject";
import useProjects from "../../../../../hooks/useProjects";
import { useDarkModeContext } from "../../../../../contexts/DarkmodeContext";

interface ProjectBoxProps {
  id: number;
  title: string;
  contents: string;
  link: string;
  onAddProject?: () => void;
}

export default function ProjectBox({
  id,
  title,
  contents,
  link,
  onAddProject,
}: ProjectBoxProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<{ close: () => void }>(null);
  const { deleteProject } = useProjects();
  const { isDarkMode } = useDarkModeContext();

  const handleClick = () =>
    navigate(buildPath(PageEndPoints.GITHUB_PROJECT, { id }));

  const deleteClick = async () => {
    await deleteProject(id).then(() => {
      dropdownRef.current?.close();
      onAddProject?.();
    });
  };

  return (
    <div className={styles.project_item} onClick={handleClick}>
      {/* 상단 - 제목 */}
      <h2 className={styles.title}>{title}</h2>

      {/* 중간 - 내용 */}
      <p className={styles.contents}>{contents}</p>

      {/* 하단 - 언어태그, 더보기 버튼 */}
      <div className={styles.footer}>
        <img
          className={styles.github}
          src={isDarkMode ? "/github_icon_white.png" : "/github_icon_black.png"}
          onClick={() => window.open(link, "_blank")}
        />

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
                    <LuPencilLine /> 프로젝트 수정
                  </div>
                </ModalTrigger>
                <div className={styles.dropdown_menu} onClick={deleteClick}>
                  <LuTrash2 /> 프로젝트 삭제
                </div>
              </div>
            </DropdownContent>
          </Dropdown>
          <ModalContent>
            <ModifyProject
              id={id}
              name={title}
              description={contents}
              onAddProject={onAddProject}
            />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
