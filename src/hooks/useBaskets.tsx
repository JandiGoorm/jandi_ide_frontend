import { useCallback } from "react";
import { BasketBody, ModifyBasketData } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

//알고리즘 문제, 문제집 관리 hooks
const useBaskets = () => {
  const { fetchData: getApi } = useAxios();
  const { fetchData: getaApi } = useAxios();
  const { fetchData: postCompanyApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: putApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const getAllBaskets = useCallback(
    async (page: number, size: number) => {
      const res = await getApi({
        method: "GET",
        url: APIEndPoints.BASKETS,
        params: {
          page: page,
          size: size,
        },
      });
      if (res?.data) {
        return res.data;
      }
      return null;
    },
    [getApi]
  );

  const getBasket = useCallback(
    async (id: number) => {
      if (!id) return;

      const res = await getaApi({
        method: "GET",
        url: buildPath(APIEndPoints.MANAGE_BASKETS, { id }),
      });
      if (res) {
        return res.data;
      }
      return null;
    },
    [getaApi]
  );

  const addCompanyBaskets = useCallback(
    async (data: BasketBody) => {
      console.log(data);
      const res = await postCompanyApi({
        method: "POST",
        url: APIEndPoints.BASKETS,
        data: {
          minutes: data.minutes,
          title: data.title,
          companyName: data.companyName,
          isCompanyProb: data.isCompanyProb,
          language: data.language,
        },
      });
      return res?.data.id;
    },
    [postCompanyApi]
  );

  const addBaskets = useCallback(
    async (data: BasketBody) => {
      console.log(data);
      const res = await postApi({
        method: "POST",
        url: APIEndPoints.BASKETS,
        data: {
          problemIds: data.problemIds,
          minutes: data.minutes,
          title: data.title,
          companyName: data.companyName,
          isCompanyProb: data.isCompanyProb,
          language: data.language,
        },
      });
      return res?.data.id;
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
    },
    [putApi]
  );

  const deleteBaskets = useCallback(
    async (basketId: number) => {
      if (!basketId) return;

      deleteApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.MANAGE_BASKETS, { id: basketId }),
      });
    },
    [deleteApi]
  );

  return {
    getAllBaskets,
    getBasket,
    addCompanyBaskets,
    addBaskets,
    modifyBaskets,
    deleteBaskets,
  };
};

export default useBaskets;
