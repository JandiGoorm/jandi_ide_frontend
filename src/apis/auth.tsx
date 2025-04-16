import { APIEndPoints } from "../constants/api";
import axiosInstance from "./axiosInstance";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

const login = async (code: string): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post(APIEndPoints.LOGIN, {
      code: code,
    });

    if (!data.accessToken) {
      throw new Error("로그인 실패");
    }
    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch {
    throw new Error("로그인 오류");
  }
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { data } = await axiosInstance.post(APIEndPoints.REFRESH, {
      refreshToken: refreshToken,
    });

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch {
    throw new Error("토큰 리프레시 오류");
  }
};

const getUserInfo = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("AccessToken이 없습니다");

    const data = await axiosInstance.get(APIEndPoints.MY_INFO);

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("유저 정보 가져오기 오류");
  }
};

const AuthService = {
  login,
  refreshAccessToken,
  getUserInfo,
};

export default AuthService;
