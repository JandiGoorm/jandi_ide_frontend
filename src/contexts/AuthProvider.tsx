import { ReactNode, useEffect, useState } from "react";
import AuthService from "../apis/auth";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../constants/api";

interface AuthProviderProps {
  children: ReactNode;
}

export type UserRole = "ADMIN" | "USER";

interface User {
  id: number;
  githubId: string;
  profileImage: string;
  introduction: string;
  email: string;
  nickName: string;
  githubUsername: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { login, getUserInfo } = AuthService;

  const signIn = async (code: string) => {
    try {
      const token = await login(code);

      // 토큰 저장
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);

      // 유저 정보 요청
      const userInfo = await getUserInfo();
      setUser(userInfo.data);

      if (userInfo.data?.introduction == null) {
        console.log("신규 회원!");
        navigate(`${PageEndPoints.LOGIN_LANGUAGE}`);
      } else {
        console.log("기존 회원!");
        navigate(`${PageEndPoints.HOME}`);
      }
    } catch (err) {
      console.error("OAuth 로그인 에러", err);
    }
  };

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const refreshTokenRequest = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken && !refreshToken) return;

      console.log("로그인되어있음");
      const userInfo = await getUserInfo();
      setUser(userInfo.data);
    };

    refreshTokenRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
