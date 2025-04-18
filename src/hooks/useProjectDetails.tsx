import { useCallback, useEffect, useState } from "react";
import { ProjectInfo, Tree } from "../constants/types/types";
import useAxios from "./useAxios";
import { buildPath } from "../utils/buildPath";
import { APIEndPoints } from "../constants/api";

//프로젝트 디테일 관리 hooks
const useProjectDetails = ({ id }: { id: number }) => {
  const [projectDetail, setProjectDetail] = useState<ProjectInfo[]>([]);
  const [projectFileTree, setProjectFileTree] = useState<Tree[]>([]);
  const [fileContent, setFileContent] = useState<string>();
  const { fetchData: getCodeApi } = useAxios();
  const { fetchData: getDetailApi } = useAxios();

  const getProjectDetail = useCallback(async () => {
    if (!id) return;

    await getDetailApi({
      method: "GET",
      url: buildPath(APIEndPoints.MANAGE_PROJECT, { id }),
    }).then((res) => {
      setProjectDetail(res?.data);
      setProjectFileTree(res?.data.tree);
    });
  }, [getDetailApi]);

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
    [getCodeApi]
  );

  useEffect(() => {
    getProjectDetail();
  }, [getProjectDetail]);

  return {
    projectDetail,
    projectFileTree,
    getProjectDetail,
    fileContent,
    getProjectCode,
  };
};

export default useProjectDetails;
