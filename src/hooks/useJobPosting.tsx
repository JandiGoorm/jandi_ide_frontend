import { useCallback, useState } from "react";
import useAxios from "./useAxios";
import { RecruitInfo } from "../constants/types/types";
import { APIEndPoints } from "../constants/api";

const useJobPosting = () => {
  const { fetchData: getApi } = useAxios();
  const [monthSchedules, setMonthSchedules] = useState<RecruitInfo[]>([]);

  const getMonth = useCallback(
    async (year: number, month: number) => {
      await getApi({
        method: "GET",
        url: APIEndPoints.SCHEDULES,
        params: {
          year: year,
          month: month,
        },
      }).then((res) => {
        setMonthSchedules(res?.data);
      });
    },
    [getApi]
  );

  return {
    monthSchedules,
    getMonth,
  };
};

export default useJobPosting;
