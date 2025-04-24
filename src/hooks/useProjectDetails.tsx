import { useCallback, useEffect, useState } from "react";
import { Tree } from "../constants/types/types";
import useAxios from "./useAxios";
import { buildPath } from "../utils/buildPath";
import { APIEndPoints } from "../constants/api";

//프로젝트 디테일 관리 hooks
const useProjectDetails = ({ id }: { id: number }) => {
  const [projectName, setProjectName] = useState<string>();
  const [projectFileTree, setProjectFileTree] = useState<Tree[]>([]);
  const [projectLink, setProjectLink] = useState<string>();
  const [fileContent, setFileContent] = useState<string>();
  const { fetchData: getCodeApi } = useAxios();
  const { fetchData: getDetailApi } = useAxios();

  const getProjectDetail = useCallback(async () => {
    if (!id) return;

    await getDetailApi({
      method: "GET",
      url: buildPath(APIEndPoints.MANAGE_PROJECT, { id }),
    }).then((res) => {
      console.log(res);
      setProjectName(res?.data.name);
      setProjectFileTree(res?.data.treeData.tree);
      setProjectLink(res?.data.treeData.url);
    });
  }, [getDetailApi, id]);

  const getProjectCode = useCallback(
    async ({ sha }: { sha: string }) => {
      if (!id) return;

      await getCodeApi({
        method: "GET",
        url: buildPath(APIEndPoints.PROJECT_BLOB, { id }),
        params: {
          sha: sha,
        },
      }).then((res) => {
        const encodedContent = res?.data.content;
        const encoding = res?.data.encoding;

        if (encoding === "base64" && encodedContent) {
          const decoded = atob(encodedContent);
          setFileContent(decoded);
        }
      });
    },
    [getCodeApi, id]
  );

  useEffect(() => {
    getProjectDetail();
  }, [getProjectDetail]);

  return {
    projectName,
    projectFileTree,
    projectLink,
    getProjectDetail,
    fileContent,
    getProjectCode,
  };
};

export default useProjectDetails;
