import styles from "./AuthBanner.module.css";

interface AuthBannerProps {
  catchPhrases: string[];
  explains: string[];
}

const AuthBanner: React.FC<AuthBannerProps> = ({ catchPhrases, explains }) => {
  return (
    <div>
      {/* 로고 */}
      <p className={styles.logo}>Team! Jandi</p>

      {/* 캐치프레이즈 */}
      <div className={styles.catchphrase}>
        {catchPhrases.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>

      {/* 설명문 */}
      <div className={styles.explainBox}>
        {explains.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
};
export default AuthBanner;
