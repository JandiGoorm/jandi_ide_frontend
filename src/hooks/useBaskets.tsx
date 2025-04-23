import { useCallback } from "react";
import { BasketBody, ModifyBasketData } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

//알고리즘 문제, 문제집 관리 hooks
const useBaskets = () => {
  const { fetchData: getApi } = useAxios();
  const { fetchData: postCompanyApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: putApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const getAllBaskets = useCallback(async () => {
    const res = await getApi({
      method: "GET",
      url: APIEndPoints.BASKETS,
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
        url: APIEndPoints.BASKETS,
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
        url: APIEndPoints.BASKETS,
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

  const modifyBaskets = useCallback(
    async (basketId: number, data: ModifyBasketData) => {
      if (!basketId) return;

      putApi({
        method: "PUT",
        url: buildPath(APIEndPoints.MANAGE_BASKETS, { id: basketId }),
        data: {
          title: data.title,
        },
      });

      await getAllBaskets();
    },
    []
  );

  const deleteBaskets = useCallback(
    async (basketId: number) => {
      if (!basketId) return;

      deleteApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.MANAGE_BASKETS, { id: basketId }),
      });

      await getAllBaskets();
    },
    [deleteApi]
  );

  return {
    getAllBaskets,
    addCompanyBaskets,
    addBaskets,
    modifyBaskets,
    deleteBaskets,
  };
};

export default useBaskets;
