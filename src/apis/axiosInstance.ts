import axios from "axios";
import { APIEndPoints } from "../constants/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const useHeaderEndPoints = new Set([`GET:${APIEndPoints.MY_INFO}`]);

axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  const url = config.url;
  const requestKey = `${method}:${url}`;

  const isRequiredAuth = useHeaderEndPoints.has(requestKey);

  console.log(isRequiredAuth);

  if (isRequiredAuth) {
    console.log("여기");
    const accessToken = localStorage.getItem("accessToken") ?? "";
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});
export default axiosInstance;
