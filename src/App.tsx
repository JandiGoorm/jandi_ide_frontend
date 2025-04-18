import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./contexts/DarkmodeProvider";
import { PageEndPoints } from "./constants/api";

import HomePage from "./pages/RightPages/MainPage/HomePage";
import SettingPage from "./pages/RightPages/MyPage/SettingPage/SettingPage";
import Test from "./pages/BasicPages/Test/Test";
import ChatDetailPage from "./pages/RightPages/ChatPage/Detail/ChatDetailPage";

// 로그인 & 회원가입
import LoginPage from "./pages/Auth/Login/LoginPage";
import Regitster_lang from "./pages/Auth/Register/SelectLanguagePage";
import Regitster_company from "./pages/Auth/Register/SelectCompanyPage";
import Regitster_done from "./pages/Auth/Register/DonePage";
import LoginCallback from "./pages/Auth/Login/LoginCallback";

// 메인 페이지
import MainPage from "./pages/RightPages/MyPage/MainPage/MainPage";
import CompanyMorePage from "./pages/RightPages/MyPage/MorePage/CompanyMorePage";
import ProjectMorePage from "./pages/RightPages/MyPage/MorePage/ProjectMorePage";
import AlgorithmMorePage from "./pages/RightPages/MyPage/MorePage/AlgorithmMorePage";

// 채팅
import ChatMainPage from "./pages/RightPages/ChatPage/Main/ChatMainPage";
import AlgorithmPage from "./pages/RightPages/AlgorithmPage/Main/AlgorithmPage";

//코드편집기
import ProjectEditPage from "./pages/RightPages/CodeEditPage/ProjectEditPage/ProjectEditPage";

// 코딩 테스트
import CompanyCodeTestPage from "./pages/RightPages/AlgorithmPage/Test/CodeTestPage";
import CustomCodeTestPage from "./pages/RightPages/AlgorithmPage/Test/CodeTestPage";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PageEndPoints.HOME} element={<HomePage />} />
          <Route path={PageEndPoints.TEST} element={<Test />} />

          {/* 로그인 & 회원가입 */}
          <Route path={PageEndPoints.LOGIN} element={<LoginPage />} />
          <Route path={PageEndPoints.CALLBACK} element={<LoginCallback />} />
          <Route
            path={PageEndPoints.LOGIN_LANGUAGE}
            element={<Regitster_lang />}
          />
          <Route
            path={PageEndPoints.LOGIN_COMPANY}
            element={<Regitster_company />}
          />
          <Route path={PageEndPoints.LOGIN_DONE} element={<Regitster_done />} />

          {/* 마이페이지 */}
          <Route path={PageEndPoints.MYPAGE} element={<MainPage />} />
          <Route
            path={PageEndPoints.MY_COMPANY}
            element={<CompanyMorePage />}
          />
          <Route
            path={PageEndPoints.MY_PROJECT}
            element={<ProjectMorePage />}
          />
          <Route path={PageEndPoints.MY_ALGO} element={<AlgorithmMorePage />} />
          <Route path={PageEndPoints.SETTING} element={<SettingPage />} />

          {/* 채팅 */}
          <Route path={PageEndPoints.CHAT_MAIN} element={<ChatMainPage />} />
          <Route
            path={PageEndPoints.CHAT_DETAIL}
            element={<ChatDetailPage />}
          />

          {/* 알고리즘 */}
          <Route path={PageEndPoints.ALGO_MAIN} element={<AlgorithmPage />} />

          {/* 코딩테스트 */}
          <Route
            path={PageEndPoints.ALGO_COMPANY_TEST}
            element={<CompanyCodeTestPage />}
          />
          <Route
            path={PageEndPoints.ALGO_CUSTOM_TEST}
            element={<CustomCodeTestPage />}
          />

          {/* 코드편집기 */}
          <Route
            path={PageEndPoints.GITHUB_PROJECT}
            element={<ProjectEditPage />}
          />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
