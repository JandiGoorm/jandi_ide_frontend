import axios from "axios";
import { APIEndPoints, PrefixEndpoints } from "../constants/api";
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
  `GET:${APIEndPoints.STACK}`,
  `GET:${APIEndPoints.FAVORITE_STACK}`,
  `PUT:${APIEndPoints.FAVORITE_STACK}`,
  `GET:${APIEndPoints.FAVORITE_COMPANY}`,
  `POST:${APIEndPoints.FAVORITE_COMPANY}`,
  `PUT:${APIEndPoints.MANAGE_BASKETS}`,
  `DELETE:${APIEndPoints.MANAGE_BASKETS}`,
  `GET:${APIEndPoints.MANAGE_BASKETS}`,
  `PUT:${APIEndPoints.FAVORITE_A_COMPANY}`,
  `DELETE:${APIEndPoints.FAVORITE_A_COMPANY}`,
  `POST:${APIEndPoints.COMPILER}`,
  `POST:${APIEndPoints.SUBMIT_CODE}`,
  `GET:${APIEndPoints.BASKET_CODE_RESULT}`,
  `GET:${APIEndPoints.CHATROOM_PARTICIPANTS}`,
  `GET:${PrefixEndpoints.CHATROOMS}`,
  `POST:${PrefixEndpoints.CHATROOMS}`,
  `DELETE:${APIEndPoints.DELETE_USER}`,
]);

axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  const url = config.url ?? "";
  if (!method || !url) return config;

  if (isProtectedUrl(url, method)) {
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

function isProtectedUrl(configUrl: string, method: string): boolean {
  for (const protectedEntry of useHeaderEndPoints) {
    const [protectedMethod, pattern] = protectedEntry.split(":");
    if (protectedMethod !== method) continue;
    if (configUrl.startsWith(pattern)) return true;

    const regexPattern = pattern.replace(/:\w+/g, "[^/]+");
    const regex = new RegExp(`^${regexPattern}$`);

    if (regex.test(configUrl)) return true;
  }

  return false;
}

export default axiosInstance;
