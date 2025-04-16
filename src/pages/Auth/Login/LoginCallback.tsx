import { useNavigate } from "react-router-dom";
import axios from "axios";
import useEffectOnce from "../../../hooks/useEffectOnce";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  useEffectOnce(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const base_url = import.meta.env.VITE_BASE_URL;

    if (code) {
      // 백엔드에 code를 전달해서 토큰 받아오기
      axios
        .post(`${base_url}/users/login`, { code })
        .then((res) => {
          // 받아온 토큰 localStorage에 저장
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          // accessToken으로 유저 정보 가져오기
          const accessToken = localStorage.getItem("accessToken");
          return axios
            .get(`${base_url}/users/me`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              console.log(res.data);

              // 현재 소개란이 공란인지로 체크하지만, 추후 선호 기업/언어 연결되면 그걸로 바꿀 예정
              if (res.data.introduction == null) {
                console.log("신규 회원!");
                navigate("/register/language");
              } else {
                console.log("기존 회원!");
                navigate("/mypage/setting");
              }
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  return <div>로그인 중입니다...</div>;
};

export default OAuthCallbackPage;
