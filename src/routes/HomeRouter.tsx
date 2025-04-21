import HomePage from "../pages/RightPages/MainPage/HomePage";
import IntroPage from "../pages/BasicPages/Intro/IntroPage";
import { useAuth } from "../contexts/AuthContext";

const HomeRouter = () => {
  const { user } = useAuth();

  return user ? <HomePage /> : <IntroPage />;
};

export default HomeRouter;
