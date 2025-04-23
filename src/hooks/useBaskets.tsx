import { useCallback } from "react";
import { BasketBody } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";

//알고리즘 문제, 문제집 관리 hooks
const useBaskets = () => {
  const { fetchData: getApi } = useAxios();
  const { fetchData: postCompanyApi } = useAxios();
  const { fetchData: postApi } = useAxios();

  const getAllBaskets = useCallback(async () => {
    const res = await getApi({
      method: "GET",
      url: APIEndPoints.MANAGE_BASKETS,
    });
    if (res?.data) {
      return res.data;
    }
    return null;
  }, [getApi]);

  const addCompanyBaskets = useCallback(
    async (data: BasketBody) => {
      await postCompanyApi({
        method: "POST",
        url: APIEndPoints.MANAGE_BASKETS,
        data: {
          minutes: data.minutes,
          title: data.title,
          companyName: data.companyName,
          isCompanyProb: data.isCompanyProb,
        },
      });
    },
    [postApi]
  );

  const addBaskets = useCallback(
    async (data: BasketBody) => {
      await postApi({
        method: "POST",
        url: APIEndPoints.MANAGE_BASKETS,
        data: {
          problemIds: data.problemIds,
          minutes: data.minutes,
          title: data.title,
          companyName: data.companyName,
          isCompanyProb: data.isCompanyProb,
        },
      });
    },
    [postApi]
  );

  return {
    getAllBaskets,
    addCompanyBaskets,
    addBaskets,
  };
};

export default useBaskets;
