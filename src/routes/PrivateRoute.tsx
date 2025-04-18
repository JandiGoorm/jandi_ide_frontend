import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import styles from "./PrivateRoute.module.css";
import { ReactNode } from "react";
import Button from "../components/Button/Button";
import { PageEndPoints } from "../constants/api";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  requireAuth: boolean;
}
const PrivateRoute = ({ children, requireAuth }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (requireAuth && !user) {
    return (
      <BaseLayout>
        <div className={styles.container}>
          <span className={styles.title}>로그인이 필요한 서비스 입니다.</span>
          <span className={styles.text}>
            해당 서비스를 이용 하시려면 로그인을 해주세요.
          </span>
          <Button size="lg" onClick={() => navigate(PageEndPoints.LOGIN)}>
            로그인하기
          </Button>
        </div>
      </BaseLayout>
    );
  }

  return children;
};

export default PrivateRoute;
