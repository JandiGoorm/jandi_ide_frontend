import { useCallback, useEffect, useState } from "react";
import useAxios from "./useAxios";
import { APIEndPoints } from "../constants/api";
import { Techs } from "../constants/types/types";

const useTech = () => {
  const { fetchData: getApi } = useAxios();
  const [techs, setTechs] = useState<Techs[]>([]);

  const getTechs = useCallback(async () => {
    await getApi({
      method: "GET",
      url: APIEndPoints.STACK,
    }).then((res) => {
      setTechs(res?.data);
    });
  }, [getApi]);

  useEffect(() => {
    getTechs();
  }, [getTechs]);

  return {
    techs,
    getTechs,
  };
};

export default useTech;
