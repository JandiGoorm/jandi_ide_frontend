import { useCallback, useEffect, useState } from "react";
import { Project } from "../constants/types/types";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "./useAxios";
import { buildPath } from "../utils/buildPath";
import { APIEndPoints } from "../constants/api";
import { ProjectData } from "../constants/types/types";

//프로젝트 관리 hooks
const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useAuth();
  const { fetchData: getApi } = useAxios();
  const { fetchData: getRepoApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const id = user?.id;

  const getProjects = useCallback(async () => {
    if (!id) return;

    await getApi({
      method: "GET",
      url: buildPath(APIEndPoints.MY_PROJECT, { id }),
    }).then((res) => {
      setProjects(res?.data);
    });
  }, [getApi]);

  const addProjects = useCallback(async (data: ProjectData) => {
    await postApi({
      method: "POST",
      url: APIEndPoints.ADD_PROJECT,
      data: {
        name: data.projectName,
        description: data.description,
        githubName: data.selectedRepo,
        url: data.selectedHtmlUrl,
      },
    }).then(() => {
      getProjects();
    });
  }, []);

  const getRepoProjects = useCallback(async () => {
    if (!id) return;

    const res = await getRepoApi({
      method: "GET",
      url: buildPath(APIEndPoints.GIT_REPO, { id }),
    });

    return res?.data;
  }, [getRepoApi]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return {
    projects,
    getProjects,
    addProjects,

    getRepoProjects,
  };
};

export default useProjects;
