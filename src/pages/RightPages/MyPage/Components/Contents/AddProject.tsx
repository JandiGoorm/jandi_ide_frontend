import styles from "./AddProject.module.css";
import Input from "../../../../../components/Input/Input";
import Select from "../../../../../components/Select/Select";
import Button from "../../../../../components/Button/Button";
import { User } from "../../../../../constants/types/User";
// import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { buildPath } from "../../../../../utils/buildPath";
import { APIEndPoints } from "../../../../../constants/api";

interface AddProjectProps {
  user: User | null;
}

const AddProject: React.FC<AddProjectProps> = ({ user }) => {
  const id = user?.id;
  const { fetchData: getApi } = useAxios();
  const [repo, setRepo] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    getApi({
      method: "GET",
      url: buildPath(APIEndPoints.GIT_REPO, { id }),
    })
      .then((res) => {
        const repoNames = res?.data.map((repo: { name: string }) => repo.name);
        setRepo(repoNames);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, getApi]);
  return (
    <div className={styles.container}>
      <form className={styles.form_box}>
        <div className={styles.header}>프로젝트 불러오기</div>
        <div className={styles.content_box}>
          <div className={styles.content}>
            <div className={styles.name}>프로젝트 이름</div>
            <Input style={{ width: "100%" }} />
          </div>
          <div className={styles.content}>
            <div className={styles.name}>프로젝트 지정</div>
            <Select options={repo} defaultValue={repo[0] ?? ""} />
          </div>
          <div className={styles.content}>
            <div className={styles.name}>프로젝트 설명</div>
            <Input style={{ width: "100%" }} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Button type="submit">프로젝트 등록</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
