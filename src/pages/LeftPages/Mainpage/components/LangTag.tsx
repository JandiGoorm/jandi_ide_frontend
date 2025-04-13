import styles from "./LangTag.module.css";

interface LangTagProps {
  langList: string[];
}

const LangTag: React.FC<LangTagProps> = ({ langList }) => {
  return (
    <div className={styles.tagList}>
      {langList.map((tag, idx) => (
        <div key={idx} className={styles.tagItem}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default LangTag;
