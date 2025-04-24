import { useCallback } from "react";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { CompilerBody } from "../constants/types/types";

const useCodeTest = () => {
  const { fetchData: postApi } = useAxios();

  const getSubmitResult = useCallback(
    async (data: CompilerBody) => {
      console.log(data);
      const res = await postApi({
        method: "POST",
        url: APIEndPoints.COMPILER,
        data: {
          userId: data.userId,
          problemId: data.problemId,
          problemSetId: data.problemSetId,
          code: data.code,
          language: data.language,
          solvingTime: data.solvingTime,
        },
      });

      console.log(res);

      return res?.data;
    },
    [postApi]
  );

  return {
    getSubmitResult,
  };
};

export default useCodeTest;
