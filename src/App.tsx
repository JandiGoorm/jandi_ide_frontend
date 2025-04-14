import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./contexts/DarkmodeProvider";
import Home from "./pages/BasicPages/Home/Home";
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

// 채팅
import ChatMainPage from "./pages/RightPages/ChatPage/Main/ChatMainPage";
import AlgorithmPage from "./pages/RightPages/AlgorithmPage/Main/AlgorithmPage";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/mypage/setting" element={<SettingPage />} />
          <Route path="/chat/id" element={<ChatDetailPage />} />

          {/* 로그인 & 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/language" element={<Regitster_lang />} />
          <Route path="/register/company" element={<Regitster_company />} />
          <Route path="/register/done" element={<Regitster_done />} />

          {/* 메인페이지 */}
          <Route path="/mypage/main" element={<MainPage />} />

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
