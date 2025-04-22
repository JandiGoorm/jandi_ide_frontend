import { useCallback, useState } from "react";
import { BasketBody, Baskets } from "../constants/types/types";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";

//알고리즘 문제, 문제집 관리 hooks
const useBaskets = () => {
  const [baskets, setBaskets] = useState<Baskets[]>([]);
  const { fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();

  const getAllBaskets = useCallback(async () => {
    await getApi({
      method: "GET",
      url: APIEndPoints.MANAGE_BASKETS,
    }).then((res) => {
      setBaskets(res?.data);
    });
  }, [getApi]);

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
    baskets,
    getAllBaskets,
    addBaskets,
  };
};

export default useBaskets;
