import { useCallback } from "react";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

//알고리즘 문제, 문제집 관리 hooks
const useProblems = () => {
  const { fetchData: getApi } = useAxios();
  const { fetchData: getaApi } = useAxios();

  const getProblems = useCallback(
    async (page: number) => {
      const res = await getApi({
        method: "GET",
        url: APIEndPoints.ALL_PROBLEMS,
        params: {
          page: page,
          size: 10,
        },
      });

      return res?.data;
    },
    [getApi]
  );

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

  return {
    getProblems,

    getaProblemsInfo,
  };
};

export default useProblems;
