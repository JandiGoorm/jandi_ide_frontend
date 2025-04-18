import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./contexts/DarkmodeProvider";
import { routes } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider";

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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
