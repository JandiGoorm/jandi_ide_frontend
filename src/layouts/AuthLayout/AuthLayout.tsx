import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";
import BasicHeader from "../Components/BasicHeader";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <BasicHeader />
      <div className={styles.centered}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
