import axios from "axios";
import { APIEndPoints } from "../constants/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const useHeaderEndPoints = new Set([
  `GET:${APIEndPoints.MY_INFO}`,
  `GET:${APIEndPoints.GIT_REPO}`,
  `POST:${APIEndPoints.ADD_PROJECT}`,
  `GET:${APIEndPoints.MY_PROJECT}`,
  `GET:${APIEndPoints.MANAGE_PROJECT}`,
  `GET:${APIEndPoints.PROJECT_BLOB}`,
]);

axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  const url = config.url ?? "";

  const normalizedUrl = url.replace(/\/\d+(?=\/|$)/g, "/:id");

  const requestKey = `${method}:${normalizedUrl}`;
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
