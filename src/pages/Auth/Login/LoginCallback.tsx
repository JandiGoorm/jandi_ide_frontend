import useEffectOnce from "../../../hooks/useEffectOnce";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../constants/api";

const OAuthCallbackPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffectOnce(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    const fetchLogin = async () => {
      if (code) {
        try {
          await signIn(code);
        } catch (err) {
          console.error("OAuth 로그인 에러", err);
          navigate(PageEndPoints.LOGIN);
        }
      }
    };

    fetchLogin();
  });

  return <div>로그인 중입니다...</div>;
};

export default OAuthCallbackPage;
