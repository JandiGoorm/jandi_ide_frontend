import { useCallback, useEffect, useState } from "react";
import { Problems } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";

const useProblems = () => {
  const [problems, setProblems] = useState<Problems[]>([]);
  const { fetchData: getApi } = useAxios();

  const getAllProblems = useCallback(async () => {
    await getApi({
      method: "GET",
      url: APIEndPoints.ALL_PROBLEMS,
    }).then((res) => {
      setProblems(res?.data);
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
