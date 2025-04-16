import { useCallback, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 *
 * @returns {{
 *   loading: boolean,
 *   isSuccess: boolean,
 *   fetchData: (params?: Object) => Promise<void>;
 * }}
 */

type UseAxiosReturn = {
  loading: boolean;
  isSuccess: boolean;
  fetchData: (params: AxiosRequestConfig) => Promise<AxiosResponse | void>;
};

const useAxios = (): UseAxiosReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchData = useCallback(async (params: AxiosRequestConfig) => {
    setLoading(true);
    setIsSuccess(false);

    try {
      const res = await axiosInstance.request({
        ...params,
        headers: {
          ...params.headers,
        },
      });

      setIsSuccess(true);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, isSuccess, fetchData };
};

export default useAxios;
