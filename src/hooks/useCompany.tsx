import { useCallback, useEffect, useState } from "react";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { Company } from "../constants/types/types";

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

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return {
    companies,
    getCompanies,
  };
};

export default useCompany;
