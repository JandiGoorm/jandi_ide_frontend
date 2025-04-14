import styles from "./PracticeContent.module.css";

const PracticeContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.selected_box}>
        <div className={styles.header}>선택된 문제</div>
        <div className={styles.content_box}></div>
      </div>
      <div className={styles.select_box}>
        <div className={styles.header}>문제 리스트</div>
        <div className={styles.content_box}></div>
      </div>
    </div>
  );
};

export default PracticeContent;
