import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./contexts/DarkmodeProvider";
import HomePage from "./pages/RightPages/MainPage/HomePage";
import SettingPage from "./pages/RightPages/MyPage/SettingPage/SettingPage";
import Test from "./pages/BasicPages/Test/Test";
import ChatDetailPage from "./pages/RightPages/ChatPage/Detail/ChatDetailPage";

// 로그인 & 회원가입
import LoginPage from "./pages/Auth/Login/LoginPage";
import Regitster_lang from "./pages/Auth/Register/SelectLanguagePage";
import Regitster_company from "./pages/Auth/Register/SelectCompanyPage";
import Regitster_done from "./pages/Auth/Register/DonePage";

// 메인 페이지
import MainPage from "./pages/RightPages/MyPage/MainPage/MainPage";
import CompanyMorePage from "./pages/RightPages/MyPage/MorePage/CompanyMorePage";
import ProjectMorePage from "./pages/RightPages/MyPage/MorePage/ProjectMorePage";
import AlgorithmMorePage from "./pages/RightPages/MyPage/MorePage/AlgorithmMorePage";

// 채팅
import ChatMainPage from "./pages/RightPages/ChatPage/Main/ChatMainPage";
import AlgorithmPage from "./pages/RightPages/AlgorithmPage/Main/AlgorithmPage";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/chat/id" element={<ChatDetailPage />} />

          {/* 로그인 & 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/language" element={<Regitster_lang />} />
          <Route path="/register/company" element={<Regitster_company />} />
          <Route path="/register/done" element={<Regitster_done />} />

          {/* 메인페이지 */}
          <Route path="/mypage" element={<MainPage />} />
          <Route path="/mypage/company" element={<CompanyMorePage />} />
          <Route path="/mypage/project" element={<ProjectMorePage />} />
          <Route path="/mypage/algorithm" element={<AlgorithmMorePage />} />
          <Route path="/mypage/setting" element={<SettingPage />} />

          {/* 채팅 */}
          <Route path="/chat" element={<ChatMainPage />} />

          {/* 알고리즘 */}
          <Route path="/algo/company" element={<AlgorithmPage />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
