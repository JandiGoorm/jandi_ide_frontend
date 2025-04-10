import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
