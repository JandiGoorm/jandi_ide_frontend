import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/BasicPages/Home/Home";
import SettingPage from "./pages/RightPages/MyPage/SettingPage/SettingPage";
import Test from "./pages/BasicPages/Test/Test";
// import ChatDetailPage from "./pages/RightPages/ChatPage/Detail/ChatDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<SettingPage />} />
        {/* <Route path="/chat/id" element={<ChatDetailPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
