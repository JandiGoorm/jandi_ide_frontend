import { useCallback, useEffect, useState } from "react";
import { Problems } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

//알고리즘 문제, 문제집 관리 hooks
const useProblems = () => {
  const [problems, setProblems] = useState<Problems[]>([]);
  const { fetchData: getApi } = useAxios();
  const { fetchData: getaApi } = useAxios();

  const getAllProblems = useCallback(async () => {
    await getApi({
      method: "GET",
      url: APIEndPoints.ALL_PROBLEMS,
    }).then((res) => {
      setProblems(res?.data.data);
    });
  }, [getApi]);

  const getaProblemsInfo = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.all(
          ids.map((id) =>
            getaApi({
              method: "GET",
              url: buildPath(APIEndPoints.PROBLEM, { id }),
            }).then((res) => res?.data)
          )
        );
        return results;
      } catch (err) {
        console.error("문제 정보 가져오기 실패:", err);
        return [];
      }
    },
    [getaApi]
  );

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  return {
    problems,
    getAllProblems,

    getaProblemsInfo,
  };
};

export default useProblems;
