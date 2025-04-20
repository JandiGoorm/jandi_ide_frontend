import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./contexts/DarkmodeProvider";
import { routes } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider";

// 코딩 테스트
import CompanyCodeTestPage from "./pages/RightPages/AlgorithmPage/Test/CodeTestPage";
import CustomCodeTestPage from "./pages/RightPages/AlgorithmPage/Test/CodeTestPage";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={
                    <PrivateRoute requireAuth={route.requireAuth}>
                      {route.element}
                    </PrivateRoute>
                  }
                  key={route.path}
                />
              );
            })}
             <Route
            path={PageEndPoints.ALGO_COMPANY_TEST}
            element={<CompanyCodeTestPage />}
          />
          <Route
            path={PageEndPoints.ALGO_CUSTOM_TEST}
            element={<CustomCodeTestPage />}
          />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
