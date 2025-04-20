import useEffectOnce from "../../../hooks/useEffectOnce";
import { useAuth } from "../../../contexts/AuthContext";

const OAuthCallbackPage = () => {
  const { signIn } = useAuth();

  useEffectOnce(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    const fetchLogin = async () => {
      if (code) {
        try {
          await signIn(code);
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
