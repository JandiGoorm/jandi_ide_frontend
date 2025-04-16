import { useNavigate } from "react-router-dom";
import useEffectOnce from "../../../hooks/useEffectOnce";
import AuthService from "../../../apis/auth";
import { PageEndPoints } from "../../../constants/api";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { login, getUserInfo } = AuthService;

  useEffectOnce(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    const fetchLogin = async () => {
      if (code) {
        try {
          const data = await login(code);

          // 토큰 저장
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // 유저 정보 요청
          const userInfo = await getUserInfo();

          console.log(userInfo);

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
      }
    };

    fetchLogin();
  });

  return <div>로그인 중입니다...</div>;
};

export default OAuthCallbackPage;
