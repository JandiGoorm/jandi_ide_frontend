import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallbackPage = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const base_url = import.meta.env.VITE_BASE_URL;

    if (code) {
      // 백엔드에 code 전달
      console.log(code);
      axios
        .post(`${base_url}/users/login`, { code })
        .then((res) => {
          // 로그인 성공 처리 (e.g. 토큰 저장, 페이지 이동)
          localStorage.setItem("token", res.data.token);
          console.log(res);
          navigate("/mypage/setting");
          // 만약 신규 회원이라면 회원가입 진행
          // navigate("/register/language");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return <div>로그인 중입니다...</div>;
};

export default OAuthCallbackPage;
