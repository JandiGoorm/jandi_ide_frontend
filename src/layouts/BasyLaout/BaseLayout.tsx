import { ReactNode } from "react";
import styles from "./BaseLayout.module.css";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" theme="dark">
      <div className={styles.container}>{children}</div>;
    </html>
  );
};

export default BaseLayout;
