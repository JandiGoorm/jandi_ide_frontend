import { useCallback, useEffect, useState } from "react";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { Company } from "../constants/types/types";
import { buildPath } from "../utils/buildPath";

const useCompany = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { fetchData: getApi } = useAxios();

  const getCompanies = useCallback(async () => {
    await getApi({
      method: "GET",
      url: APIEndPoints.COMPANY,
    }).then((res) => {
      setCompanies(res?.data);
    });
  }, [getApi]);

  const getCompany = useCallback(
    async (id: number) => {
      const res = await getApi({
        method: "GET",
        url: buildPath(APIEndPoints.MANAGE_COMPANY, { id: id }),
      });

      console.log(res?.data);

      return res?.data;
    },
    [getApi]
  );

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return {
    companies,
    getCompanies,

    getCompany,
  };
};

export default useCompany;
