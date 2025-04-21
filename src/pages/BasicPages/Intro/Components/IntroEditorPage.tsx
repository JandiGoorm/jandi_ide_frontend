import Button from "../../../../components/Button/Button";
import styles from "./IntroEditorPage.module.css";

interface IntroEditorPageProps {
  titles: string[];
  subtitles: string[];
  buttonText: string;
  imgSrc: string;
}

const IntroEditorPage = ({
  titles,
  subtitles,
  buttonText,
  imgSrc,
}: IntroEditorPageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_box}>
        {titles.map((title, idx) => (
          <p key={idx} className={styles.title}>
            {title}
          </p>
        ))}
      </div>
      <div className={styles.title_box}>
        {subtitles.map((subtitle, idx) => (
          <p key={idx} className={styles.sub_title}>
            {subtitle}
          </p>
        ))}
      </div>
      <div>
        <Button size="lg">
          {" "}
          <div className={styles.button_inner}>{buttonText}</div>
        </Button>
      </div>
      <img src={imgSrc} className={styles.img} />
    </div>
  );
};

export default IntroEditorPage;
