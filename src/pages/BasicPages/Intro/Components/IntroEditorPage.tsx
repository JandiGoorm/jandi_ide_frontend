import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import styles from "./IntroEditorPage.module.css";
import { PageEndPoints } from "../../../../constants/api";

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
  const navigate = useNavigate();

  const goToLogin = () => {
    if (buttonText === "코딩테스트 준비") {
      sessionStorage.setItem("loginNext", PageEndPoints.ALGO_MAIN);
      navigate(PageEndPoints.LOGIN);
    } else if (buttonText === "실시간 채팅 입장") {
      sessionStorage.setItem("loginNext", PageEndPoints.CHAT_MAIN);
      navigate(PageEndPoints.LOGIN);
    } else {
      sessionStorage.setItem("loginNext", PageEndPoints.HOME);
      navigate(PageEndPoints.LOGIN);
    }
  };

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
        <Button size="lg" onClick={goToLogin}>
          {" "}
          <div className={styles.button_inner}>{buttonText}</div>
        </Button>
      </div>
      <img src={imgSrc} className={styles.img} />
    </div>
  );
};

export default IntroEditorPage;
