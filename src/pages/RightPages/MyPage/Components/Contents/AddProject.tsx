import styles from "./AddProject.module.css";
import Input from "../../../../../components/Input/Input";
import Select, { SelectRef } from "../../../../../components/Select/Select";
import Button from "../../../../../components/Button/Button";
import { User } from "../../../../../constants/types/types";
import { useEffect, useState, useRef } from "react";
import useProjects from "../../../../../hooks/useprojects";
import { ProjectData } from "../../../../../constants/types/types";

interface AddProjectProps {
  user: User | null;
  onAddProject?: () => void;
}

const AddProject: React.FC<AddProjectProps> = ({ user, onAddProject }) => {
  const id = user?.id;
  const { getRepoProjects, addProjects } = useProjects();
  const [repo, setRepo] = useState<string[]>([]);
  const [repoMap, setRepoMap] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<SelectRef>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRepos = async () => {
      const res = await getRepoProjects();
      if (!res) return;

      const repoNames: string[] = [];
      const repoMap: Record<string, string> = {};

      res.forEach((repo: { name: string; htmlUrl: string }) => {
        repoNames.push(repo.name);
        repoMap[repo.name] = repo.htmlUrl;
      });

      setRepo(repoNames);
      setRepoMap(repoMap);
    };

    fetchRepos();
  }, [user, getRepoProjects]);

  const handleSubmit = async () => {
    const projectName = nameRef.current?.value.trim();
    const description = descRef.current?.value.trim();
    const selectedRepo = selectRef.current?.value;
    const selectedHtmlUrl = selectedRepo ? repoMap[selectedRepo] : "";

    if (!projectName || !selectedRepo || !description) {
      //toast 추가
      return;
    }

    const data: ProjectData = {
      projectName,
      description,
      selectedRepo,
      selectedHtmlUrl,
    };

    await addProjects(data);
    onAddProject?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>프로젝트 불러오기</div>
      <div className={styles.content_box}>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 이름</div>
          <Input style={{ width: "100%" }} ref={nameRef} />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 지정</div>
          <Select options={repo} defaultValue={repo[0] ?? ""} ref={selectRef} />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>프로젝트 설명</div>
          <Input style={{ width: "100%" }} ref={descRef} />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="submit" onClick={handleSubmit}>
          프로젝트 등록
        </Button>
      </div>
    </div>
  );
};

export default AddProject;
