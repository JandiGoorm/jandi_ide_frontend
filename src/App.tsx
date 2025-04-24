import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./contexts/DarkmodeProvider";
import { routes } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider";
import ToastProvider from "./contexts/ToastProvider";
import ToastList from "./components/Toast/ToastList";

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <ToastList />
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
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;
