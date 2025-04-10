import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/RightPages/Home/Home";
import MyPage from "./pages/RightPages/MyPage/MyPage";
import Test from "./pages/RightPages/Test/Test";

// 로그인 & 회원가입
import LoginPage from "./pages/Auth/Login/LoginPage";
import Regitster_lang from "./pages/Auth/Register/SelectLanguagePage";
import Regitster_company from "./pages/Auth/Register/SelectCompanyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 로그인 & 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register/language" element={<Regitster_lang />} />
        <Route path="/Register/company" element={<Regitster_company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
