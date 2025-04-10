import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/RightPages/Home/Home";
import SettingPage from "./pages/RightPages/MyPage/SettingPage/SettingPage";
import Test from "./pages/RightPages/Test/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
