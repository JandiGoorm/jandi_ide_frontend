import styles from "./BaseLayout.module.css";

interface ContentProps extends React.HTMLProps<HTMLDivElement> {
  header?: React.ReactNode;
}

const BaseLayout = ({ header, children }: ContentProps) => {
  return (
    <div className={styles.container}>
      {header}
      {children}
    </div>
  );
};

export default BaseLayout;
