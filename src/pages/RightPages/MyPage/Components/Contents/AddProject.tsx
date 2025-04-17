import styles from "./AddProject.module.css";
import Input from "../../../../../components/Input/Input";
import Select, { SelectRef } from "../../../../../components/Select/Select";
import Button from "../../../../../components/Button/Button";
import { User } from "../../../../../constants/types/types";
import { useEffect, useState, useRef } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { buildPath } from "../../../../../utils/buildPath";
import { APIEndPoints } from "../../../../../constants/api";

interface AddProjectProps {
  user: User | null;
}

const AddProject: React.FC<AddProjectProps> = ({ user }) => {
  const id = user?.id;
  const { fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const [repo, setRepo] = useState<string[]>([]);
  const [repoMap, setRepoMap] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<SelectRef>(null);

  useEffect(() => {
    if (!id) return;

    getApi({
      method: "GET",
      url: buildPath(APIEndPoints.GIT_REPO, { id }),
    })
      .then((res) => {
        const repoNames: string[] = [];
        const repoMap: Record<string, string> = {};

        res?.data.forEach((repo: { name: string; htmlUrl: string }) => {
          repoNames.push(repo.name);
          repoMap[repo.name] = repo.htmlUrl;
        });

        setRepo(repoNames);
        setRepoMap(repoMap);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, getApi]);

  const handleSubmit = () => {
    console.log("버튼클릭");
    const projectName = nameRef.current?.value.trim();
    const description = descRef.current?.value.trim();
    const selectedRepo = selectRef.current?.value;
    const selectedHtmlUrl = selectedRepo ? repoMap[selectedRepo] : undefined;

    if (!projectName || !selectedRepo || !description) {
      //toast 추가
      return;
    }

    postApi({
      method: "POST",
      url: APIEndPoints.ADD_PROJECT,
      data: {
        name: projectName,
        description: description,
        githubName: selectedRepo,
        url: selectedHtmlUrl,
      },
    }).then((res) => {
      console.log(res);
    });
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
