import { useCallback, useEffect, useState } from "react";
import { Problems } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";

//알고리즘 문제, 문제집 관리 hooks
const useProblems = () => {
  const [problems, setProblems] = useState<Problems[]>([]);
  const { fetchData: getApi } = useAxios();

  const getAllProblems = useCallback(async () => {
    await getApi({
      method: "GET",
      url: APIEndPoints.ALL_PROBLEMS,
    }).then((res) => {
      setProblems(res?.data.data);
    });
  }, [getApi]);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  return {
    problems,
    getAllProblems,
  };
};

export default useProblems;
