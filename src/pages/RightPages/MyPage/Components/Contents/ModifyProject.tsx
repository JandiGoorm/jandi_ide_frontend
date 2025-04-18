import styles from "./AddProject.module.css";
import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";
import { useRef } from "react";
import { ModifyProjectData } from "../../../../../constants/types/types";
import useProjects from "../../../../../hooks/useprojects";

interface ModifyProjectProps {
  id: number;
  name: string;
  description: string;
  onAddProject?: () => void;
}

const ModifyProject: React.FC<ModifyProjectProps> = ({
  id,
  name,
  description,
  onAddProject,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const { modifyProject } = useProjects();

  const handleSubmit = async () => {
    const projectName = nameRef.current?.value.trim();
    const description = descRef.current?.value.trim();

    if (!projectName || !description) {
      //toast 추가
      return;
    }

    const data: ModifyProjectData = {
      projectName,
      description,
    };

    await modifyProject(id, data);
    onAddProject?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>프로젝트 수정</div>
      <div className={styles.content_box}>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 이름</div>
          <Input style={{ width: "100%" }} ref={nameRef} defaultValue={name} />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 설명</div>
          <Input
            style={{ width: "100%" }}
            ref={descRef}
            defaultValue={description}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="submit" onClick={handleSubmit}>
          프로젝트 수정
        </Button>
      </div>
    </div>
  );
};

export default ModifyProject;
