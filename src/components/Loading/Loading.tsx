import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loading;
