import axios from "axios";
import { APIEndPoints } from "../constants/api";
import AuthService from "./auth";

const { refreshAccessToken } = AuthService;

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
  `PUT:${APIEndPoints.MANAGE_PROJECT}`,
  `DELETE:${APIEndPoints.MANAGE_PROJECT}`,
  `GET:${APIEndPoints.PROJECT_BLOB}`,
  `PUT:${APIEndPoints.MODIFY_PROFILE}`,
  `GET:${APIEndPoints.COMPANY}`,
  `GET:${APIEndPoints.MANAGE_COMPANY}`,
  `POST:${APIEndPoints.COMPANY_POSTING}`,
  `GET:${APIEndPoints.ALL_CHATROOMS}`,
  `GET:${APIEndPoints.CHATROOM_MANAGE}`,
  `POST:${APIEndPoints.CHATROOM_JOIN}`,
  `POST:${APIEndPoints.CHATROOM_LEAVE}`,
  `POST:${APIEndPoints.CHATROOM_PARTICIPANTS}`,
  `GET:${APIEndPoints.CHAT_MESSAGE}`,
  `GET:${APIEndPoints.CHAT_MESSAGE_PAGE}`,
  `GET:${APIEndPoints.SCHEDULES}`,
  `GET:${APIEndPoints.ALL_PROBLEMS}`,
  `GET:${APIEndPoints.BASKETS}`,
  `POST:${APIEndPoints.BASKETS}`,
  `GET:${APIEndPoints.PROBLEM}`,
  `PUT:${APIEndPoints.FAVORITE_STACK}`,
  `POST:${APIEndPoints.FAVORITE_COMPANY}`,
  `PUT:${APIEndPoints.MANAGE_BASKETS}`,
  `DELETE:${APIEndPoints.MANAGE_BASKETS}`,
  `GET:${APIEndPoints.MANAGE_BASKETS}`,
]);

axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  const url = config.url ?? "";

  const normalizedUrl = url.replace(/\/\d+(?=\/|$)/g, "/:id");

  const requestKey = `${method}:${normalizedUrl}`;
  const isRequiredAuth = useHeaderEndPoints.has(requestKey);

  if (isRequiredAuth) {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (
      err.response.status === 401 &&
      err.config.url !== APIEndPoints.REFRESH
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const response = await refreshAccessToken(refreshToken);

        if (!response.accessToken || !response.refreshToken) {
          return Promise.reject("리프레쉬 토큰으로 액세스토큰 재발행 실패");
        }

        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        err.config.headers["Authorization"] = `Bearer ${response.accessToken}`;

        return axios.request(err.config);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
