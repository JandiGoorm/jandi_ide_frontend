import { ReactNode, useEffect, useState } from "react";
import AuthService from "../apis/auth";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { PageEndPoints } from "../constants/api";
import { User } from "../constants/types/types";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, getUserInfo, refreshAccessToken } = AuthService;

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

      if (!accessToken && refreshToken) {
        try {
          const token = await refreshAccessToken(refreshToken);

          console.log(token);

          if (token?.accessToken) {
            localStorage.setItem("accessToken", token.accessToken);
            localStorage.setItem("refreshToken", token.refreshToken);

            const userInfo = await getUserInfo();
            setUser(userInfo.data);
          } else {
            throw new Error("새로운 accessToken을 받지 못함");
          }

          const redirectPath = location.state?.from;
          navigate(redirectPath, { replace: true });
        } catch (err) {
          console.error("토큰 갱신 실패:", err);
          signOut();
          navigate(PageEndPoints.LOGIN);
        }
      } else {
        console.log("로그인되어있음");
        const userInfo = await getUserInfo();
        setUser(userInfo.data);
      }
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
