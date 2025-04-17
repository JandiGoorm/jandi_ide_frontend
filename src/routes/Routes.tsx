import { PageEndPoints } from "../constants/api";
import LoginPage from "../pages/Auth/Login/LoginPage";
import Test from "../pages/BasicPages/Test/Test";
import HomePage from "../pages/RightPages/MainPage/HomePage";
import LoginCallback from "../pages/Auth/Login/LoginCallback";
import Regitster_lang from "../pages/Auth/Register/SelectLanguagePage";
import Regitster_company from "../pages/Auth/Register/SelectCompanyPage";
import Regitster_done from "../pages/Auth/Register/DonePage";

// 메인 페이지
import MainPage from "../pages/RightPages/MyPage/MainPage/MainPage";
import CompanyMorePage from "../pages/RightPages/MyPage/MorePage/CompanyMorePage";
import ProjectMorePage from "../pages/RightPages/MyPage/MorePage/ProjectMorePage";
import AlgorithmMorePage from "../pages/RightPages/MyPage/MorePage/AlgorithmMorePage";
import SettingPage from "../pages/RightPages/MyPage/SettingPage/SettingPage";

// 채팅
import ChatMainPage from "../pages/RightPages/ChatPage/Main/ChatMainPage";
import ChatDetailPage from "../pages/RightPages/ChatPage/Detail/ChatDetailPage";

//코드편집기
import AlgorithmPage from "../pages/RightPages/AlgorithmPage/Main/AlgorithmPage";
import ProjectEditPage from "../pages/RightPages/CodeEditPage/ProjectEditPage/ProjectEditPage";

export const routes = [
  {
    path: PageEndPoints.HOME,
    element: <HomePage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.TEST,
    element: <Test />,
    requireAuth: false,
  },
  //로그인 & 회원가입
  {
    path: PageEndPoints.LOGIN,
    element: <LoginPage />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.CALLBACK,
    element: <LoginCallback />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.LOGIN_LANGUAGE,
    element: <Regitster_lang />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.LOGIN_COMPANY,
    element: <Regitster_company />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.LOGIN_DONE,
    element: <Regitster_done />,
    requireAuth: true,
  },
  //마이페이지
  {
    path: PageEndPoints.MYPAGE,
    element: <MainPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.MY_COMPANY,
    element: <CompanyMorePage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.MY_PROJECT,
    element: <ProjectMorePage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.MY_ALGO,
    element: <AlgorithmMorePage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.SETTING,
    element: <SettingPage />,
    requireAuth: true,
  },
  //채팅
  {
    path: PageEndPoints.CHAT_MAIN,
    element: <ChatMainPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.CHAT_DETAIL,
    element: <ChatDetailPage />,
    requireAuth: true,
  },
  //코드
  {
    path: PageEndPoints.ALGO_MAIN,
    element: <AlgorithmPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.GITHUB_PROJECT,
    element: <ProjectEditPage />,
    requireAuth: true,
  },
];
