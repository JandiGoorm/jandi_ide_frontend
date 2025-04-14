import styles from "./CompanyContent.module.css";

const CompanyContent = () => {
  return (
    <div className={styles.content_box}>
      <div className={styles.title}>모의 코딩 전 확인해주세요!</div>
      <div className={styles.content_sub_box}>
        <div className={styles.sub_title}>
          기업 코딩테스트에 맞춰 시험을 제공해드립니다!
        </div>
        <div className={styles.text}>
          - 기업을 선택하시면 기업에 알맞은 코딩테스트 난이도 문제를 제공해줘요.
        </div>
        <div className={styles.text}>
          - 문제 갯수, 시간 제한 또한 기업 테스트에 맞춰 같은 환경을 제공해
          드립니다.
        </div>
      </div>
      <div className={styles.content_sub_box}>
        <div className={styles.sub_title}>
          문제 상황 발생시, 이렇게 대처해주세요!
        </div>
        <div className={styles.text}>
          - 문제가 발생할 경우, 운영진에게 연락해주세요.
        </div>
      </div>
    </div>
  );
};

export default CompanyContent;
