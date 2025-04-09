import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/RightPages/Home/Home";
import MyPage from "./pages/RightPages/MyPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
