import { ReactNode } from "react";
import styles from "./BaseLayout.module.css";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default BaseLayout;
