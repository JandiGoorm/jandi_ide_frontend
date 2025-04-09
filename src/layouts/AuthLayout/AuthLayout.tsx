import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AuthLayout;
