import { useCallback } from "react";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { CompilerBody } from "../constants/types/types";

type SubmitData = {
  userId: number;
  problemSetId: number;
  language: string;
  solvingTime: number;
  codes: {
    problemId: number;
    code: string;
  }[];
};

const useCodeTest = () => {
  const { fetchData: postApi } = useAxios();
  const { fetchData: postResultApi } = useAxios();

  const getResult = useCallback(
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

  const getSubmitResult = useCallback(
    async (data: SubmitData) => {
      // console.log("sssss"+data);
      try {
        for (const codeItem of data.codes) {
          const { problemId, code } = codeItem;

          const form = {
            userId: data.userId,
            problemId: problemId,
            code: code,
            problemSetId: data.problemSetId,
            language: data.language,
            solvingTime: data.solvingTime,
          };
          const result = await getResult(form);

          // console.log("문제결과"+result);
          // 예: 결과 저장 로직
          const resultform = {
            userId: data.userId,
            problemId: problemId,
            problemSetId: data.problemSetId,
            code: code,
            language: data.language,
            isCorrect: result.isCorrect ? result.isCorrect : false,
            solvingTime: data.solvingTime,
            additionalInfo: result.resultDetails
              ? result.resultDetails
              : result.errorDetails,
            memoryUsage: result.memoryUsage ? result.memoryUsage : 0,
            executionTime: result.executionTime ? result.executionTime : 0,
            status: result.status === "CORRECT" ? result.status : result.error,
            description: "",
          };

          console.log(resultform);

          await postResultApi({
            method: "POST",
            url: APIEndPoints.SUBMIT_CODE,
            data: {
              userId: data.userId,
              problemId: problemId,
              problemSetId: data.problemSetId,
              code: code,
              language: data.language,
              isCorrect: result.isCorrect ? result.isCorrect : false,
              solvingTime: data.solvingTime,
              additionalInfo: "",
              memoryUsage: result.memoryUsage ? result.memoryUsage : 0,
              executionTime: result.executionTime ? result.executionTime : 0,
              status:
                result.status === "CORRECT" ? result.status : result.error,
              description: "",
            },
          });
        }
        // 모든 처리 후 후속 작업
        console.log("모든 문제 처리 완료");
      } catch (error) {
        console.error("제출 처리 중 에러 발생:", error);
      }
    },
    [getResult, postResultApi]
  );

  return {
    getResult,
    getSubmitResult,
  };
};

export default useCodeTest;
